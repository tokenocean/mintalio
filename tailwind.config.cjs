module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,svelte}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        primary: "#3c63c4",
        secondary: "#4b5563",
      } 
    } 
  },
  variants: {
    borderWidth: ["responsive", "hover", "focus"],
  },
};
