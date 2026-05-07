import { FunnelSimple, MagnifyingGlass, X } from '@phosphor-icons/react'
import { useMemo, useState, type ReactNode } from 'react'
import { TableFilterModal } from './TableFilterModal'
import { TablePaginationBar } from './TablePaginationBar'
import { Button } from './Button'
import { TableSkeleton } from './TableSkeleton'

interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

interface CommonTableProps<T> {
  rowData: T[]
  columns: Column<T>[]
  loading: boolean
  onRowClick?: (row: T) => void
  searchPlaceholder?: string
  searchValue: string
  showSearch?: boolean
  showPagination?: boolean
  totalRows: number
  showFilterButton?: boolean
  filterContent?: ReactNode
  onFilterOpen?: () => void
  onFilterApply?: () => void
  onFilterReset?: () => void
  currentPage: number
  rowsPerPage: number
  className?: string
  onSearch: (value: string) => void
  onPageChange: (page: number) => void
  onRowsPerPageChange: (size: number) => void
  getRowId: ({ data }: { data: T }) => string
  hasActiveFilters?: boolean
  rowPerPageOptions?: number[];
}

function getVisiblePages(currentPage: number, totalPages: number): Array<number | 'dots'> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  if (currentPage <= 4) return [1, 2, 3, 4, 5, 'dots', totalPages]
  if (currentPage >= totalPages - 3) {
    return [1, 'dots', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  return [1, 'dots', currentPage - 1, currentPage, currentPage + 1, 'dots', totalPages]
}

export function CommonTable<T>({
  rowData,
  columns,
  loading,
  onRowClick,
  searchPlaceholder,
  searchValue,
  showSearch,
  showPagination,
  totalRows,
  showFilterButton,
  filterContent,
  onFilterOpen,
  onFilterApply,
  onFilterReset,
  currentPage,
  rowsPerPage,
  className,
  onSearch,
  onPageChange,
  onRowsPerPageChange,
  getRowId,
  hasActiveFilters,
  rowPerPageOptions,
}: CommonTableProps<T>) {
  const [filterOpen, setFilterOpen] = useState(false)
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage))
  const pages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages],
  )

  return (
    <section className={`space-y-3 ${className || ''}`.trim()}>
      <div className="flex items-center gap-2">
        {showSearch ? (
          <label className="flex w-full items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900 sm:w-[360px]">
            <MagnifyingGlass size={18} className="text-slate-400" />
            <input
              value={searchValue}
              onChange={(event) => onSearch(event.target.value)}
              placeholder={searchPlaceholder || 'Search'}
              className="w-full bg-transparent text-sm outline-none"
            />
            {/* NEW: clear button */}
            {searchValue ? (
              <Button
                variant="secondary"
                onClick={() => onSearch('')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={16} />
              </Button>
            ) : null}
          </label>
        ) : null}
        {showFilterButton ? (
          <Button
            variant="secondary"
            onClick={() => {
              onFilterOpen?.()
              setFilterOpen(true)
            }}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Open filters"
          >
            <FunnelSimple size={20} />
            {/* NEW: active filter dot */}
            {hasActiveFilters ? (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
            ) : null}
          </Button>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60">
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-2 text-left text-sm font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton columns={columns.length} />
            ) : rowData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-sm text-slate-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              rowData.map((row) => (
                <tr
                  key={getRowId({ data: row })}
                  onClick={() => onRowClick?.(row)}
                  className={`border-t border-slate-200 dark:border-slate-700 ${onRowClick
                    ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    : ''
                    }`}
                >
                  {columns.map((column) => (
                    <td
                      key={`${column.key}-${getRowId({ data: row })}`}
                      className="px-3 py-2 text-sm"
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePaginationBar
        totalRows={totalRows}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        showPagination={showPagination}
        onRowsPerPageChange={onRowsPerPageChange}
        onPageChange={onPageChange}
        pages={pages}
        totalPages={totalPages}
        rowPerPageOptions={rowPerPageOptions}
      />

      <TableFilterModal
        open={Boolean(filterOpen && showFilterButton)}
        content={filterContent}
        onClose={() => setFilterOpen(false)}
        onReset={() => {
          onFilterReset?.();
          setFilterOpen(false)
        }}
        onApply={() => {
          onFilterApply?.()
          setFilterOpen(false)
        }}
      />
    </section>
  )
}