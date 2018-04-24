package com.march.weex

import android.app.Application
import android.os.Environment
import android.text.TextUtils
import android.util.Log
import com.march.wxcube.*
import com.march.wxcube.manager.ManagerRegistry

/**
 * CreateAt : 2018/3/27
 * Describe :
 *
 * @author chendong
 */
class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        val config = WeexConfig(this).apply {
            debug = true
            jsLoadStrategy = JsLoadStrategy.DEFAULT
            jsCacheStrategy = JsCacheStrategy.PREPARE_ALL
            jsFileCacheDir = Environment.getExternalStorageDirectory()
        }

        Weex.getInst().init(config, object : WeexInjector {
            override fun onErrorReport(throwable: Throwable?, errorMsg: String) {
                if (throwable != null) {
                    Log.e("chendong", throwable.message)
                }
                if (!TextUtils.isEmpty(errorMsg)) {
                    Log.e("chendong", errorMsg)
                }
            }

            override fun onLog(tag: String, msg: String) {
                Log.e(tag, msg)
            }
        })
        ManagerRegistry.ENV.registerEnv(0, "http://wanandroid.com/")
        ManagerRegistry.ENV.registerEnv(1, "http://wanandroid.net/")
        ManagerRegistry.ENV.mNowEnv = 0
    }
}
