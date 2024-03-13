<template>
  <div id="spareMoney">
    <!-- 保证金列表 -->
    <div class="main">
      <div class="selectorGroups">
        <div style="padding: 10px">
          <el-tabs v-model="is_complete" @tab-click="handleClick">
            <el-tab-pane label="投标保证金退回" name="1"></el-tab-pane>
            <el-tab-pane label="履约保证金退回" name="2"></el-tab-pane>
            <el-tab-pane label="劳务保证金收取" name="3"></el-tab-pane>
            <el-tab-pane label="分包保证金收取" name="4"></el-tab-pane>
            <el-tab-pane
              label="老数据"
              name="5"
              v-if="identification == '2'"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
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
            <el-button
              type="primary"
              size="medium"
              @click="newAdd"
              v-if="is_complete != 5"
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
        </el-row>
        <!-- <div class="selectorGroups">
              <el-radio-group v-model="is_complete" @change="getGant">
                <el-radio-button label="1">投标保证金退回</el-radio-button>
                <el-radio-button label="2">履约保证金退回</el-radio-button>
                <el-radio-button label="3">劳务保证金收取</el-radio-button>
                <el-radio-button label="4">分包保证金收取</el-radio-button>
                <el-radio-button label="5" v-if="identification == '2'"
                  >老数据</el-radio-button
                >
              </el-radio-group>
            </div> -->
        <commonTable
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          @getlist="getList"
          :codeShow="codeShow"
          :types="biaoName()"
          :isdele9="is_complete != '5' ? true : false"
          printTableName="bond_collection_register"
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
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import commonTable from '@/components/commonTable.vue';
import commonSearch from '@/components/commonSearch.vue';

