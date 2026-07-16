import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

const resourceLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Help Center', path: '/help' },
];

const linkClassName =
  'inline-block rounded-md text-sm text-neutral-600 transition-colors duration-200 hover:text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500';

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
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
            <p className="max-w-sm text-sm leading-relaxed text-neutral-600">
              Empowering universities, students, recruiters, and placement
              officers through AI-driven campus recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <nav aria-label="Quick links">
              <h3 className="mb-4 text-sm font-semibold text-neutral-900">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className={linkClassName}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Resources">
              <h3 className="mb-4 text-sm font-semibold text-neutral-900">
                Resources
              </h3>
              <ul className="space-y-3">
                {resourceLinks.map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className={linkClassName}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              Contact
            </h3>
            <address className="space-y-3 not-italic">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Email
                </p>
                <a
                  href="mailto:support@campuste.ai"
                  className="text-sm text-neutral-600 transition-colors duration-200 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                >
                  support@campuste.ai
                </a>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Phone
                </p>
                <p className="text-sm text-neutral-600">+91 XXXXX XXXXX</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Location
                </p>
                <p className="text-sm text-neutral-600">India</p>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-center text-sm text-neutral-500">
            &copy; 2026 CampusTE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
