package expo.modules.shareextension

import com.facebook.react.ReactActivity
import expo.modules.shareextension.util.Constants

class ExpoShareExtensionActivity : ReactActivity() {
  override fun getMainComponentName(): String {
    return Constants.ACTIVITY_NAME
  }
}
