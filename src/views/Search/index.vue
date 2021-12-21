<template>
  <div>
    <van-search
      @input="inputFn"
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
    />
    <!-- 热门搜索 -->
    <div v-if="slist.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          @click="fn(obj.first)"
          class="hot_item"
          v-for="(obj, index) in hlist"
          :key="index"
          >{{ obj.first }}
        </span>
      </div>
    </div>
    <!-- 推荐音乐 -->
    <div v-else>
      <P class="title">最新音乐</P>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <Songitem
      v-for="obj in slist" :key="obj.id"
      :name="obj.name"
      :author="obj.ar[0].name"
      :id="obj.id"
      
      ></Songitem>
        <!-- <van-cell
          v-for="obj in slist"
          :key="obj.id"
          center
          :title="obj.name"
          :label="obj.ar[0].name + '  -  ' + obj.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem" />
          </template>
        </van-cell> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "@/api";
import Songitem from '@/components/Songitem.vue'
export default {
  data() {
    return {
      value: "",
      hlist: [],
      slist: [],
      page: 1,
      loading: false,
      finished: false,
      timer: null,
    };
  },
  async created() {
    //获取搜索结果
    //这里是直接拿到data数据
    const res = await hotSearchAPI();
    this.hlist = res.data.result.hots;
  },
  components: {
    Songitem
  },
  methods: {
    //点击图标显示的
    async getListFn() {
      //这里的 被async修饰的，return 会重新返回一个promise对象，
      //调用他的函数用await来接收
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    async fn(show) {
        this.page=1;
      //onload里是true，在次获取数据时要改成false
      //这里loading要改成false ,下面onload里后面没有数据了，loading还是true状态，没有
      //改过来，就会一直出现加载中bug
      this.loading = false;
      this.finished = false;
      this.value = show;
      const res = await this.getListFn();
      // console.log(res);
      this.slist = res.data.result.songs;
    },
    //输入框里的数据改变，触发这个事件
    async inputFn() {
        this.page=1;
      if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
        
          this.loading = false;
          this.finished = false;
          if (this.value.length === 0) {
            this.slist = [];
            return;
          }
          const res = await this.getListFn();
          //输入框里输入数据如果后台没有数据就要阻止执行
          if (res.data.result.songs === undefined) {
            this.slist = [];
            return;
          }
          this.slist = res.data.result.songs;
        }, 900);
    },
    async onLoad() {
      this.page++;
      const res = await this.getListFn();

      //触底的执行onload事件，后面没有事件，也要阻止执行onload事件
      if (res.data.result.songs === undefined) {
        this.finished = true;
        return;
      }

      this.slist = [...this.slist, ...res.data.result.songs];
      this.loading = false;
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
</style>