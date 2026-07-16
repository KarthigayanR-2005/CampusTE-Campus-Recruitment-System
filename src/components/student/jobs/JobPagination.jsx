import { ChevronLeft, ChevronRight } from "lucide-react";

function JobPagination() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">

      <button className="rounded-lg border p-3 hover:bg-neutral-100">

        <ChevronLeft size={18} />

      </button>

      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
        1
      </button>

      <button className="rounded-lg border px-4 py-2 hover:bg-neutral-100">
        2
      </button>

      <button className="rounded-lg border px-4 py-2 hover:bg-neutral-100">
        3
      </button>

      <button className="rounded-lg border p-3 hover:bg-neutral-100">

        <ChevronRight size={18} />

      </button>

    </div>
  );
}

export default JobPagination;