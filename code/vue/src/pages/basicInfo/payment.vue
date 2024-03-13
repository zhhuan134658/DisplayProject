<template>
  <div id="materialBasic">
    <div class="main">
      <div class="war_content_a">
        <div class="war_title" style="width: 71px">结算转付款</div>
        <div class="war_content">
          <div class="waring_left">
            <div class="telelist">
              <div class="alltype1">全部分类</div>
              <div
                v-for="(item, index) in rTeleList"
                :key="index"
                class="telelist_item1"
                :style="defdeinx == index ? 'color:#0089ff' : ''"
                @click="rightClick(item, index)"
              >
                <el-tooltip :content="item.name" placement="top">
                  <span> {{ item.name }}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="waring_right">
            <el-table
              :border="true"
              :data="tableData"
              style="width: 100%; border: 1px solid #ebeef5"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              size="mini"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="remarks" label="描述" align="left">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="left">
                <template slot-scope="scope">
                  <el-switch
                    disabled
                    v-model="scope.row.status"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.row)"
                    type="text"
                    size="small"
                  >
                    编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 50, 100, 150, 200]"
                :page-size="pagesize"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="结算转付款设置"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="editCancel('AddUserForm')"
      class="phDialog liuDialog"
    >
      <el-form
        @submit.native.prevent
        :model="waringForm"
        label-position="right"
        :rules="aufRules"
        ref="AddUserForm"
        label-width="126px"
        style="padding-right: 10px"
      >
        <div
          style="
            background: #f0f0f0;
            width: 105%;
            margin-left: -20px;
            height: 1px;
            margin-bottom: 20px;
          "
        ></div>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="waringForm.status"
            @change="change1"
            active-value="1"
            inactive-value="0"
          ></el-switch>
          <!-- <el-tooltip
            content="超出预警比例，将在工作通知中向预警接收人推送预警消息"
            placement="top"
          >
            <i
              class="el-icon-question"
              style="font-size: 18px; margin-left: 5px"
            ></i>
          </el-tooltip> -->
        </el-form-item>

        <el-form-item label="日期:" prop="riqi" class="dRemarkList">
          <!-- :picker-options="pickerStart" -->
          <el-date-picker
            v-model="waringForm.riqi"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div
        style="
          background: #f0f0f0;
          width: 105%;
          margin-left: -20px;
          height: 1px;
          margin-bottom: 10px;
        "
      ></div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="editCancel('AddUserForm')"
          >取 消</el-button
        >
        <el-button
          size="medium"
          type="primary"
          :loading="loading"
          @click="editInfo('AddUserForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="全部人员"
      :append-to-body="true"
      :visible.sync="ccAllPeopleVisible"
      class="contractOpenPeopleDialog"
      :close-on-click-modal="false"
    >
      <div style="margin-bottom: 10px">共有{{ cctagsData.length }}人</div>
      <div class="showAllPeople">
        <div class="addMList" v-for="(item, index) in cctagsData" :key="index">
          <div class="mdnList">
            <div class="mdren">
              <img v-if="item.avatar" :src="item.avatar" alt />
              <span class="touxiang" v-else>{{
                item.name.length <= 2
                  ? item.name
                  : item.name.substr(item.name.length - 2, 2)
              }}</span>
            </div>
            <p>{{ item.name }}</p>
            <i class="el-icon-error" @click="handleClose(item, index)"></i>
          </div>
          <div class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="addMList addMListLast">
          <div class="mdnList">
            <div class="mdren" @click="addManyPnew(1)">
              <span class="touxiang">
                <i class="el-icon-plus"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import eupload from '../../components/excelUpload.vue';
