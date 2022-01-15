module.exports = {
  content: [
	"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    fontFamily:{
      inter:'Inter, sans-serif',
    },
   
    extend: {
      colors:{
        'arma-gray':'#766C6C',
        'arma-blue':'#139BEB',
        'arma-green':'#55D380',
        'arma-red':'#FC6262',
        'arma-yellow':'#F0D90D',
        'arma-title':'#0B5B8A'
      },
      screens: {
        'tablet': '780px',
      }
    },
  },
  plugins: [],
}