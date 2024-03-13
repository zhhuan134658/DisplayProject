/* * @Author: NorthWind * @Date: 2021-01-20 16:57:30 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-26 10:06:56 */
<template>
  <div id="taskList">
    <!-- 账户信息列表 -->
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
              <el-form-item label="项目名称:" class="projectTypeSelect">
                <el-select
                  v-model="formInline.xmid"
                  filterable
                  clearable
                  placeholder="请选择项目"
                >
                  <el-option
                    v-for="item in noNextProject"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="searchTime" label="开始时间:">
                <el-date-picker
                  v-model="formInline.startTime"
                  :picker-options="pickerStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="searchTime" label="结束时间:">
                <el-date-picker
                  v-model="formInline.endTime"
                  :picker-options="pickerEnd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
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
        <div class="searchList">
          <div class="typeClass">
            <el-badge
              v-for="(item, index) in taskStatusList"
              :key="index"
              :value="item.num"
              :max="99"
              class="item"
            >
              <el-button
                size="medium"
                :class="index === activeConIndex ? 'activeConClass' : ''"
                @click="typeClick(item, index)"
                >{{ item.name }}</el-button
              >
            </el-badge>
          </div>
          <div>
            <el-button
              icon="el-icon-delete"
              size="medium"
              @click="typeClick({ id: 99 }, 8)"
              type="primary"
              :plain="true"
              >删除</el-button
            >
          </div>
        </div>
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            prop="tasktitle"
            label="任务标题"
            :show-overflow-tooltip="true"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="项目"
            :show-overflow-tooltip="true"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="founderuname"
            label="申请人"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="starttime"
            label="开始时间"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="endtime"
            label="结束时间"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="tasktype"
            label="分类"
            align="left"
          ></el-table-column>
          <el-table-column label="状态" align="left" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.taskstatus == '2'" style="color: #f16d6d"
                >已拒绝</span
              >
              <span
                v-else-if="scope.row.taskstatus == '1'"
                style="color: #17c298"
                >已同意</span
              >
              <span v-else style="color: #e8a54c">审批中</span>
            </template>
          </el-table-column>
          <el-table-column
            label="归档内容"
            v-if="typeId == '3'"
            align="left"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.logspare3 == '1'"
                @click.native.prevent="watchRow(scope.row)"
                type="text"
              >
                查看
              </el-button>
              <el-button v-else type="text" size="small"> </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            v-if="typeId == '2'"
            align="left"
            width="80"
          >
            <template slot-scope="scope">
              <el-button @click.native.prevent="backRow(scope.row)" type="text">
                归档
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="归档"
      :visible.sync="drawerVisible"
      width="600px"
      @close="drawClose('cComeform')"
    >
      <div class="cDrawerContent">
        <el-form
          @submit.native.prevent
          :model="backTaskForm"
          :rules="taskRule"
          ref="cComeform"
          label-width="130px"
        >
          <el-form-item label="归档位置：" prop="guidangsite">
            <el-input
              v-model="backTaskForm.guidangsite"
              placeholder="请输入归档位置，例如文件柜多少号"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="归档份数：" prop="guidangnumber">
            <el-input-number
              v-model="backTaskForm.guidangnumber"
              controls-position="right"
              placeholder="请输入归档份数"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="归档文件：" prop="guidangfile" class="bfFiles">
            <div class="uploadFileList">
              <div class="ufSfz">
                <div class="ufsTop">
                  <div @click="addFilesPower(1)" class="addImgClass">
                    添加附件
                  </div>
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in backTaskForm.guidangfile"
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
                      <div class="watchBtn" @click="watchFiles(item)">预览</div>
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
          <el-form-item label="归档备注：" prop="guidangremarks">
            <el-input
              type="textarea"
              v-model="backTaskForm.guidangremarks"
              placeholder="请输入归档备注"
              maxlength="240"
              show-word-limit
            ></el-input>
          </el-form-item>
          <div class="demo-drawer__footer">
            <el-button
              type="primary"
              @click="closeDrawer('cComeform')"
              :loading="loading"
              >{{ loading ? '归档中 ...' : '归档' }}</el-button
            >
            <el-button @click="drawClose('cComeform')">取 消</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="查看归档信息"
      width="600px"
      :visible.sync="watchDialogVisible"
    >
      <div style="padding: 0 20px">
        <el-form :model="viewBackForm" label-width="130px">
          <el-form-item label="归档位置：">
            <div>{{ viewBackForm.guidangsite }}</div>
          </el-form-item>
          <el-form-item label="归档份数：">
            <div>{{ viewBackForm.guidangnumber }}</div>
          </el-form-item>
          <el-form-item label="归档文件：">
            <div class="uploadFileList">
              <div class="ufSfz">
                <div class="ufsTop">
                  <!-- <div
                                        @click="addFilesPower"
                                        class="addImgClass"
                                    >
                                        添加附件
                                    </div> -->
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in viewBackForm.guidangfile"
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
                      <div class="watchBtn" @click="watchFiles(item)">预览</div>
                      <div class="fileIcon2">
                        <!-- <i
                                                    class="el-icon-error"
                                                    @click="deleteFiles(index)"
                                                ></i> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="归档备注：">
            <div>{{ viewBackForm.guidangremarks }}</div>
          </el-form-item>
          <el-form-item label="归档人：">
            <div>{{ viewBackForm.username }}</div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="审批普通任务"
      :visible.sync="dingVisible"
      @close="closeDing('dingLogRef')"
      width="470px"
      class="taskDrawClass"
    >
      <div class="cDrawerContent">
        <div
          style="
            background: #f0f0f0;
            width: 105%;
            margin-left: -20px;
            height: 1px;
            margin-top: -20px;
            margin-bottom: 20px;
          "
        ></div>
        <div class="drawTopBtn" v-if="taskStatus == '0' || taskStatus == '2'">
          <div>
            <el-button
              type="primary"
              round
              @click="completeTask"
              v-if="taskStatus == '0'"
              >完成</el-button
            ><el-button
              type="primary"
              round
              @click="resetTask(1)"
              v-if="taskStatus == '2'"
              >重启</el-button
            >
          </div>
          <el-button
            type="warning"
            v-if="taskStatus == '0'"
            round
            @click="resetTask(2)"
            >催办</el-button
          >
        </div>
        <el-form label-width="130px">
          <el-form-item label="任务标题：">
            <div>{{ contractDrawerForm.tasktitle }}</div>
          </el-form-item>
          <el-form-item label="任务开始时间：">
            <div>
              <el-date-picker
                v-model="contractDrawerForm.starttime"
                type="date"
                readonly
                size="small"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="任务结束时间：">
            <div>
              <el-date-picker
                v-model="contractDrawerForm.endtime"
                type="date"
                readonly
                size="small"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="备注：">
            <div>{{ contractDrawerForm.taskdesc }}</div>
          </el-form-item>
          <el-form-item label="附件：">
            <div class="uploadFileList">
              <div class="ufSfz">
                <div class="ufsTop"></div>
                <div class="dingFilesClass" style="padding-left: 0">
                  <div
                    v-for="(item, index) in contractDrawerForm.enclosure"
                    :key="index"
                  >
                    <div>
                      <div class="fileIcon">
                        <i class="el-icon-document" style="color: #ffca28"></i>
                      </div>
                      <div class="filesTitle">
                        <div>
                          {{
                            item.fileName.length > 20
                              ? `${item.fileName.substring(0, 20)}...`
                              : item.fileName
                          }}
                        </div>
                        <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                      </div>
                    </div>
                    <div>
                      <div class="watchBtn" @click="watchFiles(item)">预览</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <div class="shenpi" style="margin-bottom: 40px">
            <div class="line" style="height: 160px">
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
                    v-if="contractDrawerForm.logspare.length > 3"
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
                    v-for="(item, index) in contractDrawerForm.logspare.slice(
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
                    </div>
                    <div class="mdnPlus">
                      <i class="el-icon-plus"></i>
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
                    v-if="contractDrawerForm.logspare1.length > 3"
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
                    v-for="(item, index) in contractDrawerForm.logspare1.slice(
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
                    </div>
                    <div class="mdnPlus">
                      <i class="el-icon-plus"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shenpiThree">
                <span></span>
              </div>
              <div class="shenpiFore">
                <span></span>
              </div>
            </div>
          </div>
          <el-form-item class="taskDrawTalk" label="评论：">
            <el-input v-model="taskcomment" size="small"></el-input>
            <div>
              <el-button :loading="loadTalk" @click="talkWith" size="small"
                >评论</el-button
              >
            </div>
            <div class="taskDTBtn">
              <div class="taskDTIcon">
                <i class="el-icon-picture" @click="addFilesPower(2)"></i>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="评论记录：">
            <div
              v-if="talkList.length > 0"
              style="margin-top: 10px; max-height: 400px; overflow-y: auto"
            >
              <div
                class="pljilu"
                v-for="(item, index) in talkList"
                :key="index"
              >
                <p>{{ item.username }}</p>
                <p>{{ item.created }}</p>
                <p>{{ item.content }}</p>
                <div class="dingFilesClass">
                  <div v-for="(plist, index) in item.file" :key="index">
                    <div>
                      <div class="fileIcon">
                        <i class="el-icon-document"></i>
                      </div>
                      <div class="filesTitle">
                        <div>
                          {{ plist.fileName }}
                        </div>
                        <p>{{ (plist.fileSize / 1024).toFixed(2) }}kb</p>
                      </div>
                    </div>
                    <div>
                      <div class="watchBtn" @click="watchFiles(plist)">
                        预览
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>无评论</div>
          </el-form-item>
        </el-form>
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
        共有{{ contractDrawerForm.logspare.length }}人
      </div>
      <div class="showAllPeople">
        <div
          class="addMList"
          v-for="(item, index) in contractDrawerForm.logspare"
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
            <!-- <i class="el-icon-error" @click="handleClose(item)"></i> -->
          </div>
          <div class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <!-- <div class="addMList addMListLast">
                    <div class="mdnList">
                        <div class="mdren" @click="addManyP(1)">
                            <span class="touxiang">
                                <i class="el-icon-plus"></i>
                            </span>
                        </div>
                    </div>
                </div> -->
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
        共有{{ contractDrawerForm.logspare1.length }}人
      </div>
      <div class="showAllPeople">
        <div
          class="addMList"
          v-for="(item, index) in contractDrawerForm.logspare1"
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
            <!-- <i
                            class="el-icon-error"
                            @click="handleSendClose(item)"
                        ></i> -->
          </div>
          <div class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <!-- <div class="addMList addMListLast">
                    <div class="mdnList">
                        <div class="mdren" @click="addManyP(2)">
                            <span class="touxiang">
                                <i class="el-icon-plus"></i>
                            </span>
                        </div>
                    </div>
                </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'taskList',
  data() {
    return {
      AllPeopleVisible: false,
      AllSendPeopleVisible: false,
      drawerVisible: false,
      watchDialogVisible: false,
      dingVisible: false,
      loading: false,
      loadTalk: false,
      contractDrawerForm: {
        tasktitle: '',
        taskdesc: '',
        starttime: '',
        endtime: '',
        logspare: [],
        logspare1: [],
        enclosure: [],
      },
      taskRule: {
        guidangsite: [
          {
            required: true,
            message: '请选择用章类型',
            trigger: 'blur',
          },
        ],
      },
      taskStatus: '0',
      backTaskForm: {
        taskid: '',
        guidangfile: [],
        guidangsite: '',
        guidangnumber: '',
        guidangremarks: '',
        username: '',
      },
      viewBackForm: {
        guidangfile: [],
        guidangsite: '',
        guidangnumber: '',
        guidangremarks: '',
        username: '',
      },
      taskStatusList: [
        { name: '全部', id: '0', num: '' },
        { name: '审批中', id: '1', num: '' },
        { name: '归档中', id: '2', num: '' },
        { name: '已完结', id: '3', num: '' },

        { name: '我创建的', id: '4', num: '' },
        { name: '抄送我的', id: '5', num: '' },
        { name: '待我审批', id: '6', num: '' },
        { name: '逾期任务', id: '7', num: '' },
      ],
      formInline: {
        accountname: '',
        accountnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        xmid: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      activeConIndex: 0,
      typeId: '0',
      noNextProject: [],
      approvalStatus: [],
      newTaskID: '',
      taskcomment: '',
      talkList: [],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    resetClick() {
      this.formInline = {
        accountname: '',
        accountnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        xmid: '',
      };
      this.getList();
    },
    deleteFiles(index) {
      this.backTaskForm.guidangfile.splice(index, 1);
    },
    openAllPeople(type) {
      if (type == 1) {
        this.AllPeopleVisible = true;
      } else {
        this.AllSendPeopleVisible = true;
      }
    },
    //关闭普通任务
    closeDing() {
      this.taskcomment = '';
    },
    //完成
    completeTask() {
      const _this = this;
      _this.$axios
        .post('/task/taskdelOrcom', {
          corp_id: _this.$store.state.cid,
          userid: _this.$store.state.userInfo.uid,
          id: _this.newTaskID,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.dingVisible = false;
            _this.$message.success(res.data.msg);
            _this.getList();
            _this.getNum();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //重启任务
    resetTask(type) {
      const _this = this;
      if (type == 1) {
        _this.$axios
          .post('/task/tasknotice', {
            corp_id: _this.$store.state.cid,
            user_id: _this.$store.state.userInfo.uid,
            id: _this.newTaskID,
            type: 2,
          })
          .then(res => {
            if (res.data.code == 1) {
              _this.dingVisible = false;
              _this.$message.success(res.data.msg);
              _this.getList();
              _this.getNum();
            } else {
              _this.$message.warning(`${res.data.msg}`);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (type == 2) {
        dd.ready(function () {
          dd.biz.ding.create({
            users: _this.contractDrawerForm.logspare, // 用户列表，工号
            corpId: _this.$store.state.cid, // 企业id
            type: 1, // 附件类型 1：image  2：link
            alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
            alertDate: {
              format: 'yyyy-MM-dd HH:mm',
              value: '',
            },
            attachment: {
              images: [''],
            }, // 附件信息
            text: '', // 正文
            bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

            onSuccess: function () {},
            onFail: function () {},
          });
        });
        dd.error(function (err) {
          console.log(err);
        });
      }
    },
    //归档
    closeDrawer(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.backTaskForm.guidangfile.length > 0) {
            _this.backTaskForm.username = _this.$store.state.userInfo.uname;
            _this.$axios
              .post('/task/approvalguidang', _this.backTaskForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.loading = false;

                  _this.$refs[formName].resetFields();
                  _this.backTaskForm.guidangfile = [];
                  _this.drawerVisible = false;
                  _this.getNum();
                  _this.getList();
                  _this.$message({
                    type: 'success',
                    message: '该任务已归档，请点击已完结查看归档内容',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'error',
                    duration: 2000,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.loading = false;
            _this.$notify({
              title: '提示',
              message: '请上传附件',
              duration: 2000,
              type: 'warning',
            });
          }
        } else {
          _this.loading = false;
          return false;
        }
      });
    },
    drawClose(formName) {
      this.loading = false;

      this.$refs[formName].resetFields();
      this.backTaskForm.guidangfile = [];
      this.drawerVisible = false;
    },
    backRow(row) {
      this.drawerVisible = true;
      this.backTaskForm.taskid = row.id;
    },
    getProList() {
      this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            this.noNextProject = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
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
    getTaskInfo(row) {
      const _this = this;
      _this.$axios
        .post('/task/taskdetails', {
          corp_id: _this.$store.state.cid,
          id: row.id,
          userid: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.taskStatus = res.data.list.taskstatus;
            _this.contractDrawerForm = res.data.list;
            _this.dingVisible = true;
            _this.getTalkList();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkList(row, column) {
      const _this = this;
      if (column.label != '操作' && column.label != '归档内容') {
        if (row.logspare3 == 0) {
          _this.newTaskID = row.id;
          _this.getTaskInfo(row);
        } else if (row.logspare3 == 1) {
          dd.ready(function () {
            dd.biz.util.openSlidePanel({
              url: row.url, //打开侧边栏的url
              title: '查看任务审批', //侧边栏顶部标题
              onSuccess: function (result) {},
              onFail: function () {
                setTimeout(() => {
                  _this.getNum();
                }, 5000);
              },
            });
          });
        }
        if (_this.typeId == '3') {
          _this.getNum();
        } else if (_this.typeId == '5') {
          _this.getNum();
        }
      }
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/task/approvallist', {
          current_page: this.currentPage,
          starttime: this.formInline.startTime,
          stoptime: this.formInline.endTime,
          xmid: this.formInline.xmid,
          status: this.typeId,
          userid: this.$store.state.userInfo.uid,
          corp_id: this.$store.state.cid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page;
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
      console.log(this.multSelectData);
    },
    //删除
    deleSelectionChange() {
      if (this.multSelectData.length > 0) {
        this.$axios
          .post('/task/taskdel', {
            id: this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              this.currentPage = 1;
              this.getList();
              this.$message.warning(`${res.data.msg}`);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        _this.$message.warning('请您选择');
      }
    },
    typeClick(item, index) {
      if (item.id == '99') {
        this.deleSelectionChange();
      } else {
        this.activeConIndex = index;
        this.typeId = item.id;
        this.getList();
      }
    },
    getNum() {
      const _this = this;
      _this.$axios
        .post('/task/tasknumber', {
          corp_id: _this.$store.state.cid,
          userid: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.list.quanbutask == 0) {
              res.data.list.quanbutask = '';
            }
            if (res.data.list.dzxtask == 0) {
              res.data.list.dzxtask = '';
            }
            if (res.data.list.cctotask == 0) {
              res.data.list.cctotask = '';
            }
            if (res.data.list.Papprovalnumber == 0) {
              res.data.list.Papprovalnumber = '';
            }
            _this.taskStatusList[0].num = res.data.list.quanbutask;
            _this.taskStatusList[1].num = res.data.list.dzxtask;
            _this.taskStatusList[5].num = res.data.list.cctotask;
            _this.taskStatusList[6].num = res.data.list.Papprovalnumber;
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addFilesPower(type) {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
          auth: 'add',
          fields: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.$store.commit('setSpaceId', res.data.data.toString());
            _this.addFilesClick(type);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addFilesClick(type) {
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
                _this.backTaskForm.guidangfile.push(item);
              });
            } else if (type == 2) {
              _this.goTalkPic(result.data);
            }
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    goTalkPic(file) {
      const _this = this;
      _this.$axios
        .post('/task/taskcomment', {
          taskid: _this.newTaskID,
          corp_id: _this.$store.state.cid,
          username: _this.$store.state.userInfo.uname,
          user_id: _this.$store.state.userInfo.uid,
          content: '',
          file: file,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.$message.success('发表图片评论成功');
            _this.getTalkList();
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        })
        .catch(function (error) {
          _this.$message.error(`${error.data}`);
          console.log(error);
        });
    },
    //预览附件
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
            dd.error(function (err) {});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    watchRow(row) {
      const _this = this;

      _this.$axios
        .post('/task/taskgdfilelist', {
          taskid: row.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.viewBackForm = res.data.content;
            _this.watchDialogVisible = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTalkList() {
      const _this = this;
      _this.$axios
        .post('/task/cotentlist', {
          taskid: _this.newTaskID,
          corp_id: _this.$store.state.cid,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.list) {
              _this.talkList = res.data.list;
            } else {
              _this.talkList = [];
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //评论任务
    talkWith() {
      const _this = this;
      _this.loadTalk = true;
      if (_this.taskcomment) {
        _this.$axios
          .post('/task/taskcomment', {
            taskid: _this.newTaskID,
            corp_id: _this.$store.state.cid,
            username: _this.$store.state.userInfo.uname,
            user_id: _this.$store.state.userInfo.uid,
            content: _this.taskcomment,
            file: [],
          })
          .then(res => {
            if (res.data.code == 1) {
              _this.loadTalk = false;
              _this.taskcomment = '';
              _this.$message.success('发表评论成功');
              _this.getTalkList();
            } else {
              _this.loadTalk = false;
              _this.$message.warning(`${res.data.msg}`);
            }
          })
          .catch(function (error) {
            _this.loadTalk = false;
            _this.$message.error(`${error.data}`);
            console.log(error);
          });
      } else {
        _this.loadTalk = false;
        _this.$message.warning('请输入评论内容！');
      }
    },
  },
  mounted() {
    this.$utils.checkding();
    this.getProList();
  },
  created() {
    this.getNum();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    if (this.$route.query.status) {
      this.typeId = this.$route.query.status;
    } else {
      this.typeId = '0';
    }

    this.taskStatusList.forEach((item, index) => {
      if (item.id == this.typeId) {
        this.activeConIndex = index;
      }
    });
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
  },
};
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: row-reverse;
}
.demo-form-inline {
  display: flex;
  flex-direction: row;
  div:nth-child(2) {
    min-width: 180px !important;
  }
}
</style>
