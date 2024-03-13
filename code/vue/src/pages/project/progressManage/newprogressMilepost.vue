/* * @Author: NorthWind * @Date: 2020-12-08 09:13:54 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 14:38:21 */
<template>
  <div id="projectApprovalList">
    <!-- 立项项目列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="false"
      ></commonSearch>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            >
          </div>
          <div class="mmbRight">
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-upload2"
              @click="exportIn"
              >导入</el-button
            >
            <el-button
                            type="primary"
                            plain
                            size="medium"
                            icon="el-icon-download"
                            @click="exportList"
                            >导出</el-button
                        >
            <!-- 
                        <el-button
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
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="tj_date"
            label="日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="spread2"
            label="设备编号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="station"
            label="桩号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="pile_diameter"
            label="桩径"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="designholedepth"
            label="设计孔深"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="yxz_length"
            label="有效桩长"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="actualholedepth"
            label="实际孔深"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="layer_length"
            label="土层桩长"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="layer_price"
            label="土层单价"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="rock_length"
            label="岩层桩长"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="rock_price"
            label="岩层单价"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="emptyhole_length"
            label="空孔桩长"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="emptyhole_price"
            label="空孔单价"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="subsidy"
            label="孤石/溶洞补贴"
            align="left"
            :show-overflow-tooltip="true"
            min-width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="subsidy_price"
            label="补贴单价"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="design_fl"
            label="设计砼方量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="actual_fl"
            label="实际砼方量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="filling_xs"
            label="充盈系数"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计总价"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="spread1"
            label="发起人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="editClick(scope.row.id)"
                >编辑</el-button
              >
              <!-- <el-button
                type="text"
                size="mini"
                @click.stop="
                  printPDF(scope.row.id).catch(err => {
                    console.log(err);
                  })
                "
                >打印</el-button
              > -->
            </template>
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_shejiks"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_shejiks }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_shijiks"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_shijiks }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_tucengc"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_tucengc }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_yancengc"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_yancengc }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_kkc"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_kkc }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
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
                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_shejiks"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_shejiks }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_shijiks"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_shijiks }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_tucengc"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_tucengc }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_yancengc"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_yancengc }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_yancengc"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_kkc }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <!-- <div class="sum_footer_unit"></div> -->
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
              <el-form-item label="项目名称:" prop="project_name">
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
                    :label="item.project_name"
                    :value="item.project_name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期:" prop="tj_date">
                <el-date-picker
                  v-model="dingLogForm.tj_date"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="设备编号:" prop="device_number">
                <el-select
                  v-model="dingLogForm.device_number"
                  clearable
                  filterable
                  placeholder="请选择设备编号"
                >
                  <el-option
                    v-for="(item, index) in shebeiblist"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="桩号:" prop="station">
                <el-input
                  v-model="dingLogForm.station"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入桩号"
                ></el-input>
              </el-form-item>
              <el-form-item label="桩径(米):" prop="pile_diameter">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.pile_diameter"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入桩径"
                ></el-input>
                <!-- <el-input-number
                                    :precision="2"
                                    v-model="dingLogForm.pile_diameter"
                                    controls-position="right"
                                    :min="0"
                                    placeholder="请输入桩径"
                                ></el-input-number> -->
              </el-form-item>
              <el-form-item label="设计孔深(米):" prop="designholedepth">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.designholedepth"
                  controls-position="right"
                  placeholder="请输入设计孔深"
                ></el-input>
              </el-form-item>
              <el-form-item label="有效桩长(米):" prop="yxz_length">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.yxz_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入有效桩长"
                ></el-input>
              </el-form-item>
              <el-form-item label="实际孔深(米):" prop="actualholedepth">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.actualholedepth"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入实际孔深"
                ></el-input>
              </el-form-item>
              <el-form-item label="土层桩长(米):" prop="layer_length">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.layer_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入土层桩长"
                ></el-input>
              </el-form-item>
              <el-form-item label="土层单价(元/米):" prop="layer_price">
                <el-input
                  type="number"
                  :disabled="isEdit123"
                  :precision="2"
                  v-model="dingLogForm.layer_price"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入土层单价"
                ></el-input>
              </el-form-item>
              <el-form-item label="岩层桩长(米):" prop="rock_length">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.rock_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入岩层桩长"
                ></el-input>
              </el-form-item>
              <el-form-item label="岩层单价(元/米):" prop="rock_price">
                <el-input
                  type="number"
                  :disabled="isEdit123"
                  :precision="2"
                  v-model="dingLogForm.rock_price"
                  controls-position="right"
                  :min="0"
                  placeholder="岩层单价"
                ></el-input>
              </el-form-item>
              <el-form-item label="空孔桩长(米):" prop="emptyhole_length">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.emptyhole_length"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入空孔桩长"
                ></el-input>
              </el-form-item>
              <el-form-item label="空孔单价(元/米):" prop="emptyhole_price">
                <el-input
                  type="number"
                  :disabled="isEdit123"
                  :precision="2"
                  v-model="dingLogForm.emptyhole_price"
                  controls-position="right"
                  :min="0"
                  placeholder="空孔单价"
                ></el-input>
              </el-form-item>
              <el-form-item label="孤石/溶洞记录(米):" prop="subsidy">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.subsidy"
                  controls-position="right"
                  :min="0"
                  placeholder="孤石/溶洞记录价"
                ></el-input>
              </el-form-item>
              <el-form-item label="补贴单价(元/米):" prop="subsidy_price">
                <el-input
                  :disabled="isEdit123"
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.subsidy_price"
                  controls-position="right"
                  :min="0"
                  placeholder="补贴单价"
                ></el-input>
              </el-form-item>
              <el-form-item label="设计方量:" prop="design_fl">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.design_fl"
                  controls-position="right"
                  :min="0"
                  placeholder="设计方量"
                ></el-input>
              </el-form-item>
              <el-form-item label="实际方量:" prop="actual_fl">
                <el-input
                  type="number"
                  :precision="2"
                  v-model="dingLogForm.actual_fl"
                  controls-position="right"
                  :min="0"
                  placeholder="实际方量"
                ></el-input>
              </el-form-item>
              <el-form-item label="充盈系数:" prop="filling_xs">
                <el-input
                  type="number"
                  :disabled="true"
                  :precision="2"
                  v-model="dingLogForm.filling_xs"
                  controls-position="right"
                  :min="0"
                  placeholder="充盈系数"
                ></el-input>
              </el-form-item>
              <el-form-item label="合计总价(元):" prop="total">
                <el-input
                  type="number"
                  :disabled="true"
                  :precision="2"
                  v-model="dingLogForm.total"
                  controls-position="right"
                  :min="0"
                  placeholder="合计总价"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="remarks">
                <el-input
                  v-model="dingLogForm.remarks"
                  controls-position="right"
                  :min="0"
                  placeholder="备注"
                ></el-input>
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
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'projectApprovalList',
  components: { draggable, commonTable, eupload, commonSearch },
  data() {
    let validateuser = (rule, value, callback) => {
      if (value.name) {
        callback();
      } else {
        callback(new Error('请选择负责人'));
      }
    };
    return {
      isEdit123: false,
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },
        {
          labelName: '开始时间',
          labelData: 'startTime',
        },
        {
          labelName: '结束时间',
          labelData: 'endTime',
        },
        {
          labelName: '发起人',
          labelData: 'name',
        },

        {
          labelName: '审批状态',
          labelData: 'status',
        },
      ],
      shebeiblist: [],
      z_total: 0,
      x_total: 0,
      z_yl: 0,
      x_yl: 0,
      z_shejiks: 0,
      x_shejiks: 0,
      z_shijiks: 0,
      x_shijiks: 0,
      z_tucengc: 0,
      x_tucengc: 0,
      z_yancengc: 0,
      x_yancengc: 0,
      z_kkc: 0,
      x_kkc: 0,
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
        value1: '',
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        p_number: '',
        bstatus: '',
        send_name: '',
        send_userid: '',
      },
      printable: false,
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
        device_number: '',
        tj_date: '',
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
        filling_xs: 0,

        remarks: '',
        enclosure: [],

        img: [],
      },
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      dingLogRules: {
        project_name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur',
          },
        ],
        station: [
          {
            required: true,
            message: '请输入桩号',
            trigger: 'blur',
          },
        ],
        pile_diameter: [
          {
            required: true,
            message: '请输入桩径',
            trigger: 'blur',
          },
        ],
        designholedepth: [
          {
            required: true,
            message: '请输入设计孔深',
            trigger: 'blur',
          },
        ],
        actualholedepth: [
          {
            required: true,
            message: '请输入实际孔深',
            trigger: 'blur',
          },
        ],
        layer_length: [
          {
            required: true,
            message: '请输入土层桩长',
            trigger: 'blur',
          },
        ],
        layer_price: [
          {
            required: true,
            message: '请输入土层桩长',
            trigger: 'blur',
          },
        ],
        tj_date: [
          {
            required: true,
            message: '选择日期',
            trigger: 'blur',
          },
        ],
        device_number: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur',
          },
        ],
        rock_length: [
          {
            required: true,
            message: '请输入岩层桩长',
            trigger: 'blur',
          },
        ],
        emptyhole_length: [
          {
            required: true,
            message: '请输入空孔桩长',
            trigger: 'blur',
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
        if (this.dialogFormVisible == true) {
          var aa1 = newValue.layer_length * newValue.layer_price;
          var aa2 = newValue.rock_length * newValue.rock_price;
          var aa3 = newValue.emptyhole_length * newValue.emptyhole_price;
          var aa4 = newValue.subsidy * newValue.subsidy_price;
          const newto = (
            Number(aa1) +
            Number(aa2) +
            Number(aa3) +
            Number(aa4)
          ).toFixed(2);
          this.dingLogForm.total = isNaN(newto) ? 0 : newto;

          if (Number(newValue.design_fl) == 0) {
            this.dingLogForm.filling_xs = 0;
          } else {
            let newdata = (newValue.actual_fl / newValue.design_fl).toFixed(2);
            this.dingLogForm.filling_xs = isNaN(newdata) ? 0 : newdata;
          }

          console.log(newValue);
        }
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
    prochange() {
      const _this = this;
      _this.$axios
        .post('/finance/zdjssz', {
          project_name: _this.dingLogForm.project_name,
        })
        .then(res => {
          _this.shebeiblist = res.data.list.quality_level;
          // _this.$store.state.cid == 'ding6623028c672c42cb35c2f4657eb6378f' ||

          //   if (
          //       _this.$store.state.cid == 'ding6623028c672c42cb35c2f4657eb6378f' ||
          //     _this.$store.state.cid == 'ding958cdfb717ce33bb35c2f4657eb6378f'
          //   ) {
          //     _this.isEdit123 = true;
          //     _this.dingLogForm.layer_price = res.data.list.layer_price;
          //     _this.dingLogForm.rock_price = res.data.list.stratum_price; //岩层单价(元/米)
          //     _this.dingLogForm.emptyhole_price = res.data.list.hole_price; //空孔单价(元/米
          //     _this.dingLogForm.subsidy_price = res.data.list.subsidy_price; //补贴单价(元/米)
          //   }
        })
        .catch(function (error) {
          console.log(error);
        });
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
    async getPrintableStatus() {
      const res = await this.$axios.post('/finance/control_display', {
        tableName: 'xie_jindu',
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === '1';
      }
    },

    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post('/finance/dc_pdf', {
        tableName: 'xie_jindu',
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
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
      _this.dingLogForm.filling_xs = 0;
      // _this.$refs['dingLogRef'].resetFields();
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

      if (this.formInline.value1) {
        this.getList(
          2,
          this.chande(this.formInline.value1[0]),
          this.chande(this.formInline.value1[1]),
        );
      } else {
        this.getList();
      }
    },
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
    resetClick() {
      this.formInline = {
        value1: '',
        project_name: '',
        name: '',
        type: '',
        status: '',
        start_time: '',
        end_time: '',
        p_number: '',
        bstatus: '',
      };
      this.getList();
    },
    //获取列表
    getList(ntype, start_time, end_time) {
      this.$axios
        .post('/finance/eventlist', {
          current_page: this.currentPage,
          num: this.pagesize,
          project_name: this.formInline.project_name,
          name: this.formInline.name,
          start_time: this.formInline.startTime,
          end_time: this.formInline.endTime,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
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
            this.z_total = res.data.z_total;
            this.x_total = res.data.x_total;

            this.z_shejiks = res.data.z_shejiks; //总计设计孔深
            this.x_shejiks = res.data.x_shejiks; //小计设计孔深
            this.z_shijiks = res.data.z_shijiks; // 总计实际孔深
            this.x_shijiks = res.data.x_shijiks; //小计实际孔深
            this.z_tucengc = res.data.z_tucengc; // 总计土层柱长
            this.x_tucengc = res.data.x_tucengc; //小计土层柱长
            this.z_yancengc = res.data.z_yancengc; // 总计岩层桩长
            this.x_yancengc = res.data.x_yancengc; // 小计岩层桩长
            this.z_kkc = res.data.z_kkc; //总计岩层桩长
            this.x_kkc = res.data.x_kkc; // 小计岩层桩长

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
              .post('/finance/gcdel', {
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
          .post('/task/event_dc', {
            id: _this.multSelectData,
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
      console.log(
        '//*',
        this.dingLogForm.filling_xs,
        '------',
        this.dingLogForm.total,
      );
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
              .post('/finance/update', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.disabled = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();

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
    getallProjectList() {
      const _this = this;
      _this.$axios
        .post('/finance/getstart_pro')
        .then(res => {
          _this.allProjectList = res.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getallProjectList();
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
    // this.datechange();
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
