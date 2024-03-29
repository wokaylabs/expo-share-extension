module.exports = {
  expo: {
    name: "expo-share-extension-example",
    slug: "expo-share-extension-example",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "expo.modules.shareextension.example",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "expo.modules.shareextension.example",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      ['../app.plugin']
    ],
  },
};