import draggable from 'vuedraggable';
export default {
  name: 'fsubDepositReturn',
  components: { draggable, commonTable, commonSearch },
  data() {
    return {
      codeShow: '',
      //搜索条件
      formcommonList: [
        {
          labelName: '保证金类型',
          labelData: 'type',
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
          labelName: '项目名称',
          labelData: 'project_name',
        },
        // {
        //   labelName: '审批状态',
        //   labelData: 'status',
        // },
        {
          labelName: '项目性质',
          labelData: 'lian_ying',
        },
      ],
      formInline: {
        type: '',
        project_name: '',
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name: '',
        send_userid: '',
        lian_ying: '',
      },
      isIdentification: false,
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      allProjectList: [],
      is_complete: '1',
      identification: '',
      table_name: 'bond_collection_register',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.resetClick();
      // this.reac
      if (this.is_complete == '4' || this.is_complete == '3') {
        this.formcommonList = [
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
            labelName: ' 收款状态',
            labelData: 'padi_status',
          },
          {
            labelName: '项目性质',
            labelData: 'lian_ying',
          },
        ];
      } else if (this.is_complete == '1' || this.is_complete == '2') {
        this.formcommonList = [
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
            labelName: ' 收款状态',
            labelData: 'padi_status',
          },
          {
            labelName: '项目性质',
            labelData: 'lian_ying',
          },
        ];
      } else {
        this.formcommonList = [
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
            labelName: '项目性质',
            labelData: 'lian_ying',
          },
        ];
      }
      //   this.getList();
      this.titleList = [];
      this.tpList = [];
    },
    biaoName() {
      console.log(this.is_complete);
      let names = '';
      if (this.is_complete == '1') {
        names = 'bid_bond_return';
      } else if (this.is_complete == '2') {
        names = 'income_bond_return';
      } else if (this.is_complete == '3') {
        names = 'services_bond_expenditure';
      } else if (this.is_complete == '4') {
        names = 'sub_bond_expenditure';
      } else {
        names = 'bond_collection_register';
      }
      return names;
    },
    addName() {
      let names = '';
      if (this.is_complete == '1') {
        names = '/projecttwo/bidBondReturn';
      } else if (this.is_complete == '2') {
        names = '/finance/bondreturnapply';
      } else if (this.is_complete == '3') {
        names = '/finance/services_bond_expenditure';
      } else if (this.is_complete == '4') {
        names = '/finance/sub_bond_expenditure';
      } else {
        names = '';
      }
      return names;
    },
    addType() {
      let names = '';
      if (this.is_complete == '1') {
        names = '1';
      } else if (this.is_complete == '2') {
        names = '2';
      } else if (this.is_complete == '3') {
        names = '3';
      } else if (this.is_complete == '4') {
        names = '4';
      } else {
        names = '5';
      }
      return names;
    },
    tableName() {
      let names = '';
      if (this.is_complete == '1') {
        names = 'bid_bond_return';
      } else if (this.is_complete == '2') {
        names = 'income_bond_return';
      } else if (this.is_complete == '3') {
        names = 'services_bond_return';
      } else if (this.is_complete == '4') {
        names = 'sub_bond_return';
      } else {
        names = 'bond_collection_register';
      }
      return names;
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
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
    getGant(val) {
      if (this.is_complete == '4' || this.is_complete == '3') {
        this.formcommonList = [
          {
            labelName: '保证金类型',
            labelData: 'type',
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
            labelName: '项目名称',
            labelData: 'project_name',
          },
          // {
          //   labelName: '审批状态',
          //   labelData: 'status',
          // },
          {
            labelName: '项目性质',
            labelData: 'lian_ying',
          },
          {
            labelName: ' 收款状态',
            labelData: 'padi_status',
          },
        ];
      } else if (this.is_complete == '1' || this.is_complete == '2') {
        this.formcommonList = [
          {
            labelName: '保证金类型',
            labelData: 'type',
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
            labelName: '项目名称',
            labelData: 'project_name',
          },
          // {
          //   labelName: '审批状态',
          //   labelData: 'status',
          // },
          {
            labelName: '项目性质',
            labelData: 'lian_ying',
          },
          {
            labelName: ' 收款状态',
            labelData: 'padi_status',
          },
        ];
      } else {
        this.formcommonList = [
          {
            labelName: '保证金类型',
            labelData: 'type',
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
            labelName: '项目名称',
            labelData: 'project_name',
          },
          // {
          //   labelName: '审批状态',
          //   labelData: 'status',
          // },
          {
            labelName: '项目性质',
            labelData: 'lian_ying',
          },
        ];
      }
      this.getList();
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: this.biaoName(),
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
          name: this.biaoName(),
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
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post(
          _this.addName(),
          // { type: _this.addType() }
        )
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              (_this.is_complete == '1'
                ? res.data.data
                : res.data.content.process_code);
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
    resetClick() {
      this.formInline = {
        type: '',
        project_name: '',
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name: '',
        send_userid: '',
        lian_ying: '',
        padi_status: '',
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    biaoPost() {
      let apiData = { current_page: this.currentPage, num: this.pagesize };
      let allApidata = {
        starttime: this.formInline.startTime,
        stoptime: this.formInline.endTime,
        project_name_jing: this.formInline.project_name,
        status: this.formInline.status,
        type: this.formInline.type,
        send_name: this.formInline.send_name,
        send_userid: this.formInline.send_userid,
        lian_ying: this.formInline.lian_ying,
        mark: this.is_complete,
        padi_status: this.formInline.padi_status,
      };
      let newapi = {
        Post: '',
        newDATA: {},
      };

      if (this.is_complete == '1') {
        newapi.Post = '/projecttwo/bidBondReturnList';
        apiData = { page: this.currentPage, number: this.pagesize };
      } else if (this.is_complete == '2') {
        newapi.Post = '/finance/bondreturnapplylist';
      } else if (this.is_complete == '3') {
        newapi.Post = '/finance/services_bond_expenditurelist';
      } else if (this.is_complete == '4') {
        newapi.Post = '/finance/sub_bond_expenditurelist';
      } else {
        newapi.Post = '/finance/bond_collection_registerlist';
      }
      newapi.newDATA = Object.assign(apiData, allApidata);
      return newapi;
    },
    // bond_collection_registerlist
    //获取列表
    getList(ntype) {
      this.biaoPost();
      this.$axios
        .post(this.biaoPost().Post, this.biaoPost().newDATA)
        .then(res => {
          this.codeShow = res.data.code;
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: '列表刷新成功',
                type: 'success',
                duration: 1500,
              });
            }
            // this.getTitleList();
            // this.total = res.data.content.total;
            // this.tpList = res.data.content.list;
            // this.footerNumList = [];
            // this.isFooter = res.data.mould_data.is_heji;
            this.identification = res.data.identification;
            if (this.isIdentification) {
              if (this.identification != '2') {
                this.is_complete = '1';
                this.getList();
              }

              this.isIdentification = false;
            }
            if (this.is_complete == '1' || this.is_complete == '5') {
              this.total = res.data.count;
              this.tpList = res.data.data;
              this.titleList = res.data.mould_data.mould_data;
            } else {
              this.total = res.data.total;
              this.tpList = res.data.content.list;
              this.titleList = res.data.mould_data.mould_data;
            }
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
            // if (this.total > 0 && this.tpList.length < 1) {
            //   this.currentPage = res.data.content.page;
            //   this.getList();
            // }
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
              .post('/finance/bond_collection_registerdel', {
                id: this.multSelectData,
                type: this.addType(),
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
        .post('/project/revenueContractReduction')
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
        //   更换导出接口
        // _this.$axios
        //   .post('/finance/bond_collection_registerdc', {
        //     id: _this.multSelectData,
        //     table_name: this.biaoName(),
        //     type: this.addType(),
        //   })
        let newApi =
          _this.addType() == 1
            ? '/projecttwo/bidBondReturnDownload'
            : _this.addType() == 2
            ? '/finance/bondreturnapplydc'
            : _this.addType() == 3
            ? '/finance/services_bond_expendituredc'
            : '/finance/sub_bond_expendituredc';
        _this.$axios
          .post(newApi, {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url:
                  _this.addType() == 1
                    ? res.data.data.url
                    : res.data.content.path, //要下载的文件的url
                name:
                  _this.addType() == 1
                    ? res.data.data.name
                    : res.data.content.filename, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {
                  _this.deleteExport(res.data.content.path);
                },
                onFail: function () {
                  _this.deleteExport(res.data.content.path);
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
    this.isIdentification = true;
    this.$utils.checkding();
    this.$utils.utilAllProject();
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
<style scoped>
.selectorGroups {
  /* width: 700px; */
  /* position: absolute; */
  left: 100px;
  top: -7px;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  background-color: white;

  /* padding: 8px; */
}
.el-radio-button__inner,
.el-radio-group {
  display: flex;
  width: 565px;
  /* margin-left: 10px; */
}
.el-radio-button {
  width: 25%;
}
</style>