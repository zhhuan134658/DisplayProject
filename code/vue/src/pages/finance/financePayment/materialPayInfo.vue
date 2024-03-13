/* * @Author: NorthWind * @Date: 2020-12-17 10:36:34 * @Last Modified by:
NorthWind * @Last Modified time: 2021-04-07 14:58:08 */
<template>
  <div id="materialPayInfo">
    <!-- 材料付款信息 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <!-- <el-form @submit.native.prevent
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                    >
                        <div class="hlTop">
                            <div class="hltl">
                                <el-form-item label="付款名称:">
                                    <el-input
                                        v-model="formInline.paymentname"
                                        clearable
                                        placeholder="请输入付款名称"
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
                            <el-button
                                type="primary"
                                size="medium"
                                @click="newAdd"
                                >新建</el-button
                            >
                        </div>
                        <div class="hlBottom">
                            <el-form-item label="开始时间:">
                                <el-date-picker
                                    v-model="formInline.startTime"
                                    :picker-options="pickerStart"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间:">
                                <el-date-picker
                                    v-model="formInline.endTime"
                                    :picker-options="pickerEnd"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="编号:">
                                <el-input
                                    v-model="formInline.paymentnumber"
                                    clearable
                                    placeholder="请输入编号"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称:">
                                <el-input
                                    v-model="formInline.proname"
                                    clearable
                                    placeholder="请输入项目名称"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="审批状态:">
                                <el-select
                                    v-model="formInline.status"
                                    clearable
                                    filterable
                                    placeholder="请选择审批状态"
                                >
                                    <el-option
                                        v-for="(item, index) in approvalStatus"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form> -->
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="gyfbankaccount"
            label="账户信息"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="proname"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="paymentname"
            label="付款主题"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="lwdate"
            label="日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="extend2"
            label="期初金额"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="paymentmoney"
            label="付款金额"
            align="left"
            :show-overflow-tooltip="true"
          >
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
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'materialPayInfo',
  data() {
    return {
      formInline: {
        paymentname: '',
        paymentnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        proname: '',
        departmentname: '',
        filledby: '',
        sourcenumber: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
    };
  },
  methods: {
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
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (column.type != 'selection') {
        dd.ready(function() {
          dd.biz.util.openSlidePanel({
            url: row.filename, //打开侧边栏的url
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
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/finance/addaccountnews', { tmpname: '分包付款' })
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.content.process_code;
            dd.ready(function() {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function(result) {
                  /**/
                },
                onFail: function(err) {},
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
        .catch(function(error) {
          console.log(error);
        });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/finance/clpaysituation', {
          current_page: this.currentPage,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page;
              this.getList();
            }
          }
        })
        .catch(function(error) {
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
              .post('/finance/fbpaymentdel', {
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
              .catch(function(error) {
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
        .post('/finance/reduction', { type: 8 })
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
        .catch(function(error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/clfkzhqk_export', {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.content.path, //要下载的文件的url
                name: res.data.content.filename, //定义下载文件名字
                onProgress: function(msg) {
                  // 文件下载进度回调
                },
                onSuccess: function(result) {},
                onFail: function() {},
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: 'warning',
                duration: 1500,
              });
            }
          })
          .catch(function(error) {
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
    this.$utils.checkding();
    this.getList();
  },
  created() {
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
