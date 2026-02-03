/**
 * WooCommerce NL → Supabase Import Script
 * 
 * Gebruik:
 * 1. CSV staat al in /data/woocommerce-export.csv
 * 2. Run: node scripts/import-woocommerce-nl.js
 */

const fs = require('fs');
const path = require('path');

// Parse CSV met quote handling
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // Parse headers
  const headers = parseCSVLine(lines[0]);
  
  const products = [];
  let currentLine = '';
  let inQuotes = false;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines
    if (!line.trim() && !inQuotes) continue;
    
    currentLine += (currentLine ? '\n' : '') + line;
    
    // Count quotes to check if we're inside a quoted field
    const quoteCount = (currentLine.match(/"/g) || []).length;
    inQuotes = quoteCount % 2 !== 0;
    
    if (!inQuotes) {
      const values = parseCSVLine(currentLine);
      
      if (values.length > 0) {
        const product = {};
        headers.forEach((header, index) => {
          product[header] = values[index] || '';
        });
        products.push(product);
      }
      
      currentLine = '';
    }
  }
  
  return products;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Clean price
function parsePrice(priceString) {
  if (!priceString) return 0;
  const cleaned = priceString.replace(/[^0-9.,]/g, '').replace(',', '.');
  const price = parseFloat(cleaned);
  return isNaN(price) ? 0 : price;
}

// Parse categories
function parseCategories(categoryString) {
  if (!categoryString) return { main: '', sub: '' };
  const parts = categoryString.split('>').map(c => c.trim());
  return {
    main: parts[0] || '',
    sub: parts[parts.length - 1] || parts[0] || ''
  };
}

// Transform WooCommerce product to our format
function transformProduct(wooProduct) {
  const categories = parseCategories(wooProduct['Categorieën']);
  const price = parsePrice(wooProduct['Reguliere prijs']);
  const salePrice = parsePrice(wooProduct['Actieprijs']);
  const inStock = wooProduct['Op voorraad?'] === '1';
  const stock = parseInt(wooProduct['Voorraad']) || 0;
  
  // Parse images
  const imageUrls = wooProduct['Afbeeldingen']
    ? wooProduct['Afbeeldingen'].split(',').map(url => url.trim()).filter(url => url)
    : [];
  
  // Clean HTML from description
  const cleanDescription = (html) => {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  };
  
  return {
    slug: generateSlug(wooProduct['Naam']),
    name: wooProduct['Naam'],
    description: cleanDescription(wooProduct['Beschrijving']),
    short_description: cleanDescription(wooProduct['Korte beschrijving']),
    price: salePrice > 0 ? salePrice : price,
    sale_price: salePrice > 0 ? salePrice : null,
    regular_price: price,
    stock_quantity: stock,
    stock_status: inStock ? 'instock' : 'outofstock',
    sku: wooProduct['SKU'] || '',
    weight: wooProduct['Gewicht (kg)'] || '',
    dimensions: wooProduct['Lengte (cm)'] 
      ? `${wooProduct['Lengte (cm)']}x${wooProduct['Breedte (cm)']}x${wooProduct['Hoogte (cm)']} cm`
      : '',
    category: categories.main,
    subcategory: categories.sub,
    brand: wooProduct['Merken'] || '',
    images: imageUrls,
    specifications: {},
    featured: wooProduct['Uitgelicht?'] === '1',
    visibility: wooProduct['Zichtbaarheid in catalogus'] || 'visible',
  };
}

// Escape SQL string
function escapeSql(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "''")
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

// Generate SQL INSERT statements
function generateSQL(products) {
  let sql = `-- Generated INSERT statements for Gereviseerde Ventilatie
-- Total products: ${products.length}
-- Generated: ${new Date().toISOString()}

`;
  
  let successCount = 0;
  let skippedCount = 0;
  
  products.forEach((wooProduct, index) => {
    // Skip if no name
    if (!wooProduct['Naam']) {
      skippedCount++;
      return;
    }
    
    try {
      const product = transformProduct(wooProduct);
      
      sql += `-- Product ${index + 1}: ${product.name}
INSERT INTO products (
  slug, name, description, short_description, 
  price, sale_price, regular_price, 
  stock_quantity, stock_status, sku, 
  weight, dimensions, category, subcategory, brand, 
  images, specifications, featured, visibility
) VALUES (
  '${escapeSql(product.slug)}',
  '${escapeSql(product.name)}',
  '${escapeSql(product.description)}',
  '${escapeSql(product.short_description)}',
  ${product.price},
  ${product.sale_price ? product.sale_price : 'NULL'},
  ${product.regular_price},
  ${product.stock_quantity},
  '${product.stock_status}',
  '${escapeSql(product.sku)}',
  '${escapeSql(product.weight)}',
  '${escapeSql(product.dimensions)}',
  '${escapeSql(product.category)}',
  '${escapeSql(product.subcategory)}',
  '${escapeSql(product.brand)}',
  '${JSON.stringify(product.images)}'::jsonb,
  '${JSON.stringify(product.specifications)}'::jsonb,
  ${product.featured},
  '${product.visibility}'
);

`;
      successCount++;
    } catch (error) {
      console.error(`Error processing product ${index + 1}:`, error.message);
      sql += `-- ERROR processing product: ${wooProduct['Naam']}\n\n`;
      skippedCount++;
    }
  });
  
  sql += `-- Summary:
-- Successfully converted: ${successCount} products
-- Skipped: ${skippedCount} products
-- Total: ${products.length} products
`;
  
  return { sql, successCount, skippedCount };
}

// Main function
function main() {
  console.log('🚀 WooCommerce NL Import Script\n');
  console.log('════════════════════════════════\n');
  
  const csvPath = path.join(__dirname, '../data/woocommerce-export.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV bestand niet gevonden!');
    console.log('📁 Verwacht locatie: ' + csvPath);
    return;
  }
  
  console.log('📂 CSV bestand gevonden!');
  console.log('📊 Producten aan het parsen...\n');
  
  try {
    const products = parseCSV(csvPath);
    console.log(`✅ ${products.length} producten gevonden\n`);
    
    // Show first product as example
    if (products.length > 0) {
      console.log('📦 Voorbeeld eerste product:');
      console.log('   Naam:', products[0]['Naam']);
      console.log('   SKU:', products[0]['SKU']);
      console.log('   Prijs:', products[0]['Reguliere prijs']);
      console.log('   Categorie:', products[0]['Categorieën']);
      console.log('');
    }
    
    // Generate SQL
    console.log('🔄 SQL aan het genereren...\n');
    const { sql, successCount, skippedCount } = generateSQL(products);
    
    // Save to file
    const outputPath = path.join(__dirname, '../data/import.sql');
    fs.writeFileSync(outputPath, sql, 'utf-8');
    
    console.log('═══════════════════════════════════════\n');
    console.log('✅ SQL SUCCESVOL GEGENEREERD!\n');
    console.log(`📊 Statistieken:`);
    console.log(`   ✓ Geconverteerd: ${successCount} producten`);
    console.log(`   ⊘ Overgeslagen: ${skippedCount} producten`);
    console.log(`   Σ Totaal: ${products.length} producten\n`);
    console.log(`📁 SQL bestand: ${outputPath}\n`);
    console.log('═══════════════════════════════════════\n');
    
    console.log('🎯 VOLGENDE STAPPEN:\n');
    console.log('1. Ga naar Supabase dashboard (supabase.com)');
    console.log('2. Open SQL Editor');
    console.log('3. Open het bestand: data/import.sql');
    console.log('4. Kopieer de HELE inhoud');
    console.log('5. Plak in Supabase SQL Editor');
    console.log('6. Klik "Run" (of druk Ctrl+Enter)');
    console.log('7. Check Table Editor → products tabel\n');
    console.log('✨ Klaar! Je producten staan dan in de database!\n');
    
  } catch (error) {
    console.error('\n❌ FOUT:', error.message);
    console.error('\nStack trace:', error.stack);
  }
}

// Run script
if (require.main === module) {
  main();
}

module.exports = { transformProduct, parseCSV };
