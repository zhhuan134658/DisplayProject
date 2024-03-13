<template>
  <div id="workRealName">
    <!-- 劳务实名制列表 -->
    <div class="main">
      <div class="header">
        <div
          class="headerContent"
          style="display: flex; justify-content: space-between"
        >
          <el-form
            @submit.native.prevent
            :inline="true"
            :model="formInline"
            label-width="120px"
            class="demo-form-inline"
            style="width: 90%"
          >
            <div class="hlBottom">
              <el-form-item
                class="searchTime"
                label="开始时间:"
                style="min-width: 300px"
              >
                <el-date-picker
                  v-model="formInline.startTime"
                  :picker-options="pickerStart"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                class="searchTime"
                label="结束时间:"
                style="min-width: 300px"
              >
                <el-date-picker
                  v-model="formInline.endTime"
                  :picker-options="pickerEnd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-button type="primary" size="medium" @click="searchClick"
                >搜索</el-button
              >
              <!-- <el-form-item label="审批状态:">
                                <el-select
                                    v-model="formInline.status"
                                    clearable
                                    filterable
                                    placeholder="请选择审批状态"
                                >
                                    <el-option
                                        v-for="(item, index) in approvalStatus"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item> -->
            </div>
          </el-form>
          <div>
            <el-button type="primary" plain size="medium" @click="goback"
              >返回</el-button
            >
          </div>
        </div>
      </div>
      <div class="mainContent">
        <div class="wrtTotal">
          <div>
            <div><count-up :value="bzData.money" /></div>
            <p>总工钱（元）</p>
          </div>
          <div>
            <div><count-up :value="bzData.time" /></div>
            <p>总点工</p>
          </div>
          <div>
            <div><count-up :value="bzData.jie" /></div>
            <p>总借支（元）</p>
          </div>
        </div>
        <el-row class="maincBtn">
          <el-button type="primary" plain size="medium" @click="exportList"
            >导出</el-button
          >
        </el-row>
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          border
          @row-click="checkList"
          style="width: 100%"
        >
          <el-table-column prop="name" label="姓名" align="left">
          </el-table-column>
          <el-table-column prop="duration" label="点工" align="left">
          </el-table-column>
          <el-table-column prop="wages" label="工钱（元）" align="left">
          </el-table-column>
          <el-table-column prop="jz_money" label="借支（元）" align="left">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="查看" :visible.sync="addFormVisible" width="800px">
      <div class="watchWrtD">
        <div>
          <div>{{ seName }}</div>
          <div>
            <span>{{ formInline.startTime || yueTime }}</span
            >至<span>{{ formInline.endTime || today }}</span>
          </div>
        </div>
        <div>
          <div>点工：{{ usData.time }}</div>
          <div>工钱：{{ usData.money }}</div>
          <div>借支：{{ usData.jz }}</div>
        </div>
      </div>
      <el-table
        :border="true"
        :data="recordData"
        :header-cell-style="tableHeaderClass"
        :cell-style="tableRowClass"
        border
        height="500px"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column prop="riqi" label="日期" align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          :show-overflow-tooltip="true"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="duration" label="点工" align="left">
        </el-table-column>
        <el-table-column
          prop="wages"
          label="工钱（元）"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="sf_total"
          label="借支（元）"
          align="left"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="pagesize"
        layout="sizes,prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
// import eupload from '../../../components/excelUpload.vue';
import CountUp from '@/components/CountUp';

export default {
  name: 'workRecordTotal',
  components: { CountUp },
  data() {
    return {
      tpList: [],
      recordData: [],
      formInline: {
        cert: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        b_number: '',
        name: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      multSelectData: [],
      getBzid: '',
      bzData: {
        money: 0,
        time: 0,
        jie: 0,
      },
      addFormVisible: false,
      seName: '',
      yueTime: '',
      today: '',
      seUid: '',
      usData: { money: 0, time: 0, jz: 0 },
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goRecord() {
      this.dialogFormVisible = true;
    },

    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;border-color:#F1F8FF;';
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getBList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBList();
    },
    getBList() {
      this.$axios
        .post('/projectthree/getMonthTongjiDetail', {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          ban_id: this.getBzid,
          identity_id: this.seUid,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.usData.time = res.data.data.total_duration;
            this.usData.money = res.data.data.total_money;
            this.usData.jz = res.data.data.jz;
            this.total = res.data.total;
            this.recordData = res.data.data.worker_list;
            if (this.total > 0 && this.recordData.length < 1) {
              this.currentPage = res.data.page;
              this.getBList();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查看详细
    checkList(row) {
      const _this = this;
      _this.seUid = row.id;
      _this.addFormVisible = true;
      _this.seName = row.name;
      _this.getBList();
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/projectthree/getMonthTongji', {
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          ban_id: this.getBzid,
        })
        .then(res => {
          if (res.data.code == 1) {
            // this.total = res.data.count;
            this.bzData.money = res.data.data.all_money;
            this.bzData.time = res.data.data.worker_num;
            this.bzData.jie = res.data.data.zjz_money;
            this.tpList = res.data.data.worker_list;
            // if (this.total > 0 && this.tpList.length < 1) {
            //     this.currentPage = res.data.page_number;
            //     this.getList();
            // }
          }
        })
        .catch(function(error) {
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
        this.$axios
          .post('/project/serviceRealnameRegisterDel', {
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
        .post('/project/serviceRealnameRegisterReduction')
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

      _this.$axios
        .post('/projectthree/getMonthTongjiDownload', {
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          ban_id: this.getBzid,
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
    },
  },
  created() {
    this.getBzid = this.$route.query.id;
    this.$utils.checkding();
    this.getList();
    let newTime = this.$utils.timeChange(new Date().setDate(1), 2);
    console.log('11++' + newTime);
    this.yueTime = newTime;
    this.today = this.$utils.timeChange(new Date(), 2);
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

<style lang="less" scoped>
.wrtTotal {
  background-image: linear-gradient(to bottom right, #fcb413, #fcc209);
  background: url('~@/assets/images/project-bg.png') no-repeat center center;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
