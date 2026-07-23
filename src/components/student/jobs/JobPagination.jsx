import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function JobPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages =
    Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1
    );

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
        className="rounded-lg border p-3 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() =>
            onPageChange(page)
          }
          className={
            page === currentPage
              ? "rounded-lg bg-blue-600 px-4 py-2 text-white"
              : "rounded-lg border px-4 py-2 hover:bg-neutral-100"
          }
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
        className="rounded-lg border p-3 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default JobPagination;