function ApplicationPagination({
  currentPage,
  totalPages,
  startIndex,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const endIndex =
    Math.min(
      startIndex + pageSize,
      totalItems
    );

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-500">
        Showing{" "}
        <span className="font-semibold text-neutral-800">
          {totalItems === 0
            ? 0
            : startIndex + 1}
          –{endIndex}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-neutral-800">
          {totalItems}
        </span>{" "}
        applications
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={
            currentPage === 1
          }
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          className="rounded-xl border border-neutral-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:text-neutral-400"
        >
          Previous
        </button>

        <span className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white">
          {currentPage} of{" "}
          {totalPages}
        </span>

        <button
          type="button"
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          className="rounded-xl border border-neutral-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:text-neutral-400"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default ApplicationPagination;