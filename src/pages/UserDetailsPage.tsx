import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from '../api/usersApi'
import { ErrorState } from '../components/common/ErrorState'
import { Loader } from '../components/common/Loader'
import type { User } from '../types/user'

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

  if (loading) return <Loader />
  if (error || !user) return <ErrorState message={error || 'User not found'} />

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10 pt-20">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Details</h1>
        <Link
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
          to="/"
        >
          Back to Users
        </Link>
      </header>

      <section className="mb-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-lg font-semibold">Basic Information</h2>
        <img className="mb-2 h-20 w-20 rounded-full" src={user.image} alt={user.firstName} />
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{`Age: ${user.age}`}</p>
        <p>{`Gender: ${user.gender}`}</p>
        <p>{`Role: ${user.role}`}</p>
      </section>

      <section className="mb-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-lg font-semibold">Address Information</h2>
        <p>{`Address: ${user.address?.address || '-'}`}</p>
        <p>{`City: ${user.address?.city || '-'}`}</p>
        <p>{`State: ${user.address?.state || '-'}`}</p>
        <p>{`Country: ${user.address?.country || '-'}`}</p>
      </section>

      <section className="mb-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-lg font-semibold">Company Information</h2>
        <p>{`Company: ${user.company?.name || '-'}`}</p>
        <p>{`Department: ${user.company?.department || '-'}`}</p>
        <p>{`Title: ${user.company?.title || '-'}`}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-2 text-lg font-semibold">Additional Information</h2>
        <p>{`Birth Date: ${user.birthDate || '-'}`}</p>
        <p>{`University: ${user.university || '-'}`}</p>
      </section>
    </main>
  )
}
