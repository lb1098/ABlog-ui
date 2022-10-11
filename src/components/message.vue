<!-- 留言评论模块 -->
<template>
  <div class="tmsgBox" ref="tmsgBox">
    <div class="tmsg-respond" ref="respondBox">
      <h3>发表评论 <small v-show="isRespond" class="tcolorm" @click="removeRespond">取消回复</small></h3>
      <form class="">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="说点什么呢``"
          v-model="textarea">
        </el-input>
        <div class="tmsg-r-info">
          <div class="info-submit">
            <p class="tcolors-bg" @click="sendMsg">{{ sendTip }}</p>
          </div>
        </div>
      </form>
    </div>
    <div class="tmsg-comments" ref="listDom">
      <a href="#" class="tmsg-comments-tip">共 {{ commentCount }} 条</a>
      <div class="tmsg-commentshow">
        <ul class="tmsg-commentlist">
          <li class="tmsg-c-item" v-for="(item,index) in commentList" :key="'common'+index">
            <article class="">
              <header>
                <img :src="item.avatar ? item.avatar :$store.state.errorImg" >
                <div class="i-name">
                  {{ item.username }}
                </div>
                <div class="i-time">
                  <time>{{ item.createTime }}</time>
                </div>
              </header>
              <section>
                <p :id="'cid'+item.id" v-text="item.content"></p>
                <div class="tmsg-replay" @click="respondMsg(item.id,item.id,item.createBy)">
                  回复
                </div>
              </section>
            </article>
            <ul v-show="item.children" class="tmsg-commentlist" style="padding-left:60px;">
              <li class="tmsg-c-item" v-for="(citem,cindex) in item.children" :key="'citem'+cindex">
                <article class="">
                  <header>
                    <img :src="citem.avatar ? citem.avatar :$store.state.errorImg">
                    <div class="i-name">
                      {{ citem.username }} <span>回复</span> {{ citem.toCommentUserName }}
                    </div>
                    <div class="i-time">
                      <time>{{ citem.createTime }}</time>
                    </div>
                  </header>
                  <section>
                    <p :id="'cid'+citem.id" v-text="citem.content"></p>
                    <div class="tmsg-replay" @click="respondMsg(item.id,citem.id,citem.createBy)">
                      回复
                    </div>
                  </section>
                </article>
              </li>
            </ul>
          </li>

        </ul>

        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          :total="commentCount"
          @current-change="freshPage"
        >
        </el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
import {sendComment, getArticleComment, getLinkComment} from '../api/comment.js'
import {getToken} from '../utils/auth.js'

