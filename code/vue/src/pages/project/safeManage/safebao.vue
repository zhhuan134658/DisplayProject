/* * @Author: NorthWind * @Date: 2020-12-12 14:29:05 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-20 08:57:16 */
<template>
  <div id="projectIndirectCost">
    <!-- 日志报表 -->
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
                  v-model="formInline.name"
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
              <el-form-item
                class="searchTime"
                label="时间:"
                style="min-width: 300px"
              >
                <el-date-picker
                  v-model="formInline.month"
                  :picker-options="pickerStart"
                  type="month"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月"
                  value-format="yyyy-MM"
                ></el-date-picker>
              </el-form-item>
              <el-button type="primary" size="medium" round @click="searchClick"
                >搜索</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <el-row class="maincBtn">
          <!-- <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="backList"
                        >还原</el-button
                    > -->
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
          @row-click="checkList"
          @header-dragend="checkWidth"
          border
          ref="table"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="left">
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
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
            prop="quantity"
            label="根数"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="outputvalue"
            label="当日产值"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="chanheji"
                    placement="top"
                  >
                    <div>{{ genheji }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="genheji"
                    placement="top"
                  >
                    <div>{{ chanheji }}</div>
                  </el-tooltip>
                </div>

                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit center">工作天数</div>
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
                <div class="sum_footer_unit">停工天数</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'projectIndirectCost',
  data() {
    return {
      xiaoji: 0,
      heji: 0,
      chanheji: 0,
      genheji: 0,
      formInline: {
        name: '',
        project_name: '',
        status: '',
        month: '',
        endTime: '',
        b_number: '',
        project_name: '',
        filler: '',
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
          if (data[i].proname === data[i - 1].proname) {
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
    fortStatus(row) {
      switch (row.status) {
        case '1':
          return '审批中';
          break;
        case '2':
          return '审批同意';
          break;
        case '3':
          return '审批拒绝';
          break;
      }
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (column.type != 'selection') {
        dd.ready(function() {
          dd.biz.util.openSlidePanel({
            url: row.url, //打开侧边栏的url
            title: '详情', //侧边栏顶部标题
            onSuccess: function(result) {},
            onFail: function() {
              setTimeout(() => {
                _this.getList();
              }, 5000);
              setTimeout(() => {
                _this.getList();
              }, 10000);
            },
          });
        });
      }
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/project/ticketRegister')
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.data;
            dd.ready(function() {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function(result) {
                  /**/
                },
                onFail: function(err) {},
              });
            });
          } else {
            _this.$notify({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/journal/baobiao', {
          // page: this.currentPage,
          // number: this.pagesize,
          project_name: this.formInline.name,
          month: this.formInline.month,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tpList = res.data.content;
            this.getSpanArr(this.tpList);
            this.xiaoji = res.data.Workingdays;
            this.heji = res.data.Shutdowndays;
            this.chanheji = res.data.totalvolume;
            this.genheji = res.data.amount;
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
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //筛选
    handleSelectionChange(val) {
      // let newA = [];
      // val.map((item) => {
      //     if (item.skill) {
      //         for (let index = 0; index < item.skill.length; index++) {
      //             const element = item.skill[index];
      //             newA.push(element.id);
      //         }
      //     }
      // });
      // this.multSelectData = newA;
      this.multSelectData = val.map(item => {
        if (!item.id) return '';
        return item.id;
      });
    },
    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$axios
          .post('/project/ticketRegisterDel', {
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
          .catch(function(error) {
            console.log(error);
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
        .post('/project/ticketRegisterReduction')
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
        .catch(function(error) {
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
        .catch(function(error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/journal/baobiaodc', {
            project_name: this.formInline.name,
            month: this.formInline.month,
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
          message: '请先勾选要导出的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    this.$utils.checkding();
    this.$utils.utilAllProject();
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.formInline.name = this.allProjectList[0].name;
    this.getList();
  },
};
</script>
