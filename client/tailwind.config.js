module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: "Inter, sans-serif",
    },
    extend: {
      screens:{
        sm: '420px',

      },
      colors: {
        "arma-blue": "#139BEB",
        "arma-dark-blue":"#0B5B8A",
        "arma-green": "#55D380",
        "arma-red": "#FC6262",
        "arma-yellow": "#F0D90D",
        "arma-title": "#0B5B8A",
        "arma-light-gray": "#F5F5F5",
        "arma-page-background": "#f5f5f5",
        "arma-icon":"#808080",
      },
    },
  },
  plugins: [],
};