import { regionData, CodeToText } from 'element-china-area-data';
// const echarts = require("echarts");
export default {
  name: 'materialBasic',
  components: { eupload },
  data() {
    return {
      disabled1: 1,
      disabled2: 1,
      aufRules: {
        riqi: [
          {
            required: true,
            message: '请选择日期',
            trigger: ['blur', 'change'],
          },
        ],
      },
      ccAllPeopleVisible: false,
      cctagsData: [],
      types: '1',
      value1: false,
      switch1: false,
      switch2: false,
      rIsshow: true,
      qIsshow: true,
      currentPage: 1,
      total: 0,
      pagesize: 10,

      loading: false,
      waringForm: {
        id: '',
        riqi: '',
        status: '',
        riqis: '',
      },
      status: '',
      dialogFormVisible: false,
      defdeinx: '0',
      deftype: 1,
      rTeleList: [],
      tableData: [],
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
      return 'color:#5f5f5f;border-color:#F1F8FF;';
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.emplId) && res.set(arr.emplId, 1));
    },
    change1(val) {
      console.log(val);
      //   if(val){
      this.status = val;

      console.log(this.status, 'this.waringForm.status');

      //   }else{
      //       this.waringForm.status = '0';
      //   }
    },
    openAllPeople() {
      this.ccAllPeopleVisible = true;
    },
    handleClose(item, index) {
      this.cctagsData.splice(this.cctagsData.indexOf(item), 1);

      // if (this.cctagsData.lenth > 0) {
      //     this.waringForm.yj_person = this.cctagsData;
      // } else {
      //     this.waringForm.yj_person = [];
      // }
      console.log('132456', JSON.stringify(this.cctagsData));
    },
    addManyPnew() {
      const that = this;

      // that.pickerVisible = true;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 100, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            const newarr = that.cctagsData;
            that.cctagsData = that.unique(newarr.concat(result.users));
            console.log(that.cctagsData);
            // that.waringForm.yj_person = that.cctagsData;
          },
          onFail: function (err) {
            console.log(err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList(this.deftype);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(this.deftype);
    },
    rightClick(item, index) {
      console.log(item);
      this.defdeinx = index;
      this.deftype = item.type;
      this.getList(item.type);
    },
    editCancel(formName) {
      this.dialogFormVisible = false;
    },
    editRow(data) {
      console.log(data, 'data');
      if (this.$refs.AddUserForm !== undefined) {
        this.$refs.AddUserForm.resetFields();
      }
      this.$nextTick(() => {
        // 注意看这里
        this.waringForm.id = data.id;
        this.waringForm.status = data.status;
        this.waringForm.riqi = data.extend_first;
        this.status = data.status;
        this.dialogFormVisible = true;
      });
    },
    editInfo(formName) {
      const _this = this;
      //   console.log(_this.cctagsData);
      //   if (_this.waringForm.status_s == true) {
      //     _this.waringForm.status = 1;
      //   } else {
      //     _this.waringForm.status = 2;
      //   }
      //   if (_this.waringForm.qyj_status_s == true) {
      //     _this.waringForm.qyj_status = 1;
      //   } else {
      //     _this.waringForm.qyj_status = 2;
      //   }
      //   _this.waringForm.yj_person = _this.cctagsData;
      //   if (
      //     _this.waringForm.status_s == false &&
      //     _this.waringForm.qyj_status_s == false
      //   ) {
      //     _this.waringForm.qyj_status = '2';
      //     _this.waringForm.status = '2';
      //   }
      console.log(_this.status, '_this.waringForm');
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.types == '1' || _this.types == '2') {
            _this.$axios
              .post('/order/settlemenTopayment', {
                id: _this.waringForm.id,
                riqi: _this.waringForm.riqi,
                status: _this.status,
              })
              .then(res => {
                if (res.data.code == 1) {
                  _this.loading = false;
                  _this.dialogFormVisible = false;

                  _this.getList(_this.deftype);
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
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
                _this.loading = false;
                console.log(error);
              });
          }
        }
      });
    },

    getList(type) {
      this.$axios
        .post('/order/settlemenTopaymentShow', {
          page: this.currentPage,
          type: type,
          number: this.pagesize,
        })
        .then(res => {
          this.total = res.data.count;
          this.tableData = res.data.data;

          if (this.total > 0 && this.tableData.length < 1) {
            this.currentPage = res.data.page_number;
            this.getList(type);
          }
        })
        .catch(function (error) {});
    },
    // 预警类型
    gettypeList() {
      this.$axios
        .post('/order/settlemenTopaymentType')
        .then(res => {
          this.rTeleList = res.data.data;
        })
        .catch(function (error) {});
    },
  },
  mounted() {},
  created() {
    this.gettypeList();
    this.getList(1);
  },
  computed: {
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.waringForm.riqi;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
  },
};
</script>
<style lang="less">
.newform {
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
}
</style>

<style lang="less" scoped>
.main {
  .war_content_a {
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    .page {
      padding-top: 20px;
      display: flex;
      flex-direction: row-reverse;
    }
  }

  .telelist_item1 {
    height: 55px !important;
    text-align: left !important;
    padding: 0px 20px;
    line-height: 55px !important;
    overflow: hidden;
    border-top: 1px solid #f5f6f8;
  }
  .alltype1 {
    height: 48px !important;
    line-height: 48px !important;
    text-align: left !important;
    padding: 0px 20px;
    overflow: hidden;
  }
}
</style>

<style lang="less">
.liuDialog {
  .el-dialog {
    .el-dialog__body {
      padding-bottom: 0px;
    }
  }
}
</style>
