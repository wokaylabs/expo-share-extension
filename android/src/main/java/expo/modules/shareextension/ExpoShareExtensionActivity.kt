package expo.modules.shareextension

import android.os.Bundle
import com.facebook.react.ReactActivity

class ShareExtensionActivity : ReactActivity() {
  override fun getMainComponentName(): String {
    return "ShareExtension"
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
  }
}
