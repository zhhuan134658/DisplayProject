/* * @Author: NorthWind * @Date: 2021-01-26 14:52:36 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-20 08:56:45 */
<template>
  <div id="qualityRectify">
    <!-- 质量整改列表 -->
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
            <div class="hlTop">
              <div class="hltl">
                <el-form-item label="内容：">
                  <el-input
                    v-model="formInline.project_name"
                    clearable
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  round
                  @click="searchClick"
                  >搜索</el-button
                >
              </div>
              <el-button type="primary" size="medium" @click="newAdd"
                >新建</el-button
              >
            </div>
            <div class="hlBottom">
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
              <el-form-item label="回复状态:">
                <el-select
                  v-model="formInline.status"
                  clearable
                  filterable
                  placeholder="请选择回复状态"
                >
                  <el-option label="回复中" value="1"></el-option>
                  <el-option label="已回复" value="2"></el-option>
                  <el-option label="已拒绝" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <!-- <el-row class="maincBtn">
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="deleteList"
                        >删除</el-button
                    >
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="backList"
                        >还原</el-button
                    >
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="exportList"
                        >导出</el-button
                    >
                </el-row> -->
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="reply_content"
            label="回复内容"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="reply_user" label="回复人" align="left">
          </el-table-column>
          <el-table-column
            prop="founder"
            label="发起人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="relation_name"
            label="关联审批单"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column label="审批状态" align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已回复</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >回复中</span
              >
              <span v-else style="color: #f16d6d">已拒绝</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="选择项目发起审批"
      :visible.sync="appVisible"
      @close="approvalCancel('selectEditForm')"
      width="600px"
    >
      <el-form
        @submit.native.prevent
        :model="selectAddForm"
        label-width="130px"
        :rules="selectAddFormRules"
        ref="selectEditForm"
        label-position="right"
      >
        <div>
          <el-form-item label="项目名称：" prop="id" class="projectTypeSelect">
            <el-select
              style="width: 100%"
              v-model="selectAddForm.id"
              filterable
              clearable
              placeholder="请选择项目"
            >
              <el-option
                v-for="item in nextProject"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="approvalSave('selectEditForm')"
            >发起审批</el-button
          >
          <el-button @click="approvalCancel('selectEditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'qualityRectifyBack',
  data() {
    return {
      loading: false,
      selectAddFormRules: {
        id: [
          {
            required: true,
            message: '请选择项目',
            trigger: ['blur', 'change'],
          },
        ],
      },
      selectAddForm: {
        id: '',
      },
      formInline: {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        filler: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      appVisible: false,
      nextProject: [],
    };
  },
  methods: {
    fortStatus(row) {
      switch (row.status) {
        case '1':
          return '回复中';
          break;
        case '2':
          return '已回复';
          break;
        case '3':
          return '已拒绝';
          break;
      }
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;border-color:#F1F8FF;';
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    approvalCancel(formName) {
      this.appVisible = false;
      this.loading = false;
      this.$refs[formName].resetFields();
    },
    //新建基础按钮
    approvalSave(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/task/gettmpcode', {
              corp_id: _this.$store.state.cid,
              tmpname: '质量整改回复',
              xmid: _this.selectAddForm.id,
            })
            .then(res => {
              let newUrl =
                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
                _this.$store.state.cid +
                '#/custom/?processCode=' +
                res.data.process_code;
              dd.ready(function() {
                dd.biz.util.openLink({
                  url: newUrl, //要打开链接的地址
                  onSuccess: function(result) {
                    /**/
                  },
                  onFail: function(err) {},
                });
              });
              _this.appVisible = false;
              _this.loading = false;
              _this.$refs[formName].resetFields();
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
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (column.type != 'selection') {
        dd.ready(function() {
          dd.biz.util.openSlidePanel({
            url: row.url, //打开侧边栏的url
            title: '详情', //侧边栏顶部标题
            onSuccess: function(result) {},
            onFail: function() {
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
    //获取项目
    getNextProject() {
      const _this = this;

      _this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            _this.nextProject = res.data.data;
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //发起审批
    newAdd() {
      const _this = this;
      if (_this.nextProject.length > 0) {
        _this.appVisible = true;
      } else {
        dd.ready(function() {
          dd.device.notification.alert({
            message: '无项目，请您先创建项目才能进行其他操作！',
            title: '提示', //可传空
            buttonName: '收到',
            onSuccess: function() {},
            onFail: function(err) {},
          });
        });
      }
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/task/zlreply', {
          current_page: this.currentPage,
          starttime: this.formInline.startTime,
          endtime: this.formInline.endTime,
          content: this.formInline.project_name,
          status: this.formInline.status,
          corp_id: this.$store.state.cid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
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
  },
  created() {
    this.$utils.checkding();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getList();
    this.getNextProject();
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
