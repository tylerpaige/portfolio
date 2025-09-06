/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    animation: {
      flip: "flip 5s linear infinite",
    },
    /*
      {
        '0': '0',
        '1': 'calc(var(--gutter) * 1)',
        '2': 'calc(var(--gutter) * 2)',
        '3': 'calc(var(--gutter) * 3)',
        '4': 'calc(var(--gutter) * 4)',
        DEFAULT: 'calc(var(--gutter) * 1)',
        px: '1px'
      }
    */
    borderWidth: (() => {
      const borderWidth = Array.from({ length: 4 }).reduce((acc, _, i) => {
        const value = `calc(var(--gutter) * ${i + 1})`;
        acc[i + 1] = value;
        return acc;
      }, {});
      borderWidth["0"] = "0";
      borderWidth["DEFAULT"] = borderWidth[1];
      borderWidth["px"] = "1px";
      borderWidth["2px"] = "2px";
      borderWidth["3px"] = "3px";
      return borderWidth;
    })(),
    colors: {
      black: "#1e1e1e",
      "bright-gold": "#c5c236",
      cardboard: "#877A4D",
      "dark-green": "#3f4d0d",
      "dark-magenta": "#580738",
      gold: "#9b9922",
      gray: "#9f9f9f",
      "gray-green": "#aacaa6",
      green: "#038246",
      inherit: "inherit",
      lavender: "#f2eef7",
      lime: "#4be84b",
      magenta: " magenta",
      "maroon": "#79123d",
      "medium-green": "#086B3D",
      "olive-green": "#a1a600",
      "pea-green": "#98B76C",
      pink: "#F3CDC7",
      red: "#f24343",
      "steel-blue": "#586F78",
      teal: "#02CABD",
      white: "#fff",
      "white-green": "#c6dbcd",
    },
    fontFamily: {
      serif: [
        "var(--font-serif)",
        "Junicode",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      sans: ["Arial", "sans-serif"],
    },
    /*
      {
        '-3': '0.707rem'
        '-2': '0.500rem',
        '-1': '0.354rem',
        '0': '1.000rem',
        '1': '1.414rem',
        '2': '1.999rem',
        '3': '2.827rem',
        '4': '3.998rem',
        '5': '5.653rem',
        '6': '7.993rem',
        '7': '11.302rem',
        '8': '15.981rem',
        '9': '22.597rem',
        '10': '31.952rem',
        '11': '45.180rem',
        '12': '63.884rem',
        '13': '90.332rem',
        '14': '127.730rem',
      }
    */
    fontSize: (() => {
      const numberOfSmallSizes = 3;
      const numberOfLargeSizes = 15;
      const base = 1.125;
      const lineHeight = 1.25;
      const fontSizes = {};
      Array.from({ length: numberOfSmallSizes }).forEach((_, i) => {
        const key = numberOfSmallSizes - (-1 * i - 1);
        const fontSize = `${Math.pow(
          base,
          -1 * (numberOfSmallSizes - i)
        ).toFixed(3)}rem`;
        fontSizes[key] = [fontSize, lineHeight];
      });
      Array.from({ length: numberOfLargeSizes }).forEach((_, i) => {
        const key = i;
        const fontSize = `${Math.pow(base, i).toFixed(3)}rem`;
        fontSizes[key] = [fontSize, lineHeight];
      });
      fontSizes["DEFAULT"] = fontSizes[0];
      return fontSizes;
    })(),
    height: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      half: "50%",
      third: "33.333333%",
      "two-thirds": "66.666667%",
      quarter: "25%",
      "three-quarters": "75%",
      full: "100%",
      screen: "100vh",
      svh: "100svh",
      lvh: "100lvh",
      dvh: "100dvh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    }),
    keyframes: {
      flip: {
        "0%": { transform: "rotateY(0)" },
        "47.5%, 52.5%": { transform: "rotateY(180deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    keywordSizes: {
      sm: "20rem",
      md: "30rem",
      lg: "40rem",
      xl: "50rem",
    },
    maxWidth: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("percentages"),
      ...theme("keywordSizes")
    }),
    percentages: {
      half: "50%",
      third: "33.333333%",
      "two-thirds": "66.666667%",
      quarter: "25%",
      "three-quarters": "75%",
      full: "100%",
    },
    rotate: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
    },
    screens: {
      sm: "33em",
      md: "48em",
      lg: "75em",
      xl: "105em"
    },
    spacing: (() => {
      // const tinyIntervals = [0, 0.125, 0.25, 0.5, 0.625, 0.75, 0.875, 1.5, 2.5];
      const tinyIntervals = [
        0,
        "1/8",
        "1/4",
        "3/8",
        "1/2",
        "5/8",
        "3/4",
        "7/8",
        "3/2",
        "5/2",
      ];
      const intervals = tinyIntervals.concat(Array.from(Array(96).keys()));
      const spacing = Array.from(intervals).reduce((acc, interval) => {
        const value = `calc(var(--gutter) * ${interval})`;
        acc[interval] = value;
        return acc;
      }, {});
      spacing["2em"] = "2em";
      spacing["em"] = "1em";
      spacing["em/2"] = "0.5em";
      spacing["3em/8"] = "0.375em";
      spacing["em/4"] = "0.25em";
      spacing["em/8"] = "0.125em";
      return spacing;
    })(),
    stripeWidth: {
      DEFAULT: "3px",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
    },
    width: ({ theme }) => ({
        auto: "auto",
        ...theme("spacing"),
        ...theme("percentages"),
        ...theme("keywordSizes")
    }),
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        ".stripes": {
          backgroundImage:
            "linear-gradient(to bottom, var(--stripe-color-a) 50%, var(--stripe-color-b) 50%)",
          backgroundSize:
            "calc(2 * var(--stripe-size, 3px)) calc(2 * var(--stripe-size, 3px))",
        },
        ".stripes-y": {
          backgroundImage:
            "linear-gradient(to right, var(--stripe-color-a) 50%, var(--stripe-color-b) 50%)",
          backgroundSize:
            "calc(2 * var(--stripe-size, 3px)) calc(2 * var(--stripe-size, 3px))",
        },
      });
      matchUtilities(
        {
          "stripe-a": (value) => ({
            "--stripe-color-a": value,
          }),
          "stripe-b": (value) => ({
            "--stripe-color-b": value,
          }),
        },
        {
          values: theme("colors"),
          type: "color",
        }
      );
      matchUtilities(
        {
          stripe: (value) => ({
            "--stripe-size": value,
          }),
        },
        {
          values: theme("stripeWidth"),
        }
      );
    }),
  ],
};
