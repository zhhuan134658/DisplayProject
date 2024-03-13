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
        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          :istwo='true'
          @listenChild="getMult"
          @viewDia='viewDia1'
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
  components: { draggable, commonTable ,pierceTable},
  data() {
    return {
      tableloading: false,
         pierceTableid: +new Date(),
       tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
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
        lian_ying:''
      },
      natureProject1:[],
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
    };
  },
  methods: {
        viewDia1(row, column, cell, event){
      //  console.log(row, column, cell, event)
       console.log(column.property)
      this.pierceTableid = +new Date();
        this.titleData = '数据来源';
       if(column.property == 'collection_money'){
        this.taPLoading = true;
        this.viewVisible=true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'累计收款:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
       }else if(column.property == 'payment_lj'){
       this.taPLoading = true;
        this.viewVisible=true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'累计付款:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
       }else if(column.property == 'kai_money'){
       this.taPLoading = true;
        this.viewVisible=true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'开票金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
       }else if(column.property == 'shou_money'){
       this.taPLoading = true;
        this.viewVisible=true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'收票金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
       }else if(column.property == 'shui_money'){
       this.taPLoading = true;
        this.viewVisible=true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'实缴税金:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
       }
    },
     getpierceList1(project_name, row, column) {
      console.log(row,'rowrowrow');
      this.$axios
        .post('/newtao/shuiWuBaoPierce', {
          project_name:row.name,
          biao_shi: column.property,
        })
        .then(res => {
          let onenewArr = ['kai_money','zong_lv','shou_money','shui_money'];
          let twonewArr = ['revenue_money','xiaox_money'];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property=='collection_money') {
            this.tableList = [
              res.data.con_data,
              res.data.other_data,
            ];
          }else if (column.property=='payment_lj') {
            this.tableList = [
              res.data.lease_payment,
              res.data.material_payment,
                 res.data.other_payment,
              res.data.service_issued,
                 res.data.service_payment,
              res.data.service_spo,
                  res.data.service_wage,
              res.data.sub_payment,
            ];
          }
        
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
       searList(){
       this.$axios.post('/spread/projectNature').then(res=>{
         this.natureProject1 = res.data.data
      })
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
        lian_ying:''
        
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
        .post('/projectone/shuiWuBao', {
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
          .post('/projectone/shuiWuBaoDownload', {
            list: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
                console.log(res.data.data.name,res.data.data.path)
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
