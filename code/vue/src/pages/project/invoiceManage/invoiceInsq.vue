/* * @Author: NorthWind * @Date: 2020-12-15 14:17:29 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 14:17:20 */
<template>
  <div id="financeAccountInfo">
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
              <el-form-item label="项目名称:">
                <el-select
                  v-model="formInline.accountid"
                  @change="accChange"
                  clearable
                  filterable
                  placeholder="请选择项目"
                >
                  <el-option
                    v-for="(item, index) in accountList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
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
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            >
          </div>
        </el-row>
        <!-- :istwo='true' -->
        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          :isShare="true"
          :isdele1="true"
          :isAdmin="false"
          @showShares="showShares"
          @share="share"
          @listenChild="getMult"
          @getlist="getList"
          types="taxes_pay_apply"
          printTableName="taxes_pay_apply"
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

    <el-dialog title="明细" :visible.sync="dialogVisible">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="tax_type" label="税种" width="180">
        </el-table-column>
        <el-table-column prop="money" label="金额"> </el-table-column>
        <el-table-column prop="lj_money" label="已公摊累计金额">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <!-- :disabled="scope.row.status != '2'" -->
            <el-button
              type="text"
              v-if="scope.row.tax_type != '个人所得税'"
              :disabled="Number(scope.row.lj_money) >= Number(scope.row.money)"
              @click="shares(scope.row, '3')"
              >公摊</el-button
            >
            <el-button
              type="text"
              @click="showShares1(scope.row, '3')"
              v-if="scope.row.tax_type != '个人所得税'"
              >查看公摊</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="公摊"
      :visible.sync="payVisible"
      :close-on-click-modal="false"
      width="600px"
      class="view_change_title"
      @close="elane"
    >
      <el-form @submit.native.prevent :model="payenfo" class="demo-form-inline">
        <div class="hlBottom">
          <el-form-item label="项目名称:" prop="accountname">
            <el-select
              v-model="payenfo.project_id"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in xmuList"
                :key="index"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="公摊金额:">
            <el-input
              v-model="payenfo.money"
              clearable
              @input="changes"
              clear="fukuan"
              maxlength="8"
              oninput="value=value.replace(/[^\d.]/g,'')"
              placeholder="请输入公摊金额"
            ></el-input>
            <!-- <div style="color:red;font-size:12px;">公摊金额不能超出明细金额</div> -->
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="elane">取 消</el-button>
        <el-button size="medium" type="primary" @click="payenfos"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="公摊记录"
      :visible.sync="dialogVisible1"
      @close="payCancel"
    >
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        label-width="80px"
        class="demo-form-inline"
      >
        <div class="hlBottom">
          <el-form-item label="项目名称:">
            <el-input
              placeholder="请输入"
              v-model="formInline1.project_name"
              class="input-with-select"
              clearable
            >
              <el-button></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="税种:">
            <el-input
              placeholder="请输入"
              v-model="formInline1.tax_type"
              class="input-with-select"
              clearable
            >
              <el-button></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="操作人:">
            <el-input
              placeholder="请输入"
              v-model="formInline1.extend_two"
              class="input-with-select"
              clearable
            >
              <el-button></el-button>
            </el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button
              type="primary"
              size="medium"
              @click="searchClick1"
              style="margin-right: 10px"
              >搜索</el-button
            >
            <el-button plain size="medium" @click="resetClick1">重置</el-button>
          </div>
        </div>
      </el-form>
      <el-table :data="tableData1" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="project_name" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="tax_type" label="税种"> </el-table-column>
        <el-table-column prop="money" label="公摊金额(元)"> </el-table-column>
        <el-table-column prop="extend_two" label="操作人"> </el-table-column>
        <el-table-column label="操作" fixed="right" align="" width="120">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定取消公摊吗？"
              @confirm="deleteFiles(scope.row)"
              v-if="scope.row.status != '0'"
            >
              <el-button type="text" slot="reference" size="mini"
                >取消公摊</el-button
              >
            </el-popconfirm>

            <el-button v-else type="text" slot="reference" size="mini" disabled
              >已取消</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
          >确 定</el-button
        >
      </span>
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
export default {
  name: 'financeAccountInfo',
  components: { draggable, commonTable },
  data() {
    return {
      tableloading: false,
      dialogVisible: false,
      dialogVisible1: false,
      payVisible: false,
      payenfo: {
        project_id: '',
        project_name: '',
        gl_id: '',
        mx_id: '',
        tax_type: '',
        money: '',
        username: '',
      },
      xmuList: [],
      formInline: {
        accountname: '',
        accountnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        accountid: '',
        send_name: '',
        send_userid: '',
        namesa: '请选择申请人',
        lian_ying: '',
      },
      formInline1: {
        project_name: '',
        tax_type: '',
        extend_two: '',
        id: '',
      },
      natureProject1: [],
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 1,
      accountList: [],
      accountNumList: [],
      tableData: [],
      tableData1: [],
      moneys: '',
      ljmoneys: '',
      ids: '',
    };
  },
  methods: {
    payCancel() {
      this.resetClick1();
      this.dialogVisible1 = false;
    },
    deleteFiles(row) {
      console.log(row);
      this.$axios
        .post('/projecttwo/taxesPublicShare', {
          cx_id: row.id,
          project_id: row.project_id,
          project_name: row.project_name,
          gl_id: row.gl_id,
          mx_id: row.mx_id,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.dialogVisible1 = false;
            this.getList();
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showShares1(row) {
      console.log();
      this.dialogVisible1 = true;
      this.$axios
        .post('/order/taxesPublicShow', { id: this.ids, mx_id: row.id })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showShares(row) {
      console.log(row, 'rowrw', this.formInline1);
      if (row) {
        this.formInline1.id = row.id;
      }
      this.dialogVisible1 = true;
      this.$axios
        .post('/order/taxesPublicShow', {
          id: this.formInline1.id,
          project_name: this.formInline1.project_name,
          tax_type: this.formInline1.tax_type,
          extend_two: this.formInline1.extend_two,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    elane() {
      this.payenfo.money = '';
      this.payenfo.project_id = '';
      this.payVisible = false;
      //  this.dialogVisible = false;
    },
    changes(value) {
      console.log(this.moneys);
      let num = Number(this.lj_moneys) + Number(value);
      if (value > Number(this.moneys)) {
        this.payenfo.money = Number(this.moneys) - Number(this.ljmoneys);
      }
    },
    payenfos() {
      this.xmuList.forEach(e => {
        if (e.id == this.payenfo.project_id) {
          this.payenfo.project_name = e.name;
        }
      });
      this.$axios
        .post('/projecttwo/taxesPublicShare', this.payenfo)
        .then(res => {
          if (res.data.code == 1) {
            this.payVisible = false;
            this.getList();
            this.details();
            // this.dialogVisible = false;
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    share(row) {
      console.log(row, 'rowrowrowrwr');
      this.ids = row.id;
      this.payenfo.gl_id = row.gl_id;
      this.payenfo.tax_type = row.tax_type;
      this.payenfo.username = this.$store.state.userInfo.uname;
      this.$axios
        .post('/order/taxesPayDetailed', {
          id: row.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
            this.dialogVisible = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    details() {
      this.$axios
        .post('/order/taxesPayDetailed', {
          id: this.ids,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
            this.dialogVisible = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    shares(row) {
      this.$utils.utilAllProject();
      console.log(JSON.parse(this.$store.state.allPro), 'setAllPsetAllP');
      this.xmuList = JSON.parse(this.$store.state.allPro);
      this.payenfo.mx_id = row.id;
      this.payenfo.tax_type = row.tax_type;
      this.moneys = row.money;
      this.lj_moneys = row.lj_moneys;
      this.ljmoneys = row.lj_money;
      this.payVisible = true;
    },
    searList() {
      this.$axios.post('/spread/projectNature').then(res => {
        this.natureProject1 = res.data.data;
      });
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    getAccNumber() {
      this.$axios
        .post('/task/accountlinkage', {
          id: this.formInline.accountid,
          type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.accountNumList = res.data.content;
            this.formInline.accountnumber =
              this.accountNumList[0].accountnumber;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    accChange(val) {
      if (val) {
        this.formInline.accountname = this.accountList.find(
          item => item.id == val,
        ).accountname;
      } else {
        this.formInline.accountname = '';
      }
      this.getAccNumber();
    },
    resetClick() {
      this.formInline = {
        accountname: '',
        accountnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        accountid: '',
        send_name: '',
        send_userid: '',
        namesa: '请选择申请人',
        lian_ying: '',
      };
      this.getList();
    },
    resetClick1() {
      this.formInline1.project_name = '';
      this.formInline1.tax_type = '';
      this.formInline1.extend_two = '';

      //   this.formInline1 = {
      //     project_name: '',
      //     tax_type: '',
      //     extend_two: '',
      //   };
      this.showShares();
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
    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },

    addManyP1() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // }); send_name: '',
            console.log(result.users[0], '**---**--*-');
            // that.addRoleUser(result.users);
            that.formInline.send_name = result.users[0].name;
            that.formInline.namesa = result.users[0].name;
            that.formInline.send_userid = result.users[0].emplId;
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
    sendTitleList() {
      this.$axios
        .post('/spread/editFiledCurrency', {
          name: 'taxes_pay_apply',
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
        .post('/projecttwo/taxesPayApplyAdd')
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
    searchClick1() {
      this.showShares();
      console.log('搜索');
      console.log(this.formInline1);
    },
    updateList() {
      this.getList(1);
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: 'taxes_pay_apply',
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
    //获取列表
    getList(ntype) {
      this.tableloading = true;
      this.$axios
        .post('/projecttwo/taxesPayApplyList', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.accountid,
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
            // this.titleList = res.data.mould_data.mould_data;
            this.footerNumList = [];
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
              this.currentPage = res.data.content.page;
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
              .post('/projecttwo/taxesPayApplyDel', {
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
        .post('/finance/reduction', { type: 3 })
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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/projecttwo/taxesPayApplyload', {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              console.log(res.data.data.name, res.data.data.path);
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function (msg) {
                  // 文件下载进度回调
                },
                onSuccess: function (result) {},
                onFail: function () {},
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
    createType() {
      this.$axios
        .post('/project/supplierTypeCreate')
        .then(res => {
          if (res.data.code == 1) {
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
  },
  mounted() {
    this.createType();
    this.$utils.checkding();
    this.getTitleList();
    this.getList();

    this.$utils.commonAllPro().then(res => {
      this.accountList = res;
      //   console.log('9999', res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
  },
  created() {
    this.searList();
    this.projectType = JSON.parse(this.$store.state.pType);
    this.approvalStatus = this.$utils.utilApprovalStatus();
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
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
}
</style>
