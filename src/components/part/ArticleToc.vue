<template>
  <div>
    <el-tooltip class="item" effect="light" :content="isFullScreen?'退出':'全屏'" placement="left" :hide-after="1000">
      <el-button
        type="success"
        :icon="isFullScreen?'el-icon-aim':'el-icon-full-screen'"
        circle class="full-screen button1"
        v-show="showLeft"
        @click="fullScreen">
      </el-button>
    </el-tooltip>

    <el-collapse-transition>
      <el-tree
        class="ab-toc-tree ab-text-overflow"
        :data="toc"
        empty-text="暂无目录"
        :props="defaultProps"
        highlight-current
        :indent="20"
        node-key ="id"
        @node-click="scrollToPosition"
        ref="menuTree"

        accordion>
      </el-tree>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "ArticleToc",
  data() { //选项 / 数据
    return {
      userInfo: {}, //用户信息
      articleId: '',
      userInfoObj: '',
      dialogFormVisible: false,   //是否显示提交弹窗
      form: {
        description: '' //错误描述
      },
      toc: [],    //目录节点数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: 1,
      catalogue: [],  //节点元素的id和其距顶部的距离
      showDirectory: false,   //是否显示目录
      showLeft: false,   //是否显示按钮
      isFixed: false,     //目录css样式选择
      timeout: null,
      isFullScreen: false,     //是否全屏
      notFold: true    //是否折叠目录
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route':'routeChange',
    isFixed(newValue) {
      this.showDirectory = newValue;
      this.tocAndCli();
    }
  },
  methods: { //事件处理器
    async routeChange() {//展示页面信息
      var that = this;
      that.articleId = that.$route.query.aid==undefined?1:parseInt(that.$route.query.aid);//获取传参的aid
      this.$nextTick(() =>{   //重新加载目录
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.catalogue = [];
          this.toc = [];
          this.tocAndCli();
        }, 1000);
      })
    },

    tocAndCli() {   //生成目录树
      this.$nextTick(() => {
        const aArr1 = $("#article1 .v-show-content a").toArray();
        // console.log(aArr1);
        let aArr = []

        aArr1.forEach(item => {
          if (item.id && $(item).attr("id").indexOf('_') !== -1) {
            aArr.push(item)
          }
        })
        //给数据赋值，保存元素的id和其距顶部的距离
        if(this.catalogue.length === 0) {
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
            // this.catalog = true
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
          // console.log('catalogue:',this.catalogue)
        }
      })
    },
    getChildren(aArr, item, index) {    //获取目录子节点
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
    scrollToPosition(data) {    //点击目录标题跳转
      let id = data.href
      const position = $(id).offset();
      position.top = position.top - 35
      $("html,body").animate({ scrollTop: position.top }, 500);
      $(".GuideMain").animate({ scrollTop: position.top }, 500);
    },
    handleScroll(){     //处理目录显示样式
      let scrollTop = $(".GuideMain").scrollTop() || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
      // console.log(scrollTop)
      let offsetTop = 1800  // 要滚动到顶部吸附的元素的偏移量
      this.isFixed = scrollTop > offsetTop ? true : false;  // 如果滚动到顶部了，this.isFixed就为true
      this.showLeft = scrollTop > offsetTop-1500 ? true : false;  // 如果滚动到顶部了，this.showLeft就为true
      let temp;   //存储当前浏览节点
      this.catalogue.forEach(item => {
        let dist = scrollTop - item.dist + 500;
        if (dist > 0) {
          temp = item
          return;
        }
      });
      try {
        let nodes = this.catalogue;
        nodes.forEach(node => {
          if(node.id === temp.id) {
            this.$refs.menuTree.setCurrentKey(node.id)
          }
        })
      } catch (e) {

      }
    },
    //TODO:自动展开子节点
    expand(node) {
      if (node && node.parent) {
        node.parent.expanded = true
      }

      if (node.parent)
        this.expand(node.parent)
    },
    sendComment() {     //获取发送评论框焦点
      document.getElementById('rootInput').focus();
    },
    //全屏/非全屏
    fullScreen() {
      if(!this.isFullScreen) {
        let el = document.documentElement
        // console.log(el)
        let rfs = el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullScreen ||
            el.webkitIsFullScreen ||
            el.mozFullScreen,
          wscript
        if (typeof rfs != "undefined" && rfs) {
          this.isFullScreen = true;
          rfs.call(el);
          return;
        }else {wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            this.isFullScreen = false;
            wscript.SendKeys("{F11}");
          }
        }
      }
      else{
        let el = document,
          cfs = el.cancelFullScreen ||
            el.webkitCancelFullScreen ||
            el.mozCancelFullScreen ||
            el.exitFullScreen, wscript;
        if (typeof cfs != "undefined" && cfs) {
          this.isFullScreen = false;
          cfs.call(el);
          return;
        }
        if (typeof window.ActiveXObject != "undefined") {
          wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        }
      }
    },
    checkFull() {       //检查当前是否全屏
      if (document.mozFullScreen) {
        // console.log(1)
        return true;
      } else if (document.webkitIsFullScreen) {
        // console.log(2)
        return true;
      } else if (document.msFullscreenElement) {
        // console.log(3)
        return true;
      }
      return false;
    }
  },
  components: { //定义组件

  },
  created() { //生命周期函数
    this.routeChange();
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    if($(".GuideMain"))
      $(".GuideMain").on('scroll',this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    let that = this;
    //监听退出全屏事件
    window.onresize = function() {
      if(that.checkFull()) {
        that.isFullScreen = true;
      }else{
        that.isFullScreen = false;
      }
    }
  },
}
</script>


