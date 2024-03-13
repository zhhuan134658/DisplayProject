<template>
  <div id="diaryPrintList">
    <div class="main">
      <div class="content">
        <div>
          <div class="dpcTopBtn">
            <!-- <el-button type="primary" @click="printExcel"
                            >导出</el-button
                        > -->
            <el-button type="primary" @click="deleSelectionChange"
              >批量删除</el-button
            >
            <el-button type="primary" @click="openDo">新增日志打印</el-button>
          </div>
          <el-table
            :border="true"
            :data="taskPrintList"
            :header-cell-style="tableHeaderClass"
            :cell-style="tableRowClass"
            ref="multiplePTable"
            style="width: 100%; border: 1px solid #ebeef5"
            max-height="650"
            @selection-change="handleSelectionChange"
            size="mini"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" width="55" label="序号" />
            <el-table-column
              prop="file_name"
              label="名称"
              :show-overflow-tooltip="true"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="proname"
              label="项目"
              :show-overflow-tooltip="true"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="申请人"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="log_type"
              label="分类"
              align="left"
            ></el-table-column>
            <el-table-column align="left" label="操作">
              <template slot-scope="scope">
                <span
                  style="color: #409eff; cursor: pointer"
                  @click="downP(scope.row)"
                  >打印</span
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @current-change="handleCurrentChange2"
              :current-page.sync="currentPage2"
              :page-size="pagesize2"
              layout="prev, pager, next, jumper"
              :total="total2"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog
        width="825px"
        title="日志打印"
        :visible.sync="proVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closePrintExport"
        class="dplpDiaClass"
      >
        <div>
          <div
            style="
              background: #f0f0f0;
              width: 100%;
              height: 1px;
              margin-bottom: 20px;
            "
          ></div>
          <div class="liu-steps">
            <el-steps :active="activeConIndex" align-center>
              <el-step
                v-for="(item, index) in tabList"
                :key="index"
                :title="item.name"
              ></el-step>
            </el-steps>
          </div>
          <div class="content">
            <div>
              <div v-if="tabIndex == 1">
                <div class="content1" style="padding: 0">
                  <div
                    class="dacontent"
                    v-for="(typeChild, lindex) in taskTypeGetList"
                    :key="lindex"
                  >
                    <div class="left">
                      <img class="img" :src="typeChild.icon" />
                      <span>{{ typeChild.tmpname }}</span>
                    </div>
                    <div class="right">
                      <el-button
                        type="primary"
                        plain
                        @click="newAddTask(typeChild)"
                        size="small"
                        >选择</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="tabIndex == 2">
                <div class="diaryMPic">
                  <div>
                    <img src="../../assets/task/diaryM.png" alt="" />
                    <h2 class="dmpName">
                      {{ diaryName }}
                    </h2>
                    <el-form
                      @submit.native.prevent
                      :model="dpForm"
                      :rules="dpRule"
                      ref="dpFormRef"
                      label-width="10px"
                      class="dmpForm"
                    >
                      <el-form-item class="dmpjsc" prop="jscorp">
                        <el-input v-model="dpForm.jscorp"></el-input>
                      </el-form-item>
                      <el-form-item class="dmppro" prop="proname">
                        <el-select
                          v-model="dpForm.proname"
                          filterable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in projectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                          >
                          </el-option>
                        </el-select>
                        <!-- <el-input
                                                    v-model="dpForm.proname"
                                                ></el-input> -->
                      </el-form-item>
                      <el-form-item class="dmpsg" prop="sgcorp">
                        <el-input v-model="dpForm.sgcorp"></el-input>
                      </el-form-item>
                      <el-form-item class="dmgtime" prop="time">
                        <el-date-picker
                          v-model="dpForm.time"
                          type="date"
                          placeholder=""
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        ></el-date-picker>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
              <div v-if="tabIndex == 3">
                <div class="comeSearch">
                  <el-form
                    @submit.native.prevent
                    ref="searchFormRef"
                    :model="searchForm"
                    label-width="100px"
                  >
                    <div class="searchBottom">
                      <div class="searchLeft">
                        <el-form-item class="searchTime" label="开始时间：">
                          <el-date-picker
                            v-model="searchForm.startTime"
                            :picker-options="pickerStart"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                        </el-form-item>
                        <el-form-item class="searchTime" label="结束时间：">
                          <el-date-picker
                            v-model="searchForm.endTime"
                            :picker-options="pickerEnd"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                      <div class="searchRight">
                        <el-button type="primary" @click="searchClick"
                          >搜索</el-button
                        >
                      </div>
                    </div>
                  </el-form>
                </div>
                <el-table
                  :border="true"
                  :data="taskList"
                  :header-cell-style="tableHeaderClass"
                  :cell-style="tableRowClass"
                  @row-click="editTask"
                  ref="mulTable"
                  style="width: 100%; border: 1px solid #ebeef5"
                  max-height="500px"
                  @selection-change="diaryChange"
                  size="mini"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column
                    prop="proname"
                    label="项目"
                    :show-overflow-tooltip="true"
                    align="left"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="申请人"
                    align="left"
                  ></el-table-column>
                  <el-table-column
                    prop="log_date"
                    label="日志时间"
                    align="left"
                  ></el-table-column>
                  <el-table-column
                    prop="log_type"
                    label="分类"
                    align="left"
                  ></el-table-column>
                </el-table>
                <div
                  class="cPag"
                  style="display: flex; flex-direction: row-reverse"
                >
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    layout="prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <div style="background: #f0f0f0; width: 100%; height: 1px"></div>
          <div class="backBtn" style="margin-bottom: 10px">
            <el-button
              type="primary"
              :loading="loading"
              v-if="tabIndex == 2 && tabIndex != 1"
              @click="nextPrint('dpFormRef')"
              size="small"
              >下一步</el-button
            >
            <el-button
              type="primary"
              :loading="loading"
              v-if="tabIndex == 3"
              @click="exportDiary"
              size="small"
              >打印</el-button
            >
            <el-button class="bback" @click="backStep('dpFormRef')" size="small"
              >返回</el-button
            >
          </div>
        </div>
      </el-dialog>
      <el-dialog
        width="30%"
        title="日志成册"
        :visible.sync="exportVisible"
        :append-to-body="true"
        @close="closeExport('exform')"
      >
        <div>
          <el-form
            @submit.native.prevent
            :model="exportForm"
            :rules="exportRule"
            ref="exform"
            label-width="130px"
          >
            <el-form-item label="日志名称：" prop="logname">
              <el-input
                v-model="exportForm.logname"
                placeholder="请输入日志名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="工程名称：" prop="proname">
              <el-input
                v-model="exportForm.proname"
                placeholder="请输入工程名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="责任人：" prop="personliable">
              <el-input
                v-model="exportForm.personliable"
                placeholder="请输入责任人"
              ></el-input>
            </el-form-item>
            <el-form-item label="编制人：" prop="preparedby">
              <el-input
                v-model="exportForm.preparedby"
                placeholder="请输入编制人"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间：" prop="time">
              <el-date-picker
                v-model="exportForm.time"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div class="pickBtn" style="text-align: center">
            <el-button
              type="primary"
              size="medium"
              @click="exportClick('exform')"
              >确定</el-button
            >
            <el-button size="medium" @click="closeExport('exform')"
              >取消</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'diaryPrintList',
  data() {
    var validateNumber = (rule, value, callback) => {
      const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;

      if (!reg.test(value)) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    return {
      proVisible: false,
      projectList: [],
      dpRule: {
        jscorp: [
          {
            required: true,
            message: '建设单位不能为空',
            trigger: 'blur',
          },
        ],
        proname: [
          {
            required: true,
            message: '工程名称不能为空',
            trigger: 'blur',
          },
        ],
        sgcorp: [
          {
            required: true,
            message: '施工单位不能为空',
            trigger: 'blur',
          },
        ],
        time: [
          {
            required: true,
            message: '施工日期不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      dpForm: {
        jscorp: '',
        proname: '',
        sgcorp: '',
        time: '',
      },
      taskTypeGetList: [],
      activeConIndex: 0,
      tabList: [
        { name: '选择打印日志类型', id: 1 },
        { name: '编辑日志封面', id: 2 },
        { name: '选择打印日志', id: 3 },
      ],
      searchForm: {
        startTime: '',
        endTime: '',
        type: '',
      },
      tabIndex: 1,
      exportRule: {
        logname: [
          {
            required: true,
            message: '日志名称不能为空',
            trigger: 'blur',
          },
        ],
        proname: [
          {
            required: true,
            message: '工程名称不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        personliable: [
          {
            required: true,
            message: '责任人不能为空',
            trigger: 'blur',
          },
        ],
        preparedby: [
          {
            required: true,
            message: '编制人不能为空',
            trigger: 'blur',
          },
        ],
        time: [
          {
            required: true,
            message: '时间不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      pickerVisible: false,
      pickerNum: 9,
      exportForm: {
        logname: '',
        corp_id: this.$store.state.cid,
        logccid: '',
        userid: this.$store.state.userInfo.uid,
        logname: '',
        proname: '',
        personliable: '',
        preparedby: '',
        time: '',
      },
      exportVisible: false,
      deleteVisible: false,
      taskList: [],
      taskPrintList: [],
      drawerVisible: false,
      searchName: '',
      taskTypeList: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
      total2: '',
      pagesize2: 10,
      currentPage2: 1,
      tagsData: [],
      tagsPeopleData: [],
      AllPeopleVisible: false,
      AllSendPeopleVisible: false,
      loading: false,

      peoplePickVisible: false,

      loading: false,
      deleteDId: '',
      multipleDiary: [],
      newID: '',
      selectTypeID: '',
      diaryName: '',
      setMouldID: '',
      wasSelectData: [],
      multSelectData: [],
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
          .post('/journal/logworddel', {
            id: this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              this.currentPage = 1;
              this.getList();
              this.$message.warning(`${res.data.msg}`);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        _this.$message.warning('请您选择');
      }
    },
    editTask(row) {
      dd.ready(function() {
        dd.biz.util.openSlidePanel({
          url: row.url, //打开侧边栏的url
          title: '查看日志', //侧边栏顶部标题
          onSuccess: function(result) {},
          onFail: function() {},
        });
      });
    },
    //返回
    closePrintExport() {
      this.proVisible = false;
      this.dpForm = {
        jscorp: '',
        proname: '',
        sgcorp: '',
        time: '',
      };
      this.$nextTick(() => {
        this.$refs['dpFormRef'].clearValidate();
      });
    },
    backStep(formName) {
      if (this.tabIndex == 1) {
        this.proVisible = false;
      } else if (this.tabIndex == 2) {
        this.tabIndex = 1;
        this.activeConIndex = 0;
        this.dpForm = {
          jscorp: '',
          proname: '',
          sgcorp: '',
          time: '',
        };
        this.$nextTick(() => {
          this.$refs['dpFormRef'].clearValidate();
        });
      } else if (this.tabIndex == 3) {
        this.tabIndex = 2;
        this.activeConIndex = 1;
        this.dpForm = JSON.parse(JSON.stringify(this.dpForm));
      }
    },
    //----下一步
    nextPrint(formName) {
      const _this = this;
      _this.getPList();
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/journal/recordlogcover', {
              engineering_name: _this.dpForm.proname,
              logtype: _this.diaryName,
              construction_unit: _this.dpForm.jscorp,
              build_unit: _this.dpForm.sgcorp,
              build_date: _this.dpForm.time,
            })
            .then(res => {
              if (res.data.code == 1) {
                _this.getTaskList();
                _this.loading = false;
                _this.setMouldID = res.data.id;
                _this.tabIndex = 3;
                _this.activeConIndex = 2;
              } else {
                _this.loading = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: '2000',
                });
              }
            })
            .catch(function(error) {
              _this.loading = false;
              _this.$message({
                message: error.data,
                type: 'error',
                duration: '2000',
              });
              console.log(error);
            });
        } else {
          _this.loading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    printExcel() {},
    openDo() {
      this.activeConIndex = 0;
      this.tabIndex = 1;
      this.getLogList();
      this.proVisible = true;
    },
    newAddTask(item) {
      this.selectTypeID = item.tmpname;
      this.tabIndex = 2;
      this.activeConIndex = 1;

      this.diaryName = item.tmpname;
    },
    typeClick(item, index) {
      this.tabIndex = item.id;
      this.activeConIndex = index;
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    // tableHeaderClass({ row, rowIndex }) {
    //     return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    // },
    // tableRowClass({ row, rowIndex }) {
    //     return 'color:#5f5f5f;border-color:#F1F8FF;';
    // },
    diaryPrintChange(val) {
      this.multiplePDiary = val;
    },
    diaryChange(val) {
      this.multipleDiary = val;
    },
    exportDiary() {
      const _this = this;
      //已选中或选中的值
      if (_this.wasSelectData.length > 0 || _this.multipleDiary.length > 0) {
        // let newMult = [],
        let newLogid = [],
          sendMul = [];
        //如果当前页有选中值
        if (_this.multipleDiary.length > 0) {
          newLogid = _this.multipleDiary.map(item => {
            if (!item.id) return '';
            return item.id;
          });
          //如果有其他也选中值
          if (_this.wasSelectData.length > 0) {
            sendMul = _this.wasSelectData.concat(newLogid);
          } else {
            sendMul = newLogid;
          }
        } else {
          let newMult = _this.taskList.map(item => {
            if (!item.id) return '';
            return item.id;
          });
          sendMul = _this.wasSelectData.filter(items => {
            if (!newMult.includes(items)) return items;
          });
        }
        dd.ready(function() {
          dd.runtime.permission.requestAuthCode({
            corpId: _this.$store.state.cid,
            onSuccess: function(result) {
              _this.$axios
                .post('/journal/logupword', {
                  logid: sendMul,
                  coverid: _this.setMouldID,
                  code: result.code,
                })
                .then(res => {
                  if (res.data.code == 1) {
                    _this.getList();
                    _this.$message.success('日志打印成功');
                    _this.proVisible = false;
                    _this.wasSelectData = [];
                    _this.$refs.mulTable.clearSelection();
                  } else {
                    _this.$message.warning(res.data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            },
            onFail: function(err) {},
          });
        });
      } else {
        _this.$message.warning('请您先选择');
      }
    },
    downP(row) {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
          auth: 'download',
          fields: row.media_id,
        })
        .then(res => {
          if (res.data.code == 1) {
            dd.ready(function() {
              dd.biz.cspace.preview({
                corpId: _this.$store.state.cid,
                spaceId: row.spaceid,
                fileId: row.media_id,
                fileName: row.logname,
                fileSize: row.size,
                fileType: row.filetype,
                onSuccess: function() {},
                onFail: function(err) {},
              });
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //成册
    exportClick(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/journal/logupword', this.exportForm)
            .then(res => {
              if (res.data.code == 1) {
                dd.ready(function() {
                  dd.biz.util.openLink({
                    url: res.data.path, //要打开链接的地址
                    onSuccess: function(result) {
                      _this.$message.success('日志打印成功');
                      _this.exportVisible = false;
                      // _this.$refs.multipleTable.clearSelection();
                    },
                    onFail: function(err) {
                      console.log(err);
                    },
                  });
                });
              } else {
                _this.$message.warning(res.data.msg);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          _this.loading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeExport() {
      this.exportVisible = false;
      this.exportForm = {
        logname: '',
        corp_id: this.$store.state.cid,
        projectname: this.$store.state.projectInfo.pname,
        logccid: '',
        userid: this.$store.state.userInfo.uid,
        logname: '',
        proname: '',
        personliable: '',
        preparedby: '',
        time: '',
      };
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTaskList();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getList();
    },
    getLogList() {
      const _this = this;
      _this.$axios
        .post('/journal/loglisttype')
        .then(res => {
          if (res.data.code == 1) {
            _this.taskTypeGetList = res.data.tmpname;
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取列表
    getList() {
      const _this = this;
      _this.$axios
        .post('/journal/logwordlist', {
          current_page: _this.currentPage2,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.taskPrintList = res.data.content.list;
            _this.total2 = res.data.content.total;
            if (_this.total2 > 0 && _this.taskPrintList.length < 1) {
              _this.currentPage = res.data.content.page;
              _this.getList();
            }
          } else {
            _this.$message({
              type: 'warning',
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //搜索
    searchClick() {
      this.currentPage = 1;
      this.getTaskList();
    },
    //获取日志列表
    getTaskList() {
      const _this = this;
      let newWas = [],
        newLogid = [],
        newMult = [];
      if (_this.multipleDiary) {
        newMult = _this.multipleDiary.map(item => {
          if (!item.id) return '';
          return item.id;
        });
      }
      newWas = _this.wasSelectData.concat(newMult);
      _this.$axios
        .post('/journal/loglist', {
          starttime: _this.searchForm.startTime,
          stoptime: _this.searchForm.endTime,
          current_page: _this.currentPage,
          datecontrast: newWas,
          logtype: _this.diaryName,
          status: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            let newSelect = [];
            _this.taskList = res.data.content.list;
            _this.total = res.data.content.total;
            _this.wasSelectData = res.data.datecontrast1;
            if (_this.total > 0 && _this.taskList.length < 1) {
              _this.currentPage = res.data.content.page;
              _this.getTaskList();
            }
            if (_this.taskList.length > 0) {
              _this.$nextTick(() => {
                _this.taskList.forEach(row => {
                  if (row.checket == true) {
                    _this.$refs.mulTable.toggleRowSelection(row, true);
                  }
                });
              });
            }
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPList() {
      this.$axios.post('/project/projectInfoRegisterZbList').then(res => {
        if (res.data.code == 1) {
          this.projectList = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.getPList();
  },
  created() {
    this.$utils.checkding();
    this.getList();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.searchForm.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.searchForm.startTime;
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
.main {
  .content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    .page {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .liu-steps {
    padding: 10px 20px;
  }
}
</style>
