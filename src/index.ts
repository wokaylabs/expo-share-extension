import { EventEmitter, NativeModulesProxy, Subscription } from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoShareExtension.web.ts
// and on native platforms to ExpoShareExtension.ts
import ExpoShareExtensionModule from "./ExpoShareExtensionModule";

export function hello(): string {
  return ExpoShareExtensionModule.hello();
}
