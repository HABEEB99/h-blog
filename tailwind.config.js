module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        body: '#EFEAD8',
        header: '#D0C9C0',
        btn: '#6D8B74',
        cta: '#5F7161',
      },
    },
  },
  plugins: [],
}
