<template>
  <div id="qualityAnalysis">
    <div class="main">
      <div class="top">
        <componenTtiles :indexs="13" :pid="pid" :pname="pname"></componenTtiles>
      </div>
    </div>

    <div class="centerXm">
      <div class="oneLeft">
        <div v-for="(item, index) in oneList" class="oneLeftItem" :key="index">
          <div style="margin-left: 25px">
            <div style="width: 43px; height: 43px">
              <img
                :src="require(`../../assets/twoImg/item7${index + 1}.png`)"
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
      <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">现金流分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <!-- <span
              v-for="(item, index) in changListTwo"
              @click="changeTwo(index, '0')"
              :key="index"
              class="child"
              :class="[index == fxindex ? 'childCh' : '']"
              :style="{ borderRight: index == 0 ? 'none' : '' }"
            >
              {{ item.title }}
            </span> -->
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">累计收入</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">累计支出</div>
            </div>
          </div>
        </div>

        <div class="three" style="padding: 0">
          <div
            id="myChartTwop"
            :style="{ width: '100%', height: '300px' }"
          ></div>
          <div>
            <el-row>
              <el-col :span="3">
                <div class="countLeft">
                  <div class="child"><span>指标/月份</span></div>
                  <div class="child"><span>累计收入</span></div>
                  <div class="child"><span>累计支出</span></div>
                  <div class="child"><span>现金流差</span></div>
                </div>
              </el-col>
              <el-col :span="21">
                <div v-if="tableData1.length == 0" style="margin-left: 500px">
                  <img
                    src="@/assets/twoImg/bianji1.png"
                    alt=""
                    style="width: 156px; height: 125px"
                  />
                  <div>暂时还没有数据哦~快去添加</div>
                </div>

                <div
                  style="overflow-x: auto; width: 100%; white-space: nowrap"
                  v-else
                >
                  <div
                    v-for="(item, index) in tableData1"
                    :key="index"
                    class="countLeft"
                    style="
                      background-color: #f8f9fb;
                      border-right: 1px solid #ebeef5;
                      display: inline-block;
                      width: 240px;
                    "
                  >
                    <div class="child">{{ item.month || 0 }}</div>
                    <div class="child">{{ item.lj_income || 0 }}</div>
                    <div class="child">{{ item.lj_expenditure || 0 }}</div>
                    <div class="child">{{ item.cash_flow_cha || 0 }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">产值结算分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <!-- <span
              v-for="(item, index) in changListTwo"
              @click="changeTwo(index, '1')"
              :key="index"
              class="child"
              :class="[index == fxindex1 ? 'childCh' : '']"
              :style="{ borderRight: index == 0 ? 'none' : '' }"
            >
              {{ item.title }}
            </span> -->
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">收入结算</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">支出结算</div>
            </div>
          </div>
        </div>

        <div class="three" style="padding: 0">
          <div
            id="myChartTwos"
            :style="{ width: '100%', height: '300px' }"
          ></div>
          <div>
            <el-row>
              <el-col :span="3">
                <div class="countLeft">
                  <div class="child"><span>指标/月份</span></div>
                  <div class="child"><span>收入结算</span></div>
                  <div class="child"><span>支出结算</span></div>
                  <div class="child"><span>结算差</span></div>
                </div>
              </el-col>
              <el-col :span="21">
                <div v-if="tableData2.length == 0" style="margin-left: 500px">
                  <img
                    src="@/assets/twoImg/bianji1.png"
                    alt=""
                    style="width: 156px; height: 125px"
                  />
                  <div>暂时还没有数据哦~快去添加</div>
                </div>

                <div
                  style="overflow-x: auto; width: 100%; white-space: nowrap"
                  v-else
                >
                  <div
                    v-for="(item, index) in tableData2"
                    :key="index"
                    class="countLeft"
                    style="
                      background-color: #f8f9fb;
                      border-right: 1px solid #ebeef5;
                      display: inline-block;
                      width: 240px;
                    "
                  >
                    <div class="child">{{ item.month || 0 }}</div>
                    <div class="child">{{ item.income_settlement || 0 }}</div>
                    <div class="child">
                      {{ item.expenditure_settlement || 0 }}
                    </div>
                    <div class="child">{{ item.settlement_cha || 0 }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">应收账款分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <!-- <span
              v-for="(item, index) in changListTwo"
              @click="changeTwo(index, '2')"
              :key="index"
              class="child"
              :class="[index == fxindex2 ? 'childCh' : '']"
              :style="{ borderRight: index == 0 ? 'none' : '' }"
            >
              {{ item.title }}
            </span> -->
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">累计收入</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">收入结算</div>
            </div>
          </div>
        </div>

        <div class="three" style="padding: 0">
          <div
            id="myChartTwo1"
            :style="{ width: '100%', height: '300px' }"
          ></div>
          <div>
            <el-row>
              <el-col :span="3">
                <div class="countLeft">
                  <div class="child"><span>指标/月份</span></div>
                  <div class="child"><span>累计收入</span></div>
                  <div class="child"><span>收入结算</span></div>
                  <div class="child"><span>应收账款</span></div>
                </div>
              </el-col>
              <el-col :span="21">
                <div v-if="tableData3.length == 0" style="margin-left: 500px">
                  <img
                    src="@/assets/twoImg/bianji1.png"
                    alt=""
                    style="width: 156px; height: 125px"
                  />
                  <div>暂时还没有数据哦~快去添加</div>
                </div>

                <div
                  style="overflow-x: auto; width: 100%; white-space: nowrap"
                  v-else
                >
                  <div
                    v-for="(item, index) in tableData3"
                    :key="index"
                    class="countLeft"
                    style="
                      background-color: #f8f9fb;
                      border-right: 1px solid #ebeef5;
                      display: inline-block;
                      width: 240px;
                    "
                  >
                    <div class="child">{{ item.month || 0 }}</div>
                    <div class="child">
                      {{ item.contract_collection_money || 0 }}
                    </div>
                    <div class="child">{{ item.income_settlement || 0 }}</div>
                    <div class="child">{{ item.accounts_receivable || 0 }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">应付账款分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <!-- <span
              v-for="(item, index) in changListTwo"
              @click="changeTwo(index, '3')"
              :key="index"
              class="child"
              :class="[index == fxindex3 ? 'childCh' : '']"
              :style="{ borderRight: index == 0 ? 'none' : '' }"
            >
              {{ item.title }}
            </span> -->
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">累计支出</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">累计结算</div>
            </div>
          </div>
        </div>

        <div class="three" style="padding: 0">
          <div
            id="myChartTwo2"
            :style="{ width: '100%', height: '300px' }"
          ></div>
          <div>
            <el-row>
              <el-col :span="3">
                <div class="countLeft">
                  <div class="child"><span>指标/月份</span></div>
                  <div class="child"><span>累计支出</span></div>
                  <div class="child"><span>累计结算</span></div>
                  <div class="child"><span>应收账款</span></div>
                </div>
              </el-col>
              <el-col :span="21">
                <div v-if="tableData4.length == 0" style="margin-left: 500px">
                  <img
                    src="@/assets/twoImg/bianji1.png"
                    alt=""
                    style="width: 156px; height: 125px"
                  />
                  <div>暂时还没有数据哦~快去添加</div>
                </div>

                <div
                  style="overflow-x: auto; width: 100%; white-space: nowrap"
                  v-else
                >
                  <div
                    v-for="(item, index) in tableData4"
                    :key="index"
                    class="countLeft"
                    style="
                      background-color: #f8f9fb;
                      border-right: 1px solid #ebeef5;
                      display: inline-block;
                      width: 240px;
                    "
                  >
                    <div class="child">{{ item.month || 0 }}</div>
                    <div class="child">
                      {{ item.expenditure_settlement || 0 }}
                    </div>
                    <div class="child">{{ item.lj_htzhi || 0 }}</div>
                    <div class="child">{{ item.accounts_payable || 0 }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">预期利润分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <!-- <span
              v-for="(item, index) in changListTwo"
              @click="changeTwo(index, '4')"
              :key="index"
              class="child"
              :class="[index == fxindex4 ? 'childCh' : '']"
              :style="{ borderRight: index == 0 ? 'none' : '' }"
            >
              {{ item.title }}
            </span> -->
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">应收账款</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">应付账款</div>
            </div>
          </div>
        </div>

        <div class="three" style="padding: 0">
          <div
            id="myChartTwo3"
            :style="{ width: '100%', height: '300px' }"
          ></div>
          <div>
            <el-row>
              <el-col :span="3">
                <div class="countLeft">
                  <div class="child"><span>指标/月份</span></div>
                  <div class="child"><span>应收账款</span></div>
                  <div class="child"><span>应付账款</span></div>
                  <div class="child"><span>预期利润</span></div>
                </div>
              </el-col>
              <el-col :span="21">
                <div v-if="tableData5.length == 0" style="margin-left: 500px">
                  <img
                    src="@/assets/twoImg/bianji1.png"
                    alt=""
                    style="width: 156px; height: 125px"
                  />
                  <div>暂时还没有数据哦~快去添加</div>
                </div>

                <div
                  style="overflow-x: auto; width: 100%; white-space: nowrap"
                  v-else
                >
                  <div
                    v-for="(item, index) in tableData5"
                    :key="index"
                    class="countLeft"
                    style="
                      background-color: #f8f9fb;
                      border-right: 1px solid #ebeef5;
                      display: inline-block;
                      width: 240px;
                    "
                  >
                    <div class="child">{{ item.month || 0 }}</div>
                    <div class="child">{{ item.accounts_receivable || 0 }}</div>
                    <div class="child">{{ item.accounts_payable || 0 }}</div>
                    <div class="child">{{ item.expected_profit || 0 }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
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
      fxindex1: 0,
      fxindex2: 0,
      fxindex3: 0,
      fxindex4: 0,
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
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
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
        { title: '累计收入(元)', value: '' },
        { title: '累计支出(元)', value: '' },
        { title: '现金流差', value: '' },
        { title: '收入结算(元)', value: '' },
        { title: '支出结算(元)', value: '' },
        { title: '结算差', value: '' },
        { title: '应收账款(元)', value: '' },
        { title: '应付账款(元)', value: '' },
        { title: '实际利润(元)', value: '' },
      ],
      changList: [
        { title: '2022年' },
        { title: '2021年' },
        { title: '2020年' },
      ],
      changListTwo: [
        { title: '2022年' },
        { title: '2021年' },
        { title: '2020年' },
      ],
      changListThree: [{ title: '整改数量' }, { title: '按经济损失' }],
    };
  },
  methods: {
    getList(ntype) {
      this.$axios
        .post('/bulletin/taxInvoiceXiaox', {
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
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeTwo(row, type) {
      if (type == '0') {
        this.fxindex = row;
      } else if (type == '1') {
        this.fxindex1 = row;
      } else if (type == '2') {
        this.fxindex2 = row;
      } else if (type == '3') {
        this.fxindex3 = row;
      } else if (type == '4') {
        this.fxindex4 = row;
      }
    },
    //现金流列表
    getDTList(row) {
      this.$axios
        .post('/bulletin/manageCashflow', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data;
            this.$nextTick(() => {
              this.drawLine1();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //产值结算分析
    getDTList1(row) {
      this.$axios
        .post('/bulletin/manageSettlement', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData2 = res.data.data;
            this.$nextTick(() => {
              this.drawLine1s();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //应收账款分析
    getDTList2(row) {
      this.$axios
        .post('/bulletin/manageAccountsReceivable', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData3 = res.data.data;
            this.$nextTick(() => {
              this.drawLine2();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //应付账款分析
    getDTList3(row) {
      this.$axios
        .post('/bulletin/manageAccountsPayable', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData4 = res.data.data;
            this.$nextTick(() => {
              this.drawLine3();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //预期利润
    getDTList4(row) {
      this.$axios
        .post('/bulletin/manageExpectedprofit', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData5 = res.data.data;
            this.$nextTick(() => {
              this.drawLine4();
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
        .post('/bulletin/manageInfo', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.lj_income;
            _this.oneList[1].value = res.data.data.lj_expenditure;
            _this.oneList[2].value = res.data.data.cash_flow_cha;
            _this.oneList[3].value = res.data.data.income_settlement;
            _this.oneList[4].value = res.data.data.expenditure_settlement;
            _this.oneList[5].value = res.data.data.settlement_cha;
            _this.oneList[6].value = res.data.data.accounts_receivable;
            _this.oneList[7].value = res.data.data.accounts_payable;
            _this.oneList[8].value = res.data.data.li_run;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(document.getElementById('myChart'));
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData1.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.sett_output);
        textLit.push(e.lj_sett_bi);
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
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      let newObj1 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
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
            max: (isShow1||isShow2) ? null:10,
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
              margin: 35,
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
              color: '#FDB223',
              barBorderRadius: [5, 5, 0, 0],
            },
          },
          // {
          //   name: '累计支出',
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
      };
      if (this.tableData1.length <= 8) {
        newObj1.dataZoom = '';
      } else {
        newObj1.dataZoom = newObj1.dataZoom;
      }
      myChartTwo.setOption(newObj1);
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwop'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData1.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.lj_income);
        textLit.push(e.lj_expenditure);
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
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      let newObj2 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
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
            max: (isShow1||isShow2) ? null:10,
            // min: 0,
            // max: '',
            // //interval: 100,
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
        ],
        series: [
          {
            name: '累计收入',
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
            name: '累计支出',
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
      };
      if (this.tableData1.length <= 8) {
        newObj2.dataZoom = '';
      } else {
        newObj2.dataZoom = newObj2.dataZoom;
      }
      myChartTwo.setOption(newObj2);
    },
    drawLine1s() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwos'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData2.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.income_settlement);
        textLit.push(e.expenditure_settlement);
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
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      let newObj3 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
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
            max: (isShow1||isShow2) ? null:10,
            // min: 0,
            // max: 500,
            // //interval: 100,
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
            // //interval: 100,
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
            name: '收入结算',
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
            name: '支出结算',
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
      };
      if (this.tableData2.length <= 8) {
        newObj3.dataZoom = '';
      } else {
        newObj3.dataZoom = newObj3.dataZoom;
      }
      myChartTwo.setOption(newObj3);
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo1'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData3.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.contract_collection_money);
        textLit.push(e.income_settlement);
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
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      let newObj4 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
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
            max: (isShow1||isShow2) ? null:10,
            // min: 0,
            // max: 500,
            // //interval: 100,
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
            // //interval: 100,
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
            name: '累计收入',
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
            name: '收入结算',
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
      };
      if (this.tableData3.length <= 8) {
        newObj4.dataZoom = '';
      } else {
        newObj4.dataZoom = newObj4.dataZoom;
      }
      myChartTwo.setOption(newObj4);
    },
    drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo2'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData4.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.expenditure_settlement);
        textLit.push(e.lj_htzhi);
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
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      let newObj5 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
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
            max: (isShow1||isShow2) ? null:10,
            // min: 0,
            // max: 500,
            // //interval: 100,
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
            // //interval: 100,
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
            name: '累计支出',
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
            name: '累计结算',
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
      };
      if (this.tableData4.length <= 8) {
        newObj5.dataZoom = '';
      } else {
        newObj5.dataZoom = newObj5.dataZoom;
      }
      myChartTwo.setOption(newObj5);
    },
    drawLine4() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo3'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData5.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.accounts_receivable);
        textLit.push(e.accounts_payable);
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
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      let newObj5 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
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
            max: (isShow1||isShow2) ? null:10,
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
            name: '应收账款',
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
            name: '应付账款',
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
      };
      if (this.tableData5.length <= 8) {
        newObj5.dataZoom = '';
      } else {
        newObj5.dataZoom = newObj5.dataZoom;
      }
      myChartTwo.setOption(newObj5);
    },
    resCharts() {
      let myChartTwop = this.$echarts.init(
        document.getElementById('myChartTwop'),
      );
      let myChartTwos = this.$echarts.init(
        document.getElementById('myChartTwos'),
      );
      let myChartTwo1 = this.$echarts.init(
        document.getElementById('myChartTwo1'),
      );
      let myChartTwo2 = this.$echarts.init(
        document.getElementById('myChartTwo2'),
      );
      let myChartTwo3 = this.$echarts.init(
        document.getElementById('myChartTwo3'),
      );
      myChartTwop.resize();
      myChartTwos.resize();
      myChartTwo1.resize();
      myChartTwo2.resize();
      myChartTwo3.resize();
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getLInfo();
    this.getDTList('1');
    this.getDTList1('1');
    this.getDTList2('1');
    this.getDTList3('1');
    this.getDTList4('1');
    this.getList();
    window.addEventListener('resize', () => {
      this.resCharts();
    });
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
    // justify-content: space-between;

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
      margin-left: 1%;
    }
    .oneBton {
      width: 66%;
    }
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
  // margin-top: 17px;
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