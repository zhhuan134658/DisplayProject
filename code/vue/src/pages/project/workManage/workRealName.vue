/* * @Author: NorthWind * @Date: 2020-12-09 10:09:24 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 11:41:53 */
<template>
  <div id="workRealName">
    <!-- 劳务实名制列表 -->
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
          </div>
        </el-row>
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
            prop="name"
            label="姓名"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="extend_first"
            label="手机号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="cert"
            label="身份证号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="project_name" label="项目名称" align="left">
          </el-table-column>

          <el-table-column
            prop="work_type"
            label="工种"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="work_content"
            label="工作内容"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column prop="riqi" label="日期" align="left">
          </el-table-column>
          <el-table-column v-if="printable" label="打印" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="
                  printPDF(scope.row.id).catch(err => {
                    console.log(err);
                  })
                "
                >打印</el-button
              >
            </template>
          </el-table-column>

          <!-- <el-table-column label="审批状态" align="left">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status == '2'"
                                style="color: #17C298"
                                >已同意</span
                            >
                            <span
                                v-else-if="scope.row.status == '1'"
                                style="color: #E8A54C"
                                >审批中</span
                            >
                            <span v-else style="color: #F16D6D">已拒绝</span>
                        </template>
                    </el-table-column> -->
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
        :title="newDialogTitle"
        :visible.sync="addFormVisible"
        @close="titleCancel('addEditForm')"
        width="600px"
      >
        <el-form
          @submit.native.prevent
          :model="addUserForm"
          label-width="150px"
          :rules="addUserFormRules"
          ref="addEditForm"
          label-position="right"
        >
          <div>
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="addUserForm.name" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="cert">
              <el-input v-model="addUserForm.cert" maxlength="18"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="extend_first">
              <el-input
                v-model="addUserForm.extend_first"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <el-form-item label="日期：" prop="riqi">
              <el-date-picker
                v-model="addUserForm.riqi"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="项目：" prop="project_id">
              <el-select
                v-model="addUserForm.project_id"
                @change="proChange"
                placeholder="请选择项目"
              >
                <el-option
                  v-for="item in proList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工种：">
              <el-select
                v-model="addUserForm.work_type"
                placeholder="请选择工种"
              >
                <el-option
                  v-for="item in workTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作内容：" prop="work_content">
              <el-input
                type="textarea"
                v-model="addUserForm.work_content"
                maxlength="240"
                show-word-limit
              ></el-input>
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
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'workRealName',
  components: { eupload, commonSearch },
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
      //搜索条件
      formcommonList: [
        {
          labelName: '姓名',
          labelData: 'name',
        },
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },

        {
          labelName: '身份证号',
          labelData: 'cert',
        },

        {
          labelName: '工种',
          labelData: 'work_type',
        },
      ],
      allProjectList: [],
      labelPosition: 'right',
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      printable: false,
      upFormVisible: false,
      upForm: { url: '' },
      options: [],
      addFormVisible: false,
      newDialogTitle: '添加',
      addUserFormRules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        cert: [
          {
            required: true,
            validator: validateCode,
            trigger: 'blur',
          },
        ],
        project_id: [
          {
            required: true,
            message: '项目不能为空',
            trigger: 'blur',
          },
        ],
      },

      addUserForm: {
        name: '',
        riqi: '',
        cert: '',
        project_name: '',
        project_id: '',
        work_type: '',
        work_content: '',
        extend_first: '',
      },
      formInline: {
        cert: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        name: '',
          send_name: '',
        send_userid: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      workTypeList: [],
      proList: [],
      viewType: 1,
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
        cert: '',
        work_type: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        name: '',
          send_name: '',
        send_userid: '',
      };
      this.getList();
    },
    derive() {
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: 'http://dingzhukuai.zzdingyun.com/public/file/劳务实名制登记模板.xls',
          name: '劳务实名制登记模板.xls', //定义下载文件名字
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
        tableName: 'service_realname_register',
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === '1';
      }
    },

    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post('/finance/dc_pdf', {
        tableName: 'service_realname_register',
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
          .post('/projectone/serviceImport', {
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    //查看审批
    checkList(row) {
      const _this = this;
      _this.viewType = 2;
      _this.newDialogTitle = '编辑';
      _this.addFormVisible = true;
      _this.$nextTick(() => {
        _this.addUserForm = {
          work_type: '',
          id: '',
          name: '',
          riqi: '',
          cert: '',
          project_name: '',
          project_id: '',
          work_type: '',
          work_content: '',
          extend_first: '',
        };
        _this.addUserForm = JSON.parse(JSON.stringify(row));
      });
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.newDialogTitle = '添加';
      _this.viewType = 1;
      _this.addFormVisible = true;
      _this.addUserForm.id = '';
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/project/serviceRealnameRegisterList', {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          name: this.formInline.name,
          cert: this.formInline.cert,
          work_type: this.formInline.work_type,
          project_name_jing: this.formInline.project_name,
            send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
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
    getProList() {
      this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            this.proList = res.data.data;
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$axios
              .post('/project/serviceRealnameRegisterDel', {
                id: this.multSelectData,
              })
              .then(res => {
                if (res.data.code == 1) {
                  this.getList();
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
        .post('/project/serviceRealnameRegisterReduction')
        .then(res => {
          if (res.data.code == 1) {
            this.getList();
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
          message: '请先勾选要导出的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    proChange(val) {
      let obj = {};
      obj = this.proList.find(item => {
        return item.id === val;
      });
      this.addUserForm.project_name = obj.name;
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
              .post('/project/serviceRealnameRegister', _this.addUserForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.addFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.addUserForm.project_name = '';
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
                  _this.getList();
                  _this.loading = false;
                  _this.addFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.addUserForm.project_name = '';
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
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.workTypeList = this.$utils.utilWorkerType();
    this.getList();
    this.getProList();
    this.getPrintableStatus();
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
