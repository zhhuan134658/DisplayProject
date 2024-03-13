/*
 * @Author: NorthWind 
 * @Date: 2021-01-20 09:15:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-11-21 16:42:35
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料合同台账(新版)-->
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
          :span-method="objectSpanMethod"
          @cell-click="viewDia"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="contract_name"
            label="合同名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="ht_number"
            label="合同编号"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="contract_money"
            label="合同金额(元)"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="order_name"
            label="订单名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column> -->

          <!-- <el-table-column
            label="订单编号"
            align="center"
            :show-overflow-tooltip="true"
            prop="order_number"
          >
          </el-table-column> -->
          <el-table-column
            label="订单金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="order_money"
          >
          </el-table-column>
          <!-- <el-table-column
            label="采购日期"
            align="center"
            :show-overflow-tooltip="true"
            prop="cg_riqi"
          >
          </el-table-column> -->
          <!-- <el-table-column
            label="采购人员"
            align="center"
            :show-overflow-tooltip="true"
            prop="cg_person"
          >
          </el-table-column> -->
          <el-table-column
            label="供应商"
            align="center"
            :show-overflow-tooltip="true"
            prop="order_supplier"
          >
          </el-table-column>
          <el-table-column
            label="退货金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="th_money"
          >
          </el-table-column>
          <el-table-column
            label="结算金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="js_money"
          >
          </el-table-column>
          <el-table-column
            label="付款金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="fk_money"
          >
          </el-table-column>
          <el-table-column
            label="合同未付金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="ht_nopay_money"
          >
          </el-table-column>
          <el-table-column
            label="结算未付金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="js_nopay_money"
          >
          </el-table-column>
          <el-table-column
            label="材料入库金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="rk_money"
          >
          </el-table-column>
          <el-table-column
            label="发票金额(元)"
            align="center"
            :show-overflow-tooltip="true"
            prop="sp_moeny"
          >
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="contract_money_subtotal"
                    placement="top"
                  >
                    <div>{{ contract_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="order_money_subtotal"
                    placement="top"
                  >
                    <div>{{ order_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="th_money_subtotal"
                    placement="top"
                  >
                    <div>{{ th_money_subtotal }}</div>
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
                    :content="fk_money_subtotal"
                    placement="top"
                  >
                    <div>{{ fk_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ht_nopay_money_subtotal"
                    placement="top"
                  >
                    <div>{{ ht_nopay_money_subtotal }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="js_nopay_money_subtotal"
                    placement="top"
                  >
                    <div>{{ js_nopay_money_subtotal }}</div>
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
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sp_moeny_subtotal"
                    placement="top"
                  >
                    <div>{{ sp_moeny_subtotal }}</div>
                  </el-tooltip>
                </div>
              </div>

              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="contract_money_total"
                    placement="top"
                  >
                    <div>{{ contract_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="order_money_total"
                    placement="top"
                  >
                    <div>{{ order_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="th_money_total"
                    placement="top"
                  >
                    <div>{{ th_money_total }}</div>
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
                    :content="fk_money_total"
                    placement="top"
                  >
                    <div>{{ fk_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ht_nopay_money_total"
                    placement="top"
                  >
                    <div>{{ ht_nopay_money_total }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="js_nopay_money_total"
                    placement="top"
                  >
                    <div>{{ js_nopay_money_total }}</div>
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
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sp_moeny_total"
                    placement="top"
                  >
                    <div>{{ sp_moeny_total }}</div>
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
          labelName: '合同名称',
          labelData: 'name',
        },
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
      contract_money_subtotal: 0,
      order_money_subtotal: 0,
      th_money_subtotal: 0,
      fk_money_subtotal: 0,
      js_money_subtotal: 0,
      ht_nopay_money_subtotal: 0,
      js_nopay_money_subtotal: 0,
      rk_money_subtotal: 0,
      sp_moeny_subtotal: 0,

      contract_money_total: 0,
      order_money_total: 0,
      th_money_total: 0,
      fk_money_total: 0,
      js_money_total: 0,
      ht_nopay_money_total: 0,
      js_nopay_money_total: 0,
      rk_money_total: 0,
      sp_moeny_total: 0,
      spanArr: [],
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'contract_money',
        'order_money',
        'th_money',
        'js_money',
        'fk_money',
        'rk_money',
        'sp_moeny',
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

      if (column.property == 'contract_money') {
        //合同金额
        this.titleData = '合同金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'合同金额:' + row.contract_money}`;
        this.getpierceList('contract', row, column);
      } else if (column.property == 'order_money') {
        //订单金额
        this.titleData = '订单金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'订单金额:' + row.order_money}`;
        this.getpierceList('order', row, column);
      } else if (column.property == 'th_money') {
        //退货金额
        this.titleData = '退货金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'退货金额:' + row.th_money}`;
        this.getpierceList('tui', row, column);
      } else if (column.property == 'js_money') {
        //结算金额
        this.titleData = '结算金额数据来源';
        this.titleName = ['库存期初'];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'结算金额:' + row.js_money}`;
        this.getpierceList('settle', row, column);
      } else if (column.property == 'fk_money') {
        //付款金额
        this.titleData = '付款金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'付款金额:' + row.fk_money}`;
        this.getpierceList('payment', row, column);
      } else if (column.property == 'rk_money') {
        //材料入库金额
        this.titleData = '材料入库金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'材料入库金额:' + row.rk_money}`;
        this.getpierceList('clrk', row, column);
      } else if (column.property == 'sp_moeny') {
        //发票金额
        this.titleData = '发票金额数据来源';
        this.titleName = [''];
        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'发票金额:' + row.sp_moeny}`;
        this.getpierceList('invoice', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/materialContractBookPierce', {
          biao_shi,
          project_name: row.project_name,
          contract_name: row.contract_name,
          order_name: row.order_name,
        })
        .then(res => {
          let onenewArr = [
            'contract_money',
            'order_money',
            'th_money',
            'js_money',
            'fk_money',
            'rk_money',
            'sp_moeny',
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
      if (
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4
      ) {
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
        .post('/projectone/materialContractBookNew', {
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
            this.contract_money_subtotal = res.data.contract_money_subtotal; //合同金额小计
            this.order_money_subtotal = res.data.order_money_subtotal; //订单金额小计
            this.th_money_subtotal = res.data.th_money_subtotal; //退货金额小计
            this.fk_money_subtotal = res.data.fk_money_subtotal; //付款金额小计
            this.js_money_subtotal = res.data.js_money_subtotal; //结算金额小计
            this.ht_nopay_money_subtotal = res.data.ht_nopay_money_subtotal; //合同未付金额小计
            this.js_nopay_money_subtotal = res.data.js_nopay_money_subtotal; //结算未付金额小计
            this.rk_money_subtotal = res.data.rk_money_subtotal; //材料入库金额小计
            this.sp_moeny_subtotal = res.data.sp_moeny_subtotal; //发票金额小计

            this.contract_money_total = res.data.contract_money_total; //合同金额小计
            this.order_money_total = res.data.order_money_total; //订单金额小计
            this.th_money_total = res.data.th_money_total; //退货金额小计
            this.fk_money_total = res.data.fk_money_total; //付款金额小计
            this.js_money_total = res.data.js_money_total; //结算金额小计
            this.ht_nopay_money_total = res.data.ht_nopay_money_total; //合同未付金额小计
            this.js_nopay_money_total = res.data.js_nopay_money_total; //结算未付金额小计
            this.rk_money_total = res.data.rk_money_total; //材料入库金额小计
            this.sp_moeny_total = res.data.sp_moeny_total; //发票金额小计
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

          .post('/projectone/materialContractBookNewDownload', {
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