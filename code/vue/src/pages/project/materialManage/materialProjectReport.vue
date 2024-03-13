/*
 * @Author: NorthWind 
 * @Date: 2021-01-19 16:13:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-01-21 17:06:33
 */
<template>
  <div id="materialPlanReport">
    <!-- 材料执行情况表（按项目） -->
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
          @header-dragend="checkWidth"
          ref="table"
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
            label="物资类型"
            align="center"
            :show-overflow-tooltip="true"
            prop="type_name"
          >
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="zh_plan_quantity"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料总计划明细的“总计划量”合计</div>
                <div>需求数量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            :show-overflow-tooltip="true"
            prop="need_quantity"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：采购申请明细的“需用数量”</div>
                <div>已提计划量</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column align="left" :show-overflow-tooltip="true" prop="sy">
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=总计划数量-已提计划量</div>
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qxiaoji"
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
                    :content="yxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ yxiaoji }}
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
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="qheji"
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
                    :content="yheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ yheji }}
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
                      {{ sheji }}
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
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'materialProjectReport',
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
        status: '',
        startTime: '',
        endTime: '',
        project_name: '',
        supplier: '',
        b_number: '',
        agent: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      qxiaoji: 0,
      qheji: 0,
      yxiaoji: 0,
      yheji: 0,
      sxiaoji: 0,
      sheji: 0,
      spanArr: [],
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
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 500);
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
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
        .post('/projectone/materialProjectImplement', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
            this.yxiaoji = res.data.need_quantity_subtotal;
            this.yheji = res.data.need_quantity_total;
            this.qxiaoji = res.data.zh_plan_quantity_subtotal;
            this.qheji = res.data.zh_plan_quantity_total;
            this.sxiaoji = res.data.sy_subtotal;
            this.sheji = res.data.sy_total;
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
      // this.multSelectData = val.map((item) => {
      //     if (!item.id) return '';
      //     return item.id;
      // });
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
          .post('/projectone/materialProjectImplementDownload', {
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