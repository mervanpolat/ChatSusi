// Import the axios library for making HTTP requests
import axios from 'axios';

// Create and export a configured axios instance with default settings
export const axiosInstance = axios.create({
    // Set the base URL for all API requests
    // This means all requests will be prefixed with this URL
    baseURL: 'http://localhost:5001/api',
    
    // Enable sending cookies and authentication headers with cross-origin requests
    // This is important for maintaining session state and authentication
    withCredentials: true,
});