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
  },
  plugins: [],
}

