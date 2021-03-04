module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  sourceType: "unambiguous", // needed to make commonjs require() and ES6 imports work

  plugins: [
    [
      "babel-plugin-styled-components",
      {
        fileName: false
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true
      }
    ]
  ]
};
