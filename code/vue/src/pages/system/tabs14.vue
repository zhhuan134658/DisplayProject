<template>
  <div id="qualityAnalysis">
    <div class="main">
      <div class="top">
        <componenTtiles :indexs="14" :pid="pid" :pname="pname"></componenTtiles>
      </div>
    </div>

    <div class="centerXm">
      <div class="oneLeft">
        <div v-for="(item, index) in oneList" class="oneLeftItem" :key="index">
          <div style="margin-left: 25px">
            <div style="width: 43px; height: 43px">
              <img
                :src="require(`../../assets/twoImg/item9${index + 1}.png`)"
                mode=""
                style="width: 100%; height: 100%"
              />
            </div>
          </div>
          <div style="margin-left: 15px">
            <div>{{ item.title }}</div>
            <div style="font-weight: bold">{{ item.value || 0 }}</div>
          </div>
        </div>
      </div>

      <div class="three">
        <el-row class="threeOne">
          <el-col :span="24">
            <div class="twoLeftTop">
              <el-row>
                <el-col :span="12"
                  ><div>
                    <div class="line"></div>
                    <div style="margin-left: 8px; font-weight: bold">
                      总金额分析
                    </div>
                  </div></el-col
                >
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div style="margin-top: 25px">
          <span
            v-for="(item, index) in changListThree"
            @click="changeTwo(index)"
            :key="index"
            class="child"
            :class="[index == fxindex ? 'childCh' : '']"
            :style="{ borderRight: index == 0 ? 'none' : '' }"
          >
            {{ item.title }}
          </span>
        </div>

        <el-row class="threeSan">
          <commonTable
            :tpList="tpList"
            :titleList="titleList"
            :footerNumList="footerNumList"
            :isFooter="isFooter"
            :istwo="true"
            @listenChild="getMult"
            printTableName="zhiliang"
          ></commonTable>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 50, 100]"
              :page-size="pagesize"
              layout="sizes,prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-row>
      </div>

      <!-- <div class="three">
        <el-row class="threeOne">
          <el-col :span="24">
            <div class="twoLeftTop">
              <el-row>
                <el-col :span="12"
                  ><div>
                    <div class="line"></div>
                    <div style="margin-left: 8px; font-weight: bold">
                      潜在风险
                    </div>
                  </div></el-col
                >
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="Datas"
          border
          style="width: 100%; margin-top: 25px"
          :header-cell-style="{ background: '#F8F9FB', color: '' }"
        >
          <el-table-column type="index" fixed="left" width="55" label="序号" />

          <el-table-column prop="riqi" label="事件"> </el-table-column>
          <el-table-column prop="xiaox_money" label="损失金额(元)">
          </el-table-column>
          <el-table-column prop="xiaox_lv" label="上报人"> </el-table-column>
          <el-table-column prop="xiaox_shui" label="进展情况">
          </el-table-column>

          <template slot="empty">
            <slot name="empty">
              <img
                src="@/assets/twoImg/bianji1.png"
                alt=""
                style="width: 156px; height: 125px"
              />
              <div>暂时还没有数据哦~快去添加</div>
            </slot>
          </template>
        </el-table>

        <el-row class="threeSan">
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 50, 100]"
              :page-size="pagesize"
              layout="sizes,prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-row>
      </div> -->
    </div>
  </div>
</template>
<script>
import componenTtiles from './componenTtiles.vue';
import pierceTable from '@/components/Piercethrough/pierceTable.vue';
import commonTable from '@/components/commonTable.vue';

import qulEditor from './quEditor'; //富文本编辑器组件的路径

