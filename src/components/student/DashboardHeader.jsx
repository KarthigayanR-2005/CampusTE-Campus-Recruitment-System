import { CalendarDays } from "lucide-react";

function DashboardHeader() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">

      <div>

        <h1 className="text-3xl font-bold text-neutral-900">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-neutral-600">
          Here's an overview of your placement journey.
        </p>

      </div>

      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 shadow-sm">

        <CalendarDays
          size={20}
          className="text-blue-600"
        />

        <span className="text-sm font-medium text-neutral-700">
          {formattedDate}
        </span>

      </div>

    </section>
  );
}

export default DashboardHeader;