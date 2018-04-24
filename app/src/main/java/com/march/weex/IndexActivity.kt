package com.march.weex

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.march.common.utils.immersion.ImmersionStatusBarUtils

import com.march.wxcube.Weex
import com.march.wxcube.model.WeexPage

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
            Weex.getInst().mWeexRouter.openUrl(this@IndexActivity, "/home/home-index-weex")
        }
        setClick(R.id.clear_cache_btn) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                Weex.getInst().mWeexJsLoader.clearCache()
            }
        }
        setClick(R.id.open_test_btn) {
            initDatas()
            // Weex.getInst().mWeexRouter.openUrl(this@IndexActivity, "http://www.baidu.com/test?text=index")
        }
        setClick(R.id.open_test_btn2) {
            val intent = Intent(this@IndexActivity, TestActivity::class.java)
            val page = Weex.getInst().mWeexRouter.findPage("http://www.baidu.com/test?text=index")
            intent.putExtra(WeexPage.KEY_PAGE, page)
            startActivity(intent)
        }
        setClick(R.id.open_test_btn3) {
            Weex.getInst().mWeexRouter.openDialog(this@IndexActivity, "http://www.baidu.com/test?text=index", null)
        }
    }

    private fun setClick(id: Int, f: (View?) -> Unit) {
        findViewById<View>(id).setOnClickListener { v -> f.invoke(v) }
    }

    private fun initDatas() {
        Weex.getInst().mWeexUpdater.updateWeexPages(IndexActivity@ this, "pages.json")
    }
}