/* * @Author: NorthWind * @Date: 2020-12-08 09:13:54 * @Last Modified by:
Liuzhipeng * @Last Modified time: 2021-12-09 16:52:24 */
<template>
  <div id="projectApprovalList">
    <!-- 里程碑报表 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <el-form
            @submit.native.prevent
            :inline="true"
            :model="formInline"
            label-width="120px"
            class="demo-form-inline"
          >
            <div class="hlBottom">
              <el-form-item label="项目名称:">
                <el-input
                  v-model="formInline.name"
                  clearable
                  placeholder="请输入项目名称"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="searchTime"
                label="时间:"
                style="min-width: 300px"
              >
                <el-date-picker
                  v-model="formInline.month"
                  :picker-options="pickerStart"
                  type="month"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月"
                  value-format="yyyy-MM"
                ></el-date-picker>
              </el-form-item>

              <div style="text-align: center">
                <el-button
                  type="primary"
                  size="medium"
                  @click="searchClick"
                  style="margin-right: 10px"
                  >搜索</el-button
                >
                <el-button plain size="medium" @click="resetClick"
                  >重置</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <!-- <el-button type="primary" size="medium" @click="newAdd"
                            >新建</el-button
                        > -->
          </div>
          <div class="mmbRight">
            <!-- <el-button
                            type="primary"
                            plain
                            size="medium"
                            icon="el-icon-delete"
                            @click="deleteList"
                            >删除</el-button
                        > -->
            <!-- <el-button
                            type="primary"
                            plain
                            size="medium"
                            icon="el-icon-upload2"
                            @click="exportIn"
                            >导入</el-button
                        > -->
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <!-- <el-button
                            type="primary"
                            plain
                            size="medium"
                            icon="el-icon-refresh"
                            @click="updateList"
                            >刷新</el-button
                        > -->
            <!-- <el-button
                            v-if="$store.state.userInfo.admin == 1"
                            type="primary"
                            plain
                            size="medium"
                            icon="el-icon-setting"
                            @click="viewShow"
                            >设置显示字段</el-button
                        > -->
          </div>
        </el-row>

        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          @header-dragend="checkWidth"
          ref="table"
          max-height="650"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            prop="tj_date"
            label="提交日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="total"
            label="今日完成产值"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="所属项目"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="start_days"
            label="开工累计天数"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="today_wcgl"
            label="今日完成根数"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="weather"
            label="今日天气情况"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <!-- <el-table-column
                        prop="now_date"
                        label="日期"
                        align="left"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column> -->
          <el-table-column
            prop="productiontoday"
            label="今日生产情况"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_total"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_total }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_today_wcgl"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_today_wcgl }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_total"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_total }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_today_wcgl"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_today_wcgl }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
              </div>
            </div>
          </div>
        </el-table>
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
      </div>
      <el-dialog
        :title="newTitle"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="1200px"
        @close="editCancel('dingLogRef')"
        class="phDialog"
      >
        <div class="phdMain">
          <div class="cDrawerContent">
            <el-form
              @submit.native.prevent
              :model="dingLogForm"
              :rules="dingLogRules"
              :label-position="right"
              ref="dingLogRef"
              label-width="130px"
            >
              <el-form-item label="项目名称:">
                <el-select
                  v-model="dingLogForm.project_name"
                  clearable
                  filterable
                  placeholder="请选择项目"
                  @change="prochange"
                >
                  <el-option
                    v-for="(item, index) in allProjectList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="桩号:" prop="station">
                <el-input-number
                  v-model="dingLogForm.station"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入桩号"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="桩径:" prop="pile_diameter">
                <el-input-number
                  v-model="dingLogForm.pile_diameter"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入桩径"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="设计孔深:" prop="designholedepth">
                <el-input-number
                  v-model="dingLogForm.designholedepth"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入设计孔深"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="有效桩长:" prop="yxz_length">
                <el-input-number
                  v-model="dingLogForm.yxz_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入有效桩长"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="实际孔深:" prop="actualholedepth">
                <el-input-number
                  v-model="dingLogForm.actualholedepth"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入实际孔深"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="土层桩长:" prop="layer_length">
                <el-input-number
                  v-model="dingLogForm.layer_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入土层桩长"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="土层单价:" prop="layer_price">
                <el-input-number
                  v-model="dingLogForm.layer_price"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入土层单价"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="岩层桩长:" prop="rock_length">
                <el-input-number
                  v-model="dingLogForm.rock_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入岩层桩长"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="岩层单价:" prop="rock_price">
                <el-input-number
                  v-model="dingLogForm.rock_price"
                  controls-position="right"
                  :min="0"
                  placeholder="岩层单价"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="空孔桩长:" prop="emptyhole_length">
                <el-input-number
                  v-model="dingLogForm.emptyhole_length"
                  controls-position="right"
                  :min="0"
                  placeholder="空孔桩长"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="空孔单价:" prop="emptyhole_price">
                <el-input-number
                  v-model="dingLogForm.emptyhole_price"
                  controls-position="right"
                  :min="0"
                  placeholder="空孔单价"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="孤石/溶洞记录:" prop="subsidy">
                <el-input
                  v-model="dingLogForm.subsidy"
                  controls-position="right"
                  :min="0"
                  placeholder="孤石/溶洞记录价"
                ></el-input>
              </el-form-item>
              <el-form-item label="补贴单价:" prop="subsidy_price">
                <el-input-number
                  v-model="dingLogForm.subsidy_price"
                  controls-position="right"
                  :min="0"
                  placeholder="补贴单价"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="设计方量:" prop="design_fl">
                <el-input-number
                  v-model="dingLogForm.design_fl"
                  controls-position="right"
                  :min="0"
                  placeholder="设计方量"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="实际方量:" prop="actual_fl">
                <el-input-number
                  v-model="dingLogForm.actual_fl"
                  controls-position="right"
                  :min="0"
                  placeholder="实际方量"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="充盈系数:" prop="filling_xs">
                <el-input-number
                  v-model="dingLogForm.filling_xs"
                  controls-position="right"
                  :min="0"
                  placeholder="充盈系数"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="合计总价:" prop="total">
                <el-input-number
                  v-model="dingLogForm.total"
                  controls-position="right"
                  :min="0"
                  placeholder="合计总价"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="备注:" prop="remarks">
                <el-input-number
                  v-model="dingLogForm.remarks"
                  controls-position="right"
                  :min="0"
                  placeholder="备注"
                ></el-input-number>
              </el-form-item>
              <!-- 123 -->

              <el-form-item label="附件：" class="dRemarkList">
                <div class="uploadFileList">
                  <div class="ufSfz">
                    <div class="ufsTop">
                      <div @click="addFilesClick" class="addclickFjClass">
                        添加附件
                      </div>
                    </div>
                    <div class="dingFilesClass">
                      <div
                        v-for="(item, index) in dingLogForm.enclosure"
                        :key="index"
                      >
                        <div>
                          <div class="fileIcon">
                            <i class="el-icon-document"></i>
                          </div>
                          <div class="filesTitle">
                            <div>
                              {{ item.fileName }}
                            </div>
                            <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                          </div>
                        </div>
                        <div>
                          <div class="watchBtn" @click="watchFiles(item)">
                            预览
                          </div>
                          <div class="fileIcon2">
                            <i
                              class="el-icon-error"
                              @click="deleteFiles(index)"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="editCancel('dingLogRef')"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :disabled="disabled"
            :loading="loading"
            @click="editInfo('dingLogRef')"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <el-dialog
        title="设置"
        :visible.sync="wFormVisible"
        :close-on-click-modal="false"
        width="600px"
        @close="wCancel"
        class="view_change_title"
      >
        <el-checkbox-group
          v-model="checkedLists"
          @change="handleCheckedListChange"
        >
          <draggable animation="1000" v-model="myArray">
            <transition-group>
              <el-checkbox
                v-for="element in myArray"
                :key="element.value"
                :label="element.value"
                border
              >
                <span> {{ element.label }}</span>
              </el-checkbox>
            </transition-group>
          </draggable>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="wCancel">取 消</el-button>
          <el-button size="medium" type="primary" @click="wInfo"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="导入"
        :visible.sync="upFormVisible"
        :close-on-click-modal="false"
        @close="upCancel"
        class="uploadExcel"
        width="520px"
      >
        <el-form
          @submit.native.prevent
          ref="upFormRef"
          :label-position="labelPosition"
          :model="upForm"
          label-width="100px"
        >
          <el-form-item class="newtijiao" label="上传文件：">
            <div class="newcom">
              <img
                width="50"
                src="../../../assets/workbench/exceladd.png"
                alt
              />
              <p>请上传文件</p>
              <eupload
                @listenToChild="showe"
                :upImgList2="upImgList2"
                :licenceImg2="licenceImg2"
                :isShow2="isShow2"
              ></eupload>
            </div>
          </el-form-item>
          <div class="warn">
            <div>
              <p>注意：</p>
              <p>
                导入以下载的模板为准，否则将无法读取报表数据，重复上传数据将被覆盖
              </p>
              <span @click="derive" style="color: #3a99f2; cursor: pointer"
                >下载模板</span
              >
            </div>
          </div>
          <div style="margin-top: 20px; text-align: center">
            <el-button
              type="primary"
              plain
              size="medium"
              :loading="loading"
              @click="upSave"
              >确定</el-button
            >
            <el-button type="primary" plain size="medium" @click="upCancel"
              >取消</el-button
            >
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import eupload from '../../../components/excelUpload.vue';
import commonTable from '@/components/commonTable.vue';
import draggable from 'vuedraggable';
import { regionData, CodeToText } from 'element-china-area-data';
export default {
  name: 'projectApprovalList',
  components: { draggable, commonTable, eupload },
  data() {
    let validateuser = (rule, value, callback) => {
      if (value.name) {
        callback();
      } else {
        callback(new Error('请选择负责人'));
      }
    };
    return {
      x_total: 0,
      x_today_wcgl: 0,
      z_total: 0,
      z_today_wcgl: 0,
      allProjectList: [],
      disabled: false,
      isEdit: 1,
      labelPosition: 'right',
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      upFormVisible: false,
      upForm: { url: '' },
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      newTitle: '添加',
      dialogFormVisible: false,
      AllProjectPeopleVisible: false,
      branchList: [],
      formInline: {
        name: '',
        month: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        p_number: '',
        bstatus: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      projectStatus: [],
      AllSendPeopleVisible: false,
      AllPeopleVisible: false,
      weatherList: [
        { name: '晴天', value: '晴天' },
        { name: '大雨', value: '大雨' },
        { name: '小雨', value: '小雨' },
        { name: '下雪', value: '下雪' },
      ],
      priceStatus: [
        { name: '综合单价', value: '综合单价' },
        { name: '土层价', value: '土层价' },
        { name: '岩层价', value: '岩层价' },
        { name: '空孔价', value: '空孔价' },
      ],
      dingLogForm: {
        id: '',
        project_name: '',
        station: '',
        pile_diameter: '',
        designholedepth: '',
        yxz_length: '',
        actualholedepth: '',
        layer_length: '',
        layer_price: '',
        rock_length: '',
        rock_price: '',
        emptyhole_length: '',
        emptyhole_price: '',
        subsidy: '',
        subsidy_price: '',
        design_fl: '',
        actual_fl: '',
        filling_xs: '',
        total: 0,
        remarks: '',
        enclosure: [],

        img: [],
      },
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      dingLogRules: {
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur',
          },
        ],
        plan_start_riqi: [
          {
            required: true,
            message: '请选择日期',
            trigger: ['blur', 'change'],
          },
        ],

        plan_end_riqi: [
          {
            required: true,
            message: '请选择日期',
            trigger: ['blur', 'change'],
          },
        ],
        make_cost: [
          {
            required: true,
            message: '请输入工程造价',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择项目类型',
            trigger: ['blur', 'change'],
          },
        ],
        stalker_name: [
          {
            required: true,
            message: '请选择项目负责人',
            trigger: ['blur', 'change'],
          },
        ],
        project_status: [
          {
            required: true,
            message: '请选择项目状态',
            trigger: ['blur', 'change'],
          },
        ],
      },
      addressOptions: regionData,
      provinceList: [],
      isedit: false,
    };
  },
  watch: {
    dingLogForm: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true,
    },
  },
  methods: {
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    derive() {
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: 'http://oazhukuai.zzdingyun.com/public/1234.xls',
          name: '工程事件导入模板.xls', //定义下载文件名字
          onProgress: function (msg) {
            // 文件下载进度回调
          },
          onSuccess: function (result) {},
          onFail: function () {},
        });
      });
    },
    upCancel() {
      this.upForm.url = '';
      this.upImgList2 = '';
      this.licenceImg2 = '';
      this.isShow2 = [];
      this.upFormVisible = false;
    },
    upSave() {
      const _this = this;
      if (_this.upForm.url) {
        _this.$axios
          .post('/finance/import1', {
            url: _this.upForm.url,
          })
          .then(res => {
            if (res.data.code == 1) {
              _this.upForm.url = '';
              _this.upImgList2 = '';
              _this.licenceImg2 = '';
              _this.isShow2 = [];
              _this.upFormVisible = false;
              _this.$message({
                type: 'success',
                message: res.data.msg,
                duration: 1500,
              });
            } else {
              _this.$message({
                type: 'warning',
                message: res.data.msg,
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        _this.$message({
          type: 'warning',
          message: '请您先上传文件',
          duration: 1500,
        });
      }
    },
    exportIn() {
      this.upFormVisible = true;
      this.upForm.url = '';
      this.upImgList2 = '';
      this.licenceImg2 = '';
      this.isShow2 = ['1'];
    },
    //导入
    showe(url) {
      this.upForm.url = url;
    },

    handleCheckedListChange(value) {
      this.myArray.forEach(element => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map(item => item.value);
      this.myArray.forEach(item => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach(element => {
        if (element.check) {
          newT.push(element);
        }
      });

      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          if (this.isFooter == 1) {
            let newFArr = [];
            this.titleList.map(item => {
              this.newFooter.forEach(element => {
                if (element.value == item.value) {
                  newFArr.push(element);
                }
              });
            });
            this.footerNumList = JSON.parse(JSON.stringify(newFArr));
          }
          this.wFormVisible = false;
          setTimeout(() => {
            this.adjustWidth();
          }, 500);
        });
      } else {
        this.$message({
          type: 'warning',
          message: '不能为空！',
          duration: 1500,
        });
      }
    },
    viewShow() {
      this.wFormVisible = true;
    },

    sendTitleList() {
      this.$axios
        .post('/spread/editFiledCurrency', {
          name: 'project_info_register',
          mould_data: JSON.stringify(this.myArray),
        })
        .then(res => {
          if (res.data.code == 1) {
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    adjustWidth() {
      const _this = this;
      _this.$nextTick(() => {
        let newW = document.getElementsByClassName(
          'el-table__append-wrapper',
        )[0];
        _this.$utils.utilAdjustWidth(
          _this.$refs.table,
          newW,
          _this.$refs.sum_xiaoji,
          _this.$refs.sum_heji,
        );
      });
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (
        column.type != 'selection' &&
        column.label != '操作' &&
        column.label !== '打印'
      ) {
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: row.spread, //打开侧边栏的url
            title: '详情', //侧边栏顶部标题
            onSuccess: function (result) {},
            onFail: function () {
              setTimeout(() => {
                _this.getList();
              }, 5000);
              setTimeout(() => {
                _this.getList();
              }, 10000);
            },
          });
        });
      }
    },

    editClick(row, type) {
      const _this = this;
      _this.isedit = true;
      _this.isEdit = type;
      // _this.getCorpList();
      console.log(row);
      _this.$axios
        .post('/finance/report', { id: row })
        .then(res => {
          if (res.data.code == 1) {
            _this.newTitle = '编辑';
            _this.dialogFormVisible = true;
            _this.dingLogForm = res.data.content;
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
    //发起审批
    newAdd() {
      const _this = this;
      _this.isedit = false;
      _this.isEdit = 1;
      // _this.getCorpList();
      _this.newTitle = '添加';
      _this.dingLogForm.id = '';

      _this.dialogFormVisible = true;
      // _this.$axios
      //     .post('/finance/machinistlog')
      //     .then((res) => {
      //         if (res.data.code == 1) {
      //             _this.newTitle = '添加';
      //             _this.dingLogForm.id = '';
      //             _this.dingLogForm.process_code = res.data.data;

      //             _this.dialogFormVisible = true;
      //         } else {
      //             _this.$notify({
      //                 title: '提示',
      //                 message: res.data.msg,
      //                 type: 'error',
      //                 duration: 1500
      //             });
      //         }
      //     })
      //     .catch(function (error) {
      //         console.log(error);
      //     });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    resetClick() {
      this.formInline = {
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        p_number: '',
        bstatus: '',
      };
      this.getList();
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post('/finance/reportform', {
          current_page: this.currentPage,
          num: this.pagesize,
          month: this.formInline.month,
          project_name: this.formInline.name,
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
            this.x_total = res.data.x_total;
            this.x_today_wcgl = res.data.x_today_wcgl;
            this.z_total = res.data.z_total;
            this.z_today_wcgl = res.data.z_today_wcgl;

            this.$nextTick(() => {
              setTimeout(() => {
                this.adjustWidth();
              }, 200);
              if (document.body.scrollHeight > window.innerHeight) {
                setTimeout(() => {
                  this.adjustWidth();
                }, 1000);
              }
            });
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page_number;
              this.getList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map(item => {
        if (!item.id) return '';
        return item.id;
      });
    },

    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$axios
              .post('/finance/journaldel', {
                id: this.multSelectData,
              })
              .then(res => {
                if (res.data.code == 1) {
                  this.getList();
                  this.updateForm();
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
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
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      } else {
        this.$message({
          message: '请先勾选要删除的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    //还原列表
    backList() {
      this.$axios
        .post('/project/projectInfoRegisterReduction')
        .then(res => {
          if (res.data.code == 1) {
            this.getList();
            this.updateForm();
            this.$message({
              message: '已还原',
              type: 'success',
              duration: 1500,
            });
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
    //刷新
    updateForm() {
      const _this = this;
      _this.$axios
        .post('/project/projectInfoRegisterReductionEup')
        .then(res => {
          if (res.data.code == 1) {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post('/project/fileDownloadDel', { path: url })
        .then(res => {
          if (res.data.code == 1) {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/reportformdc', {
            project_name: _this.formInline.name,
            month: _this.formInline.month,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.content.path, //要下载的文件的url
                name: res.data.content.filename, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {
                  _this.deleteExport(res.data.data.path);
                },
                onFail: function () {
                  _this.deleteExport(res.data.data.path);
                },
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: 'warning',
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        _this.$message({
          message: '请先勾选要导出的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    updateList() {
      this.getList(1);
    },
    //填加审批人员
    addManyP(type) {
      const _this = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: _this.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 99, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: '', //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            if (type == 1) {
              result.users.forEach(item => {
                _this.dingLogForm.approval_userid.push(item);
              });
            } else if (type == 2) {
              result.users.forEach(item => {
                _this.dingLogForm.cc_userid.push(item);
              });
            } else if (type == 3) {
              result.users.forEach(item => {
                _this.dingLogForm.extend_five.push(item);
              });
            }
          },
          onFail: function (err) {
            console.log(err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },

    //删除人员
    handleClose(index, type) {
      switch (type) {
        case 1:
          this.dingLogForm.approval_userid.splice(index, 1);
          break;
        case 2:
          this.dingLogForm.cc_userid.splice(index, 1);
          break;
        case 3:
          this.dingLogForm.extend_five.splice(index, 1);
          break;
      }
    },
    //查看全部
    openAllPeople(type) {
      if (type == 1) {
        this.AllPeopleVisible = true;
      } else if (type == 2) {
        this.AllSendPeopleVisible = true;
      } else {
        this.AllProjectPeopleVisible = true;
      }
    },
    //添加文件
    addFilesClick() {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
          auth: 'add',
          fields: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.$store.commit('setSpaceId', res.data.data.toString());
            _this.selectFiles();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles() {
      const _this = this;

      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: _this.$store.state.spaceId,
          },
          space: {
            corpId: _this.$store.state.cid,
            spaceId: _this.$store.state.spaceId,
            max: 9,
          },
          file: { spaceId: _this.$store.state.spaceId, max: 9 },
          types: ['photo', 'file', 'space'],
          onSuccess: function (result) {
            //onSuccess将在文件上传成功之后调用

            result.data.forEach(item => {
              _this.dingLogForm.enclosure.push(item);
            });
          },
          onFail: function (err) {
            console.log(err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    //预览文件
    watchFiles(item) {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
          auth: 'download',
          fields: item.fileId,
        })
        .then(res => {
          if (res.data.code == 1) {
            dd.ready(function () {
              dd.biz.cspace.preview({
                corpId: _this.cid,
                spaceId: item.spaceId,
                fileId: item.fileId,
                fileName: item.fileName,
                fileSize: item.fileSize,
                fileType: item.fileType,
                onSuccess: function () {
                  //无，直接在native显示文件详细信息
                },
                onFail: function (err) {
                  // 无，直接在native页面显示具体的错误
                },
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //关闭覆盖层
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.loading = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.dingLogForm.cc_userid = [];
        this.dingLogForm.approval_userid = [];
        this.dingLogForm.enclosure = [];
        this.dingLogForm.extend_five = [];
        this.dingLogForm.stalker = { name: '', avatar: '', emplId: '' };
      });
    },
    editInfo(formName) {
      const _this = this;
      _this.disabled = true;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.dingLogForm));
          if (_this.isEdit == 1) {
            // if (newData.approval_userid.length > 0) {
            delete newData.stalker_name;

            _this.$axios
              .post('/finance/addgcsj', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.disabled = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.dingLogForm.cc_userid = [];
                  _this.dingLogForm.approval_userid = [];
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.disabled = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                _this.disabled = false;
                console.log(error);
              });
            // } else {
            //     _this.loading = false;
            //     _this.disabled = false;
            //     _this.$notify({
            //         title: '警告',
            //         message: '请选择申请人员',
            //         type: 'warning',
            //         duration: 1500
            //     });
            // }
          } else {
            console.log('外部数据');
            // delete newData.stalker_name;

            _this.$axios
              .post('/projecttwo/projectExternalEdit', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.disabled = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.dingLogForm.cc_userid = [];
                  _this.dingLogForm.approval_userid = [];
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.disabled = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                _this.disabled = false;
                console.log(error);
              });
          }
        } else {
          _this.loading = false;
          _this.disabled = false;
        }
      });
    },
    deleteFiles(index) {
      this.dingLogForm.enclosure.splice(index, 1);
    },
    getCorpList(name) {
      const _this = this;
      console.log(name);
      let newName = '';
      // if (
      //     _this.$store.state.cid ==
      //         'ding0ae1ff624a5a383e35c2f4657eb6378f' ||
      //     _this.$store.state.cid == 'dinga090000f57c90b3eee0f45d8e4f7c288'
      // ) {
      //     newName = '施工单位';
      // } else {
      //     newName = '内部单位'; //甲方单位
      // }
      _this.$axios
        .post('/projectfour/contactsUnit', { name })
        .then(res => {
          if (res.data.code == 1) {
            _this.branchList = res.data.data;
          } else {
            _this.$message({
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
    getProvinceList() {
      const _this = this;
      _this.$axios
        .post('/province/province')
        .then(res => {
          _this.provinceList = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro); //项目列表
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.$utils.checkding();
    this.projectType = JSON.parse(this.$store.state.pType);
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.projectStatus = JSON.parse(this.$store.state.pStatus);
    this.getProvinceList();
    this.getList();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
    planStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.dingLogForm.plan_end_riqi;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    planEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.dingLogForm.plan_start_riqi;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
  },
};
</script>
