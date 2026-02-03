import { Product } from '@/types/product';
import { supabase } from '@/lib/supabase';

export const products: Product[] = [
  // WTW-Units
  {
    id: 1,
    slug: 'gereviseerde-zehnder-whr-930-r',
    name: 'Gereviseerde Zehnder WHR 930 R',
    shortDescription: 'Hoogwaardige gereviseerde Zehnder WHR 930 met rechts aansluitingen. Energiezuinig en stil.',
    description: `De Zehnder ComfoAir WHR 930 is een hoogwaardig warmteterugwinningssysteem met een rendement tot 95%. 
    
Deze unit is volledig technisch gereviseerd en getest door onze specialisten. Alle filters zijn vervangen en het systeem is grondig gereinigd. 

Perfect geschikt voor nieuwbouw en renovatie projecten. De WHR 930 zorgt voor een gezond binnenklimaat met minimaal energieverlies.

Inclusief 2 jaar garantie en volledige technische ondersteuning.`,
    price: 395,
    oldPrice: 495,
    discount: '-20%',
    category: 'wtw-units',
    images: [
      '/images/homepage/WHR930.jpg',
      '/images/homepage/WHR930.jpg',
      '/images/homepage/WHR930.jpg',
    ],
    inStock: true,
    stock: 5,
    sku: 'WHR930-R-REV',
    specs: {
      'Merk': 'Zehnder',
      'Model': 'ComfoAir WHR 930',
      'Aansluitingen': 'Rechts',
      'Max. debiet': '325 m³/h',
      'Rendement': '95%',
      'Geluidsniveau': '28 dB(A)',
      'Energieklasse': 'A+',
      'Afmetingen (HxBxD)': '910 x 800 x 595 mm',
      'Gewicht': '75 kg',
      'Garantie': '2 jaar',
    },
    features: [
      'Volledig technisch gereviseerd',
      'Alle filters vervangen',
      'Grondig gereinigd en getest',
      'Rendement tot 95%',
      'Zeer stil in bedrijf (28 dB)',
      '2 jaar garantie',
      'Energiezuinig (klasse A+)',
      'Geschikt voor nieuwbouw en renovatie',
    ],
    relatedProducts: [2, 3, 4],
  },
  {
    id: 2,
    slug: 'gereviseerde-zehnder-whr-930-l',
    name: 'Gereviseerde Zehnder WHR 930 L',
    shortDescription: 'Hoogwaardige gereviseerde Zehnder WHR 930 met links aansluitingen. Energiezuinig en stil.',
    description: `De Zehnder ComfoAir WHR 930 is een hoogwaardig warmteterugwinningssysteem met een rendement tot 95%. 
    
Deze unit is volledig technisch gereviseerd en getest door onze specialisten. Alle filters zijn vervangen en het systeem is grondig gereinigd. 

Perfect geschikt voor nieuwbouw en renovatie projecten. De WHR 930 zorgt voor een gezond binnenklimaat met minimaal energieverlies.

Inclusief 2 jaar garantie en volledige technische ondersteuning.`,
    price: 395,
    oldPrice: 495,
    discount: '-20%',
    category: 'wtw-units',
    images: [
      '/images/homepage/WHR930.jpg',
      '/images/homepage/WHR930.jpg',
    ],
    inStock: true,
    stock: 3,
    sku: 'WHR930-L-REV',
    specs: {
      'Merk': 'Zehnder',
      'Model': 'ComfoAir WHR 930',
      'Aansluitingen': 'Links',
      'Max. debiet': '325 m³/h',
      'Rendement': '95%',
      'Geluidsniveau': '28 dB(A)',
      'Energieklasse': 'A+',
      'Afmetingen (HxBxD)': '910 x 800 x 595 mm',
      'Gewicht': '75 kg',
      'Garantie': '2 jaar',
    },
    features: [
      'Volledig technisch gereviseerd',
      'Alle filters vervangen',
      'Grondig gereinigd en getest',
      'Rendement tot 95%',
      'Zeer stil in bedrijf (28 dB)',
      '2 jaar garantie',
      'Energiezuinig (klasse A+)',
      'Geschikt voor nieuwbouw en renovatie',
    ],
    relatedProducts: [1, 5, 6],
  },
  {
    id: 3,
    slug: 'gereviseerde-itho-daalderop-hru-350',
    name: 'Gereviseerde Itho Daalderop HRU 350',
    shortDescription: 'Betrouwbare WTW-unit met hoog rendement. Ideaal voor woningen tot 200m².',
    description: `De Itho Daalderop HRU 350 is een betrouwbare warmteterugwinunit met een maximaal debiet van 350 m³/h.

Volledig gereviseerd door onze technici. Inclusief nieuwe filters en 2 jaar garantie.`,
    price: 450,
    oldPrice: 595,
    discount: '-24%',
    category: 'wtw-units',
    images: [
      '/images/homepage/ducowtw.jpg',
      '/images/homepage/ducowtw.jpg',
    ],
    inStock: true,
    stock: 2,
    sku: 'ITHO-HRU350-REV',
    specs: {
      'Merk': 'Itho Daalderop',
      'Model': 'HRU 350',
      'Max. debiet': '350 m³/h',
      'Rendement': '92%',
      'Geluidsniveau': '32 dB(A)',
      'Energieklasse': 'A',
      'Garantie': '2 jaar',
    },
    features: [
      'Volledig gereviseerd',
      'Nieuwe filters',
      'Rendement 92%',
      '2 jaar garantie',
    ],
    relatedProducts: [1, 2],
  },

  // Flexibele Slangen
  {
    id: 4,
    slug: 'demper-sonodec-trd-25-152mm-05m',
    name: 'Demper Sonodec TRD 25 Ø152mm, L = 0.5m',
    shortDescription: 'Flexibele en geïsoleerde geluiddemper voor optimale geluidsreductie.',
    description: `De Sonodec TRD 25 is een hoogwaardige flexibele geluiddemper met isolatie. Perfect voor het reduceren van ventilatie geluiden.

Eenvoudig te installeren en direct leverbaar.`,
    price: 29.95,
    discount: 'Nieuw',
    category: 'flexibele-slangen',
    images: [
      '/images/homepage/flexibeleslangen.jpg',
    ],
    inStock: true,
    stock: 25,
    sku: 'SONODEC-TRD25-152-05',
    specs: {
      'Type': 'Flexibele demper',
      'Diameter': 'Ø152mm',
      'Lengte': '0.5m',
      'Isolatie': 'Ja (25mm)',
      'Materiaal': 'Aluminium/PVC',
    },
    features: [
      'Flexibel en geïsoleerd',
      'Geluidsreducerend',
      'Eenvoudige montage',
      'Duurzaam materiaal',
    ],
    relatedProducts: [5, 6],
  },
  {
    id: 5,
    slug: 'demper-sonodec-trd-25-152mm-1m',
    name: 'Demper Sonodec TRD 25 Ø152mm, L = 1m',
    shortDescription: 'Flexibele en geïsoleerde geluiddemper voor optimale geluidsreductie.',
    description: `De Sonodec TRD 25 is een hoogwaardige flexibele geluiddemper met isolatie. Perfect voor het reduceren van ventilatie geluiden.

Eenvoudig te installeren en direct leverbaar.`,
    price: 39.95,
    discount: 'Nieuw',
    category: 'flexibele-slangen',
    images: [
      '/images/homepage/flexibeleslangen.jpg',
    ],
    inStock: true,
    stock: 20,
    sku: 'SONODEC-TRD25-152-1',
    specs: {
      'Type': 'Flexibele demper',
      'Diameter': 'Ø152mm',
      'Lengte': '1m',
      'Isolatie': 'Ja (25mm)',
      'Materiaal': 'Aluminium/PVC',
    },
    features: [
      'Flexibel en geïsoleerd',
      'Geluidsreducerend',
      'Eenvoudige montage',
      'Duurzaam materiaal',
    ],
    relatedProducts: [4, 6],
  },
  {
    id: 6,
    slug: 'flexibele-slang-180mm-10m',
    name: 'Flexibele Ventilatieslang Ø180mm, L = 10m',
    shortDescription: 'Aluminium flexibele slang voor ventilatiesystemen. Duurzaam en eenvoudig te installeren.',
    description: `Hoogwaardige flexibele aluminium ventilatieslang. Geschikt voor alle ventilatiesystemen.

Eenvoudig op maat te knippen en te installeren.`,
    price: 45.00,
    category: 'flexibele-slangen',
    images: [
      '/images/homepage/flexibeleslangen.jpg',
    ],
    inStock: true,
    stock: 15,
    sku: 'FLEX-180-10M',
    specs: {
      'Type': 'Flexibele slang',
      'Diameter': 'Ø180mm',
      'Lengte': '10m',
      'Materiaal': 'Aluminium',
    },
    features: [
      'Op maat te knippen',
      'Eenvoudige montage',
      'Duurzaam aluminium',
      'Universeel toepasbaar',
    ],
    relatedProducts: [4, 5],
  },

  // Filters
  {
    id: 7,
    slug: 'zehnder-filter-g4-whr-930',
    name: 'Zehnder Filter G4 voor WHR 930',
    shortDescription: 'Originele vervangingsfilter G4 voor Zehnder WHR 930 systemen.',
    description: `Origineel Zehnder vervangingsfilter G4 klasse. Zorgt voor optimale luchtkwaliteit en bescherming van uw WTW-unit.

Aanbevolen vervangingsinterval: 6 maanden.`,
    price: 24.95,
    category: 'filters',
    images: [
      '/images/homepage/ducofilters.jpg',
    ],
    inStock: true,
    stock: 50,
    sku: 'ZEHNDER-G4-930',
    specs: {
      'Merk': 'Zehnder',
      'Type': 'G4 filter',
      'Geschikt voor': 'WHR 930',
      'Filterklasse': 'G4',
      'Set': '2 stuks (toe- en afvoer)',
    },
    features: [
      'Origineel Zehnder filter',
      'Filterklasse G4',
      'Set van 2 stuks',
      'Optimale luchtkwaliteit',
    ],
    relatedProducts: [1, 2, 8],
  },
  {
    id: 8,
    slug: 'zehnder-filter-f7-whr-930',
    name: 'Zehnder Filter F7 voor WHR 930',
    shortDescription: 'Hoogwaardig vervangingsfilter F7 voor Zehnder WHR 930 systemen.',
    description: `Hoogwaardig Zehnder vervangingsfilter F7 klasse. Filtert fijnstof en pollen effectief.

Aanbevolen vervangingsinterval: 6 maanden.`,
    price: 34.95,
    category: 'filters',
    images: [
      '/images/homepage/ducofilters.jpg',
    ],
    inStock: true,
    stock: 40,
    sku: 'ZEHNDER-F7-930',
    specs: {
      'Merk': 'Zehnder',
      'Type': 'F7 filter',
      'Geschikt voor': 'WHR 930',
      'Filterklasse': 'F7 (ePM1 55%)',
      'Set': '2 stuks (toe- en afvoer)',
    },
    features: [
      'Origineel Zehnder filter',
      'Filterklasse F7',
      'Filtert fijnstof effectief',
      'Set van 2 stuks',
    ],
    relatedProducts: [1, 2, 7],
  },

  // Mechanische Ventilatoren
  {
    id: 9,
    slug: 'itho-badkamer-ventilator-bt-400',
    name: 'Itho Badkamer Ventilator BT 400',
    shortDescription: 'Stille en krachtige badkamerventilator met timer functie.',
    description: `De Itho BT 400 is een stille en krachtige badkamerventilator met ingebouwde timer.

Perfect voor badkamers tot 12m². Eenvoudig te installeren en energiezuinig.`,
    price: 89.95,
    category: 'mechanische-ventilatoren',
    images: [
      '/images/homepage/mechanischeventilatoren.jpg',
    ],
    inStock: true,
    stock: 12,
    sku: 'ITHO-BT400',
    specs: {
      'Merk': 'Itho Daalderop',
      'Model': 'BT 400',
      'Debiet': '85 m³/h',
      'Geluidsniveau': '26 dB(A)',
      'Timer': 'Ja (instelbaar)',
      'Diameter': 'Ø100mm',
      'Energieverbruik': '4W',
    },
    features: [
      'Zeer stil (26 dB)',
      'Timer functie',
      'Energiezuinig',
      'Eenvoudige montage',
    ],
    relatedProducts: [10],
  },
  {
    id: 10,
    slug: 'itho-toilet-ventilator-bt-200',
    name: 'Itho Toilet Ventilator BT 200',
    shortDescription: 'Compacte en stille toiletventilator met timer.',
    description: `De Itho BT 200 is een compacte toiletventilator, perfect voor kleinere ruimtes.

Stil en energiezuinig met timer functie.`,
    price: 69.95,
    category: 'mechanische-ventilatoren',
    images: [
      '/images/homepage/mechanischeventilatoren.jpg',
    ],
    inStock: true,
    stock: 18,
    sku: 'ITHO-BT200',
    specs: {
      'Merk': 'Itho Daalderop',
      'Model': 'BT 200',
      'Debiet': '65 m³/h',
      'Geluidsniveau': '24 dB(A)',
      'Timer': 'Ja',
      'Diameter': 'Ø100mm',
      'Energieverbruik': '3W',
    },
    features: [
      'Extra stil (24 dB)',
      'Compact formaat',
      'Timer functie',
      'Zeer energiezuinig',
    ],
    relatedProducts: [9],
  },

  // Ventielen
  {
    id: 11,
    slug: 'duco-toevoerventiel-ducogrille-classic-125',
    name: 'Duco Toevoerventiel DucoGrille Classic Ø125',
    shortDescription: 'Hoogwaardig toevoerventiel voor gebalanceerde ventilatie.',
    description: `Het DucoGrille Classic toevoerventiel zorgt voor een optimale toevoer van verse lucht.

Eenvoudig regelbaar en stil in gebruik.`,
    price: 18.95,
    category: 'ventielen',
    images: [
      '/images/homepage/ventiel.jpg',
    ],
    inStock: true,
    stock: 30,
    sku: 'DUCO-GRILLE-125',
    specs: {
      'Merk': 'Duco',
      'Type': 'Toevoerventiel',
      'Diameter': 'Ø125mm',
      'Materiaal': 'Kunststof',
      'Kleur': 'Wit (RAL 9010)',
    },
    features: [
      'Regelbaar debiet',
      'Stil in gebruik',
      'Eenvoudige montage',
      'Duurzaam kunststof',
    ],
    relatedProducts: [12],
  },
  {
    id: 12,
    slug: 'duco-afvoerventiel-ducogrille-classic-80',
    name: 'Duco Afvoerventiel DucoGrille Classic Ø80',
    shortDescription: 'Compact afvoerventiel voor vochtige ruimtes.',
    description: `Compact DucoGrille afvoerventiel, ideaal voor badkamers en toiletten.

Zorgt voor effectieve afvoer van vochtige lucht.`,
    price: 14.95,
    category: 'ventielen',
    images: [
      '/images/homepage/ventiel.jpg',
    ],
    inStock: true,
    stock: 35,
    sku: 'DUCO-GRILLE-80',
    specs: {
      'Merk': 'Duco',
      'Type': 'Afvoerventiel',
      'Diameter': 'Ø80mm',
      'Materiaal': 'Kunststof',
      'Kleur': 'Wit (RAL 9010)',
    },
    features: [
      'Compact formaat',
      'Voor vochtige ruimtes',
      'Eenvoudige montage',
      'Duurzaam',
    ],
    relatedProducts: [11],
  },
];

