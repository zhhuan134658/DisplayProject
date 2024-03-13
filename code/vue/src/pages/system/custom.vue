<template>
  <div class="app-container">
    <div class="mainContent">
      <template>
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft"></div>
          <div class="mmbRight">
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            >
            <el-button type="primary" plain size="medium" @click="addForm"
              >添加新表单</el-button
            >
          </div>
        </el-row>

        <el-table
          :data="tableData"
          row-key="id"
          style="width: 100%; margin-top: 15px"
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
        >
          <!-- <el-table-column
          v-for="(item, index) in col"
          :key="`col_${index}`"
          :prop="dropCol[index].prop"
          :label="item.label"
        /> -->

          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column type="index" fixed="left" width="55" label="序号" />
          <el-table-column align="left" width="40" v-if="!isXu">
            <template slot-scope="scope">
              <i class="el-icon-s-operation"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="菜单名称"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="created"
            label="添加时间"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="pay_voucher"
            label="操作"
            align="left"
            width="120"
          >
            <template slot="header" slot-scope="scope">
              <div v-if="isXu">
                <i class="el-icon-s-operation"></i>
                <span @mouseup="xulie"> 表单排序 </span>
              </div>
              <div v-else>
                <span @mouseup="xulieQu" style="color: #3296fa"> 取消 </span>
                <span
                  @mouseup="xulieSave"
                  style="color: #3296fa; margin-left: 15px"
                >
                  保存
                </span>
              </div>
            </template>

            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除吗？"
                @confirm="deleteFiles(scope.row)"
              >
                <el-button type="text" slot="reference" size="mini"
                  >删除</el-button
                >
              </el-popconfirm>

              <el-button
                @click.native.prevent="editRow(scope.row)"
                type="text"
                size="small"
                style="margin-left: 20px"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog
      :title="isShow ? '添加审批表单名称' : '编辑审批表单名称'"
      :visible.sync="wFormVisible1"
      :close-on-click-modal="false"
      width="600px"
      @close="wCancel"
      class="view_change_title"
    >
      <div>
        <el-form
          @submit.native.prevent
          :model="formData"
          class="demo-form-inline"
        >
          <div class="hlBottom">
            <el-form-item label="审批表单名称:" prop="accountname">
              <el-input
                placeholder="请输入"
                v-model="formData.menu_name"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="addro">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
  name: 'DragTable',
  data() {
    return {
      col: [
        {
          label: '日期',
          prop: 'date',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '地址',
          prop: 'address',
        },
      ],
      dropCol: [
        {
          label: '日期',
          prop: 'date',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '地址',
          prop: 'address',
        },
      ],
      formData: {
        corp_id: this.$store.state.cid,
        menu_name: '',
        title: '',
      },
      wFormVisible1: false,
      tableData: [],
      isShow: false,
      multSelectData: [],
      isXu: true,
      tableObject: '',
    };
  },
  mounted() {
    // 阻止默认行为
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    // this.columnDrop()
    //    this.$nextTick(()=>{
    //     setTimeout(()=>{
    //     },100)
    //   })
  },
  methods: {
    xulie() {
      this.isXu = false;
      this.rowDrop();
    },
    xulieQu() {
      this.isXu = true;
      this.tableObject.destroy();
      this.getList();
    },
    xulieSave() {
      console.log(this.tableData);
      let newT = this.tableData;
      let num = 1;
      newT.forEach(e => {
        e.sort = num++;
      });
      this.sendTitleList(newT);
    },
    tableRowClassName({ row, rowIndex }) {
      //   if (rowIndex % 2 == 1) {
      //     return 'statistics-warning-row';
      //   } else {
      //     return '';
      //   }
    },
    sendTitleList(row) {
      this.$axios
        .post(
          '/mobile/menuSort',
          {
            menu_data: JSON.stringify(row),
          },
        //   { headers: { other: true } },
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$store.commit('setIsNewTitle', '4');
            this.getList();
            this.isXu = true;
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'success',
              duration: 1500,
            });
          } else {
            this.$message({
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
              .post(
                '/mobile/menuDel',
                {
                  id_arr: this.multSelectData,
                },
                // { headers: { other: true } },
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.getList();
                  this.$store.commit('setIsNewTitle', '1');
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
    addro() {
      if (this.isShow) {
        this.$axios
          .post(
            '/mobile/createForm',
            {
              corp_id: this.$store.state.cid,
              menu_name: this.formData.menu_name,
              title: this.formData.menu_name,
            },
            // { headers: { other: true } },
          )
          .then(res => {
            if (res.data.code == 1) {
              if (this.tableData.length==0) {
                this.$store.commit('setIsNewTitle', '2');
                // this.$router.go(0);
              }
              this.getList();

              this.wFormVisible1 = false;
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: 'success',
                duration: 1500,
              });
            } else {
              this.$message({
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
      } else {
        this.$axios
          .post(
            '/mobile/menuEdit',
            { id: this.ids, menu_name: this.formData.menu_name },
            // { headers: { other: true } },
          )
          .then(res => {
            if (res.data.code == 1) {
              this.getList();
              this.wFormVisible1 = false;
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: 'success',
                duration: 1500,
              });
            } else {
              this.$message({
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
      }
    },
    wCancel() {
      this.wFormVisible = false;
      this.wFormVisible1 = false;
      this.formData = {
        menu_name: '',
        title: '',
        corp_id: this.$store.state.cid,
      };
      this.getList();
    },
    editRow(row) {
      console.log(row);
      this.wFormVisible1 = true;
      this.formData.menu_name = row.name;
      this.ids = row.id;
      this.isShow = false;
    },
    addForm() {
      this.wFormVisible1 = true;
      this.isShow = true;
    },
    deleteFiles(row) {
      console.log(row);
      let arr = [];
      arr.push(row.id);
      this.$axios
        .post(
          '/mobile/menuDel',
          {
            id_arr: arr,
          },
        //   { headers: { other: true } },
        )
        .then(res => {
          if (res.data.code == 1) {
            this.getList();

            this.tableData = [];
            console.log(
              this.tableData.length,
              'this.tableData.lengththis.tableData.length',
            );
            if (this.tableData.length == 0) {
              this.$store.commit('setIsNewTitle', '3');
              //   this.$router.go(0);
            }
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getList() {
      this.$axios
        .post('/user/menu', {
          type: 13,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.data) {
              this.tableData = res.data.data;
              this.myArray = res.data.data;
            } else {
              this.tableData = [];
              this.myArray = [];
            }

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
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody');
      const _this = this;
      _this.tableObject = Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        },
      });
    },
    // 列拖拽
    columnDrop() {
      //   const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      //   this.sortable = Sortable.create(wrapperTr, {
      //     animation: 180,
      //     delay: 0,
      //     onEnd: evt => {
      //       const oldItem = this.dropCol[evt.oldIndex]
      //       this.dropCol.splice(evt.oldIndex, 1)
      //       this.dropCol.splice(evt.newIndex, 0, oldItem)
      //     }
      //   })
    },
  },
  created() {
    this.getList();
    this.$store.commit('setIsNewTitle', '');
  },
};
</script>
<style scoped>
.mainContent {
  background-color: white;
  padding: 30px 36px;
}
.mmbRight {
  text-align: right;
}
</style>
