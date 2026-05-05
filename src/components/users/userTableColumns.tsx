import { Button } from '../common/Button'
import type { User } from '../../types/user'
import { Eye, Pencil, Trash } from '@phosphor-icons/react'

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
          alt={user.firstName}
          className="h-9 w-9 rounded-full object-cover"
        />
      ),
    },
    { key: 'name', header: 'Full Name', render: (user: User) => `${user.firstName} ${user.lastName}` },
    { key: 'email', header: 'Email', render: (user: User) => user.email },
    { key: 'phone', header: 'Phone', render: (user: User) => user.phone },
    { key: 'company', header: 'Company', render: (user: User) => user.company?.name || '-' },
    { key: 'role', header: 'Role', render: (user: User) => user.role },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onView(user)}>
            <Eye size={20} />
          </Button>
          <Button variant="secondary" onClick={() => onEdit(user)}>
            <Pencil size={20} />
          </Button>
          <Button variant="danger" onClick={() => onDelete(user)}>
            <Trash size={20} />
          </Button>
        </div>
      ),
    },
  ]
}