export default {
  data() { //选项 / 数据
    return {
      respondBox: '',//评论表单
      listDom: '',//评论列表
      tmsgBox: '',//总评论盒子
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        articleId: 0
      },
      // 我的内容
      commentCount:0,
      cidJudge : false,
      cid: -1,
      isRespond: false,
      textarea: '',//文本框输入内容
      // pBody: true,//表情打开控制
      commentList: [],//评论列表数据
      aid: 0,//文章id
      hasMore: false,
      haslogin: false,
      userId: '',//用户id
      type: 0,//回复评论的当前的commentId
      pid: '',//回复评论的一级commentId
      rootId: -1,//根评论id，如果是针对文字评论直接用-1表示
      toCommentId: -1,//所回复评论的id
      toCommentUserId: -1,//所评论的用户id
      sendTip: '发送~',
    }
  },
  methods: {
    //事件处理器
    setData(initData, result) {
      var msg = result.rows;
      this.commentCount = result.total;
      if (initData) {
        //刷新列表
        this.commentList = msg;
      } else {
        //加载更多
        this.commentList = this.commentList.concat(msg);
      }
    },
    //发送留言
    sendMsg: function () {//留言
      if(getToken()) {
        var that = this;
        if (that.textarea) {
          that.sendTip = '咻~~';
          sendComment(that.type, that.aid, that.rootId, that.toCommentId, that.toCommentUserId, that.textarea).then((response) => {
            that.textarea = '';
            that.rootId = -1;
            that.toCommentId = -1;
            that.toCommentUserId = -1;
            that.routeChange();
            that.removeRespond();
            var timer02 = setTimeout(function () {
              that.sendTip = '发送~';
              clearTimeout(timer02);
            }, 1000)
            // 通知
            this.$notify({
              title: '发送成功',
              message: '您的回复发送成功',
              type: 'success'
            });
          })
        } else {
          that.sendTip = '内容不能为空~'
          var timer = setTimeout(function () {
            that.sendTip = '发送~';
            clearTimeout(timer);
          }, 3000)
        }
      } else{
        var that = this;
        that.$confirm('当前您暂未登录，你确定要以游客身份回复消息吗？（被回复无法正常收到通知）', '提示', {
          confirmButtonText: '前往登录',
          cancelButtonText: '以游客身份回复',
          type: 'warning'
        }).then(() => {
          //确定，跳转至登录页面
          //储存当前页面路径，登录成功后跳回来
          localStorage.setItem('logUrl', that.$route.fullPath);
          that.$router.push({path: '/Login?login=1'});
        }).catch(() => {
          if (that.textarea) {
            that.sendTip = '咻~~';
            sendComment(that.type, that.aid, that.rootId, that.toCommentId, that.toCommentUserId, that.textarea).then((response) => {
              that.textarea = '';
              that.rootId = -1;
              that.toCommentId = -1;
              that.toCommentUserId = -1;
              that.routeChange();
              that.removeRespond();
              var timer02 = setTimeout(function () {
                that.sendTip = '发送~';
                clearTimeout(timer02);
              }, 1000)
              // 通知
              this.$notify({
                title: '发送成功',
                message: '您的回复发送成功',
                type: 'success'
              });
            })
          } else {
            that.sendTip = '内容不能为空~'
            var timer = setTimeout(function () {
              that.sendTip = '发送~';
              clearTimeout(timer);
            }, 3000)
          }
        });
      }
    },
    respondMsg: function (rootId, toCommentId, toCommentUserId) {//回复留言

      var that = this;
      var dom = event.currentTarget;
      // 添加回复dom 到节点中
      dom = dom.parentNode;
      this.isRespond = true;
      this.rootId = rootId
      this.toCommentId = toCommentId;
      this.toCommentUserId = toCommentUserId
      dom.appendChild(this.$refs.respondBox);

    },
    removeRespond: function () {//取消回复留言
      this.isRespond = false;
      this.rootId = -1;
      this.toCommentId = -1;
      this.toCommentUserId = -1;
      this.$refs.tmsgBox.insertBefore(this.$refs.respondBox, this.$refs.listDom);
    },
    showCommentList: function (initData) {//评论列表
      var that = this;
      that.aid = that.$route.query.aid == undefined ? 1 : parseInt(that.$route.query.aid);//获取传参的aid
      that.pageNum = that.$route.query.pageNum == undefined ? 1 : parseInt(that.$route.query.pageNum);//获取传参的aid
      that.queryParams.articleId = that.aid
      that.cid = that.$route.query.cid == undefined ? -1 : parseInt(that.$route.query.cid); //获取传参的cid
      //公用设置数据方法
      // 这里访问的是不一样的 后台，所以不会冲突！！！
      if (that.$route.name == 'DetailArticle') {
        //文章列表的评论
        that.type = 0;
        getArticleComment(that.queryParams).then((response) => {
          that.setData(initData, response);
          if(this.cid>0){
            response.rows.forEach((comment)=> {
              if(comment.id==this.cid){
                this.cidJudge=true;
              }
              if(!this.cidJudge){
                comment.children.forEach((cldComment)=> {
                  if(cldComment.id==this.cid){
                    this.cidJudge=true;
                  }
                })
              }
            })
            if(!this.cidJudge){
              var params = JSON.parse(JSON.stringify(this.queryParams));
              params.pageNum++;
              this.getCidPosition(params);
            } else {
              this.passCidElement();
            }
          }
        })
      } else if (that.$route.name == 'FriendsLink') {
          // 友链
          that.type = 1
          getLinkComment(that.queryParams).then((response) => {
            that.setData(initData, response);
          })
        }
    },
    getCidPosition(params){
      // console.log(params)
      getArticleComment(params).then((response) => {
        response.rows.forEach((comment)=> {
          if(comment.id==this.cid){
            this.cidJudge=true;
          }
          if(!this.cidJudge){
            comment.children.forEach((cldComment)=> {
              if(cldComment.id==this.cid){
                this.cidJudge=true;
              }
            })
          }
        })
        if(!this.cidJudge && response.rows.length>0){
          params.pageNum++;
          this.getCidPosition(params);
        } else if (this.cidJudge) {
          this.queryParams = params;
          this.commentCount = response.total;
          this.commentList = response.rows;
          // console.log("找到了")
          //  设置跳转 设置样式
          this.passCidElement();

        }
      })

    },
    passCidElement(){
      // TODO 设置跳转 设置样式
      var cid_str = '#cid'+this.cid
      // console.log( cid_str )
      setTimeout(()=>{
        var node = $( cid_str )
        // console.log(node)
        node.addClass("ab-font-b");
        // 跳转到节点位置
        // console.log(node.offset().top)
        $("html,body").animate({scrollTop: node.offset().top }, 200);
      },500);
    },
    freshPage(currentPage){
      this.queryParams.pageNum = currentPage;
      this.showCommentList(true);
    },
    routeChange: function () {//重新加载
      var that = this;
      this.queryParams.pageNum = 1
      this.showCommentList(true);
    },
  },
  components: { //定义组件

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route':'routeChange'
  },
  created() { //生命周期函数
    // console.log(this.$route);
    var that = this;
    that.routeChange();
  },
  mounted() {//页面加载完成后

  }
}
</script>

