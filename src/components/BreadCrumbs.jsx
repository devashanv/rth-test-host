import { ChevronRight } from 'lucide-react';

const BreadCrumbs = () => {
  return (
    <nav className="text-sm text-body w-auto bg-black/5  backdrop-blur-xs border border-white/20 text-white px-6 py-3 rounded-2xl" aria-label="Breadcrumb">
      <ol className="flex w-auto items-center space-x-1 sm:space-x-2">
        <li>
          <a href="/" className="hover:underline text-body/[0.8] font-medium">
            Home
          </a>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-body/[0.8]" />
        </li>
        <li>
          <a href="/packages" className="hover:underline text-body/[0.8] font-medium">
            Packages
          </a>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-body font-bold" />
        </li>
        <li className="text-body" aria-current="page">
          Europe Tour
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
