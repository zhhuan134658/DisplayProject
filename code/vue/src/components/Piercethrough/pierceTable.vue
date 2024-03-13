<template>
  <!-- 穿透 -->
  <div id="pierceTable">
    <div class="title">
      <div>{{ proName }}</div>
      <div v-if="totalMoney!='项目看板'">
        {{ totalMoney }}
        <span v-if="totalMoney.includes('计划量')"></span>
        <span v-else-if="totalMoney.includes('申请量')"></span>
        <span v-else-if="totalMoney.includes('入库量')"></span>
           <span v-else-if="totalMoney.includes('采购量')"></span>
           <span v-else-if="totalMoney.includes('退货量')"></span>
           <span v-else-if="totalMoney.includes('提出量')"></span>
           <span v-else-if="totalMoney.includes('期初量')"></span>
           <span v-else-if="totalMoney.includes('出库量')"></span>
           <span v-else-if="totalMoney.includes('调入量')"></span>
           <span v-else-if="totalMoney.includes('调出量')"></span>
           <span v-else-if="totalMoney.includes('盘点数量')"></span>
           <span v-else-if="totalMoney.includes('盘点量')"></span>
           <span v-else-if="totalMoney.includes('退库量')"></span>
           <!-- <span v-else-if="totalMoney.includes('分项名称')"></span> -->
        <span v-else> (元) </span>
      </div>
    </div>
    <a-tabs
      default-active-key="1"
      tab-position="top"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane
        v-for="(item, index) in tableList"
        :key="index"
        :tab="item.title"
      >
        <a-table
          :locale="{ emptyText: '暂无数据' }"
          :customRow="handleClick"
          :columns="item.mould_data"
          :data-source="item.data"
          :pagination="{ pageSize: 5, defaultCurrent: 1 }"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  props: {
    tableList: Array,
    proName: String,
    totalMoney: String,
    taPLoading: Boolean, //表格加载
  },
  data() {
    return {
      pageSize: 10,
      totalSize: null,
      current_page: 1,
      tableData: [], //el-table  绑定的数据
    };
  },
  mounted(){
      console.log(this.tableList,'tableListtableList')

  },
  methods: {
    callback(val) {
      console.log(val);
    },
    handleClick(record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index);
            this.checkList(record);
          },
        },
      };
    },
    //查看审批
    checkList(row) {
      let newUrl = '';
      if (row.filename) {
        newUrl = row.filename;
      } else {
        newUrl = row.url;
      }
      dd.ready(function () {
        dd.biz.util.openSlidePanel({
          url: newUrl, //打开侧边栏的url
          title: '详情', //侧边栏顶部标题
          onSuccess: function () {},
          onFail: function () {},
        });
      });
    },
  },
  beforeUpdate() {},
  created() {
  },
};
</script>

<style lang="less">
#pierceTable {
  .title {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    color: #000;
    font-size: 17px;
  }
}
</style>
