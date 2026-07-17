import { ChevronLeft, ChevronRight } from "lucide-react";

function NotificationPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <section className="flex items-center justify-center gap-3">

      {/* Previous */}

      <button
        onClick={() =>
          setCurrentPage((page) => Math.max(page - 1, 1))
        }
        disabled={currentPage === 1}
        className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />

        Previous

      </button>

      {/* Page Numbers */}

      <div className="flex gap-2">

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-11 w-11 rounded-xl font-semibold transition ${
                currentPage === page
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "border border-neutral-300 bg-white hover:bg-neutral-100"
              }`}
            >
              {page}
            </button>
          );
        })}

      </div>

      {/* Next */}

      <button
        onClick={() =>
          setCurrentPage((page) =>
            Math.min(page + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next

        <ChevronRight size={18} />

      </button>

    </section>
  );
}

export default NotificationPagination;