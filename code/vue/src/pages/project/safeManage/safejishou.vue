/* * @Author: NorthWind * @Date: 2020-12-08 09:13:54 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-10 15:09:55 */
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
        :isShen="true"
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
            <!-- <el-button
                            v-if="
                                $store.state.cid ==
                                    'ding1b508a8102d46015ffe93478753d9884' ||
                                $store.state.cid ==
                                    'dinga090000f57c90b3eee0f45d8e4f7c288'
                            "
                            type="primary"
                            plain
                            size="medium"
                            icon="el-icon-upload2"
                            @click="exportIn"
                            >导入</el-button
                        >-->
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
            >
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
          border
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="weather"
            label="天气"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="now_date"
            label="日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="productiontoday"
            label="今日生产情况"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="spread1"
            label="设备编号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="start_yl"
            label="上机剩余油量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="add_yl"
            label="今日添加油量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="end_yl"
            label="下机剩余油量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="consume_yl"
            label="今日消耗油量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="start_days"
            label="开工累计天数"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="today_wcgl"
            label="今日完成根量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="today_wcms"
            label="今日完成米数"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="cumulative_wcgl"
            label="累计完成根量"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="cumulative_wcms"
            label="累计完成米数"
            align="left"
            :show-overflow-tooltip="true"
            min-width="110px"
          >
          </el-table-column>
          <el-table-column
            prop="tc_price"
            label="机长提成米单价"
            align="left"
            :show-overflow-tooltip="true"
            min-width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="lj_tc"
            label="累计提成"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="发起人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column label="审批状态" align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已同意</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >审批中</span
              >
              <span v-else-if="scope.row.status == '3'" style="color: #f16d6d"
                >已拒绝</span
              >
              <span v-else-if="scope.row.status == '4'" style="color: #d6d6d6"
                >已撤销</span
              >
              <span v-else style="color: #409eff">外部数据</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click="editClick(scope.row, 2)"
                >编辑</el-button
              >
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_yl"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_yl }}
                    </div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_gl"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_gl }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="x_ms"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ x_ms }}
                    </div>
                  </el-tooltip>
                </div>
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_yl"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_yl }}
                    </div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_gl"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_gl }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="z_ms"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ z_ms }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
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
              <el-form-item label="今日天气情况:" prop="weather">
                <el-select
                  v-model="dingLogForm.weather"
                  clearable
                  filterable
                  placeholder="请选择今日天气情况"
                >
                  <el-option
                    v-for="(item, index) in weatherList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="日期:" prop="now_date">
                <el-date-picker
                  @change="datechange"
                  v-model="dingLogForm.now_date"
                  :picker-options="planStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="今日生产情况:" prop="quantities">
                <el-input
                  v-model="dingLogForm.productiontoday"
                  placeholder="请输入今日生产情况"
                  maxlength="50"
                ></el-input>
              </el-form-item>
              <el-form-item label="设备编号:" prop="quality_level">
                <el-select
                  v-model="dingLogForm.quality_level"
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
              <el-form-item label="上机剩余油量(升):" prop="start_yl">
                <el-input
                  type="number"
                  v-model="dingLogForm.start_yl"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入上机剩余油量"
                ></el-input>
              </el-form-item>
              <el-form-item label="今日添加油量(升):" prop="add_yl">
                <el-input
                  type="number"
                  v-model="dingLogForm.add_yl"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入今日添加油量"
                ></el-input>
              </el-form-item>
              <el-form-item label="下机剩余油量(升):" prop="end_yl">
                <el-input
                  type="number"
                  v-model="dingLogForm.end_yl"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入下机剩余油量"
                ></el-input>
              </el-form-item>
              <el-form-item label="今日消耗油量(升):" prop="consume_yl">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.consume_yl"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入今日消耗油量"
                ></el-input>
              </el-form-item>
              <el-form-item label="开工累计天数:" prop="start_days">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.start_days"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入开工累计天数"
                ></el-input>
              </el-form-item>
              <el-form-item label="今日完成根量:" prop="today_wcgl">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.today_wcgl"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入今日完成根量"
                ></el-input>
              </el-form-item>
              <el-form-item label="今日完成米数:" prop="today_wcms">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.today_wcms"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入今日完成米数"
                ></el-input>
              </el-form-item>
              <el-form-item label="累计完成根量:" prop="cumulative_wcgl">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.cumulative_wcgl"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入累计完成根量"
                ></el-input>
              </el-form-item>
              <el-form-item label="累计完成米数:" prop="cumulative_wcms">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.cumulative_wcms"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入累计完成米数"
                ></el-input>
              </el-form-item>
              <el-form-item label="机长提成米单价(元/米):" prop="tc_price">
                <el-input
                  type="number"
                  v-model="dingLogForm.tc_price"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入机长提成米单价"
                ></el-input>
              </el-form-item>
              <el-form-item label="累计提成(元):" prop="lj_tc">
                <el-input
                  type="number"
                  :disabled="true"
                  v-model="dingLogForm.lj_tc"
                  controls-position="right"
                  :min="0"
                  placeholder="请输入累计提成"
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
              <!--  v-if="isEdit == 1" -->
              <div class="shenpi dRemarkList">
                <div>审批流程</div>
                <div class="line">
                  <div class="spList">
                    <div>
                      <div>审批人</div>
                      <p>请选择申请人</p>
                    </div>
                    <div class="addManeger">
                      <div
                        class="addMList"
                        v-if="dingLogForm.approval_userid.length > 3"
                      >
                        <div class="mdnList">
                          <div class="mdren" @click="openAllPeople(1)">
                            <span class="touxiang">
                              <i class="el-icon-s-custom"></i>
                            </span>
                          </div>
                          <p>查看全部</p>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div
                        class="addMList"
                        v-for="(
                          item, index
                        ) in dingLogForm.approval_userid.slice(0, 3)"
                        :key="index"
                      >
                        <div class="mdnList">
                          <div class="mdren">
                            <img v-if="item.avatar" :src="item.avatar" alt />
                            <span class="touxiang" v-else>{{
                              item.name.length <= 2
                                ? item.name
                                : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                          </div>
                          <p>{{ item.name }}</p>
                          <i
                            class="el-icon-error"
                            @click="handleClose(index, 1)"
                          ></i>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div class="addMList addMListLast">
                        <div class="mdnList">
                          <div class="mdren" @click="addManyP(1)">
                            <span class="touxiang">
                              <!-- <span class="touxiangdian">*</span> -->
                              <i class="el-icon-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="spList">
                    <div>
                      <div>抄送人</div>
                      <p>请选择抄送人</p>
                    </div>
                    <div class="addManeger">
                      <div
                        class="addMList"
                        v-if="dingLogForm.cc_userid.length > 3"
                      >
                        <div class="mdnList">
                          <div class="mdren" @click="openAllPeople(2)">
                            <span class="touxiang">
                              <i class="el-icon-s-custom"></i>
                            </span>
                          </div>
                          <p>查看全部</p>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div
                        class="addMList"
                        v-for="(item, index) in dingLogForm.cc_userid.slice(
                          0,
                          3,
                        )"
                        :key="index"
                      >
                        <div class="mdnList">
                          <div class="mdren">
                            <img v-if="item.avatar" :src="item.avatar" alt />
                            <span class="touxiang" v-else>{{
                              item.name.length <= 2
                                ? item.name
                                : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                          </div>
                          <p>{{ item.name }}</p>
                          <i
                            class="el-icon-error"
                            @click="handleClose(index, 2)"
                          ></i>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div class="addMList addMListLast">
                        <div class="mdnList">
                          <div class="mdren" @click="addManyP(2)">
                            <span class="touxiang">
                              <i class="el-icon-plus"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="shenpiThree">
                    <span><span></span></span>
                  </div>
                  <div class="shenpiFore">
                    <span><span></span></span>
                  </div>
                </div>
              </div>
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
        title="全部审批人员"
        :append-to-body="true"
        :visible.sync="AllPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingLogForm.approval_userid.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.approval_userid"
            :key="index"
          >
            <div class="mdnList">
              <div class="mdren">
                <img v-if="item.avatar" :src="item.avatar" alt />
                <span class="touxiang" v-else>{{
                  item.name.length <= 2
                    ? item.name
                    : item.name.substr(item.name.length - 2, 2)
                }}</span>
              </div>
              <p>{{ item.name }}</p>
              <i class="el-icon-error" @click="handleClose(index, 1)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(1)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="全部抄送人员"
        :append-to-body="true"
        :visible.sync="AllSendPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingLogForm.cc_userid.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.cc_userid"
            :key="index"
          >
            <div class="mdnList">
              <div class="mdren">
                <img v-if="item.avatar" :src="item.avatar" alt />
                <span class="touxiang" v-else>{{
                  item.name.length <= 2
                    ? item.name
                    : item.name.substr(item.name.length - 2, 2)
                }}</span>
              </div>
              <p>{{ item.name }}</p>
              <i class="el-icon-error" @click="handleClose(index, 2)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(2)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
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
import commonSearch from '@/components/commonSearch.vue';

import draggable from 'vuedraggable';
import { regionData, CodeToText } from 'element-china-area-data';
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
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'name',
        },
        {
          labelName: '开始时间',
          labelData: 'start_time',
        },
        {
          labelName: '结束时间',
          labelData: 'end_time',
        },
        {
          labelName: '设备编号',
          labelData: 'number',
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
      z_gl: 0,
      x_gl: 0,
      z_ms: 0,
      x_ms: 0,
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
        number: '',
        name: '',
        type: '',
        status: '',
        start_time: '',
        end_time: '',
        p_number: '',
        bstatus: '',
        send_name: '',
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
        quality_level: '',
        process_code: '',
        project_name: '',
        weather: '',
        now_date: '',
        productiontoday: '',
        start_yl: '',
        end_yl: '',
        add_yl: '',
        consume_yl: '',
        start_days: '',
        today_wcgl: '',
        today_wcms: '',
        cumulative_wcgl: '',
        cumulative_wcms: '',
        tc_price: '',
        lj_tc: '',
        enclosure: [],

        approval_userid: [],
        cc_userid: [],

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
            message: '请选择项目名称',
            trigger: 'blur',
          },
        ],
        quality_level: [
          {
            required: true,
            message: '请选择设备编号',
            trigger: 'blur',
          },
        ],
        now_date: [
          {
            required: true,
            message: '选择日期',
            trigger: 'blur',
          },
        ],
        start_yl: [
          {
            required: true,
            message: '请输入上机剩余油量',
            trigger: 'blur',
          },
        ],
        add_yl: [
          {
            required: true,
            message: '请输入今日添加油量',
            trigger: 'blur',
          },
        ],
        end_yl: [
          {
            required: true,
            message: '请输入下机剩余油量',
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
        console.log(newValue);
        if (newValue.start_yl && newValue.end_yl && newValue.add_yl) {
          // this.dingLogForm.consume_yl =
          var aaa = Number(newValue.start_yl) + Number(newValue.add_yl);
          var bbb = Number(aaa) - Number(newValue.end_yl);
          console.log(bbb);
          this.dingLogForm.consume_yl = bbb;
          this.dingLogForm.lj_tc = newValue.cumulative_wcms * newValue.tc_price;
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
    datechange(value) {
      console.log(value);
      const _this = this;
      _this.$axios
        .post('/finance/zdjssz', {
          project_name: _this.dingLogForm.project_name,
          tj_data: value,
        })
        .then(res => {
          _this.dingLogForm.start_days = res.data.list.start_days;
          _this.dingLogForm.today_wcgl = res.data.list.today_wcgl;
          _this.dingLogForm.today_wcms = res.data.list.today_wcms;
          _this.dingLogForm.cumulative_wcgl = res.data.list.cumulative_wcgl;

          _this.dingLogForm.cumulative_wcms = res.data.list.cumulative_wcms;
          _this.dingLogForm.lj_tc = res.data.list.lj_tc;
          _this.shebeiblist = res.data.list.quality_level;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    prochange(value) {
      console.log(value);
      const _this = this;
      _this.$axios
        .post('/finance/zdjssz', {
          project_name: value,
          tj_data: _this.dingLogForm.now_date,
        })
        .then(res => {
          _this.dingLogForm.start_days = res.data.list.start_days;
          _this.dingLogForm.today_wcgl = res.data.list.today_wcgl;
          _this.dingLogForm.today_wcms = res.data.list.today_wcms;
          _this.dingLogForm.cumulative_wcgl = res.data.list.cumulative_wcgl;

          _this.dingLogForm.cumulative_wcms = res.data.list.cumulative_wcms;
          _this.dingLogForm.lj_tc = res.data.list.lj_tc;
          _this.shebeiblist = res.data.list.quality_level;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    derive() {
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: 'http://dingzhukuai.zzdingyun.com/public/file/立项信息登记导入模板.xls',
          name: '立项信息登记导入模板.xls', //定义下载文件名字
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
          .post('/projecttwo/projectImport', {
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
      _this.$axios
        .post('/finance/journalhx', {
          id: row.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.newTitle = '编辑';
            _this.dialogFormVisible = true;
            _this.dingLogForm = res.data.content;

            _this.gitcode();
            // _this.$nextTick(() => {
            //     _this.dingLogForm = {
            //         process_code: '',
            //         project_name: '',
            //         weather: '',
            //         now_date: '',
            //         productiontoday: '',
            //         start_yl: '',
            //         end_yl: '',
            //         add_yl: '',
            //         consume_yl: '',
            //         start_days: '',
            //         today_wcgl: '',
            //         today_wcms: '',
            //         cumulative_wcgl: '',
            //         cumulative_wcms: '',
            //         tc_price: '',
            //         lj_tc: '',
            //         enclosure: [],

            //         approval_userid: [],
            //         cc_userid: [],

            //         img: []
            //     };
            //     let newGetData = JSON.parse(JSON.stringify(row));

            //     _this.dingLogForm = JSON.parse(
            //         JSON.stringify(newGetData)
            //     );
            //     _this.dingLogForm.process_code = res.data.data;
            // });
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
      _this.$axios
        .post('/finance/machinistlog')
        .then(res => {
          if (res.data.code == 1) {
            _this.newTitle = '添加';
            _this.dingLogForm.id = '';
            _this.dingLogForm.process_code = res.data.data;

            _this.dialogFormVisible = true;
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
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    resetClick() {
      this.formInline = {
        name: '',
        type: '',
        number: '',
        status: '',
        start_time: '',
        end_time: '',
        p_number: '',
        bstatus: '',
        send_name: '',
      };
      this.getList();
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post('/finance/journallist', {
          current_page: this.currentPage,
          num: this.pagesize,
          project_name: this.formInline.name,
          start_time: this.formInline.start_time,
          end_time: this.formInline.end_time,
          status: this.formInline.status,
          number: this.formInline.number,
          send_name: this.formInline.send_name,
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
            this.z_yl = res.data.z_yl;
            this.x_yl = res.data.x_yl;
            this.z_gl = res.data.z_gl; //总计今日完成根量
            this.x_gl = res.data.x_gl; //小计今日完成根量
            this.z_ms = res.data.z_ms; //总计今日完成米数
            this.x_ms = res.data.x_ms; //小计今日完成米数
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
          .post('/finance/journal_dc', {
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
    addSingle() {
      const _this = this;
      document.getElementById('addinput').blur();
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: _this.$store.state.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
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
            _this.dingLogForm.stalker = result.users[0];
            _this.dingLogForm.stalker_name = result.users[0].name;
            _this.$set(_this.dingLogForm, 'stalker_name', result.users[0].name);
            _this.$nextTick(() => {
              _this.dingLogForm = JSON.parse(JSON.stringify(_this.dingLogForm));
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
    gitcode() {
      const _this = this;
      _this.$axios
        .post('/finance/machinistlog')
        .then(res => {
          if (res.data.code == 1) {
            _this.dingLogForm.process_code = res.data.data;
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
    editInfo(formName) {
      const _this = this;

      _this.disabled = true;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.dingLogForm));
          // if (_this.isEdit == 1) {

          delete newData.stalker_name;

          _this.$axios
            .post('/finance/jzmouldadd', newData)
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
          //     console.log('外部数据');
          //     // delete newData.stalker_name;

          //     _this.$axios
          //         .post('/finance/machinistlog')
          //         .then((res) => {
          //             if (res.data.code == 1) {
          //                 _this.getList();
          //                 _this.loading = false;
          //                 _this.disabled = false;
          //                 _this.dialogFormVisible = false;
          //                 _this.$refs[formName].resetFields();
          //                 _this.dingLogForm.cc_userid = [];
          //                 _this.dingLogForm.approval_userid = [];
          //                 _this.$message({
          //                     message: res.data.msg,
          //                     type: 'success',
          //                     duration: 1500
          //                 });
          //             } else {
          //                 _this.loading = false;
          //                 _this.disabled = false;
          //                 _this.$message({
          //                     message: res.data.msg,
          //                     type: 'warning',
          //                     duration: 1500
          //                 });
          //             }
          //         })
          //         .catch(function (error) {
          //             _this.loading = false;
          //             _this.disabled = false;
          //             console.log(error);
          //         });
          // }
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
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.formInline.end_time;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.formInline.start_time;
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
