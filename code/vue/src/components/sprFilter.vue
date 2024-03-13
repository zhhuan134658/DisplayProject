<template>
  <div id="sprFilter">
    <div class="">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        label-width="85px"
        class="demo-form-inline"
      >
        <div class="" >
          <el-form-item label="申请人" >
            <!-- <el-input
              v-model="formInline.name"
              clearable
              @focus="inputs"
              placeholder="请选择申请人"
            ></el-input> -->
            <div class="names" @click="inputs">
              {{ formInline.name1 }}
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';

export default {
  name: 'sprFilter',
  data() {
    return {
      formInline: {
        send_name: '',
        send_userid: '',
        name1: '请选择申请人',
      },
      send_name: '',
      send_userid: '',
    };
  },
  methods: {
    resetClick1() {
      this.formInline.name1 = '请选择申请人';
      this.formInline.send_name = '';
      this.formInline.send_userid = '';
      console.log('父调子', '-*-*-**-', this.formInline);
    },
    inputs() {
      this.addManyP();
    },
    addManyP() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 1, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: that.agentid, //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // });
            console.log(result.users[0], '**---**--*-');
            // that.addRoleUser(result.users);
            that.formInline.name1 = result.users[0].name;
            that.send_name = result.users[0].name;
            that.send_userid = result.users[0].emplId;
            that.$emit('func', {
              send_name: that.send_name,
              send_userid: that.send_userid,
            });
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
  },
};
</script>

<style scoped lang="less">
// .hlBottom {
//   width: 100% !important;
// .el-select,
// .el-input .el-input__inner {
  // width: 280px;
// }
// }
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
  width: 190px;
}
#sprFilter {
  width: 300px !important;
  //   float: left;
  display: inline-block;
  margin-left: 15px;
}
</style>
