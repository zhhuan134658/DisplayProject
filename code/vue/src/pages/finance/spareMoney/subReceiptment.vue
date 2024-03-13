<template>
  <div id="projectIndirectCost">
    <!-- 项目工资报表表 -->
    <div class="main">
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="采购合同收票付款汇总表" name="0">
            <el-table
              :border="true"
              class="moterialTotalClass"
              :max-height="650"
              :data="tpList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              @header-dragend="checkWidth"
              ref="tablecg"
              style="width: 100%; border: 1px solid #ebeef5"
              @selection-change="handleSelectionChange"
              size="mini"
              :row-class-name="tableRowClassName"
              @cell-click="viewDia1"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" width="55" label="序号" />
              <el-table-column
                prop="project_name"
                label="项目名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="collection_unit"
                label="收款单位"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="source"
                label="合同名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="contract_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：采购合同合同金额</div>
                    <div>合同金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="order_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：采购订单订单金额</div>
                    <div>订单金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="js_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：材料结算结算金额</div>
                    <div>结算金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票登记的收票金额</div>
                    <div>收票金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="pay_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：材料付款登记的付款金额</div>
                    <div>付款金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column
                prop="wf_contract_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：合同金额-付款金额</div>
                    <div>合同未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="js_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：结算金额-付款金额</div>
                    <div>结算未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票金额-付款金额</div>
                    <div>收票未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <div slot="append">
                <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
                  <div class="sum_footer xiaoji" ref="sum_xiaojicg">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      小计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ xjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjorder_money"
                        placement="top"
                      >
                        <div>{{ xjorder_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcailiao_money"
                        placement="top"
                      >
                        <div>{{ xjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjsp_money"
                        placement="top"
                      >
                        <div>{{ xjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="top"
                      >
                        <div>{{ xjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjwf_contract_money"
                        placement="t1op"
                      >
                        <div>{{ xjwf_contract_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>
                  </div>
                  <div class="sum_footer" ref="sum_hejicg">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      合计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ zjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjorder_money"
                        placement="top"
                      >
                        <div>{{ zjorder_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcailiao_money"
                        placement="top"
                      >
                        <div>{{ zjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_money"
                        placement="top"
                      >
                        <div>{{ zjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjpay_money"
                        placement="top"
                      >
                        <div>{{ zjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjwf_contract_money"
                        placement="t1op"
                      >
                        <div>{{ zjwf_contract_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>
                  </div>
                </div>
              </div>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="劳务合同收票付款汇总表" name="1">
            <el-table
              :border="true"
              class="moterialTotalClass"
              :max-height="650"
              :data="tpList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              @header-dragend="checkWidth"
              ref="tablelw"
              style="width: 100%; border: 1px solid #ebeef5"
              @selection-change="handleSelectionChange"
              size="mini"
              :row-class-name="tableRowClassName"
              @cell-click="viewDia2"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" width="55" label="序号" />
              <el-table-column
                prop="project_name"
                label="项目名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="collection_unit"
                label="收款单位"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="source"
                label="合同名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="contract_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：劳务合同合同金额+劳务合同变更签证
                    </div>
                    <div>合同金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column
                prop="js_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：劳务管理
                      完工结算结算金额+劳务进度款结算结算金额+质保金结算结算金额
                    </div>
                    <div>结算金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票登记的含税金额</div>
                    <div>收票金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="pay_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：劳务合同付款的付款金额+代发班组工资的合计金额
                    </div>
                    <div>付款金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="js_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：结算金额-付款金额</div>
                    <div>结算未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票金额-付款金额</div>
                    <div>收票未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <div slot="append">
                <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
                  <div class="sum_footer xiaoji" ref="sum_xiaojilw">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      小计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ xjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcailiao_money"
                        placement="top"
                      >
                        <div>{{ xjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjsp_money"
                        placement="top"
                      >
                        <div>{{ xjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="top"
                      >
                        <div>{{ xjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ xjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjsp_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center"></div>
                  </div>
                  <div class="sum_footer" ref="sum_hejilw">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      合计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ zjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcailiao_money"
                        placement="top"
                      >
                        <div>{{ zjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_money"
                        placement="top"
                      >
                        <div>{{ zjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="t1op"
                      >
                        <div>{{ zjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjsp_wf_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center"></div>
                  </div>
                </div>
              </div>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="分包合同收票付款汇总表" name="2">
            <el-table
              :border="true"
              class="moterialTotalClass"
              :max-height="650"
              :data="tpList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              @header-dragend="checkWidth"
              ref="tablefb"
              style="width: 100%; border: 1px solid #ebeef5"
              @selection-change="handleSelectionChange"
              size="mini"
              :row-class-name="tableRowClassName"
              @cell-click="viewDia3"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" width="55" label="序号" />
              <el-table-column
                prop="project_name"
                label="项目名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="collection_unit"
                label="收款单位"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="source"
                label="合同名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="contract_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：分包合同合同金额+分包变更签证金额
                    </div>
                    <div>合同金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column
                prop="js_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      来源于：分包完工结算结算金额+分包进度款结算结算金额+分包质保金结算结算金额
                    </div>
                    <div>结算金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票登记的含税金额</div>
                    <div>收票金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="pay_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：分包付款登记的付款金额</div>
                    <div>付款金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="js_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：结算金额-付款金额</div>
                    <div>结算未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票金额-付款金额</div>
                    <div>收票未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <div slot="append">
                <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
                  <div class="sum_footer xiaoji" ref="sum_xiaojifb">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      小计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ xjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcailiao_money"
                        placement="top"
                      >
                        <div>{{ xjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjsp_money"
                        placement="top"
                      >
                        <div>{{ xjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="top"
                      >
                        <div>{{ xjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ xjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjsp_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center"></div>
                  </div>
                  <div class="sum_footer" ref="sum_hejifb">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      合计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ zjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcailiao_money"
                        placement="top"
                      >
                        <div>{{ zjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_money"
                        placement="top"
                      >
                        <div>{{ zjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="t1op"
                      >
                        <div>{{ zjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjsp_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center"></div>
                  </div>
                </div>
              </div>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租赁合同收票付款汇总表" name="3">
            <el-table
              border="true"
              class="moterialTotalClass"
              :max-height="650"
              :data="tpList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              @header-dragend="checkWidth"
              ref="tablezl"
              style="width: 100%; border: 1px solid #ebeef5"
              @selection-change="handleSelectionChange"
              size="mini"
              :row-class-name="tableRowClassName"
              @cell-click="viewDia4"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column type="index" width="55" label="序号" />
              <el-table-column
                prop="project_name"
                label="项目名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="collection_unit"
                label="收款单位"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="source"
                label="合同名称"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="contract_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：租赁合同合同金额</div>
                    <div>合同金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <el-table-column
                prop="js_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：租赁结算的结算金额</div>
                    <div>结算金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票登记的含税金额</div>
                    <div>收票金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="pay_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：租赁付款登记的付款金额</div>
                    <div>付款金额(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="js_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：结算金额-付款金额</div>
                    <div>结算未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="sp_wf_money"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot="header" slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">来源于：收票金额-付款金额</div>
                    <div>收票未付款(元)</div>
                  </el-tooltip>
                </template>
              </el-table-column>

              <div slot="append">
                <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
                  <div class="sum_footer xiaoji" ref="sum_xiaojizl">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      小计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ xjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjcailiao_money"
                        placement="top"
                      >
                        <div>{{ xjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjsp_money"
                        placement="top"
                      >
                        <div>{{ xjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="top"
                      >
                        <div>{{ xjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ xjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjsp_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center"></div>
                  </div>
                  <div class="sum_footer" ref="sum_hejizl">
                    <div
                      class="sum_footer_unit center"
                      style="text-align: center"
                    >
                      合计
                    </div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>
                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center"></div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcontract_money"
                        placement="top"
                      >
                        <div>
                          {{ zjcontract_money }}
                        </div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjcailiao_money"
                        placement="top"
                      >
                        <div>{{ zjcailiao_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjsp_money"
                        placement="top"
                      >
                        <div>{{ zjsp_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="xjpay_money"
                        placement="t1op"
                      >
                        <div>{{ zjpay_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>
                    <div class="sum_footer_unit center over_sum_text">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="zjjs_wf_money"
                        placement="t1op"
                      >
                        <div>{{ zjjs_wf_money }}</div>
                      </el-tooltip>
                    </div>

                    <div class="sum_footer_unit center"></div>
                  </div>
                </div>
              </div>
            </el-table>
          </el-tab-pane>
        </el-tabs>

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
  name: 'workContractReport',
  components: { pierceTable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: '项目名称',
          labelData: 'project_name',
        },
        {
          labelName: '单位',
          labelData: 'collection_unit',
        },
      ],
      titleData: '', //穿透
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(), //穿透
      activeName: 0,
      formInline: {
        collection_unit: '',
        contract_name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        teamname: '',
      },
      xjwf_contract_money: '',
      zjwf_contract_money: '',
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      approvalStatus: [],
      footerNumList: [],
      allProjectList: [],
      twoData: '',
      zjcontract_money: '', //总计合同
      zjorder_money: '', //总计订单
      zjcailiao_money: '', //总计结算
      zjsp_money: '', //总计收票
      zjpay_money: '', //总计付款
      xjcontract_money: '', //小计合同
      xjorder_money: '', //小计订单
      xjcailiao_money: '', //小计结算
      xjsp_money: '', //小计收票
      xjpay_money: '', //小计付款,
      xjjs_wf_money: '', //小计收票
      zjjs_wf_money: '', //小计付款,
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = [
        'contract_money',
        'order_money',
        'sp_money',
        'js_money',
        'pay_money',
      ];
      if (newArr.includes(column.property)) {
        return 'color:#409EFF;padding:6px 0;cursor:pointer';
      } else {
        return 'color:#5f5f5f;padding:6px 0';
      }
    },
    viewDia1(row, column, cell, event) {
      console.log(row, column, cell, event);
      console.log('123');
      this.taPLoading = true;
      this.pierceTableid = +new Date();

      if (column.property == 'contract_money') {
        //合同金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'合同金额:' + event.target.innerText}`;
        this.getpierceList('1', '/finance/cg_pool_pass', row, column);
      } else if (column.property == 'order_money') {
        //订单金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'订单金额:' + event.target.innerText}`;
        this.getpierceList('2', '/finance/cg_pool_pass', row, column);
      } else if (column.property == 'sp_money') {
        //收票金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'收票金额:' + event.target.innerText}`;
        this.getpierceList('3', '/finance/cg_pool_pass', row, column);
      } else if (column.property == 'js_money') {
        //结算金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'结算金额:' + event.target.innerText}`;
        this.getpierceList('4', '/finance/cg_pool_pass', row, column);
      } else if (column.property == 'pay_money') {
        //付款金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'付款金额:' + event.target.innerText}`;
        this.getpierceList('5', '/finance/cg_pool_pass', row, column);
      }
    },
    viewDia2(row, column, cell, event) {
      console.log(row, column, cell, event);
      console.log('123');
      this.twoData = '1';
      this.taPLoading = true;
      this.pierceTableid = +new Date();

      if (column.property == 'contract_money') {
        //合同金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'合同金额:' + event.target.innerText}`;
        this.getpierceList('1', '/finance/lw_pool_pass', row, column);
      } else if (column.property == 'sp_money') {
        //收票金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'收票金额:' + event.target.innerText}`;
        this.getpierceList('2', '/finance/lw_pool_pass', row, column);
      } else if (column.property == 'js_money') {
        //结算金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'结算金额:' + event.target.innerText}`;
        this.getpierceList('4', '/finance/lw_pool_pass', row, column);
      } else if (column.property == 'pay_money') {
        //付款金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'付款金额:' + event.target.innerText}`;
        this.getpierceList('3', '/finance/lw_pool_pass', row, column);
      }
    },
    viewDia3(row, column, cell, event) {
      console.log(row, column, cell, event);
      console.log('123');
      this.twoData = '2';
      this.taPLoading = true;
      this.pierceTableid = +new Date();

      if (column.property == 'contract_money') {
        //合同金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'合同金额:' + event.target.innerText}`;
        this.getpierceList('1', '/finance/fb_pool_pass', row, column);
      } else if (column.property == 'sp_money') {
        //收票金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'收票金额:' + event.target.innerText}`;
        this.getpierceList('2', '/finance/fb_pool_pass', row, column);
      } else if (column.property == 'js_money') {
        //结算金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'结算金额:' + event.target.innerText}`;
        this.getpierceList('4', '/finance/fb_pool_pass', row, column);
      } else if (column.property == 'pay_money') {
        //付款金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'付款金额:' + event.target.innerText}`;
        this.getpierceList('3', '/finance/fb_pool_pass', row, column);
      }
    },
    viewDia4(row, column, cell, event) {
      console.log(row, column, cell, event);
      console.log('123');
      this.taPLoading = true;
      this.pierceTableid = +new Date();

      if (column.property == 'contract_money') {
        //合同金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'合同金额:' + event.target.innerText}`;
        this.getpierceList('1', '/finance/zl_pool_pass', row, column);
      } else if (column.property == 'sp_money') {
        //收票金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'收票金额:' + event.target.innerText}`;
        this.getpierceList('2', '/finance/zl_pool_pass', row, column);
      } else if (column.property == 'js_money') {
        //结算金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'结算金额:' + event.target.innerText}`;
        this.getpierceList('4', '/finance/zl_pool_pass', row, column);
      } else if (column.property == 'pay_money') {
        //付款金额
        this.titleData = '数据来源';

        this.proName = `${'项目名称:' + row.project_name}`;
        this.totalMoney = `${'付款金额:' + event.target.innerText}`;
        this.getpierceList('3', '/finance/zl_pool_pass', row, column);
      }
    },
    //获取穿透dialog里所有数据
    getpierceList(type, apiname, row, column) {
      console.log(row);
      this.$axios
        .post(apiname, {
          type,
          project_name: row.project_name,
          name: row.source,
          unit: row.collection_unit,
        })
        .then(res => {
          let onenewArr = [
            'contract_money',
            'order_money',
            'sp_money',
            'js_money',
            'pay_money',
          ];
          let twonewArr = [''];
          if (onenewArr.includes(column.property)) {
            if (this.twoData == '1' && column.property == 'js_money') {
              this.tableList = [
                res.data.data.service_completion_settlement,
                res.data.data.service_progresspay_declaration,
                res.data.data.service_warranty_settlement,
              ];
            } else if (this.twoData == '2' && column.property == 'js_money') {
              this.tableList = [
                res.data.data.sub_completion_settlement,
                res.data.data.sub_progresspay_declaration,
                res.data.data.sub_warranty_settlement,
              ];
            } else if (this.twoData == '1' && column.property == 'pay_money') {
              this.tableList = [
                res.data.data.issued_class_wages,
                res.data.data.service_payment_application,
              ];
            } else if (
              this.twoData == '1' &&
              column.property == 'contract_money'
            ) {
              this.tableList = [
                res.data.data.service_contract,
                res.data.data.service_visa_change,
              ];
            } else if (
              this.twoData == '2' &&
              column.property == 'contract_money'
            ) {
              this.tableList = [
                res.data.data.sub_contract,
                res.data.data.sub_visa_change,
              ];
            } else {
              this.tableList = [res.data.data];
            }
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    handleClick() {
      console.log(this.activeName);
      this.currentPage = 1;
      this.getList();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    resetClick() {
      this.formInline = {
        collection_unit: '',
        contract_name: '',
        project_name: '',
        status: '',
        startTime: '',
        endTime: '',
        teamname: '',
      };
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    adjustWidth() {
      const _this = this;
      if (_this.activeName == '0') {
        _this.$nextTick(() => {
          let newW = document.getElementsByClassName(
            'el-table__append-wrapper',
          )[0];
          _this.$utils.utilAdjustWidth(
            _this.$refs.tablecg,
            newW,
            _this.$refs.sum_xiaojicg,
            _this.$refs.sum_hejicg,
          );
        });
      } else if (_this.activeName == '1') {
        _this.$nextTick(() => {
          let newW = document.getElementsByClassName(
            'el-table__append-wrapper',
          )[0];
          _this.$utils.utilAdjustWidth(
            _this.$refs.tablelw,
            newW,
            _this.$refs.sum_xiaojilw,
            _this.$refs.sum_hejilw,
          );
        });
      } else if (_this.activeName == '2') {
        _this.$nextTick(() => {
          let newW = document.getElementsByClassName(
            'el-table__append-wrapper',
          )[0];
          _this.$utils.utilAdjustWidth(
            _this.$refs.tablefb,
            newW,
            _this.$refs.sum_xiaojifb,
            _this.$refs.sum_hejifb,
          );
        });
      } else if (_this.activeName == '3') {
        _this.$nextTick(() => {
          let newW = document.getElementsByClassName(
            'el-table__append-wrapper',
          )[0];
          _this.$utils.utilAdjustWidth(
            _this.$refs.tablezl,
            newW,
            _this.$refs.sum_xiaojizl,
            _this.$refs.sum_hejizl,
          );
        });
      }
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
      if (this.activeName == '0') {
        this.$axios
          .post('/finance/ticketreceipt  ', {
            current_page: this.currentPage,
            starttime: this.formInline.startTime,
            endtime: this.formInline.endTime,
            contract_name: this.formInline.contract_name,
            teamname: this.formInline.teamname,
            project_name: this.formInline.project_name,
            number: this.pagesize,
            collection_unit: this.formInline.collection_unit,
            type:'0'
          })
          .then(res => {
            if (res.data.code == 1) {
              this.total = res.data.content.total;
              if (res.data.content.list == null) {
                this.tpList = [];
              } else {
                this.tpList = res.data.content.list;
              }
              this.zjcontract_money = res.data.zjcontract_money;
              this.zjorder_money = res.data.zjorder_money;
              this.zjcailiao_money = res.data.zjcailiao_money;
              this.zjsp_money = res.data.zjsp_money;
              this.zjpay_money = res.data.zjpay_money;
              this.zjjs_wf_money = res.data.zjjs_wf_money;
              this.xjcontract_money = res.data.xjcontract_money;
              this.xjorder_money = res.data.xjorder_money;
              this.xjcailiao_money = res.data.xjcailiao_money;
              this.xjsp_money = res.data.xjsp_money;
              this.xjpay_money = res.data.xjpay_money;
              this.xjjs_wf_money = res.data.xjjs_wf_money;
              this.zjsp_wf_money = res.data.zjsp_wf_money;
              this.xjwf_contract_money = res.data.xjwf_contract_money;
              this.zjwf_contract_money = res.data.zjwf_contract_money;
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
      } else if (this.activeName == '1') {
        this.$axios
          .post('/finance/ticketreceipt  ', {
            current_page: this.currentPage,
            starttime: this.formInline.startTime,
            endtime: this.formInline.endTime,
            contract_name: this.formInline.contract_name,
            type:'1',
            teamname: this.formInline.teamname,
            project_name: this.formInline.project_name,
            number: this.pagesize,
            collection_unit: this.formInline.collection_unit,
          })
          .then(res => {
            if (res.data.code == 1) {
              this.total = res.data.content.total;
              if (res.data.content.list == null) {
                this.tpList = [];
              } else {
                this.tpList = res.data.content.list;
              }
              this.zjcontract_money = res.data.zjcontract_money;

              this.zjcailiao_money = res.data.zjcailiao_money;
              this.zjsp_money = res.data.zjsp_money;
              this.zjpay_money = res.data.zjpay_money;
              this.zjjs_wf_money = res.data.zjjs_wf_money;
              this.xjcontract_money = res.data.xjcontract_money;

              this.xjcailiao_money = res.data.xjcailiao_money;
              this.xjsp_money = res.data.xjsp_money;
              this.xjpay_money = res.data.xjpay_money;
              this.xjjs_wf_money = res.data.xjjs_wf_money;
              this.zjsp_wf_money = res.data.zjsp_wf_money;
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
      } else if (this.activeName == '2') {
        this.$axios
          .post('/finance/ticketreceipt  ', {
            current_page: this.currentPage,
            starttime: this.formInline.startTime,
            endtime: this.formInline.endTime,
            contract_name: this.formInline.contract_name,
            type:'2',
            teamname: this.formInline.teamname,
            project_name: this.formInline.project_name,
            number: this.pagesize,
            collection_unit: this.formInline.collection_unit,
          })
          .then(res => {
            if (res.data.code == 1) {
              this.total = res.data.content.total;
              if (res.data.content.list == null) {
                this.tpList = [];
              } else {
                this.tpList = res.data.content.list;
              }
              this.zjcontract_money = res.data.zjcontract_money;
              this.zjorder_money = res.data.zjorder_money;
              this.zjcailiao_money = res.data.zjcailiao_money;
              this.zjsp_money = res.data.zjsp_money;
              this.zjpay_money = res.data.zjpay_money;
              this.zjjs_wf_money = res.data.zjjs_wf_money;
              this.xjcontract_money = res.data.xjcontract_money;
              this.xjorder_money = res.data.xjorder_money;
              this.xjcailiao_money = res.data.xjcailiao_money;
              this.xjsp_money = res.data.xjsp_money;
              this.xjpay_money = res.data.xjpay_money;
              this.xjjs_wf_money = res.data.xjjs_wf_money;
              this.zjsp_wf_money = res.data.zjsp_wf_money;
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
      } else if (this.activeName == '3') {
        this.$axios
          .post('/finance/ticketreceipt  ', {
            current_page: this.currentPage,
            starttime: this.formInline.startTime,
            endtime: this.formInline.endTime,
            contract_name: this.formInline.contract_name,
            teamname: this.formInline.teamname,
            project_name: this.formInline.project_name,
            number: this.pagesize,
            collection_unit: this.formInline.collection_unit,
            type:'3',
          })
          .then(res => {
            if (res.data.code == 1) {
              this.total = res.data.content.total;
              if (res.data.content.list == null) {
                this.tpList = [];
              } else {
                this.tpList = res.data.content.list;
              }
              this.zjcontract_money = res.data.zjcontract_money;
              this.zjorder_money = res.data.zjorder_money;
              this.zjcailiao_money = res.data.zjcailiao_money;
              this.zjsp_money = res.data.zjsp_money;
              this.zjpay_money = res.data.zjpay_money;
              this.zjjs_wf_money = res.data.zjjs_wf_money;
              this.xjcontract_money = res.data.xjcontract_money;
              this.xjorder_money = res.data.xjorder_money;
              this.xjcailiao_money = res.data.xjcailiao_money;
              this.xjsp_money = res.data.xjsp_money;
              this.xjpay_money = res.data.xjpay_money;
              this.xjjs_wf_money = res.data.xjjs_wf_money;
              this.zjsp_wf_money = res.data.zjsp_wf_money;
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
      }
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
      if (_this.activeName == '0') {
        _this.$axios
          .post('/finance/ticketreceipt_dc  ', {
            project_name: this.formInline.project_name,
            collection_unit: this.formInline.collection_unit,
            type:'0'
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
      } else if (_this.activeName == '1') {
        _this.$axios
          .post('/finance/ticketreceipt_dc  ', {
            project_name: this.formInline.project_name,
            collection_unit: this.formInline.collection_unit,
            type:'1'

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
      } else if (_this.activeName == '2') {
        _this.$axios
          .post('/finance/ticketreceipt_dc  ', {
            project_name: this.formInline.project_name,
            collection_unit: this.formInline.collection_unit,
            type:'2'
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
      } else if (_this.activeName == '3') {
        _this.$axios
          .post('/finance/ticketreceipt_dc  ', {
            project_name: this.formInline.project_name,
            collection_unit: this.formInline.collection_unit,
            type:'3'
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
<style scoped>
.sum_footer_unit center {
  text-align: left;
}
.center {
  text-align: center !important;
}
</style>