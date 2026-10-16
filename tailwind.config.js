/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#E8E4DD',
        signal: {
          DEFAULT: '#E63B2E',
          hover: '#C82B1F',
          muted: 'rgba(230, 59, 46, 0.12)',
        },
        offwhite: '#F5F3EE',
        dark: {
          DEFAULT: '#111111',
          surface: '#181818',
          card: '#1F1F1F',
          border: 'rgba(255, 255, 255, 0.12)'
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px #111111',
        'brutalist-signal': '4px 4px 0px 0px #E63B2E',
        'soft': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'dark-soft': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
