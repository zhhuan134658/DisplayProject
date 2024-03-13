/*
 * @Author: NorthWind 
 * @Date: 2021-01-21 10:44:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 15:58:46
 */
<template>
  <div id="rentPlanList">
    <!-- 合同列表 -->
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
            label="合同名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="供应商"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="contract_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：租赁合同的“合同金额”</div>
                <div>合同金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="ljjs_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：租赁结算的“批复金额”</div>
                <div>累计结算金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="ljfk_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：租赁付款属于租赁费的“付款金额”</div>
                <div>累计付款金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="jsnopay_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=累计结算金额-累计付款金额</div>
                <div>结算未支付金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="yf_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=合同金额-累计付款金额</div>
                <div>应付账款(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="jsxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ jsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fkxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fkxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wxiaoji }}
                    </div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="yfxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ yfxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="jsheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ jsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fkheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fkheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="yfheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ yfheji }}
                    </div>
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
  name: 'rentReport',
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
        {
          labelName: '供应商',
          labelData: 'supplier',
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
      jsxiaoji: 0,
      jsheji: 0,
      fkxiaoji: 0,
      fkheji: 0,
      wxiaoji: 0,
      wheji: 0,
      yfxiaoji: 0,
      yfheji: 0,
      formInline: {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        supplier: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = ['ljjs_money', 'ljfk_money'];
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

      if (column.property == 'ljjs_money') {
        //累计结算总额
        this.titleData = '累计结算总额数据来源';

        this.proName = `${'合同名称:' + row.name}`;
        this.totalMoney = `${'累计结算总额:' + row.ljjs_money}`;
        this.getpierceList('lj_settlement', row, column);
      } else if (column.property == 'ljfk_money') {
        //合同付款
        this.titleData = '合同付款数据来源';

        this.proName = `${'合同名称:' + row.name}`;
        this.totalMoney = `${'合同付款:' + row.ljfk_money}`;
        this.getpierceList('lj_payment', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/leaseContractReportPierce', {
          biao_shi,
          contract_name: row.name,
        })
        .then(res => {
          let onenewArr = ['vi222sa_money'];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'ljjs_money') {
            this.tableList = [res.data.lease_settlement];
          } else if (column.property == 'ljfk_money') {
            this.tableList = [res.data.lease_payment];
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
    resetClick() {
      this.formInline = {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        supplier: '',
      };
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
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
      this.$axios
        .post('/projectone/leaseContractReport', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          project_name_jing: this.formInline.project_name,
          supplier: this.formInline.supplier,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.jsxiaoji = res.data.ljjs_money_subtotal;
            this.jsheji = res.data.ljjs_money_total;
            this.fkxiaoji = res.data.ljfk_money_subtotal;
            this.fkheji = res.data.ljfk_money_total;
            this.wxiaoji = res.data.jsnopay_money_subtotal;
            this.wheji = res.data.jsnopay_money_total;
            this.yfxiaoji = res.data.yf_money_subtotal;
            this.yfheji = res.data.yf_money_total;
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
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post('/projectone/fileDownloadDel', { path: url })
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
          .post('/projectone/leaseContractDownload', {
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