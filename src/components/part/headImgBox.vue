<template>
  <div class="headImgBox"
       :style="{backgroundImage:this.$store.state.themeObj.top_image?'url('+this.$store.state.themeObj.top_image+')':'url(static/img/headbg05.jpg)'}">
    <div class="scene">
      <div><span id="luke"></span></div>
    </div>
    <div class="h-information">
      <img
        :src="this.$store.state.themeObj.head_portrait?this.$store.state.themeObj.head_portrait:'static/img/tou.png'"
        alt="">
      <h2 class="h-description">
        {{ this.$store.state.themeObj.autograph ? this.$store.state.themeObj.autograph : "每一步，都是更接近目标的一步" }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "headImgBox"
}
</script>

<style scoped>

</style>