// Supabase → Product Type mapping
function mapSupabaseToProduct(dbProduct: any): Product {
  const images = Array.isArray(dbProduct.images) ? dbProduct.images : [];
  
  return {
    id: Math.abs(hashCode(dbProduct.id)), // Convert UUID to number
    slug: dbProduct.slug,
    name: dbProduct.name,
    shortDescription: dbProduct.short_description || '',
    description: dbProduct.description || '',
    price: parseFloat(dbProduct.price) || 0,
    oldPrice: dbProduct.sale_price ? parseFloat(dbProduct.regular_price) : undefined,
    discount: dbProduct.sale_price && dbProduct.regular_price 
      ? `-${Math.round((1 - dbProduct.sale_price / dbProduct.regular_price) * 100)}%` 
      : undefined,
    category: (dbProduct.category?.toLowerCase().replace(/\s+/g, '-') || 'producten') as any,
    images: images.length > 0 ? images : ['/images/placeholder.jpg'],
    inStock: dbProduct.stock_status === 'instock',
    stock: dbProduct.stock_quantity || 0,
    sku: dbProduct.sku || '',
    specs: dbProduct.specifications || {},
    features: [],
    relatedProducts: [],
  };
}

// Simple hash function to convert UUID to number
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Helper functies - Nu met Supabase!
export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('visibility', 'visible')
    .single();
  
  if (error || !data) {
    console.error('Error fetching product:', error);
    return undefined;
  }
  
  return mapSupabaseToProduct(data);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', `%${category}%`)
    .eq('visibility', 'visible')
    .order('created_at', { ascending: false });
  
  if (error || !data) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data.map(mapSupabaseToProduct);
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  // Since we can't query by the mapped ID easily, return undefined
  // This function is less useful with Supabase UUIDs
  return undefined;
};

export const getRelatedProducts = async (productId: number): Promise<Product[]> => {
  // Get random products from same category as "related"
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('visibility', 'visible')
    .limit(4);
  
  if (error || !data) return [];
  
  return data.map(mapSupabaseToProduct);
};

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('visibility', 'visible')
    .order('created_at', { ascending: false });
  
  if (error || !data) {
    console.error('Error fetching all products:', error);
    return [];
  }
  
  return data.map(mapSupabaseToProduct);
};
