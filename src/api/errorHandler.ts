import axios from 'axios'
import { showErrorToast } from '../utils/toast'

export function extractApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message
    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage
    }
    if (error.message) return error.message
  }
  return 'Something went wrong. Please try again.'
}

export function handleApiError(error: unknown): Error {
  const message = extractApiErrorMessage(error)
  showErrorToast(message)
  return new Error(message)
}
