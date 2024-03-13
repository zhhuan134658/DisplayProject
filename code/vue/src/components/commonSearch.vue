<template>
  <div class="header">
    <div class="headerContent">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        ref="formInline"
        label-width="100px"
        class="demo-form-inline"
      >
        <div class="hlBottom">
          <div class="items">
            <el-form-item
              v-for="(item, index) in formcommonList"
              :label="item.labelName"
              :prop="item.labelData"
              :key="index"
              style="width: 290px"
            >
              <el-select
                v-if="item.labelName === '项目名称'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择项目"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in allProjectList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                v-else-if="item.labelName === '投标项目名称'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择项目"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in touProject1"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName === ' 投标项目名称'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择项目"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in touProject2"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName === '状态'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择"
                @keyup.enter.native="zsearchClick"
              >
                <el-option label="已付款" value="已付款"></el-option>
                <el-option label="未付款" value="未付款"></el-option>
                <el-option label="已退款" value="已退款"></el-option>
                <el-option label="未退款" value="未退款"></el-option>
              </el-select>
              <el-select
                v-else-if="item.labelName === '付款状态'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择付款状态"
                @keyup.enter.native="zsearchClick"
              >
                <el-option label="未付款" value="1"></el-option>
                <el-option label="已付款" value="2"></el-option>
              </el-select>
              <el-date-picker
                v-else-if="item.labelName === '开始时间'"
                :picker-options="pickerStart"
                v-model="formInline[item.labelData]"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>

              <el-date-picker
                v-else-if="item.labelName === '结束时间'"
                v-model="formInline[item.labelData]"
                :picker-options="pickerEnd"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>

              <el-select
                v-else-if="item.labelName === '审批状态'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择审批状态"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in approvalStatus"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName == ' 收款状态'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择收款状态"
                @keyup.enter.native="zsearchClick"
              >
                <el-option label="未收款" value="1"></el-option>
                <el-option label="部分收款" value="2"></el-option
                ><el-option label="已收款" value="3"></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName == ' 付款状态'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择付款状态"
                @keyup.enter.native="zsearchClick"
              >
                <el-option label="未付款" value="1"></el-option>
                <el-option label="部分付款" value="2"></el-option
                ><el-option label="已付款" value="3"></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName === ' 项目性质'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择项目性质"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in natureProject1"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName === '项目性质'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择项目性质"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in natureProject"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName === '账户名称'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in accountList"
                  :key="index"
                  :label="item.accountname"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select
                v-else-if="item.labelName === '物资名称'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择物资"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in allmaterial_name"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <!-- //空格为识别特殊项 不删除 -->
              <el-select
                v-else-if="item.labelName === ' 项目类型'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in touProjectType"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <el-select
                v-else-if="item.labelName === '项目类型'"
                v-model="formInline[item.labelData]"
                clearable
                filterable
                placeholder="请选择"
                @keyup.enter.native="zsearchClick"
              >
                <el-option
                  v-for="(item, index) in touProjectTypeS"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-input
                v-else
                v-model="formInline[item.labelData]"
                clearable
                placeholder="请输入"
                @keyup.enter.native="zsearchClick"
              ></el-input>
            </el-form-item>
            <sprFilter
              @func="getMsgFormSon"
              v-if="isShen"
              ref="sprFilter"
            ></sprFilter>
          </div>
          <div style="text-align: center">
            <el-button
              type="primary"
              size="medium"
              @click="zsearchClick('formInline')"
              style="margin-right: 10px"
              >搜索</el-button
            >
            <el-button plain size="medium" @click="resetClick('formInline')"
              >重置</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import sprFilter from '@/components/sprFilter.vue';

export default {
  name: 'commonSearch',
  components: { sprFilter },
  props: {
    formcommonList: Array,
    formInline: Object,
    searchClick: {
      type: Function,
      default: null,
    },
    getList: {
      type: Function,
      default: null,
    },
    isShen: {
      type: Boolean,
      default: null,
    },
  },

  data: props => {
    return {
      touProject1: [],
      touProject2: [],
      touProjectType: [],
      touProjectTypeS: [],
      natureProject: [],
      natureProject1: [],
      allProjectList: [],
      approvalStatus: [],
      allmaterial_name: [],
      accountList: [],
      printable: props.hasPrint,
    };
  },
  methods: {
    //审批人选择
    getMsgFormSon(row) {
      this.formInline.send_name = row.send_name;
      this.formInline.send_userid = row.send_userid;
    },
    //   搜索
    zsearchClick() {
      //   console.log('search click');
      this.$emit('searchClick');
    },
    // 重置
    resetClick(formName) {
      //   console.log(formName);
      if (this.isShen) {
        this.formInline.name = '请选择申请人';
        this.formInline.send_name = '';
        this.formInline.send_userid = '';
        this.$refs['sprFilter'].resetClick1();
      }
      this.$refs[formName].resetFields();
      this.$nextTick(() => {
        this.$emit('getList');
      });
    },
    // 判断是否需要物资下拉列表
    searchPost(row) {
      var isShow = false;
      this.formcommonList.forEach(e => {
        if (e.labelName == row) {
          isShow = true;
        }
      });
      if (isShow) {
        if (row === '物资名称') {
          this.$utils.getmaterialList().then(res => {
            this.allmaterial_name = res;
          });
        } else if (row === '项目名称') {
          this.$utils.commonAllPro().then(res => {
            this.allProjectList = res;
            //   console.log('9999', res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
          });
        } else if (row === '账户名称') {
          this.$utils.commonAllaccount().then(res => {
            this.accountList = res;
            //   console.log('9999', res); //res为公共接口返回的数据;返回的数据为utils.js中return的数据
          });
        } else if (row === ' 项目类型') {
          this.$utils.commonAlltouProjectType().then(res => {
            //   console.log(res);
            this.touProjectType = res;
          });
        } else if (row === ' 项目性质') {
          this.$utils.commonAllProjece1().then(res => {
            this.natureProject1 = res;
          });
        } else if (row === '项目性质') {
          this.$utils.commonAllProjece().then(res => {
            this.natureProject = res;
          });
        } else if (row === '投标项目名称') {
          this.$utils.commontouProjectType().then(res => {
            //   console.log(res);
            this.touProject1 = res;
          });
        } else if (row === ' 投标项目名称') {
          this.$utils.commontouProjectType1().then(res => {
            //   console.log(res);
            this.touProject2 = res;
          });
        } else if (row === '审批状态') {
          this.approvalStatus = this.$utils.utilApprovalStatus();
        } else if (row === '项目类型') {
          this.touProjectTypeS = JSON.parse(this.$store.state.pType);
        }
      }
    },
  },
  mounted() {
    this.searchPost('物资名称');
    this.searchPost('项目名称');
    this.searchPost('账户名称');
    this.searchPost(' 项目类型');
    this.searchPost(' 项目性质');
    this.searchPost('项目性质');
    this.searchPost('投标项目名称');
    this.searchPost(' 投标项目名称');
    this.searchPost('审批状态');
    this.searchPost('项目类型');
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
            return time.getTime() < new Date(beginDateVal).getTime() - 8.64e7;
          }
        },
      };
    },
  },
};
</script>

<style lang="less">
.items {
  // display: flex;
  //    flex-wrap: wrap;
}
.el-form--inline .el-form-item {
  // width: 30% !important;
}
</style>
