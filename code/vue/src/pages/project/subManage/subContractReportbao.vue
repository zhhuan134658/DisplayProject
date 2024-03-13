<template>
  <div id="workContractReport">
    <!-- 分包报表 -->
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
            prop="project_name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="contract_name"
            label="合同名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="my_account"
            label="我方账户信息"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="party_a"
            label="分包单位"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="bank"
            label="开户行"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="bond_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于财务-保证金收款款登记中-收款类型中属于“专业分包保证金收取”收款登记金额
                  分批收取的话是多次的总和
                </div>
                <div>保证金收取(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="return_money"
            label="保证金退回"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  来源于财务-保证金付款登记中-付款类型中属于“专业分包保证金退回”付款登记金额
                  分批的话是多次的总和
                </div>
                <div>保证金退回(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="money"
            label="未退保证金(元)"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.xj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
                  "
                >
                  <el-tooltip
                    v-if="item.xj"
                    class="item"
                    effect="dark"
                    :content="item.xj"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ item.xj }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.hj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
                  "
                >
                  <el-tooltip
                    v-if="item.hj"
                    class="item"
                    effect="dark"
                    :content="item.hj"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ item.hj }}
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
  name: 'workContractReport',
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
          labelName: '合同名称',
          labelData: 'contract_name',
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
      formInline: {
        contract_name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
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
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = ['bond_money', 'return_money'];
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

      if (column.property == 'bond_money') {
        //保证金收取
        this.titleData = '保证金收取数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'保证金收取:' + event.target.innerText}`;
        this.getpierceList('2', row, column);
      } else if (column.property == 'return_money') {
        //保证金退回
        this.titleData = '保证金退回数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'保证金退回:' + event.target.innerText}`;
        this.getpierceList('1', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(type, row, column) {
      console.log(row);
      this.$axios
        .post('/finance/incomestatement_pass', {
          type,
          project_name: row.project_name,
          contract_name: row.contract_name,
          payment_unit: row.party_a,
        })
        .then(res => {
          let onenewArr = ['bond_money', 'return_money'];
          let twonewArr = [''];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
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
        contract_name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
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
    //获取列表
    getList() {
      this.$axios
        .post('/finance/prosubdeposit', {
          current_page: this.currentPage,
          starttime: this.formInline.startTime,
          endtime: this.formInline.endTime,
          contract_name: this.formInline.contract_name,
          teamname: this.formInline.teamname,
          project_name_jing: this.formInline.project_name,
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

            this.footerNumList = [
              { xj: '', hj: '' },
              { xj: '', hj: '' },
              { xj: '', hj: '' },
              { xj: '', hj: '' },
              { xj: '', hj: '' },
              { xj: '', hj: '' },
              {
                xj: res.data.xjbond_money,
                hj: res.data.zjbond_money,
              },
              {
                xj: res.data.xjreturn_money,
                hj: res.data.zjreturn_money,
              },
              { xj: res.data.xjmoney, hj: res.data.zjmoney },
            ];
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
          .post('/finance/prosubdepositdc', {
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