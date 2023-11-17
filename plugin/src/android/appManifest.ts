import { AndroidConfig, ConfigPlugin, withAndroidManifest } from "@expo/config-plugins";

const manifestWithAddedActivity = (androidManifest: AndroidConfig.Manifest.AndroidManifest) => {
  const { manifest } = androidManifest;
  if (!Array.isArray(manifest.application)) {
    console.warn("withShareExtension: No application array in manifest?");
    return androidManifest;
  }

  const application = manifest.application.find((item) => item.$["android:name"] === ".MainApplication");
  if (!application) {
    console.warn("withShareExtension: No .MainApplication?");
    return androidManifest;
  }

  if (!Array.isArray(application.activity)) {
    console.warn("withShareExtension: No activity array in .MainApplication?");
    return androidManifest;
  }

  const activity = application.activity.find(
    (item) => item.$["android:name"] === "", // creating a separate module named "share" alongside main module
  );
  if (activity) {
    console.warn("withShareExtension: Extension already added.");
    return androidManifest;
  }

  const newActivity: AndroidConfig.Manifest.ManifestActivity = {
    $: {
      "android:name": "expo.modules.shareextension.ExpoShareExtensionActivity",
      "android:configChanges": "keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode",
      "android:windowSoftInputMode": "adjustResize",
      "android:label": "@string/app_name",
      "android:screenOrientation": "portrait",
      "android:theme": "@style/AppTheme",
      "android:taskAffinity": "expo.modules.shareextension",
      "android:exported": "true",
    },
    "intent-filter": [
      {
        action: [
          {
            $: {
              "android:name": "android.intent.action.SEND",
            },
          },
          {
            $: {
              "android:name": "android.intent.action.SEND_MULTIPLE",
            },
          },
        ],
        category: [
          {
            $: {
              "android:name": "android.intent.category.DEFAULT",
            },
          },
        ],
        data: [
          {
            $: {
              "android:mimeType": "*/*",
            },
          },
        ],
      },
    ],
  };
  const existingActivities = application.activity;
  existingActivities.push(newActivity);
  return androidManifest;
};

export const withAppManifestFile: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = manifestWithAddedActivity(config.modResults);
    return config;
  });
};
