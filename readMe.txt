vue :{
	模板语法:{
		条件渲染 : v-if,v-else,v-else-if 均不可用':'来替代,例如:v-if="a == 1"(正确)  !=  :if="a == 1"(错误),
		数据绑定 : {
			v-bind:v-bind用于绑定属性和数据 
			v-model:用于实现双向数据绑定，所以如果你用在除了表单控件以外的标签是没有任何效果的。
		},
		样式绑定: 通过v-bind:class = " {active : isActive}" 这样的方式绑定(:class),
		列表渲染: (value, key, index) in object/itemList   不可以用:for替代,
		事件监听: v-on(@)  v-on:click   @clik, @click.native(绑定一个原生事件)
	},
	计算属性(computed):一种实时的属性,不需要定义的,确切的来说是根据其他属性计算得出的,
	监听(message):类似angularJS,
	通信:{
		方式:{
			父子组件:props,
			兄弟组件:evnetbus
		},
		父组件 -> 子组件:{
			定义:在子组件中将变量添加到props里面,在父组件里面通过v-bind(:)来绑定属性即可.
			实例: ./src/components/Product(父) ,./src/components/Header(子)
		},
		监听事件($on) && 事件冒泡($emit):需要一个公共的vue实例,signal.$emit()  && signal.$on(),											         都需要引入第三方signal文件.
		派发事件($dispatch):
		广播事件($droadcast):
	},
	vue-route:{
		路由模板语法:<touter-view></touter-view>,
		嵌套路由:{
			配置 path 的时候，以 " / " 开头的嵌套路径会被当作根路径，所以子路由的 path 不需要添加 " / "
			path:'/hello',
			name:'hello',
			component:Hello,
			children:[{
				path:'world',
				name:'world',
				component:World
			}]
		},
		跳转方式:{
			html跳转: <router-link to="/hello/world"></router-link>,
			编程时导航(写在js代码里面的导航):this.$router.push({
				path:'/hello'
			});
		}
	},
	vuex:{
		state(单一状态数):{
			//用来存储全局变量,从 this.$store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
			a:1,
			b:2	
		},
		getters:{
			a- : state => state.a - 1;
		}
		/*mapState(辅助函数)*/: 'a' 相当于 'this.$store.state.a'  这就很有灵性了
		getter:其实是一种全局的过滤方法,把生成的变量储存在store.getters里面,
		/*mapGetters(辅助函数)*/: 'a-' 相当于 'this.$store.getters.a'  这就很有灵性了,
		mutations(突变):{
			increaseA (state){
				state.a++;
			},
			备注:这个东西是写在store里面的,要想触发它,要在组件的methods里面通过'this.$store.commit.increaseA(	  方法名)来触发',且必须是同步函数,就是说不可以写回调函数,要在这里面使用回调函数的话，需要使用到
			     action这个方法.
		},
		action(行为):{
			increment (context){
				context.commit('increment');
			},
			备注:Action通过store.dispatch触发
		},
		mutations && action:{
			载荷形式:store.commit({
				type:'increment',
				amount:10
			}),
			对象形式:store.dispatch({
				type:'increment',
				amount:10
			})
		},
	},
	vue-resource:{
		方式:this.$http.get('url',[options]).then(callback(success),callback(error)),
		参数:{
			url: 请求的URL,
			method: 请求的HTTP方法，例如：'GET', 'POST'或其他HTTP方法,
			body: FormDatastring	request body,
			params: 请求的URL参数对象,
			headers: request header,
			timeout: 单位为毫秒的请求超时时间 (0 表示无超时时间),
			before: 请求发送前的处理函数，类似于jQuery的beforeSend函数,
			progress: ProgressEvent回调处理函数,
			credientials: 表示跨域请求时是否需要使用凭证,
			emulateHTTP: 发送PUT, PATCH, DELETE请求时以HTTP,
			emulateJSON: 将request body以application/x-www-form-urlencoded content type发送
		}
	},
	自定义指令(directive):{
		绑定方式:{
			bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一	  次的初始化动作,
			inserted:被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中),
			update:所在组件的 VNode 更新时调用,
			componentUpdated:所在组件的 VNode 及其孩子的 VNode 全部更新时调用,
			unbind:只调用一次，指令与元素解绑时调用
		},
		参数(el,binding,vnode,oldVnode):{
			el:元素,
			binding:{
				name:指令名称,
				value:指令绑定的值,v-errorsay="message"里面的message,只能绑定一个值或者一个对象,
				oldValue:前值,仅在 update 和 componentUpdated 钩子中可用,
				expression:,
				arg:传给指令的参数,
			},
			vnode:虚拟节点 类似angular.directive的template,
			oldVnode:前虚拟节点,仅在 update 和 componentUpdated 钩子中可用
		}
	},
	方法事件处理器(methods):事件处理的方法,
	组件:{
		template:模板,
		script:{
			data:function(){
			//data必须是函数,return一个对象
				return object;
			},
		}
	},
	踩过的坑:{
		1: 在.vue组件里面写template的时候  一定要在html外面包裹一层div,否则会报错,
		2: v-for数组的时候只有两个参数(item,index) v-for对象的时候有三个参数,
		3: 引入store时需要  new Vuex.Store()  这里Store是大写,
		4: 对象展开符(...),要安装transform-object-rest-spread这个插件,在babelrc里面使用,
		5: export default 后面可以是变量也可以是对象 详见MSP的store.js,export default store
	}
}