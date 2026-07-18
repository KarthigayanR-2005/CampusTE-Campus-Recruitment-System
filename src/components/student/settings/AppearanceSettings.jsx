import { useState } from "react";
import {
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  Palette,
} from "lucide-react";

function AppearanceSettings({ settings }) {
  const [selectedTheme, setSelectedTheme] = useState(
    settings.appearance.theme
  );

  const themes = [
    {
      name: "Light",
      description: "Bright interface for daytime productivity.",
      icon: Sun,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Dark",
      description: "Comfortable viewing in low-light environments.",
      icon: Moon,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      name: "System",
      description: "Automatically match your device settings.",
      icon: Monitor,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">

          <Palette size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-neutral-900">
            Appearance
          </h2>

          <p className="mt-2 text-neutral-600">
            Customize how CampusTE looks on your device.
          </p>

        </div>

      </div>

      {/* Theme Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        {themes.map((theme) => {
          const Icon = theme.icon;

          const isSelected =
            selectedTheme === theme.name;

          return (
            <button
              key={theme.name}
              type="button"
              onClick={() => setSelectedTheme(theme.name)}
              className={`relative rounded-3xl border p-6 text-left transition duration-300 ${
                isSelected
                  ? "border-blue-600 shadow-lg"
                  : "border-neutral-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >

              {/* Selected Badge */}

              {isSelected && (
                <div className="absolute right-5 top-5">

                  <CheckCircle2
                    size={24}
                    className="text-blue-600"
                  />

                </div>
              )}

              {/* Icon */}

              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${theme.bgColor}`}
              >

                <Icon
                  size={34}
                  className={theme.iconColor}
                />

              </div>

              {/* Content */}

              <h3 className="text-xl font-bold text-neutral-900">
                {theme.name}
              </h3>

              <p className="mt-3 leading-7 text-neutral-600">
                {theme.description}
              </p>

            </button>
          );
        })}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-blue-50 p-5">

        <p className="text-sm leading-6 text-blue-700">

          <strong>Note:</strong> Theme changes are currently
          stored locally. When backend integration is completed,
          your preferred appearance will automatically sync across
          all your devices.

        </p>

      </div>

    </section>
  );
}

export default AppearanceSettings;