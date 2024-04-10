/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgSidebarDesktop': "url('../assets/images/bg-sidebar-desktop.svg')",
        'bgSidebarMobile': "url('../assets/images/bg-sidebar-mobile.svg')",
      },
    },
    colors: {
      // primary
      'marineBlue': '#02295a',
      'lightMarineBlue': '#174a8b',
      'purplishBlue': '#473dff',
      'lightPurplishBlue': '#938cfe',
      'pastelBlue': '#adbeff',
      'lightBlue': '#bfe2fd',
      'strawberryRed': '#ed3548',
  
      // neutral
      'coolGray': '#9699ab',
      'lightGray': '#d6d9e6',
      'magnolia': '#f0f6ff',
      'alabaster': '#fafbff',
      'white': '#ffffff',
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '1023px',
      // => @media (min-width: 1023px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

