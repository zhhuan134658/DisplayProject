/* * @Author: NorthWind * @Date: 2020-12-15 14:17:29 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-13 14:17:20 */
<template>
  <div id="financeAccountInfo">
    <!-- 账户信息列表 -->
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
                  v-model="formInline.accountid"
                  @change="accChange"
                  clearable
                  filterable
                  placeholder="请选择项目"
                >
                  <el-option
                    v-for="(item, index) in accountList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <div style="text-align: center">
                <el-button
                  type="primary"
                  size="medium"
                  @click="searchClick"
                  style="margin-right: 10px"
                  >搜索</el-button
                >
                <el-button plain size="medium" @click="resetClick"
                  >重置</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mainContent">
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <!-- <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            > -->
          </div>
          <div class="mmbRight">
            <!-- <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            > -->
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <!-- <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
            > -->
            <!-- <el-button
              v-if="$store.state.userInfo.admin == 1"
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            > -->
          </div>
        </el-row>

        <!-- :istwo="true"  判断是否展示合计 -->
        <!-- :isHeji='true' -->

        <commonTable
          :tableloading="tableloading"
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          :isFive="true"
          :istwo="true"
          @calculations="calculations"
          @listenChild="getMult"
          @yusQd="yusQd"
          @viewDia="viewDia1"
          printTableName="zhukuai_finance_accountnews"
        ></commonTable>
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
    <el-dialog
      title="税务测算"
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
      width="1020px"
      @close="editCancel('AddUserForm')"
      class="phDialog"
    >
      <div class="phdMain">
        <el-form :model="addUserForm" ref="AddUserForm" label-width="175px">
          <div class="dBasicInfo" style="justify-content: space-between">
            <!-- <h2>基本信息</h2> -->
            <el-form-item
              label="收入合同金额(含税):"
              prop="revenue_money"
              class="dRemarkList"
            >
              <el-input
                v-model="addUserForm.revenue_money"
                placeholder="请输入"
                maxlength="50"
                style="width: 82%"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="销项税率%:"
              prop="supplier_type"
              style="width: 45%"
              class="dbasicList"
            >
              <el-input
                v-model="addUserForm.xiaox_lv"
                placeholder="请输入"
                maxlength="50"
                disabled
                style="width: 60%"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="销项税金额:"
              prop="abbre_name"
              class="dbasicList"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForm.xiaox_money"
                disabled
                placeholder="请输入"
                maxlength="50"
                style="width: 60%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="支出预算金额:"
              prop="number"
              class="dRemarkList"
            >
              <el-input
                v-model="addUserForm.yu_money"
                placeholder="请输入"
                maxlength="50"
                style="width: 82%"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="进项税综合税率%:"
              prop="contacts_mobile"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForm.jinx_lv"
                placeholder="请输入"
                style="width: 60%"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="进项税金额:"
              prop="zhuji_code"
              class="dbasicList"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForm.jinx_money"
                placeholder="请输入"
                maxlength="50"
                style="width: 60%"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="应纳增值税金额:"
              prop="zhuji_code"
              class="dRemarkList"
            >
              <el-input
                @blur="computes"
                v-model="addUserForm.zeng_money"
                placeholder="请输入"
                maxlength="50"
                style="width: 80%"
              ></el-input>
              <el-tooltip content="销项税金额-进项税金额" placement="top">
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="附加税:"
              prop="extend_first"
              class="dRemarkList"
            >
              <el-input
                v-model="addUserForm.additional_tax"
                placeholder="请输入"
                maxlength="30"
                style="width: 80%"
              ></el-input>
              <el-tooltip
                content="城市建设税税额+教育费附加税税额+地方教育费税额"
                placement="top"
              >
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="城市建设税税率%:"
              prop="extend_two"
              style="width: 45%"
            >
              <el-input
                @blur="compute('1')"
                v-model="addUserForms.jslv"
                placeholder="请输入"
                maxlength="50"
                style="width: 60%"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="城市建设税税额:"
              prop="bank"
              class="dbasicList"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForms.jsle"
                maxlength="50"
                placeholder="请输入"
                style="width: 55%"
                disabled
              ></el-input>

              <el-tooltip
                content="应纳增值税金额*城市建设税税率"
                placement="top"
              >
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="教育费附加税税率%:"
              prop="bank_cert"
              style="width: 45%"
            >
              <el-input
                @blur="compute('2')"
                v-model="addUserForms.jylv"
                maxlength="30"
                placeholder="请输入"
                style="width: 60%"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="教育费附加税税额:"
              prop="company_address"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForms.jyle"
                maxlength="50"
                placeholder="请输入"
                style="width: 55%"
                disabled
              ></el-input>

              <el-tooltip
                content="应纳增值税金额*教育费附加税税率"
                placement="top"
              >
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="地方教育费附加税税率%:"
              prop="contacts_mobile"
              style="width: 45%"
            >
              <el-input
                @blur="compute('3')"
                v-model="addUserForms.dfjylv"
                placeholder="请输入"
                style="width: 60%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="地方教育费税额:"
              prop="contacts"
              class="dbasicList"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForms.dfjyle"
                maxlength="10"
                placeholder="请输入"
                style="width: 55%"
                disabled
              ></el-input>
              <el-tooltip
                content="应纳增值税金额*地方教育费附加税税率"
                placement="top"
              >
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="印花税税率%:"
              prop="contacts_mobile"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForms.yhlv"
                placeholder="请输入"
                style="width: 60%"
                @blur="compute('4')"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="印花税税额:"
              prop="establish_time"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForms.yhle"
                placeholder="请输入"
                style="width: 55%"
                disabled
              ></el-input>

              <el-tooltip content="收入合同金额*印花税税率" placement="top">
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="企业所得税税率(公摊)%:"
              prop="personnel_size"
              style="width: 45%"
            >
              <el-input
                v-model="addUserForms.sdlv"
                placeholder="请输入"
                style="width: 60%"
                @blur="compute('5')"
                maxlength="10"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="企业所得税税额:"
              prop="charge_dept"
              class="dbasicList"
              style="width: 45%"
            >
              <el-input
                placeholder="请输入"
                v-model="addUserForms.sdle"
                id="addinputdet"
                disabled
                readonly
                style="width: 55%"
              ></el-input>
              <el-tooltip
                content="(收入合同金额-销项税金额)*企业所得税税率(公摊)"
                placement="top"
              >
                <i
                  class="el-icon-question"
                  style="font-size: 18px; margin-left: 5px"
                ></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              label="其他税金额:"
              prop="charge_person"
              class="dRemarkList"
            >
              <el-input
                placeholder="请输入"
                v-model="addUserForm.other_tax"
                id="addinput"
                style="width: 82%"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="addFormVisible = false"
          >取 消</el-button
        >
        <el-button size="medium" type="primary" @click="editInfo('AddUserForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="测算结果" :visible.sync="addFormVisible2" width="30%">
      <div style="line-height: 30px">
        <div style="color: #b9b9b9">
          <span class="namesd">项目名称:</span>
          <span style="color: black"> {{ addUserForm.name }}</span>
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd"> 收入合同金额(含税):</span>
          <span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{ this.CurrencyFomatNumber(addUserForm.revenue_money, 2) }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd"> 销项税金额: </span
          ><span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{ this.CurrencyFomatNumber(addUserForm.xiaox_money, 2) }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd">进项税金额: </span
          ><span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{ this.CurrencyFomatNumber(addUserForm.jinx_money, 2) }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd"> 应纳增值税金额:</span>
          <span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{ this.CurrencyFomatNumber(addUserForm.zeng_money, 2) }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd">附加税金额: </span
          ><span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{
              (
                Number(addUserForms.jsle) +
                Number(addUserForms.jyle) +
                Number(addUserForms.dfjyle)
              ).toFixed(2)
            }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd">印花税金额: </span
          ><span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{ addUserForms.yhle || 0.0 }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd">企业所得税金额:</span>
          <span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{ addUserForms.sdle }}</span
          >
        </div>
        <div style="color: #b9b9b9">
          <span class="namesd">其他税金额: </span
          ><span
            style="
              color: black;
              width: 23%;
              display: inline-block;
              text-align: right;
            "
          >
            {{
              this.CurrencyFomatNumber(addUserForm.other_tax, 2) || 0.0
            }}</span
          >
        </div>
        <div style="display: flex">
          <div style="color: #b9b9b9; width: 70%">
            <span class="namesd" style="width: 153px">实际应纳税金额:</span>
            <span style="color: black">{{ nums || 0 }}</span>
            <el-tooltip
              content="应纳增值税金额+附加税金额+印花税金额+企业所得税金额+其他税金额"
              placement="top"
            >
              <i
                class="el-icon-question"
                style="font-size: 18px; margin-left: 5px"
              ></i>
            </el-tooltip>
          </div>
          <div style="color: #b9b9b9; width: 40%">
            <span class="namesd" style="width: 80px">综合税率%:</span>
            <span style="color: black">{{ nums1 || 0 }}</span>
            <el-tooltip
              content="实际应纳税金额/(收入合同金额(含税)-销项税金额)"
              placement="top"
            >
              <i
                class="el-icon-question"
                style="font-size: 18px; margin-left: 5px"
              ></i>
            </el-tooltip>
          </div>
        </div>
        <div style="display: flex">
          <div style="color: #b9b9b9">
            <span class="namesd" style="width: 90px">测算时间: </span
            ><span style="color: black"> {{ times }}</span>
          </div>
          <div style="color: #b9b9b9">
            <span class="namesd" style="width: 100px"> 测算人: </span
            ><span style="color: black"> {{ namesd }}</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveS">保 存</el-button>
        <el-button @click="addFormVisible2 = false">退 出</el-button>
      </span>
    </el-dialog>

    <el-dialog title="进项预算清单" :visible.sync="dialogVisible">
      <div style="display: flex">
        <div class="feiy">
          <div :style="{ height: lengS1 * 49 + 'px' }" class="zhij">
            <div style="padding-top: 100px">直</div>
            <div>接</div>
            <div>费</div>
          </div>
          <div
            :style="{ height: lengS2 * 49 + 'px' }"
            style="boder-top: none"
            class="zhij"
          >
            <div style="padding-top: 50px">间</div>
            <div>接</div>
            <div>费</div>
          </div>
        </div>
        <el-table
          :data="tableData"
          border
          :row-class-name="tableRowClassName"
          :cell-style="tableRowClass"
          @cell-click="viewDia"
          style="width: 100%"
        >
          <el-table-column prop="name" label="分项名称" width="220">
          </el-table-column>
          <el-table-column
            prop="money"
            align="right"
            label="预算金额"
            width="220"
          >
          </el-table-column>

          <el-table-column
            prop="shui_lv"
            align="right"
            label="进项综合税率"
            width="220"
          >
            <template slot="header" slot-scope="scope">
              <!-- <el-tooltip placement="top">
                <div slot="content">来源于:付款登记的付款金额</div> -->
              <div>进项综合税率</div>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>

          <el-table-column
            prop="shui_money"
            align="right"
            label="进项税额"
            width="200"
          >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 穿透 -->
    <el-dialog title="数据来源" width="80%" :visible.sync="viewVisible">
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
import draggable from 'vuedraggable';
import commonTable from '@/components/commonTable.vue';
import pierceTable from '@/components/Piercethrough/pierceTable.vue';

