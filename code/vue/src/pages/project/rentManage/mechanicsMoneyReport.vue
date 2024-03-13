/* * @Author: NorthWind * @Date: 2021-01-21 10:54:27 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-26 10:01:18 */
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
            prop="year"
            label="年度"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="月份" align="center">
            <el-table-column
              prop="month1"
              label="一月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month2"
              label="二月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month3"
              label="三月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month4"
              label="四月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month5"
              label="五月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month6"
              label="六月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month7"
              label="七月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month8"
              label="八月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month9"
              label="九月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month10"
              label="十月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month11"
              label="十一月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="month12"
              label="十二月"
              align="left"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="hjmoney"
            label="合计"
            align="left"
            :show-overflow-tooltip="true"
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
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
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
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
export default {
  name: 'mechanicsMoneyReport',
  components: { pierceTable },
  data() {
    return {
      titleData: '',
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),
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
      tpList: [{}],
      multSelectData: [],
      approvalStatus: [],
      allProjectList: [],
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'month1',
        'month2',
        'month3',
        'month4',
        'month5',
        'month6',
        'month7',
        'month8',
        'month9',
        'month10',
        'month11',
        'month12',
        'hjmoney',
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
      let newArr = [
        'month1',
        'month2',
        'month3',
        'month4',
        'month5',
        'month6',
        'month7',
        'month8',
        'month9',
        'month10',
        'month11',
        'month12',
      ];
      let ret3 = newArr.indexOf(column.property) + 1;
      if (newArr.includes(column.property)) {
        //月度统计
        this.titleData = '月度统计数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'月度统计:' + event.target.innerText}`;
        this.getpierceList('jxf', row, column, ret3);
      } else if (column.property == 'hjmoney') {
        //年度统计
        this.titleData = '年度统计数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'年度统计:' + event.target.innerText}`;
        this.getpierceList('jxf', row, column, '');
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(biao_shi, row, column, ret3) {
      console.log(row);

      // let newArr = [
      //     'month1',
      //     'month2',
      //     'month3',
      //     'month4',
      //     'month5',
      //     'month6',
      //     'month7',
      //     'month8',
      //     'month9',
      //     'month10',
      //     'month11',
      //     'month12'
      // ];

      this.$axios
        .post('/newtao/jxfeetjReportPierce', {
          biao_shi,
          project_name: row.project_name,
          year: row.year,
          month: ret3,
        })
        .then(res => {
          this.tableList = [res.data.data];
          console.log(this.tableList);
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
        year: '',
        month: '',
      };
      this.getList();
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
        .post('/projectone/jxfeetjReport', {
          page: this.currentPage,
          number: this.pagesize,
          year: this.formInline.year,
          project_name_jing: this.formInline.project_name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
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
          .post('/projectone/jxfeetjDownload', {
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
