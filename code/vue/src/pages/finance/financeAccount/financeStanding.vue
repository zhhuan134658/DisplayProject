/* * @Author: NorthWind * @Date: 2020-12-12 14:22:54 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-26 10:02:34 */
<template>
  <div id="projectTotalCost">
    <!-- 项目总成本 -->
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
              <el-form-item label="账户名称:" class="widths">
                <el-select
                  v-model="formInline.accountname"
                  filterable
                  clearable
                  placeholder="请选择账户"
                >
                  <el-option
                    v-for="(item, index) in accountList"
                    :key="index"
                    :label="item.accountname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="searchTime widths" label="开始时间:">
                <el-date-picker
                  v-model="formInline.startTime"
                  :picker-options="pickerStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="searchTime widths" label="结束时间:">
                <el-date-picker
                  v-model="formInline.endTime"
                  :picker-options="pickerEnd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="项目名称:" class="widths">
                <el-select
                  v-model="formInline.xmname"
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

              <!-- <el-form-item label="申请人">
                <div class="el-input el-input--suffix names" @click="addManyP1">
                  {{ formInline.namesa }}
                </div>
              </el-form-item> -->
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
        <el-row class="maincBtn">
          <!-- <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="deleteList"
                        >删除</el-button
                    > -->
          <!-- <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="backList"
                        >还原</el-button
                    > -->
          <el-button
            type="primary"
            plain
            size="medium"
            icon="el-icon-download"
            @click="exportList"
            >导出</el-button
          >
        </el-row>
        <el-table
          :border="true"
          class="moterialTotalClass"
          :max-height="650"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          @header-dragend="checkWidth"
          ref="table"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column fixed type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            v-if="statusty == 1"
            prop="project_name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            v-else
            prop="accountname"
            label="账户名称"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="riqi"
            label="日期"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="settle_type"
            label="资金类别"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="pay_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于收款管理的“收款金额”</div>
                <div>收入金额</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="zc_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于付款管理的“付款金额”，费用报销的“报销金额”
                </div>
                <div>支出金额</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="jy_money"
            align="left"
            :show-overflow-tooltip="true"
            ><template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=期初金额+收入金额-支出金额</div>
                <div>结余金额</div>
              </el-tooltip>
            </template></el-table-column
          >
          <el-table-column
            prop="name"
            label="发起人"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="beizhu"
            label="备注"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center Zindex" >小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="shouruxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ shouruxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zhichuxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ zhichuxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center Zindex">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="shouruheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ shouruheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zhichuheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ zhichuheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
              </div>
            </div>
          </div>
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
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'projectTotalCost',
  data() {
    return {
      newid: '',
      statusty: 1,
      allProjectList: [],
      formInline: {
        xmname: '',
        accountname: '',
        accountnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name: '',
        send_userid: '',
        namesa: '请选择申请人',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      shouruxiaoji: 0,
      zhichuxiaoji: 0,
      jieyuxiaoji: 0,
      shouruheji: 0,
      zhichuheji: 0,
      jieyuheji: 0,
      accountList: [],
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
    addManyP1() {
      const that = this;
      dd.ready(function() {
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
          onSuccess: function(result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // });
            console.log(result.users[0], '**---**--*-');
            // that.addRoleUser(result.users);
            that.formInline.send_name = result.users[0].name;
            that.formInline.namesa = result.users[0].name;

            that.formInline.send_userid = result.users[0].emplId;
          },
          onFail: function(err) {
            console.log(err);
          },
        });
      });
      dd.error(function(err) {
        console.log(err);
      });
    },
    resetClick() {
      this.formInline.accountname = '';
      this.formInline.startTime = '';
      this.formInline.endTime = '';
      this.formInline.xmname = '';
      (this.formInline.namesa = '请选择申请人'),
        (this.formInline.send_name = ''),
        (this.formInline.send_userid = ''),
        this.getList();
    },
    adjustWidth() {
      const _this = this;
      _this.$nextTick(() => {
        let newW = document.getElementsByClassName(
          'el-table__append-wrapper',
        )[0];
        _this.$utils.utilAdjustWidth(
          _this.$refs.table,
          newW,
          _this.$refs.sum_xiaoji,
          _this.$refs.sum_heji,
        );
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
    handleSizeChange(val) {
      this.pagesize = val;

      if (this.statusty == 0) {
        this.getList2();
      } else {
        this.getList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.statusty == 0) {
        this.getList2();
      } else {
        this.getList();
      }
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
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
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/project/ticketRegister')
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.data;
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
      if (this.formInline.xmname) {
        this.statusty = 0;
        this.currentPage = 1;
        this.getList2();
      } else {
        this.statusty = 1;
        this.currentPage = 1;
        this.getList();
      }
    },
    getList(val) {
      if (val) {
        this.newid = val;
      } else {
        this.newid = this.formInline.accountname;
      }
      this.$axios
        .post('/finance/collectbranch', {
          current_page: this.currentPage,
          starttime: this.formInline.startTime,
          endtime: this.formInline.endTime,
          id: this.newid,
          num: this.pagesize,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
          lian_ying:this.formInline.lian_ying

        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.shouruxiaoji = res.data.pay_money_xj;
            this.zhichuxiaoji = res.data.zc_money_xj;
            this.shouruheji = res.data.pay_money_zj;
            this.zhichuheji = res.data.zc_money_zj;
            this.jieyuheji = this.tpList[this.tpList.length - 1].jy_money;
            this.$nextTick(() => {
              this.adjustWidth();
              setTimeout(() => {
                this.adjustWidth();
              }, 500);
              if (document.body.scrollHeight > window.innerHeight) {
                setTimeout(() => {
                  this.adjustWidth();
                }, 1000);
              }
            });

            // if (this.total > 0 && this.tpList.length < 1) {
            //   this.currentPage = res.data.content.page;
            //   this.getList();
            // }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取列表
    getList2() {
      this.$axios
        .post('/finance/collectbranchpro', {
          project_name: this.formInline.xmname,
          current_page: this.currentPage,
          starttime: this.formInline.startTime,
          endtime: this.formInline.endTime,
          id: this.formInline.accountname,
          num: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.shouruxiaoji = res.data.pay_money_xj;
            this.zhichuxiaoji = res.data.zc_money_xj;
            this.shouruheji = res.data.pay_money_zj;
            this.zhichuheji = res.data.zc_money_zj;
            this.jieyuheji = this.tpList[this.tpList.length - 1].jy_money;
            this.$nextTick(() => {
              this.adjustWidth();
              setTimeout(() => {
                this.adjustWidth();
              }, 500);
              if (document.body.scrollHeight > window.innerHeight) {
                setTimeout(() => {
                  this.adjustWidth();
                }, 1000);
              }
            });

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
              .post('/project/ticketRegisterDel', {
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
        .post('/project/ticketRegisterReduction')
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
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post('/project/fileDownloadDel', { path: url })
        .then(res => {
          if (res.data.code == 1) {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.formInline.xmname) {
        _this.$axios
          .post('/finance/projectdc', {
            project_name: _this.formInline.xmname,
            id: _this.formInline.accountname,
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
        _this.$axios
          .post('/finance/collectbranchdc', {
            id: _this.formInline.accountname,
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
      }
    },
    getAccount() {
      this.$axios
        .post('/finance/accountname', {
          id: this.multSelectData,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.accountList = res.data.content;
            this.formInline.accountname = this.accountList[0].id;
            this.getList(this.formInline.accountname);
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
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
    this.getAccount();
  },
  created() {
    console.log(window.location.href);
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    // this.getList();
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
.widths{
  width: 260px !important;
}
.Zindex{
    z-index: 999;
}
</style>
