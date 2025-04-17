// Think of this like gathering all the pieces we need to build our website
// These are like puzzle pieces we'll use to build our app
import Navbar from './components/NavBar';
import { useEffect } from 'react';
// Importing all the page components that will be rendered based on routes
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

// This is like a map that helps us move between different pages
import { Routes, Route, Navigate } from 'react-router-dom';
import { axiosInstance } from './lib/axios';
import { useAuthStore } from './store/useAuthStore';

import { Loader } from 'lucide-react';

import { Toaster } from 'react-hot-toast';

// This is like the main container that holds everything in our app
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  console.log({authUser});
  
  if(isCheckingAuth) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div>
      {/* This is like a menu bar that stays at the top of every page */}
      <Navbar />

      {/* This is like a set of rules that says:
          "When someone visits this web address, show this page" */}
      <Routes>
        {/* Protected Route: Home Page
         * - Only accessible to authenticated users
         * - Redirects to login if user is not authenticated
         */}
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />

        {/* Public Route: Sign Up Page
         * - Only accessible to unauthenticated users
         * - Redirects to home if user is already authenticated
         */}
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />

        {/* Public Route: Login Page
         * - Only accessible to unauthenticated users
         * - Redirects to home if user is already authenticated
         */}
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />

        {/* Protected Route: Settings Page
         * - Accessible to authenticated users
         * - TODO: Add authentication check and redirect
         */}
        <Route path='/settings' element={<SettingsPage />} />

        {/* Protected Route: Profile Page
         * - Only accessible to authenticated users
         * - Redirects to login if user is not authenticated
         */}
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>


      <Toaster /> 
    </div>
  )
}

// This lets other parts of our app use this App component
export default App