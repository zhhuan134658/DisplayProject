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
            <!-- <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            > -->
          </div>
          <div class="mmbRight">
            <!-- <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            > -->
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <!-- <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
            > -->
            <!-- <el-button
              v-if="$store.state.userInfo.admin == 1"
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            > -->
          </div>
        </el-row>
        <!-- :istwo="true"  判断是否展示合计 -->
        <!-- :isHeji='true' -->

        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          :isOne="true"
          :istwo="true"
          @showJl="showJl"
          @listenChild="getMult"
          @clearAdd="clearAdd"
          @viewDia="viewDia1"
          printTableName="zhukuai_finance_accountnews"
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
      title="利润调整"
      :visible.sync="payVisible"
      :close-on-click-modal="false"
      width="500px"
      class="view_change_title"
      @close="elane"
    >
      <el-form @submit.native.prevent :model="payenfo" class="demo-form-inline">
        <div class="hlBottom">
          <el-form-item label="调整金额(元):">
            <el-input
              v-model="payenfo.money"
              clearable
              placeholder="请输入"
            ></el-input>
            <!-- <div style="color:red;font-size:12px;">公摊金额不能超出明细金额</div> -->
          </el-form-item>

          <el-form-item label="调整类型  :" prop="accountname">
            <el-radio-group
              v-model="payenfo.biao_shi"
              style="display: flex; align-items: center; margin-top: 13px"
            >
              <el-radio label="利润调增">利润调增</el-radio>
              <el-radio label="利润调减">利润调减</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="调整原因  :" prop="accountname">
            <el-input
              v-model="payenfo.remarks"
              clearable
              placeholder="请输入"
              style="margin-left: 6px; width: 280px"
              type="textarea"
            ></el-input>
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

    <el-dialog title="利润调整记录" :visible.sync="dialogVisible1">
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="biao_shi" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="money" label="调整金额"> </el-table-column>
        <el-table-column prop="remarks" label="描述"> </el-table-column>
        <el-table-column prop="extend_two" label="操作人"> </el-table-column>
        <el-table-column width="135" prop="created" label="时间">
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="" width="120">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定取消利润增减吗？"
              @confirm="deleteFiles(scope.row)"
              v-if="scope.row.status != '0'"
            >
              <el-button type="text" slot="reference" size="mini"
                >取消</el-button
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

    <!-- 穿透 -->
    <el-dialog title="数据来源" width="80%" :visible.sync="viewVisible">
      <pierceTable
        :tableList="tableList"
        :key="pierceTableid"
        :titleName="titleName"
        :taPLoading="taPLoading"
        :totalMoney="totalMoney"
        :proName="proName"
      ></pierceTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewVisible = false">取 消</el-button>
        <el-button type="primary" @click="viewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import draggable from 'vuedraggable';
import commonTable from '@/components/commonTable.vue';
import pierceTable from '@/components/Piercethrough/pierceTable.vue';

export default {
  name: 'financeAccountInfo',
  components: { draggable, commonTable, pierceTable },
  data() {
    return {
      tableloading: false,
      payVisible: false,
      pierceTableid: +new Date(),
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      tableData1: [],
      payenfo: {
        money: '',
        biao_shi: '利润调增',
        project_id: '',
        project_name: '',
        remarks: '',
        username: '',
      },
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
      dialogVisible1: false,
    };
  },
  methods: {
    viewDia1(row, column, cell, event) {
      //  console.log(row, column, cell, event)
      console.log(column.property);
      this.pierceTableid = +new Date();
      this.titleData = '数据来源';
      if (column.property == 'revenue_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'收入金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'zhi_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'直接费金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'jian_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'间接费金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'shui_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'税金金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      }
    },
    getpierceList1(project_name, row, column) {
      console.log(row, 'rowrowrow');
      this.$axios
        .post('/newtao/estimateProfitBaoPierce', {
          project_name: row.name,
          biao_shi: column.property,
        })
        .then(res => {
          let onenewArr = ['zhi_money', 'zong_lv', 'jian_money', 'shui_money'];
          let twonewArr = ['revenue_money', 'xiaox_money'];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'revenue_money') {
            this.tableList = [res.data.revenue_contract, res.data.revenue_visa];
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    deleteFiles(row) {
      console.log(row);
      this.$axios
        .post('/projectone/profitInorde', {
          cx_id: row.id,
          project_id: row.project_id,
          project_name: row.project_name,
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
    showJl(row) {
      this.dialogVisible1 = true;
      this.$axios
        .post('/order/profitInordeShow', { project_id: row.id })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data.reverse();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    payenfos() {
      console.log(this.payenfo);
      this.$axios
        .post('/projectone/profitInorde', this.payenfo)
        .then(res => {
          if (res.data.code == 1) {
            this.payVisible = false;
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
    clearAdd(row) {
      console.log(row);
      this.payVisible = true;
      this.payenfo.project_id = row.id;
      this.payenfo.project_name = row.name;
      this.payenfo.username = this.$store.state.userInfo.uname;
    },
    searList() {
      this.$axios.post('/spread/projectNature').then(res => {
        this.natureProject1 = res.data.data;
      });
    },
    elane() {
      this.payenfo = {
        money: '',
        biao_shi: '利润调增',
        project_id: '',
        project_name: '',
        remarks: '',
        username: '',
      };
      this.payVisible = false;
      //  this.dialogVisible = false;
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
          name: 'zhukuai_finance_accountnews',
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
        .post('/finance/accountnews')
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.content.process_code;
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
      this.tableloading = true;
      this.$axios
        .post('/projectone/estimateProfitBao', {
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
            this.titleList = res.data.mould_data;
            this.footerNumList = [];
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data;
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
              .post('/finance/accountnewsdel', {
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
          .post('/projectone/estimateProfitBaoDownload', {
            list: _this.multSelectData,
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
