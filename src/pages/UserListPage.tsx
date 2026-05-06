import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom'
import { CommonTable } from '../components/common/CommonTable'
import { DeleteConfirmModal } from '../components/users/DeleteConfirmModal'
import { UserFormModal } from '../components/users/UserFormModal'
import { UserTableFilters } from '../components/users/UserTableFilters'
import { createUserColumns } from '../components/users/userTableColumns'
import { addUser, deleteUser, getUserById, getUsers, updateUser } from '../api/usersApi'
import type { User } from '../types/user'
import { Button } from '../components/common/Button'
import { showSuccessToast } from '../utils/toast';
import { MESSAGES } from '../constants/message';

type SortBy = 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'

const PAGE_SIZE = 10

function parseSortBy(sortBy: SortBy): { sortBy: 'name' | 'age'; order: 'asc' | 'desc' } {
  const [field, order] = sortBy.split('-') as ['name' | 'age', 'asc' | 'desc']
  return { sortBy: field, order }
}

export function UserListPage() {
  const navigate = useNavigate()

  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE)

  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const [gender, setGender] = useState('all')
  const [sortBy, setSortBy] = useState<SortBy>('name-asc')

  const [pendingRole, setPendingRole] = useState('all')
  const [pendingGender, setPendingGender] = useState('all')
  const [pendingSortBy, setPendingSortBy] = useState<SortBy>('name-asc')

  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(false)

  const [debouncedSearch] = useDebounce(search, 500)

  const [filtersApplied, setFiltersApplied] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)

  const hasActiveFilters = role !== 'all' || gender !== 'all' || filtersApplied

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const { sortBy: sortField, order } = parseSortBy(sortBy)
      const result = await getUsers({ page, limit: rowsPerPage, search: debouncedSearch, role, gender, sortBy: sortField, order, filtersApplied })
      setUsers(result.users)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [page, rowsPerPage, debouncedSearch, role, gender, sortBy, filtersApplied])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleFilterApply = () => {
    setRole(pendingRole)
    setGender(pendingGender)
    setSortBy(pendingSortBy)
    setFiltersApplied(true)
    setPage(1)
  }

  const handleFilterReset = () => {
    setPendingRole('all')
    setPendingGender('all')
    setPendingSortBy('name-asc')
    setRole('all')
    setGender('all')
    setSortBy('name-asc')
    setFiltersApplied(false)
    setPage(1)
  }

  const handleFilterOpen = () => {
    setPendingRole(role)
    setPendingGender(gender)
    setPendingSortBy(sortBy)
  }

  const handleEdit = async (user: User) => {
    setEditingUser(null)
    setLoadingUser(true)
    setFormOpen(true)
    try {
      const data = await getUserById(String(user.id))
      setEditingUser(data)
    } finally {
      setLoadingUser(false)
    }
  }

  const handleDelete = (user: User) => {
    setDeleteTarget(user)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setLoading(true)
    try {
      await deleteUser(deleteTarget.id)
      showSuccessToast(MESSAGES.TOASTS.USER_DELETED)
      fetchUsers()
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (values: any) => {
    if (editingUser) {
      await updateUser(editingUser.id, values)
      showSuccessToast(MESSAGES.TOASTS.USER_UPDATED)
    } else {
      await addUser(values)
      showSuccessToast(MESSAGES.TOASTS.USER_CREATED)
    }
    fetchUsers()
  }

  const columns = useMemo(
    () =>
      createUserColumns({
        onView: (user) => navigate(`/users/${user.id}`),
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [],
  )

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10 pt-20">
      <header className="mb-4 flex justify-end">
        <Button onClick={() => { setEditingUser(null); setFormOpen(true) }}>
          Add User
        </Button>
      </header>

      <CommonTable
        rowData={users}
        columns={columns}
        loading={loading}
        searchValue={search}
        onSearch={handleSearch}
        showSearch
        showPagination
        showFilterButton
        hasActiveFilters={hasActiveFilters}
        totalRows={total}
        currentPage={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        rowPerPageOptions={[10, 20, 50, 100]}
        onRowsPerPageChange={(size) => { setRowsPerPage(size); setPage(1) }}
        onFilterOpen={handleFilterOpen}
        onFilterApply={handleFilterApply}
        onFilterReset={handleFilterReset}
        getRowId={({ data }) => String((data as User).id)}
        filterContent={
          <UserTableFilters
            role={pendingRole}
            gender={pendingGender}
            sortBy={pendingSortBy}
            onRoleChange={setPendingRole}
            onGenderChange={setPendingGender}
            onSortByChange={setPendingSortBy}
          />
        }
      />

      <UserFormModal
        open={formOpen}
        user={editingUser}
        loadingUser={loadingUser}
        onClose={() => { setFormOpen(false); setEditingUser(null) }}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        user={deleteTarget}
        loading={loading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  )
}