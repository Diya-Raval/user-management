import type { User } from '../../types/user'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'

interface DeleteConfirmModalProps {
  open: boolean
  user: User | null
  onClose: () => void
  onConfirm: () => Promise<void>
  loading?: boolean
}

export function DeleteConfirmModal({
  open,
  user,
  onClose,
  onConfirm,
  loading,
}: DeleteConfirmModalProps) {
  return (
    <Modal open={open} title="Confirm Delete" onClose={onClose}>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Are you sure you want to delete{' '}
        <strong>{user ? `${user.firstName} ${user.lastName}` : 'this user'}</strong>?
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="danger"
          onClick={async () => {
            await onConfirm()
            onClose()
          }}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  )
}
