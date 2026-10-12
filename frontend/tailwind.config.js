/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gyanBlue: "#1565C0",
        navyDark: "#1F3A6E",
        khetGreen: "#2E7D32",
        suryaOrange: "#E65100",
        sunYellow: "#FFC93C",
        hintAmber: "#FFB300",
        skyBg: "#EAF6FF",
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(18deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      animation: {
        wave: 'wave 1.2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
