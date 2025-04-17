import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { BiMessageSquare } from 'react-icons/bi'
import { ImSpinner2 } from 'react-icons/im'
import AuthImagePattern from '../components/AuthImagePattern'
import { toast } from 'react-hot-toast'
/**
 * SignUpPage Component
 * 
 * A responsive sign-up form component that handles user registration.
 * Features:
 * - Full name, email, and password input fields
 * - Password visibility toggle
 * - Loading state during form submission
 * - Form validation
 * - Integration with authentication store
 * 
 * The component uses Tailwind CSS for styling and Lucide icons for visual elements.
 */
const SignUpPage = () => {
  // Password visibility state
  // Controls whether the password is shown in plain text or masked
  // Initialized to false for security (passwords are hidden by default)
  const [showPassword, setShowPassword] = useState(false);

  // Form data state
  // Manages all form input values in a single object
  // This approach makes it easier to handle multiple form fields
  // and maintain their state together
  const [formData, setFormData] = useState({
    fullName: '',     // User's full name
    email: '',        // User's email address
    password: '',     // User's chosen password
  });

  // Destructure needed values and functions from the auth store
  // isSigningUp: boolean indicating if registration is in progress
  // signup: function to handle the registration process
  const { isSigningUp, signup } = useAuthStore();
  
  /**
   * Validates the form data before submission
   * 
   * This function should:
   * 1. Check if full name is provided
   * 2. Validate email format
   * 3. Verify password meets requirements (length, complexity)
   * 4. Return validation results
   * 
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  }

  /**
   * Handles form submission
   * 
   * This function:
   * 1. Prevents default form submission
   * 2. Validates form data
   * 3. Calls the signup function if validation passes
   * 4. Handles success/error responses
   * 
   * @param {Event} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form Container */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              {/* App Logo */}
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BiMessageSquare className="size-6 text-primary" />
              </div>
              {/* Page Title and Subtitle */}
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input with Visibility Toggle */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {/* Password Visibility Toggle Button */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="size-5 text-base-content/40" />
                  ) : (
                    <FaEye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <ImSpinner2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Right Side - Image Container */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUpPage
