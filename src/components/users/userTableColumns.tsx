import type { User } from '../../types/user'
import { Eye, PencilSimple, Trash } from '@phosphor-icons/react'
import { RoleBadge } from '../../pages/UserDetailsPage'

interface CreateUserColumnsArgs {
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function createUserColumns({ onView, onEdit, onDelete }: CreateUserColumnsArgs) {
  return [
    {
      key: 'avatar',
      header: 'Avatar',
      render: (user: User) => (
        <img
          src={user.image || 'https://dummyjson.com/icon/emilys/128'}
          alt={user.firstName || 'User'}
          className="h-9 w-9 rounded-full object-cover"
        />
      ),
    },
    { key: 'name', header: 'Full Name', render: (user: User) => `${user.firstName || ''} ${user.lastName || ''}`.trim() },
    { key: 'email', header: 'Email', render: (user: User) => user.email || '-' },
    { key: 'phone', header: 'Phone', render: (user: User) => user.phone || '-' },
    { key: 'company', header: 'Company', render: (user: User) => user.company?.name || '-' },
    { key: 'role', header: 'Role', render: (user: User) => <RoleBadge role={user.role || '-'} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <div className="flex gap-2">
          <button
            onClick={() => onView(user)}
            className="rounded p-1 text-slate-400  hover:text-slate-500 cursor-pointer"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onEdit(user)}
            className="rounded p-1 text-slate-400  hover:text-slate-500 cursor-pointer"
            title="Edit User"
          >
            <PencilSimple size={18} />
          </button>
          <button
            onClick={() => onDelete(user)}
            className="rounded p-1 text-red-400  hover:text-red-600 
            cursor-pointer"
            title="Delete User"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ]
}
