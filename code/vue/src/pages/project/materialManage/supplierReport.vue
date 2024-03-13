/*
 * @Author: NorthWind 
 * @Date: 2021-01-20 09:15:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 15:44:09
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料供应商报表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <!-- <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="false"
      ></commonSearch> -->
      <div class="headerContent">
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="formInline"
          label-width="120px"
          class="demo-form-inline"
        >
          <div class="hlBottoms">
            <el-form-item label="项目名称:" class="widths">
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
            <el-form-item label="供应商:" class="widths">
              <el-input
                v-model="formInline.supplier_name"
                clearable
                placeholder="请输入供应商"
              ></el-input>
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
          :span-method="objectSpanMethod"
          @cell-click="viewDia"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="supplier_name"
            label="供应商"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="ht_money"
            label="合同金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="or_money"
            label="订单金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="tui_money"
            label="退货金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="累计结算(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="js_money"
          >
          </el-table-column>
          <el-table-column
            label="累计付款(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="pay_money"
          >
          </el-table-column>
          <el-table-column
            label="合同未付款(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="ht_no_money"
          >
          </el-table-column>
          <el-table-column
            label="结算未付款(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="js_no_money"
          >
          </el-table-column>
          <el-table-column
            label="发票金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="sp_money"
          >
          </el-table-column>
          <el-table-column
            label="发票税额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="shui_money"
          >
          </el-table-column>
          <el-table-column
            label="材料入库金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="rk_money"
          >
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
                    :content="ht_money_subtotal"
                    placement="top"
                  >
                    <div>{{ ht_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="or_money_subtotal"
                    placement="top"
                  >
                    <div>{{ or_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="tui_money_subtotal"
                    placement="top"
                  >
                    <div>{{ tui_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="js_money_subtotal"
                    placement="top"
                  >
                    <div>{{ js_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="pay_money_subtotal"
                    placement="top"
                  >
                    <div>{{ pay_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ht_no_money_subtotal"
                    placement="top"
                  >
                    <div>{{ ht_no_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="js_no_money_subtotal"
                    placement="top"
                  >
                    <div>{{ js_no_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sp_money_subtotal"
                    placement="top"
                  >
                    <div>{{ sp_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="shui_money_subtotal"
                    placement="top"
                  >
                    <div>{{ shui_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rk_money_subtotal"
                    placement="top"
                  >
                    <div>{{ rk_money_subtotal }}</div>
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
                    :content="ht_money_total"
                    placement="top"
                  >
                    <div>{{ ht_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="or_money_total"
                    placement="top"
                  >
                    <div>{{ or_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="tui_money_total"
                    placement="top"
                  >
                    <div>{{ tui_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="js_money_total"
                    placement="top"
                  >
                    <div>{{ js_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="pay_money_total"
                    placement="top"
                  >
                    <div>{{ pay_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ht_no_money_total"
                    placement="top"
                  >
                    <div>{{ ht_no_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="js_no_money_total"
                    placement="top"
                  >
                    <div>{{ js_no_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sp_money_total"
                    placement="top"
                  >
                    <div>{{ sp_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="shui_money_total"
                    placement="top"
                  >
                    <div>{{ shui_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="rk_money_total"
                    placement="top"
                  >
                    <div>{{ rk_money_total }}</div>
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
        {
          labelName: '供应商',
          labelData: 'supplier_name',
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
        supplier_name: '',
        send_name: '',
        send_userid: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],

      ht_money_subtotal: 0,
      or_money_subtotal: 0,
      js_money_subtotal: 0,
      tui_money_subtotal: 0,
      pay_money_subtotal: 0,
      rk_money_subtotal: 0,
      ht_no_money_subtotal: 0,
      js_no_money_subtotal: 0,
      sp_money_subtotal: 0,
      shui_money_subtotal: 0,

      ht_money_total: 0,
      or_money_total: 0,
      js_money_stotal: 0,
      tui_money_total: 0,
      pay_money_totall: 0,
      rk_money_total: 0,
      ht_no_money_total: 0,
      js_no_money_total: 0,
      sp_money_total: 0,
      shui_money_total: 0,
      spanArr: [],
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'ht_money',
        'or_money',
        'tui_money',
        'js_money',
        'pay_money',
        'sp_money',
        'shui_money',
        'rk_money',
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

      if (column.property == 'ht_money') {
        //合同金额
        this.titleData = '合同金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'合同金额:' + row.ht_money}`;
        this.getpierceList('contract', row, column);
      } else if (column.property == 'or_money') {
        //订单金额
        this.titleData = '订单金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'订单金额:' + row.or_money}`;
        this.getpierceList('order', row, column);
      } else if (column.property == 'tui_money') {
        //退货金额
        this.titleData = '退货金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'退货金额:' + row.tui_money}`;
        this.getpierceList('tui', row, column);
      } else if (column.property == 'js_money') {
        //累计结算
        this.titleData = '累计结算数据来源';
        this.titleName = ['库存期初'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'累计结算:' + row.js_money}`;
        this.getpierceList('settle', row, column);
      } else if (column.property == 'pay_money') {
        //累计付款
        this.titleData = '累计付款数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'累计付款:' + row.pay_money}`;
        this.getpierceList('payment', row, column);
      } else if (column.property == 'sp_money') {
        //发票金额
        this.titleData = '发票金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'发票金额:' + row.sp_money}`;
        this.getpierceList('invoice', row, column);
      } else if (column.property == 'shui_money') {
        //发票税额
        this.titleData = '发票税额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'发票税额:' + row.shui_money}`;
        this.getpierceList('invoice', row, column);
      } else if (column.property == 'rk_money') {
        //材料入库金额
        this.titleData = '材料入库金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'材料入库金额:' + row.rk_money}`;
        this.getpierceList('clrk', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/supplierReportPierce', {
          biao_shi,
          project_name: row.project_name,
          supplier: row.supplier_name,
        })
        .then(res => {
          let onenewArr = [
            'ht_money',
            'or_money',
            'tui_money',
            'js_money',
            'pay_money',
            'rk_money',
            'sp_money',
            'shui_money',
            'rk_money',
          ];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
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
        supplier_name: '',
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
    // tableRowClass({ row, rowIndex }) {
    //     return 'color:#5f5f5f;padding:6px 0;';
    // },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2) {
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
        .post('/projectone/supplierReportNew', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          project_name_jing: this.formInline.project_name,
          supplier_name: this.formInline.supplier_name,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
            this.ht_money_subtotal = res.data.ht_money_subtotal; //合同金额小计
            this.or_money_subtotal = res.data.or_money_subtotal; //订单金额小计
            this.js_money_subtotal = res.data.js_money_subtotal; //累计结算小计
            this.tui_money_subtotal = res.data.tui_money_subtotal; //退货金额小计
            this.pay_money_subtotal = res.data.pay_money_subtotal; //材料入库金额小计
            this.rk_money_subtotal = res.data.rk_money_subtotal; //累计付款小计
            this.ht_no_money_subtotal = res.data.ht_no_money_subtotal; //合同未付款小计
            this.js_no_money_subtotal = res.data.js_no_money_subtotal; //结算未付款小计
            this.sp_money_subtotal = res.data.sp_money_subtotal; //发票金额小计
            this.shui_money_subtotal = res.data.shui_money_subtotal; //发票税额小计

            this.ht_money_total = res.data.ht_money_total; //合同金额小计
            this.or_money_total = res.data.or_money_total; //订单金额小计
            this.js_money_total = res.data.js_money_total; //累计结算小计
            this.tui_money_total = res.data.tui_money_total; //退货金额小计
            this.pay_money_total = res.data.pay_money_total; //累计付款小计
            this.rk_money_total = res.data.rk_money_total; //材料入库金额小计
            this.ht_no_money_total = res.data.ht_no_money_total; //合同未付款小计
            this.js_no_money_total = res.data.js_no_money_total; //结算未付款小计
            this.sp_money_total = res.data.sp_money_total; //发票金额小计
            this.shui_money_total = res.data.shui_money_total; //发票税额小计
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
          .post('/projectone/supplierReportNewDownload', {
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
    this.formInline.project_name = this.allProjectList[0].name;
    this.getList();

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
<style scoped lang="less">
.hlBottoms {
  background-color: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  .el-select,
  .el-input,
  .el-input__inner {
    width: 190px;
  }
}
</style>