<style lang="less">
.ab-toc-tree {
  max-height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.fold-content {
  width: 50px;
  height: auto;
  background: #dcdfe6;
  position: fixed;
  top: 90px;
  right: 10%;
  z-index: 100;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s linear;
}
.full-fold-content {
  width: 50px;
  height: auto;
  background: #dcdfe6;
  position: fixed;
  top: 90px;
  right: 0;
  z-index: 100;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s linear;
}
// 当前选中目录标题样式
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  border-radius: 4px;
  color: #409eff;
}
.treeFixed{
  position: fixed;
  top: 90px;
  right: 10%;
  box-shadow: #333;
  width: 355px;
  border-radius: 5px;
  z-index:99;
  transition: all 0.2s linear;
  padding: 15px;
  text-align: center;
  margin: 0 0 0 -65px;
  letter-spacing: 0.5px;
}
.fullTreeFixed{
  position: fixed;
  top: 90px;
  right: 0%;
  box-shadow: #333;
  width: 320px;
  border-radius: 5px;
  z-index:99;
  transition: all 0.2s linear;
  padding: 15px;
  text-align: center;
  margin: 0 0 0 -65px;
  letter-spacing: 0.5px;
}
.treeFixed:hover{
  transform: translate(0, -2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.collect{
  position: fixed;
  bottom: 107px;
  left: 80px;
  box-shadow: #333;
  z-index:2000;
}
.comment{
  position: fixed;
  bottom: 154px;
  left: 80px;
  box-shadow: #333;
  z-index:2000;
}
.full-screen{
  position: fixed;
  bottom: 201px;
  left: 80px;
  box-shadow: #333;
  z-index:2000;
}
.question{
  position: fixed;
  bottom: 60px;
  left: 80px;
  box-shadow: #333;
  z-index:2000;
}
.button1 {
  //box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
@media screen and (max-width: 500px) {
  .full-screen {
    left: 0;
  }
  .question {
    left: 0;
  }
  .comment {
    left: 0;
  }
  .collect {
    left: 0;
  }
  .treeFixed{
    position: fixed;
    top: 90px;
    right: 0;
    box-shadow: #333;
    width: 300px;
    border-radius: 5px;
    z-index:99;
    transition: all 0.2s linear;
    padding: 15px;
    text-align: center;
    margin: 0 0 0 -65px;
    letter-spacing: 0.5px;
  }
  .fold-content {
    width: 40px;
    height: auto;
    background: #dcdfe687;
    position: fixed;
    top: 90px;
    right: 0;
    z-index: 100;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
