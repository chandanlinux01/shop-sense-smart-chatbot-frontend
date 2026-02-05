import axios from 'axios';

/**
 * Standardized Error Handler for API requests
 * It handles:
 * 1. API responses with error messages (4xx/5xx)
 * 2. Network errors (Server down, no internet)
 * 3. Unexpected code errors
 */
export function handleApiError(error: any): string {
    if (axios.isAxiosError(error)) {
        // 1. Server responded with a status code other than 2xx
        if (error.response) {
            const data = error.response.data;
            // Industry Standard: Checking multiple common error fields
            return (
                data?.detail ||
                data?.message ||
                data?.error ||
                `Error: ${error.response.statusText}`
            );
        }

        // 2. Request was made but no response was received (Network/Timeout)
        if (error.request) {
            return "No response from server. Please check your internet connection.";
        }

        // 3. Something happened in setting up the request
        return `Request failed: ${error.message}`;
    }

    // 4. Non-Axios errors (General JS errors)
    return error.message || "An unexpected error occurred.";
}
