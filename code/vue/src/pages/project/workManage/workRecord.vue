/* * @Author: NorthWind * @Date: 2021-02-19 14:24:09 * @Last Modified by:
Liuzhipeng * @Last Modified time: 2021-12-09 16:02:10 */
<template>
  <div id="workMoney">
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
        <el-row class="maincBtn">
          <el-button type="primary" size="medium" @click="newAdd"
            >新建</el-button
          >
          <!-- <el-button
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
                        @click="exportIn"
                        >导入</el-button
                    >
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="exportList"
                        >导出</el-button
                    > -->
        </el-row>
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            label="记工本名称"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                @click="goInfo(scope.row)"
                style="cursor: pointer; color: #409eff"
                >{{ scope.row.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="foreman"
            label="班组长"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="all_money" label="总工钱（元）" align="left">
          </el-table-column>
          <el-table-column prop="all_people_num" label="总人数" align="left">
          </el-table-column>
          <el-table-column
            prop="td_jg_num"
            label="今日记工人数"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column prop="created" label="创建时间" align="left">
          </el-table-column>
          <el-table-column label="操作" align="left" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style="margin-right: 12px"
                @click="checkList(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click.stop="
                  printPDF(scope.row.id).catch(err => {
                    console.log(err);
                  })
                "
                >打印</el-button
              >

              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteList(scope.row)"
              >
                <el-button size="mini" type="text" slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
              <!-- <el-button
                                size="mini"
                                type="danger"
                                @click="deleteList(scope.row)"
                                >删除</el-button
                            > -->
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
      <el-dialog
        :title="newDialogTitle"
        :visible.sync="addFormVisible"
        @close="titleCancel('addEditForm')"
        width="600px"
      >
        <el-form
          @submit.native.prevent
          :model="addUserForm"
          label-width="160px"
          :rules="addUserFormRules"
          ref="addEditForm"
          label-position="right"
        >
          <div>
            <el-form-item label="记工本名称：" prop="name">
              <el-input
                v-model="addUserForm.name"
                maxlength="50"
                placeholder="请输入名称"
                :readonly="viewType == 2 ? true : false"
              ></el-input>
            </el-form-item>
            <el-form-item label="班组长姓名：" prop="foreman">
              <el-input
                v-model="addUserForm.foreman"
                maxlength="10"
                placeholder="请输入姓名"
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
  name: 'workRecord',
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
          labelName: '记工本名称',
          labelData: 'name',
        },
      ],
      labelPosition: 'right',
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      upFormVisible: false,
      upForm: { url: '' },
      options: [],
      addFormVisible: false,
      newDialogTitle: '添加',
      addUserFormRules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        foreman: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
          },
        ],
      },

      addUserForm: {
        name: '',
        foreman: '',
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
    async getPrintableStatus() {
      const res = await this.$axios.post('/finance/control_display', {
        tableName: 'ji_gong_class',
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === '1';
      }
    },

    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post('/finance/dc_pdf', {
        tableName: 'ji_gong_class',
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
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
    fortStatus(row) {
      switch (row.status) {
        case '1':
          return '审批中';
          break;
        case '2':
          return '审批同意';
          break;
        case '3':
          return '审批拒绝';
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
    goInfo(row) {
      this.$router.push({
        path: '/projetcout/workRecordInfo',
        query: { id: row.id, name: row.name },
      });
    },
    //查看审批
    checkList(row) {
      const _this = this;
      _this.viewType = 2;
      _this.newDialogTitle = '编辑';
      _this.addFormVisible = true;
      _this.$nextTick(() => {
        _this.addUserForm = {
          id: '',
          name: '',
          foreman: '',
        };
        let newForm = JSON.parse(JSON.stringify(row));
        _this.addUserForm.id = newForm.id;
        _this.addUserForm.name = newForm.name;
        _this.addUserForm.foreman = newForm.foreman;
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
        .post('/projectthree/banZuList', {
          page: this.currentPage,
          number: 10,
          name: this.formInline.name,
            send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.total;
            this.tpList = res.data.data;
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page;
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
    deleteList(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios
            .post('/projectthree/banZuDel', {
              id: row.id,
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
          message: '请先勾选要删除的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    titleCancel(formName) {
      this.addFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //新建基础按钮
    titleSave(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.viewType == 1) {
            _this.$axios
              .post('/projectthree/addBanZu', _this.addUserForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
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
              .post('/projectthree/banZuEdit', _this.addUserForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
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
  },
  created() {
    this.$utils.checkding();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.workTypeList = this.$utils.utilWorkerType();
    this.getList();
    this.getPrintableStatus();
  },
};
</script>
