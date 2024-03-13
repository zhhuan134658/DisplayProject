/*
 * @Author: NorthWind 
 * @Date: 2020-12-12 14:12:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-04-28 18:00:59
 */
<template>
  <div id="projectManageCost" style="padding: 20px">
    <!-- 项目经营列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="false"
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
          @cell-click="viewDia"
          @header-dragend="checkWidth"
          ref="table"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column fixed type="selection" width="55"> </el-table-column>
          <el-table-column type="index" label="序号" width="55" />
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
            style="color: red"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：收入合同“合同金额”+收入合同变更签证“签证金额”
                </div>
                <div>收入合同总额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="income_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：收入结算“批复金额”</div>
                <div>收入结算总额(元)</div>
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
                <div slot="content">来源于：合同收款的“收款金额”</div>
                <div>合同收款(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="other_collection_money"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：其他收款登记</div>
                <div>其他收款(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="no_collection_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于: 收入累计结算总额-合同收款</div>
                <div>未收款累计(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="expenditure"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：采购合同“合同金额”+劳务合同“合同金额”+劳务合同变更签证“签证金额”+分包合同“合同金额”+分包合同变更签证“签证金额”+租赁合同“合同金额”
                </div>
                <div>支出合同总额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="settlement"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：材料结算的“结算金额”+劳务结算“批复金额”+分包结算“结算金额”+租赁结算“结算金额”+机械费结算“结算金额”
                </div>
                <div>支出结算总额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="payment_lj"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：材料付款登记+劳务付款登记+分包付款登记+租赁付款登记
                </div>
                <div>合同付款(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="other_fk"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：其他付款登记</div>
                <div>其他付款(元)</div>
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
                <div slot="content">来源于：费用报销的付款金额(已付款)</div>
                <div>报销金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="contract_diff"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=合同总额-支出合同总额</div>
                <div>合同差额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="settle_diff"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=收入结算金额-支出结算总额</div>
                <div>结算差额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="sz_diff"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于：合同收款+其他收款-合同付款-其他付款-报销金额
                </div>
                <div>收支差额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="xiaojsdd">
                  <div class="sum_footer_unit center" style="z-index: 10">
                    <span class="xiaojs">小计</span>
                  </div>
                </div>

                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="icxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ icxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ijxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ ijxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="slxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ slxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="other_collection_money_subtotal"
                    placement="top"
                  >
                    <div>
                      {{ other_collection_money_subtotal }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wsxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ocxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ ocxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ojxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ ojxiaoji }}
                    </div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="flxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ flxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="other_fk_subtotal"
                    placement="top"
                  >
                    <div>{{ other_fk_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rexiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ rexiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ccxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ ccxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="jcxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ jcxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ scxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">
                  <!-- 合计 -->
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="icheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ icheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ijheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ ijheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="slheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ slheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="other_collection_money_total"
                    placement="top"
                  >
                    <div>
                      <!-- {{ other_collection_money_total }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wsheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ wsheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ocheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ ocheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ojheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ ojheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="flheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ flheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="other_fk_total"
                    placement="top"
                  >
                    <div>
                      <!-- {{ other_fk_total }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="reheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ reheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ccheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ ccheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="jcheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ jcheji }} -->
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      <!-- {{ scheji }} -->
                    </div>
                  </el-tooltip>
                </div>
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
    <!-- 穿透 -->
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
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'projectManageCost',
  components: { pierceTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'name',
        },
        {
          labelName: '项目性质',
          labelData: 'make_bigcost',
        },
        {
          labelName: '项目类型',
          labelData: 'type',
        },
        {
          labelName: '项目负责人',
          labelData: 'stalker',
        },
        {
          labelName: '开始时间',
          labelData: 'start_plan_start_riqi',
        },
        {
          labelName: '结束时间',
          labelData: 'end_plan_start_riqi',
        },
      ],
      titleData: '',
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),

      allProjectList: [],
      formInline: {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        project_name: '',
        filler: '',
        make_bigcost: '',
        type: '',
        stalker: '',
        start_plan_start_riqi: '',
        end_plan_start_riqi: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      other_fk_subtotal: '0',
      other_fk_total: '0',
      other_collection_money_total: '0',
      other_collection_money_subtotal: '0',
      no_collection_money_total: '0',
      icxiaoji: '0',
      icheji: '0',
      ijxiaoji: '0',
      ijheji: '0',
      slxiaoji: '0',
      slheji: '0',
      wsxiaoji: '0',
      wsheji: '0',
      ocxiaoji: '0',
      ocheji: '0',
      ojxiaoji: '0',
      ojheji: '0',
      flxiaoji: '0',
      flheji: '0',
      rexiaoji: '0',
      reheji: '0',
      ccxiaoji: '0',
      ccheji: '0',
      jcxiaoji: '0',
      jcheji: '0',
      scxiaoji: '0',
      scheji: '0',
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'revenue_money',
        'income_money',
        'collection_money',
        'other_collection_money',
        'expenditure',
        'settlement',
        'payment_lj',
        'other_fk',
        'reimbursement',
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

      if (column.property == 'revenue_money') {
        //收入合同总额
        this.titleData = '收入金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'收入合同总额:' + row.revenue_money}`;
        this.getpierceList('revenue_contract', row, column);
      } else if (column.property == 'income_money') {
        //收入结算总额
        this.titleData = '收入结算总额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'收入结算总额:' + row.income_money}`;
        this.getpierceList('revenue_jie', row, column);
      } else if (column.property == 'collection_money') {
        //合同收款
        this.titleData = '合同收款数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'合同收款:' + row.collection_money}`;
        this.getpierceList('contract_collection', row, column);
      } else if (column.property == 'other_collection_money') {
        //其他收款
        this.titleData = '其他收款数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他收款:' + row.other_collection_money}`;
        this.getpierceList('other_collection', row, column);
      } else if (column.property == 'expenditure') {
        //支出合同总额
        this.titleData = '支出合同总额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'支出合同总额:' + row.expenditure}`;
        this.getpierceList('contract_expenditure', row, column);
      } else if (column.property == 'settlement') {
        //支出结算总额
        this.titleData = '支出结算总额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'支出结算总额:' + row.settlement}`;
        this.getpierceList('expenditure_settlement', row, column);
      } else if (column.property == 'payment_lj') {
        //合同付款
        this.titleData = '合同付款数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'合同付款:' + row.payment_lj}`;
        this.getpierceList('contract_payment', row, column);
      } else if (column.property == 'other_fk') {
        //其他付款
        this.titleData = '其他付款数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他付款:' + row.other_fk}`;
        this.getpierceList('other_payment', row, column);
      } else if (column.property == 'reimbursement') {
        //报销金额
        this.titleData = '报销金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'报销金额:' + row.reimbursement}`;
        this.getpierceList('fee_bx', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/projectManagementPierce', {
          biao_shi,
          project_name: row.name,
        })
        .then(res => {
          let onenewArr = [
            'collection_money',
            'other_collection_money',
            'other_fk',
            'reimbursement',
          ];
          let twonewArr = [''];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'revenue_money') {
            this.tableList = [res.data.ht_contract_data, res.data.ht_visa_data];
          } else if (column.property == 'income_money') {
            this.tableList = [
              res.data.revenue_jdk,

              res.data.revenue_wg,
              res.data.revenue_zbj,
            ];
          } else if (column.property == 'expenditure') {
            this.tableList = [
              res.data.service_contract,

              res.data.service_visa,
              res.data.material_contract,
              res.data.sub_contract,
              res.data.sub_visa,
              res.data.lease_contract,
            ];
          } else if (column.property == 'settlement') {
            this.tableList = [
              res.data.lease_jxf,
              res.data.lease_settlement,
              res.data.material_settlement,
              res.data.service_jdk,
              res.data.service_spo,
              res.data.service_wg,
              res.data.service_zbj,
              res.data.sub_jdk,
              res.data.sub_wg,
              res.data.sub_zbj,
            ];
          } else if (column.property == 'payment_lj') {
            this.tableList = [
              res.data.lease_payment,
              res.data.material_payment,
              res.data.service_issued,
              res.data.service_payment,
              res.data.service_spo,
              res.data.service_wage,
              res.data.sub_payment,
            ];
          }
        });

      //  this.viewVisible = true; //控制dialog显示

      this.viewVisible = false;
      this.$nextTick(() => {
        console.log('123456');
        this.viewVisible = true;
      });

      this.taPLoading = false;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
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

    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
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
        .post('/project/projectManagement', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          make_bigcost: this.formInline.make_bigcost,
          type: this.formInline.type,
          stalker: this.formInline.stalker,
          start_plan_start_riqi: this.formInline.start_plan_start_riqi,
          end_plan_start_riqi: this.formInline.end_plan_start_riqi,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.other_fk_subtotal = res.data.other_fk_subtotal;
            this.other_fk_total = res.data.other_fk_total;
            this.other_collection_money_total =
              res.data.other_collection_money_total;
            this.other_collection_money_subtotal =
              res.data.other_collection_money_subtotal;
            this.icxiaoji = res.data.revenue_money_subtotal;
            this.icheji = res.data.revenue_money_total;
            this.ijxiaoji = res.data.income_money_subtotal;
            this.ijheji = res.data.income_money_total;
            this.slxiaoji = res.data.collection_money_subtotal;
            this.slheji = res.data.collection_money_total;
            this.wsxiaoji = res.data.no_collection_money_subtotal;
            this.wsheji = res.data.no_collection_money_total;
            this.ocxiaoji = res.data.expenditure_subtotal;
            this.ocheji = res.data.expenditure_total;
            this.ojxiaoji = res.data.settlement_subtotal;
            this.ojheji = res.data.settlement_total;
            this.flxiaoji = res.data.payment_lj_subtotal;
            this.flheji = res.data.payment_lj_total;
            this.rexiaoji = res.data.reimbursement_subtotal;
            this.reheji = res.data.reimbursement_total;
            this.ccxiaoji = res.data.contract_diff_subtotal;
            this.ccheji = res.data.contract_diff_total;
            this.jcxiaoji = res.data.settle_diff_subtotal;
            this.jcheji = res.data.settle_diff_total;
            this.scxiaoji = res.data.sz_diff_subtotal;
            this.scheji = res.data.sz_diff_total;
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
          .post('/project/projectManagementDownload', {
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
<style scoped>
.xiaojsdd {
  position: relative;
}
.xiaojs {
  z-index: 999;
  position: absolute;
  left: 15px;
  top: 0;
}
</style>