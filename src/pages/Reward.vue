<!-- 赞赏页面 -->
<template>
<div>
	<sg-nav></sg-nav>
  <ab-head-img-box title="赞赏"></ab-head-img-box>
	<div class="container">
		<el-row :gutter="10">
      <el-col class="hidden-xs-only" :xs="24" :sm="5" >
        <ab-leftlist></ab-leftlist>
      </el-col>
			<el-col :xs="24" :sm="14" style="transition:all .5s ease-out;margin-bottom:30px;">
				<sg-reward></sg-reward>
			</el-col>
			<el-col :xs="24" :sm="5">
				<sg-rightlist></sg-rightlist>
			</el-col>
		</el-row>
	</div>
  <ab-footer></ab-footer>
</div>
</template>

<script>
import header from '../components/header.vue'
import rightlist from '../components/rightlist.vue'
import reward from '../components/reward.vue'
import footer from "../components/footer";
import headImgBox from "../components/part/headImgBox";
import leftlist from "../components/leftlist";
export default {
	name: 'Reward',
	data() { //选项 / 数据
		return {

		}
	},
	methods: { //事件处理器

	},
	components: { //定义组件
		'sg-nav': header,
    'ab-head-img-box':headImgBox,
		'sg-reward': reward,
    'ab-leftlist':leftlist,
		'sg-rightlist': rightlist,
    'ab-footer': footer,
	},
	created() { //生命周期函数

	}
}
</script>

<style>

</style>
