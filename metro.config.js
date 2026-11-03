const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config, {
  warnings: "none",
  inlineVariables: {
    exclude: [
      "--background",
      "--foreground",
      "--primary",
      "--tint",
      "--color-background",
      "--color-foreground",
      "--color-primary",
      "--color-tint",
      "--font-display",
    ],
  },
});
