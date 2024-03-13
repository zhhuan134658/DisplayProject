<template>
  <div id="incomeContractReport">
    <!-- 投标保证金报表 -->
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
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column prop="project_name" label="项目名称" align="left">
          </el-table-column>
          <el-table-column
            prop="contract_name"
            label="所属分包合同"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="unit"
            label="分包单位"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="bond_money"
            label="保证金收取金额"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="return_money"
            align="left"
            :show-overflow-tooltip="true"
            label="保证金退回金额"
          >
          </el-table-column>
          <el-table-column
            prop="not_money"
            align="left"
            :show-overflow-tooltip="true"
            label="未退金额"
          >
          </el-table-column>

          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit center"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.xj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
                  "
                >
                  <el-tooltip
                    v-if="item.xj"
                    class="item"
                    effect="dark"
                    :content="item.xj"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ item.xj }}
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit center"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.hj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
                  "
                >
                  <el-tooltip
                    v-if="item.hj"
                    class="item"
                    effect="dark"
                    :content="item.hj"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ item.hj }}
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
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'incomeContractReport',
  components: { commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },
        {
          labelName: '单位名称',
          labelData: 'unit',
        },
      ],
      formInline: {
        register: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        contract_name: '',
        send_name: '',
        send_userid: '',
        unit: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      footerNumList: [],
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
        register: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        contract_name: '',
        send_name: '',
        send_userid: '',
        unit: '',
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
        .post('/finance/major_bobd', {
          current_page: this.currentPage,
          num: this.pagesize,
          contract_name: this.formInline.contract_name,
          project_name_jing: this.formInline.project_name,
          unit: this.formInline.unit,

          // send_name: this.formInline.send_name,
          // send_userid: this.formInline.send_userid,
        })
        .then(res => {
          if (res.data.code == '1') {
            this.total = res.data.content.total;
            if (res.data.content.list == null) {
              this.tpList = [];
            } else {
              this.tpList = res.data.content.list;
            }
            this.footerNumList = [
              { xj: '', hj: '' },
              { xj: '', hj: '' },
              { xj: '', hj: '' },

              {
                xj: res.data.xj_bond_money,
                hj: res.data.zj_bond_money,
              },
              {
                xj: res.data.xj_return_money,
                hj: res.data.zj_return_money,
              },
              {
                xj: res.data.xj_not_money,
                hj: res.data.zj_not_money,
              },
              { xj: '', hj: '' },
              { xj: '', hj: '' },
            ];
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
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/labor_bobd_export', {
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