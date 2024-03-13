<template>
  <div id="appPanel" style="padding: 20px">
    <!-- 项目看板 -->
    <div class="main">
      <div class="panelHeader">
        <div class="headerTop">
          <div>
            <h2 style="color: #fff; margin-bottom: 0">项目名称：{{ pname }}</h2>
            <div class="liu-tag">
              {{ projectInfo.project_status }}
            </div>
          </div>
          <div>
            <el-button type="primary" plain size="medium" @click="backClick"
              >返回</el-button
            >
          </div>
        </div>
        <div class="headerBottom">
          <div>
            项目负责人：<span>{{ projectInfo.stalker }}</span>
          </div>
          <div>
            工程造价（元）：<span
              ><count-up :value="projectInfo.make_cost"
            /></span>
          </div>
          <div>
            计划开始时间：<span>{{ projectInfo.plan_start_riqi }}</span>
          </div>
          <div>
            计划结束时间：<span>{{ projectInfo.plan_end_riqi }}</span>
          </div>
        </div>
        <div class="headerFooter">
          <div>项目进度：</div>
          <div style="width: 90%; padding-top: 3px">
            <el-progress
              :percentage="projectInfo.jindu > 100 ? 100 : projectInfo.jindu"
              :stroke-width="16"
              :color="[{ color: '#FFE191' }]"
              text-inside
            ></el-progress>
          </div>
          <div style="margin-left: 5px; color: #ffe191">
            <count-up
              :value="projectInfo.jindu > 100 ? 100 : projectInfo.jindu"
            />%
          </div>
        </div>
      </div>
      <div class="headerBtn-mainContent">
        <div class="headerBtn" style="position: relative">
          <div
            v-for="(item, index) in btnList"
            :class="activeTop == index ? 'blue' : ''"
            @click="btnClick(index)"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="mainContent">
          <div v-if="activeTop === 0">
            <div class="mainList">
              <div class="maindiv">
                <div class="mainHeader">
                  <!-- <span></span> -->
                  <h3>质量检查</h3>
                </div>
                <div v-if="activeTop === 0" id="quality"></div>
              </div>
              <img
                class="slpic"
                v-if="qualityData.length == 0"
                src="@/assets/images/shilishuju.png"
                alt=""
                style="position:absolute;top:0;right:0;"
              />
            </div>
            <div class="mainList">
              <div class="maindiv">
                <div class="mainHeader">
                  <!-- <span></span> -->
                  <h3>质量事故</h3>
                </div>
                <div v-if="activeTop === 0" id="qualityType"></div>
              </div>
              <img
                class="slpic"
                v-if="qualityTypeData.length == 0"
                src="@/assets/images/shilishuju.png"
                alt=""
                style="position:absolute;top:0;right:0;"

              />
            </div>
            <div class="mainList">
              <div class="maindiv">
                <div class="mainHeader">
                  <!-- <span></span> -->
                  <h3>安全检查</h3>
                </div>
                <div v-if="activeTop === 0" id="safe"></div>
              </div>
              <img
                class="slpic"
                v-if="safeData.length == 0"
                src="@/assets/images/shilishuju.png"
                alt=""
                style="position:absolute;top:0;right:0;"

              />
            </div>
            <div class="mainList">
              <div class="maindiv">
                <div class="mainHeader">
                  <!-- <span></span> -->
                  <h3>安全事故</h3>
                </div>
                <div v-if="activeTop === 0" id="safeType"></div>
              </div>
              <img
                class="slpic"
                v-if="safeTypeData.length == 0"
                src="@/assets/images/shilishuju.png"
                alt=""
                style="position:absolute;top:0;right:0;"

              />
            </div>
            <div
              class="mainList mainAll"
              style="width: 100% ; height: 350px"
            >
              <div
                class="maindiv"
                style="width: 100% ; height: 280px"
              >
                <div class="mainHeader">
                  <!-- <span></span> -->
                  <h3 style="margin-top:10px;">工程日志</h3>
                </div>
                <div
                  v-if="diaryData.names.length > 0"
                  class="diaryDiv"
                  style="width: 100%; height: 280px"
                >
                  <!-- <div
                                      v-for="(item, index) in diaryData"
                                      :key="index"
                                      class="diaryDList"
                                  >
                                      <div>
                                          <span
                                              ><span
                                                  style="visibility: hidden"
                                                  v-if="item.type.length == 2"
                                                  >日志</span
                                              >{{ item.type }}：</span
                                          ><span>{{ item.anquan_number }}</span
                                          >篇
                                      </div>
                                      <div>
                                          <el-progress
                                              :percentage="item.anquan_gqb"
                                              :stroke-width="16"
                                              :color="customColors"
                                          ></el-progress>
                                      </div>
                                  </div> -->
                  <echart-project-log
                    :names="diaryData.names"
                    :values="diaryData.values"

                  ></echart-project-log>
                </div>
                <div class="noimg" v-else>
                  <img src="../../assets/project/noData.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="activeTop === 1">
            <div class="jinKanList">
              <!-- <h3>收入分析</h3> -->
              <div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>收入构成</h3>
                    </div>
                    <div
                      v-if="activeTop === 1"
                      id="shouru"
                      ref="shouruRef"
                    ></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="shouruData.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>收入工程款状况</h3>
                    </div>
                    <div id="srgqian"></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="shouruTypeData.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
                <div class="mainJinList">
                  <div class="maindiv" v-if="!newView">
                    <div class="mainHeader">
                      <h3>产值修正</h3>
                      <i class="el-icon-plus" @click="goXm(2)"></i>
                    </div>

                    <el-row class="lirunm">
                      <el-row>
                            <el-tooltip class="item" effect="dark" content="实际完成产值" placement="top-start">
                        <el-col :span="8">实际完成产值 </el-col>
                           </el-tooltip>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="htgData.chanzhi_xiuz"
                            placement="top"
                          >
                            <span>{{ htgData.chanzhi_xiuz }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                            <el-tooltip class="item" effect="dark" content="已结算产值" placement="top-start">
                        <el-col :span="8">已结算产值 </el-col>
                           </el-tooltip>

                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="htgData.yi_js_chanzhi"
                            placement="top"
                          >
                            <span>{{ htgData.yi_js_chanzhi }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row style="background: #f1f8ff">
                            <el-tooltip class="item" effect="dark" content="实际应付" placement="top-start">
                        <el-col :span="8">实际应付 </el-col>
                           </el-tooltip>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="htgData.cha_chanzhi"
                            placement="top"
                          >
                            <span>{{ htgData.cha_chanzhi }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                    <div style="font-size: 10px; text-align: left">
                      备注:对实际完成产值进行记录,与甲方是否结算无关。
                    </div>
                  </div>
                  <div class="maindiv" v-else>
                    <div class="mainHeader">
                      <h3>产值修正</h3>
                      <i style="color: #fff" class="el-icon-plus"></i>
                    </div>

                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="8">打桩总数量 </el-col>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="newhtgData.piling_number"
                            placement="top"
                          >
                            <span>{{ newhtgData.piling_number }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">合计总价格 </el-col>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="newhtgData.total"
                            placement="top"
                          >
                            <span>{{ newhtgData.total }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row style="background: #f1f8ff">
                        <el-col :span="8">总米数 </el-col>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="newhtgData.rock_length"
                            placement="top"
                          >
                            <span>{{ newhtgData.rock_length }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                    <div style="font-size: 10px; text-align: left">
                      备注:对实际完成产值进行记录,与甲方是否结算无关。
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="jinKanList">
              <!-- <h3>支出分析</h3> -->
              <div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>支出构成</h3>
                    </div>
                    <div
                      v-if="activeTop === 1"
                      id="zhichu"
                      ref="zhichuRef"
                    ></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="zhichuData.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>支出工程款状况</h3>
                    </div>
                    <div id="gcqian"></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="zhichuTypeData.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>产值修正</h3>
                      <i class="el-icon-plus" @click="goXm(1)"></i>
                    </div>
                    <!-- <div id="zccgai"></div> -->
                    <el-row class="lirunm">
                      <el-row>
                            <el-tooltip class="item" effect="dark" content="待结算金额" placement="top-start">
                        <el-col :span="8">待结算金额 </el-col>
                          </el-tooltip>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="xmgData.dai_js"
                            placement="top"
                          >
                            <span>{{ xmgData.dai_js }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                            <el-tooltip class="item" effect="dark" content="实际应付金额" placement="top-start">
                        <el-col :span="8">实际应付金额 </el-col>
                          </el-tooltip>
                        
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="xmgData.shiji_pay"
                            placement="top"
                          >
                            <span>{{ xmgData.shiji_pay }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                  </div>
                  <!-- <img
                                      class="slpic"
                                      v-if="zhichuP.length == 0"
                                      src="@/assets/images/shilishuju.png"
                                      alt=""
                                  /> -->
                </div>
              </div>
            </div>
            <div class="jinKanList">
              <!-- <h3>发票分析</h3> -->
              <el-row class="mainJinList" style="width: 100%">
                <div class="maindiv" style="width: 100%">
                  <div class="mainHeader">
                    <!-- <span></span> -->
                    <h3>发票分析</h3>
                  </div>
                  <div class="Fapiao" style="margin-top: 0px">
                    <div>
                      <div>
                        <p>销项发票（元）</p>
                        <p>
                          {{ fpData.invoice_money_out }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>销项税额（元）</p>
                        <p>
                          {{ fpData.tax_amount_out }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>进项发票（元）</p>
                        <p>
                          {{ fpData.invoice_money_in }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p>进项税额（元）</p>
                        <p>
                          {{ fpData.tax_amount_in }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </el-row>
            </div>
            <div class="jinKanList">
              <!-- <h3>利润分析</h3> -->
              <div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>收支差 <b>（万元）</b></h3>
                    </div>
                    <div v-if="activeTop === 1" id="szcha"></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="szcType.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>结算差 <b>（万元）</b></h3>
                    </div>
                    <div id="jscha"></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="jscType.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
                <div class="mainJinList">
                  <div class="maindiv">
                    <div class="mainHeader">
                      <!-- <span></span> -->
                      <h3>现金流差 <b>（万元）</b></h3>
                    </div>
                    <div id="xjlcha"></div>
                  </div>
                  <img
                    class="slpic"
                    v-if="xjlType.length == 0"
                    src="@/assets/images/shilishuju.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <el-collapse
              style="width: 100%"
              v-model="activeNames"
              accordion
              @change="handleclick"
            >
              <el-collapse-item
                v-for="(item, index) in InterfaceList"
                :title="item.title"
                :name="index"
                :key="index"
              >
                <commonTable
                  :tpList="tpList"
                  :titleList="titleList"
                  :footerNumList="footerNumList"
                  :isFooter="isFooter"
                  @listenChild="getMult"
                ></commonTable>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-sizes="[10, 50, 100]"
                  :page-size="pagesize"
                  layout="sizes,prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="产值修正"
      :visible.sync="dialogFormVisible"
      width="600px"
      @close="editCancel('AddForm')"
    >
      <el-form
        @submit.native.prevent
        :model="addForm"
        label-position="right"
        :rules="aufRules"
        ref="AddForm"
        label-width="150px"
      >
        <el-form-item label="项目名称：">
          <div>{{ pname }}</div>
        </el-form-item>
        <el-form-item label="修正金额（元）：" prop="money">
          <el-input-number
            v-model="addForm.money"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注：" prop="remarks">
          <el-input
            v-model="addForm.remarks"
            type="textarea"
            placeholder="请输入内容"
            maxlength="240"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel('AddForm')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="addClick('AddForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { nextTick } from 'vuedraggable';
// import echarts from 'echarts';
const echarts = require('echarts');
import commonTable from '@/components/commonTable.vue';
import CountUp from '@/components/CountUp';
import EchartProjectLog from './components/echartProjectLog';

export default {
  name: 'appPanel',
  components: { commonTable, CountUp, EchartProjectLog },
  data() {
    return {
      newView: false,
      intername: '',
      pagesize: 10,
      currentPage: 1,
      total: 0,
      myArray: [],
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],

      activeNames: ['0'],
      newhtgData: { piling_number: 0, total: 0, rock_length: 0 },
      InterfaceList: [
        {
          title: '直接成本预算',
          showFiled: 'direct_cost_budget',
          Interdata: '/project/directCostBudgetList',
        },
        {
          title: '间接成本预算',
          showFiled: 'indirect_cost_budget',
          Interdata: '/project/indirectCostBudgetList',
        },
      ],
      dialogFormVisible: false,
      pid: '',
      pname: '',
      projectInfo: {
        project_status: '',
        stalker: '',
        make_cost: '',
        plan_start_riqi: '',
        plan_end_riqi: '',
        jindu: 0,
      },
      // btnList: [{ name: '施工看板' }],
      btnList: [
        { name: '施工看板' },
        { name: '经营看板' },
        // { name: '列表看板' }
      ],
      activeTop: 0,
      safeTypeData: ['1'],
      safeData: ['1'],
      qualityData: ['1'],
      qualityTypeData: ['1'],
      diaryData: {
        names: [],
        values: [],
      },
      shouruData: ['1'],
      shouruTypeData: ['1'],
      shouruP: ['1'],
      zhichuData: ['1'],
      zhichuTypeData: ['1'],
      zhichuP: ['1'],
      szcType: ['1'],
      jscType: ['1'],
      xjlType: ['1'],
      customColors: [
        { color: '#F16D6D', percentage: 20 },
        { color: '#E8A54C', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
      gcMoney: {
        settlement: '',
        payment_lj: '',
        no_pay_money: '',
      },
      lrData: {
        shou_money: '',
        expenditure: '',
        li_run: '',
        income_money: '',
        settlement: '',
        js_cha: '',
        collection_money: '',
        zc_lj: '',
        liu_cha: '',
      },
      xmgData: {
        dai_js: '',
        shiji_pay: '',
      },
      htgData: {
        chanzhi_xiuz: '',
        yi_js_chanzhi: '',
        cha_chanzhi: '',
      },
      fpData: {
        invoice_money_out: '',
        tax_amount_out: '',
        invoice_money_in: '',
        tax_amount_in: '',
      },
      aufRules: {
        money: [
          {
            required: true,
            message: '请输入金额',
            trigger: ['blur', 'change'],
          },
        ],
      },
      addForm: {
        project_name: '',
        money: '',
        remarks: '',
      },
      openType: 1,
      loading: false,
    };
  },
  methods: {
    handleclick(item) {
      console.log(item);
      const InterfaceList = this.InterfaceList;
      this.getTitleList(
        InterfaceList[item].showFiled,
        InterfaceList[item].Interdata,
      );
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList(this.intername);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(this.intername);
    },
    // 表格表头
    getTitleList(name, inter) {
      this.intername = inter;
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.myArray = res.data.data;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach(element => {
              if (element.check) {
                this.titleList.push(element);
                this.checkedLists.push(element.value);
              }
            });
            this.getList(inter);
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
    //获取列表
    getList(inter) {
      this.$axios
        .post(inter, {
          project_name: this.pname,
          page: this.currentPage,
          number: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
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
              this.currentPage = res.data.page_number;
              this.getList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    addClick(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addForm));
          if (_this.openType == 1) {
            _this.$axios
              .post('/projectfour/payOutputCorrect', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getZCpie();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.$axios
              .post('/projectfour/incomeOutputCorrect', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getSRpie();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          }
        } else {
          _this.loading = false;
        }
      });
    },
    getFa() {
      const _this = this;
      _this.$axios
        .post('/projectfour/invoiceAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.fpData = res.data.data;
          } else {
            _this.$notify({
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
    goXm(type) {
      const _this = this;
      _this.openType = type;
      _this.addForm.project_name = _this.pname;
      _this.dialogFormVisible = true;
    },
    backClick() {
      this.$router.go(-1);
    },
    btnClick(index) {
      this.activeTop = index;
      if (index === 0) {
        this.$nextTick(() => {
          let quality = echarts.init(document.getElementById('quality')),
            qualityType = echarts.init(document.getElementById('qualityType')),
            safe = echarts.init(document.getElementById('safe')),
            safeType = echarts.init(document.getElementById('safeType'));

          quality.clear();
          qualityType.clear();
          safe.clear();
          safeType.clear();
          this.getZpie();
        });
      } else {
        // document
        //     .getElementsByClassName('lirunm')
        //     .removeAttr('_echarts_instance_');
        this.getJpie();
      }
    },
    getJpie() {
      this.getSRpie();
      this.getZCpie();
      this.getLRpie();
      this.getFa();
    },
    getLRpie() {
      this.$axios
        .post('/projectfour/profitAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lrData = res.data.data;
            let newData = JSON.parse(JSON.stringify(res.data.data));
            // let newA = [
            //     {
            //         name: '收入总金额',
            //         value: newData.shou_money
            //     },
            //     {
            //         name: '支出总金额',
            //         value: newData.expenditure
            //     },
            //     { name: '利润', value: newData.li_run }
            // ];
            let newA = [
              newData.shou_money / 10000,
              newData.expenditure / 10000,
              newData.li_run / 10000,
            ];
            // let newB = [
            //     {
            //         name: '累计收入结算',
            //         value: newData.income_money
            //     },
            //     {
            //         name: '累计支出结算',
            //         value: newData.settlement
            //     },
            //     { name: '结算差', value: newData.js_cha }
            // ];
            let newB = [
              newData.income_money / 10000,
              newData.settlement / 10000,
              newData.js_cha / 10000,
            ];
            let newC = [
              newData.collection_money / 10000,
              newData.zc_lj / 10000,
              newData.liu_cha / 10000,
            ];
            if (
              newData.shou_money == 0 &&
              newData.expenditure == 0 &&
              newData.li_run == 0
            ) {
              this.szcType = [];
              // newA[0].value = 1;
              // newA[1].value = 1;
              // newA[2].value = 1;
              newA = [1, 1, 1];
            } else {
              this.szcType = ['1'];
            }
            if (
              newData.income_money == 0 &&
              newData.settlement == 0 &&
              newData.js_cha == 0
            ) {
              this.jscType = [];
              // newB[0].value = 1;
              // newB[1].value = 1;
              // newB[2].value = 1;
              newB = [1, 1, 1];
            } else {
              this.jscType = ['1'];
            }
            if (
              newData.collection_money == 0 &&
              newData.zc_lj == 0 &&
              newData.liu_cha == 0
            ) {
              this.xjlType = [];
              newC = [1, 1, 1];
            } else {
              this.xjlType = ['1'];
            }
            // this.doSRpie(newA, 5);
            // this.doSRpie(newB, 6);
            this.doSelfPie(newC, 3);
            this.doSelfPie(newA, 4);
            this.doSelfPie(newB, 5);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doSelfPie(arr, type) {
      let dataAxis = [];
      if (type == 1) {
        dataAxis = ['结算产值', '累计支付', '未支付'];
      } else if (type == 2) {
        dataAxis = ['结算产值', '累计回款', '甲方欠款'];
      } else if (type == 3) {
        // dataAxis = ['实际完成产值', '已结算产值', '实际应付'];
        dataAxis = ['累计回款金额', '累计支出金额', '现金流差'];
      } else if (type == 4) {
        dataAxis = ['收入总金额', '支出总金额', '利润'];
      } else if (type == 5) {
        dataAxis = ['累计收入结算', '累计支出结算', '结算差'];
      }
      let bption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: 'category',
          data: dataAxis,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            inside: false,
            // textStyle: {
            //     color: '#999'
            // },
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#999',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#999',
            },
          },
          splitLine: {
            //分割线配置
            show: true,
            lineStyle: {
              color: '#F9F9F9',
            },
          },
        },
        series: [
          {
            data: [
              {
                value: arr[0],
                itemStyle: {
                  color: '#83bff6',
                },
              },
              {
                value: arr[1],
                itemStyle: {
                  color: '#FFB81E',
                },
              },
              {
                value: arr[2],
                itemStyle: {
                  color: '#FF6A5B',
                },
              },
            ],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#E6F3FF',
            },
            barWidth: 24,
            itemStyle: {
              textStyle: {
                fontSize: 12,
              },
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2378f7',
                  },
                  {
                    offset: 0.7,
                    color: '#2378f7',
                  },
                  {
                    offset: 1,
                    color: '#83bff6',
                  },
                ]),
              },
            },
          },
        ],
      };
      this.$nextTick(() => {
        if (type == 1) {
          let gcqian = echarts.init(document.getElementById('gcqian'));
          gcqian.clear();
          gcqian.setOption(bption);
        } else if (type == 2) {
          let srgqian = echarts.init(document.getElementById('srgqian'));
          srgqian.clear();
          srgqian.setOption(bption);
        } else if (type == 3) {
          let xjlcha = echarts.init(document.getElementById('xjlcha'));
          xjlcha.clear();
          xjlcha.setOption(bption);
        } else if (type == 4) {
          let szcha = echarts.init(document.getElementById('szcha'));
          szcha.clear();
          szcha.setOption(bption);
        } else if (type == 5) {
          let jscha = echarts.init(document.getElementById('jscha'));
          jscha.clear();
          jscha.setOption(bption);
        }
      });
    },
    getZCpie() {
      this.$axios
        .post('/projectfour/expenditureAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newData = JSON.parse(JSON.stringify(res.data.data));
            this.xmgData.dai_js = newData.dai_js;
            this.xmgData.shiji_pay = newData.shiji_pay;
            let newD = [newData.dai_js, newData.shiji_pay];
            let newC = [
              newData.settlement,
              newData.payment_lj,
              newData.no_pay_money,
            ];
            let newChar = [
              { value: newData.service, name: '劳务' },
              { value: newData.material, name: '材料' },
              { value: newData.sub, name: '分包' },
              { value: newData.lease, name: '租赁' },

              { value: newData.reimbursement, name: '间接费' },
              { value: newData.other, name: '其他' },
            ];
            if (
              newData.service == 0 &&
              newData.material == 0 &&
              newData.sub == 0 &&
              newData.lease == 0 &&
              newData.reimbursement == 0 &&
              newData.other == 0
            ) {
              this.zhichuData = [];
              newChar[0].value = 1;
              newChar[1].value = 1;
              newChar[2].value = 1;
              newChar[3].value = 1;
              newChar[4].value = 1;
              newChar[5].value = 1;
            } else {
              this.zhichuData = ['1'];
            }
            if (
              newData.settlement == 0 &&
              newData.payment_lj == 0 &&
              newData.no_pay_money == 0
            ) {
              this.zhichuTypeData = [];
              newC[0] = 1;
              newC[1] = 1;
              newC[2] = 1;
            } else {
              this.zhichuTypeData = ['1'];
            }
            if (newData.dai_js == 0 && newData.shiji_pay == 0) {
              this.zhichuP = [];
              newD = [1, 1];
            } else {
              this.zhichuP = ['1'];
            }
            this.doSRpie(newChar, 3);
            this.doSelfPie(newC, 1);
            this.doZCpie(newD, 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doZCpie(arr, type) {
      let dataAxis = [];
      if (type == 1) {
        dataAxis = ['待结算金额', '实际应付金额'];
      } else if (type == 2 || type == 3) {
        dataAxis = ['实际完成产值', '已结算产值', '实际应付'];
      } else if (type == 4) {
        dataAxis = ['收入总金额', '支出总金额', '利润'];
      } else if (type == 5) {
        dataAxis = ['累计收入结算', '累计支出结算', '结算差'];
      }
      let bption = {
        // title: { text: newT, left: 'center' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#999',
              fontSize: 14,
            },
            interval: 0,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              textStyle: {
                fontSize: 12,
              },
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#83bff6',
                  },
                  {
                    offset: 0.5,
                    color: '#188df0',
                  },
                  {
                    offset: 1,
                    color: '#188df0',
                  },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2378f7',
                  },
                  {
                    offset: 0.7,
                    color: '#2378f7',
                  },
                  {
                    offset: 1,
                    color: '#83bff6',
                  },
                ]),
              },
            },
            data: arr,
          },
        ],
      };
      this.$nextTick(() => {
        // if (type == 1) {
        //     let zccgai = echarts.init(
        //         document.getElementById('zccgai')
        //     );
        //     zccgai.clear();
        //     zccgai.setOption(bption);
        // } else if (type == 2) {
        //     let srcgai = echarts.init(
        //         document.getElementById('srcgai')
        //     );
        //     srcgai.clear();
        //     srcgai.setOption(bption);
        // } else
        if (type == 3) {
          let xjlcha = echarts.init(document.getElementById('xjlcha'));
          xjlcha.clear();
          xjlcha.setOption(bption);
        } else if (type == 4) {
          let szcha = echarts.init(document.getElementById('szcha'));
          szcha.clear();
          szcha.setOption(bption);
        } else if (type == 5) {
          let jscha = echarts.init(document.getElementById('jscha'));
          jscha.clear();
          jscha.setOption(bption);
        }
      });
    },
    //收入分析
    getSRpie() {
      this.$axios
        .post('/projectfour/incomeAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newData = JSON.parse(JSON.stringify(res.data.data));
            this.htgData.chanzhi_xiuz = newData.chanzhi_xiuz;
            this.htgData.yi_js_chanzhi = newData.yi_js_chanzhi;
            this.htgData.cha_chanzhi = newData.cha_chanzhi;
            let newC = [
              newData.income_money,
              newData.shou_kuan,
              newData.party_a_qian,
            ];
            if (
              newData.income_money == 0 &&
              newData.shou_kuan == 0 &&
              newData.party_a_qian == 0
            ) {
              this.shouruTypeData = [];
              newC[0] = 1;
              newC[1] = 1;
              newC[2] = 1;
            } else {
              this.shouruTypeData = ['1'];
            }
            let newChar = [
              {
                name: '合同收入',
                value: newData.shou_money,
              },
              {
                name: '签证变更',
                value: newData.qian_money,
              },
            ];
            if (newData.shou_money == 0 && newData.qian_money == 0) {
              this.shouruData = [];
              newChar[0].value = 1;
              newChar[1].value = 1;
            } else {
              this.shouruData = ['1'];
            }
            let newD = [
              newData.chanzhi_xiuz,
              newData.yi_js_chanzhi,
              newData.cha_chanzhi,
            ];
            if (
              newData.chanzhi_xiuz == 0 &&
              newData.yi_js_chanzhi == 0 &&
              newData.cha_chanzhi == 0
            ) {
              this.shouruP = [];
              newD = [1, 1, 1];
            } else {
              this.shouruP = ['1'];
            }
            this.doSRpie(newChar, 1);
            this.doSelfPie(newC, 2);
            this.doZCpie(newD, 2);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doSRpie(arr, type) {
      let newName = '';
      if (type == 1) {
        newName = '收入构成';
      } else if (type == 2) {
        newName = '收入工程款';
      } else if (type == 3) {
        newName = '支出构成';
      } else if (type == 4) {
        newName = '支出工程款';
      } else if (type == 5) {
        newName = '收支差';
      } else if (type == 6) {
        newName = '结算差';
      }
      let bption = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return (
              params.seriesName +
              '<br/>' +
              params.name +
              ' : ' +
              params.value +
              ' (' +
              params.percent +
              '%)'
            );
          },
        },
        legend: {
          type: 'scroll',
          bottom: '-5',
          textStyle: {
            color: ['red', '#fff'],
          },
          icon: 'circle',
          itemGap: 40,
        },
        series: [
          {
            name: newName,
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            minAngle: 5,
            label: {
              show: false,
              position: 'center',
              formatter: '{b}\n{d}%',
              fontSize: '18',
            },
            labelLine: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold',
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    '#FFA200',
                    '#0089FF',
                    '#00D0AF',
                    '#FF3A3A',
                    '#F77400',
                    '#0CCB5D',
                  ];
                  return colorList[params.dataIndex];
                },
                // label: {
                //     show: true,
                //     formatter: ' {b} \n {d}% '
                // }
              },
            },
            // radius: '50%',
            data: arr,
          },
        ],
      };

      this.$nextTick(() => {
        if (type == 1) {
          let shouru = echarts.init(document.getElementById('shouru'));
          shouru.clear();
          shouru.setOption(bption);
        } else if (type == 2) {
          let srgqian = echarts.init(document.getElementById('srgqian'));
          srgqian.clear();
          srgqian.setOption(bption);
        } else if (type == 3) {
          let zhichu = echarts.init(document.getElementById('zhichu'));
          zhichu.clear();
          zhichu.setOption(bption);
        } else if (type == 4) {
          let gcqian = echarts.init(document.getElementById('gcqian'));
          gcqian.clear();
          gcqian.setOption(bption);
        } else if (type == 5) {
          let szcha = echarts.init(document.getElementById('szcha'));
          szcha.clear();
          szcha.setOption(bption);
        } else if (type == 6) {
          let jscha = echarts.init(document.getElementById('jscha'));
          jscha.clear();
          jscha.setOption(bption);
        }
      });
    },
    //项目详情
    getInfo() {
      this.$axios
        .post('/project/projectInfoRegisterDetail', {
          id: this.pid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.projectInfo = JSON.parse(JSON.stringify(res.data.data));
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getPie(arr, type) {
      let newT = '';
      if (type == 1) {
        newT = '质量检查';
      } else {
        newT = '安全检查';
      }

      let dataAxis = ['检查总数', '整改总数', '待整总数'];
      let cdata = [arr[0].value, arr[1].value, arr[2].value];
      let bption = {
        // title: { text: newT, left: 'center' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#999',
              fontSize: 14,
            },
            interval: 0,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
          splitLine: {
            //分割线配置
            show: true,
            lineStyle: {
              color: '#F9F9F9',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'line',
            barWidth: 30,
            areaStyle: {
              color: '#E6F3FF',
            },
            smooth: true,
            itemStyle: {
              textStyle: {
                fontSize: 12,
              },
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#83bff6',
                  },
                  {
                    offset: 0.5,
                    color: '#188df0',
                  },
                  {
                    offset: 1,
                    color: '#188df0',
                  },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2378f7',
                  },
                  {
                    offset: 0.7,
                    color: '#2378f7',
                  },
                  {
                    offset: 1,
                    color: '#83bff6',
                  },
                ]),
              },
            },
            data: cdata,
          },
        ],
      };
      this.$nextTick(() => {
        if (type == 1) {
          let quality = echarts.init(document.getElementById('quality'));
          quality.clear();
          quality.setOption(bption);
        } else if (type == 2) {
          let safe = echarts.init(document.getElementById('safe'));
          safe.clear();

          safe.setOption(bption);
        }
      });
    },
    doPie(arr, type) {
      let newT = '';
      if (type == 1) {
        newT = '质量事故';
      } else {
        newT = '安全事故';
      }
      let bption = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return (
              params.seriesName +
              '<br/>' +
              params.name +
              ' : ' +
              params.value +
              ' (' +
              params.percent +
              '%)' +
              '<br/>' +
              '总金额：' +
              params.data.money
            );
          },
        },
        // graphic: {
        //     elements: [
        //         {
        //             type: 'image',
        //             style: {
        //                 image: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/kf3pfsPkiA1619084333464.png',
        //                 width: 38,
        //                 height: 42
        //             },
        //             left: 'center',
        //             top: 'center'
        //         }
        //     ]
        // },
        legend: {
          bottom: '-5',
          textStyle: {
            color: ['red', '#fff'],
          },
          icon: 'circle',
          itemGap: 40,
        },
        series: [
          {
            name: newT,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              formatter: '{b}\n{d}%',
              fontSize: '18',
            },
            labelLine: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                // fontSize: '18',
                // fontWeight: 'bold'
              },
            },
            itemStyle: {
              normal: {
                // label: {
                //     show: true,
                //     formatter: ' {b} :  {c} '
                // },
                color: function (params) {
                  //自定义颜色
                  var colorList = ['#09A1FF', '#7788F9', '#FFB614'];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: arr,
          },
        ],
      };
      this.$nextTick(() => {
        if (type == 1) {
          let qualityType = echarts.init(
            document.getElementById('qualityType'),
          );
          qualityType.clear();
          qualityType.setOption(bption);
        } else {
          let safeType = echarts.init(document.getElementById('safeType'));
          safeType.clear();
          safeType.setOption(bption);
        }
      });
    },
    //日志
    getPer() {
      this.$axios
        .post('/task/qualityaccident', {
          corp_id: this.$store.state.cid,
          project_name: this.pname,
          id: this.pid,
        })
        .then(res => {
          if (res.data.code == 1) {
            res.data.content.map(item => {
              this.diaryData.names.push(item.type);
            });
            res.data.content.map((item, index) => {
              //   if (index == 4) {
              //     this.diaryData.values.push(item.jllog_number);
              //   } else if (index == 5) {
              //     this.diaryData.values.push(item.tylog_number);
              //   } else {
              this.diaryData.values.push(item.anquan_number);
              //   }
            });
            console.log(this.diaryData);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //质量检查
    getZLC() {
      this.$axios
        .post('/task/qualitytesting', {
          corp_id: this.$store.state.cid,
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [
              {
                name: '检查总数',
                value: res.data.content.inspectnumbeer,
              },
              {
                name: '整改总数',
                value: res.data.content.rectificationnumbeer,
              },
              {
                name: '待整总数',
                value: res.data.content.toberectified,
              },
            ];
            if (
              res.data.content.inspectnumbeer == 0 &&
              res.data.content.rectificationnumbeer == 0 &&
              res.data.content.toberectified == 0
            ) {
              this.qualityData = [];
              newChar = [
                {
                  name: '检查总数',
                  value: 1,
                },
                {
                  name: '整改总数',
                  value: 1,
                },
                {
                  name: '待整总数',
                  value: 1,
                },
              ];
            } else {
              this.qualityData = ['1'];
            }

            this.getPie(newChar, 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //安全检查
    getAQC() {
      this.$axios
        .post('/task/securitycheck', {
          corp_id: this.$store.state.cid,
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [
              {
                name: '检查总数',
                value: res.data.content.aq_inspectnumbeer,
              },
              {
                name: '整改总数',
                value: res.data.content.aq_rectificationnumbeer,
              },
              {
                name: '待整总数',
                value: res.data.content.aq_toberectified,
              },
            ];
            if (
              res.data.content.aq_inspectnumbeer == 0 &&
              res.data.content.aq_rectificationnumbeer == 0 &&
              res.data.content.aq_toberectified == 0
            ) {
              this.safeData = [];
              newChar = [
                {
                  name: '检查总数',
                  value: 1,
                },
                {
                  name: '整改总数',
                  value: 1,
                },
                {
                  name: '待整总数',
                  value: 1,
                },
              ];
            } else {
              this.safeData = ['1'];
            }

            this.getPie(newChar, 2);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //质量事故
    getZLT() {
      this.$axios
        .post('/finance/zhiliantj', {
          xmid: this.pid,
          userid: this.$store.state.userInfo.uid,
          month: '',
          corp_id: this.$store.state.cid,
          proname: this.pname,
          type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [];
            res.data.type.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.type.length; i++) {
                obj.value = item.typenum;
                obj.name = item.accidenttype;
                obj.money = item.accidenmoney;
              }
              newChar.push(obj);
            });
            if (res.data.type.length > 0) {
              this.qualityTypeData = ['1'];
            } else {
              this.qualityTypeData = [];
              newChar = [
                { name: '专业分包', value: 1, money: 1 },
                { name: '土木', value: 1, money: 1 },
                { name: '防水工', value: 1, money: 1 },
              ];
            }
            this.doPie(newChar, 1);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //安全事故
    getAQT() {
      this.$axios
        .post('/finance/anquanzhiliantj', {
          userid: this.$store.state.userInfo.uid,
          month: '',
          corp_id: this.$store.state.cid,
          proname: this.pname,
          type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [];

            res.data.type.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.type.length; i++) {
                obj.value = item.typenum;
                obj.name = item.accidenttype;
                obj.money = item.accidenmoney;
              }
              newChar.push(obj);
            });
            if (res.data.type.length > 0) {
              this.safeTypeData = ['1'];
            } else {
              this.safeTypeData = [];
              newChar = [
                { name: '专业分包', value: 1, money: 1 },
                { name: '土木', value: 1, money: 1 },
                { name: '防水工', value: 1, money: 1 },
              ];
            }
            this.doPie(newChar, 2);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getZpie() {
      this.getZLC();
      this.getZLT();
      this.getAQT();
      this.getPer();
      this.getAQC();
    },
    resCharts() {
      if (this.activeTop == 0) {
        let quality = echarts.init(document.getElementById('quality')),
          qualityType = echarts.init(document.getElementById('qualityType')),
          safe = echarts.init(document.getElementById('safe')),
          safeType = echarts.init(document.getElementById('safeType'));

        quality.resize();
        qualityType.resize();
        safe.resize();
        safeType.resize();
      } else if (this.activeTop == 1) {
        let shouru = echarts.init(document.getElementById('shouru')),
          gcqian = echarts.init(document.getElementById('gcqian')),
          srgqian = echarts.init(document.getElementById('srgqian')),
          szcha = echarts.init(document.getElementById('szcha')),
          jscha = echarts.init(document.getElementById('jscha')),
          xjlcha = echarts.init(document.getElementById('xjlcha')),
          zhichu = echarts.init(document.getElementById('zhichu'));
        gcqian.resize();
        shouru.resize();
        zhichu.resize();
        srgqian.resize();
        szcha.resize();
        jscha.resize();
        xjlcha.resize();
      }
    },
    //新加
    getnewAQT() {
      this.$axios
        .post('/task/bulletin_board  ', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.newhtgData = res.data;
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getZpie();
    window.addEventListener('resize', () => {
      this.resCharts();
    });
  },
  created() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getInfo();
    this.getnewAQT();
    if (this.$store.state.cid == 'ding6623028c672c42cb35c2f4657eb6378f') {
      this.newView = true;
    } else {
      this.newView = false;
    }
  },
  computed: {},
  // watch: {
  //     activeTop(newval, val) {
  //         if (newval == 0) {
  //             let quality = echarts.init(document.getElementById('quality')),
  //                 qualityType = echarts.init(
  //                     document.getElementById('qualityType')
  //                 ),
  //                 safe = echarts.init(document.getElementById('safe')),
  //                 safeType = echarts.init(
  //                     document.getElementById('safeType')
  //                 );

  //             quality.resize();
  //             qualityType.resize();
  //             safe.resize();
  //             safeType.resize();
  //         }
  //     }
  // }
};
</script>
<style scoped lang="less">
.el-dialog {
  .el-input-number {
    width: 100%;
  }
}

@media screen and (max-width: 1100px) {
    .main .mainContent .mainList{
        width: 50% !important;

    }
}
.main {
  .panelHeader {
    background: url('~@/assets/images/project-bg.png') no-repeat center center;
    background-size: cover;
    color: #fff;
    font-weight: bold;
    .headerTop {
      .liu-tag {
        // height: 22px;
        // line-height: 22px;
        padding: 3px 10px;
        border: 1px solid #ffe191;
        border-radius: 11px;
        font-weight: bold;
        color: #ffe191;
        font-size: 12px;
      }
    }
  }
  .headerBtn-mainContent {
    background: #ffffff;
    border-radius: 5px 5px 0px 0px;
    padding: 20px 25px;
  }
  .mainContent {
    padding: 20px 0px !important;
    .mainList {
      box-shadow: 0px 0px 24px 2px rgba(3, 3, 3, 0.05);
      border-radius: 10px;
      width: 24% ;
    }
    .mainJinList {
      box-shadow: 0px 0px 24px 2px rgba(3, 3, 3, 0.05) !important;
    }
  }
}
</style>
