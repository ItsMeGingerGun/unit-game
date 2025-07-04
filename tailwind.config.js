module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 12s ease-in-out infinite',
        spin: 'spin 1s linear infinite',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20px, 15px) rotate(5deg)' },
          '50%': { transform: 'translate(40px, 5px) rotate(-5deg)' },
          '75%': { transform: 'translate(20px, 25px) rotate(5deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
