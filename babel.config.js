module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" }}],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules": "./src/modules",
          "@configs": "./src/configs",
          "@environment": "./src/environment",
          "@http": "./src/http",
          "@middlewares": "./src/middlewares",
          "@services": "./src/services",
          "@shared": "./src/shared"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ]
}