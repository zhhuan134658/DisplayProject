<template>
  <div id="qualityAnalysis">
    <div class="main">
      <div class="top">
        <componenTtiles :indexs="12" :pid="pid" :pname="pname"></componenTtiles>
      </div>
    </div>

    <div class="centerXm">
      <div class="oneLeft">
        <div v-for="(item, index) in oneList" class="oneLeftItem" :key="index">
          <div style="margin-left: 25px">
            <div style="width: 43px; height: 43px">
              <img
                :src="require(`../../assets/twoImg/item8${index + 1}.png`)"
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
          <div style="margin-left: 8px; font-weight: bold">间接费分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <!-- <span
                v-for="(item, index) in changListTwo"
                @click="changeTwo1(index)"
                :key="index"
                class="child"
                :class="[index == fxindex1 ? 'childCh' : '']"
                :style="{borderRight:(index==0?'none':'')}"
              >
                {{ item.title }}
              </span> -->
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">间接成本预算</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">间接费实际支出</div>
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
                  <div class="child"><span>指标/类型</span></div>
                  <div class="child"><span>间接成本预算</span></div>
                  <div class="child"><span>间接费实际支出</span></div>
                  <div class="child"><span>差额</span></div>
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
                    <div class="child">{{ item.type || '' }}</div>
                    <div class="child">{{ item.ys_money || 0 }}</div>
                    <div class="child">{{ item.sj_money || 0 }}</div>
                    <div class="child">{{ item.cha_money || 0 }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">企业管理费分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <span
                v-for="(item, index) in changListTwo"
                @click="changeTwo1(index)"
                :key="index"
                class="child"
                :class="[index == fxindex1 ? 'childCh' : '']"
                :style="{borderRight:(index==0?'none':'')}"
              >
                {{ item.title }}
              </span>
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
              <div class="orange"></div>
              <div class="right" style="margin-right: 10px">实际支出</div>
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">预算支出</div>
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
                  <div class="child"><span>指标/类型</span></div>
                  <div class="child"><span>实际支出</span></div>
                  <div class="child"><span>预算支出</span></div>
                  <div class="child"><span>差额</span></div>
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
                    <div class="child">{{ item.month }}</div>
                    <div class="child">{{ item.sett_output }}</div>
                    <div class="child">{{ item.lj_sett_bi }}</div>
                    <div class="child">{{ item.lj_sett_bi }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div> -->

      <div class="three">
        <el-row class="threeOne">
          <el-col :span="24">
            <div class="twoLeftTop">
              <el-row>
                <el-col :span="12"
                  ><div>
                    <div class="line"></div>
                    <div style="margin-left: 8px; font-weight: bold">
                      规费分析
                    </div>
                  </div></el-col
                >
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div
          id="myChartTwosd"
          :style="{ width: '100%', height: '300px' }"
        ></div>
        <el-table
          :data="tableData2"
          border
          style="width: 100%; margin-top: 25px"
          :header-cell-style="{ background: '#F8F9FB', color: '' }"
        >
          <el-table-column type="index" fixed="left" width="55" label="序号" />

          <el-table-column prop="type" label="名称"> </el-table-column>
          <el-table-column prop="money" label="金额(元)"> </el-table-column>
          <!-- <el-table-column prop="xiaox_lv" label="部门">
                    </el-table-column>
            <el-table-column prop="xiaox_shui"  label="时间">
                    </el-table-column>       -->

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
            <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 50, 100]"
              :page-size="pagesize"
              layout="sizes,prev, pager, next, jumper"
              :total="total"
            ></el-pagination> -->
          </div>
        </el-row>
      </div>

      <!-- <div class="centerTwo">
        <div style="position: relative">
          <div class="line"></div>
          <div style="margin-left: 8px; font-weight: bold">罚扣款分析</div>
        </div>
        <div class="centerTwoChan">
          <div>
            <span
                v-for="(item, index) in changListTwo"
                @click="changeTwo1(index)"
                :key="index"
                class="child"
                :class="[index == fxindex1 ? 'childCh' : '']"
                :style="{borderRight:(index==0?'none':'')}"
              >
                {{ item.title }}
              </span>
          </div>

          <div style="display: flex; align-items: center">
            <div style="display: flex; align-items: center">
             <div class="orange" ></div> 
            <div class="right" style="margin-right: 10px">间接成本预算</div> 
            </div>
            <div style="display: flex; align-items: center">
              <div class="orange" style="background: #3296fa"></div>
              <div class="right">间接费实际支出</div> 
            </div>
          </div>
        </div>

        <div class="three" style="padding: 0">
          <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
          <div>
            <el-row>
              <el-col :span="3">
                <div class="countLeft">
                  <div class="child"><span>指标/类型</span></div>
                  <div class="child"><span>金额</span></div>
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
                    <div class="child">{{ item.month }}</div>
                    <div class="child">{{ item.sett_output }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
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
        { title: '支出金额(元)', value: '' },
        { title: '预算金额(元)', value: '' },
        { title: '与预算对比(元)', value: '' },
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
    //间接费分析
    getDTList(row) {
      this.$axios
        .post('/bulletin/costIndirect', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data;
            this.$nextTick(() => {
              this.drawLine1();
              //   this.drawLine1s();
              //   this.drawLine();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 规费分析
    getDTList1(row) {
      this.$axios
        .post('/bulletin/indirectGuifee', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData2 = res.data.data;
            this.drawLine1sd();
            console.log(this.tableData2, 'tableData2tableData2tableData2');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 企业管理费分析
    getDTList2(row) {
      this.$axios
        .post('/bulletin/indirectGuifee', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData3 = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 罚扣款分析
    getDTList3(row) {
      this.$axios
        .post('/bulletin/indirectGuifee', {
          project_id: this.pid,
          project_name: this.pname,
          //   year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData4 = res.data.data;
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
        .post('/bulletin/indirectInfo', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.zhi_money;
            _this.oneList[1].value = res.data.data.yu_money;
            _this.oneList[2].value = res.data.data.bi_lv;
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
        nameLit.push(e.type);
        countLit.push(e.ys_money);
        textLit.push(e.sj_money);
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
          //   name: '间接费实际支出',
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
      var arr = [];
      this.tableData1.forEach(e => {
        nameLit.push(e.type);
        countLit.push(e.ys_money);
        textLit.push(e.sj_money);
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
      console.log(countLit,textLit,"ooo")
      
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
          // subtext: '单位:元', //---副标题内容样式
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
        // dataZoom: {
        //   start: 0, //默认为0
        //   end: 100 - 1500 / 41, //默认为100
        //   type: 'slider',
        //   show: true,
        //   xAxisIndex: [0],
        //   handleSize: 0, //滑动条的 左右2个滑动条的大小
        //   height: 26, //组件高度
        //   left: '0%', //左边的距离
        //   right: '0%', //右边的距离
        //   bottom: 26, //右边的距离
        //   borderColor: 'none',
        //   fillerColor: '#E0E0E0',
        //   borderRadius: 5,
        //   backgroundColor: '#F1F1F1', //两边未选中的滑动条区域的颜色
        //   showDataShadow: false, //是否显示数据阴影 默认auto
        //   showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
        //   realtime: true, //是否实时更新
        //   filterMode: 'filter',
        //   y: 278,
        // },
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
            name: '单位:元',
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
          // {
          //   // name: '单位:元',
          //   // nameLocation: 'start',
          //   alignTicks: false,
          //   type: 'value',
          //   // inverse: true,
          //   // min: 0,
          //   // max: 500,
          //   //interval: 100,
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       //lineStyle里面写y轴那一条线的样式
          //       // color: '#BBB',
          //       // width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
          //     },
          //   },
          //   axisTick: {
          //     show: false,
          //   },

          //   axisLabel: {
          //     formatter: '{value}',
          //   },
          //   offset: 25,
          // },
        ],
        series: [
          {
            name: '间接成本预算',
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
            name: '间接费实际支出',
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
    drawLine1s() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwos'),
      );
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
            name: '实际支出',
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
            name: '预算支出',
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
    drawLine1sd() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwosd'),
      );
      let nameLit = [];
      this.tableData2.forEach(e => {
        nameLit.push(e);
      });
      nameLit.forEach(e => {
        e.name = e.type;
        e.value = e.money;
      });
      console.log(this.tableData2, 'nameLitnameLit');
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
            name: '',
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
      let myChartTwop = this.$echarts.init(
        document.getElementById('myChartTwop'),
      );
      let myChartTwosd = this.$echarts.init(
        document.getElementById('myChartTwosd'),
      );
      myChartTwosd.resize();
      myChartTwop.resize();
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getLInfo();
    this.getDTList();
    this.getDTList1();
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
      width: 20%;
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