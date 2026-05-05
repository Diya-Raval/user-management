import axios from 'axios'
import { handleApiError } from './errorHandler'

export const httpClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(handleApiError(error)),
)
