import {
  BriefcaseBusiness,
  Code2,
  Globe,
  LoaderCircle,
} from "lucide-react";

function SocialLinks({
  profile,
  onChange,
  onSave,
  isSaving,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  const links = [
    {
      field: "linkedinUrl",
      name: "LinkedIn",
      placeholder:
        "https://linkedin.com/in/username",
      icon: BriefcaseBusiness,
      iconStyle:
        "bg-blue-100 text-blue-700",
    },
    {
      field: "githubUrl",
      name: "GitHub",
      placeholder:
        "https://github.com/username",
      icon: Code2,
      iconStyle:
        "bg-neutral-100 text-neutral-800",
    },
    {
      field: "portfolioUrl",
      name: "Portfolio",
      placeholder:
        "https://yourportfolio.com",
      icon: Globe,
      iconStyle:
        "bg-green-100 text-green-700",
    },
  ];

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Social Links
        </h2>

        <p className="mt-2 text-neutral-600">
          Add your professional profiles
          and portfolio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <div
              key={link.field}
              className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-5 sm:flex-row sm:items-center"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.iconStyle}`}
              >
                <Icon size={23} />
              </div>

              <div className="flex-1">
                <label
                  htmlFor={link.field}
                  className="mb-2 block font-semibold text-neutral-900"
                >
                  {link.name}
                </label>

                <input
                  id={link.field}
                  type="url"
                  value={
                    profile[link.field]
                  }
                  onChange={(event) =>
                    onChange(
                      link.field,
                      event.target.value
                    )
                  }
                  disabled={isSaving}
                  placeholder={
                    link.placeholder
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>
            </div>
          );
        })}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving && (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            )}

            {isSaving
              ? "Saving..."
              : "Save Social Links"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SocialLinks;