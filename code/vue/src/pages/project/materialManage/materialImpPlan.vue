/*
 * @Author: NorthWind 
 * @Date: 2021-01-20 09:15:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 15:45:28
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
          @cell-click="viewDia"
        >
          <!--  :span-method="objectSpanMethod" -->
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="物资名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="型号"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="a_name"
            label="总计划名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            label="计划量"
            align="center"
            :show-overflow-tooltip="true"
            prop="zh_plan_quantity"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于："材料总计划"</div>
                <div>计划量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="采购量"
            align="center"
            :show-overflow-tooltip="true"
            prop="c_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于："采购合同-退货单"</div>
                <div>采购量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="申请量"
            align="center"
            :show-overflow-tooltip="true"
            prop="need_quantity"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于："采购申请"</div>
                <div>申请量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="入库量"
            align="center"
            :show-overflow-tooltip="true"
            prop="rk_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于："材料入库"</div>
                <div>入库量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="剩余量"
            align="center"
            :show-overflow-tooltip="true"
            prop="surplus"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于："材料总计划-采购合同-退货单"</div>
                <div>剩余量</div>
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
                    :content="xj_jihualiang"
                    placement="top"
                  >
                    <div>{{ xj_jihualiang }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_cgliang"
                    placement="top"
                  >
                    <div>{{ xj_cgliang }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_sqliang"
                    placement="top"
                  >
                    <div>{{ xj_sqliang }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_rkliang"
                    placement="top"
                  >
                    <div>{{ xj_rkliang }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xj_syliang"
                    placement="top"
                  >
                    <div>{{ xj_syliang }}</div>
                  </el-tooltip>
                </div>
                <!--  -->
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
                    :content="zj_jihualiang"
                    placement="top"
                  >
                    <div>{{ zj_jihualiang }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_cgliang"
                    placement="top"
                  >
                    <div>{{ zj_cgliang }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_sqliang"
                    placement="top"
                  >
                    <div>{{ zj_sqliang }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_rkliang"
                    placement="top"
                  >
                    <div>{{ zj_rkliang }}</div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="zj_syliang"
                    placement="top"
                  >
                    <div>{{ zj_syliang }}</div>
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
          labelName: '计划名称',
          labelData: 'name',
        },
      ],
      tableList: [],
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
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
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      zj_jihualiang: 0, //总计计划量
      zj_sqliang: 0, //总计申请量
      zj_cgliang: 0, //总计采购量
      zj_rkliang: 0, //总计入库量
      zj_syliang: 0, //总计剩余量
      xj_jihualiang: 0, //小计计划量
      xj_sqliang: 0, //小计申请量
      xj_cgliang: 0, //小计采购量
      xj_rkliang: 0, //小计入库量
      xj_syliang: 0, //小计剩余量
      spanArr: [],
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = ['zh_plan_quantity', 'rk_number', 'need_quantity'];
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

      if (column.property == 'zh_plan_quantity') {
        //计划量
        this.titleData = '计划量数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'计划量:' + row.zh_plan_quantity}`;
        this.getpierceList('/finance/tpq_pass', row, column);
      } else if (column.property == 'rk_number') {
        //入库量
        this.titleData = '入库量数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'入库量:' + row.rk_number}`;
        this.getpierceList('/finance/rk_pass', row, column);
      } else if (column.property == 'need_quantity') {
        //申请量
        this.titleData = '申请量数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'申请量:' + row.need_quantity}`;
        this.getpierceList('/finance/buyer_pass', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column) {
      console.log(row);
      this.$axios
        .post(biao_shi, {
          project_name: row.project_name,
          material: row.name,
          unit: row.unit,
          size: row.size,
          status: 0,
          plan: row.a_name,
        })
        .then(res => {
          let onenewArr = ['zh_plan_quantity', 'rk_number', 'need_quantity'];
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
        .post('/finance/stuff_plan', {
          current_page: this.currentPage,
          num: this.pagesize,
          plan_name: this.formInline.name,
          project_name_jing: this.formInline.project_name,
          supplier: this.formInline.supplier,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.getSpanArr(this.tpList);

            this.xj_jihualiang = res.data.xj_jihualiang; //小计计划量
            this.xj_sqliang = res.data.xj_sqliang; //小计申请量
            this.xj_cgliang = res.data.xj_cgliang; //小计采购量
            this.xj_rkliang = res.data.xj_rkliang; //小计入库量
            this.xj_syliang = res.data.xj_syliang; //小计剩余量

            this.zj_jihualiang = res.data.zj_jihualiang; //总计计划量
            this.zj_sqliang = res.data.zj_sqliang; //总计申请量
            this.zj_cgliang = res.data.zj_cgliang; //总计采购量
            this.zj_rkliang = res.data.zj_rkliang; //总计入库量
            this.zj_syliang = res.data.zj_syliang; //总计剩余量

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
              this.currentPage = res.data.content.page;
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

          .post('/finance/stuff_plan_dc', {
            id: JSON.stringify(_this.multSelectData),
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.content.path, //要下载的文件的url
                name: res.data.content.filename, //定义下载文件名字
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