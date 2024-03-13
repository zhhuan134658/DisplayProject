/*
 * @Author: NorthWind 
 * @Date: 2021-01-21 11:23:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-03-31 09:33:13
 */
<template>
  <div id="budgetDirect">
    <!-- 直接预算列表 -->
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
          <el-button type="primary" plain size="medium" @click="exportList"
            >导出</el-button
          >
        </el-row>
        <el-table
          :border="true"
          v-loading="tableloading"
          class="moterialTotalClass"
          :max-height="650"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @header-dragend="checkWidth"
          ref="table"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
          @cell-click="viewDia"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            prop="name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column v-if="otherc == 1" label="主料" align="left">
            <el-table-column
              prop="material_jh"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：直接成本预算“材料”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="material_payment"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：材料付款登记+费用报销中的直接费/材料
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column v-else label="材料" align="center">
            <el-table-column
              prop="material_jh"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：直接成本预算“材料”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="material_payment"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：材料付款登记+费用报销中的直接费/材料
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="劳务" align="center">
            <el-table-column
              prop="service_jh"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：直接成本预算“劳务（人工）”预算金额
                  </div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="service_payment"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：劳务合同付款+代发班组工资+零星劳务付款+自有工人工资发放+费用报销中的直接费/人工
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="租赁" align="center">
            <el-table-column
              prop="lease_jh"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：直接成本预算“租赁/机械”预算金额
                  </div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="lease_payments"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：租赁付款登记+费用报销中的直接费/机械
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="分包" align="center">
            <el-table-column
              prop="sub_jh"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：直接成本预算“分包”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="sub_payment"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：分包付款登记+费用报销中的直接费/分包
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column
                        prop="csf_jh"
                        align="left"
                        :show-overflow-tooltip="true"
                    >
                        <template slot="header" slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    来源于：直接成本预算的“措施费”
                                </div>
                                <div>措施费</div>
                            </el-tooltip>
                        </template>
                    </el-table-column> -->
          <el-table-column v-if="otherc == 2" label="其他" align="center">
            <el-table-column
              prop="other_jh"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：直接成本预算“其他”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="other_fk"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：其他付款单登记+费用报销中的直接费/其他
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column
                        prop="other_jh"
                        align="left"
                        :show-overflow-tooltip="true"
                    >
                        <template slot="header" slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    来源于：直接成本预算的“其他费用”
                                </div>
                                <div>其他</div>
                            </el-tooltip>
                        </template>
                    </el-table-column> -->

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
                    :content="cyxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ cyxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="csxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ csxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="lyxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ lyxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="lsxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ lsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zyxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ zyxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zsxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ zsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fyxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fyxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fsxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <!-- <div class="sum_footer_unit over_sum_text">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="chsxiaoji"
                                        placement="top"
                                    >
                                        <div>{{ chsxiaoji }}</div>
                                    </el-tooltip>
                                </div> -->
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qtxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qtxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qt1xiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qt1xiaoji }}
                    </div>
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
                    :content="cyheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ cyheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="csheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ csheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="lyheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ lyheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="lsheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ lsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zyheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ zyheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zsheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ zsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fyheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fyheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fsheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <!-- <div class="sum_footer_unit over_sum_text">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        :content="chsheji"
                                        placement="top"
                                    >
                                        <div>{{ chsheji }}</div>
                                    </el-tooltip>
                                </div> -->
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qtheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qtheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qt1heji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qt1heji }}
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
  name: 'budgetContrast',
  components: { pierceTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'name',
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
      tableloading: false,
      otherc: 2,
      allProjectList: [],
      formInline: {
        name: '',
        filler: '',
        status: '',
        startTime: '',
        endTime: '',
        theme: '',
        send_name: '',
        send_userid: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      cyxiaoji: 0,
      csxiaoji: 0,
      lyxiaoji: 0,
      lsxiaoji: 0,
      zyxiaoji: 0,
      zsxiaoji: 0,
      fyxiaoji: 0,
      fsxiaoji: 0,

      cyheji: 0,
      csheji: 0,
      lyheji: 0,
      lsheji: 0,
      zyheji: 0,
      zsheji: 0,
      fyheji: 0,
      fsheji: 0,
      chsxiaoji: 0,
      chsheji: 0,
      qtxiaoji: 0,
      qtheji: 0,
      qt1xiaoji: 0,
      qt1heji: 0,
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'material_jh',
        'service_jh',
        'sub_jh',
        'lease_jh',
        'other_jh',
        'material_payment',
        'service_payment',
        'sub_payment',
        'lease_payments',
        'other_fk',
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

      if (column.property == 'material_jh') {
        //材料预算金额
        this.titleData = '材料预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'材料预算金额:' + row.material_jh}`;
        this.getpierceList('material_ys', row, column);
      } else if (column.property == 'service_jh') {
        //劳务预算金额
        this.titleData = '劳务预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'劳务预算金额:' + row.service_jh}`;
        this.getpierceList('service_ys', row, column);
      } else if (column.property == 'sub_jh') {
        //分包预算金额
        this.titleData = '分包预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'分包预算金额:' + row.sub_jh}`;
        this.getpierceList('sub_ys', row, column);
      } else if (column.property == 'lease_jh') {
        //租赁预算金额
        this.titleData = '租赁预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'租赁预算金额:' + row.lease_jh}`;
        this.getpierceList('lease_ys', row, column);
      } else if (column.property == 'other_jh') {
        //其他预算金额
        this.titleData = '其他预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他预算金额:' + row.other_jh}`;
        this.getpierceList('other_ys', row, column);
      } else if (column.property == 'material_payment') {
        //材料实际金额
        this.titleData = '材料实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'材料实际金额:' + row.material_payment}`;
        this.getpierceList('material_sj', row, column);
      } else if (column.property == 'service_payment') {
        //劳务实际金额
        this.titleData = '劳务实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'劳务实际金额:' + row.service_payment}`;
        this.getpierceList('service_sj', row, column);
      } else if (column.property == 'sub_payment') {
        //分包实际金额
        this.titleData = '分包实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'分包实际金额:' + row.sub_payment}`;
        this.getpierceList('sub_sj', row, column);
      } else if (column.property == 'lease_payments') {
        //租赁实际金额
        this.titleData = '租赁实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'租赁实际金额:' + row.lease_payments}`;
        this.getpierceList('lease_sj', row, column);
      } else if (column.property == 'other_fk') {
        //其他实际金额
        this.titleData = '其他实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他实际金额:' + row.other_fk}`;
        this.getpierceList('other_sj', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/directCostBudgetContrastPierce', {
          biao_shi,
          project_name: row.name,
        })
        .then(res => {
          let onenewArr = [
            'material_jh',
            'service_jh',
            'sub_jh',
            'lease_jh',
            'other_jh',
          ];
          let twonewArr = [''];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'material_payment') {
            this.tableList = [res.data.material_payment, res.data.material_fee];
          } else if (column.property == 'service_payment') {
            this.tableList = [
              res.data.service_payment,
              res.data.service_wage,
              res.data.service_issued,
              res.data.service_spo,
              res.data.service_fee,
            ];
          } else if (column.property == 'sub_payment') {
            this.tableList = [res.data.sub_payment, res.data.sub_fee];
          } else if (column.property == 'lease_payments') {
            this.tableList = [res.data.lease_payment, res.data.lease_fee];
          } else if (column.property == 'other_fk') {
            this.tableList = [res.data.other_payment, res.data.other_fee];
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 500);
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
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    // tableRowClass({ row, rowIndex }) {
    //     return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    // },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.tableloading = true;
      this.$axios
        .post('/project/directCostBudgetContrast', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.cyxiaoji = res.data.material_jh_subtotal;
            this.cyheji = res.data.material_jh_total;
            this.csxiaoji = res.data.material_payment_subtotal;
            this.csheji = res.data.material_payment_total;

            this.lyxiaoji = res.data.service_jh_subtotal;
            this.lyheji = res.data.service_jh_total;
            this.lsxiaoji = res.data.service_payment_subtotal;
            this.lsheji = res.data.service_payment_total;

            this.zyxiaoji = res.data.lease_jh_subtotal;
            this.zyheji = res.data.lease_jh_total;
            this.zsxiaoji = res.data.lease_payments_subtotal;
            this.zsheji = res.data.lease_payments_total;

            this.fyxiaoji = res.data.sub_jh_subtotal;
            this.fyheji = res.data.sub_jh_total;
            this.fsxiaoji = res.data.sub_payment_subtotal;
            this.fsheji = res.data.sub_payment_total;
            this.chsxiaoji = res.data.csf_jh_subtotal;
            this.chsheji = res.data.csf_jh_total;
            this.qtxiaoji = res.data.other_jh_subtotal;
            this.qtheji = res.data.other_jh_total;

            this.qt1xiaoji = res.data.other_fk_subtotal;
            this.qt1heji = res.data.other_fk_total;
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
          .post('/project/directCostBudgetContrastDownload', {
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
    if (this.$store.state.cid == 'dingbc1b9dd8f657378fbc961a6cb783455b') {
      this.otherc = 1;
    } else {
      this.otherc = 2;
    }
  },
};
</script>