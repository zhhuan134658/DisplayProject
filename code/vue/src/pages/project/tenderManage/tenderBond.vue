/*
 * @Author: NorthWind 
 * @Date: 2020-11-27 13:42:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-06-22 17:13:06
 */
<template>
  <div id="tenderBond">
    <!-- 投标保证金申请列表 -->
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
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          :isdata="true"
          :noClick="false"
          :isdele8="true"
          :types="types"
          @creation="creation"
          printTableName="bid_bond_apply"
        ></commonTable>
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
    </div>
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

    <el-dialog
      title="设置提醒日期"
      :visible.sync="wFormVisible1"
      :close-on-click-modal="false"
      width="600px"
      @close="editCancel('AddForm')"
      class="view_change_title"
    >
      <el-form
        @submit.native.prevent
        :model="addForm"
        label-position="right"
        :rules="aufRules"
        ref="AddForm"
        label-width="90px"
      >
        <el-form-item label="提醒人:" prop="user">
          <div class="addManeger" style="display: flex">
            <div class="addMList" v-if="cctagsData.length > 3">
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
              v-for="(item, index) in cctagsData.slice(0, 3)"
              :key="index"
            >
              <div class="mdnList">
                <div class="mdren">
                  <img v-if="item.avatar" :src="item.avatar" alt />
                  <span class="touxiang" v-else>{{
                    2 >= item.name.length
                      ? item.name
                      : item.name.substr(item.name.length - 2, 2)
                  }}</span>
                </div>
                <p>{{ item.name }}</p>
                <i
                  class="el-icon-error"
                  @click="handleClose(item, index, 4)"
                ></i>
              </div>
              <div class="mdnPlus">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="addMList addMListLast">
              <div class="mdnList">
                <div class="mdren" @click="addManyPnew(1)">
                  <span class="touxiang">
                    <i class="el-icon-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="提醒日期:" prop="riqi">
          <el-date-picker
             format="yyyy-MM-dd HH:mm:ss"
                         value-format="yyyy-MM-dd HH:mm:ss"
            v-model="addForm.riqi"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="editCancel('AddForm')"
          >取 消</el-button
        >
        <el-button size="medium" type="primary" @click="editInfo('AddForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="全部提醒人员"
      :append-to-body="true"
      :visible.sync="ccAllPeopleVisible"
      class="contractOpenPeopleDialog"
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px">共有{{ cctagsData.length }}人</div>
      <div class="showAllPeople">
        <div class="addMList" v-for="(item, index) in cctagsData" :key="index">
          <div class="mdnList">
            <div class="mdren">
              <img v-if="item.avatar" :src="item.avatar" alt />
              <span class="touxiang" v-else>{{
                2 >= item.name.length
                  ? item.name
                  : item.name.substr(item.name.length - 2, 2)
              }}</span>
            </div>
            <p>{{ item.name }}</p>
            <i class="el-icon-error" @click="handleClose(item, index, 4)"></i>
          </div>
          <div class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="addMList addMListLast">
          <div class="mdnList">
            <div class="mdren" @click="addManyPnew(1)">
              <span class="touxiang">
                <i class="el-icon-plus"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import commonTable from '@/components/commonTable.vue';
import commonSearch from '@/components/commonSearch.vue';

