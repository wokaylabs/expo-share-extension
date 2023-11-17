import { ConfigPlugin, withPlugins, createRunOncePlugin } from '@expo/config-plugins';
import {withAppManifestFile} from './android'

const withShareExtension: ConfigPlugin = (config) => {
    return withPlugins(config,[
        // android
        withAppManifestFile
    ])
}

const pak = require('../../package.json')
export default createRunOncePlugin(withShareExtension, pak.name, pak.version)