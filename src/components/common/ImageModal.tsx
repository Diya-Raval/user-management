// components/common/ImageModal.tsx
import { Modal } from './Modal'

interface ImageModalProps {
  open: boolean
  image: string
  onClose: () => void
}

export function ImageModal({ open, image, onClose }: ImageModalProps) {
  if (!image) return null

  return (
    <Modal open={open} title="Image Preview" onClose={onClose}>
      <div className="flex items-center justify-center p-4">
        <img
          src={image}
          alt="Preview"
          className="max-h-[80vh] w-auto rounded-lg object-contain"
        />
      </div>
    </Modal>
  )
}