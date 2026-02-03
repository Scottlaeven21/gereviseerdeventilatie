/**
 * WooCommerce naar Supabase Import Script
 * 
 * Gebruik:
 * 1. Export producten uit WooCommerce naar CSV
 * 2. Plaats CSV in /data/woocommerce-export.csv
 * 3. Run: node scripts/import-woocommerce.js
 */

const fs = require('fs');
const path = require('path');

// Parse CSV bestand
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const products = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const product = {};
    
    headers.forEach((header, index) => {
      product[header] = values[index] || '';
    });
    
    products.push(product);
  }
  
  return products;
}

// Transform WooCommerce product naar ons formaat
function transformProduct(wooProduct) {
  // WooCommerce velden → Ons schema
  return {
    slug: generateSlug(wooProduct.Name || wooProduct.post_title),
    name: wooProduct.Name || wooProduct.post_title,
    description: wooProduct['Description'] || wooProduct.post_content || '',
    short_description: wooProduct['Short description'] || wooProduct.post_excerpt || '',
    price: parseFloat(wooProduct['Regular price'] || wooProduct.regular_price || 0),
    sale_price: parseFloat(wooProduct['Sale price'] || wooProduct.sale_price) || null,
    regular_price: parseFloat(wooProduct['Regular price'] || wooProduct.regular_price || 0),
    stock_quantity: parseInt(wooProduct['Stock'] || wooProduct.stock_quantity || 0),
    stock_status: wooProduct['In stock?'] === '1' ? 'instock' : 'outofstock',
    sku: wooProduct['SKU'] || wooProduct.sku || '',
    weight: wooProduct['Weight (kg)'] || wooProduct.weight || '',
    dimensions: wooProduct['Length (cm)'] ? 
      `${wooProduct['Length (cm)']} x ${wooProduct['Width (cm)']} x ${wooProduct['Height (cm)']}` : '',
    category: wooProduct['Categories'] || wooProduct.product_cat || '',
    brand: wooProduct['Brand'] || wooProduct.pa_brand || '',
    images: parseImages(wooProduct['Images'] || wooProduct.images),
    specifications: parseAttributes(wooProduct),
    featured: wooProduct['Featured'] === '1',
    visibility: wooProduct['Visibility'] || 'visible',
  };
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseImages(imageString) {
  if (!imageString) return [];
  const urls = imageString.split('|').map(url => url.trim());
  return urls.map((url, index) => ({
    src: url,
    alt: '',
    position: index
  }));
}

function parseAttributes(product) {
  const specs = {};
  
  // WooCommerce attributen extraheren
  Object.keys(product).forEach(key => {
    if (key.startsWith('Attribute ') || key.startsWith('Meta: ')) {
      const specName = key.replace('Attribute ', '').replace('Meta: ', '');
      const specValue = product[key];
      if (specValue) {
        specs[specName] = specValue;
      }
    }
  });
  
  return specs;
}

// Genereer SQL INSERT statements
function generateSQL(products) {
  const transformedProducts = products.map(p => transformProduct(p));
  
  let sql = '-- Generated INSERT statements\n\n';
  
  transformedProducts.forEach(product => {
    sql += `INSERT INTO products (
  slug, name, description, short_description, 
  price, sale_price, regular_price, 
  stock_quantity, stock_status, sku, 
  weight, dimensions, category, brand, 
  images, specifications, featured, visibility
) VALUES (
  '${escapeSql(product.slug)}',
  '${escapeSql(product.name)}',
  '${escapeSql(product.description)}',
  '${escapeSql(product.short_description)}',
  ${product.price},
  ${product.sale_price || 'NULL'},
  ${product.regular_price},
  ${product.stock_quantity},
  '${product.stock_status}',
  '${escapeSql(product.sku)}',
  '${escapeSql(product.weight)}',
  '${escapeSql(product.dimensions)}',
  '${escapeSql(product.category)}',
  '${escapeSql(product.brand)}',
  '${JSON.stringify(product.images)}'::jsonb,
  '${JSON.stringify(product.specifications)}'::jsonb,
  ${product.featured},
  '${product.visibility}'
);\n\n`;
  });
  
  return sql;
}

function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''").replace(/\n/g, ' ');
}

// Main functie
function main() {
  console.log('🚀 WooCommerce Import Script\n');
  
  const csvPath = path.join(__dirname, '../data/woocommerce-export.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV bestand niet gevonden!');
    console.log('📁 Plaats je WooCommerce export hier: ' + csvPath);
    console.log('\nOf pas het pad aan in het script.');
    return;
  }
  
  console.log('📂 CSV bestand gevonden!');
  console.log('📊 Producten aan het parsen...\n');
  
  const products = parseCSV(csvPath);
  console.log(`✅ ${products.length} producten gevonden\n`);
  
  // Genereer SQL
  const sql = generateSQL(products);
  
  // Opslaan
  const outputPath = path.join(__dirname, '../data/import.sql');
  fs.writeFileSync(outputPath, sql);
  
  console.log('✅ SQL gegenereerd!');
  console.log('📁 Locatie: ' + outputPath);
  console.log('\n🎯 Volgende stappen:');
  console.log('1. Ga naar Supabase dashboard');
  console.log('2. SQL Editor');
  console.log('3. Plak de SQL uit import.sql');
  console.log('4. Run de query\n');
  
  // Preview van eerste product
  if (products.length > 0) {
    console.log('📦 Preview eerste product:');
    console.log(JSON.stringify(transformProduct(products[0]), null, 2));
  }
}

// Run script
if (require.main === module) {
  main();
}

module.exports = { transformProduct, parseCSV };
