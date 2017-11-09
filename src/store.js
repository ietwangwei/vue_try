import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

const store = new Vuex.Store({
	state: {
		message:'hello',
		testList:[1,2,3,4,5],
		a:0
	},
	getters:{
		beyondTwo: state => {
			return state.testList.filter(item => item > 2)
		}
	},
	mutations:{
		increment (state,payload){
			state.message = "hello" + payload;
		}
	},
	actions:{
		increment (context){
			context.commit('increment');
		}
	}
})

export default store