package com.march.weex

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.os.PersistableBundle
import android.support.v7.app.AppCompatActivity
import android.view.View

import com.march.wxcube.Weex
import com.march.wxcube.model.DialogConfig
import com.march.wxcube.model.PageBundle
import com.march.wxcube.ui.WeexDialogFragment

import java.io.File
import java.util.ArrayList

/**
 * CreateAt : 2018/4/1
 * Describe :
 *
 * @author chendong
 */
class IndexActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.index_activity)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE), 1)
        }

        val bundle = PageBundle()
        bundle.pageName = "test"
//      bundle.setAssetsJs("weex/test.js");
        bundle.localJs = File(Environment.getExternalStorageDirectory(), "test.js").absolutePath
        bundle.jsVersion = "1.1.1"
        bundle.webUrl = "http://www.baidu.com/test"

        val list = ArrayList<PageBundle>()
        list.add(bundle)
        Weex.getInst().weexRouter.update(list)

        findViewById<View>(R.id.clear_cache_btn).setOnClickListener(
                { Weex.getInst().jsBundleCache.remove(bundle) })
        findViewById<View>(R.id.open_test_btn).setOnClickListener(
                {
                    Weex.getInst().weexRouter.openUrl(this@IndexActivity, "http://www.baidu.com/test?text=index")
                })
        findViewById<View>(R.id.open_test_btn2).setOnClickListener(
                {
                    val intent = Intent(this@IndexActivity, TestActivity::class.java)
                    intent.putExtra(PageBundle.KEY_PAGE, bundle)
                    startActivity(intent)
                })
        findViewById<View>(R.id.open_test_btn3).setOnClickListener(
                {
                    val weexFragment = WeexDialogFragment.newInstance(bundle, DialogConfig())
                    weexFragment.show(supportFragmentManager, "dialog")
                })
    }
}