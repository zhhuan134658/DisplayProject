<template>
  <div id="qualityAnalysis">
    <div class="main">
      <div class="top">
          <componenTtiles :indexs='4' :pid="pid" :pname="pname"></componenTtiles>
  
        </div>
      </div>

      <div class="centerXm">
        <div class="oneLeft">
          <div
            v-for="(item, index) in oneList"
            class="oneLeftItem"
            :key="index"
          >
            <div style="margin-left: 25px">
              <div style="width: 43px; height: 43px">
                <img
                  :src="require(`../../assets/twoImg/item1${index + 1}.png`)"
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
            <div style="margin-left: 8px; font-weight: bold">直接费分析</div>
          </div>
          <div class="centerTwoChan">
            <div>
              <!-- <span
                v-for="(item, index) in changList"
                @click="changeTwo(index)"
                :key="index"
                class="child"
                :class="[index == fxindex ? 'childCh' : '']"
                :style="{borderRight:(index==0?'none':'')}"

              >
                {{ item.title }}
              </span> -->
            </div>

            <div style="display:flex;align-items:center;">
              <div style="display:flex;align-items:center;">
                <div class="orange"></div>
              <div class="right" style="margin-right: 10px">直接成本预算费用</div>
              </div>
              <div style="display:flex;align-items:center;">
                <div class="orange" style="background: #3296fa"></div>
              <div class="right">直接费实际支出</div>
              </div>
            </div>

          </div>

          <div class="three">
            <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
            <div>
              <el-row>
                <el-col :span="3">
                  <div class="countLeft" style="border-right:1px solid #ebeef5">
                    <div class="child"><span>指标/类型</span></div>
                    <div class="child"><span>直接成本预算费用</span></div>
                    <div class="child"><span>直接费实际支出</span></div>
                    <div class="child"><span>差额</span></div>
                  </div>
                </el-col>
                <el-col :span="21"
                  >
                 
                  <div v-if="tableData.length==0" style="margin-left:500px;">
                       <img
                        src="@/assets/twoImg/bianji1.png"
                        alt=""
                        style="width: 156px; height: 125px"
                      />
                      <div>暂时还没有数据哦~快去添加</div>
                  </div>
                             <div style="overflow-x:auto;width:100%;white-space: nowrap;" v-else>
                        <div v-for="(item,index) in tableData" :key="index" class="countLeft" style="background-color:#F8F9FB;border-right:1px solid #ebeef5;display: inline-block;width:240px;">
                    <div class="child"> {{item.type || ''}}</div>
                    <div class="child">{{item.ys_money || 0}}</div>
                    <div class="child">{{item.sj_money || 0}}</div>
                    <div class="child">{{item.cha_money || 0}}</div>
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

              <div style="display:flex;align-items:center;">
              <div style="display:flex;align-items:center;">
                <div class="orange" style="background:#FDB223;"></div>
              <div class="right" style="margin-right: 10px">间接成本预算</div>
              </div>
              <div style="display:flex;align-items:center;">
                <div class="orange" style="background: #3296fa"></div>
              <div class="right">间接费实际支出</div>
              </div>
            </div>
          </div>

          <div class="three">
            <div
              id="myChartTwo"
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
                  <el-col :span="21"
                  >
                     <div v-if="tableData1.length==0" style="margin-left:500px;">
                       <img
                        src="@/assets/twoImg/bianji1.png"
                        alt=""
                        style="width: 156px; height: 125px"
                      />
                      <div>暂时还没有数据哦~快去添加</div>
                  </div>

                             <div style="overflow-x:auto;width:100%;white-space: nowrap;" v-else>
                        <div v-for="(item,index) in tableData1" :key="index" class="countLeft" style="background-color:#F8F9FB;border-right:1px solid #ebeef5;display: inline-block;width:240px;">
                    <div class="child"> {{item.type || ''}}</div>
                    <div class="child">{{item.ys_money || 0}}</div>
                    <div class="child">{{item.sj_money || 0}}</div>
                    <div class="child">{{item.cha_money || 0}}</div>
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
            <div style="margin-left: 8px; font-weight: bold">安全问题关联单位排名</div>
          </div>
          <div class="centerTwoChan">
            <div>
              <span
                v-for="(item, index) in changListThree"
                @click="changeTwo2(index)"
                :key="index"
                class="child"
                :class="[index == fxindex2 ? 'childCh' : '']"
              >
                {{ item.title }}
              </span>
            </div>
          </div>
          <el-table
            :data="tableDatas"
            border
            style="width: 100%"
            :header-cell-style="{ background: '#F8F9FB', color: '' }"
          >
            <el-table-column type="index" width="55" label="序号" />

            <el-table-column prop="unit" label="公司名称" >
            </el-table-column>
           
            <el-table-column prop="is_coop" label="有无其他合作项目">
                     <template  slot-scope="scope">
                       <div v-if="scope.row.is_coop=='有'" style="color:#3296FA" @click="showCt(scope.row)">有</div>
                       <div v-else>无</div>
                  </template>
            </el-table-column>
            <el-table-column prop="rectify_count" label="整改数量"> </el-table-column>
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

          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[5, 10, 100]"
              :page-size="pagesize"
              layout="sizes,prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div> -->
      </div>

              <!-- 穿透 -->
    <el-dialog :title="titleData" width="80%" :visible.sync="viewVisible">
      <pierceTable
        :tableList="tableList"
        :key="pierceTableid"
        :titleName="titleName"
        :taPLoading="taPLoading"
        :proName="proName"
      ></pierceTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewVisible = false">取 消</el-button>
        <el-button type="primary" @click="viewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>


  </div>
