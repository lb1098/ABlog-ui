<template>
  <div>
    <el-collapse-transition>
      <el-tree
        id="boxFixed"
        :data="toc"
        empty-text="暂无目录"
        :props="defaultProps"
        highlight-current
        :indent="20"
        node-key="id"
        @node-click="scrollToPosition"
        ref="menuTree"
        style="position: fixed;"
        class="treeFixed"
        v-show="showDirectory"
        accordion>
      </el-tree>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "treeNav",
  data(){
    return {
      // 侧边栏的内容
      toc: [],    //目录节点数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      catalogue: [],  //节点元素的id和其距顶部的距离
      showDirectory: true,   //是否显示目录
      isFixed: false,     //目录css样式选择
    }
  },
  mounted() {

  },
  methods:{
    tocAndCli() {   //生成目录树方法
      this.$nextTick(() => {
        const aArr1 = $(
          "#article1 a"
        ).toArray();
        let aArr = []

        aArr1.forEach(item => {
          if (item.id) {
            aArr.push(item)
          }
        })
        //给数据赋值，保存元素的id和其距顶部的距离
        if (this.catalogue.length === 0) {
          this.tocAndDist(aArr);
        }

        let toc = [];
        aArr.forEach((item, index) => {
          let href = $(item).attr("id");
          let name = $(item).parent().text();
          let prop = $(item).parent().prop('nodeName');
          let children = this.getChildren(aArr, item, index)
          if (href && (prop === 'H2')) { // 这里判断是因为我们只需要有id的内容，没有id的则过滤掉。
            toc.push({
              id: href.substring(href.lastIndexOf("_") + 1),
              href: "#" + href,
              name,
              prop,
              children
            });
          }
        });
        this.toc = toc
      });
    },
    tocAndDist(arr) {   //存储节点元素的id和其距顶部的距离
      arr.forEach(item => {
        if ($(item).attr("id")) {
          let id = item.id.substring(item.id.lastIndexOf("_") + 1)
          let dist = $('#' + item.id).offset().top;

          this.catalogue.push({id, dist})
        }
      })
    },
    getChildren(aArr, item, index) {    //获取目录子节点方法
      let out = []
      if (index === aArr.length - 1) {
        return []
      }
      let nodeName = $(aArr[index]).parent().prop('nodeName')
      let level = parseInt(nodeName.substring(1, 2).charAt(0))

      if ($(aArr[index + 1]).parent().prop('nodeName') === nodeName) {
        return []
      }
      for (let i = index + 1; i < aArr.length; i++) {
        let name = $(aArr[i]).parent().prop('nodeName')
        if (level + 1 === parseInt(name.substring(1, 2))) {
          //构建孩子
          let href = $(aArr[i]).attr("id");
          let name = $(aArr[i]).parent().text();
          let children = this.getChildren(aArr, aArr[i], i)
          out.push({
            //lastIndexOf是因为有些标签有多个_，取最后为id
            id: href.substring(href.lastIndexOf("_") + 1),
            href: "#" + href,
            name,
            children
          })
        } else if (level < parseInt(name.substring(1, 2)) - 1) {
          continue
        } else {
          break
        }
      }
      return out
    },
    scrollToPosition(data) {    //点击目录标题跳转方法
      let id = data.href
      const position = $(id).offset();
      position.top = position.top - 35
      $("html,body").animate({scrollTop: position.top}, 500);
    },
  }
}

</script>

<style lang="less">
// added
// 当前选中目录标题样式
 .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
   border-radius: 4px;
   color: #409eff;
 }

.treeFixed {
  position: fixed;
  top: 90px;
  right: 10%;
  box-shadow: #333;
  width: 355px;
  border-radius: 5px;
  z-index: 0;
  transition: all 0.2s linear;
  padding: 15px;
  text-align: center;
  margin: 0 0 0 -65px;
  letter-spacing: 0.5px;
}

.treeFixed:hover {
  transform: translate(0, -2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
</style>