import draggable from 'vuedraggable';
export default {
  name: 'tenderBond',
  components: { draggable, commonTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '投标项目名称',
          labelData: 'name',
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
          labelName: '审批状态',
          labelData: 'status',
        },
        {
          labelName: ' 项目性质',
          labelData: 'lian_ying',
        },
        // {
        //   labelName: '付款状态',
        //   labelData: 'lian_ying',
        // },
        // {
        //   labelName: '提醒设置状态',
        //   labelData: 'lian_ying',
        // },
      ],
      types: 'bid_bond_apply',
      ccAllPeopleVisible: false,
      formInline: {
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name: '',
        send_userid: '',
        lian_ying: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      wFormVisible1: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
      cctagsData: [],
      addForm: {
        id: '',
        biao_name: 'bid_bond_apply',
        riqi: '',
        project_name: '',
        bond_money: '',
        user: [],
      },
      aufRules: {
        riqi: [
          {
            required: true,
            message: '请选择日期',
            trigger: ['blur', 'change'],
          },
        ],
        user: [
          {
            required: true,
            message: '提醒人不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  methods: {
    openAllPeople(val) {
      this.ccAllPeopleVisible = true;
    },
    handleClose(item, index, type) {
      this.cctagsData.splice(this.cctagsData.indexOf(item), 1);
      this.addForm.user = this.cctagsData;
      // this.editForm.cc_user = this.cctagsData;
    },
    creation(row, type) {
      this.wFormVisible1 = true;
      console.log(type);
      if (type == '1') {
        this.creationShow(row);
      } else {
        this.addForm.id = row.id;
        this.addForm.project_name = row.name;
        this.addForm.bond_money = row.bond_money;
      }
    },
    creationShow(row) {
      this.$axios
        .post('/order/showBondRemindDate', {
          biao_name: 'bid_bond_apply',
          id: row.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log(res.data.data);
            //    this.addForm = res.data.data;
            this.addForm.id = row.id;
            this.addForm.riqi = res.data.data.riqi;
            this.addForm.user = res.data.data.user;
            this.addForm.project_name = row.name;
            this.addForm.bond_money = row.bond_money;
            this.cctagsData = this.addForm.user;
          } else {
          }
        })
        .catch(function (error) {});
    },
    addManyPnew(type) {
      const that = this;
      // that.pickerVisible = true;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 100, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            that.cctagsData = result.users;
            that.addForm.user = that.cctagsData;
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
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    resetClick() {
      this.formInline = {
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name: '',
        send_userid: '',
      };
      this.getList();
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
    //关闭覆盖层
    editCancel(formName) {
      this.wFormVisible1 = false;
      //   this.loading = false;
      this.cctagsData = [];
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    wCancel() {
      this.wFormVisible = false;
      this.wFormVisible1 = false;
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
          this.wFormVisible1 = false;
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
    editInfo(formName) {
      const _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addForm));
          console.log(newData, 'newDatanewDatanewDatanewData');
          _this.$axios
            .post('/order/setBondRemindDate', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.wFormVisible1 = false;
                this.$refs[formName].resetFields();
                _this.getList();
                _this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 2000,
                });
              } else {
                _this.wFormVisible = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 2000,
                });
              }
            })
            .catch(function (error) {
              _this.wFormVisible1 = false;
              _this.$message({
                message: error,
                type: 'error',
                duration: 2000,
              });
            });
        } else {
          console.log('xixiaa1');
        }
      });
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: 'bid_bond_apply',
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
          name: 'bid_bond_apply',
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
    checkList(row, column) {
      const _this = this;
      if (column.type != 'selection') {
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: row.url, //打开侧边栏的url
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
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/project/bidBondApply')
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
      this.$axios
        .post('/project/bidBondApplyList', {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          applicant: '',
          name: this.formInline.name,
          construction_unit: '',
          type: this.formInline.type,
          shenpi: this.formInline.status,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
          lian_ying: this.formInline.lian_ying,
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
            this.footerNumList = [];
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.isFooter = res.data.mould_data.is_heji;
            this.newFooter = res.data.mould_data.mould_data;
            this.titleList.map(item => {
              this.newFooter.forEach(element => {
                if (element.value == item.value) {
                  this.footerNumList.push(element);
                }
              });
            });
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
              .post('/project/bidBondApplyDel', {
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
        .post('/project/bidBondApplyReduction')
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
          .post('/project/bidBondApplyDownload', {
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
    this.allProjectList = JSON.parse(this.$store.state.allZPro);
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllZProject();
    this.projectType = JSON.parse(this.$store.state.pType);
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getTitleList();
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