</template>
<script>
import componenTtiles from './componenTtiles.vue';
import pierceTable from '@/components/Piercethrough/pierceTable.vue';

export default {
  name: 'qualityAnalysis',
  components: { componenTtiles, pierceTable },
  data() {
    return {
      indexs: 1,
      fxindex: 0,
      fxindex1: 0,
      fxindex2: 0,
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
      tableData: [
        // {
        //   type: '木工', //类型
        //   rectify_notice_count: '1', //质量整改通知条数
        //   rectify_reply_count: '2', //质量整改回复条数
        // },
        // {
        //   type: '木工1', //类型
        //   rectify_notice_count: '2', //质量整改通知条数
        //   rectify_reply_count: '3', //质量整改回复条数
        // },
        // {
        //   type: '木工2', //类型
        //   rectify_notice_count: '3', //质量整改通知条数
        //   rectify_reply_count: '4', //质量整改回复条数
        // },
        // {
        //   type: '木工3', //类型
        //   rectify_notice_count: '4', //质量整改通知条数
        //   rectify_reply_count: '5', //质量整改回复条数
        // },
        // {
        //   type: '木工', //类型
        //   rectify_notice_count: '5', //质量整改通知条数
        //   rectify_reply_count: '6', //质量整改回复条数
        // },
        // {
        //   type: '木工1', //类型
        //   rectify_notice_count: '6', //质量整改通知条数
        //   rectify_reply_count: '7', //质量整改回复条数
        // },
        // {
        //   type: '木工2', //类型
        //   rectify_notice_count: '7', //质量整改通知条数
        //   rectify_reply_count: '8', //质量整改回复条数
        // },
        // {
        //   type: '木工3', //类型
        //   rectify_notice_count: '9', //质量整改通知条数
        //   rectify_reply_count: '10', //质量整改回复条数
        // },
        // {
        //   type: '木工', //类型
        //   rectify_notice_count: '10', //质量整改通知条数
        //   rectify_reply_count: '11', //质量整改回复条数
        // },
        // {
        //   type: '木工1', //类型
        //   rectify_notice_count: '11', //质量整改通知条数
        //   rectify_reply_count: '12', //质量整改回复条数
        // },
        // {
        //   type: '木工2', //类型
        //   rectify_notice_count: '12', //质量整改通知条数
        //   rectify_reply_count: '13', //质量整改回复条数
        // },
        // {
        //   type: '木工3', //类型
        //   rectify_notice_count: '12', //质量整改通知条数
        //   rectify_reply_count: '14', //质量整改回复条数
        // },
      ],
      tableData1: [
        // {
        //   type: '木工', //类型
        //   accident_count: '1', //质量整改通知条数
        //   accident_money: '2', //质量整改回复条数
        // },
        // {
        //   type: '木工1', //类型
        //   accident_count: '2', //质量整改通知条数
        //   accident_money: '3', //质量整改回复条数
        // },
        // {
        //   type: '木工2', //类型
        //   accident_count: '3', //质量整改通知条数
        //   accident_money: '4', //质量整改回复条数
        // },
        // {
        //   type: '木工3', //类型
        //   accident_count: '4', //质量整改通知条数
        //   accident_money: '5', //质量整改回复条数
        // },
        // {
        //   type: '木工', //类型
        //   accident_count: '5', //质量整改通知条数
        //   accident_money: '6', //质量整改回复条数
        // },
        // {
        //   type: '木工1', //类型
        //   accident_count: '6', //质量整改通知条数
        //   accident_money: '7', //质量整改回复条数
        // },
        // {
        //   type: '木工2', //类型
        //   accident_count: '7', //质量整改通知条数
        //   accident_money: '8', //质量整改回复条数
        // }
      ],
      tableDatas: [],
      oneList: [
        { title: '直接成本预算(元)', value: '' },
        { title: '直接费实际支出(元)', value: '' },
        { title: '间接成本预算(元)', value: '' },
        { title: '间接费实际支出(元)', value: '' },
      ],
      changList: [{ title: '质量整改图标分析' }, { title: '按负责人排名' }],
      changListTwo: [{ title: '事故图表分析' }, { title: '按负责人排名' }],
      changListThree: [{ title: '整改数量' }, { title: '按直接费实际支出' }],
    };
  },
  methods: {
    showCt(row) {
      this.getpierceList(row);
      this.viewVisible = true;
      // this.titleData = row.unit;
      this.proName = `${'项目名称:' + this.pname}`;
      // this.totalMoney = `${'收入合同总额:' + row.revenue_money}`;
    },
    //获取穿透dialog里所有数据
    getpierceList(row) {
      console.log(row);
      this.$axios
        .post('/newtao/projectKanWangUnit', {
          biao_shi: 'wang_unit',
          project_name: this.pname,
          supplier: row.unit,
        })
        .then(res => {
          let onenewArr = [
            'collection_money',
            'other_collection_money',
            'other_fk',
            'reimbursement',
          ];
          let twonewArr = [''];
          this.tableList = [
            res.data.lease,
            res.data.material_ht,
            res.data.material_order,
            res.data.service,
            res.data.sub,
          ];
        });
      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    //安全分析列表
    getDkb(e) {
      this.$axios
        .post('/bulletin/qualityUnitProblem', {
          project_id: this.pid,
          project_name: this.pname,
          page: this.currentPage,
          number: this.pagesize,
          type: e,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tableDatas = res.data.data;
            if (this.total > 0 && this.threeList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getDkb();
            }
          } else {
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //质量事故分析单位列表
    getDTList(row) {
      this.$axios
        .post('/bulletin/costIndirect', {
          project_id: this.pid,
          project_name: this.pname,
          // type: row,
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
    //上方信息
    getLInfo() {
      const _this = this;

      _this.$axios
        .post('/bulletin/costInfo', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.zhi_money;
            _this.oneList[2].value = res.data.data.jian_money;
            _this.oneList[1].value = res.data.data.zhi_sj_money;
            _this.oneList[3].value = res.data.data.jian_sj_money;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDkb();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getDkb();
    },
    changeTwo(e) {
      this.fxindex = e;
      this.wenti(e + 1);
    },
    changeTwo1(e) {
      this.fxindex1 = e;
      this.getDTList(e + 1);
    },
    changeTwo2(e) {
      this.fxindex2 = e;
      this.getDkb(e + 1);
    },
    data2() {
      let res = [];
      let len = 0;
      while (len < 10) {
        res.push(+(Math.random() * 500 + 5).toFixed(2));
        len++;
      }
      return res;
    },
    //直接费分析列表
    wenti(row) {
      this.$axios
        .post('/bulletin/costDirect', {
          project_id: this.pid,
          project_name: this.pname,
          // type: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
            console.log(res.data.data, '------');
            this.$nextTick(() => {
              this.drawLine();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData.forEach(e => {
        nameLit.push(e.type);
        countLit.push(e.ys_money);
        textLit.push(e.sj_money);
      });
      console.log(textLit, 'textLit');
      // countLit.push(12);
      // textLit.push(e.sj_money);
      let isShow1 = true;
      let n1 = 0;
      countLit.map((e, index) => {
        if (e > 10) {
          n1++;
        }
        if (n1 > 0) {
          isShow1 = true;
        } else {
          isShow1 = false;
        }
      });
      let isShow2 = true;
      let n2 = 0;
      textLit.map((e, index) => {
        if (e > 10) {
          n2++;
        }
        if (n2 > 0) {
          isShow2 = true;
        } else {
          isShow2 = false;
        }
      });
      let newObj1 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '10',
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
            max: isShow1 || isShow2 ? null : 10,
            // min: 0,
            // max: null,
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
        ],
        series: [
          {
            name: '直接成本预算费用',
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
            name: '直接费实际支出',
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
      if (this.tableData.length <= 8) {
        newObj1.dataZoom = '';
      } else {
        newObj1.dataZoom = newObj1.dataZoom;
      }
      // 绘制图表
      myChart.setOption(newObj1);

      //   myChartTwo.setOption({
      //     title: {
      //       //   text: '单位:万户',
      //       //   textStyle: {
      //       //     //---主标题内容样式
      //       //     color: '#fff',
      //       //     fontSize: 18,
      //       //   },
      //       //   left: '50',
      //       //   top: '20',
      //       //   subtext: '副标题', //---副标题内容样式
      //       //   subtextStyle: {
      //       //     color: '#bbb',
      //       //     fontSize: 14,
      //       //   },
      //       //   padding: [0, 0, 20, 0],
      //     },
      //     tooltip: {
      //       trigger: 'axis',
      //       axisPointer: {
      //         type: 'shadow',
      //       },
      //     },
      //     grid: {
      //       left: '3%',
      //       right: '4%',
      //       bottom: '3%',
      //       containLabel: true,
      //       show: false,
      //     },
      //     dataZoom: {
      //       show: true,
      //       realtime: true,
      //       y: 280,
      //       height: 20,
      //       start: 20,
      //       end: 100,
      //       zoomLock: true,
      //     },
      //     legend: {
      //       data: ['意向', '预购', '成交'],
      //     },
      //     xAxis: [
      //       {
      //         type: 'category',
      //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLine: {
      //           show: false,
      //         },
      //       },
      //     ],
      //     yAxis: [
      //       {
      //         name: '单位:条',
      //         type: 'value',
      //         min: 0,
      //         max: 500,
      //         //interval: 100,

      //         axisLine: {
      //           show: false,
      //         },
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLabel: {
      //           formatter: '{value}',
      //         },
      //         postition: 'left',
      //         offset: 25,
      //       },
      //       {
      //         name: '单位:元',
      //         // nameLocation: 'start',
      //         alignTicks: true,
      //         type: 'value',
      //         // inverse: true,
      //         min: 0,
      //         max: 500,
      //         //interval: 100,
      //         axisLine: {
      //           show: false,
      //         },
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLabel: {
      //           formatter: '{value}',
      //         },
      //         offset: 25,
      //       },
      //     ],
      //     series: [
      //       {
      //         name: '销量555',
      //         type: 'bar',
      //         barWidth: '50',
      //         barCategoryGap: '20%',

      //         data: [10, 52, 200, 334, 390, 330, 220],
      //         itemStyle: {
      //           color: '#FDB223',
      //           barBorderRadius: [5, 5, 0, 0],
      //         },
      //       },
      //       {
      //         name: 'Dynamic Line',
      //         type: 'line',
      //         data: this.data2(),
      //         smooth: true,
      //         itemStyle: {
      //           color: '#3296FA',
      //           barBorderRadius: [18, 18, 8, 8],
      //         },
      //         symbolSize: 7,
      //         colorBy: 'series',
      //       },
      //     ],
      //   });
    },
    resCharts() {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo'),
      );
      myChart.resize();
      myChartTwo.resize();
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
        nameLit.push(e.type);
        countLit.push(e.ys_money);
        textLit.push(e.sj_money);
        console.log(e.sj_money, 'myChartTwomyChartTwo');
      });
      // textLit.push(14);
      console.log(countLit, textLit, '222');
      let isShow1 = true;
      let n1 = 0;
      countLit.map((e, index) => {
        if (e > 10) {
          n1++;
        }
        if (n1 > 0) {
          isShow1 = true;
        } else {
          isShow1 = false;
        }
      });
      let isShow2 = true;
      let n2 = 0;
      textLit.map((e, index) => {
        if (e > 10) {
          n2++;
        }
        if (n2 > 0) {
          isShow2 = true;
        } else {
          isShow2 = false;
        }
      });
      console.log(isShow2, '333');
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
            // min: 0,
            // max: 500,
            //interval: 100,
            max: isShow1 || isShow2 ? null : 10,
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
          //   {
          //     name: '单位:元',
          //     // nameLocation: 'start',
          //     alignTicks: false,
          //     type: 'value',
          //     // inverse: true,
          //     min: 0,
          //     max: 500,
          //     //interval: 100,
          //     axisLine: {
          //       show: false,
          //       lineStyle: {
          //         //lineStyle里面写y轴那一条线的样式
          //         // color: '#BBB',
          //         // width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
          //       },
          //     },
          //     axisTick: {
          //       show: false,
          //     },

          //     axisLabel: {
          //       formatter: '{value}',
          //     },
          //     offset: 25,
          //   },
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
      };
      if (this.tableData1.length <= 8) {
        newObj2.dataZoom = '';
      } else {
        newObj2.dataZoom = newObj2.dataZoom;
      }
      myChartTwo.setOption(newObj2);
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getLInfo();
    this.getDkb('1');
    this.wenti('1');
    this.getDTList('1');
    window.addEventListener('resize', () => {
      this.resCharts();
    });
  },
};
</script>
<style scoped lang='scss'>
#qualityAnalysis {
  background: url('../../assets/twoImg/bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 80px;
}
.page {
  text-align: center;
  margin-top: 11px;
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
      width: 24%;
      background-color: white;
      border-radius: 10px;
      align-items: center;
      padding: 15px 0;
      margin-top: 10px;
      font-size: 16px;
      margin-left: 0;
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
        background: #fdb223;
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
</style>