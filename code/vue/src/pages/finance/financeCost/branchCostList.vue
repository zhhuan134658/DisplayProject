/*
 * @Author: NorthWind 
 * @Date: 2020-12-17 11:54:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-01-21 16:54:58
 */
<template>
  <div id="branchCostList">
    <!-- 下属报销列表 -->
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
          <!-- <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="deleteList"
                        >删除</el-button
                    >
                    <el-button
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
            round
            @click="exportList"
            >导出</el-button
          >
        </el-row>
        <el-table
          :border="true"
          ref="table"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          @header-dragend="checkWidth"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="bxname"
            label="报销主题"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="applydate"
            label="报销日期"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="filledby"
            label="填报人"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="departmentname"
            label="部门"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="postname"
            label="岗位"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="bxmoney"
            label="报销金额"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <div slot="append">
            <div class="sum_footer xiaoji" ref="sum_xiaoji">
              <div class="sum_footer_unit center">小计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit">
                {{ xiaoji }}
              </div>
            </div>
            <div class="sum_footer" ref="sum_heji">
              <div class="sum_footer_unit center">合计</div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit"></div>
              <div class="sum_footer_unit">
                {{ heji }}
              </div>
            </div>
          </div>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'branchCostList',
  components: { commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '报销主题',
          labelData: 'bxname',
        },
        {
          labelName: '开始时间',
          labelData: 'startTime',
        },
        {
          labelName: '结束时间',
          labelData: 'endTime',
        },

        {
          labelName: '填报人',
          labelData: 'filledby',
        },
      ],
      formInline: {
        bxname: '',
        paymentnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        proname: '',
        departmentname: '',
        filledby: '',
        sourcenumber: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      xiaoji: 0,
      heji: 0,
    };
  },
  methods: {
    adjustWidth() {
      const _this = this;
      _this.$nextTick(() => {
        let width = getComputedStyle(
          _this.$refs.table.$refs.headerWrapper.querySelector('table'),
        ).width;
        _this.$refs.sum_xiaoji.style = 'width:' + width;
        _this.$refs.sum_heji.style = 'width:' + width;
        Array.from(
          _this.$refs.table.$refs.headerWrapper.querySelectorAll('col'),
        ).forEach((n, i) => {
          if (i == 0) {
            _this.$refs.sum_xiaoji.children[0].style = 'width:' + '54px';
            _this.$refs.sum_heji.children[0].style = 'width:' + '54px';
          } else {
            _this.$refs.sum_xiaoji.children[i].style =
              'width:' + n.getAttribute('width') + 'px';
            _this.$refs.sum_heji.children[i].style =
              'width:' + n.getAttribute('width') + 'px';
          }
        });
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
      return 'color:#5f5f5f;border-color:#F1F8FF;';
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 500);
    },
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (column.type != 'selection') {
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: row.filename, //打开侧边栏的url
            title: '详情', //侧边栏顶部标题
            onSuccess: function (result) {},
            onFail: function () {
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
        .post('/finance/addaccountnews', { tmpname: '下属报销' })
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.content.process_code;
            dd.ready(function () {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
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
        .catch(function (error) {
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
        .post('/finance/xsfybxlist', {
          current_page: this.currentPage,
          bxname: this.formInline.bxname,
          filledby: this.formInline.filledby,
          starttime: this.formInline.startTime,
          stoptime: this.formInline.endTime,
          departmentname: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.xiaoji = res.data.xiaojimoney;
            this.heji = res.data.zmoney;
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
              .post('/finance/fbpaymentdel', {
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
        .post('/finance/reduction', { type: 8 })
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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/xsfy_export', { id: _this.multSelectData })
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
          message: '请先勾选要导出的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.$utils.checkding();
    this.getList();
    this.$nextTick(() => {
      this.adjustWidth();
    });
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.approvalStatus = this.$utils.utilApprovalStatus();
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