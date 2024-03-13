<template>
  <div id="auditMen">
    <!-- 审计 -->
    <div class="main">
      <div class="mainContent">
        <el-table
          :border="true"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          style="width: 100%; border: 1px solid #ebeef5"
          max-height="650"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column
            prop="operation_date"
            label="时间"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="operation_name"
            label="操作者"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="operation_type"
            label="时间对象"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="operation_catalog"
            label="详细数据"
            align="left"
            :show-overflow-tooltip="true"
          >
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
export default {
  name: 'auditMen',
  data() {
    return {
      formInline: {
        name: '',
        status: '',
        startTime: '',
        endTime: '',
        p_number: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      loading: false,
      addFormVisible: false,
      approvalStatus: [],
      basicAddForm: { name: '', number: '', address: '', remarks: '' },
      basicAddFormRules: {
        name: [
          {
            required: true,
            message: '仓库名称不能为空',
            trigger: 'blur',
          },
        ],
        number: [
          {
            required: true,
            message: '编号不能为空',
            trigger: 'blur',
          },
        ],
      },
      btnType: 1,
      newTitle: '添加仓库',
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //查看审批
    checkList(row) {
      const _this = this;

      _this.btnType = 2;
      _this.newTitle = '编辑仓库';
      _this.addFormVisible = true;
      _this.$nextTick(() => {
        _this.basicAddForm = {
          name: '',
          number: '',
          address: '',
          remarks: '',
        };

        _this.basicAddForm = JSON.parse(JSON.stringify(row));
      });
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.btnType = 1;
      _this.newTitle = '添加仓库';
      _this.addFormVisible = true;
      _this.basicAddForm.id = '';
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      this.$axios
        .post('/order/jiluShow', {
          page: this.currentPage,
          number: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
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
              .post('/project/cangKuDel', {
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
    titleCancel(formName) {
      this.addFormVisible = false;
      this.$refs[formName].resetFields();
    },
    updateTemp() {
      const _this = this;
      _this.$axios
        .post('/project/cangkuUpdate', {
          corp_id: _this.$store.state.cid,
        })
        .then(res => {
          if (res.data.code == 1) {
          } else {
            _this.$message({
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
    //新建仓库
    titleSave(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.btnType == 1) {
            _this.$axios
              .post('/project/cangKuAdd', _this.basicAddForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.updateTemp();
                  _this.getList();
                  _this.loading = false;
                  _this.addFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'error',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.$axios
              .post('/project/cangKuEdit', _this.basicAddForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.updateTemp();
                  _this.getList();
                  _this.loading = false;
                  _this.addFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'error',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          }
        } else {
          _this.loading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() {
    this.$utils.checkding();
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