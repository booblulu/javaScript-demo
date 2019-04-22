import Vue from 'vue'
// vuex
import Vuex from 'vuex'

// use vuex
Vue.use(Vuex)

// vuex 声明store对象
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 严格模式，防止直接修改state，发布上线要改成false
  state: { // 数据
    a: 23,
    b: 33,
    users: []
  },
  mutations: { // 修改操作的封装
    add (state, n) {
      state.a += n
    },
    set (state, [a, b]) {
      state.a = a
      state.b = b
    },
    setOnline (state, id) {
      state.users.forEach(user => {
        if (user.id === id) {
          user.online = !user.online
        }
      })
    },
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: { // 调用mutations
    add (context, n) {
      context.commit('add', n)
    },
    set ({commit}, arr) {
      console.log(arr)
      commit('set', arr)
    },
    setOnline ({commit}, id) {
      commit('setOnline', id)
    },
    async readUsers ({commit}) {
      try {
        let res = await fetch('http://localhost:8081/user.txt')
        let data = await res.json()
        commit('setUsers', data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  // 在组件内调用  count:{{$store.getters.count}}
  getters: { // 读取数据，函数
    count (state) {
      return state.a + state.b
    },
    onlineUsers (state) {
      return state.users.filter(user => user.online)
    }
  },
  modules: {} // 模块，把state拆成模块

})
