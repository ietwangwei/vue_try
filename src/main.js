import Vue from 'vue/dist/vue.js'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import './styles/public.css'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})