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

async function fetchAllByFilter(
  key: 'gender' | 'role',
  value: string,
  baseParams: Record<string, string | number>,
): Promise<RawUser[]> {
  const first = await httpClient.get<UsersApiResponse>('/users/filter', {
    params: { ...baseParams, limit: 0, skip: 0, key, value },
  })
  const total = Number(first.data.total || 0)
  if (total === 0) return []

  const response = await httpClient.get<UsersApiResponse>('/users/filter', {
    params: { ...baseParams, limit: total, skip: 0, key, value },
  })
  return response.data.users || []
}

export async function getUsers(query: UsersQuery): Promise<UsersResponse> {
  const skip = toSkip(query.page, query.limit)
  const search = query.search.trim()
  const hasGender = query.gender !== 'all'
  const hasRole = query.role !== 'all'
  const isDefaultSort = query.sortBy === 'name' && query.order === 'asc'
  const isCleanState = isDefaultSort && !hasGender && !hasRole && !search && !query.filtersApplied

  const baseParams: Record<string, string | number> = {
    limit: query.limit,
    skip,
    ...(!isCleanState && {
      sortBy: query.sortBy === 'name' ? 'firstName' : 'age',
      order: query.order,
    }),
  }

  // Search only (no filter)
  if (search && !hasGender && !hasRole) {
    const response = await httpClient.get<UsersApiResponse>('/users/search', {
      params: { ...baseParams, q: search },
    })
    return toUsersResponse(response.data)
  }

  // Gender only
  if (hasGender && !hasRole && !search) {
    const response = await httpClient.get<UsersApiResponse>('/users/filter', {
      params: { ...baseParams, key: 'gender', value: query.gender },
    })
    return toUsersResponse(response.data)
  }

  // Role only
  if (hasRole && !hasGender && !search) {
    const response = await httpClient.get<UsersApiResponse>('/users/filter', {
      params: { ...baseParams, key: 'role', value: query.role },
    })
    return toUsersResponse(response.data)
  }

  if (hasGender || hasRole || search) {
    let allUsers: RawUser[]

    if (hasGender) {
      allUsers = await fetchAllByFilter('gender', query.gender, baseParams)
    } else if (hasRole) {
      allUsers = await fetchAllByFilter('role', query.role, baseParams)
    } else {
      allUsers = []
    }

    if (hasGender && hasRole) {
      allUsers = allUsers.filter((u) => getRoleFromResponse(u.role) === query.role)
    }

    if (search) {
      const q = search.toLowerCase()
      allUsers = allUsers.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          (u.email || '').toLowerCase().includes(q),
      )
    }

    const total = allUsers.length
    const pageUsers = allUsers.slice(skip, skip + query.limit)

    return {
      users: pageUsers.map(mapUser),
      total,
      skip,
      limit: query.limit,
    }
  }

  // No filters
  const response = await httpClient.get<UsersApiResponse>('/users', { params: baseParams })
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
  }))
}