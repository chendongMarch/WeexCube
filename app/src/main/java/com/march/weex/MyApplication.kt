package com.march.weex

import android.app.Application
import android.text.TextUtils
import android.util.Log
import com.march.wxcube.Weex
import com.march.wxcube.WeexService

//import com.march.wxcube.Weex
import com.taobao.weex.InitConfig

/**
 * CreateAt : 2018/3/27
 * Describe :
 *
 * @author chendong
 */
class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        Weex.getInst().init(this, true, object : WeexService {
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

            override fun onInitWeex(builder: InitConfig.Builder) {

            }
        })
        Weex.getInst().jsLoadStrategy = Weex.JsLoadStrategy.PREPARE_ALL
    }
}
