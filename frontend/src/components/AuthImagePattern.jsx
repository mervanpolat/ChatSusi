import React from 'react'

/**
 * AuthImagePattern Component
 * 
 * A decorative component used on authentication pages (login/signup) to provide visual interest.
 * Displays a grid of animated squares along with a title and subtitle.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The main heading text to display
 * @param {string} props.subtitle - The supporting text to display below the title
 * @returns {JSX.Element} A decorative section with animated grid and text content
 */
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    // Main container - hidden on mobile, visible on large screens
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      {/* Content container with max width for better readability */}
      <div className="max-w-md text-center">
        {/* Grid of 9 animated squares (3x3) */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              // Apply pulse animation to even-numbered squares
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              // Stagger the animation delay for each square to create a wave effect
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        {/* Title text with bold styling and bottom margin */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {/* Subtitle text with reduced opacity for visual hierarchy */}
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;