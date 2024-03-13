<template>
  <div id="financeCostList">
    <!-- 费用报销明细 -->
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
                  v-model="formInline.project_name"
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

              <el-form-item label="报销名称:">
                <el-input
                  v-model="formInline.bx_name"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>

              <el-form-item label="申请人">
                <el-input
                  v-model="formInline.proposer"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始日期:">
                <el-date-picker
                  v-model="formInline.start_time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期:">
                <el-date-picker
                  v-model="formInline.end_time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="财务支付金额:">
                <el-select
                  v-model="formInline.money"
                  clearable
                  filterable
                  placeholder="请选择"
                >
                  <el-option label="等于0" value="0"></el-option>
                  <el-option label="大于0" value="1"></el-option>
                </el-select>
              </el-form-item>
              <div class="hlTop">
                <div class="hltl">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="searchClick"
                    style="margin-right: 30px"
                    >搜索</el-button
                  >
                  <el-button plain size="medium" @click="resetClick"
                    >重置</el-button
                  >
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <el-row class="maincBtn">
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
          :span-method="objectSpanMethod"
          class="moterialTotalClass"
          :max-height="650"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @header-dragend="checkWidth"
          border
          ref="table"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="proname"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="bxname"
            label="报销名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="申请人"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="applydate"
            label="提交日期"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="bxmoney"
            label="报销合计金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="extend3"
            label="备用金抵扣金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="benyearljbx"
            label="财务支付金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="bxdate"
            label="备用金余额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="costcourse"
            label="报销科目"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="sumofmoney"
            label="金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="extend"
            label="备注"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_bxmoney"
                    placement="top"
                  >
                    <div>{{ xj_bxmoney }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_dk"
                    placement="top"
                  >
                    <div>{{ xj_dk }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_benyearljbx"
                    placement="top"
                  >
                    <div>{{ xj_benyearljbx }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_sumofmoney"
                    placement="top"
                  >
                    <div>{{ xj_sumofmoney }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_bxmoney"
                    placement="top"
                  >
                    <div>{{ zj_bxmoney }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_dk"
                    placement="top"
                  >
                    <div>{{ zj_dk }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_benyearljbx"
                    placement="top"
                  >
                    <div>{{ zj_benyearljbx }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_sumofmoney"
                    placement="top"
                  >
                    <div>{{ zj_sumofmoney }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
              </div>
            </div>
          </div>
        </el-table>
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
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'workContractReport',
  data() {
    return {
      formInline: {
        money: '',
        bx_name: '',
        proposer: '',
        contract_name: '',
        project_name: '',
        status: '',
        start_time: '',
        end_time: '',
        teamname: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      footerNumList: [],
      allProjectList: [],
      spanArr: [],
      zj_bxmoney: 0, //总计报销合计
      zj_dk: 0, //总计抵扣
      zj_benyearljbx: 0, //总计财务支付
      zj_sumofmoney: 0, //总计财务支付
      xj_bxmoney: 0, //小计
      xj_dk: 0, //小计
      xj_benyearljbx: 0, //小计
      xj_sumofmoney: 0, //小计
    };
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '小计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },
    getSpanArr(data) {
      this.spanArr = [];
      let pos = 0;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanArr.push(1);
          pos = 0;
        } else {
          if (data[i].id === data[i - 1].id) {
            // 如果itemCode相等就累加，并且push 0
            this.spanArr[pos] += 1;
            this.spanArr.push(0);
          } else {
            // 不相等push 1
            this.spanArr.push(1);
            pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5 ||
        columnIndex === 6 ||
        columnIndex === 7 ||
        columnIndex === 8
      ) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    resetClick() {
      this.formInline = {
        money: '',
        bx_name: '',
        proposer: '',
        contract_name: '',
        project_name: '',
        status: '',
        start_time: '',
        end_time: '',
        teamname: '',
      };
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
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
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;';
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/finance/bxdetailed', {
          project_name: this.formInline.project_name,
          bx_name: this.formInline.bx_name,
          proposer: this.formInline.proposer,
          start_time: this.formInline.start_time,
          end_time: this.formInline.end_time,
          money: this.formInline.money,

          current_page: this.currentPage,

          contract_name: this.formInline.contract_name,

          number: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;

            if (res.data.content.list == null) {
              this.tpList = [];
            } else {
              this.tpList = res.data.content.list;
            }
            this.getSpanArr(this.tpList);
            this.zj_bxmoney = res.data.zj_bxmoney;
            this.zj_dk = res.data.zj_dk;
            this.zj_benyearljbx = res.data.zj_benyearljbx;
            this.zj_sumofmoney = res.data.zj_sumofmoney;
            this.xj_bxmoney = res.data.xj_bxmoney;
            this.xj_dk = res.data.xj_dk;
            this.xj_benyearljbx = res.data.xj_benyearljbx;
            this.xj_sumofmoney = res.data.xj_sumofmoney;
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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/bxdetailed_dc', {
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
          message: '请先勾选要删除的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
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
