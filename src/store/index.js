import Vue from "vue";
import Vuex from 'vuex'
import navtab from "./nav";
import header from "./header";
// 注册vuex
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		navtab,
		header
	}
})
