<template>
  <div id="workRealName">
    <!-- 劳务实名制列表 -->
    <div class="main">
      <div class="header">
        <div
          class="headerContent"
          style="
            display: flex;
            justify-content: space-between;
            line-height: 40px;
          "
        >
          <div>{{ getBzname }}</div>
          <div style="display: flex; justify-content: flex-end">
            <el-button type="primary" size="medium" @click="goTotal"
              >统计</el-button
            >
            <el-button type="primary" plain size="medium" @click="goback"
              >返回</el-button
            >
          </div>
        </div>
      </div>
      <div class="mainContent">
        <el-row class="maincBtn">
          <el-calendar
            v-model="recordTime1"
            style="width: 50%; margin: 0 auto; min-width: 500px"
          >
            <template slot="dateCell" slot-scope="{ date, data }">
              <div
                class="mmchange"
                @click="changeList(data.day)"
                style="height: 100%"
              >
                <p
                  class="mmchDay"
                  :class="data.isSelected ? 'is-selected' : ''"
                >
                  {{ data.day.split('-').slice(2).join('-') }}
                  {{ data.isSelected ? '✔️' : '' }}
                </p>
                <div
                  style="text-align: center; color: #f93406"
                  v-for="(item, index) in proList"
                  :key="index"
                  v-if="item.day == data.day"
                  class="mmchNum"
                >
                  <p v-if="item.num > 0">+{{ item.num }}</p>

                  <span v-if="item.sign == '1'" class="jie"></span>
                </div>
              </div>
            </template>
          </el-calendar>
        </el-row>

        <div class="wrUserList">
          <div class="wrtop">
            <div class="wrtd">
              <p>未记工工人({{ noRecordList.length }}人)</p>
            </div>
            <el-button type="primary" plain size="small" @click="allCheck"
              >全选</el-button
            >
            <el-button type="primary" plain size="small" @click="goRecord"
              >去记工</el-button
            >
          </div>
          <div class="wrbottom">
            <div class="wrbC">
              <div
                v-for="(item, index) in noRecordList"
                :key="index"
                :class="item.flag == true ? 'noREclass' : ''"
                @click="selectUser(item, index)"
              >
                <div>
                  {{
                    item.name.length <= 2
                      ? item.name
                      : item.name.substr(item.name.length - 2, 2)
                  }}
                </div>
                <p>{{ item.name }}</p>
              </div>
              <div @click="newAdd">
                <div><i class="el-icon-plus"></i></div>
                <p>添加</p>
              </div>
            </div>
          </div>
        </div>
        <div class="wrUserList">
          <div class="wrtop">
            <div class="wrtd">
              <p>已记工工人({{ recordData.length }}人)</p>
            </div>
          </div>
          <div class="wrbottom">
            <div class="wrbCT">
              <el-table
                :border="true"
                :data="recordData"
                border
                style="width: 100%"
              >
                <el-table-column prop="name" label="姓名" align="left">
                </el-table-column>

                <el-table-column label="工钱信息" align="left">
                  <el-table-column prop="duration" label="点工" align="left">
                  </el-table-column>
                  <el-table-column label="工钱（元）" align="left">
                    <template slot-scope="scope">
                      <span
                        style="color: #409eff; cursor: pointer"
                        @click="openJ(scope.row.jg_url)"
                        >{{ scope.row.wages }}</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column label="工钱操作" align="left">
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.wages"
                        style="color: red; cursor: pointer"
                        @click="deleteJ(scope.row.jg_id, 2)"
                        >删除</span
                      >
                      <span
                        v-if="scope.row.wages"
                        style="
                          color: #409eff;
                          cursor: pointer;
                          margin-left: 6px;
                        "
                        @click="editJ(scope.row, 2)"
                        >编辑</span
                      >
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="借支信息" align="left">
                  <el-table-column
                    label="借支（元）"
                    align="left"
                    class-name="oIndColun"
                  >
                    <template slot-scope="scope">
                      <div class="oInClass">
                        <div
                          style="color: #409eff; cursor: pointer"
                          v-for="(item, index) in scope.row.skill"
                          :key="index"
                          @click="openR(item.extend_first)"
                        >
                          {{ item.jz_money }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="借支操作"
                    align="left"
                    class-name="oIndColun"
                  >
                    <template slot-scope="scope">
                      <div class="oInClass">
                        <div
                          style="color: #409eff; cursor: pointer"
                          v-for="(item, index) in scope.row.skill"
                          :key="index"
                        >
                          <span
                            style="color: red; cursor: pointer"
                            @click="deleteJ(item.jz_id, 1)"
                            >删除</span
                          >
                          <span
                            style="
                              color: #409eff;
                              cursor: pointer;
                              margin-left: 6px;
                            "
                            @click="editJ(scope.row, 1, item.jz_id)"
                            >编辑</span
                          >
                        </div>
                      </div>
                      <!-- <el-button
                                                v-if="
                                                    scope.row.skill.length > 0
                                                "
                                                type="danger"
                                                size="medium"
                                                @click="deleteJ(scope.row, 2)"
                                                >删除</el-button
                                            > -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="借支审批状态"
                    align="left"
                    class-name="oIndColun"
                  >
                    <template slot-scope="scope">
                      <div class="oInClass">
                        <div
                          v-for="(item, index) in scope.row.skill"
                          :key="index"
                        >
                          <span v-if="item.status == '2'" style="color: #17c298"
                            >已同意</span
                          >
                          <span
                            v-else-if="item.status == '1'"
                            style="color: #e8a54c"
                            >审批中</span
                          >
                          <span v-else style="color: #f16d6d">已拒绝</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :title="newDialogTitle"
        :visible.sync="addFormVisible"
        @close="titleCancel('addEditForm')"
        width="600px"
      >
        <el-form
          @submit.native.prevent
          :model="addUserForm"
          label-width="120px"
          :rules="addUserFormRules"
          ref="addEditForm"
          label-position="right"
        >
          <div>
            <!-- <calendar></calendar> -->
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="addUserForm.name"
                maxlength="10"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="工种：" prop="work_type">
              <el-select
                v-model="addUserForm.work_type"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in workTypeList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工资(元/工)：" prop="wages">
              <el-input-number
                v-model="addUserForm.wages"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="titleSave('addEditForm')"
              >确定</el-button
            >
            <el-button @click="titleCancel('addEditForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="添加"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="600px"
        @close="editCancel('dingLogRef')"
        class="phDialog"
      >
        <div class="phdMain">
          <div class="cDrawerContent">
            <div
              v-if="upUser.length < 2"
              style="text-align: center; margin-bottom: 22px"
            >
              <el-radio-group v-model="reType">
                <el-radio-button label="记工"></el-radio-button>
                <el-radio-button label="借支"></el-radio-button>
              </el-radio-group>
            </div>
            <el-form
              @submit.native.prevent
              :model="dingLogForm"
              :rules="dingLogRules"
              :label-position="right"
              ref="dingLogRef"
              label-width="130px"
            >
              <el-form-item
                label="点工："
                prop="duration"
                class="dRemarkList"
                v-if="reType == '记工'"
              >
                <el-select
                  v-model="dingLogForm.duration"
                  filterable
                  placeholder="请选择点工"
                >
                  <el-option label="0.5个工" value="0.5"> </el-option>
                  <el-option label="1个工" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="金额(元)："
                prop="money"
                class="dRemarkList"
                v-if="reType == '借支'"
              >
                <el-input-number
                  v-model="dingLogForm.money"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="备注：" prop="remarks" class="dRemarkList">
                <el-input
                  type="textarea"
                  v-model="dingLogForm.remarks"
                  maxlength="50"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="附件：" class="dRemarkList">
                <div class="uploadFileList">
                  <div class="ufSfz">
                    <div class="ufsTop">
                      <!-- <div>身份证</div> -->
                      <div @click="addFilesClick(1)" class="addclickFjClass">
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
                              @click="deleteFiles(index, 1)"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <div class="shenpi dRemarkList">
                <div>审批流程：</div>
                <div class="line">
                  <div class="spList">
                    <div>
                      <div>
                        <span style="color: red">* &nbsp;&nbsp;</span>审批人
                      </div>
                      <p>请选择申请人</p>
                    </div>
                    <div class="addManeger">
                      <div
                        class="addMList"
                        v-if="dingLogForm.approver.length > 3"
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
                        v-for="(item, index) in dingLogForm.approver.slice(
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
                        v-if="dingLogForm.copyer.length > 3"
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
                        v-for="(item, index) in dingLogForm.copyer.slice(0, 3)"
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
            :loading="loading"
            @click="editInfo('dingLogRef')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="编辑"
        :visible.sync="editFormVisible"
        :close-on-click-modal="false"
        width="600px"
        @close="editOnCancel('dingFormRef')"
        class="phDialog"
      >
        <div class="phdMain">
          <div class="cDrawerContent">
            <el-form
              @submit.native.prevent
              :model="dingEditForm"
              :rules="dingEditRules"
              :label-position="right"
              ref="dingFormRef"
              label-width="130px"
            >
              <el-form-item
                label="点工："
                prop="duration"
                class="dRemarkList"
                v-if="currentType == 2"
              >
                <el-select
                  v-model="dingEditForm.duration"
                  filterable
                  placeholder="请选择点工"
                >
                  <el-option label="0.5个工" value="0.5"> </el-option>
                  <el-option label="1个工" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="金额(元)："
                prop="money"
                class="dRemarkList"
                v-if="currentType == 1"
              >
                <el-input-number
                  v-model="dingEditForm.money"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="备注：" prop="remarks" class="dRemarkList">
                <el-input
                  type="textarea"
                  v-model="dingEditForm.remarks"
                  maxlength="50"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="附件：" class="dRemarkList">
                <div class="uploadFileList">
                  <div class="ufSfz">
                    <div class="ufsTop">
                      <!-- <div>身份证</div> -->
                      <div @click="addFilesClick(2)" class="addclickFjClass">
                        添加附件
                      </div>
                    </div>
                    <div class="dingFilesClass">
                      <div
                        v-for="(item, index) in dingEditForm.enclosure"
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
                              @click="deleteFiles(index, 2)"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <div class="shenpi dRemarkList">
                <div>审批流程：</div>
                <div class="line">
                  <div class="spList">
                    <div>
                      <div>
                        <span style="color: red">* &nbsp;&nbsp;</span>审批人
                      </div>
                      <p>请选择申请人</p>
                    </div>
                    <div class="addManeger">
                      <div
                        class="addMList"
                        v-if="dingEditForm.approver.length > 3"
                      >
                        <div class="mdnList">
                          <div class="mdren" @click="openAllPeople(3)">
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
                        v-for="(item, index) in dingEditForm.approver.slice(
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
                            @click="handleCancel(index, 1)"
                          ></i>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div class="addMList addMListLast">
                        <div class="mdnList">
                          <div class="mdren" @click="addManyP(3)">
                            <span class="touxiang">
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
                        v-if="dingEditForm.copyer.length > 3"
                      >
                        <div class="mdnList">
                          <div class="mdren" @click="openAllPeople(4)">
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
                        v-for="(item, index) in dingEditForm.copyer.slice(0, 3)"
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
                            @click="handleCancel(index, 2)"
                          ></i>
                        </div>
                        <div class="mdnPlus">
                          <i class="el-icon-plus"></i>
                        </div>
                      </div>
                      <div class="addMList addMListLast">
                        <div class="mdnList">
                          <div class="mdren" @click="addManyP(4)">
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
          <el-button size="medium" @click="editOnCancel('dingFormRef')"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            :loading="loading"
            @click="editOnInfo('dingFormRef')"
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
          共有{{ dingLogForm.approver.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.approver"
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
          共有{{ dingLogForm.copyer.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingLogForm.copyer"
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
        title="全部审批人员"
        :append-to-body="true"
        :visible.sync="AllPVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingEditForm.approver.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingEditForm.approver"
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
              <i class="el-icon-error" @click="handleCancel(index, 1)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(3)">
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
        :visible.sync="AllSendVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ dingEditForm.copyer.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in dingEditForm.copyer"
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
              <i class="el-icon-error" @click="handleCancel(index, 2)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(4)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="删除"
        width="500px"
        :append-to-body="true"
        :visible.sync="deleteVisible"
        :close-on-click-modal="false"
      >
        <div>确认删除？一旦删除无法找回！</div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="deleteVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="medium" @click="deleteClick"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
// import eupload from '../../../components/excelUpload.vue';
export default {
  name: 'workRecordInfo',
  data() {
    let validateCode = (rule, value, callback) => {
      if (value) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          callback(new Error('您输入的身份证长度或格式错误'));
        } else {
          callback();
        }
      } else {
        callback(new Error('请输入身份证号'));
      }
    };
    return {
      deleteVisible: false,
      deleteID: '',
      deleteType: '',
      editFormVisible: false,
      newTitle: '添加',
      isEdit: 0,
      isNractive: false,
      dialogFormVisible: false,
      noRecordList: [],
      recordData: [],
      recordTime: '',
      labelPosition: 'right',
      right: '',
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      upFormVisible: false,
      upForm: { url: '' },
      options: [],
      addFormVisible: false,
      newDialogTitle: '添加',
      recordTime1:'',
      dingLogRules: {
        duration: [
          {
            required: true,
            message: '点工不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        money: [
          {
            required: true,
            message: '金额不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      dingEditRules: {
        duration: [
          {
            required: true,
            message: '点工不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        money: [
          {
            required: true,
            message: '金额不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      addUserFormRules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        work_type: [
          {
            required: true,
            message: '工种不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        wages: [
          {
            required: true,
            message: '工资不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },

      addUserForm: {
        name: '',
        wages: '',
        work_type: '',
        ban_name_id: '',
      },
      formInline: {
        cert: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        name: '',
      },
      currentPage: 1,
      total: '',
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      workTypeList: [],
      proList: [],
      viewType: 1,
      recordTime:'',
      dingEditForm: {
        duration: '',
        remarks: '',
        enclosure: [],
        approver: [],
        copyer: [],
        money: '',
      },
      dingLogForm: {
        duration: '',
        remarks: '',
        enclosure: [],
        approver: [],
        copyer: [],
        money: '',
      },
      AllPeopleVisible: false,
      AllSendPeopleVisible: false,
      getBzid: '',
      getBzname: '',
      upUser: [],
      reType: '记工',
      borrowUser: {
        name: '',
        id: '',
      },
      AllPVisible: false,
      AllSendVisible: false,
      currentType: 1,
      editPeople: { name: '', id: '' },
      editDid: '',
      loading: false,
    };
  },
  methods: {
    editJ(row, type, id) {
      // this.dingEditForm = {
      //     duration: '',
      //     remarks: '',
      //     enclosure: [],
      //     approver: [],
      //     copyer: [],
      //     money: ''
      // };
      this.currentType = type;
      this.editFormVisible = true;
      this.editPeople.name = row.name;
      let newID = '';
      if (type == 1) {
        this.editDid = id;
        newID = id;
        this.$axios
          .post('/projectthree/jzecho', {
            id: newID,
          })
          .then(res => {
            if (res.data.code == 1) {
              let newData = JSON.parse(JSON.stringify(res.data.content));
              this.editPeople.id = newData.participants_id;
              this.dingEditForm = JSON.parse(JSON.stringify(res.data.content));
              console.log('111+++' + JSON.stringify(this.dingEditForm));
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
      } else {
        this.editDid = row.jg_id;
        newID = row.jg_id;
        this.$axios
          .post('/projectthree/jgecho', {
            id: newID,
          })
          .then(res => {
            if (res.data.code == 1) {
              let newData = JSON.parse(JSON.stringify(res.data.content));
              this.editPeople.id = newData.participants_id;
              this.dingEditForm = JSON.parse(JSON.stringify(res.data.content));
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
      }
    },
    deleteZJ(did, type) {
      this.$axios
        .post('/projectthree/jzjgdel', {
          status: type,
          id: did,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.changeList();
            if (type == 1) {
              this.$message({
                type: 'success',
                message: '借支删除成功',
                duration: 1500,
              });
            } else {
              this.$message({
                type: 'success',
                message: '记工删除成功',
                duration: 1500,
              });
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
    deleteClick() {
      this.$axios
        .post('/projectthree/jzjgdel', {
          status: this.deleteType,
          id: this.deleteID,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.deleteVisible = false;
            this.changeList();
            if (deleteType == 1) {
              this.$message({
                type: 'success',
                message: '借支删除成功',
                duration: 1500,
              });
            } else {
              this.$message({
                type: 'success',
                message: '记工删除成功',
                duration: 1500,
              });
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
    deleteJ(did, type) {
      this.deleteID = did;
      this.deleteType = type;
      this.deleteVisible = true;
    },
    openJ(url) {
      dd.ready(function () {
        dd.biz.util.openSlidePanel({
          url: url, //打开侧边栏的url
          title: '详情', //侧边栏顶部标题
          onSuccess: function (result) {},
          onFail: function () {},
        });
      });
    },
    openR(url) {
      dd.ready(function () {
        dd.biz.util.openSlidePanel({
          url: url, //打开侧边栏的url
          title: '详情', //侧边栏顶部标题
          onSuccess: function (result) {},
          onFail: function () {},
        });
      });
    },
    //去统计页面
    goTotal() {
      this.$router.push({
        path: '/projetcout/workRecordTotal',
        query: { id: this.$route.query.id },
      });
    },
    goback() {
      this.$router.go(-1);
    },
    //去记工
    goRecord() {
      this.upUser = [];
      this.noRecordList.forEach(item => {
        if (item.flag) {
          this.upUser.push(item);
        }
      });
      // let SendArr = JSON.parse(JSON.stringify(newArr));
      // SendArr.forEach((item) => {
      //     delete item.flag;
      // });
      // console.log('11+++' + JSON.stringify(SendArr));
      if (this.upUser.length > 0) {
        if (this.upUser.length > 1) {
          this.reType = '记工';
        } else {
          this.reType = '借支';
        }
        this.dialogFormVisible = true;
      } else {
        this.$message({
          type: 'warning',
          message: '请选择人员！',
          duration: 1500,
        });
      }
    },
    //全选
    allCheck() {
      if (this.noRecordList.length > 0) {
        let num = 0;
        this.noRecordList.forEach(item => {
          if (item.flag) {
            num++;
          }
          if (num == this.noRecordList.length) {
            this.noRecordList.forEach(list => {
              list.flag = false;
            });
          } else {
            item.flag = true;
          }
        });
      }
    },
    editCancel(formName) {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.dingLogForm.enclosure = [];
        this.dingLogForm.copyer = [];
        this.dingLogForm.approver = [];
      });
    },
    editInfo(formName) {
      const _this = this;
      _this.recordTime = _this.$utils.timeChange(_this.recordTime, 2);
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.dingLogForm));

          let cc_userid = [];
          let approval_userid = [];

          if (newData.copyer.length > 0) {
            cc_userid = newData.copyer.map(item => {
              if (!item.emplId) return '';
              return item.emplId;
            });
          }
          if (newData.approver.length > 0) {
            approval_userid = newData.approver.map(item => {
              if (!item.emplId) return '';
              return item.emplId;
            });
            if (_this.reType == '记工') {
              let participants = _this.upUser.map(item => {
                if (!item.name) return '';
                return item.name;
              });
              let participants_id = _this.upUser.map(item => {
                if (!item.id) return '';
                return item.id;
              });
              _this.$axios
                .post('/projectthree/jgMould')
                .then(resone => {
                  if (resone.data.code == 1) {
                    _this.$axios
                      .post('/projectthree/addRecordWorkSp', {
                        ban_name: _this.getBzname,
                        riqi: _this.recordTime,
                        participants: participants,
                        participants_id: participants_id,
                        duration: newData.duration,
                        remarks: newData.remarks,
                        enclosure: newData.enclosure,
                        send_userid: _this.$store.state.userInfo.uid,
                        approval_userid: approval_userid.toString(),
                        cc_userid: cc_userid.toString(),
                        process_code: resone.data.data,
                      })
                      .then(res => {
                        if (res.data.code == 1) {
                          _this.getDayList();
                          _this.loading = false;
                          _this.dialogFormVisible = false;
                          _this.$refs[formName].resetFields();
                          _this.dingLogForm.enclosure = [];
                          _this.dingLogForm.copyer = [];
                          _this.dingLogForm.approver = [];
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
                    _this.loading = false;
                    _this.$message({
                      message: resone.data.msg,
                      type: 'warning',
                      duration: 1500,
                    });
                  }
                })
                .catch(function (error) {
                  _this.loading = false;
                  console.log(error);
                });
            } else if (_this.reType == '借支') {
              _this.$axios
                .post('/projectthree/jzmould')
                .then(resone => {
                  if (resone.data.code == 1) {
                    _this.$axios
                      .post('/projectthree/jzmouldadd', {
                        ban_name: _this.getBzname,
                        riqi: _this.recordTime,
                        participants: _this.upUser[0].name,
                        participants_id: _this.upUser[0].id,
                        duration: newData.money,
                        remarks: newData.remarks,
                        enclosure: newData.enclosure,
                        send_userid: _this.$store.state.userInfo.uid,
                        approval_userid: approval_userid.toString(),
                        cc_userid: cc_userid.toString(),
                        process_code: resone.data.data,
                      })
                      .then(res => {
                        if (res.data.code == 1) {
                          _this.getDayList();
                          _this.loading = false;
                          _this.dialogFormVisible = false;
                          _this.$refs[formName].resetFields();
                          _this.dingLogForm.enclosure = [];
                          _this.dingLogForm.copyer = [];
                          _this.dingLogForm.approver = [];
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
                    _this.loading = false;
                    _this.$message({
                      message: resone.data.msg,
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
            _this.$notify({
              title: '警告',
              message: '请选择申请人员',
              type: 'warning',
              duration: 1500,
            });
          }
        } else {
          _this.loading = false;
        }
      });
    },
    editOnCancel(formName) {
      this.editFormVisible = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.dingEditForm.enclosure = [];
        this.dingEditForm.copyer = [];
        this.dingEditForm.approver = [];
      });
    },
    editOnInfo(formName) {
      const _this = this;
      _this.recordTime = _this.$utils.timeChange(_this.recordTime, 2);
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.dingEditForm));
          let cc_userid = [];
          let approval_userid = [];

          if (newData.copyer.length > 0) {
            cc_userid = newData.copyer.map(item => {
              if (!item.emplId) return '';
              return item.emplId;
            });
          }
          if (newData.approver.length > 0) {
            approval_userid = newData.approver.map(item => {
              if (!item.emplId) return '';
              return item.emplId;
            });
            let participants = _this.editPeople.name;
            let participants_id = _this.editPeople.id;
            if (_this.currentType == 2) {
              _this.$axios
                .post('/projectthree/jgMould')
                .then(resone => {
                  if (resone.data.code == 1) {
                    _this.$axios
                      .post('/projectthree/addRecordWorkSp', {
                        ban_name: _this.getBzname,
                        riqi: _this.recordTime,
                        participants: [participants],
                        participants_id: [participants_id],
                        duration: newData.duration,
                        remarks: newData.remarks,
                        enclosure: newData.enclosure,
                        send_userid: _this.$store.state.userInfo.uid,
                        approval_userid: approval_userid.toString(),
                        cc_userid: cc_userid.toString(),
                        process_code: resone.data.data,
                      })
                      .then(res => {
                        if (res.data.code == 1) {
                          _this.deleteZJ(_this.editDid, 2);
                          _this.getDayList();
                          _this.loading = false;
                          _this.editFormVisible = false;
                          _this.$refs[formName].resetFields();
                          _this.dingEditForm.enclosure = [];
                          _this.dingEditForm.copyer = [];
                          _this.dingEditForm.approver = [];
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
                    _this.loading = false;
                    _this.$message({
                      message: resone.data.msg,
                      type: 'warning',
                      duration: 1500,
                    });
                  }
                })
                .catch(function (error) {
                  _this.loading = false;
                  console.log(error);
                });
            } else if (_this.currentType == 1) {
              _this.$axios
                .post('/projectthree/jzmould')
                .then(resone => {
                  if (resone.data.code == 1) {
                    _this.$axios
                      .post('/projectthree/jzmouldadd', {
                        ban_name: _this.getBzname,
                        riqi: _this.recordTime,
                        participants: participants,
                        participants_id: participants_id,
                        duration: newData.money,
                        remarks: newData.remarks,
                        enclosure: newData.enclosure,
                        send_userid: _this.$store.state.userInfo.uid,
                        approval_userid: approval_userid.toString(),
                        cc_userid: cc_userid.toString(),
                        process_code: resone.data.data,
                      })
                      .then(res => {
                        if (res.data.code == 1) {
                          _this.deleteZJ(_this.editDid, 1);
                          _this.getDayList();
                          _this.loading = false;
                          _this.editFormVisible = false;
                          _this.$refs[formName].resetFields();
                          _this.dingEditForm.enclosure = [];
                          _this.dingEditForm.copyer = [];
                          _this.dingEditForm.approver = [];
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
                    _this.loading = false;
                    _this.$message({
                      message: resone.data.msg,
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
            _this.$notify({
              title: '警告',
              message: '请选择申请人员',
              type: 'warning',
              duration: 1500,
            });
          }
        } else {
          _this.loading = false;
        }
      });
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;border-color:#F1F8FF;';
    },
    //编辑
    checkList(row) {
      const _this = this;
      _this.viewType = 2;
      _this.newDialogTitle = '编辑';
      _this.addFormVisible = true;
      _this.$nextTick(() => {
        _this.addUserForm = {
          name: '',
          wages: '',
          work_type: '',
        };
        _this.addUserForm = JSON.parse(JSON.stringify(row));
      });
    },
    selectUser(item) {
      item.flag = !item.flag;
    },

    //添加人员
    newAdd() {
      const _this = this;
      _this.newDialogTitle = '添加';
      _this.viewType = 1;
      _this.addFormVisible = true;
    },
    dateFormat(dateData) {
      var date = new Date(dateData)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      const time = y + '-' + m + '-' + d
      return time
    },
    changeList(day) {
      console.log(day, 'day');
      if (day) {
        console.log('我是有数据');
        // this.recordTime1 = this.dateFormat(day);
        this.recordTime = day;
      } else {
        console.log('我是没数据');
        this.recordTime = this.$utils.timeChange(this.recordTime, 2);
      }
      this.$axios
        .post('/projectthree/workerStatus', {
          day: this.recordTime,
          ban_id: this.getBzid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.recordData = res.data.data.jg_worker;
            this.noRecordList = res.data.data.no_jg_worker.map(item => {
              return Object.assign(item, {
                flag: false,
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(this.dateFormat(this.recordTime), 'this.recordTimethis.recordTime');
    },
    getDayList() {
      this.$axios
        .post('/projectthree/calendarJg', {
          day: this.recordTime,
          ban_id: this.getBzid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.proList = res.data.data;
            this.changeList();
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
          .post('/project/serviceRealnameRegisterDownload', {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
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
          message: '请先勾选要删除的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    titleCancel(formName) {
      this.addFormVisible = false;
      this.$refs[formName].resetFields();
      this.addUserForm.project_name = '';
    },
    //新建基础按钮
    titleSave(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.viewType == 1) {
            _this.$axios
              .post('/projectthree/addWorker', _this.addUserForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.changeList();
                  _this.loading = false;
                  _this.addFormVisible = false;
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
                    type: 'error',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else if (_this.viewType == 2) {
            _this.$axios
              .post('/project/serviceRealnameRegisterEdit', _this.addUserForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.loading = false;
                  _this.addFormVisible = false;
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
                    type: 'error',
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    openAllPeople(type) {
      if (type == 1) {
        this.AllPeopleVisible = true;
      } else if (type == 2) {
        this.AllSendPeopleVisible = true;
      } else if (type == 3) {
        this.AllPVisible = true;
      } else {
        this.AllSendVisible = true;
      }
    },
    handleCancel(index, type) {
      switch (type) {
        case 1:
          this.dingEditForm.approver.splice(index, 1);
          break;
        case 2:
          this.dingEditForm.copyer.splice(index, 1);
          break;
      }
    },
    handleClose(index, type) {
      switch (type) {
        case 1:
          this.dingLogForm.approver.splice(index, 1);
          break;
        case 2:
          this.dingLogForm.copyer.splice(index, 1);
          break;
      }
    },
    //添加文件
    addFilesClick(type) {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
          auth: 'add',
          fields: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.$store.commit('setSpaceId', res.data.data.toString());
            _this.selectFiles(type);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles(type) {
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
            if (type == 1) {
              result.data.forEach(item => {
                _this.dingLogForm.enclosure.push(item);
              });
            } else {
              result.data.forEach(item => {
                _this.dingEditForm.enclosure.push(item);
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
    deleteFiles(index, type) {
      if (type == 1) {
        this.dingLogForm.enclosure.splice(index, 1);
      } else {
        this.dingEditForm.enclosure.splice(index, 1);
      }
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
                corpId: _this.$store.state.cid,
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
                _this.dingLogForm.approver.push(item);
              });
            } else if (type == 2) {
              result.users.forEach(item => {
                _this.dingLogForm.copyer.push(item);
              });
            } else if (type == 3) {
              result.users.forEach(item => {
                _this.dingEditForm.approver.push(item);
              });
            } else {
              result.users.forEach(item => {
                _this.dingEditForm.copyer.push(item);
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
  },
  mounted() {
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(1)',
      );
      prevBtn.addEventListener('click', () => {
        this.recordTime = this.$utils.timeChange(this.recordTime, 2);
        this.changeList(this.recordTime);
        console.log(this.recordTime,'this.recordTimethis.recordTime1')
      });
    });

    this.$nextTick(() => {
      // 今天
      let prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(2)',
      );
      prevBtn.addEventListener('click', () => {
        this.recordTime = this.$utils.timeChange(this.recordTime, 2);
        this.changeList(this.recordTime);
        console.log(this.recordTime,'this.recordTimethis.recordTime5')

      });
    });
    // let d = new Date();
    // let month = d.getMonth() + 1;
    // let strDate = date.getDate();
    // if (month >= 1 && month <= 9) {
    //     month = '0' + month;
    // }
    // if (strDate >= 1 && strDate <= 9) {
    //     strDate = '0' + strDate;
    // }
    // this.recordTime = d.getFullYear() + '-' + month + '-' + strDate;
  },
  created() {
    this.$utils.checkding();
    this.getBzid = this.$route.query.id;
    this.getBzname = this.$route.query.name;
    this.addUserForm.ban_name_id = this.$route.query.id;
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.workTypeList = this.$utils.utilWorkerType();
    this.recordTime = this.$utils.timeChange(new Date(), 2);
    this.recordTime1 = this.$utils.timeChange(new Date(), 2);

        // console.log(this.recordTime,'this.recordTimethis.recordTime59')

    this.getDayList();
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
  },
};
</script>
