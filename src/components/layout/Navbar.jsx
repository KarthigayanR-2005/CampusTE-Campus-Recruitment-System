import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-neutral-200 bg-white"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 transition-opacity duration-200 hover:opacity-90"
        >
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white"
          >
            CT
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight text-neutral-900">
              CampusTE
            </span>
            <span className="text-xs leading-tight text-neutral-500">
              AI Placement Platform
            </span>
          </div>
        </Link>

        <ul className="flex items-center gap-1">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
