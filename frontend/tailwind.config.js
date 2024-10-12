/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3498db',
        'secondary': '#2ecc71',
        'accent': '#e74c3c',
      },
      fontFamily: {
        'geist': ["Geist", "sans-serif"],  // Merged here
        'inconsolata': ["Inconsolata", "monospace"],  // Merged here
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'monospace'],
        'space': ['Space Grotesk', 'monospace'],
        'kayPho': ['Kay Pho Du', 'monospace'],
      },
      backgroundImage: {
        'hero': "url('./src/assets/img/color.png')",
        'real': "url('./src/assets/img/hero-bg.jpg')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
      },
      borderWidth: {
        'thin': '0.1px',
      },
      color: {
        'brand': 'rgb(124 135 247)',
      },
    },
  },
  plugins: [],
}


