<template>
  <div>
    <div>Hello User Login!</div>
    <a href="javascript:void(0);" v-on:click="goBack">GoBack</a>
  </div>
</template>
<script>
// 用户登录页面
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};

</script>
