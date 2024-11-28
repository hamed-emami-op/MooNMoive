export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 25px 10px rgba(0, 0, 0, 0.3)',
      },
      // keyframes: {
      //   borderExpand: {

      //     '0%':{ width: '0px', },
          
      //     '100%':{ width: '100%' , }
      //   }
      // },
      // animation: {
      //   borderExpand: 'borderExpand 1s ease-in-out forwards',
      // }
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-shadow")],
};
