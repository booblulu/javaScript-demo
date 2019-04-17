// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// vuex
import Vuex from 'vuex'

// use vuex
Vue.use(Vuex)

// vuex 声明store对象
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 严格模式，防止直接修改state，发布上线要改成false
  state: { // 数据
    a: 23,
    b: 33
  },
  mutations: { // 修改操作的封装
    add (state, n) {
      state.a += n
    }
  },
  actions: { // 调用mutaions
    add (context, n) {
      context.commit('add', n)
    }
  },
  getters: {}, // 读取数据，函数
  modules: {} // 模块，把state拆成模块

})

// 防止vue启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
