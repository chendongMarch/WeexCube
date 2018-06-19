package com.march.weex

import android.app.Activity
import android.app.Application
import com.march.common.utils.LgUtils
import com.march.debug.DebugInjector
import com.march.debug.Debugger
import com.march.wxcube.*
import com.march.wxcube.model.WeexPage

/**
 * CreateAt : 2018/3/27
 * Describe :
 *
 * @author chendong
 */
class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        LgUtils.setOnLogListener { level, tag, msg ->
            Debugger.handleLog(level, tag, msg)
            false
        }
        val config = WeexConfig(this).apply {
            configUrl = "http://10.1.2.105:8081/weex-config.json"
            debug = true
            jsLoadStrategy = JsLoadStrategy.DEFAULT
            jsCacheStrategy = JsCacheStrategy.CACHE_MEMORY_DISK_BOTH
            jsPrepareStrategy = JsPrepareStrategy.PREPARE_ALL
            apiHost = "http://wanandroid.com"
            jsResHost = "http://10.1.2.105:8081"
            webHost = "http://10.1.2.105:8081"
        }

        Weex.init(config, object : WeexInjector {
            override fun getConfigClass(): Class<*> {
                return BuildConfig::class.java
            }

            override fun onInitOkHttpClient(builder: okhttp3.OkHttpClient.Builder) {
                Debugger.initOkHttp(builder)
            }

            override fun completeDebugWeexPage(page: WeexPage, host: String): WeexPage {
                page.remoteJs = page.remoteJs ?: "http://$host:8081/${page.pageName}.weex.js"
                return page
            }
        })
        Debugger.init(this, true, object : DebugInjector {
            override fun checkNetModel(url: String?): Boolean {
                return true
            }

            override fun handleScanResult(activity: Activity, text: CharSequence) {
                val weexPage = WeexPage()
                weexPage.pageName = "scan-page"
                weexPage.jsVersion = "1.0.0"
                weexPage.appVersion = "0.0.1"
                weexPage.webUrl = "/test/temp"
                weexPage.comment = "扫码测试界面"
                weexPage.remoteJs = text.toString()
                Weex.mWeexRouter.openWeexPage(activity, weexPage)
            }

        })

        /*
         mAct.findViewById<View>(R.id.text).click {
                            try {
                                val mutableListOf = mutableListOf<WeexPage>()
                                var page = WeexPage()
                                page.pageName = "pageName1"
                                page.appVersion = "1.0.0"
                                page.jsVersion = "1.0.0"
                                mutableListOf.add(page)
                                page = WeexPage()
                                page.pageName = "pageName2"
                                page.appVersion = "1.0.3"
                                page.jsVersion = "1.0.0"
                                mutableListOf.add(page)
                                page = WeexPage()
                                page.pageName = "pageName3"
                                page.appVersion = "1.0.1"
                                page.jsVersion = "1.0.0"
                                mutableListOf.add(page)
                                page = WeexPage()
                                page.pageName = "pageName3"
                                page.appVersion = "1.0.1"
                                page.jsVersion = "1.0.1"
                                mutableListOf.add(page)
                                page = WeexPage()
                                page.pageName = "pageName3"
                                page.appVersion = "1.0.1"
                                page.jsVersion = "1.0.2"
                                mutableListOf.add(page)
                                val simplifyPages = Weex.getInst().mWeexUpdater.simplifyPages(mutableListOf)
                                for (weexPage in simplifyPages) {
                                    LogUtils.e("chendong", weexPage.pageName + " " + weexPage.appVersion + " " + weexPage.jsVersion)
                                }
                            } catch (e: Exception) {
                                e.printStackTrace()
                            }
                        }
         */
    }
}
