<template>
  <div style="display:block;">
    <div class="pNameS">项目名称 :{{ pname }}</div>
    <div id="componenTtiles">
      <div class="titleWs">
        <div
          @click="changeColor(index)"
          v-for="(item, index) in titlesList"
          :key="index"
          class="titleItem"
          :class="[index == ids ? 'colorItem' : '']"
        >
          <div style="margin: 8px 13px 0 30px" class="imgs">
            <img
              :src="require(`../../assets/twoImg/titles${index + 1}.png`)"
              mode=""
              style="width: 16px; height: 16px"
              v-if="index == ids"
            />
            <img
              v-else
              :src="require(`../../assets/twoImg/title${index + 1}.png`)"
              mode=""
              style="width: 16px; height: 16px"
            />
          </div>
          <div
            class="titles"
            style="
              text-align: center;
              line-height: 20px;
              height: 16px;
              margin-top: 11px;
            "
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: 'componenTtiles',
  components: {},
  data: props => {
    return {
      titlesList: [
        { name: '项目简介' },
        { name: '质量分析' },
        { name: '安全分析' },
        { name: '进度分析' },
        { name: '成本分析' },
        { name: '收入分析' },
        { name: '支出分析' },
        { name: '税务分析' },
        { name: '材料分析' },
        { name: '劳务分析' },
        { name: '专业分包分析' },
        { name: '机械租赁分析' },
        { name: '间接费分析' },
        { name: '经营分析' },
        { name: '风险管理' },
        // { name: '项目排行榜' },
      ],
      ids: '',
    };
  },
  props: {
    indexs: {
      type: Number,
      default: null,
    },
    pid: {
      type: String,
      default: null,
    },
    pname: {
      type: String,
      default: null,
    },
  },
  mounted() {
    console.log(this.indexs);
    this.ids = this.indexs;
  },
  methods: {
    changeColor(val) {
      //   this.indexs = val;
      this.$router.push({
        path: '/appIndex8/tabs' + val,
        query: { id: this.pid, name: this.pname },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.pNameS{
    background-color: rgba(255, 255, 255, 0.4);
    padding:18px 30px;
    padding-bottom: 0;
    color: black;
    font-weight: normal;
}
.titleWs {
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-flow: wrap;
  //   justify-content: space-between;
  width: 100%;
  padding: 0 20px  18px 20px;
  border-radius: 10px;

  .titleItem {
    width: 12%;
    // padding: 9px 0px;
    margin-top: 10px;
    height: 40px;
    text-align: center;
    background-color: white;
    color: #3296fa;
    border-radius: 20px;
    display: flex;
    // align-items: center;
    margin-left: 0.5%;
  }
  .colorItem {
    background: #3296fa;
    color: white;
  }
}
@media screen and (max-width: 1643px) {
  .imgs {
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
  .titles {
    font-size: 12px;
  }
}
</style>