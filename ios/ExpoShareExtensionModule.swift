import ExpoModulesCore

public class ExpoShareExtensionModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoShareExtension')` in JavaScript.
    Name("ExpoShareExtension")

    Function("close"){
      // The function's name in JavaScript. If not specified, it will be inferred from the function name.
      // The function will be accessible from `NativeModules.ExpoShareExtension.close()` in JavaScript.
      Name("close")

      // The function's return type. If not specified, it will be inferred from the function's implementation.
      // The return type will be `void` in JavaScript.
      Returns(Void.self)
    }

    Function("getIntentData"){
      Name("getIntentData")
      Returns(Void.self)
    }
  }
}
