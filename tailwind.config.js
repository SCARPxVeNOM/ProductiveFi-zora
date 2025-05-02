/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff4ec3',
        'neon-blue': '#00f0ff',
        'neon-yellow': '#ffe600',
        'neon-green': '#39ff14',
        'primary': '#00f0ff',
        'primary-foreground': '#ffffff',
        'secondary': '#ff4ec3',
        'secondary-foreground': '#ffffff',
        'destructive': '#ff0000',
        'destructive-foreground': '#ffffff',
        'accent': '#39ff14',
        'accent-foreground': '#000000',
        'ring': '#00f0ff',
        'input': '#2d3748',
        'background': '#000000',
      },
      boxShadow: {
        'neon': '0 0 15px #00f0ff',
        'glow': '0 0 10px rgba(255,255,255,0.3)',
        'neon-pink': '0 0 15px #ff4ec3',
        'neon-yellow': '0 0 15px #ffe600',
        'neon-green': '0 0 15px #39ff14',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out both',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,255,255,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255,255,255,0.6)' }
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 15px #00f0ff' },
          '50%': { boxShadow: '0 0 30px #00f0ff' }
        }
      }
    },
  },
  plugins: [],
}
