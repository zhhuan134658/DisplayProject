<template>
  <div id="diaryList">
    <div class="main">
      <el-tabs class="diaryListtabs" v-model="activeName">
        <el-tab-pane label="日志列表" name="first">
          <div class="content">
            <div class="header">
              <div class="headerContent">
                <el-form
                  @submit.native.prevent
                  :inline="true"
                  label-width="120px"
                  :model="searchForm"
                  class="demo-form-inline"
                >
                  <div class="hlBottom">
                    <el-form-item class="searchTime" label="项目名称:">
                      <el-select
                        v-model="searchForm.proname"
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
                      <!-- <el-input
                        v-model="searchForm.proname"
                        clearable
                        placeholder="请输入"
                      ></el-input> -->
                    </el-form-item>
                    <el-form-item class="searchTime" label="申请人">
                      <el-input
                        v-model="searchForm.name"
                        clearable
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                    <el-form-item class="searchTime" label="日志类别:">
                      <el-select
                        v-model="searchForm.type"
                        filterable
                        clearable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in taskTypeList"
                          :key="item.id"
                          :label="item.tmpname"
                          :value="item.tmpname"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="searchTime" label="开始时间:">
                      <el-date-picker
                        v-model="searchForm.startTime"
                        :picker-options="pickerStart"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="searchTime" label="结束时间:">
                      <el-date-picker
                        v-model="searchForm.endTime"
                        :picker-options="pickerEnd"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>

                    <el-form-item class="searchTime" label="审批状态:">
                      <el-select
                        v-model="searchForm.status"
                        clearable
                        filterable
                        placeholder="请选择审批状态"
                      >
                        <el-option
                          v-for="(item, index) in $utils.utilApprovalStatus()"
                          :key="index"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item class="searchTime" label="日志状态：">
                  <el-select
                    v-model="searchForm.status"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option label="我发起的" value="1"></el-option>
                  </el-select>
                </el-form-item> -->

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
            <!-- <div class="dpcTopBtn" style="padding-left: 30px">
              <el-button type="primary" @click="deleSelectionChange"
                >批量删除</el-button
              >
            </div> -->
            <div class="mainContent" style="margin-top: 20px">
              <el-row class="maincBtn mainMoveBtn">
                <div class="mmbLeft">
                  <el-button type="primary" @click="deleSelectionChange"
                    >批量删除</el-button
                  >
                </div>

                <div class="mmbRight"></div>
              </el-row>
              <el-table
                :border="true"
                :data="taskList"
                :header-cell-style="tableHeaderClass"
                :cell-style="tableRowClass"
                @row-click="editTask"
                ref="multipleTable"
                style="width: 100%; border: 1px solid #ebeef5"
                max-height="650"
                @selection-change="handleSelectionChange"
                size="mini"
                :row-class-name="tableRowClassName"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column type="index" width="55" label="序号" />
                <el-table-column
                  prop="proname"
                  label="项目"
                  :show-overflow-tooltip="true"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="申请人"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="log_date"
                  label="日志时间"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="log_type"
                  label="分类"
                  align="left"
                ></el-table-column>
                <el-table-column label="审批状态" align="left">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == '2'" style="color: #17c298"
                      >已同意</span
                    >
                    <span
                      v-else-if="scope.row.status == '1'"
                      style="color: #e8a54c"
                      >审批中</span
                    >
                    <span v-else style="color: #f16d6d">已拒绝</span>
                  </template>
                </el-table-column>
                <el-table-column v-if="printable" label="打印" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click.stop="
                        printPDF(scope.row.id).catch(err => {
                          console.log(err);
                        })
                      "
                      >打印</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="page">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pagesize"
                  layout="prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日志分析" name="second">
          <div class="content">
            <div class="header">
              <div class="headerContent">
                <el-form
                  @submit.native.prevent
                  :inline="true"
                  label-width="120px"
                  :model="searchvForm"
                  class="demo-form-inline"
                >
                  <div class="hlBottom">
                    <el-form-item class="searchTime" label="项目名称:">
                      <el-select
                        v-model="searchvForm.proname"
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
                    <!-- <el-input
                        v-model="searchvForm.proname"
                        clearable
                        placeholder="请输入"
                      ></el-input> -->
                    <!-- </el-form-item> -->

                    <el-form-item class="searchTime" label="申请人">
                      <el-input
                        v-model="searchvForm.name"
                        clearable
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>

                    <el-form-item class="searchTime" label="开始时间:">
                      <el-date-picker
                        v-model="searchvForm.start_time"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="searchTime" label="结束时间:">
                      <el-date-picker
                        v-model="searchvForm.end_time"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                    <div style="text-align: center">
                      <el-button
                        type="primary"
                        size="medium"
                        @click="searchClickv"
                        style="margin-right: 10px"
                        >搜索</el-button
                      >
                      <el-button plain size="medium" @click="resetClickv"
                        >重置</el-button
                      >
                    </div>
                  </div>
                </el-form>
              </div>
            </div>

            <div class="mainContent" style="margin-top: 20px">
              <!-- <el-row class="maincBtn">
                <el-button-group>
                  <el-button type="primary" @click="btnSearch('1')"
                    >近三个月</el-button
                  >
                  <el-button type="primary" @click="btnSearch('2')"
                    >近六个月</el-button
                  >
                  <el-button type="primary" @click="btnSearch('3')"
                    >一年
                  </el-button>
                  <el-button type="primary" @click="btnSearch('')"
                    >全部
                  </el-button>
                </el-button-group>
              </el-row> -->

              <el-table
                border
                :data="taskViewList"
                row-key="id"
                :header-cell-style="tableHeaderClass"
                :cell-style="tableRowClass"
                @row-click="editTask"
                ref="multipleTable"
                style="width: 100%; border: 1px solid #ebeef5"
                max-height="650"
                @selection-change="handleSelectionChange"
                size="mini"
                :row-class-name="tableRowClassName"
                :tree-props="{ children: 'title' }"
              >
                <!--       :span-method="objectSpanMethods" -->
                <el-table-column type="index" width="55" label="序号" />

                <el-table-column
                  prop="name"
                  label="申请人"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="proname"
                  label="项目名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="project_number"
                  label="日志数量"
                  align="center"
                ></el-table-column>
                <el-table-column
                  v-for="(item, index) in titleList"
                  :ket="index"
                  :prop="item.title"
                  :label="item.tmpname"
                  align="center"
                ></el-table-column>
                <el-table-column
                  sortable
                  prop="number"
                  label="合计"
                  align="center"
                ></el-table-column>
              </el-table>
              <div class="page">
                <el-pagination
                  @current-change="handleCurrentChangev"
                  :current-page.sync="currentPagev"
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="totalv"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'diaryList',
  data() {
    return {
      allProjectList: [],
      searchvForm: {
        start_time: '',
        end_time: '',
        proname: '',
        name: '',
      },
      taskTypeList: [],
      titleList: [],
      activeName: 'first',
      taskViewList: [],
      multSelectData: [],
      taskList: [],
      searchForm: {
        proname: '',
        name: '',
        startTime: '',
        endTime: '',
        type: '',
        status: '',
      },
      printable: false,
      total: 0,
      pagesize: 10,
      currentPage: 1,
      totalv: 0,

      currentPagev: 1,
      spanArr: [],
    };
  },
  methods: {
    // 获取合并的数组
    flitterData(arr) {
      let spanOneArr = [];
      let spanTwoArr = [];
      let concatOne = 0;
      let concatTwo = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
          spanTwoArr.push(1);
        } else {
          if (item.name === arr[index - 1].name) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
          if (
            item.proname === arr[index - 1].proname &&
            item.name === arr[index - 1].name
          ) {
            //第二列需合并相同内容的判断条件
            spanTwoArr[concatTwo] += 1;
            spanTwoArr.push(0);
          } else {
            spanTwoArr.push(1);
            concatTwo = index;
          }
        }
      });
      return {
        one: spanOneArr,
        two: spanTwoArr,
      };
    },
    // 合并列
    objectSpanMethods({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.flitterData(this.taskViewList).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 2) {
        const _row = this.flitterData(this.taskViewList).two[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // getSpanArr(data) {
    //   this.spanArr = [];
    //   let pos = 0;
    //   for (var i = 0; i < data.length; i++) {
    //     if (i === 0) {
    //       // 如果是第一条记录（即索引是0的时候），向数组中加入１
    //       this.spanArr.push(1);
    //       pos = 0;
    //     } else {
    //       if (data[i].name === data[i - 1].name) {
    //         // 如果itemCode相等就累加，并且push 0
    //         this.spanArr[pos] += 1;
    //         this.spanArr.push(0);
    //       } else {
    //         // 不相等push 1
    //         this.spanArr.push(1);
    //         pos = i;
    //       }
    //     }
    //   }
    //   console.log('7777', this.spanArr);
    // },
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 1) {
    //     const _row = this.spanArr[rowIndex];
    //     const _col = _row > 0 ? 1 : 0;
    //     return {
    //       rowspan: _row,
    //       colspan: _col,
    //     };
    //   }
    // },
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    async getPrintableStatus() {
      const res = await this.$axios.post('/finance/control_display', {
        tableName: 'task_list',
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === '1';
      }
    },

    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map(item => {
        if (!item.id) return '';
        return item.id;
      });
      console.log(this.multSelectData);
    },
    //删除
    deleSelectionChange() {
      if (this.multSelectData.length > 0) {
        this.$axios
          .post('/journal/logdel', {
            id: this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              this.currentPage = 1;
              this.getTaskList();
              this.$message.warning(`${res.data.msg}`);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$message.warning('请您选择');
      }
    },
    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post('/finance/dc_pdf', {
        tableName: 'task_list',
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },

    editTask(row) {
      dd.ready(function() {
        dd.biz.util.openSlidePanel({
          url: row.url, //打开侧边栏的url
          title: '查看日志', //侧边栏顶部标题
          onSuccess: function() {},
          onFail: function() {},
        });
      });
    },
    resetClickv() {
      this.searchvForm = {
        start_time: '',
        end_time: '',
        proname: '',
        name: '',
      };
      this.getadfList();
    },
    resetClick() {
      this.searchForm = {
        proname: '',
        name: '',
        startTime: '',
        endTime: '',
        type: '',
        status: '',
      };
      this.getTaskList();
    },
    tableHeaderClass() {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass() {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    // tableHeaderClass({ row, rowIndex }) {
    //     return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    // },
    // tableRowClass({ row, rowIndex }) {
    //     return 'color:#5f5f5f;border-color:#F1F8FF;';
    // },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTaskList();
    },
    handleCurrentChangev(val) {
      this.currentPagev = val;
      this.getadfList();
    },
    //搜索
    searchClickv() {
      this.currentPagev = 1;
      this.getadfList();
    },

    //搜索
    searchClick() {
      this.currentPage = 1;
      this.getTaskList();
    },
    //获取日志列表
    getTaskList() {
      const _this = this;
      _this.$axios
        .post('/journal/loglist', {
          logtype: _this.searchForm.type,
          starttime: _this.searchForm.startTime,
          stoptime: _this.searchForm.endTime,
          proname: _this.searchForm.proname,
          name: _this.searchForm.name,
          current_page: _this.currentPage,
          status: _this.searchForm.status,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.taskList = res.data.content.list;
            _this.total = res.data.content.total;
            if (_this.total > 0 && _this.taskList.length < 1) {
              _this.currentPage = res.data.content.page;
              _this.getTaskList();
            }
          } else {
            _this.$message({
              type: 'warning',
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取日志类型下拉列表
    getTaskTypeList() {
      this.$axios
        .post('/journal/loglisttype')
        .then(res => {
          if (res.data.code == 1) {
            this.taskTypeList = res.data.tmpname;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }, //获取日志类型下拉列表
    getadfList() {
      this.$axios
        .post('/journal/logsort_census', {
          proname: this.searchvForm.proname,
          name: this.searchvForm.name,
          start_time: this.searchvForm.start_time,
          end_time: this.searchvForm.end_time,
          current_page: this.currentPagev,
        })
        .then(res => {
          this.titleList = res.data.title;
          //   this.getSpanArr(this.titleList);
          //   this.taskViewList = res.data.content;
          this.taskViewList = res.data.content.list;

          this.taskViewList.forEach(item => {
            if (item.title.length > 0) {
              this.titleList.forEach((titem, tindex) => {
                item[titem.title] = 0;
                let arr = [];
                item.title.forEach((itemt, indext) => {
                  arr.push(itemt[titem.title]);
                });
                let sum = arr.reduce((a, b) => {
                  return a + b;
                }, 0);
                item[titem.title] = sum;
              });
            }
          });

          this.totalv = res.data.content.total;
          this.currentPagev = res.data.content.page;
          console.log('8888888', this.taskViewList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.$utils.commonAllPro().then(res => {
      this.allProjectList = res;
      console.log('9999', res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
  },
  created() {
    this.$utils.checkding();
    this.getTaskList();
    this.getTaskTypeList();
    this.getPrintableStatus();
    this.getadfList();
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.searchForm.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.searchForm.startTime;
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
