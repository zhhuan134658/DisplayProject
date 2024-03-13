<template>
  <div id="qualityAnalysis">
    <div class="main">
      <div class="top">
        <componenTtiles :indexs="10" :pid="pid" :pname="pname"></componenTtiles>
      </div>
    </div>

    <div class="centerXm">
      <div class="oneLeft">
        <div v-for="(item, index) in oneList" class="oneLeftItem" :key="index">
          <div style="margin-left: 25px">
            <div style="width: 43px; height: 43px">
              <img
                :src="require(`../../assets/twoImg/item6${index + 1}.png`)"
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
                      合同分析
                    </div>
                  </div></el-col
                >
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div style="margin-top: 25px">
          <!-- <span
            v-for="(item, index) in changListTwo"
            @click="changeTwo1(index)"
            :key="index"
            class="child"
            :class="[index == fxindex ? 'childCh' : '']"
            :style="{ borderRight: index == 0 ? 'none' : '' }"
          >
            {{ item.title }}
          </span> -->
        </div>
        <el-table
          :data="Datas"
          border
          style="width: 101%"
          :header-cell-style="{ background: '#F8F9FB', color: '' }"
        >
          <el-table-column type="index" fixed="left" width="55" label="序号" />

          <el-table-column prop="riqi" label="签约时间"> </el-table-column>
          <el-table-column prop="ht_money" label="合同金额(元)">
          </el-table-column>
          <el-table-column prop="sett_money" label="已结算金额(元)">
          </el-table-column>
          <el-table-column prop="paid_money" label="已付款金额(元)">
          </el-table-column>
          <el-table-column prop="shou_money" label="已开发票金额(元)">
          </el-table-column>
          <el-table-column prop="bi_lv" label="付款比率"> </el-table-column>
          <el-table-column prop="unit_name" label="签约单位"> </el-table-column>
          <!-- <el-table-column prop="xiaox_shui" width="110" label="状态">
          </el-table-column> -->

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
            <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage" -->
            <!-- <el-pagination
              :page-sizes="[10, 50, 100]"
              :page-size="pagesize"
              layout="sizes,prev, pager, next, jumper"
              :total="total"
            ></el-pagination> -->
          </div>
        </el-row>
      </div>
      <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">分包结构数据</div>
        </div>
        <div style="margin-top: 25px">
          <!-- <span
            v-for="(item, index) in changListThree"
            @click="changeTwo1s(index)"
            :key="index"
            class="child"
            :class="[index == fxindexs ? 'childCh' : '']"
            :style="{ borderRight: index == 0 ? 'none' : '' }"
          >
            {{ item.title }}
          </span> -->
        </div>
        <div
          class="three"
          style="padding: 0; margin-top: 0; position: relative"
        >
          <div v-if="fxindexs == 0">
            <div
              id="myChartTwo"
              :style="{ width: '100%', height: '300px' }"
            ></div>
          </div>

          <div
            id="myChartTwos"
            v-if="fxindexs == 1"
            :style="{ width: '100%', height: '300px' }"
          ></div>
          <div v-if="Datas1.length == 0" class="posImg">
            <img
              src="@/assets/twoImg/bianji1.png"
              alt=""
              style="width: 156px; height: 125px"
            />
            <div>暂时还没有数据哦~快去添加</div>
          </div>
          <el-table
            :data="Datas1"
            border
            style="width: 100%"
            :header-cell-style="{ background: '#F8F9FB', color: '' }"
          >
            <el-table-column
              type="index"
              fixed="left"
              width="55"
              label="序号"
            />

            <el-table-column prop="contract_name" label="合同名称">
            </el-table-column>
            <el-table-column prop="contract_type" label="合同类型">
            </el-table-column>
            <el-table-column prop="contract_money" label="合同金额(元)">
            </el-table-column>
            <el-table-column prop="change_money" label="签证金额(元)">
            </el-table-column>
            <el-table-column prop="bi_lv" label="签证比率"> </el-table-column>
            <el-table-column prop="sign_unit" label="签约单位">
            </el-table-column>
            <el-table-column prop="sign_riqi" width="110" label="签约时间">
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
        </div>
      </div>
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
      fxindex: 0,
      fxindexs: 0,
      footerNumList: [],
      pid: '',
      name: '',
      pname: '',
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
      Datas1: [],
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
      oneList: [
        { title: '合同总金额(元)', value: '' },
        { title: '合同份数(份)', value: '' },
        { title: '关联企业(家)', value: '' },
        { title: '结算金额(元)', value: '' },
        { title: '已支付金额(元)', value: '' },
        { title: '待支付金额(元)', value: '' },
      ],
      changListTwo: [
        { title: '按时间排序' },
        { title: '按合同金额' },
        { title: '按付款比率' },
      ],
      changListThree: [{ title: '柱状图' }, { title: '饼状图' }],
    };
  },
  methods: {
    getList(ntype) {
      this.$axios
        .post('/bulletin/subContractAnalysisUnit', {
          project_name: this.pname,
          project_id: this.pid,
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
            this.total = res.data.count;
            this.Datas = res.data.data;

            console.log(this.Datas, 'DatasDatasDatas');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getList1(ntype) {
      this.$axios
        .post('/bulletin/subMainAnalysis', {
          project_name: this.pname,
          project_id: this.pid,
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
            this.total = res.data.count;
            this.Datas1 = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分包结构数据列表
    getDTList(row) {
      console.log(this.fxindexs, 'data');
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
              if (this.fxindexs == '0') {
                this.drawLine1();
              } else if (this.fxindexs == '1') {
                this.drawLine1s();
              }
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeTwo1(row) {
      this.fxindex = row;
    },
    changeTwo1s(row) {
      this.fxindexs = row;
      // // if(row==0){
      // this.drawLine1();

      // // }else{

      // // }
      // this.$forceUpdate();
      this.getDTList();
      //   console.log(this.fxindexs, 'this.fxindexsthis.fxindexs');
    },
    //上方信息
    getLInfo() {
      const _this = this;

      _this.$axios
        .post('/bulletin/subInfo', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.contract_money;
            _this.oneList[1].value = res.data.data.ht_number;
            _this.oneList[2].value = res.data.data.qy_number;
            _this.oneList[3].value = res.data.data.settle_money;
            _this.oneList[4].value = res.data.data.paid_money;
            _this.oneList[5].value = res.data.data.no_paid_money;
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
      //   var arr = [
      //     {
      //       contract_name: '测试1',
      //       contract_money: '333',
      //     },
      //     {
      //       contract_name: '测试2',
      //       contract_money: '666',
      //     },
      //   ];
      this.Datas1.forEach(e => {
        nameLit.push(e.contract_name);
        countLit.push(e.contract_money);
      });
      let isShow1 = true;
      let n1 = 0
      countLit.map((e,index)=>{
        if(e>10){
          n1++  
        }
        if(n1>0){
            isShow1 = true
          }else{
          isShow1 = false
        }
      })
      
      myChartTwo.setOption({
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '0',
          top: '22',
          // subtext: '单位:条', //---副标题内容样式
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
            max: isShow1 ? null:10,
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
              margin: 15,
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
            name: '',
            type: 'bar',
            barWidth: '50',
            barCategoryGap: '20%',
            data: countLit,
            itemStyle: {
              color: '#3396FB',
              barBorderRadius: [5, 5, 0, 0],
            },
          },
          // {
          //   name: '进项发票',
          //   type: 'line',
          //   data: textLit,
          //   smooth: true,
          //   itemStyle: {
          //     color: '#3296FA',
          //     barBorderRadius: [18, 18, 8, 8],
          //   },
          //   symbolSize: 7,
          //   colorBy: 'series',
          // },
        ],
      });
    },
    drawLine1s() {
      // 基于准备好的dom，初始化echarts实例
      console.log(222222222);
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwos'),
      );
      let nameLit = [];
      let countLit = [];
      //   var arr = [
      //     {
      //       contract_name: '测试1',
      //       contract_money: '333',
      //     },
      //     {
      //       contract_name: '测试2',
      //       contract_money: '666',
      //     },
      //   ];
      this.Datas1.forEach(e => {
        nameLit.push(e);
        // countLit.push(e.sett_output);
      });
      nameLit.forEach(e => {
        e.name = e.contract_name;
        e.value = e.contract_money;
      });

      console.log(nameLit, 'nameLitnameLitnameLit');
      myChartTwo.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '25%',
          right: '20%',
          orient: 'vertical',
          textStyle: {
            // fontSize: 14
          },
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: nameLit,

            //  [
            //   { value: 1048, name: 'Search Engine',itemStyle: { color: '#005eff' } },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' },
            // ],
          },
        ],
      });
    },
    resCharts() {
      let myChartTwos = this.$echarts.init(document.getElementById('myChartTwos'));
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo'),
      );
      myChartTwos.resize();
      myChartTwo.resize();
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getLInfo();
    this.getDTList('1');
    this.getList();
    this.getList1();
    window.addEventListener('resize', () => {
      this.resCharts();
    });
  },
};
</script>
<style scoped lang='scss'>
.posImg {
  position: absolute;
  left: 50%;
  top: 1%;
  transform: translate(-50%);
  width: 100%;
  height: 54%;
  background-color: white;
  text-align: center;
}
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
    // justify-content: space-between;

    .oneLeftItem {
      display: flex;
      //   justify-content: space-evenly;
      margin-left: 1%;
      width: 24%;
      background-color: white;
      border-radius: 10px;
      align-items: center;
      padding: 15px 0;
      margin-top: 10px;
      font-size: 14px;
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