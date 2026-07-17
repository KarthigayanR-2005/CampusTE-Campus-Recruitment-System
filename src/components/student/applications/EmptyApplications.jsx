import { SearchX } from "lucide-react";

function EmptyApplications() {
  return (
    <section className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

        <SearchX
          className="text-blue-600"
          size={40}
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-neutral-800">
        No Applications Found
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-neutral-500">

        We couldn't find any applications matching your current
        search or filter criteria.

        <br />

        Try changing the filters or search using different keywords.

      </p>

    </section>
  );
}

export default EmptyApplications;