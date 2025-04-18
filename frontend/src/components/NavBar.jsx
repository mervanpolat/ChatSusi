// Import necessary dependencies
import { useAuthStore } from '../store/useAuthStore';  // Custom hook for authentication state management
import { useThemeStore } from '../store/useThemeStore';  // Custom hook for theme state management
import { Link } from 'react-router-dom';  // React Router component for navigation
import { MessageSquare, Settings, User, LogOut } from 'lucide-react';  // Icon components from Lucide

/**
 * NavBar Component
 * 
 * A responsive navigation bar component that appears at the top of the application.
 * Features:
 * - Logo and app name
 * - Navigation links (Settings, Profile)
 * - Authentication status display
 * - Logout functionality
 * - Responsive design with mobile-friendly layout
 */
const NavBar = () => {
  // Get authentication state and logout function from the auth store
  const { authUser, logout } = useAuthStore();
  // Get current theme from theme store
  const { theme } = useThemeStore();

  return (
    // Header container with fixed positioning and styling
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      {/* Main container with max width and padding */}
      <div className="container mx-auto px-4 h-16">
        {/* Flex container for horizontal layout */}
        <div className="flex items-center justify-between h-full">
          {/* Left section containing logo and app name */}
          <div className="flex items-center gap-8">
            {/* Logo link to home page */}
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              {/* Logo icon container */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              {/* App name */}
              <h1 className="text-lg font-bold">ChatSusi</h1>
            </Link>
          </div>

          {/* Right section containing navigation links and auth controls */}
          <div className="flex items-center gap-2">
            {/* Settings link */}
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              ${theme === 'byrne' ? 'btn-neutral text-base-100' : ''}
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Conditional rendering based on authentication status */}
            {authUser && (
              <>
                {/* Profile link - only shown when user is authenticated */}
                <Link 
                  to={"/profile"} 
                  className={`
                    btn btn-sm gap-2 transition-colors
                    ${theme === 'byrne' ? 'btn-neutral text-base-100' : ''}
                  `}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout button - only shown when user is authenticated */}
                <button 
                  className={`
                    btn btn-sm gap-2 transition-colors
                    ${theme === 'byrne' ? 'btn-accent text-accent-content' : ''}
                  `} 
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Export the NavBar component for use in other parts of the application
export default NavBar;