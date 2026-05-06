import axios from 'axios'
import { showErrorToast } from '../utils/toast'
import { MESSAGES } from '../constants/message';

export function extractApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message || error.response?.data?.error
    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage
    }

    const status = error.response?.status || error.status || (error as any).statusCode;
    if (status) {
      switch (status) {
        case 400: return MESSAGES.ERRORS.BAD_REQUEST
        case 401: return MESSAGES.ERRORS.UNAUTHORIZED
        case 403: return MESSAGES.ERRORS.FORBIDDEN
        case 404: return MESSAGES.ERRORS.NOT_FOUND
        case 408: return MESSAGES.ERRORS.TIMEOUT
        case 429: return MESSAGES.ERRORS.TOO_MANY_REQUESTS
        case 500: return MESSAGES.ERRORS.INTERNAL_SERVER
        case 502:
        case 503:
        case 504: return MESSAGES.ERRORS.SERVICE_UNAVAILABLE
        default: return `${MESSAGES.ERRORS.STATUS_CODE_PREFIX}${status}${MESSAGES.ERRORS.STATUS_CODE_SUFFIX}`
      }
    }

    if (error.code === 'ECONNABORTED') {
      return MESSAGES.ERRORS.NETWORK_TIMEOUT
    }

    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      return MESSAGES.ERRORS.NETWORK_RATE_LIMIT
    }

    if (error.message) {
      return error.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return MESSAGES.ERRORS.UNEXPECTED
}

export function handleApiError(error: unknown): Error {
  const message = extractApiErrorMessage(error)
  showErrorToast(message)
  return new Error(message)
}
