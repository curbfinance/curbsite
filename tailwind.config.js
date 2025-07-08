module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'curb-purple': '#7C3AED',
        'curb-blue': '#2563EB',
        'solana-green': '#00FFA3',
      },
      fontFamily: {
        meme: ['Comic Sans MS', 'Comic Neue', 'cursive'],
      }
    },
  },
  plugins: [],
}
