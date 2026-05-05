import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { User, UserFormValues } from '../../types/user'
import { Button } from '../common/Button'
import { InputField } from '../common/InputField'
import { Modal } from '../common/Modal'
import { SelectField } from '../common/SelectField'
import { ImageModal } from '../common/ImageModal'
import { Eye } from '@phosphor-icons/react'
import { Loader } from '../common/Loader'

interface UserFormModalProps {
  open: boolean
  user: User | null
  loadingUser?: boolean
  onClose: () => void
  onSubmit: (values: UserFormValues) => Promise<void>
}

const STATIC_IMAGE_URL = 'https://dummyjson.com/icon/emilys/128'

const initialValues: UserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: 18,
  gender: 'male',
  role: 'user',
  image: '',
  addressLine: '',
  city: '',
  state: '',
  country: '',
  companyName: '',
  department: '',
  title: '',
}

function getValues(user: User | null): UserFormValues {
  if (!user) return initialValues
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.age || 18,
    gender: user.gender,
    role: user.role,
    image: user.image || '',
    addressLine: user.address?.address || '',
    city: user.address?.city || '',
    state: user.address?.state || '',
    country: user.address?.country || '',
    companyName: user.company?.name || '',
    department: user.company?.department || '',
    title: user.company?.title || '',
  }
}

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().trim().email('Invalid email address').required('Email is required'),
  phone: Yup.string()
  .trim()
  .matches(
    /^\+?[0-9\s-]+$/,
    'Phone number can contain digits, spaces, dashes and +'
  )
  .test(
    'len',
    'Phone number must have at least 10 digits',
    (value) => {
      if (!value) return false
      const digitsOnly = value.replace(/\D/g, '')
      return digitsOnly.length >= 10
    }
  )
  .required('Phone is required'),
  age: Yup.number().typeError('Age must be a number').min(1, 'Age must be positive').required('Age is required'),
  gender: Yup.string().required('Gender is required'),
  role: Yup.string().required('Role is required'),
  addressLine: Yup.string().trim().required('Address is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  country: Yup.string().trim().required('Country is required'),
  companyName: Yup.string().trim().required('Company name is required'),
  department: Yup.string().trim().required('Department is required'),
  title: Yup.string().trim().required('Title is required'),
})

export function UserFormModal({ open, user, loadingUser, onClose, onSubmit }: UserFormModalProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEdit = Boolean(user)

  const formik = useFormik<UserFormValues>({
    initialValues: getValues(user),
    validationSchema,
    enableReinitialize: true, // re-populates form when user prop changes after fetch
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values)
        onClose()
      } finally {
        setSubmitting(false)
      }
    },
  })

  // Reset image preview state when modal opens/closes or user changes
  const imagePreview = formik.values.image

  // Clear form on close
  useEffect(() => {
    if (!open) {
      formik.resetForm({ values: getValues(null) })
    }
  }, [open])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowed.includes(file.type)) {
      formik.setFieldError('image', 'Only JPG, JPEG, or PNG files are allowed')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      // Show local preview via base64, but submit static URL
      formik.setFieldValue('image', ev.target?.result as string)
    }
    reader.readAsDataURL(file)
    // Stash the static URL to be used on submit
    formik.setFieldValue('_imageUrl', STATIC_IMAGE_URL)
  }

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <>
      <Modal open={open} title={isEdit ? 'Edit User' : 'Add User'} onClose={handleClose}>
        {loadingUser ? (
          <Loader />
        ) : (
          <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={formik.handleSubmit}>
            <InputField
              id="firstName" label="First Name *"
              value={formik.values.firstName}
              error={formik.touched.firstName ? formik.errors.firstName : undefined}
              onChange={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
            />
            <InputField
              id="lastName" label="Last Name *"
              value={formik.values.lastName}
              error={formik.touched.lastName ? formik.errors.lastName : undefined}
              onChange={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
            />
            <InputField
              id="email" label="Email *"
              value={formik.values.email}
              error={formik.touched.email ? formik.errors.email : undefined}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            <InputField
              id="phone" label="Phone *"
              value={formik.values.phone}
              error={formik.touched.phone ? formik.errors.phone : undefined}
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
            />
            <InputField
              id="age" label="Age *" type="number"
              value={String(formik.values.age)}
              error={formik.touched.age ? formik.errors.age : undefined}
              onChange={formik.handleChange('age')}
              onBlur={formik.handleBlur('age')}
            />
            <SelectField
              id="gender" label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange('gender')}
              options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
            />
            <SelectField
              id="role" label="Role"
              value={formik.values.role}
              onChange={formik.handleChange('role')}
              options={[{ label: 'Admin', value: 'admin' }, { label: 'Moderator', value: 'moderator' }, { label: 'User', value: 'user' }]}
            />

            {/* Profile Image Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile Image</label>
              <div className="flex items-center gap-3">
                <div className="relative h-20 w-20">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 rounded-full object-cover border border-slate-200"
                      />

                      {/* Eye Icon */}
                      <button
                        type="button"
                        onClick={() => setImageModalOpen(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition cursor-pointer"
                      >
                        <Eye size={20} />
                      </button>
                    </>
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                      No img
                    </div>
                  )}
                </div>
                <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                  Upload
                </Button>
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleImageUpload} />
              </div>
              {formik.errors.image ? <span className="text-xs text-red-500">{formik.errors.image}</span> : null}
              <span className="text-xs text-slate-400">JPG, JPEG or PNG only</span>
            </div>

            <InputField
              id="addressLine" label="Address Line *"
              value={formik.values.addressLine}
              error={formik.touched.addressLine ? formik.errors.addressLine : undefined}
              onChange={formik.handleChange('addressLine')}
              onBlur={formik.handleBlur('addressLine')}
            />
            <InputField
              id="city" label="City *"
              value={formik.values.city}
              error={formik.touched.city ? formik.errors.city : undefined}
              onChange={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
            />
            <InputField
              id="state" label="State *"
              value={formik.values.state}
              error={formik.touched.state ? formik.errors.state : undefined}
              onChange={formik.handleChange('state')}
              onBlur={formik.handleBlur('state')}
            />
            <InputField
              id="country" label="Country *"
              value={formik.values.country}
              error={formik.touched.country ? formik.errors.country : undefined}
              onChange={formik.handleChange('country')}
              onBlur={formik.handleBlur('country')}
            />
            <InputField
              id="companyName" label="Company Name *"
              value={formik.values.companyName}
              error={formik.touched.companyName ? formik.errors.companyName : undefined}
              onChange={formik.handleChange('companyName')}
              onBlur={formik.handleBlur('companyName')}
            />
            <InputField
              id="department" label="Department *"
              value={formik.values.department}
              error={formik.touched.department ? formik.errors.department : undefined}
              onChange={formik.handleChange('department')}
              onBlur={formik.handleBlur('department')}
            />
            <InputField
              id="title" label="Title *"
              value={formik.values.title}
              error={formik.touched.title ? formik.errors.title : undefined}
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
            />

            <div className="col-span-full mt-2 flex justify-end gap-2">
              <Button variant="secondary" type="button" onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create User'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
      <ImageModal
        open={imageModalOpen}
        image={imagePreview}
        onClose={() => setImageModalOpen(false)}
      />
    </>
  )
}