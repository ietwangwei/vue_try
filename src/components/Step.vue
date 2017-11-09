<template>
	<div>
		<el-steps :space="100"  :active = " currentStep" finish-status="success">
		  <el-step :title="item.name" v-for="item in itemList" :itemList="itemList"></el-step>
		</el-steps>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'step',
		data () {
			return {
			}
		},
		props:['currentStep','itemList']
	}
</script>