<template>
  <div id="appPanelnew" style="padding: 20px">
    <!-- 项目看板 -->
    <div class="main">
      <div class="panelHeader">
        <div class="headerTop">
          <div>
            <h2>项目名称：{{ pname }}</h2>
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
            开工时间:<span>{{ projectInfo.plan_start_riqi }}</span>
          </div>
          <div>
            开工累计天数:<span>{{ projectInfo.plan_end_riqi }}</span>
          </div>
        </div>
      </div>

      <div class="mainContent">
        <div>
          <div class="jinKanList">
            <h3>产量分析</h3>
            <div style="display: flex; justify-content: space-around">
              <div class="mainJinList">
                <div class="maindiv">
                  <div class="mainHeader">
                    <span></span>
                    <h3>单日产量</h3>
                  </div>
                  <div style="display: flex">
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="土层"
                            placement="top"
                          >
                            <span> 土层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.daily_output.days_layermetre"
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output.days_layermetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="岩层"
                            placement="top"
                          >
                            <span> 岩层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.daily_output.days_rockmetre"
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output.days_rockmetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="孤石/溶洞"
                            placement="top"
                          >
                            <span> 孤石/溶洞</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.daily_output.days_subsidymetre"
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output.days_subsidymetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="空孔"
                            placement="top"
                          >
                            <span> 空孔</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.daily_output.days_emptyholemetre
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output.days_emptyholemetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="当日打桩总数量"
                            placement="top"
                          >
                            <span> 当日打桩总数量</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="showListdata1.days_number"
                            placement="top"
                          >
                            <span>{{ showListdata1.days_number }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="当日打桩总米数"
                            placement="top"
                          >
                            <span> 当日打桩总米数</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="showListdata1.days_totalmetre"
                            placement="top"
                          >
                            <span>{{ showListdata1.days_totalmetre }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                  </div>
                </div>

                <!-- <img
                                    class="slpic"
                                    v-if="shouruData.length == 0"
                                    src="../../assets/cockpit/slWarn.png"
                                    alt=""
                                /> -->
              </div>
              <div class="mainJinList">
                <div class="maindiv">
                  <div class="mainHeader">
                    <span></span>
                    <h3>合计产量</h3>
                  </div>
                  <div style="display: flex">
                    <!-- <div
                                            v-if="activeTop === 1"
                                            id="srgqian"
                                        ></div>
                                        <img
                                            class="slpic"
                                            v-if="shouruData2.length == 0"
                                            src="../../assets/cockpit/slWarn.png"
                                            alt=""
                                        /> -->
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="土层"
                            placement="top"
                          >
                            <span> 土层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.addup_output.addup_layermetre"
                            placement="top"
                          >
                            <span>{{
                              allecharts.addup_output.addup_layermetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="岩层"
                            placement="top"
                          >
                            <span> 岩层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.addup_output.addup_rockmetre"
                            placement="top"
                          >
                            <span>{{
                              allecharts.addup_output.addup_rockmetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="孤石/溶洞"
                            placement="top"
                          >
                            <span> 孤石/溶洞</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.addup_output.addup_subsidymetre
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.addup_output.addup_subsidymetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="空孔"
                            placement="top"
                          >
                            <span> 空孔</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.addup_output.addup_emptyholemetre
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.addup_output.addup_emptyholemetre
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="打桩总数量"
                            placement="top"
                          >
                            <span> 打桩总数量</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="showListdata2.addup_number"
                            placement="top"
                          >
                            <span>{{ showListdata2.addup_number }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="累计产量"
                            placement="top"
                          >
                            <span> 累计产量</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="showListdata2.addup_totalmetre"
                            placement="top"
                          >
                            <span>{{ showListdata2.addup_totalmetre }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                  </div>
                </div>

                <!-- <img
                                    class="slpic"
                                    v-if="shouruData.length == 0"
                                    src="../../assets/cockpit/slWarn.png"
                                    alt=""
                                /> -->
              </div>
            </div>
          </div>
          <div class="jinKanList">
            <h3>产值分析</h3>
            <div style="display: flex; justify-content: space-around">
              <div class="mainJinList">
                <div class="maindiv">
                  <div class="mainHeader">
                    <span></span>
                    <h3>单日产值</h3>
                  </div>
                  <div style="display: flex">
                    <!-- <div
                                            v-if="activeTop === 1"
                                            id="zhichu"
                                        ></div>
                                        <img
                                            class="slpic"
                                            v-if="shouruData3.length == 0"
                                            src="../../assets/cockpit/slWarn.png"
                                            alt=""
                                        /> -->
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="土层"
                            placement="top"
                          >
                            <span> 土层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.daily_output_val.days_layerbvalue
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output_val.days_layerbvalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="岩层"
                            placement="top"
                          >
                            <span> 岩层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.daily_output_val.days_rockvalue
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output_val.days_rockvalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="孤石/溶洞"
                            placement="top"
                          >
                            <span> 孤石/溶洞</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.daily_output_val.days_subsidyvalue
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output_val.days_subsidyvalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="空孔"
                            placement="top"
                          >
                            <span> 空孔</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              allecharts.daily_output_val.days_emptyholevalue
                            "
                            placement="top"
                          >
                            <span>{{
                              allecharts.daily_output_val.days_emptyholevalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16"
                          ><el-tooltip
                            class="item"
                            effect="dark"
                            content="当日产值"
                            placement="top"
                          >
                            <span> 当日产值</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="showListdata3.days_totalvalue"
                            placement="top"
                          >
                            <span>{{ showListdata3.days_totalvalue }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                  </div>
                </div>

                <!-- <img
                                    class="slpic"
                                    v-if="shouruData.length == 0"
                                    src="../../assets/cockpit/slWarn.png"
                                    alt=""
                                /> -->
              </div>
              <div class="mainJinList">
                <div class="maindiv">
                  <div class="mainHeader">
                    <span></span>
                    <h3>合计产值</h3>
                  </div>
                  <div style="display: flex">
                    <!-- <div
                                            v-if="activeTop === 1"
                                            id="gcqian"
                                        ></div>
                                        <img
                                            class="slpic"
                                            v-if="shouruData4.length == 0"
                                            src="../../assets/cockpit/slWarn.png"
                                            alt=""
                                        /> -->
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="土层"
                            placement="top"
                          >
                            <span> 土层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.total_val.addup_layerbvalue"
                            placement="top"
                          >
                            <span>{{
                              allecharts.total_val.addup_layerbvalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="岩层"
                            placement="top"
                          >
                            <span> 岩层</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.total_val.addup_rockvalue"
                            placement="top"
                          >
                            <span>{{
                              allecharts.total_val.addup_rockvalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="孤石/溶洞"
                            placement="top"
                          >
                            <span> 孤石/溶洞</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.total_val.addup_subsidyvalue"
                            placement="top"
                          >
                            <span>{{
                              allecharts.total_val.addup_subsidyvalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="空孔"
                            placement="top"
                          >
                            <span> 空孔</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="allecharts.total_val.addup_emptyholevalue"
                            placement="top"
                          >
                            <span>{{
                              allecharts.total_val.addup_emptyholevalue
                            }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                    <el-row class="lirunm">
                      <el-row>
                        <el-col :span="16">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="当日产值"
                            placement="top"
                          >
                            <span> 累计产值</span>
                          </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="showListdata4.addup_totalvalue"
                            placement="top"
                          >
                            <span>{{ showListdata4.addup_totalvalue }}</span>
                          </el-tooltip>
                        </el-col>
                      </el-row>
                    </el-row>
                  </div>
                </div>

                <!-- <img
                                    class="slpic"
                                    v-if="shouruData.length == 0"
                                    src="../../assets/cockpit/slWarn.png"
                                    alt=""
                                /> -->
              </div>
            </div>
          </div>
          <div class="jinKanList">
            <h3>设备单日产值</h3>
            <el-form :inline="true" :model="formInnew" class="demo-form-inline">
              <el-form-item>
                <!--        :picker-options="pickerOptions" -->
                <el-date-picker
                  v-model="formInnew.value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmitnew">查询</el-button>
              </el-form-item></el-form
            >
            <img
              v-if="alldata.length == 0"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//xeaXGTDNSC1635400194498.png"
              alt=""
            />
            <div v-else id="quality"></div>
          </div>
          <div class="jinKanList">
            <div>
              <h3>回款情况</h3>
              <el-form
                @submit.native.prevent
                :inline="true"
                :model="formInline"
                label-width="120px"
                class="demo-form-inline"
              >
                <el-form-item label="付款单位:">
                  <el-input
                    v-model="formInline.party_a"
                    placeholder="付款单位"
                  ></el-input>
                </el-form-item>

                <el-form-item label="日期">
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="formInline.now_time"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div style="display: inherit">
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column
                  prop="project_name"
                  label="项目名称"
                  align="left"
                >
                </el-table-column>
                <el-table-column
                  prop="collection_money"
                  label="金额"
                  align="left"
                >
                </el-table-column>
                <el-table-column prop="riqi" label="时间" align="left">
                </el-table-column>
                <el-table-column prop="type" label="收款类型" align="left">
                </el-table-column>
                <el-table-column prop="party_a" label="付款单位" align="left">
                </el-table-column>
              </el-table>
              <div class="additem">
                <div>累计完成产值:{{ cz_contrast.addup_totalvalue }}</div>
                <div>累计回款:{{ cz_contrast.collection_money }}</div>
                <div>未回款:{{ cz_contrast.w_return }}</div>
              </div>
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-size="5"
                layout="prev, pager, next"
                :total="total1"
              ></el-pagination>
            </div>
          </div>
          <div class="jinKanList" style="position: relative">
            <h3>产值日志</h3>
            <el-form
              @submit.native.prevent
              :inline="true"
              :model="formInnew2"
              class="demo-form-inline"
            >
              <el-form-item>
                <!--  :picker-options="pickerOptions1" -->
                <el-date-picker
                  v-model="formInnew2.value2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmitnew2">查询</el-button>
              </el-form-item></el-form
            >
            <img
              v-if="shouruData5.length == 0"
              src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//xeaXGTDNSC1635400194498.png"
              alt=""
            />
            <div v-else id="logeac"></div>

            <!-- <img
                            class="slpic"
                            style="position: absolute; top: 0; right: 0"
                            v-if="shouruData5.length == 0"
                            src="../../assets/cockpit/slWarn.png"
                            alt=""
                        /> -->
          </div>
        </div>
        <!-- <div>
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
                </div> -->
      </div>
    </div>
    <el-dialog title="今日生产情况" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="dialogform" label-width="80px">
        <el-form-item disabled label="生产情况">
          <el-input
            type="textarea"
            v-model="dialogform.productiontoday"
          ></el-input>
        </el-form-item>
        <el-form-item disabled label="时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="dialogform.now_date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { nextTick } from 'vuedraggable';
// import echarts from 'echarts';
const echarts = require('echarts');
import commonTable from '@/components/commonTable.vue';
export default {
  name: 'appPanelnew',
  components: { commonTable },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          let millisecondOfDay = 1 * 24 * 60 * 60 * 1000;
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 10 * millisecondOfDay
          );
        },
      },
      pickerOptions1: {
        disabledDate(time) {
          let millisecondOfDay = 1 * 24 * 60 * 60 * 1000;
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 30 * millisecondOfDay
          );
        },
      },
      allecharts: '',
      cz_contrast: {
        addup_totalvalue: '',
        collection_money: '',
        w_return: '',
      },
      formInnew2: {
        value2: '',
      },
      formInnew: {
        value1: '',
      },
      dialogVisible: false,
      dialogform: {
        productiontoday: '',
        now_date: '',
      },
      formInline: {
        party_a: '',
        now_time: '',
      },
      alldata: [],
      currentPage1: 1,
      total1: '',
      tableData1: [],
      tableData: [
        {
          project_name: '123',
          collection_money: '12',
        },
        {
          project_name: '123',
          collection_money: '12',
        },
        {
          project_name: '123',
          collection_money: '12',
        },
        {
          project_name: '123',
          collection_money: '12',
        },

        {
          project_name: '123',
          collection_money: '12',
        },

        {
          poject_name: '123',
          collection_money: '12',
        },

        {
          project_name: '123',
          collection_money: '12',
        },
      ],
      showListdata1: {
        days_number: '',
        days_totalmetre: '',
      },
      showListdata2: {
        addup_number: '',
        addup_totalmetre: '',
      },
      showListdata3: {
        days_totalvalue: '',
      },

      showListdata4: {
        addup_totalvalue: '',
      },
      intername: '',
      pagesize: 10,

      myArray: [],
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],

      activeNames: ['0'],
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
      activeTop: 1,
      safeTypeData: ['1'],
      safeData: ['1'],
      qualityData: ['1'],
      qualityTypeData: ['1'],
      diaryData: [],
      shouruData1: ['1'],
      shouruData2: ['1'],
      shouruData3: ['1'],
      shouruData4: ['1'],
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
    chande(dateData) {
      let date = new Date(dateData);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      const time = y + '-' + m + '-' + d;

      return time;
    },
    onSubmitnew() {
      // this.chande(this.formInnew.value1[0]);
      console.log(this.formInnew.value1);
      if (this.formInnew.value1) {
        this.getSRpie(
          this.chande(this.formInnew.value1[0]),
          this.chande(this.formInnew.value1[1]),
          '',
          '',
        );
      } else {
        this.getSRpie();
      }
    },
    onSubmitnew2() {
      // this.chande(this.formInnew.value1[0]);
      console.log(this.formInnew2.value2);
      if (this.formInnew2.value2) {
        this.getSRpie(
          '',
          '',
          this.chande(this.formInnew2.value2[0]),
          this.chande(this.formInnew2.value2[1]),
        );
      } else {
        this.getSRpie();
      }
    },
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
        .catch(function(error) {
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
        .catch(function(error) {
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
                  // _this.getZCpie();
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
              .catch(function(error) {
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
              .catch(function(error) {
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
        .catch(function(error) {
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
      // this.getZCpie();
      // this.getLRpie();
      // this.getFa();
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

            this.doSelfPie(newC, 3);
            this.doSelfPie(newA, 4);
            this.doSelfPie(newB, 5);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 柱状图
    // doSelfPie(arr, type) {
    //     let dataAxis = [];
    //     if (type == 1) {
    //         dataAxis = ['结算产值', '累计支付', '未支付'];
    //     } else if (type == 2) {
    //         dataAxis = ['结算产值', '累计回款', '甲方欠款'];
    //     } else if (type == 3) {
    //         // dataAxis = ['实际完成产值', '已结算产值', '实际应付'];
    //         dataAxis = ['累计回款金额', '累计支出金额', '现金流差'];
    //     } else if (type == 4) {
    //         dataAxis = ['收入总金额', '支出总金额', '利润'];
    //     } else if (type == 5) {
    //         dataAxis = ['累计收入结算', '累计支出结算', '结算差'];
    //     }
    //     let bption = {
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 // 坐标轴指示器，坐标轴触发有效
    //                 type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    //             }
    //         },
    //         xAxis: {
    //             type: 'category',
    //             data: dataAxis,
    //             axisLabel: {
    //                 inside: false,
    //                 // textStyle: {
    //                 //     color: '#999'
    //                 // },
    //                 interval: 0,
    //                 rotate: 40
    //             }
    //         },
    //         yAxis: {
    //             type: 'value',
    //             axisLabel: {
    //                 inside: true
    //             }
    //         },
    //         series: [
    //             {
    //                 data: [
    //                     {
    //                         value: arr[0],
    //                         itemStyle: {
    //                             color: '#24DD93'
    //                         }
    //                     },
    //                     {
    //                         value: arr[1],
    //                         itemStyle: {
    //                             color: '#FFB81E'
    //                         }
    //                     },
    //                     {
    //                         value: arr[2],
    //                         itemStyle: {
    //                             color: '#FF6A5B'
    //                         }
    //                     }
    //                 ],
    //                 type: 'bar',
    //                 barWidth: 24
    //             }
    //         ]
    //     };
    //     this.$nextTick(() => {
    //         if (type == 1) {
    //             let gcqian = echarts.init(
    //                 document.getElementById('gcqian')
    //             );
    //             gcqian.clear();
    //             gcqian.setOption(bption);
    //         } else if (type == 2) {
    //             let srgqian = echarts.init(
    //                 document.getElementById('srgqian')
    //             );
    //             srgqian.clear();
    //             srgqian.setOption(bption);
    //         } else if (type == 3) {
    //             let xjlcha = echarts.init(
    //                 document.getElementById('xjlcha')
    //             );
    //             xjlcha.clear();
    //             xjlcha.setOption(bption);
    //         } else if (type == 4) {
    //             let szcha = echarts.init(document.getElementById('szcha'));
    //             szcha.clear();
    //             szcha.setOption(bption);
    //         } else if (type == 5) {
    //             let jscha = echarts.init(document.getElementById('jscha'));
    //             jscha.clear();
    //             jscha.setOption(bption);
    //         }
    //     });
    // },
    // getZCpie() {
    //     this.$axios
    //         .post('/projectfour/expenditureAnalysis', {
    //             project_name: this.pname
    //         })
    //         .then((res) => {
    //             if (res.data.code == 1) {
    //                 let newData = JSON.parse(JSON.stringify(res.data.data));
    //                 this.xmgData.dai_js = newData.dai_js;
    //                 this.xmgData.shiji_pay = newData.shiji_pay;
    //                 let newD = [newData.dai_js, newData.shiji_pay];
    //                 let newC = [
    //                     newData.settlement,
    //                     newData.payment_lj,
    //                     newData.no_pay_money
    //                 ];
    //                 let newChar = [
    //                     { value: newData.service, name: '劳务' },
    //                     { value: newData.material, name: '材料' },
    //                     { value: newData.sub, name: '分包' },
    //                     { value: newData.lease, name: '租赁' },

    //                     { value: newData.reimbursement, name: '间接费' },
    //                     { value: newData.other, name: '其他' }
    //                 ];
    //                 if (
    //                     newData.service == 0 &&
    //                     newData.material == 0 &&
    //                     newData.sub == 0 &&
    //                     newData.lease == 0 &&
    //                     newData.reimbursement == 0 &&
    //                     newData.other == 0
    //                 ) {
    //                     this.zhichuData = [];
    //                     newChar[0].value = 1;
    //                     newChar[1].value = 1;
    //                     newChar[2].value = 1;
    //                     newChar[3].value = 1;
    //                     newChar[4].value = 1;
    //                     newChar[5].value = 1;
    //                 } else {
    //                     this.zhichuData = ['1'];
    //                 }
    //                 if (
    //                     newData.settlement == 0 &&
    //                     newData.payment_lj == 0 &&
    //                     newData.no_pay_money == 0
    //                 ) {
    //                     this.zhichuTypeData = [];
    //                     newC[0] = 1;
    //                     newC[1] = 1;
    //                     newC[2] = 1;
    //                 } else {
    //                     this.zhichuTypeData = ['1'];
    //                 }
    //                 if (newData.dai_js == 0 && newData.shiji_pay == 0) {
    //                     this.zhichuP = [];
    //                     newD = [1, 1];
    //                 } else {
    //                     this.zhichuP = ['1'];
    //                 }
    //                 this.doSRpie(newChar, 3);
    //                 this.doSelfPie(newC, 1);
    //                 this.doZCpie(newD, 1);
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // },
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

        let szcha = echarts.init(document.getElementById('szcha'));
        szcha.clear();
        szcha.setOption(bption);
      });
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.gettableData();
    },
    onSubmit() {
      this.gettableData();
    },
    //biaoge shuju
    gettableData() {
      this.$axios
        .post('/task/singlereturn', {
          project_name: this.pname,
          party_a: this.formInline.party_a,
          now_time: this.formInline.now_time,
          num: '5',
          current_page: this.currentPage1,
        })
        .then(res => {
          if (res.data.code == '1') {
            this.total1 = res.data.content.total;
            this.tableData1 = res.data.content.list;
            this.cz_contrast = res.data.cz_contrast;
            if (this.total1 > 0 && this.tableData1.length < 1) {
              this.currentPage1 = res.data.content.current_page;
              this.getList();
            }
          }
        });
    },
    //收入分析
    getSRpie(a, b, c, d) {
      this.$axios
        .post('/task/peoject_news', {
          // project_name: '我是大范甘迪',
          project_name: this.pname,
          start_time: a,
          end_time: b,
          start_time1: c,
          end_time1: d,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newData = JSON.parse(JSON.stringify(res.data));
            this.allecharts = JSON.parse(JSON.stringify(res.data));

            let newChar1 = [
              {
                name: '土层',
                value: newData.daily_output.days_layermetre,
              },
              {
                name: '岩层',
                value: newData.daily_output.days_rockmetre,
              },
              {
                name: '孤石/溶洞',
                value: newData.daily_output.days_subsidymetre,
              },
              {
                name: '空孔',
                value: newData.daily_output.days_emptyholemetre,
              },
            ];
            this.showListdata1.days_number = newData.daily_output.days_number;
            this.showListdata1.days_totalmetre =
              newData.daily_output.days_totalmetre;
            if (
              newData.daily_output.days_layermetre == 0 &&
              newData.daily_output.days_rockmetre == 0 &&
              newData.daily_output.days_subsidymetre == 0 &&
              newData.daily_output.days_emptyholemetre == 0
            ) {
              this.shouruData1 = [];
              newChar1[0].value = 1;
              newChar1[1].value = 1;
              newChar1[2].value = 1;
              newChar1[3].value = 1;
            } else {
              this.shouruData1 = ['1'];
            }
            let newChar2 = [
              {
                name: '土层',
                value: newData.addup_output.addup_layermetre,
              },
              {
                name: '岩层',
                value: newData.addup_output.addup_rockmetre,
              },
              {
                name: '孤石/溶洞',
                value: newData.addup_output.addup_subsidymetre,
              },
              {
                name: '空孔',
                value: newData.addup_output.addup_emptyholemetre,
              },
            ];
            this.showListdata2.addup_number = newData.addup_output.addup_number;
            this.showListdata2.addup_totalmetre =
              newData.addup_output.addup_totalmetre;
            if (
              newData.addup_output.addup_layermetre == 0 &&
              newData.addup_output.addup_rockmetre == 0 &&
              newData.addup_output.addup_subsidymetre == 0 &&
              newData.addup_output.addup_emptyholemetre == 0
            ) {
              this.shouruData2 = [];
              newChar2[0].value = 1;
              newChar2[1].value = 1;
              newChar2[2].value = 1;
              newChar2[3].value = 1;
            } else {
              this.shouruData2 = ['1'];
            }
            let newChar3 = [
              {
                name: '土层',
                value: newData.daily_output_val.days_layerbvalue,
              },
              {
                name: '岩层',
                value: newData.daily_output_val.days_rockvalue,
              },
              {
                name: '孤石/溶洞',
                value: newData.daily_output_val.days_subsidyvalue,
              },
              {
                name: '空孔',
                value: newData.daily_output_val.days_emptyholevalue,
              },
            ];
            this.showListdata3.days_totalvalue =
              newData.daily_output_val.days_totalvalue;
            if (
              newData.daily_output_val.days_layerbvalue == 0 &&
              newData.daily_output_val.days_rockvalue == 0 &&
              newData.daily_output_val.days_subsidyvalue == 0 &&
              newData.daily_output_val.days_emptyholevalue == 0
            ) {
              this.shouruData3 = [];
              newChar3[0].value = 1;
              newChar3[1].value = 1;
              newChar3[2].value = 1;
              newChar3[3].value = 1;
            } else {
              this.shouruData3 = ['1'];
            }

            let newChar4 = [
              {
                name: '土层',
                value: newData.total_val.addup_layerbvalue,
              },
              {
                name: '岩层',
                value: newData.total_val.addup_rockvalue,
              },
              {
                name: '孤石/溶洞',
                value: newData.total_val.addup_subsidyvalue,
              },
              {
                name: '空孔',
                value: newData.total_val.addup_emptyholevalue,
              },
            ];
            this.showListdata4.addup_totalvalue =
              newData.total_val.addup_totalvalue;
            if (
              newData.total_val.addup_layerbvalue == 0 &&
              newData.total_val.addup_rockvalue == 0 &&
              newData.total_val.addup_subsidyvalue == 0 &&
              newData.total_val.addup_emptyholevalue == 0
            ) {
              this.shouruData4 = [];
              newChar4[0].value = 1;
              newChar4[1].value = 1;
              newChar4[2].value = 1;
              newChar4[3].value = 1;
            } else {
              this.shouruData4 = ['1'];
            }
            // 柱形图
            this.alldata = newData.device_val;

            let newChar5x = [];
            newChar5x = newData.device_number;

            let newChar5d = [];
            newChar5d = newData.device_val.map(item => {
              return item.map(item1 => {
                return item1.now_date;
              });
            });
            let newChar5a = newData.device_val;

            // xian图
            let newChar6x = [];
            newChar6x = newData.linechart.map(item => {
              return item.tj_date;
            });
            let newChar6y = [];
            newChar6y = newData.linechart.map(item => {
              return item.total;
            });
            this.shouruData5 = newData.linechart;
            if (newData.linechart.length == 0) {
              newChar6x = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              newChar6y = [10, 20, 10, 20, 10, 20, 10];
            }
            // this.doSRpie(newChar1, 1);
            // this.doSRpie(newChar2, 2);
            // this.doSRpie(newChar3, 3);
            // this.doSRpie(newChar4, 4);
            // 柱图
            this.getPie(newChar5x, newChar5d, newChar5a);
            //折线
            this.dozhepie(newChar6x, newChar6y);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    dozhepie(arrx, arry) {
      const _this = this;
      console.log('12651586');

      let bption = {
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: arrx,
        },
        yAxis: {
          type: 'value',
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],

        series: [
          {
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3A9AFA', //折线点的颜色
                lineStyle: {
                  color: '#3A9AFA', //折线的颜色
                },
              },
            },

            // avoidLabelOverlap: true,
            label: {
              show: true,
              position: 'outside',
            },
            labelLine: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
            },

            data: arry,
          },
        ],
      };

      _this.$nextTick(() => {
        let logeac = echarts.init(document.getElementById('logeac'));
        logeac.on('click', function(params) {
          // 参数 params
          _this.dialogVisible = true;
          _this.viewclick(params.name);
          console.log(params.name, _this);
        });
        logeac.clear();
        logeac.setOption(bption);
      });
    },
    viewclick(data) {
      this.$axios
        .post('/task/linechart', {
          project_name: this.pname,
          now_time: data,
        })
        .then(res => {
          this.dialogform = res.data.content;
        });
    },
    // 饼状图
    doSRpie(arr, type) {
      let newName = '';
      if (type == 1) {
        newName = '单日产量';
      } else if (type == 2) {
        newName = '合计产量';
      } else if (type == 3) {
        newName = '单日产值';
      } else if (type == 4) {
        newName = '合计产值';
      }
      let bption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          itemWidth: 5,
          orient: 'vertical',
          top: '15%',
          left: 'right',
        },
        series: [
          {
            name: newName,
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: true,
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
                show: false,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function(params) {
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
              },
            },
            data: arr,
          },
        ],
      };

      // let bption = {
      //     tooltip: {
      //         trigger: 'item',
      //         formatter: function (params) {
      //             return (
      //                 params.seriesName +
      //                 '<br/>' +
      //                 params.name +
      //                 ' : ' +
      //                 params.value +
      //                 ' (' +
      //                 params.percent +
      //                 '%)'
      //             );
      //         }
      //     },

      //     series: [
      //         {
      //             name: newName,
      //             type: 'pie',
      //             radius: ['50%', '70%'],
      //             center: ['50%', '50%'],
      //             avoidLabelOverlap: true,
      //             label: {
      //                 show: true,
      //                 position: 'outside'
      //             },
      //             labelLine: {
      //                 show: true
      //             },
      //             emphasis: {
      //                 label: {
      //                     show: true
      //                     // fontSize: '18',
      //                     // fontWeight: 'bold'
      //                 }
      //             },
      //             itemStyle: {
      //                 normal: {
      //                     color: function (params) {
      //                         //自定义颜色
      //                         var colorList = [
      //                             '#FFA200',
      //                             '#0089FF',
      //                             '#00D0AF',
      //                             '#FF3A3A',
      //                             '#F77400',
      //                             '#0CCB5D'
      //                         ];
      //                         return colorList[params.dataIndex];
      //                     },
      //                     label: {
      //                         show: true,
      //                         formatter: ' {b} \n {d}% '
      //                     }
      //                 }
      //             },
      //             // radius: '50%',
      //             data: arr
      //         }
      //     ]
      // };

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
        }
        // else if (type == 5) {
        //     let szcha = echarts.init(document.getElementById('szcha'));
        //     szcha.clear();
        //     szcha.setOption(bption);
        // } else if (type == 6) {
        //     let jscha = echarts.init(document.getElementById('jscha'));
        //     jscha.clear();
        //     jscha.setOption(bption);
        // }
      });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(
        arr => !res.has(arr.now_date) && res.set(arr.now_date, 1),
      );
    },

    getPie(arrx, arrd, arra) {
      console.log('888888', arra);
      let newlist = ['now_date', ...arrx];
      let arrd1 = [].concat.apply([], arrd);

      let arrd2 = arrd1.reduce((prev, cur) => {
        prev.indexOf(cur) === -1 && prev.push(cur);
        return prev;
      }, []);

      console.log(arrd2); //日期
      let arra1 = [].concat.apply([], this.alldata);
      arra1 = this.unique(arra1);

      for (let i in arra1) {
        for (let j in arrx) {
          arra1[i][arrx[j]] = 0;
        }

        // delete arra1[i].spread1;
        // delete arra1[i].today_cz;
        // delete arra1[i].today_wcgl;
      }
      console.log('9999', arra1);

      for (let j in arra) {
        console.log('1', arra[j]);
        for (let i in arra[j]) {
          console.log('2', arra[j][i].spread1);

          for (let k in arrx) {
            console.log('3', arrx[k]);
            if (arrx[k] == arra[j][i].spread1) {
              console.log(arrx[k]);
              arra1[j][arrx[k]] = arra[j][i].today_cz;
              // console.log('4', arra[i][arrx[k]]);
            }
          }
        }
      }

      console.log('22121122', arra1, this.alldata);

      console.log('1213112323', arrx, arrd);
      let series = [
        {
          type: 'bar',
          barWidth: 30,
        },

        { type: 'bar', barWidth: 30 },
        { type: 'bar', barWidth: 30 },
        { type: 'bar', barWidth: 30 },
        { type: 'bar', barWidth: 30 },
      ];
      let series1 = series.slice(0, arrx.length);
      console.log('series:', series.slice(0, arrx.length));
      let bption;
      bption = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: newlist,
          source: arra1,
        },
        xAxis: { type: 'category' },
        yAxis: {},
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: series1,
      };
      this.$nextTick(() => {
        let quality = echarts.init(document.getElementById('quality'));
        quality.clear();
        quality.setOption(bption);
      });
    },
    // getPie(arrx, arrxy) {
    //     console.log('1213123', arrx, arrx);
    //     let dataAxis = arrx;
    //     let cdata = arrxy;
    //     let bption = {
    //         // title: { text: newT, left: 'center' },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 // 坐标轴指示器，坐标轴触发有效
    //                 type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    //             }
    //         },
    //         xAxis: {
    //             data: dataAxis,
    //             axisLabel: {
    //                 inside: false,
    //                 textStyle: {
    //                     color: '#999',
    //                     fontSize: 14
    //                 },
    //                 interval: 0
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLine: {
    //                 show: false
    //             },
    //             z: 10
    //         },
    //         yAxis: {
    //             axisLine: {
    //                 show: false
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLabel: {
    //                 textStyle: {
    //                     color: '#999'
    //                 }
    //             }
    //         },
    //         dataZoom: [
    //             {
    //                 type: 'inside'
    //             }
    //         ],
    //         series: [
    //             {
    //                 type: 'bar',
    //                 barWidth: 30,
    //                 itemStyle: {
    //                     textStyle: {
    //                         fontSize: 12
    //                     },
    //                     normal: {
    //                         color: new echarts.graphic.LinearGradient(
    //                             0,
    //                             0,
    //                             0,
    //                             1,
    //                             [
    //                                 {
    //                                     offset: 0,
    //                                     color: '#83bff6'
    //                                 },
    //                                 {
    //                                     offset: 0.5,
    //                                     color: '#188df0'
    //                                 },
    //                                 {
    //                                     offset: 1,
    //                                     color: '#188df0'
    //                                 }
    //                             ]
    //                         )
    //                     },
    //                     emphasis: {
    //                         color: new echarts.graphic.LinearGradient(
    //                             0,
    //                             0,
    //                             0,
    //                             1,
    //                             [
    //                                 {
    //                                     offset: 0,
    //                                     color: '#2378f7'
    //                                 },
    //                                 {
    //                                     offset: 0.7,
    //                                     color: '#2378f7'
    //                                 },
    //                                 {
    //                                     offset: 1,
    //                                     color: '#83bff6'
    //                                 }
    //                             ]
    //                         )
    //                     }
    //                 },
    //                 data: cdata
    //             }
    //         ]
    //     };
    //     this.$nextTick(() => {
    //         let quality = echarts.init(document.getElementById('quality'));
    //         quality.clear();
    //         quality.setOption(bption);
    //     });
    // },
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
          formatter: function(params) {
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
        series: [
          {
            name: newT,
            type: 'pie',
            radius: ['50%', '70%'],

            avoidLabelOverlap: true,
            label: {
              show: true,
              position: 'outside',
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
                label: {
                  show: true,
                  formatter: ' {b} :  {c} ',
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
            this.diaryData = res.data.content;
          }
        })
        .catch(function(error) {
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

            // this.getPie(newChar, 1);
          }
        })
        .catch(function(error) {
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

            // this.getPie(newChar, 2);
          }
        })
        .catch(function(error) {
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
        .catch(function(error) {
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
        .catch(function(error) {
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
          logeac = echarts.init(document.getElementById('logeac')),
          szcha = echarts.init(document.getElementById('szcha')),
          jscha = echarts.init(document.getElementById('jscha')),
          xjlcha = echarts.init(document.getElementById('xjlcha')),
          zhichu = echarts.init(document.getElementById('zhichu'));

        logeac.resize();
        gcqian.resize();
        shouru.resize();
        zhichu.resize();
        srgqian.resize();
        szcha.resize();
        jscha.resize();
        xjlcha.resize();
      }
    },
  },
  mounted() {
    // this.getZpie();

    this.gettableData();
    this.getJpie();
    window.addEventListener('resize', () => {
      this.resCharts();
    });
  },
  created() {
    // this.dozhepie();
    console.log('111', this.$route.query);
    // this.$store.state.prodata; this.$route.query.row
    this.pname = this.$route.query.project_name;

    this.projectInfo.stalker = this.$route.query.stalker;
    this.projectInfo.plan_start_riqi = this.$route.query.plan_start_riqi;
    this.projectInfo.plan_end_riqi = this.$route.query.plan_end_riqi;
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
</style>
