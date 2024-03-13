/*
 * @Author: NorthWind 
 * @Date: 2021-01-19 17:01:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-01-21 17:05:22
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料进出库报表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen="true"
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
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
          :span-method="objectSpanMethod"
          size="mini"
          :row-class-name="tableRowClassName"
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
            label="仓库"
            align="left"
            :show-overflow-tooltip="true"
            prop="ckname"
          >
          </el-table-column>
          <el-table-column
            label="材料"
            align="left"
            :show-overflow-tooltip="true"
            prop="name"
          >
          </el-table-column>
          <el-table-column
            label="规格"
            align="left"
            :show-overflow-tooltip="true"
            prop="size"
          >
          </el-table-column>
          <el-table-column
            label="单位"
            align="left"
            :show-overflow-tooltip="true"
            prop="unit"
          >
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="qc_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：库存期初明细的“数量”合计</div>
                <div>期初数量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="rk_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料入库明细的“入库数量”合计</div>
                <div>入库量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="ck_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料出库明细的“数量”合计</div>
                <div>出库量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="tk_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料退库明细的“退库数量”合计</div>
                <div>退库量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="调拨数量" align="center">
            <el-table-column
              label="调入量"
              align="left"
              :show-overflow-tooltip="true"
              prop="dr_number"
            >
            </el-table-column>
            <el-table-column
              label="调出量"
              align="left"
              :show-overflow-tooltip="true"
              prop="dc_number"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column label="盘点数量" align="center">
            <el-table-column
              label="实际数量"
              align="left"
              :show-overflow-tooltip="true"
              prop="pd_number"
            >
            </el-table-column>
            <el-table-column
              label="账存数量"
              align="left"
              :show-overflow-tooltip="true"
              prop="zc_number"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="jy_number"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  =期初数量+入库数量-出库数量+退库数量+调入数量-调出数量+（盘点实际数量-盘点账存数量）
                </div>
                <div>结余</div>
              </el-tooltip>
            </template>
          </el-table-column>
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
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'materialHouseReport',
  components: { commonSearch },

  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'name',
        },
      ],
      tableloading: false,
      formInline: {
        name: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      spanArr: [],
      allProjectList: [],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
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
    //获取列表
    getList() {
      this.tableloading = true;
      this.$axios
        .post('/projectone/materialInoutSummary', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
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
      // this.multSelectData = val.map((item) => {
      //     if (!item.id) return '';
      //     return item.id;
      // });
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
          .post('/projectone/materialInoutSummaryDownload', {
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
  },
  created() {
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.getList();
  },
};
</script>