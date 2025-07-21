import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 flex-nowrap overflow-x-auto">
        <li className="flex-shrink-0">
          <Link 
            to="/" 
            className="flex items-center hover:text-[#DC5F12] transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center flex-shrink-0">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
            {item.path ? (
              <Link 
                to={item.path}
                className="hover:text-[#DC5F12] transition-colors truncate overflow-hidden whitespace-nowrap max-w-[180px] block"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium truncate overflow-hidden whitespace-nowrap max-w-[180px] block" title={item.label}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 