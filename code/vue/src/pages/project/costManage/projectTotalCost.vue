/*
 * @Author: NorthWind 
 * @Date: 2020-12-12 14:22:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-07-22 16:33:11
 */
<template>
  <div id="projectTotalCost" style="padding: 20px">
    <!-- 项目总成本 -->

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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="项目总成本统计(现金)" name="first">
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
              @cell-click="viewDia"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" label="序号" width="55" />
              <el-table-column prop="name" label="项目名称" align="left">
              </el-table-column>
              <el-table-column prop="material" align="left">
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：材料付款登记+费用报销中的直接费/材料（已付款）
                    </div>
                    <div>材料费用(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="service" align="left">
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：劳务合同付款+代发班组工资+零星劳务付款+自有工人工资发放+费用报销中的直接费/人工（已付款）
                    </div>
                    <div>劳务费用(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="lease" align="left">
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：租赁付款登记+费用报销中的直接费/机械（已付款）
                    </div>
                    <div>租赁费用(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="sub" align="left">
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：分包付款登记+费用报销中的直接费/分包（已付款）
                    </div>
                    <div>分包费用(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="other_fk" align="left">
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：其他付款单登记+费用报销中的直接费/其他（已付款）
                    </div>
                    <div>其他费用(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column prop="reimbursement" align="left">
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：费用报销中的间接费（已付款）
                    </div>
                    <div>间接费用(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="hj" label="合计(元)" align="left">
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
                        :content="cxiaoji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          {{ cxiaoji }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="lxiaoji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          {{ lxiaoji }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="rxiaoji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          {{ rxiaoji }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="sxiaoji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          {{ sxiaoji }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="qtxiaoji"
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
                        :content="jxiaoji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          {{ jxiaoji }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="hj_subtotal"
                        placement="top"
                      >
                        <div style="text-align: left">
                          {{ hj_subtotal }}
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
                        :content="cheji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ cheji }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="lheji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ lheji }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="rheji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ rheji }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="sheji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ sheji }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="qtheji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ qtheji }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="jheji"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ jheji }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="hj_total"
                        placement="top"
                      >
                        <div style="text-align: left">
                          <!-- {{ hj_total }} -->
                        </div>
                      </el-tooltip>
                    </div>
                    <!-- <div class="sum_footer_unit"></div> -->
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
          </el-tab-pane>
          <el-tab-pane label="项目总成本统计(结算)" name="second">
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
                @click="exportList1"
                >导出</el-button
              >
            </el-row>
            <commonTable
              :tableloading="tableloading"
              :tpList="tpList1"
              :titleList="titleList"
              :footerNumList="footerNumList"
              :isFooter="isFooter"
              @listenChild="getMult"
              :istwo="false"
              printTableName="zhukuai_otherfk"
            ></commonTable>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-sizes="[10, 50, 100]"
                :page-size="pagesize1"
                layout="sizes,prev, pager, next, jumper"
                :total="total1"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
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
import commonTable from '@/components/commonTableNew.vue';

export default {
  name: 'projectTotalCost',
  components: { pierceTable, commonSearch, commonTable },
  data() {
    return {
      titleData: '',
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
      activeName: 'first',
      tableloading: false,
      tableList: [],
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
      currentPage1: 1,
      total1: 0,
      pagesize1: 10,
      tpList: [],
      tpList1: [],
      titleList: [],
      footerNumList: [],
      isFooter: 1,
      multSelectData: [],
      multSelectData1: [],
      approvalStatus: [],
      hj_subtotal: '0',
      hj_total: '0',
      cxiaoji: '0',
      cheji: '0',
      lxiaoji: '0',
      lheji: '0',
      rxiaoji: '0',
      rheji: '0',
      sxiaoji: '0',
      sheji: '0',
      jxiaoji: '0',
      jheji: '0',
      qtxiaoji: '0',
      qtheji: '0',
    };
  },
  methods: {
    handleClick() {
      this.multSelectData = [];
      this.multSelectData1 = [];
      this.formInline.name = '';
      this.searchClick();
    },
    getMult(val) {
      this.multSelectData1 = val;
    },
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'material',
        'service',
        'sub',
        'lease',
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

      if (column.property == 'material') {
        //材料费用
        this.titleData = '材料费用数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'材料费用:' + row.material}`;
        this.getpierceList('material_fee', row, column);
      } else if (column.property == 'service') {
        //劳务费用
        this.titleData = '劳务费用数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'劳务费用:' + row.service}`;
        this.getpierceList('service_fee', row, column);
      } else if (column.property == 'sub') {
        //分包费用
        this.titleData = '分包费用数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'分包费用:' + row.sub}`;
        this.getpierceList('sub_fee', row, column);
      } else if (column.property == 'lease') {
        //租赁费用
        this.titleData = '租赁费用数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'租赁费用:' + row.lease}`;
        this.getpierceList('lease_fee', row, column);
      } else if (column.property == 'other_fk') {
        //其他费用
        this.titleData = '其他费用数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他费用:' + row.other_fk}`;
        this.getpierceList('other_fee', row, column);
      } else if (column.property == 'reimbursement') {
        //间接费用
        this.titleData = '间接费用数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'间接费用:' + row.reimbursement}`;
        this.getpierceList('indirect_fee', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/projectAllCostPierce', {
          biao_shi,
          project_name: row.name,
        })
        .then(res => {
          let onenewArr = [''];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'material') {
            this.tableList = [res.data.material_fee, res.data.material_payment];
          } else if (column.property == 'service') {
            this.tableList = [
              res.data.service_payment,
              res.data.service_wage,
              res.data.service_issued,
              res.data.service_spo,
              res.data.service_fee,
            ];
          } else if (column.property == 'sub') {
            this.tableList = [res.data.sub_payment, res.data.sub_fee];
          } else if (column.property == 'lease') {
            this.tableList = [res.data.lease_payment, res.data.lease_fee];
          } else if (column.property == 'other_fk') {
            this.tableList = [res.data.other_payment, res.data.other_fee];
          } else if (column.property == 'reimbursement') {
            this.tableList = [res.data.fee_bx, res.data.indirect_fee];
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
    // tableRowClass({ row, rowIndex }) {
    //     return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    // },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
      this.getList1();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getList1();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      // const _this = this;
      // if (column.type != 'selection') {
      //   dd.ready(function () {
      //     dd.biz.util.openSlidePanel({
      //       url: row.url, //打开侧边栏的url
      //       title: '详情', //侧边栏顶部标题
      //       onSuccess: function (result) {},
      //       onFail: function () {
      //         setTimeout(() => {
      //           _this.getList();
      //         }, 5000);
      //         setTimeout(() => {
      //           _this.getList();
      //         }, 10000);
      //       },
      //     });
      //   });
      // }
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
      if (this.activeName == 'first') {
        this.currentPage = 1;
        this.getList();
      } else {
        this.currentPage1 = 1;
        this.getList1();
      }
    },
    //获取列表
    getList() {
      this.$axios
        .post('/project/projectAllCost', {
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
            this.cxiaoji = res.data.material_subtotal.toString();
            this.cheji = res.data.material_total.toString();
            this.lxiaoji = res.data.service_subtotal.toString();
            this.lheji = res.data.service_total.toString();
            this.rxiaoji = res.data.lease_subtotal.toString();
            this.rheji = res.data.lease_total.toString();
            this.sxiaoji = res.data.sub_subtotal.toString();
            this.sheji = res.data.sub_total.toString();
            this.qtxiaoji = res.data.other_fk_subtotal.toString();
            this.qtheji = res.data.other_fk_total.toString();
            this.jxiaoji = res.data.reimbursement_subtotal.toString();
            this.jheji = res.data.reimbursement_total.toString();
            this.hj_subtotal = res.data.hj_subtotal.toString();
            this.hj_total = res.data.hj_total.toString();
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
    getList1() {
      this.tableloading = true;

      this.$axios
        .post(
          '/mobile/projectCostSettlement',
          {
            page: this.currentPage1,
            number: this.pagesize1,
            project_name: this.formInline.name,
            corp_id: this.$store.state.cid,
            userid: this.$store.state.userInfo.uid,
            make_bigcost: this.formInline.make_bigcost,
            type: this.formInline.type,
            stalker: this.formInline.stalker,
            start_plan_start_riqi: this.formInline.start_plan_start_riqi,
            end_plan_start_riqi: this.formInline.end_plan_start_riqi,
          },
          //   { headers: { other: true } },
        )
        .then(res => {
          if (res.data.code == 1) {
            this.total1 = res.data.count;
            this.tpList1 = res.data.data;
            this.titleList = res.data.mould_data;
            this.footerNumList = res.data.mould_data;
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
              this.getList1();
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
          .post('/project/projectAllCostDownload', {
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
    exportList1() {
      const _this = this;
      if (_this.multSelectData1.length > 0) {
        _this.$axios
          .post(
            '/mobile/projectCostSettlementDown',
            {
              data_json: JSON.stringify(_this.multSelectData1),
            },
            // { headers: { other: true } },
          )
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
    this.getList1();
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