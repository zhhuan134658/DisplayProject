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

              <!-- <el-form-item label="报销名称:">
                <el-input
                  v-model="formInline.bx_name"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item> -->

              <el-form-item label="申请人">
                <el-input
                  v-model="formInline.name"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="开始日期:">
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
              </el-form-item> -->
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
          @cell-click="viewDia"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="name"
            label="申请人"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="proname"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="petty_cash_apply"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：备用金申请“金额”，已操作付款的</div>
                <div>备用金总额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="bxmoney"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：费用报销"报销合计",审批通过的</div>
                <div>报销总额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="bx_money_adopt"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：费用报销“本次抵扣金额”，审批通过的
                </div>
                <div>已报销抵扣金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="petty_cash_return"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：备用金归还“本次还款金额”，已操作收款的
                </div>
                <div>备用金已归还金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="bx_money_conduct"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：费用报销“本次抵扣金额”，审批中的
                </div>
                <div>审批中报销抵扣(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="petty_cash_wsk"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：备用金归还“本次还款金额”，未操作收款的
                </div>
                <div>审批中备用金归还(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="reserve_balance"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：备用金总额-已报销抵扣金额-备用金已归还金额
                </div>
                <div>备用金余额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_petty_cash_apply"
                    placement="top"
                  >
                    <div>{{ xj_petty_cash_apply }}</div>
                  </el-tooltip>
                </div>
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
                    :content="xj_bx_money"
                    placement="top"
                  >
                    <div>{{ xj_bx_money }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_money"
                    placement="top"
                  >
                    <div>{{ xj_money }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_extend3"
                    placement="top"
                  >
                    <div>{{ xj_extend3 }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_by_wsmoney"
                    placement="top"
                  >
                    <div>{{ xj_by_wsmoney }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_reserve_balance"
                    placement="top"
                  >
                    <div>{{ xj_reserve_balance }}</div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_petty_cash_apply"
                    placement="top"
                  >
                    <div>{{ zj_petty_cash_apply }}</div>
                  </el-tooltip>
                </div>

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
                    :content="zj_bx_money"
                    placement="top"
                  >
                    <div>{{ zj_bx_money }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_money"
                    placement="top"
                  >
                    <div>{{ zj_money }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_extend3"
                    placement="top"
                  >
                    <div>{{ zj_extend3 }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_by_wsmoney"
                    placement="top"
                  >
                    <div>{{ zj_by_wsmoney }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_reserve_balance"
                    placement="top"
                  >
                    <div>{{ zj_reserve_balance }}</div>
                  </el-tooltip>
                </div>
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
    <el-dialog :title="titleData" width="80%" :visible.sync="viewVisible">
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
import pierceTable from '@/components/Piercethrough/pierceTable.vue';
export default {
  name: 'workContractReport',
  components: { pierceTable },
  data() {
    return {
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),
      formInline: {
        money: '',
        bx_name: '',
        name: '',
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
      titleData: '',
      zj_petty_cash_apply: 0, //总计备用金总额
      zj_bx_money: 0, //总计已报销抵扣金额
      zj_money: 0, //总计备用金已归还金额
      zj_extend3: 0, //总计审批中的报销抵扣
      zj_by_wsmoney: 0, //总计审批中备用金归
      zj_reserve_balance: 0, //总计备用余额
      xj_petty_cash_apply: 0, //小计备用金总额
      xj_bx_money: 0, //小计已报销抵扣金额
      xj_money: 0, //小计备用金已归还金额
      xj_extend3: 0, //小计审批中的报销抵扣
      xj_by_wsmoney: 0, //小计审批中备用金归
      xj_reserve_balance: 0, //小计备用余额
      zj_bxmoney: 0,
      xj_bxmoney: 0,
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'petty_cash_apply',
        'bx_money_adopt',
        'petty_cash_return',
        'bx_money_conduct',
        'petty_cash_wsk',
        'bxmoney',
      ];
      if (newArr.includes(column.property)) {
        return 'color:#409EFF;padding:6px 0;cursor:pointer';
      } else {
        return 'color:#5f5f5f;padding:6px 0';
      }
    },
    viewDia(row, column, cell, event) {
      console.log(row, column, cell, event);
      console.log('123');
      this.taPLoading = true;
      this.pierceTableid = +new Date();

      if (column.property == 'petty_cash_apply') {
        //备用金总金额
        this.titleData = '备用金总金额数据来源';
        this.proName = `${'项目名称:' + row.proname}`;
        this.totalMoney = `${'备用金总金额:' + row.petty_cash_apply}`;
        this.getpierceList('1', row, column);
      } else if (column.property == 'bx_money_adopt') {
        //已报销抵扣金额
        this.titleData = '已报销抵扣金额数据来源';

        this.proName = `${'项目名称:' + row.proname}`;
        this.totalMoney = `${'已报销抵扣金额:' + row.bx_money_adopt}`;
        this.getpierceList('2', row, column);
      } else if (column.property == 'petty_cash_return') {
        //备用金已归还金额
        this.titleData = '备用金已归还金额数据来源';

        this.proName = `${'项目名称:' + row.proname}`;
        this.totalMoney = `${'备用金已归还金额:' + row.petty_cash_return}`;
        this.getpierceList('3', row, column);
      } else if (column.property == 'bx_money_conduct') {
        //审批中报销抵扣
        this.titleData = '审批中报销抵扣数据来源';

        this.proName = `${'项目名称:' + row.proname}`;
        this.totalMoney = `${'审批中报销抵扣:' + row.bx_money_conduct}`;
        this.getpierceList('4', row, column);
      } else if (column.property == 'petty_cash_wsk') {
        //审批中备用金归还
        this.titleData = '审批中备用金归还数据来源';

        this.proName = `${'项目名称:' + row.proname}`;
        this.totalMoney = `${'审批中备用金归还:' + row.petty_cash_wsk}`;
        this.getpierceList('5', row, column);
      } else if (column.property == 'bxmoney') {
        //报销总额
        this.titleData = '审批中备用金归还数据来源';

        this.proName = `${'项目名称:' + row.proname}`;
        this.totalMoney = `${'报销总额:' + row.bxmoney}`;
        this.getpierceList('6', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(type, row, column) {
      console.log(row);
      this.$axios
        .post('/finance/byj_total_pass', {
          type,
          proname: row.proname,
          name: row.name,
        })
        .then(res => {
          let onenewArr = [
            'petty_cash_apply',
            'bx_money_adopt',
            'petty_cash_return',
            'bx_money_conduct',
            'petty_cash_wsk',
            'bxmoney',
          ];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
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
        name: '',
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
    // tableRowClass({ row, rowIndex }) {
    //   return 'color:#5f5f5f;padding:6px 0;';
    // },
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
        .post('/finance/rei_summary', {
          project_name: this.formInline.project_name,
          bx_name: this.formInline.bx_name,
          name: this.formInline.name,
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

            this.zj_petty_cash_apply = res.data.zj_petty_cash_apply;
            this.zj_bx_money = res.data.zj_bx_money;
            this.zj_money = res.data.zj_money;
            this.zj_extend3 = res.data.zj_extend3;
            this.zj_by_wsmoney = res.data.zj_by_wsmoney;
            this.zj_reserve_balance = res.data.zj_reserve_balance;
            this.xj_petty_cash_apply = res.data.xj_petty_cash_apply;
            this.xj_bx_money = res.data.xj_bx_money;
            this.xj_money = res.data.xj_money;
            this.xj_extend3 = res.data.xj_extend3;
            this.xj_by_wsmoney = res.data.xj_by_wsmoney;
            this.xj_reserve_balance = res.data.xj_reserve_balance;

            this.zj_bxmoney = res.data.zj_bxmoney;
            this.xj_bxmoney = res.data.xj_bxmoney;

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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/rei_summary_dc', {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.content.path, //要下载的文件的url
                name: res.data.content.filename, //定义下载文件名字
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
