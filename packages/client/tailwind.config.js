/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        160: "40rem", // 112 * 0.25rem = 28rem
      },
    },
  },
  plugins: [require("daisyui")],
};
