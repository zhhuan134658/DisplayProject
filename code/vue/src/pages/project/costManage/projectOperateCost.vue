/*
 * @Author: NorthWind 
 * @Date: 2020-12-12 14:34:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-01-21 17:01:45
 */
<template>
  <div id="projectOperateCost">
    <!-- 项目运营成本 -->
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
            round
            @click="exportList"
            >导出</el-button
          >
        </el-row>
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          @header-dragend="checkWidth"
          border
          ref="table"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="revenue_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：收入合同的'合同金额'</div>
                <div>合同金额</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="collection_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：合同收款的'收款金额'</div>
                <div>收入总额</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="reimbursement"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：费用报销的'报销金额'</div>
                <div>间接费用</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="材料费" align="left">
            <el-table-column
              prop="material_contract"
              label="材料合同"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="material_payment"
              label="已付材料款"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="material_warehousing"
              label="入库材料费"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table-column>

          <el-table-column label="人工费" align="left">
            <el-table-column
              prop="xfgz_money"
              label="应发工资"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sfgz_money"
              label="实发工资"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="service_payment"
              label="已付劳务工资"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column label="分包费" align="left">
            <el-table-column
              prop="sub_payment"
              label="分包付款"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sub_contract"
              label="分包合同"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column label="机械费" align="left">
            <el-table-column
              prop="lease_payments"
              label="已付租赁费"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="machinery_fee"
              label="机械台班"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="profit_lv"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  =（收入总额-间接费用-已付材料款-应发工资-已付劳务工资-分包付款-已付租赁费-机械台班）/收入总额*100%
                </div>
                <div>毛利率</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="profit_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  =收入总额-间接费用-已付材料款-应发工资-已付劳务工资-分包付款-已付租赁费-机械台班
                </div>
                <div>毛利润</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="append">
            <div class="sum_footer xiaoji" ref="sum_xiaoji">
              <div class="sum_footer_unit center">小计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="htxiaoji"
                  placement="top"
                >
                  <div style="text-align: left">
                    {{ htxiaoji }}
                  </div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="srxiaoji"
                  placement="top"
                >
                  <div>{{ srxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="jjxiaoji"
                  placement="top"
                >
                  <div>{{ jjxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="ccxiaoji"
                  placement="top"
                >
                  <div>{{ ccxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="cyxiaoji"
                  placement="top"
                >
                  <div>{{ cyxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="crxiaoji"
                  placement="top"
                >
                  <div>{{ crxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="yfxiaoji"
                  placement="top"
                >
                  <div>{{ yfxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="sfxiaoji"
                  placement="top"
                >
                  <div>{{ sfxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="yfrxiaoji"
                  placement="top"
                >
                  <div>{{ yfrxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scxiaoji"
                  placement="top"
                >
                  <div>{{ scxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="schxiaoji"
                  placement="top"
                >
                  <div>{{ schxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="rfxiaoji"
                  placement="top"
                >
                  <div>{{ rfxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="rjxiaoji"
                  placement="top"
                >
                  <div>{{ rjxiaoji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="mlxiaoji"
                  placement="top"
                >
                  <div>{{ mlxiaoji }}</div>
                </el-tooltip>
              </div>
            </div>
            <div class="sum_footer" ref="sum_heji">
              <div class="sum_footer_unit center">合计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="htheji"
                  placement="top"
                >
                  <div style="text-align: left">
                    {{ htheji }}
                  </div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="srheji"
                  placement="top"
                >
                  <div>{{ srheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="jjheji"
                  placement="top"
                >
                  <div>{{ jjheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="ccheji"
                  placement="top"
                >
                  <div>{{ ccheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="cyheji"
                  placement="top"
                >
                  <div>{{ cyheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="crheji"
                  placement="top"
                >
                  <div>{{ crheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="yfheji"
                  placement="top"
                >
                  <div>{{ yfheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="sfheji"
                  placement="top"
                >
                  <div>{{ sfheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="yfrheji"
                  placement="top"
                >
                  <div>{{ yfrheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scheji"
                  placement="top"
                >
                  <div>{{ scheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="schheji"
                  placement="top"
                >
                  <div>{{ schheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="rfheji"
                  placement="top"
                >
                  <div>{{ rfheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="rjheji"
                  placement="top"
                >
                  <div>{{ rjheji }}</div>
                </el-tooltip>
              </div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit over_sum_text">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="mlheji"
                  placement="top"
                >
                  <div>{{ mlheji }}</div>
                </el-tooltip>
              </div>
            </div>
          </div>
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
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'projectOperateCost',
  components: { commonSearch },

  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'name',
        },
      ],
      formInline: {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        project_name: '',
        filler: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      htxiaoji: 0,
      htheji: 0,
      srxiaoji: 0,
      srheji: 0,
      jjxiaoji: 0,
      jjheji: 0,
      ccxiaoji: 0,
      ccheji: 0,
      cyxiaoji: 0,
      cyheji: 0,
      crxiaoji: 0,
      crheji: 0,
      yfxiaoji: 0,
      yfheji: 0,
      sfxiaoji: 0,
      sfheji: 0,
      yfrxiaoji: 0,
      yfrheji: 0,
      scxiaoji: 0,
      scheji: 0,
      schxiaoji: 0,
      schheji: 0,
      rfxiaoji: 0,
      rfheji: 0,
      rjxiaoji: 0,
      rjheji: 0,
      mlxiaoji: 0,
      mlheji: 0,
    };
  },
  methods: {
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
      return 'color:#5f5f5f;border-color:#F1F8FF;';
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
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
        .post('/project/ticketRegister')
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
    //获取列表
    getList() {
      this.$axios
        .post('/project/projectOperateCost', {
          page: this.currentPage,
          number: 10,
          name: this.formInline.name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.htxiaoji = res.data.revenue_money_subtotal;
            this.htheji = res.data.revenue_money_total;
            this.srxiaoji = res.data.collection_money_subtotal;
            this.srheji = res.data.collection_money_total;
            this.jjxiaoji = res.data.reimbursement_subtotal;
            this.jjheji = res.data.reimbursement_total;
            this.ccxiaoji = res.data.material_contract_subtotal;
            this.ccheji = res.data.material_contract_total;
            this.cyxiaoji = res.data.material_payment_subtotal;
            this.cyheji = res.data.material_payment_total;
            this.crxiaoji = res.data.material_warehousing_subtotal;
            this.crheji = res.data.material_warehousing_total;
            this.yfxiaoji = res.data.sfgz_money_subtotal;
            this.yfheji = res.data.sfgz_money_total;
            this.sfxiaoji = res.data.xfgz_money_subtotal;
            this.sfheji = res.data.xfgz_money_total;
            this.yfrxiaoji = res.data.service_payment_subtotal;
            this.yfrheji = res.data.service_payment_total;
            this.scxiaoji = res.data.sub_payment_subtotal;
            this.scheji = res.data.sub_payment_total;
            this.schxiaoji = res.data.sub_contract_subtotal;
            this.schheji = res.data.sub_contract_total;
            this.rfxiaoji = res.data.lease_payments_subtotal;
            this.rfheji = res.data.lease_payments_total;
            this.rjxiaoji = res.data.machinery_fee_subtotal;
            this.rjheji = res.data.machinery_fee_total;
            this.mlxiaoji = res.data.profit_money_subtotal;
            this.mlheji = res.data.profit_money_total;
            this.$nextTick(() => {
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
          .post('/project/projectOperateCostDownload', {
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
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.$utils.checkding();
    this.approvalStatus = this.$utils.utilApprovalStatus();
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