export default {
  name: 'financeAccountInfo',
  components: { draggable, commonTable, pierceTable },
  data() {
    return {
      tableloading: false,
      dialogVisible: false,
      pierceTableid: +new Date(),
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      addUserForms: {
        xslv: '',
        xzlv: '',
        jslv: '',
        jsle: '0.00',
        jylv: '',
        jyle: '0.00',
        dfjylv: '',
        dfjyle: '0.00',
        yhlv: '',
        yhle: '0.00',
        sdlv: '',
        sdle: '0.00',
      },
      nums: '0.00',
      nums1: '0.00',
      times: '',
      namesd: '',
      addUserForm: {},
      formInline: {
        accountid: '',
      },
      natureProject1: [],
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 1,
      accountList: [],
      accountNumList: [],
      addFormVisible: false,
      addFormVisible2: false,
      tableData: [],
      project_name: '',
      lengS1: 0,
      lengS2: 0,
    };
  },
  methods: {
    tableRowClass({ row, column, rowIndex, columnIndex }) {
      let newArr = ['name', '', '', '', ''];
      if (newArr.includes(column.property)) {
        return 'color:#409EFF;padding:6px 0;cursor:pointer';
      } else {
        return 'color:#5f5f5f;padding:6px 0';
      }
    },
    viewDia1(row, column, cell, event) {
      //  console.log(row, column, cell, event)
      console.log(column.property);
      this.pierceTableid = +new Date();
      this.titleData = '数据来源';
      if (column.property == 'revenue_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'收入合同金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'xiaox_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'销项税金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'yu_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'预算支出金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'jinx_money') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'进项税金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'additional_tax') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'附加税:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'printing_tax') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'印花税:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'enterprise_tax') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'企业所得税:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'other_tax') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'其他税金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'sj_pay_taxes') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'实际应纳税金额:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      } else if (column.property == 'zong_lv') {
        this.taPLoading = true;
        this.viewVisible = true;
        this.proName = `${'项目名称:' + row.name}`;
        this.totalMoney = `${'综合税率:' + event.target.innerText}`;
        this.getpierceList1('1', row, column);
      }
    },
    getpierceList1(project_name, row, column) {
      console.log(row, 'rowrowrow');
      this.$axios
        .post('/newtao/taxPlanBaoPierce', {
          project_name: row.name,
          biao_shi: column.property,
        })
        .then(res => {
          let onenewArr = [
            'additional_tax',
            'printing_tax',
            'enterprise_tax',
            'other_tax',
            'sj_pay_taxes',
            'zong_lv',
          ];
          let twonewArr = ['revenue_money', 'xiaox_money'];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (column.property == 'revenue_money') {
            this.tableList = [res.data.revenue_contract, res.data.revenue_visa];
          } else if (column.property == 'xiaox_money') {
            this.tableList = [res.data.revenue_contract, res.data.revenue_visa];
          } else if (column.property == 'yu_money') {
            this.tableList = [res.data.jian_cost, res.data.zhi_cost];
          } else if (column.property == 'jinx_money') {
            this.tableList = [res.data.jian_mx, res.data.zhi_mx];
          } else if (column.property == 'additional_tax') {
            this.tableList = [res.data.jian_mx, res.data.zhi_mx];
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    viewDia(row, column, cell, event) {
      console.log(row, column, cell, event);
      console.log('123');
      this.taPLoading = true;
      this.pierceTableid = +new Date();

      if (column.property == 'name') {
        //收票金额
        this.titleData = '数据来源';

        this.proName = `${'分项名称:' + row.name}`;
        this.totalMoney = `${'预算金额:' + row.money}`;
        this.getpierceList('1', row, column);
      } else if (column.property == 'zfkmoney') {
        //付款金额
        this.titleData = '数据来源';
        this.proName = `${'收款单位:' + row.collection_unit}`;
        this.totalMoney = `${'付款金额:' + event.target.innerText}`;
        this.getpierceList('2', row, column);
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    getpierceList(project_name, row, column) {
      console.log(row, 'rowrowrow');
      this.$axios
        .post('/newtao/inputBudgetListPierce', {
          project_name: this.project_name,
          biao_shi: row.biao_shi,
        })
        .then(res => {
          let onenewArr = ['name'];
          let twonewArr = ['zfkmoney'];
          if (onenewArr.includes(column.property)) {
            this.tableList = [res.data.data];
          } else if (twonewArr.includes(column.property)) {
            this.tableList = [
              res.data.data.issued_class_wages,
              res.data.data.lease_contract,
              res.data.data.lease_settlement,
              res.data.data.machinery_fee_register,
              res.data.data.material_payment,
              res.data.data.service_payment_application,
              res.data.data.sub_payment_application,
            ];
            console.log('123456', this.tableList);
          }
        });

      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },
    yusQd(row) {
      this.dialogVisible = true;
      this.project_name = row.name;
      //  this.tableData.push({
      //    name:"直接费",
      //    money:'',
      //    shui_lv:'',
      //    shui_money:''
      //  })
      let arr1 = [];
      let arr2 = [];
      console.log(row);
      this.$axios
        .post('/projectone/inputBudgetList', { project_name: row.name })
        .then(res => {
          if (res.data.code == 1) {
            // this.tableData1 = res.data.data;
            // arr1.push({
            //     name:"直接费",
            //     money:'',
            //     shui_lv:'',
            //     shui_money:''
            //   })
            res.data.data_zhi.forEach(e => {
              arr1.push(e);
            });

            // arr2.push({
            //   name:"间接费",
            //   money:'',
            //   shui_lv:'',
            //   shui_money:''
            // })

            res.data.data_jian.forEach(e => {
              arr2.push(e);
            });
          }
          this.lengS1 = arr1.length + 1;
          this.lengS2 = arr2.length;
          this.tableData = [...arr1, ...arr2];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //保存
    saveS() {
      console.log(this.addUserForm);
      this.$axios
        .post('/projectone/getTaxCalculateData', {
          project_id: this.addUserForm.id,
          project_name: this.addUserForm.name,
          additional_tax:
            Number(this.addUserForms.jsle) +
            Number(this.addUserForms.jyle) +
            Number(this.addUserForms.dfjyle),
          printing_tax: this.addUserForms.yhle,
          enterprise_tax: this.addUserForms.sdle,
          other_tax: this.addUserForm.other_tax,
          sj_pay_taxes: this.nums,
          zong_lv: this.nums1,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.addFormVisible2 = false;
            this.addFormVisible = false;
            this.getList();
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
    changNumber(row) {
      return row.indexOf('.') == '-1'
        ? Number(row)
        : Number(this.CurrencyFomatNumber(row, 1));
    },
    deleLe(row) {
      return Number(row.split('%')[0]) / 100;
    },
    computes() {
      let jsle =
        this.changNumber(this.addUserForm.zeng_money) *
        this.deleLe(this.addUserForms.jslv);
      this.addUserForms.jsle = jsle;
      let jyle =
        this.changNumber(this.addUserForm.zeng_money) *
        this.deleLe(this.addUserForms.jylv);
      this.addUserForms.jyle = jyle;
      let dfjyle =
        this.changNumber(this.addUserForm.zeng_money) *
        this.deleLe(this.addUserForms.dfjylv);
      this.addUserForms.dfjyle = dfjyle;
      this.fujia();
    },
    compute(row) {
      this.fujia();
      if (row == '1') {
        let jsle =
          this.changNumber(this.addUserForm.zeng_money) *
          this.deleLe(this.addUserForms.jslv);
        this.addUserForms.jsle = jsle.toFixed(2);
      } else if (row == '2') {
        let jyle =
          this.changNumber(this.addUserForm.zeng_money) *
          this.deleLe(this.addUserForms.jylv);
        this.addUserForms.jyle = jyle.toFixed(2);
      } else if (row == '3') {
        let dfjyle =
          this.changNumber(this.addUserForm.zeng_money) *
          this.deleLe(this.addUserForms.dfjylv);
        this.addUserForms.dfjyle = dfjyle.toFixed(2);
      } else if (row == '4') {
        let yhle =
          this.changNumber(this.addUserForm.revenue_money) *
          this.deleLe(this.addUserForms.yhlv);
        console.log(
          this.deleLe(this.addUserForms.yhlv),
          yhle,
          'yhleyhleyhleyhle',
          this.changNumber(this.addUserForm.revenue_money),
        );
        this.addUserForms.yhle = yhle.toFixed(2);
      } else if (row == '5') {
        let num =
          this.changNumber(this.addUserForm.revenue_money) -
          this.changNumber(this.addUserForm.xiaox_money);
        let sdle = num * this.deleLe(this.addUserForms.sdlv);
        this.addUserForms.sdle = sdle.toFixed(2);
      }
      this.fujia();
    },
    fujia() {
      let num =
        Number(this.addUserForms.jsle) +
        Number(this.addUserForms.jyle) +
        Number(this.addUserForms.dfjyle);
      this.addUserForm.additional_tax = num.toFixed(2);
      // console.log(num, 'this.addUserForms.additional_tax');
    },
    editInfo() {
      this.addFormVisible2 = true;
      this.nums =
        Number(this.CurrencyFomatNumber(this.addUserForm.zeng_money, 2)) +
        Number(this.CurrencyFomatNumber(this.addUserForm.additional_tax, 2)) +
        Number(this.addUserForms.yhle) +
        Number(this.addUserForms.sdle) +
        Number(this.CurrencyFomatNumber(this.addUserForm.other_tax, 2));

      console.log(
        Number(this.CurrencyFomatNumber(this.addUserForm.zeng_money, 2)),
        'num1',
      );
      console.log(
        Number(this.CurrencyFomatNumber(this.addUserForm.additional_tax, 2)),
        'num2',
      );
      console.log(Number(this.addUserForms.yhle), 'num3');
      console.log(Number(this.addUserForms.sdle), 'num4');
      console.log(
        Number(this.CurrencyFomatNumber(this.addUserForm.other_tax, 2)),
        'num5',
      );

      let number =
        Number(this.CurrencyFomatNumber(this.addUserForm.revenue_money, 0)) -
        (Number(this.CurrencyFomatNumber(this.addUserForm.xiaox_money, 0)) ||
          0);
      console.log(
        this.addUserForm.revenue_money,
        'this.addUserForm.revenue_money',
        this.addUserForm.xiaox_money,
      );
      this.nums1 = (this.nums / number).toFixed(2);
      var time = new Date();
      this.times = time.toLocaleString();
      this.namesd = this.$store.state.userInfo.uname;
      console.log(this.nums, 'NumberNumber', number);
    },
    CurrencyFomatNumber(number, n) {
      if (number != null && number != '' && number != undefined) {
        number = number.replace(/,/g, ''); //去除千分位的','
        if (isNaN(number)) {
          //判断是否是数字
          number = '0';
        } else {
          number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //n幂
          number = number.toString();
        }
      } else {
        number = '0';
      }
      //a.indexOf(x,y);返回x值在a字符串值中从y位置开始检索首次出现的位置
      var numLength = number.indexOf('.');
      //判断传递的值是整数增加小数点再补"0"
      if (numLength < 0) {
        numLength = number.length;
        number += '.';
      }
      //不足n位小数的，循环补"0"
      while (number.length <= numLength + n) {
        number += '0';
      }
      return number;
    },
    searList() {
      this.$axios.post('/spread/projectNature').then(res => {
        this.natureProject1 = res.data.data;
      });
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    getAccNumber() {
      this.$axios
        .post('/task/accountlinkage', {
          id: this.formInline.accountid,
          type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.accountNumList = res.data.content;
            this.formInline.accountnumber =
              this.accountNumList[0].accountnumber;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    accChange(val) {
      if (val) {
        this.formInline.accountname = this.accountList.find(
          item => item.id == val,
        ).accountname;
      } else {
        this.formInline.accountname = '';
      }
      this.getAccNumber();
    },
    resetClick() {
      this.formInline = {
        accountname: '',
        accountnumber: '',
        status: '',
        startTime: '',
        endTime: '',
        accountid: '',
        send_name: '',
        send_userid: '',
        namesa: '请选择申请人',
        lian_ying: '',
      };
      this.getList();
    },
    getMult(val) {
      this.multSelectData = val;
    },
    handleCheckedListChange(value) {
      this.myArray.forEach(element => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map(item => item.value);
      this.myArray.forEach(item => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },

    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },

    sendTitleList() {
      this.$axios
        .post('/spread/editFiledCurrency', {
          name: 'zhukuai_finance_accountnews',
          mould_data: JSON.stringify(this.myArray),
        })
        .then(res => {
          if (res.data.code == 1) {
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
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/finance/accountnews')
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
    updateList() {
      this.getList(1);
    },
    //税务测算
    calculations(row) {
      console.log(row);
      this.addFormVisible = true;
      this.addUserForm = row;
    },
    //获取列表
    getList(ntype) {
      this.tableloading = true;
      this.$axios
        .post('/projectone/taxPlanBao', {
          page: this.currentPage,
          number: this.pagesize,
          name: this.formInline.accountid,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: '列表刷新成功',
                type: 'success',
                duration: 1500,
              });
            }
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.titleList = res.data.mould_data;
            this.footerNumList = [];
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data;
              this.titleList.map(item => {
                this.newFooter.forEach(element => {
                  if (element.value == item.value) {
                    this.footerNumList.push(element);
                  }
                });
              });
            }
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.content.page;
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
              .post('/finance/accountnewsdel', {
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
        .post('/finance/reduction', { type: 3 })
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
          .post('/projectone/taxPlanBaoDownload', {
            list: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              console.log(res.data.data.name, res.data.data.path);
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
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
    createType() {
      this.$axios
        .post('/project/supplierTypeCreate')
        .then(res => {
          if (res.data.code == 1) {
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
  },
  mounted() {
    this.createType();
    this.$utils.checkding();
    this.getList();
    this.$utils.commonAllPro().then(res => {
      this.accountList = res;
      //   console.log('9999', res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
    });
  },
  created() {
    this.searList();
    this.projectType = JSON.parse(this.$store.state.pType);
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
<style  lang='less'>
.feiy {
  width: 50px;
  .zhij {
    text-align: center;
    border: 1px solid #ebeef5;
  }
}
.namesd {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 10px;
}
.el-form-item__content {
  width: 0 !important;
}
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
}
.dBasicInfo {
  display: flex;
  flex-wrap: wrap;
  .dRemarkList {
    width: 100%;
  }
  .el-form-item__content {
    width: 100% !important;
  }
}
</style>
