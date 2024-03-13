<template>
  <div class="commonMain">
    <el-aside class="homeBottomMenu" :style="changecolor ? color1 : color2">
      <div class="hbmMain">
        <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
      </div>
    </el-aside>
    <el-main class="homeMain">
      <div id="files">
        <router-view />
      </div>
    </el-main>
  </div>
</template>
<script>
import menuS from '@/components/menuList.vue';
import '@/style/files.less';
export default {
  data() {
    return {
      viewMenu: 12,
      changecolor: '',
      color1: 'background-color: #3296fa:',
      color2: 'background-color: #72b32b',
    };
  },
  components: {
    menuS,
  },
  mounted() {},
  created() {
    if (
      this.$store.state.cid == 'ding43baffef30ed984635c2f4657eb6378f' ||
      this.$store.state.cid == '筑快cropid'
    ) {
      this.changecolor = false;
    } else {
      this.changecolor = true;
    }
  },
};
</script>
<style lang="less" scoped>
#files {
  display: flex;
  .files-left {
    background: white;
  }
  .files-right {
    width: 1640px;
    height: 90vh;
  }
}
</style>
