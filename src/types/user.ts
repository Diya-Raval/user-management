export type Gender = 'male' | 'female'

export type UserRole =
  | 'admin'
  | 'moderator'
  | 'user'
  | 'viewer'
  | 'guest'
  | 'unknown'

export interface UserAddress {
  address?: string
  city?: string
  state?: string
  country?: string
}

export interface UserCompany {
  name?: string
  department?: string
  title?: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: Gender
  role: UserRole
  image?: string
  birthDate?: string
  university?: string
  address?: UserAddress
  company?: UserCompany
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface UsersQuery {
  page: number
  limit: number
  search: string
  role: string
  gender: string
  sortBy: 'name' | 'age'
  order: 'asc' | 'desc'
}

export interface UserFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: Gender
  role: UserRole
  image: string
  addressLine: string
  city: string
  state: string
  country: string
  companyName: string
  department: string
  title: string
}
