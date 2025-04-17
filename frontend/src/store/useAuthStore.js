import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

// Create an authentication store using Zustand
export const useAuthStore = create((set) => ({
    // State variables
    authUser: null, // Stores the currently authenticated user's data
    isSigningUp: false, // Loading state for signup process
    isLoggingIn: false, // Loading state for login process
    isUpdatingProfile: false, // Loading state for profile updates
    isCheckingAuth: true, // Loading state for initial auth check

    // Method to check if user is authenticated
    checkAuth: async () => {
        try {
            // Make a GET request to check authentication status
            // The baseURL is already configured in axios.js to point to localhost:5173/api
            const res = await axiosInstance.get('/auth/check');
            // Update store with authenticated user data
            set({ authUser: res.data });
        } catch (error) {
            // Log error and clear auth user if check fails
            console.log(`Error checking auth: ${error}`);
            set({ authUser: null });
        } finally {
            // Always set checking state to false after attempt
            set({ isCheckingAuth: false });
        }
    },

    // Method to handle user signup
    signup: async (data) => {
        // Set loading state for signup process
        set({ isSigningUp: true });

        try {
            // Send POST request to create new user account
            const res = await axiosInstance.post('/auth/signup', data);
            // Update store with new user data
            set({ authUser: res.data });
            // Show success notification
            toast.success('Account created successfully');
        } catch (error) {
            // Log error and show error message to user
            console.log(`Error signing up: ${error}`);
            toast.error(error.response.data.message);
        } finally {
            // Reset loading state
            set({ isSigningUp: false });
        }
    },
    // Method to handle user login
    login: async (data) => {
        // Set loading state for login process
        set({ isLoggingIn: true });
        try {
            // Send POST request to login user
            const res = await axiosInstance.post('/auth/login', data);
            // Update store with authenticated user data
            set({ authUser: res.data });
            // Show success notification
            toast.success('Logged in successfully');
        } catch (error) {
            // Log error and show error message to user
            console.log(`Error logging in: ${error}`);
            toast.error(error.response.data.message);
        } finally {
            // Reset loading state
            set({ isLoggingIn: false });
        }
    },

    // Method to handle user logout
    logout: async () => {
        try {
            // Send POST request to logout user
            await axiosInstance.post('/auth/logout');
            // Update store to clear auth user
            set({ authUser: null });
            // Show success notification
            toast.success('Logged out successfully');
        } catch (error) {
            // Log error and show error message to user
            console.log(`Error logging out: ${error}`);
            toast.error(error.response.data.message);
        }
    }
    


}));