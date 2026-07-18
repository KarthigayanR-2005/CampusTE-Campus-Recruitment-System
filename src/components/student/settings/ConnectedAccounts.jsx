import { useState } from "react";
import {
  BriefcaseBusiness,
  Globe,
  Code2,
  ExternalLink,
  Link2,
  Unlink,
} from "lucide-react";

function ConnectedAccounts({ settings }) {
  const [accounts, setAccounts] = useState(
    settings.connectedAccounts
  );

  const accountOptions = [
    {
      key: "github",
      title: "GitHub",
      description:
        "Showcase your repositories, contributions, and technical projects.",
      icon: Code2,
      iconStyle: "bg-neutral-900 text-white",
      placeholder: "https://github.com/username",
    },
    {
      key: "linkedin",
      title: "LinkedIn",
      description:
        "Connect your professional profile and networking presence.",
      icon: BriefcaseBusiness,
      iconStyle: "bg-blue-100 text-blue-700",
      placeholder: "https://linkedin.com/in/username",
    },
    {
      key: "portfolio",
      title: "Portfolio",
      description:
        "Share your personal website, project portfolio, or developer profile.",
      icon: Globe,
      iconStyle: "bg-green-100 text-green-700",
      placeholder: "https://yourportfolio.com",
    },
    {
      key: "leetcode",
      title: "LeetCode",
      description:
        "Highlight your coding practice, problem-solving skills, and rankings.",
      icon: Code2,
      iconStyle: "bg-orange-100 text-orange-700",
      placeholder: "https://leetcode.com/u/username",
    },
  ];

  const handleChange = (key, value) => {
    setAccounts((previousAccounts) => ({
      ...previousAccounts,
      [key]: value,
    }));
  };

  const disconnectAccount = (key) => {
    setAccounts((previousAccounts) => ({
      ...previousAccounts,
      [key]: "",
    }));
  };

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
          <Link2 size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Connected Accounts
          </h2>

          <p className="mt-2 text-neutral-600">
            Connect your professional and coding profiles to strengthen your
            CampusTE profile.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {accountOptions.map((account) => {
          const Icon = account.icon;
          const isConnected = Boolean(accounts[account.key]);

          return (
            <div
              key={account.key}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-blue-300"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${account.iconStyle}`}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {account.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isConnected
                            ? "bg-green-100 text-green-700"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {isConnected ? "Connected" : "Not Connected"}
                      </span>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                      {account.description}
                    </p>
                  </div>
                </div>

                {isConnected && (
                  <a
                    href={accounts[account.key]}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-purple-600"
                  >
                    <ExternalLink size={17} />
                    Open Profile
                  </a>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="url"
                  value={accounts[account.key]}
                  onChange={(event) =>
                    handleChange(account.key, event.target.value)
                  }
                  placeholder={account.placeholder}
                  className="min-w-0 flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

                {isConnected ? (
                  <button
                    type="button"
                    onClick={() => disconnectAccount(account.key)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Unlink size={18} />
                    Disconnect
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
                  >
                    <Link2 size={18} />
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ConnectedAccounts;