export default {
  name: 'qualityAnalysis',
  components: { componenTtiles, pierceTable, qulEditor, commonTable },
  data() {
    return {
      indexs: 1,
      footerNumList: [],
      pid: '',
      name: '',
      pname: '',
      fxindex: 0,
      pagesize: 10,
      currentPage: 1,
      total: 0,
      titleData: '',
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),
      Datas: [],
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
        { name: '项目排行榜' },
      ],
      tpList: [],
      titleList: [],
      isFooter: 0,
      tableData: [],
      tableData1: [],
      isShow: true,
      project_situation: {
        id: '', //详细情况id
        extend_first: '', //合同主要条款
        extend_two: '', //结算条款
        extend_three: '', //付款条款
        extend_four: '', //违约条款
        project_id: '',
        project_name: '',
      },
      multSelectData: [],
      oneList: [{ title: '总金额(元)', value: '' }],
      changListThree: [{ title: '质量事故汇报' }, { title: '安全事故汇报' }],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      if (this.fxindex == '0') {
        this.getList();
      } else {
        this.getList1();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.fxindex == '0') {
        this.getList();
      } else {
        this.getList1();
      }
    },
    getMult(val) {
      this.multSelectData = val;
    },
    changeTwo(row, type) {
      this.fxindex = row;
      this.pagesize = 10;
      this.currentPage = 1;
      if (row == '0') {
        this.getList();
      } else {
        this.getList1();
      }
    },
    getList(ntype) {
      this.$axios
        .post('/finance/zhilian', {
          current_page: this.currentPage,
          num: this.pagesize,
          userid: this.$store.state.userInfo.uid,
          corp_id: this.$store.state.cid,
          proname: this.$route.query.name,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: '列表刷新成功',
                type: 'success',
                duration: 1500,
              });
            }
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.titleList = res.data.mould_data.mould_data;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data.mould_data;
              this.titleList.map(item => {
                this.newFooter.forEach(element => {
                  if (element.value == item.value) {
                    this.footerNumList.push(element);
                  }
                });
              });
            }

            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page;
              this.getList();
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getList1(ntype) {
      this.$axios
        .post('/finance/anquanzhilian', {
          corp_id: this.$store.state.cid,
          current_page: this.currentPage,
          userid: this.$store.state.userInfo.uid,
          num: this.pagesize,
          proname: this.$route.query.name,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: '列表刷新成功',
                type: 'success',
                duration: 1500,
              });
            }
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.titlesList = res.data.mould_data.mould_data;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data.mould_data;
              this.titleList.map(item => {
                this.newFooter.forEach(element => {
                  if (element.value == item.value) {
                    this.footerNumList.push(element);
                  }
                });
              });
            }
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page;
              this.getList();
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //进项税分析列表
    getDTList(row) {
      this.$axios
        .post('/bulletin/incomeRevenueSettlement', {
          project_id: this.pid,
          project_name: this.pname,
          year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data;
            this.$nextTick(() => {
              //   this.drawLine1();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //上方信息
    getLInfo() {
      const _this = this;

      _this.$axios
        .post('/bulletin/riskLoss', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.accident_money;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData1.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.sett_output);
        textLit.push(e.lj_sett_bi);
      });
      myChartTwo.setOption({
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:条', //---副标题内容样式
          subtextStyle: {
            color: '#bbb',
            fontSize: 12,
          },
          padding: [0, 0, 20, 0],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
          //   show: false,
        },
        dataZoom: {
          start: 0, //默认为0
          end: 100 - 1500 / 41, //默认为100
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0, //滑动条的 左右2个滑动条的大小
          height: 26, //组件高度
          left: '0%', //左边的距离
          right: '0%', //右边的距离
          bottom: 26, //右边的距离
          borderColor: 'none',
          fillerColor: '#E0E0E0',
          borderRadius: 5,
          backgroundColor: '#F1F1F1', //两边未选中的滑动条区域的颜色
          showDataShadow: false, //是否显示数据阴影 默认auto
          showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
          realtime: true, //是否实时更新
          filterMode: 'filter',
          y: 278,
        },
        legend: {
          data: ['意向', '预购', '成交'],
        },
        xAxis: [
          {
            type: 'category',
            data: nameLit,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            name: '',
            type: 'value',
            // min: 0,
            // max: 500,
            //interval: 100,
            axisLine: {
              show: true,
              lineStyle: {
                //lineStyle里面写y轴那一条线的样式
                color: '#BBB',
                width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
              },
            },

            // boundaryGap : [ 0.2, 0.2 ],
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: '{value}',
              margin: 30,
            },
            postition: 'left',
            offset: 5,
          },
          {
            // name: '单位:元',
            // nameLocation: 'start',
            alignTicks: false,
            type: 'value',
            // inverse: true,
            // min: 0,
            // max: 500,
            //interval: 100,
            axisLine: {
              show: false,
              lineStyle: {
                //lineStyle里面写y轴那一条线的样式
                // color: '#BBB',
                // width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
              },
            },
            axisTick: {
              show: false,
            },

            axisLabel: {
              formatter: '{value}',
            },
            offset: 25,
          },
        ],
        series: [
          {
            name: '支出金额',
            type: 'bar',
            barWidth: '50',
            barCategoryGap: '20%',
            data: countLit,
            itemStyle: {
              color: '#FDB223',
              barBorderRadius: [5, 5, 0, 0],
            },
          },
          {
            name: '进项发票',
            type: 'line',
            data: textLit,
            smooth: true,
            itemStyle: {
              color: '#3296FA',
              barBorderRadius: [18, 18, 8, 8],
            },
            symbolSize: 7,
            colorBy: 'series',
          },
        ],
      });
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getLInfo();
    // this.getDTList('1');
    this.getList();
  },
};
</script>
<style scoped lang='scss'>
.line {
  width: 3px;
  height: 15px;
  background: #ff275a;
  position: absolute;
  top: 4px;
  left: 0;
}
#qualityAnalysis {
  background: url('../../assets/twoImg/bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 80px;
}
.page {
  text-align: center;
  margin-top: 11px;
}
.two {
  .line {
    width: 3px;
    height: 15px;
    background: #ff275a;
    position: absolute;
    top: 4px;
    left: 0;
  }
  margin-top: 20px;
  .twoLeft {
    background-color: white;
    padding: 15px;

    .twoLeftBtn {
      border: 1px solid #ebeef5;
      margin-top: 20px;
      background-color: #f8f9fb;
      .twoLeftBtnCount {
        display: flex;
        .xmjj {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
        .xmjj1 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .left {
          width: 11%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #333333;
        }
        .right {
          width: 89%;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ebeef5;
          padding-left: 20px;
          background-color: white;
          color: #666666;
        }
      }
      .heT {
        width: 33.3%;
      }
      .heTs {
        width: 50%;
      }
    }
  }
  .twoRight {
    background-color: white;

    height: 467px;
    padding: 15px;
  }
}
.centerXm {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  margin-top: 20px;
  border-radius: 10px;
  .oneLeft {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    .oneLeftItem {
      display: flex;
      //   justify-content: space-evenly;
      width: 19%;
      background-color: white;
      border-radius: 10px;
      align-items: center;
      padding: 15px 0;
      margin-top: 10px;
      font-size: 14px;
      margin-left: 0;
    }
    .oneBton {
      width: 66%;
    }
  }
  .child {
    width: 150px;
    height: 28px;
    border: 1px solid #d8e0e6;
    text-align: center;
    line-height: 26px;
    border-bottom: none;
    display: inline-block;
  }
  .childCh {
    color: white;
    background-color: #0189fe;
    border: 1px solid #0189fe;
  }
  .centerTwo {
    background-color: white;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    .centerTwoChan {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      .child {
        width: 150px;
        height: 28px;
        border: 1px solid #d8e0e6;
        text-align: center;
        line-height: 26px;
        border-bottom: none;
        display: inline-block;
      }
      .childCh {
        color: white;
        background-color: #0189fe;
        border: 1px solid #0189fe;
      }
      .orange {
        width: 8px;
        height: 13px;
        background: #fcb224;
        border-radius: 3px;
        display: inline-block;
        margin: 0px 4px 0 0;
      }
      .right {
        color: #999999;
        font-size: 14px;
      }
    }
    .three {
      border: 1px solid #d8e0e6;
      width: 100%;
      .countLeft {
        .child {
          height: 49px;
          text-align: center;
          line-height: 50px;
          border-top: 1px solid #ebeef5;
          background-color: #f8f9fb;
        }
      }
    }
    .line {
      width: 3px;
      height: 15px;
      background: #ff275a;
      position: absolute;
      top: 4px;
      left: 0;
    }
  }
}
.three {
  margin-top: 17px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  .threeTwo {
    border: 1px solid #ebeef5;
    margin-top: 15px;
    .threeTwoS {
      .item {
        padding: 20px;
        border-bottom: 1px solid #ebeef5;
      }
      .zhiding {
        width: 50px;
        height: 20px;
        background-color: #ff3922;
        color: white;
        text-align: center;
        margin-right: 5px;
        display: inline-block;
        border-radius: 20px;
        line-height: 20px;
      }
      .threeVlue {
        width: 98%;
        height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        margin-top: 10px;
      }
      .threeInfo {
        color: #999999;
        font-size: 12px;
        .riqi {
          margin: 5px 10px;
        }
        .lines {
          position: relative;
          top: -1px;
          left: 5px;
        }
      }
    }
  }
  .threeSan {
    .page {
      text-align: center;
      margin-top: 11px;
    }
  }
}
</style>