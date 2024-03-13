/*
 * @Author: NorthWind 
 * @Date: 2020-12-09 18:01:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-16 14:12:24
 */
<template>
  <div id="safeCheck">
    <!-- 案件执行 -->
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
            <el-button
              v-if="$store.state.userInfo.admin == 1"
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            >
          </div>
          <!-- <div class="mmbLeft">
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
                            @click="exportList"
                            >导出</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            round
                            @click="updateList"
                            >刷新</el-button
                        >
                    </div>
                    <div
                        class="mmbRight"
                        v-if="$store.state.userInfo.admin == 1"
                    >
                        <i class="el-icon-s-tools"></i>
                        <el-button type="text" @click="viewShow"
                            >设置显示字段</el-button
                        >
                    </div> -->
        </el-row>
        <commonTable
          :tableloading="tableloading"
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
      </div>
    </div>
    <el-dialog
      title="选择案件管理"
      :visible.sync="newVisible"
      :close-on-click-modal="false"
      width="900px"
      @close="newCancel"
      class="view_change_title"
    >
      <div class="header">
        <div class="headerContent">
          <el-form
            @submit.native.prevent
            :inline="true"
            :model="newformInline"
            class="demo-form-inline"
            style="display: flex"
          >
            <div class="hlBottom">
              <el-form-item label="项目名称:">
                <el-select
                  v-model="newformInline.project_name"
                  clearable
                  filterable
                  placeholder="请选择项目"
                >
                  <el-option
                    v-for="(item, index) in allProjectList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="hlTop">
              <div class="hltl">
                <el-button
                  type="primary"
                  size="medium"
                  @click="newsearchClick"
                  style="margin-right: 30px"
                  >搜索</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <el-table
        :border="true"
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange1"
        style="width: 100%"
      >
        <el-table-column
          property="project_name"
          label="项目"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          property="judge"
          label="经办法官"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          property="judge_mobile"
          label="法官电话"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          property="contract_name"
          label="合同"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="newhandleCurrentChange"
        :current-page.sync="newcurrentPage"
        :page-size="newpagesize"
        :total="newtotal"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="newCancel">取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          :loading="loaded"
          @click="newClick"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="关联案件管理"
      :visible.sync="relationVisible"
      :close-on-click-modal="false"
      width="900px"
      @close="relaCancel"
      class="view_change_title"
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
            <el-form-item label="项目:" prop="project_name">
              <el-input
                @focus="showNew"
                v-model="dingLogForm.project_name"
                controls-position="right"
                placeholder="请选择项目"
              ></el-input>
            </el-form-item>
            <el-form-item label="经办法官:" prop="judge">
              <el-input
                readonly
                v-model="dingLogForm.judge"
                controls-position="right"
                placeholder="请输入经办法官"
              ></el-input>
            </el-form-item>
            <el-form-item label="法官电话:" prop="judge_mobile">
              <el-input
                readonly
                v-model="dingLogForm.judge_mobile"
                controls-position="right"
                placeholder="请输入法官电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="合同:" prop="contract_name">
              <el-input
                readonly
                v-model="dingLogForm.contract_name"
                controls-position="right"
                placeholder="请输入合同"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="relaCancel">取 消</el-button>
        <el-button
          size="medium"
          type="primary"
          :loading="loaded"
          @click="relaClick"
          >发起审批</el-button
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
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import draggable from 'vuedraggable';
import commonTable from '@/components/commonTable.vue';
import commonSearch from '@/components/commonSearch.vue';
export default {
  name: 'safeCheck',
  components: { draggable, commonTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },
      ],
      tableloading: false,
      allProjectList: [],
      formInline: {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        inspector: '',
      },
      currentPage: 1,
      newcurrentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      relationVisible: false,
      newVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      dingLogForm: {
        project_name: '',
        judge: '',
        judge_mobile: '',
        contract_name: '',
        gl_id: '',
      },
      tableData: [
        {
          name: '1',
          project_name: '1',
          judge: '1',
          judge_mobile: '1',
          contract_name: '1',
          gl_id: '1',
        },
      ],
      currentRow: null,
      newtotal: 0,
      newpagesize: 10,
      newformInline: {
        project_name: '',
      },
    };
  },
  methods: {
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    resetClick() {
      this.formInline = {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        inspector: '',
      };
      this.getList();
    },
    //获取案件管理列表
    getnewList() {
      this.$axios
        .post('/affairs/caseManageList', {
          page: this.newcurrentPage,
          number: this.newpagesize,

          project_name: this.newformInline.project_name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.newtotal = res.data.count;
            this.tableData = res.data.data;

            if (this.newtotal > 0 && this.tableData.length < 1) {
              this.newcurrentPage = res.data.page_number;
              this.getnewList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getMult(val) {
      this.multSelectData = val;
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
    newsearchClick() {
      this.newcurrentPage = 1;
      this.getnewList();
    },
    //关联
    relaCancel() {
      this.relationVisible = false;
    },
    relaClick() {
      if (!this.dingLogForm.project_name) {
        this.$message({
          type: 'warning',
          message: '请先选择！',
          duration: 1500,
        });
      } else {
        this.$axios
          .post('/affairs/zhixingJiluAdd', this.dingLogForm)
          .then(res => {
            if (res.data.code == 1) {
              const _this = this;
              _this.$axios
                .post('/affairs/caseImplement')
                .then(res => {
                  if (res.data.code == 1) {
                    let newUrl =
                      'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
                      _this.$store.state.cid +
                      '#/custom/?processCode=' +
                      res.data.data;
                    dd.ready(function () {
                      dd.biz.util.openLink({
                        url: newUrl, //要打开链接的地址
                        onSuccess: function (result) {
                          /**/
                        },
                        onFail: function (err) {},
                      });
                    });
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
            }
          });
      }
    },
    showNew() {
      this.getnewList();
      this.newVisible = true;
      console.log('123');
    },
    newCancel() {
      this.newVisible = false;
    },
    newClick() {
      this.newVisible = false;
    },

    handleCurrentChange1(val) {
      this.currentRow = val;

      this.dingLogForm.project_name = val.project_name;
      this.dingLogForm.judge = val.judge;
      this.dingLogForm.judge_mobile = val.judge_mobile;
      this.dingLogForm.contract_name = val.contract_name;
      this.dingLogForm.gl_id = val.gl_id;
      console.log('123456', val);
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
      this.getTitleList();
      this.wFormVisible = true;
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: 'case_implement',
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
            this.getList();
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
    sendTitleList() {
      this.$axios
        .post('/spread/editFiledCurrency', {
          name: 'case_implement',
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    newhandleCurrentChange(val) {
      this.newcurrentPage = val;
      this.getnewList();
    },
    //发起审批
    newAdd() {
      this.relationVisible = true;
      // const _this = this;
      // _this.$axios
      //     .post('/affairs/caseImplement')
      //     .then((res) => {
      //         if (res.data.code == 1) {
      //             let newUrl =
      //                 'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
      //                 _this.$store.state.cid +
      //                 '#/custom/?processCode=' +
      //                 res.data.data;
      //             dd.ready(function () {
      //                 dd.biz.util.openLink({
      //                     url: newUrl, //要打开链接的地址
      //                     onSuccess: function (result) {
      //                         /**/
      //                     },
      //                     onFail: function (err) {}
      //                 });
      //             });
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
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.tableloading = true;
      this.$axios
        .post('/affairs/caseImplementList', {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          inspector: this.formInline.inspector,
          b_number: this.formInline.b_number,
          project_name: this.formInline.project_name,
          shenpi: this.formInline.status,
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
            this.tableloading = false;
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
              .post('/affairs/caseImplementDel', {
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
        .post('/project/safetyInspectionRecordReduction')
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
          .post('/affairs/caseImplementDownload', {
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
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getTitleList();
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