"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const android_1 = require("./android");
const withShareExtension = (config) => {
    return (0, config_plugins_1.withPlugins)(config, [
        // android
        android_1.withAppManifestFile
    ]);
};
const pak = require('../../package.json');
exports.default = (0, config_plugins_1.createRunOncePlugin)(withShareExtension, pak.name, pak.version);
