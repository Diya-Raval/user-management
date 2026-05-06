import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Buildings,
  Envelope,
  IdentificationCard,
  MapPin,
  Phone,
} from '@phosphor-icons/react'
import { getUserById } from '../api/usersApi'
import { ErrorState } from '../components/common/ErrorState'
import { Loader } from '../components/common/Loader'
import { Card } from '../components/common/Card'
import type { User } from '../types/user'

function Field({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
        {value || <span className="text-slate-400 dark:text-slate-600">—</span>}
      </span>
    </div>
  )
}

export function RoleBadge({ role }: { role: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      {role ? role.charAt(0).toUpperCase() + role.slice(1) : ''}
    </span>
  )
}

export function UserDetailsPage() {
  const { id = '' } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getUserById(id)
        setUser(data)
      } catch {
        setError('Unable to load user details.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])


  const fullName = user ? `${user.firstName} ${user.lastName}` : ''

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-20">

      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeft size={16} weight="bold" />
        Back to Users
      </Link>

      {loading && (
        <div className="flex h-[60vh] items-center justify-center">
          <Loader />
        </div>
      )}

      {!loading && error && (
        <ErrorState message={error || 'User not found'} />
      )}
      {!loading && !error && user && (
        <>
          <Card className="mb-4">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <img
                src={user.image}
                alt={fullName}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800"
              />
              <div className="flex flex-1 flex-col gap-3 text-center sm:text-left">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{fullName}</h1>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {user.company?.title || 'No title'} · {user.company?.name || 'No company'}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                  {user.email && (
                    <a
                      href={`mailto:${user.email}`}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      <Envelope size={18} />
                      {user.email}
                    </a>
                  )}
                  {user.phone && (
                    <a
                      href={`tel:${user.phone}`}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      <Phone size={18} />
                      {user.phone}
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <RoleBadge role={user.role} />
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {user.gender}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Age {user.age}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">

            <Card title="Address" icon={<MapPin size={14} />}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <Field label="Street" value={user.address?.address} />
                <Field label="City" value={user.address?.city} />
                <Field label="State" value={user.address?.state} />
                <Field label="Country" value={user.address?.country} />
              </div>
            </Card>

            <Card title="Company" icon={<Buildings size={14} />}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <Field label="Name" value={user.company?.name} />
                <Field label="Department" value={user.company?.department} />
                <Field label="Title" value={user.company?.title} />
              </div>
            </Card>

            <Card title="Personal Information" icon={<IdentificationCard size={14} />}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <Field label="Birth Date" value={user.birthDate} />
                <Field label="University" value={user.university} />
              </div>
            </Card>

          </div>
        </>
      )}
    </main>
  )
}