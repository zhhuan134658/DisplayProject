/* * @Author: NorthWind * @Date: 2021-01-21 10:22:23 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-26 10:00:58 */
<template>
  <div id="mechanicsList">
    <!-- 机械费列表 -->
    <div class="main">
      <div class="header">
        <div class="headerContent">
          <el-form
            @submit.native.prevent
            :inline="true"
            :model="formInline"
            label-width="120px"
            class="demo-form-inline"
          >
            <div class="hlBottom">
              <el-form-item label="项目名称:">
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

              <el-form-item label="年:">
                <el-input
                  v-model="formInline.year"
                  clearable
                  placeholder="请输入年"
                ></el-input>
              </el-form-item>
              <el-form-item label="月:">
                <el-input
                  v-model="formInline.month"
                  clearable
                  placeholder="请输入月"
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
            prop="number"
            label="编号"
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
            prop="year"
            label="年度"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="month"
            label="月份"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="register"
            label="登记人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="riqi"
            label="登记时间"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <!-- <el-table-column label="审批状态" align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已同意</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >审批中</span
              >
              <span v-else style="color: #f16d6d">已拒绝</span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="机械名称"
            align="left"
            :show-overflow-tooltip="true"
            prop="name"
          >
          </el-table-column>
          <el-table-column
            label="工作日期"
            align="left"
            :show-overflow-tooltip="true"
            prop="b_riqi"
          >
          </el-table-column>
          <el-table-column
            label="施工内容"
            align="left"
            :show-overflow-tooltip="true"
            prop="content"
          >
          </el-table-column>
          <el-table-column
            label="工时(小时)"
            align="left"
            :show-overflow-tooltip="true"
            prop="work_hours"
          >
          </el-table-column>
          <el-table-column
            label="单价"
            align="left"
            :show-overflow-tooltip="true"
            prop="price"
          >
          </el-table-column>
          <el-table-column
            label="小计(元)"
            align="left"
            :show-overflow-tooltip="true"
            prop="subtotal"
          >
          </el-table-column>
          <el-table-column
            label="备注"
            align="left"
            :show-overflow-tooltip="true"
            prop="remarks"
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <!-- <div class="sum_footer_unit"></div> -->
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="xiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ xiaoji }}
                    </div>
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <!-- <div class="sum_footer_unit"></div> -->
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="heji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ heji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
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
export default {
  name: 'mechanicsReport',
  data() {
    return {
      xiaoji: 0,
      heji: 0,
      formInline: {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        year: '',
        month: '',
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
    resetClick() {
      this.formInline = {
        name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        year: '',
        month: '',
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
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5 ||
        columnIndex === 6 ||
        columnIndex === 7
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/projectone/machineryFeeReport', {
          page: this.currentPage,
          number: this.pagesize,
          month: this.formInline.month,
          year: this.formInline.year,
          project_name_jing: this.formInline.project_name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.getSpanArr(this.tpList);
            this.xiaoji = res.data.subtotal;
            this.heji = res.data.total;
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
        .catch(function(error) {
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
        .catch(function(error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/projectone/machineryFeeDownload', {
            id: JSON.stringify(_this.multSelectData),
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function(msg) {
                  // 文件下载进度回调
                },
                onSuccess: function(result) {
                  _this.deleteExport(res.data.data.path);
                },
                onFail: function() {
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
          .catch(function(error) {
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
