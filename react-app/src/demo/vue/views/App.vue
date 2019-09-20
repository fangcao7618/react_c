<template>
  <div class="app" v-if="$route.meta.layout === false">
    <router-view></router-view>
  </div>
  <div class="app" v-else>
    <h2>{{msg}}</h2>
    <div>
      <router-view></router-view>
    </div>
    <TestComponent></TestComponent>
  </div>
</template>
<script>
import TestComponent from './component/index.vue';

/**
 * App 入口文件
 */
export default {
  data() {
    return {
      msg: 'Hello Vue!'
    };
  },
  mounted() {
    console.log('mounted', this.$route);
  },
  updated() {
    console.log('updated', this.$route);
  },
  // 引用的组件
  components: {
    TestComponent
  }
};

</script>
<style scoped lang="scss">
.app {
  color: green;
  .blue {
    color: orange !important;
  }
  // 使用 deep 对组件 scoped 样式进行重写
  /deep/ .red {
    color: orange;
  }
}

</style>
