interface TablePaginationBarProps {
  totalRows: number
  currentPage: number
  rowsPerPage: number
  showPagination?: boolean
  onRowsPerPageChange: (size: number) => void
  onPageChange: (page: number) => void
  pages: Array<number | 'dots'>
  totalPages: number
}

export function TablePaginationBar({
  totalRows,
  currentPage,
  rowsPerPage,
  showPagination,
  onRowsPerPageChange,
  onPageChange,
  pages,
  totalPages,
}: TablePaginationBarProps) {
  const start = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const end = Math.min(currentPage * rowsPerPage, totalRows)

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>{`Showing ${start} to ${end} of ${totalRows} entries`}</span>
      </div>

      {showPagination && totalPages > 1 ? (
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="rounded-md border border-slate-300 px-2 py-1 text-sm disabled:opacity-40 dark:border-slate-700"
          >
            Previous
          </button>
          {pages.map((page, index) =>
            page === 'dots' ? (
              <span key={`dots-${index}`} className="px-1 text-slate-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`min-w-8 rounded-md border px-2 py-1 text-sm ${
                  page === currentPage
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 dark:border-slate-700'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ),
          )}
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="rounded-md border border-slate-300 px-2 py-1 text-sm disabled:opacity-40 dark:border-slate-700"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  )
}
