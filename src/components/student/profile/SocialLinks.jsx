import {
  BriefcaseBusiness,
  Code2,
  Globe,
  ExternalLink,
  Pencil,
} from "lucide-react";

const socialLinks = [
  {
    id: 1,
    name: "LinkedIn",
    username: "linkedin.com/in/karthigayan",
    url: "#",
    icon: BriefcaseBusiness,
    iconStyle: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "GitHub",
    username: "github.com/karthigayan",
    url: "#",
    icon: Code2,
    iconStyle: "bg-neutral-100 text-neutral-800",
  },
  {
    id: 3,
    name: "Portfolio",
    username: "karthigayan.dev",
    url: "#",
    icon: Globe,
    iconStyle: "bg-green-100 text-green-700",
  },
];

function SocialLinks() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Social Links
          </h2>

          <p className="mt-2 text-neutral-600">
            Add your professional profiles and portfolio.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 font-medium text-neutral-700 transition hover:bg-neutral-100"
        >
          <Pencil size={17} />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        {socialLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.iconStyle}`}
                >
                  <Icon size={23} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-neutral-900">
                    {link.name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-neutral-600">
                    {link.username}
                  </p>
                </div>
              </div>

              <ExternalLink
                size={19}
                className="shrink-0 text-neutral-500"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default SocialLinks;