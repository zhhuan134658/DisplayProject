/*
 * @Author: NorthWind 
 * @Date: 2021-01-08 11:49:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-06-29 14:04:14
 */
<template>
  <div id="collectionReport">
    <!-- 应收款报表 -->
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
          <!-- <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="deleteList"
                        >删除</el-button
                    > -->
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
            prop="partya"
            label="往来单位"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="ykpmoney"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：开票登记的“发票金额”</div>
                <div>开票金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="skmoney"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：合同收款的“收款金额”</div>
                <div>收款金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="kpwskmoney"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">=已开票金额-收款金额</div>
                <div>开票未收款金额(元)</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="kxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ kxiaoji }}
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
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="kheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ kheji }}
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
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wheji }}
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
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'collectionReport',
  components: { pierceTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '往来单位',
          labelData: 'name',
        },
      ],
      titleData: '',
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),
      formInline: {
        name: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      kxiaoji: 0,
      kheji: 0,
      sxiaoji: 0,
      sheji: 0,
      wxiaoji: 0,
      wheji: 0,
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = ['ykpmoney', 'skmoney'];
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

      if (column.property == 'ykpmoney') {
        //开票金额
        this.titleData = '数据来源';

        this.proName = `${'往来单位:' + row.partya}`;
        this.totalMoney = `${'开票金额:' + event.target.innerText}`;
        this.getpierceList('1', row, column);
      } else if (column.property == 'skmoney') {
        //收款金额
        this.titleData = '数据来源';

        this.proName = `${'往来单位:' + row.partya}`;
        this.totalMoney = `${'收款金额 :' + event.target.innerText}`;
        this.getpierceList('2', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(status, row, column) {
      console.log(row);
      this.$axios
        .post('/finance/receivablespool_pass', {
          status,
          unit: row.partya,
        })
        .then(res => {
          let onenewArr = ['ykpmoney', 'skmoney'];
          let twonewArr = [''];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          }
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
        .post('/finance/receivablespool', {
          current_page: this.currentPage,
          partya: this.formInline.name,
          num: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.kxiaoji = res.data.xiaojiykpmoney;
            this.kheji = res.data.zjykpmoney;
            this.sxiaoji = res.data.xiaojiskmoney;
            this.sheji = res.data.zjskmoney;
            this.wxiaoji = res.data.xiaojikpwskmoney;
            this.wheji = res.data.zjkpwskmoney;
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
              .post('/finance/qtskdel', {
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
        .post('/finance/reduction', { type: 2 })
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
          .post('/finance/receivablespooldc', {
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
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
};
</script>