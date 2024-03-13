/*
 * @Author: NorthWind 
 * @Date: 2021-03-04 10:05:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-03-31 09:33:30
 */
<template>
  <div id="budgetIndirect">
    <!-- 间接预算报表 -->
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
          <el-table-column type="selection" fixed width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            prop="name"
            label="项目名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            v-if="otherc == 2"
            align="center"
            label="规费"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="gf_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：间接成本预算“规费”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="gf_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：费用报销中的间接费/规费</div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-else
            align="center"
            label="辅材"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="gf_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：间接成本预算的 '辅材'</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="gf_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：费用报销的 '规费'</div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="otherc == 2"
            label="企业管理费"
            align="center"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="qygl_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：间接成本预算“企业管理费”预算金额
                  </div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="qygl_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    来源于：费用报销中的间接费/企业管理费
                  </div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-else
            label="现场费用"
            align="center"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="qygl_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：间接成本预算的 '现场费用'</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="qygl_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：费用报销的 '企业管理费'</div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column
            label="税金"
            align="center"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="shuiji_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：间接成本预算“税金”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="shuijin_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：费用报销中的间接费/税金</div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column> -->
          <el-table-column
            v-if="otherc == 2"
            label="其他"
            align="center"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="other_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：间接成本预算“其他”预算金额</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="other_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于:费用报销中的间接费/其他</div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-else
            label="消耗品"
            align="left"
            :show-overflow-tooltip="true"
          >
            <el-table-column
              prop="other_ys"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：间接成本预算的"明细"</div>
                  <div>预算金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="other_sj"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">来源于：费用报销的"明细"</div>
                  <div>实际金额(元)</div>
                </el-tooltip>
              </template>
            </el-table-column>
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
                    :content="gxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ gxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="gsxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ gsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qsxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sxiaoji.toString()"
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
                    :content="ssxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ ssxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="otxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ otxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="otsxiaoji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ otsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">
                  <div class="xiaojsdd">
                    <div class="sum_footer_unit center" style="z-index: 10">
                      <span class="xiaojs">合计</span>
                    </div>
                  </div>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="gheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ gheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="gsheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ gsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qsheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ qsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="sheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ sheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="ssheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ ssheji }}
                    </div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="otheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ otheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="otsheji.toString()"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ otsheji }}
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
  name: 'budgetIndirectReport',
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
      allProjectList: [],
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      gheji: 0,
      gsheji: 0,
      qheji: 0,
      qsheji: 0,
      sheji: 0,
      ssheji: 0,
      rheji: 0,
      rsheji: 0,
      gxiaoji: 0,
      gsxiaoji: 0,
      qxiaoji: 0,
      qsxiaoji: 0,
      sxiaoji: 0,
      ssxiaoji: 0,
      otxiaoji: 0,
      otsxiaoji: 0,
      otheji: 0,
      otsheji: 0,
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'gf_ys',
        'qygl_ys',
        'shuiji_ys',
        'other_ys',
        'gf_sj',
        'qygl_sj',
        'shuijin_sj',
        'other_sj',
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

      if (column.property == 'gf_ys') {
        //规费预算金额
        this.titleData = '规费预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'规费预算金额:' + row.gf_ys}`;
        this.getpierceList('gf_ys', row, column);
      } else if (column.property == 'qygl_ys') {
        //企业管理费预算金额
        this.titleData = '企业管理费预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'企业管理费预算金额:' + row.qygl_ys}`;
        this.getpierceList('qy_ys', row, column);
      } else if (column.property == 'shuiji_ys') {
        //税金预算金额数据来源
        this.titleData = '税金预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'税金预算金额:' + row.shuiji_ys}`;
        this.getpierceList('shui_ys', row, column);
      } else if (column.property == 'other_ys') {
        //其他费用预算金额
        this.titleData = '其他费用预算金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他费用预算金额:' + row.other_ys}`;
        this.getpierceList('other_ys', row, column);
      } else if (column.property == 'gf_sj') {
        //规费实际金额
        this.titleData = '规费实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'规费实际金额:' + row.gf_sj}`;
        this.getpierceList('gf_sj', row, column);
      } else if (column.property == 'qygl_sj') {
        //企业管理费实际金额
        this.titleData = '企业管理费实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'企业管理费实际金额:' + row.qygl_sj}`;
        this.getpierceList('gy_sj', row, column);
      } else if (column.property == 'shuijin_sj') {
        //税金实际金额
        this.titleData = '税金实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'税金实际金额:' + row.shuijin_sj}`;
        this.getpierceList('shui_sj', row, column);
      } else if (column.property == 'other_sj') {
        //其他费用实际金额
        this.titleData = '其他费用实际金额数据来源';

        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他费用实际金额:' + row.other_sj}`;
        this.getpierceList('other_sj', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post('/newtao/indirectCostBudgetReportPierce', {
          biao_shi,
          project_name: row.name,
        })
        .then(res => {
          let onenewArr = ['gf_ys', 'qygl_ys', 'shuiji_ys', 'other_ys'];
          let twonewArr = [''];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'gf_sj') {
            this.tableList = [res.data.gf_old, res.data.gf_new];
          } else if (column.property == 'qygl_sj') {
            this.tableList = [res.data.gy_old, res.data.gy_new];
          } else if (column.property == 'shuijin_sj') {
            this.tableList = [res.data.shui_old, res.data.shui_new];
          } else if (column.property == 'other_sj') {
            this.tableList = [res.data.other_old, res.data.other_new];
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
      this.tableloading = true;
      this.$axios
        .post('/projectone/indirectCostBudgetReport', {
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
            this.gxiaoji = res.data.gf_subtotal_ys;
            this.gsxiaoji = res.data.gf_subtotal_sj;
            this.gheji = res.data.gf_total_ys;
            this.gsheji = res.data.gf_total_sj;
            this.qxiaoji = res.data.qygl_subtotal_ys;
            this.qsxiaoji = res.data.qygl_subtotal_sj;
            this.qheji = res.data.qygl_total_ys;
            this.qsheji = res.data.qygl_total_sj;
            this.sxiaoji = res.data.shuiji_subtotal_ys;
            this.ssxiaoji = res.data.shuiji_subtotal_sj;
            this.sheji = res.data.shuiji_total_ys;
            this.ssheji = res.data.shuiji_total_sj;
            this.otxiaoji = res.data.other_subtotal_ys;
            this.otheji = res.data.other_total_ys;
            this.otsxiaoji = res.data.other_subtotal_sj;
            this.otsheji = res.data.other_total_sj;
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
              .post('/project/indirectCostBudgetDel', {
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
        .post('/project/indirectCostBudgetReduction')
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
          .post('/projectone/indirectCostBudgetRDownload', {
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
    if (this.$store.state.cid == 'dingbc1b9dd8f657378fbc961a6cb783455b') {
      this.otherc = 1;
    } else {
      this.otherc = 2;
    }
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