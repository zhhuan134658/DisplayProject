<template>
  <div id="materialPlanReport">
    <!-- 材料进出库报表 -->
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
          v-loading="tableloading"
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
          <el-table-column
            label="合同名称"
            prop="name"
            align="left"
            :show-overflow-tooltip="true"
            class-name="oIndColun"
          >
          </el-table-column>
          <el-table-column
            prop="project_name"
            label="项目"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="供应商"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="contract_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料合同的“合同金额”</div>
                <div>合同总金额</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="fk_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料付款的“付款金额”</div>
                <div>合同付款</div>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="js_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：材料结算的“结算金额”</div>
                <div>结算金额</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="no_pay_money"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">合同总金额-合同付款金额</div>
                <div>未付金额</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_lv"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">合同付款/合同总金额</div>
                <div>合同付款比率</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_qianding"
            align="left"
            :show-overflow-tooltip="true"
            v-if="
              $store.state.cid == 'ding1b508a8102d46015ffe93478753d9884' ||
              $store.state.cid == 'dingea47c602975497f935c2f4657eb6378f'
            "
          >
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">来源于：采购合同的“是否签订合同”</div>
                <div>是否签订合同</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="append">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="htxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ htxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fkxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fkxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="jsxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ jsxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wfxiaoji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wfxiaoji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div
                  v-if="
                    $store.state.cid ==
                      'ding1b508a8102d46015ffe93478753d9884' ||
                    $store.state.cid == 'dingea47c602975497f935c2f4657eb6378f'
                  "
                  class="sum_footer_unit"
                ></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="htheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ htheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="fkheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ fkheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="jsheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ jsheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit over_sum_text">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="wfheji"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ wfheji }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div
                  v-if="
                    $store.state.cid ==
                      'ding1b508a8102d46015ffe93478753d9884' ||
                    $store.state.cid == 'dingea47c602975497f935c2f4657eb6378f'
                  "
                  class="sum_footer_unit"
                ></div>
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
  name: 'materialContractMoney',
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
          labelName: '合同名称',
          labelData: 'name',
        },
      ],
      tableloading: false,
      formInline: {
        name: '',
        project_name: '',
      },
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      htxiaoji: 0,
      htheji: 0,
      fkxiaoji: 0,
      fkheji: 0,
      jsxiaoji: 0,
      jsheji: 0,
      wfxiaoji: 0,
      wfheji: 0,
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
        name: '',
        project_name: '',
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
      this.tableloading = true;
      this.$axios
        .post('/projectone/materialContractBook', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.name,
          project_name: this.formInline.project_name,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.htxiaoji = res.data.contract_money_subtotal;
            this.htheji = res.data.contract_money_total;

            this.fkxiaoji = res.data.fk_money_subtotal;
            this.fkheji = res.data.fk_money_total;

            this.jsxiaoji = res.data.js_money_subtotal;
            this.jsheji = res.data.js_money_total;

            this.wfxiaoji = res.data.no_pay_money_subtotal;
            this.wfheji = res.data.no_pay_money_total;
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
            this.tableloading = false;
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
          .post('/projectone/materialContractBookDownload', {
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
};
</script>