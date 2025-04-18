import React from 'react';

const themes = [
  "byrne",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const changeTheme = (theme) => {
    // First remove any existing theme
    document.documentElement.removeAttribute('data-theme');
    // Force a reflow
    document.documentElement.offsetHeight;
    // Then set the new theme
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setCurrentTheme(theme);
  };

  // Set initial theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // Remove any existing theme first
      document.documentElement.removeAttribute('data-theme');
      // Force a reflow
      document.documentElement.offsetHeight;
      // Then set the saved theme
      document.documentElement.setAttribute('data-theme', savedTheme);
      setCurrentTheme(savedTheme);
    }
  }, []);

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Choose Theme</span>
      </label>
      <select 
        className="select select-bordered"
        value={currentTheme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector; 