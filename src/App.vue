<template>
  <div class="main">
    <van-nav-bar fixed
  :title="activetitle"
/>

    <router-view> </router-view>
     <van-tabbar route>
     <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
     </van-tabbar>
  </div>
</template>

<script>
export default {
   data () {
     return {
     activetitle:this.$route.meta.title,
     };
    
   },
   watch: {
     $route() {
       this.activetitle=this.$route.meta.title
     }
   }

}
</script>

<style>
 .main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>