<style>
.tmsgBox {
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #d4d4d5;
}

.tmsg-respond h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.tmsg-respond h3 small {
  font-size: smaller;
  cursor: pointer;
}

.tmsg-respond textarea {
  background: #fff;
  height: 50px;
}

/*用户输入表单*/
.tmsg-r-info {
  /*margin: 10px 0;*/
}

.tmsg-r-info input {
  height: 30px;
  border-radius: 4px;
  background: #f4f6f7;
}

.tmsg-r-info .info-submit {
  margin-top: 5px ;
  text-align: center;
}

.tmsg-r-info .info-submit p, .tmsg-commentshow h1 {
  /*background: #97dffd;*/
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /*transition: all .3s ease-in-out;*/
  height: 30px;
  line-height: 30px;
  text-align: center;
}

/*评论列表*/
.tmsg-comments .tmsg-comments-tip {
  display: block;
  border-left: 2px solid #363d4c;
  padding: 0 10px;
  margin: 40px 0;
  font-size: 20px;
}

.tmsg-commentlist {
  margin-bottom: 20px;

}

.tmsg-commentshow > .tmsg-commentlist {
  border-bottom: 1px solid #e5eaed;
}

.tmsg-c-item {
  border-top: 1px solid #e5eaed;
}

.tmsg-c-item article {
  margin: 20px 0;
}

.tmsg-c-item article header {
  margin-bottom: 10px;
}

.tmsg-c-item article header img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  float: left;
  transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  margin-right: 15px;
  object-fit: cover;
}

.tmsg-c-item article header img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.tmsg-c-item article header .i-name {
  font-size: 14px;
  margin: 5px 8px 7px 0;
  color: #444;
  font-weight: bold;
  display: inline-block;
}

.tmsg-c-item article header .i-class {
  display: inline-block;
  margin-left: 10px;
  background: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
}

.tmsg-c-item article header .i-time {
  color: #aaa;
  font-size: 12px;
}

.tmsg-c-item article section {
  margin-left: 80px;
}

.tmsg-c-item article section p img {
  vertical-align: middle;
}

.tmsg-c-item article section .tmsg-replay {
  margin: 10px 0;
  font-size: 12px;
  color: #64609E;
  cursor: pointer;
}

.ab-font-b {
  font-weight: bold;
  text-decoration: underline;
  color: #E6A23C;
}

</style>
