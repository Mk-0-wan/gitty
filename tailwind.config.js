/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // adding some custom class type under the css class you want
      // eg so if you want to make the connection to the font geist
      // just use this command on the .jsx files: font-geist which translates to font-family: "Geist";
      fontFamily: {
        geist: ["Geist", "san-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70%, 28%",
      },
    },
  },
  plugins: [],
};
