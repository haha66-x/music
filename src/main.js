import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible.js"
import "@/styles/reset.css"
import router from '@/router/index.js'
import { Tabbar, TabbarItem,Col, Row ,Image as VanImage,Cell, CellGroup,Icon,Search,List} from 'vant';
Vue.use(List);
Vue.use(Search);
Vue.use(Icon);``
Vue.use(Cell);
Vue.use(CellGroup);


//测试封装的api 
// import {recommendMusicAPI} from './api/index'
//  async function fn () {
//    const res=await recommendMusicAPI()
//    console.log(res);
//   }

//  fn ()
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
