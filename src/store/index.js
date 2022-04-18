import { createStore } from "vuex";
import { useRouter } from "vue-router";

import storeLocal from "storejs"

import router from "@/router";
import ToTree from "@/utils/ToTree";
import views from "@/utils/assembly.js"
import initLocalStorage from './data/initLocalStorage'

const account = initLocalStorage.data // 账号信息
// const router = useRouter();

/**
 * 不需要手动导入应用模块
 * 自动导入模块文件中的所有vuex模块
 */
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules,
  state: {
    views,
    data: storeLocal.get('userdata') || account,
  },
  mutations: {
    // 折叠侧边栏
    setCollapse(state) {
      state.data.isCollapse = !state.data.isCollapse
    },
    // 更新用户信息
    updateData(state, { key, value }) {
      state.data[key] = value
      storeLocal.set('userdata', state.data)
    },
  },
  actions: {
    updateRoute({ commit, state }, route) {
      route.forEach((t) => {
        if (t.componentName) {
          t.component = views[t.componentName];
        }
      });
      let root = route.find((t) => (t.path = "/"));
      ToTree(root, route);
      // 动态添加路由
      root.children.forEach((item) => {
        router.addRoute(item);
      });
      
      commit('updateData', { key: 'Routingtable', value: root.children })
    },
    logout(){
      router.push("/login");
      storeLocal.remove('userdata')
    }
  },
  getters: {
    // userInfo: state => state.userInfo,
    // allRoutes: state => state.allRoutes,
  },
});
