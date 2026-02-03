import { mainNav, utilityNav } from '@/content/navigation';
import { NavItem } from './NavItem';

export function MainNav() {
  return (
    <nav className="flex items-center gap-1">
      {mainNav.map((item) => (
        <NavItem key={item.href} item={item} />
      ))}
    </nav>
  );
}

export function UtilityNav() {
  return (
    <nav className="flex items-center gap-1">
      {utilityNav.map((item) => (
        <NavItem key={item.href} item={item} />
      ))}
    </nav>
  );
}
