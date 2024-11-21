/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myMessageColor: "#241a36",
        otherMessageColor: "#34234a",
        icons: "#605586",
        textbox: "#291f3d",
        plumButton: "#c20746",
        listHeader: "#241e3b",
        listItem: "#322345",
        customBlue: "#32284f",
        plum: "#ad0b46",
        headerColor: "#271b38",
        hoverPlum: "#d30d55",
        normalTextColor: "rgb(203 213 225 / var(--tw-text-opacity, 1))",
        roomColor: "#2e2144",
      },
    },
  },
  plugins: [],
};
