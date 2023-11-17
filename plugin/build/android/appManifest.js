"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppManifestFile = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const manifestWithAddedActivity = (androidManifest) => {
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
    const activity = application.activity.find((item) => item.$["android:name"] === "");
    if (activity) {
        console.warn("withShareExtension: Extension already added.");
        return androidManifest;
    }
    const newActivity = {
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
const withAppManifestFile = (config) => {
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = manifestWithAddedActivity(config.modResults);
        return config;
    });
};
exports.withAppManifestFile = withAppManifestFile;
