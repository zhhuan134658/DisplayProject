/*
 * @Author: NorthWind 
 * @Date: 2021-01-20 09:15:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 15:44:58
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料出入库报表 -->
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
          v-loading="tableloading"
          class="moterialTotalClass"
          :max-height="650"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          border
          @header-dragend="checkWidth"
          ref="table"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @cell-click="viewDia"
        >
          <!--   :span-method="objectSpanMethod" -->
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="wz_name"
            label="物资名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="wz_size"
            label="规格型号"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="wz_unit"
            label="单位"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="zjh_number"
            label="计划量"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.zjh_number">{{
                scope.row.zjh_number
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>

          <el-table-column
            label="申请量"
            align="center"
            :show-overflow-tooltip="true"
            prop="cgsq_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.cgsq_number">{{
                scope.row.cgsq_number
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="采购量"
            align="center"
            :show-overflow-tooltip="true"
            prop="cai_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.cai_number">{{
                scope.row.cai_number
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="期初量"
            align="center"
            :show-overflow-tooltip="true"
            prop="qc_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.qc_number">{{ scope.row.qc_number }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="入库量"
            align="center"
            :show-overflow-tooltip="true"
            prop="rk_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.rk_number">{{ scope.row.rk_number }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="退货量"
            align="center"
            :show-overflow-tooltip="true"
            prop="tui_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.tui_number">{{
                scope.row.tui_number
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="出库量"
            align="center"
            :show-overflow-tooltip="true"
            prop="chu_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.chu_number">{{
                scope.row.chu_number
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="退库量"
            align="center"
            :show-overflow-tooltip="true"
            prop="tk_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.tk_number">{{ scope.row.tk_number }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="调入量"
            align="center"
            :show-overflow-tooltip="true"
            prop="dr_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dr_number">{{ scope.row.dr_number }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="调出量"
            align="center"
            :show-overflow-tooltip="true"
            prop="dc_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dc_number">{{ scope.row.dc_number }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="账存数量"
            align="center"
            :show-overflow-tooltip="true"
            prop="zhang_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.zhang_number">{{
                scope.row.zhang_number
              }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="盘点数量"
            align="center"
            :show-overflow-tooltip="true"
            prop="pd_number"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.pd_number">{{ scope.row.pd_number }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="盘点日期"
            align="center"
            :show-overflow-tooltip="true"
            prop="pd_riqi"
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
                    :content="zjh_number_subtotal"
                    placement="top"
                  >
                    <div>{{ zjh_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="cgsq_number_subtotal"
                    placement="top"
                  >
                    <div>{{ cgsq_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="cai_number_subtotal"
                    placement="top"
                  >
                    <div>{{ cai_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qc_number_subtotal"
                    placement="top"
                  >
                    <div>{{ qc_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rk_number_subtotal"
                    placement="top"
                  >
                    <div>{{ rk_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="tui_number_subtotal"
                    placement="top"
                  >
                    <div>{{ tui_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="chu_number_subtotal"
                    placement="top"
                  >
                    <div>{{ chu_number_subtotal }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="tk_number_subtotal"
                    placement="top"
                  >
                    <div>{{ tk_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="dr_number_subtotal"
                    placement="top"
                  >
                    <div>{{ dr_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="dc_number_subtotal"
                    placement="top"
                  >
                    <div>{{ dc_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zhang_number_subtotal"
                    placement="top"
                  >
                    <div>{{ zhang_number_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="pd_number_subtotal"
                    placement="top"
                  >
                    <div>{{ pd_number_subtotal }}</div>
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
                    :content="zjh_number_total"
                    placement="top"
                  >
                    <div>{{ zjh_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="cgsq_number_total"
                    placement="top"
                  >
                    <div>{{ cgsq_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="cai_number_total"
                    placement="top"
                  >
                    <div>{{ cai_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qc_number_total"
                    placement="top"
                  >
                    <div>{{ qc_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rk_number_total"
                    placement="top"
                  >
                    <div>{{ rk_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="tui_number_total"
                    placement="top"
                  >
                    <div>{{ tui_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="chu_number_total"
                    placement="top"
                  >
                    <div>{{ chu_number_total }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="tk_number_total"
                    placement="top"
                  >
                    <div>{{ tk_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="dr_number_total"
                    placement="top"
                  >
                    <div>{{ dr_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="dc_number_total"
                    placement="top"
                  >
                    <div>{{ dc_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zhang_number_total"
                    placement="top"
                  >
                    <div>{{ zhang_number_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="pd_number_total"
                    placement="top"
                  >
                    <div>{{ pd_number_total }}</div>
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
  name: 'materialInReport',
  components: { pierceTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },
      ],
      tableList: [],
      titleName: [], //穿透
      tableNum: '1', //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      titleData: '', //穿透
      taPLoading: false, //穿透
      columnList: [], //穿透
      columnListtwo: [],
      tableDataALLtwo: [],
      tableDataALL: [], //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),
      tableloading: false,
      allProjectList: [],
      formInline: {
        name: '',
        status: '',
        startTime: '',
        endTime: '',
        project_name: '',
        supplier: '',
        send_name: '',
        send_userid: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      zjh_number_subtotal: 0,
      cgsq_number_subtotal: 0,
      cai_number_subtotal: 0,
      rk_number_subtotal: 0,
      zhang_number_subtotal: 0,
      qc_number_subtotal: 0,
      tui_number_subtotal: 0,
      dr_number_subtotal: 0,
      dc_number_subtotal: 0,
      pd_number_subtotal: 0,
      tk_number_subtotal: 0,
      chu_number_subtotal: 0,

      zjh_number_total: 0,
      cgsq_number_total: 0,
      cai_number_total: 0,
      rk_number_total: 0,
      zhang_number_total: 0,
      qc_number_total: 0,
      tui_number_total: 0,
      dr_number_total: 0,
      dc_number_total: 0,
      pd_number_total: 0,
      tk_number_total: 0,
      chu_number_total: 0,
      spanArr: {},
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'zjh_number',
        'cgsq_number',
        'cai_number',
        'qc_number',
        'rk_number',
        'tui_number',
        'chu_number',
        'tk_number',
        'dr_number',
        'dc_number',
        'pd_number',
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

      if (column.property == 'zjh_number') {
        //计划量
        this.titleData = '计划量数据来源';
        this.titleName = ['材料总计划'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '计划量:' + `${row.zjh_number ? row.zjh_number : 0}`;
        this.getpierceList('material_plan', row, column);
      } else if (column.property == 'cgsq_number') {
        //申请量
        this.titleData = '申请量数据来源';
        this.titleName = ['采购申请'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney =
          '申请量:' + `${row.cgsq_number ? row.cgsq_number : 0}`;
        this.getpierceList('material_apply', row, column);
      } else if (column.property == 'cai_number') {
        //采购量
        this.titleData = '采购量数据来源';
        this.titleName = ['采购合同', '采购订单'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '采购量:' + `${row.cai_number ? row.cai_number : 0}`;
        this.getpierceList('material_pur', row, column);
      } else if (column.property == 'qc_number') {
        //期初量
        this.titleData = '期初量数据来源';
        this.titleName = ['库存期初'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '期初量:' + `${row.qc_number ? row.qc_number : 0}`;
        this.getpierceList('inventory_beginning', row, column);
      } else if (column.property == 'rk_number') {
        //入库量
        this.titleData = '入库量数据来源';
        this.titleName = ['库存期初'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '入库量:' + `${row.rk_number ? row.rk_number : 0}`;
        this.getpierceList('material_warehousing', row, column);
      } else if (column.property == 'tui_number') {
        //退货量
        this.titleData = '退货量数据来源';
        this.titleName = ['退货单'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '退货量:' + `${row.tui_number ? row.tui_number : 0}`;
        this.getpierceList('return_goods', row, column);
      } else if (column.property == 'chu_number') {
        //出库量
        this.titleData = '出库量数据来源';
        this.titleName = ['出库单'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '出库量:' + `${row.chu_number ? row.chu_number : 0}`;
        this.getpierceList('material_delivery', row, column);
      } else if (column.property == 'tk_number') {
        //退库量
        this.titleData = '退库量数据来源';
        this.titleName = ['退库单'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '退库量:' + `${row.tk_number ? row.tk_number : 0}`;
        this.getpierceList('material_return', row, column);
      } else if (column.property == 'dr_number') {
        //调入量
        this.titleData = '调入量数据来源';
        this.titleName = ['调入量'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '调入量:' + `${row.dr_number ? row.dr_number : 0}`;
        this.getpierceList('material_dr', row, column);
      } else if (column.property == 'dc_number') {
        //调出量
        this.titleData = '调出量数据来源';
        this.titleName = ['调出量'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '调出量:' + `${row.dc_number ? row.dc_number : 0}`;
        this.getpierceList('material_dc', row, column);
      } else if (column.property == 'pd_number') {
        //盘点量
        this.titleData = '盘点量数据来源';
        this.titleName = ['盘点量'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = '盘点量:' + `${row.pd_number ? row.pd_number : 0}`;
        this.getpierceList('material_pd', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/materialInoutBaoPierce', {
          biao_shi,
          project_name: row.project_name,
          material_name: row.wz_name,
          size: row.wz_size,
          unit: row.wz_unit,
        })
        .then(res => {
          let onenewArr = [
            'zjh_number',
            'cgsq_number',
            'qc_number',
            'rk_number',
            'tui_number',
            'chu_number',
            'tk_number',
            'dr_number',
            'dc_number',
            'pd_number',
          ];
          let twonewArr = ['cai_number'];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (twonewArr.includes(column.property)) {
            this.tableList = [res.data.contract_data, res.data.order_data];
            console.log('789', this.tableList);
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    resetClick() {
      this.formInline = {
        name: '',
        status: '',
        startTime: '',
        endTime: '',
        project_name: '',
        supplier: '',
        send_name: '',
        send_userid: '',
      };
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 500);
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;';
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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
    //获取列表
    getList() {
      this.tableloading = true;
      this.$axios
        .post('/projectone/materialInoutBao', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          project_name_jing: this.formInline.project_name,
          supplier: this.formInline.supplier,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
            this.zjh_number_subtotal = res.data.zjh_number_subtotal; //计划量小计
            this.cgsq_number_subtotal = res.data.cgsq_number_subtotal; //申请量小计
            this.cai_number_subtotal = res.data.cai_number_subtotal; //采购量小计
            this.rk_number_subtotal = res.data.rk_number_subtotal; //入库量小计
            this.zhang_number_subtotal = res.data.zhang_number_subtotal; //账存数量小计
            this.qc_number_subtotal = res.data.qc_number_subtotal; //期初数量小计
            this.tui_number_subtotal = res.data.tui_number_subtotal; //退货量小计
            this.dr_number_subtotal = res.data.dr_number_subtotal; //调入量小计
            this.dc_number_subtotal = res.data.dc_number_subtotal; //调出量小计
            this.pd_number_subtotal = res.data.pd_number_subtotal; //盘点数量小计
            this.tk_number_subtotal = res.data.tk_number_subtotal; //退库量小计
            this.chu_number_subtotal = res.data.chu_number_subtotal; //出库量小计

            this.zjh_number_total = res.data.zjh_number_total; //计划量合计
            this.cgsq_number_total = res.data.cgsq_number_total; //申请量合计
            this.cai_number_total = res.data.cai_number_total; //采购量合计
            this.rk_number_total = res.data.rk_number_total; //入库量合计
            this.zhang_number_total = res.data.zhang_number_total; //账存数量合计
            this.qc_number_total = res.data.qc_number_total; //期初数量合计
            this.tui_number_total = res.data.tui_number_total; //退货量合计
            this.dr_number_total = res.data.dr_number_total; //调入量合计
            this.dc_number_total = res.data.dc_number_total; //调出量合计
            this.pd_number_total = res.data.pd_number_total; //盘点数量合计
            this.tk_number_total = res.data.tk_number_total; //退库量合计
            this.chu_number_total = res.data.chu_number_total; //出库量合计
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
            this.tableloading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val;
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
          .post('/projectone/materialInoutBaoDownload', {
            id: JSON.stringify(_this.multSelectData),
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
    // this.approvalStatus = this.$utils.utilApprovalStatus();
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