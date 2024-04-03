/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgSidebarDesktop': "url('../assets/images/bg-sidebar-desktop.svg')",
      },
    },
    colors: {
      // primary
      'marineBlue': '#02295a',
      'purplishBlue': '#473dff',
      'pastelBlue': '#adbeff',
      'lightBlue': '#bfe2fd',
      'strawberryRed': '#ed3548',
  
      // neutral
      'coolGray': '#9699ab',
      'lightGray': '#d6d9e6',
      'magnolia': '#f0f6ff',
      'alabaster': '#fafbff',
      'white': '#ffffff',
    }
  },
  plugins: [],
}

