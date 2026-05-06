export const MESSAGES = {
    ERRORS: {
      BAD_REQUEST: 'Bad request. Please check your input.',
      UNAUTHORIZED: 'Unauthorized. Please log in again.',
      FORBIDDEN: 'Forbidden. You do not have permission to perform this action.',
      NOT_FOUND: 'The requested resource was not found.',
      TIMEOUT: 'Request timeout. Please try again.',
      TOO_MANY_REQUESTS: 'Too many requests. Please wait a moment and try again.',
      INTERNAL_SERVER: 'Internal server error. Please try again later.',
      SERVICE_UNAVAILABLE: 'Service unavailable. Please try again later.',
      NETWORK_TIMEOUT: 'The request timed out. Please check your internet connection.',
      NETWORK_RATE_LIMIT: 'Network Error: Unable to connect. If you made several requests quickly, you may be rate-limited. Please wait a moment and try again.',
      UNEXPECTED: 'An unexpected error occurred. Please try again.',
      STATUS_CODE_PREFIX: 'An error occurred (Status code: ',
      STATUS_CODE_SUFFIX: ').',
    },
    TOASTS: {
      USER_DELETED: 'User deleted successfully',
      USER_UPDATED: 'User updated successfully',
      USER_CREATED: 'User created successfully',
    }
  }
  