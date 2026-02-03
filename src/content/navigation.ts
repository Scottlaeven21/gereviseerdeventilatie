export interface NavItem {
  label: string;
  href: string;
  variant?: 'default' | 'cta';
}

export const mainNav: NavItem[] = [
  {
    label: 'Mechanische ventilatoren',
    href: '/mechanische-ventilatoren',
  },
  {
    label: 'WTW-units',
    href: '/wtw-units',
  },
  {
    label: 'Filters',
    href: '/filters',
  },
  {
    label: 'Flexibele slangen',
    href: '/flexibele-slangen',
  },
  {
    label: 'Ventielen',
    href: '/ventielen',
  },
  {
    label: 'Offerte',
    href: '/offerte',
    variant: 'cta',
  },
];

export const utilityNav: NavItem[] = [
  {
    label: 'Account',
    href: '/account',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
