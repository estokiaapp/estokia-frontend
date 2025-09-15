/**
 * Parses API error responses and extracts detailed error messages
 * @param error - The error object from axios/API response
 * @param fallbackMessage - Default message if no specific error is found
 * @returns Formatted error message including validation details if available
 */
export function parseApiError(error: any, fallbackMessage: string): string {
  const errorData = error.response?.data;
  let errorMessage = fallbackMessage;

  if (errorData?.message) {
    errorMessage = errorData.message;

    // Show validation details if they exist
    if (errorData.details && Array.isArray(errorData.details)) {
      const validationErrors = errorData.details
        .map((detail: any) => detail.message)
        .join(', ');
      errorMessage = `${errorData.message}: ${validationErrors}`;
    }
  }

  return errorMessage;
}