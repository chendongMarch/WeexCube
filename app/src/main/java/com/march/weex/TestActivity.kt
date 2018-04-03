package com.march.weex

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.march.wxcube.model.PageBundle
import com.march.wxcube.ui.WeexFragment


/**
 * CreateAt : 2018/3/26
 * Describe :
 *
 * @author chendong
 */
class TestActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.test_activity)
        val fragment = WeexFragment.newInstance(intent.getParcelableExtra(PageBundle.KEY_PAGE))
        supportFragmentManager.beginTransaction()
                .add(R.id.fragment_view, fragment)
                .commitAllowingStateLoss()
    }
}
