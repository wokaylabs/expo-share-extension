import { registerRootComponent } from "expo";
import App from "./src/App";
import { AppRegistry } from "react-native";
import ShareExtension from "./share";

import { ACTIVITY_NAME } from '../build'

AppRegistry.registerComponent(ACTIVITY_NAME,()=>ShareExtension)
registerRootComponent(App)