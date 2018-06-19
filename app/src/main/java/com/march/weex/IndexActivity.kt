package com.march.weex

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.march.common.utils.immersion.ImmersionStatusBarUtils
import com.march.debug.DebugActivity
import com.march.wxcube.Weex
import com.march.wxcube.ui.IndexActivity
/**
 * CreateAt : 2018/4/1
 * Describe :
 *
 * @author chendong
 */
class IndexActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ImmersionStatusBarUtils.setStatusBarLightMode(WebActivity@ this)

        setContentView(R.layout.index_activity)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE), 1)
        }

        initDatas()

        setClick(R.id.btn_wanandroid) {
            //            Weex.getInst().mWeexRouter.openUrl(this@IndexActivity, "/home/home-index_page-weex")
            startActivity(Intent(this, IndexActivity::class.java))
        }
        setClick(R.id.clear_cache_btn) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                // Weex.mWeexJsLoader.clearCache()
            }
        }
        setClick(R.id.open_test_btn) {
            initDatas()
            // Weex.getInst().mWeexRouter.openUrl(this@IndexActivity, "http://www.baidu.com/test?text=index")
        }

        setClick(R.id.open_test_btn3) {
            // Weex.mWeexRouter.openDialog(this@IndexActivity, "http://www.baidu.com/test?text=index_page", null)
        }
    }

    private fun setClick(id: Int, f: (View?) -> Unit) {
        findViewById<View>(id).setOnClickListener { v -> f.invoke(v) }
    }

    private fun initDatas() {
//        Weex.getInst().mWeexUpdater.onUpdateConfig(IndexActivity@ this, "assets://config.json")
    }
}