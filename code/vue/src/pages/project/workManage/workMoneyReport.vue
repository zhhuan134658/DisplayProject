<template>
  <div id="workMoneyReport">
    <!-- 项目工资列表 -->
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
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          max-height="650"
          style="width: 100%; border: 1px solid #ebeef5"
          @selection-change="handleSelectionChange"
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
          <el-table-column prop="year" label="年度" align="left" width="100">
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
            </el-table-column
            ><el-table-column
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
            </el-table-column
            ><el-table-column
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
  name: 'workMoneyReport',
  components: { commonSearch },

  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },
      ],
      allProjectList: [],
      formInline: {
        contractname: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        teamname: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
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
        contractname: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        teamname: '',
      };
      this.getList();
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
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/finance/projectpayreport', {
          current_page: this.currentPage,
          project_name_jing: this.formInline.project_name,
          number: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/projectpayreportdc', {
            id: _this.multSelectData,
          })
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