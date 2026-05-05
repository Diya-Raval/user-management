import { httpClient } from './httpClient'
import type { User, UserFormValues, UsersQuery, UsersResponse } from '../types/user'

interface RawUser {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  age?: number
  gender?: string
  role?: string
  image?: string
  birthDate?: string
  university?: string
  address?: {
    address?: string
    city?: string
    state?: string
    country?: string
  }
  company?: {
    name?: string
    department?: string
    title?: string
  }
}

function getRoleFromResponse(role?: string): User['role'] {
  const normalized = (role || 'unknown').toLowerCase()
  if (
    normalized === 'admin' ||
    normalized === 'moderator' ||
    normalized === 'user' ||
    normalized === 'viewer' ||
    normalized === 'guest'
  ) {
    return normalized
  }
  return 'unknown'
}

function mapUser(raw: RawUser): User {
  return {
    id: Number(raw.id || 0),
    firstName: raw.firstName || '',
    lastName: raw.lastName || '',
    email: raw.email || '',
    phone: raw.phone || '',
    age: Number(raw.age || 0),
    gender: raw.gender === 'female' ? 'female' : 'male',
    role: getRoleFromResponse(raw.role),
    image: raw.image || '',
    birthDate: raw.birthDate || '',
    university: raw.university || '',
    address: {
      address: raw.address?.address || '',
      city: raw.address?.city || '',
      state: raw.address?.state || '',
      country: raw.address?.country || '',
    },
    company: {
      name: raw.company?.name || '',
      department: raw.company?.department || '',
      title: raw.company?.title || '',
    },
  }
}

interface UsersApiResponse {
  users: RawUser[]
  total: number
  skip: number
  limit: number
}

function toUsersResponse(data: UsersApiResponse): UsersResponse {
  return {
    users: (data.users || []).map((user) => mapUser(user)),
    total: Number(data.total || 0),
    skip: Number(data.skip || 0),
    limit: Number(data.limit || 10),
  }
}

function toSkip(page: number, limit: number) {
  return (page - 1) * limit
}

export async function getUsers(query: UsersQuery): Promise<UsersResponse> {
  const skip = toSkip(query.page, query.limit)
  const search = query.search.trim()

  const endpoint = search ? '/users/search' : '/users'
  const params: Record<string, string | number> = {
    limit: query.limit,
    skip,
    sortBy: query.sortBy === 'name' ? 'firstName' : 'age',
    order: query.order,
  }
  if (search) params.q = search
  if (query.role !== 'all') params.role = query.role
  if (query.gender !== 'all') params.gender = query.gender

  const response = await httpClient.get<UsersApiResponse>(endpoint, { params })
  return toUsersResponse(response.data)
}

export async function getUserById(id: string): Promise<User> {
  const response = await httpClient.get<RawUser>(`/users/${id}`)
  return mapUser(response.data)
}

function formToPayload(values: UserFormValues) {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    age: Number(values.age),
    gender: values.gender,
    role: values.role,
    image: values.image,
    address: {
      address: values.addressLine,
      city: values.city,
      state: values.state,
      country: values.country,
    },
    company: {
      name: values.companyName,
      department: values.department,
      title: values.title,
    },
  }
}

export async function addUser(values: UserFormValues): Promise<User> {
  const response = await httpClient.post<RawUser>('/users/add', formToPayload(values))
  return mapUser(response.data)
}

export async function updateUser(id: number, values: UserFormValues): Promise<User> {
  const response = await httpClient.put<RawUser>(`/users/${id}`, formToPayload(values))
  return mapUser(response.data)
}

export async function deleteUser(id: number): Promise<void> {
  await httpClient.delete(`/users/${id}`)
}

export async function getFilterOptions(
  key: 'role' | 'gender',
): Promise<Array<{ label: string; value: string }>> {
  const response = await httpClient.get<string[]>(`/users/${key}s`)
  return (response.data || []).map((value) => ({
    label: `${value.charAt(0).toUpperCase()}${value.slice(1)}`,
    value,
  })
  )
}
