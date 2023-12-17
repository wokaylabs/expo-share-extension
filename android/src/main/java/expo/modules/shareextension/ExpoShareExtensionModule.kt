package expo.modules.shareextension


import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Parcelable
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableArray
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.File

class ExpoShareExtensionModule:Module(){
  private var tempFolder: File? = null
  private val cacheDir = "expo-share-extension"

  private val context: Context
    get() = requireNotNull(appContext.reactContext) { "React Application Context is null" }

  private val currentActivity
    get() = appContext.activityProvider?.currentActivity ?: throw Exceptions.MissingActivity()

  private val realPathUtil = RealPathUtil(context)

  /** starting module definition **/
  override fun definition() = ModuleDefinition {
    Name("ExpoShareExtension")

    Function("close"){
        currentActivity.finish()
    }

    Function("getIntentData") {
      return@Function processIntent()
    }
  }
  /** ending module definition **/

  private fun processIntent(): WritableArray {
    var map = Arguments.createMap()
    val items = Arguments.createArray()

    var text = ""
    val type: String
    val action: String

    val currentActivity: Activity = currentActivity

      tempFolder = File(currentActivity.cacheDir, cacheDir)
      val intent = currentActivity.intent
      action = intent?.action?:""
      type = intent?.type?:""

      // Received some text
      if (Intent.ACTION_SEND == action && "text/plain" == type) {
        text = intent.getStringExtra(Intent.EXTRA_TEXT)!!

        map.putString("value", text)
        map.putString("type", "text")

        items.pushMap(map)

        // Received a single file
      } else if (Intent.ACTION_SEND == action) {
        val uri = intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as Uri?

        if (uri != null) {
          try {
            text = "file://" + realPathUtil.getRealPathFromURI(uri)
          } catch (e: java.lang.Exception) {
            e.printStackTrace()
          }
          map.putString("value", text)
          map.putString("type", "media")
          items.pushMap(map)
        }

        // Received multiple files
      } else if (Intent.ACTION_SEND_MULTIPLE == action) {
        val uris = intent.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)
          for (uri in uris!!) {
            var filePath = ""
            try {
                filePath = realPathUtil.getRealPathFromURI(uri).toString()
            } catch (e: Exception) {
              e.printStackTrace()
            }
            map = Arguments.createMap()
            text = "file://$filePath"
            map.putString("value", text)
            map.putString("type", "media")
            items.pushMap(map)
          }
      }
    return items
  }

}
