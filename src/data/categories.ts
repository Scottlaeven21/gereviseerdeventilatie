import { CategoryInfo } from '@/types/product';

export const categories: CategoryInfo[] = [
  {
    slug: 'mechanische-ventilatoren',
    name: 'Mechanische Ventilatoren',
    description: 'Hoogwaardige gereviseerde mechanische ventilatoren voor optimale luchtverversing in uw woning.',
    image: '/images/homepage/mechanischeventilatoren.jpg',
  },
  {
    slug: 'wtw-units',
    name: 'WTW-Units',
    description: 'Warmteterugwin units van topmerken zoals Zehnder, Itho Daalderop en Duco.',
    image: '/images/homepage/ducowtw.jpg',
  },
  {
    slug: 'filters',
    name: 'Filters',
    description: 'Ventilatie filters voor optimale luchtkwaliteit en energiebesparing.',
    image: '/images/homepage/ducofilters.jpg',
  },
  {
    slug: 'flexibele-slangen',
    name: 'Flexibele Slangen',
    description: 'Hoogwaardige flexibele ventilatieslangen en dempers voor uw ventilatiesysteem.',
    image: '/images/homepage/flexibeleslangen.jpg',
  },
  {
    slug: 'ventielen',
    name: 'Ventielen',
    description: 'Ventilatieroosters en ventielen voor optimale luchttoevoer en -afvoer.',
    image: '/images/homepage/ventiel.jpg',
  },
];

export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
