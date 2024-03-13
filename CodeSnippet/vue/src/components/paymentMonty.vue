<template>
  <div id="paymentMonty">
    <el-dialog
      :title="typeS == '1' ? '付款' : '收款'"
      :visible.sync="payVisible"
      :close-on-click-modal="false"
      @close="payCancel"
      width="600px"
      class="view_change_title"
    >
      <el-form
        @submit.native.prevent
        :model="payformInline"
        class="demo-form-inline"
        :rules="rules"
        ref="ruleForm"
      >
        <div class="hlBottom">
          <el-form-item
            label="付款账户:"
            prop="accountname"
            v-if="typeS == '1'"
          >
            <el-select
              v-model="payformInline.accountname"
              clearable
              filterable
              placeholder="请选择"
              clear="fukuan"
              style="position: relative; left: -140px"
            >
              <el-option
                v-for="(item, index) in allaccList"
                :key="index"
                :value="`${item.accountname}/${item.accountnumber}/${item.bankofdeposit}`"
                :label="`${item.accountname}/${item.accountnumber}/${item.bankofdeposit}`"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="收款账户:" prop="accountname" v-else>
            <el-select
              v-model="payformInline.accountname"
              clearable
              filterable
              clear="fukuan"
              placeholder="请选择"
              style="position: relative; left: -140px"
            >
              <el-option
                v-for="(item, index) in allaccList"
                :key="index"
                :value="`${item.accountname}/${item.accountnumber}/${item.bankofdeposit}`"
                :label="`${item.accountname}/${item.accountnumber}/${item.bankofdeposit}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="isAdmin">
            <el-form-item
              label="付款金额:"
              v-if="typeS == '1'"
              prop="paid_money"
            >
              <el-input
                v-model="payformInline.paid_money"
                clearable
                @input="changes"
                clear="fukuan"
                style="position: relative; left: -140px"
                maxlength="20"
                oninput="value=value.replace(/[^\d.]/g,'')"
                placeholder="请输入付款金额"
              ></el-input>
              <div
                style="
                  color: red;
                  font-size: 12px;
                  position: relative;
                  left: -90px;
                "
              >
                累计付款金额不能超出申请付款金额
              </div>
            </el-form-item>

            <el-form-item label="收款金额:" v-else prop="paid_money">
              <el-input
                v-model="payformInline.paid_money"
                clearable
                @input="changes"
                clear="fukuan"
                style="position: relative; left: -140px"
                maxlength="20"
                oninput="value=value.replace(/[^\d.]/g,'')"
                placeholder="请输入收款金额"
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item
            class="newtijiao"
            :label="typeS == '1' ? '付款日期:' : '收款日期:'"
            prop="fk_riqi"
          >
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="payformInline.fk_riqi"
              type="datetime"
              style="position: relative; left: -140px; width: 200px"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item class="newtijiao" label="上传凭证：">
            <div @click="addFilesClick(3)" style="color: skyblue; width: 146px">
              添加凭证
            </div>
            <div class="dingFilesClass" style="width: 500px">
              <div
                v-for="(item, index) in payformInline.extend_three"
                :key="index"
              >
                <div style="display: flex">
                  <div style="display: flex; width: 700px">
                    <div class="fileIcon">
                      <img
                        :src="imgData(item.fileName)"
                        mode=""
                        style="width: 50px; height: 50px; margin: 10px"
                      />
                    </div>
                    <div class="filesTitle">
                      <div class="yichu">
                        {{ item.fileName }}
                      </div>
                      <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      position: relative;
                      top: 30%;
                      right: 30%;
                    "
                  >
                    <div
                      class="watchBtn1"
                      @click="watchFiles(item)"
                      style="width: 55px"
                    >
                      预览
                    </div>
                    <div class="fileIcon2">
                      <i
                        class="el-icon-error"
                        @click="deleteFiles1(index, 3)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="payCancel('ruleForm')"
          >取 消</el-button
        >
        <el-button size="medium" type="primary" @click="payInfo('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :title="typeS == '1' ? '付款记录' : '收款记录'"
      :visible.sync="payVisible1"
      :close-on-click-modal="false"
      @close="payCancel1"
      class="view_change_title"
    >
      <el-table
        :border="true"
        :data="houseList"
        border
        height="547"
        style="width: 100%"
        ref="multipleTable"
        :row-class-name="tableRowClassName"
      >
        <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->
        <el-table-column
          prop="account"
          :label="typeS == '1' ? '付款账号' : '收款账户'"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="account" label="收款账户" align="left">
        </el-table-column>
        <el-table-column prop="money" label="付款金额" align="left">
        </el-table-column>
        <el-table-column prop="pay_voucher" label="付款凭证" align="left">
          <template slot-scope="scope">
            <el-button
              type="text"
              slot="reference"
              size="mini"
              v-if="scope.row.status == 1"
              @click="goNext(scope.row)"
              >点击查看</el-button
            >

            <el-button disabled type="text" slot="reference" v-else size="mini"
              >点击查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="username" label="付款人姓名" align="left">
        </el-table-column>

        <el-table-column prop="pay_voucher" label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              type="text"
              slot="reference"
              size="mini"
              v-if="scope.row.status == 1"
              @click="chexiao(scope.row)"
              >撤销付款</el-button
            >

            <el-button
              disabled
              type="text"
              slot="reference"
              v-else
              size="mini"
              @click="chexiao(scope.row)"
              >撤销付款</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="payCancel1">取 消</el-button>
        <el-button size="medium" type="primary" @click="payInfo"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="付款凭证详情"
      :visible.sync="viewDuFormVisible"
      width="600px"
      class="mileposttimeViewClass"
      :close-on-click-modal="false"
    >
      <div class="viewDMain">
        <el-timeline v-if="this.viewDList.length > 0">
          <el-timeline-item
            v-for="(item, index) in viewDList"
            :key="index"
            :timestamp="item.up_time"
            color="#177ae0"
            placement="top"
          >
            <el-card>
              <div class="dingFilesClass">
                <div>
                  <div>
                    <div class="fileIcon">
                      <i
                        class="iconfont icon-wenjian"
                        style="color: #fcb138"
                      ></i>
                    </div>
                    <div class="filesTitle">
                      <div>
                        {{ item.fileName }}
                      </div>
                      <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                    </div>
                  </div>
                  <div>
                    <div class="watchBtn" @click="watchFiles(item)">预览</div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div style="text-align: center" v-else>
          <img src="@/assets/project/noData.png" alt="" />
          <p>暂无进度记录</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';

export default {
  props: {
    types: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  name: 'paymentMonty',
  data() {
    return {
      payVisible: false,
      leix: '',
      payVisible1: false,
      viewDList: [],
      duName: '',
      cx_id: '',
      houseList: [],
      viewDuFormVisible: false,
      payformInline: {
        accountname: '',
        newaccountname: '',
        paid_money: '',
        extend_three: [],
        fk_riqi: '',
      },
      newitemdata: '',
      allaccList: [],
      typeS: '',
      rules: {
        accountname: [
          {
            required: true,
            message: '请选择账户',
            trigger: 'blur',
          },
        ],
        paid_money: [
          {
            required: true,
            message: '请输入金额',
            trigger: 'blur',
          },
        ],
        fk_riqi: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    getNowTime() {
      var date = new Date();
      //年 getFullYear()：四位数字返回年份
      var year = date.getFullYear(); //getFullYear()代替getYear()
      //月 getMonth()：0 ~ 11
      var month = date.getMonth() + 1;
      //日 getDate()：(1 ~ 31)
      var day = date.getDate();
      //时 getHours()：(0 ~ 23)
      var hour = date.getHours();
      //分 getMinutes()： (0 ~ 59)
      var minute = date.getMinutes();
      //秒 getSeconds()：(0 ~ 59)
      var second = date.getSeconds();

      var time =
        year +
        '-' +
        this.addZero(month) +
        '-' +
        this.addZero(day) +
        ' ' +
        this.addZero(hour) +
        ':' +
        this.addZero(minute) +
        ':' +
        this.addZero(second);
      return time;
    },
    addZero(s) {
      return s < 10 ? '0' + s : s;
    },
    goNext(item) {
      const _this = this;
      console.log(typeof item.pay_voucher, '类型');
      console.log(item.pay_voucher, '数据');
      //   _this.duName = item.name;
      _this.viewDList = item.pay_voucher;

      console.log(_this.viewDList);
      _this.viewDuFormVisible = true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status != 1) {
        return 'warning-row';
      }
      return '';
    },
    //   记录列表
    jiLuList(row) {
      this.$axios
        .post('//', {
          id: row.id,
          biao_name: this.types,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.cx_id = row.id;
            // this.total = res.data.count;
            this.houseList = res.data.data;
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

    deleteFiles1(index, type) {
      this.payformInline.extend_three.splice(index, 1);
    },
    //预览附件
    watchFiles(item) {
      this.$axios
        .post('//', {
          auth: 'download',
          fields: item.fileId,
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log(item);
            const _this = this;
            dd.ready(function () {
              dd.biz.cspace.preview({
                corpId: _this.cid,
                spaceId: item.spaceId,
                fileId: item.fileId,
                fileName: item.fileName,
                fileSize: item.fileSize,
                fileType: item.fileType,
                onSuccess: function () {
                  //无，直接在native显示文件详细信息
                },
                onFail: function (err) {
                  // 无，直接在native页面显示具体的错误
                },
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
 
    //添加文件
    addFilesClick(type) {
      const _this = this;
      _this.$axios
        .post('//', {
          type: 'add',
          fileids: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log(res.data);
            _this.$store.commit('setSpaceId', res.data.data.toString());
            _this.selectFiles(type);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectFiles(type) {
      const _this = this;
      dd.ready(function () {
        dd.biz.util.uploadAttachment({
          image: {
            multiple: true,
            compress: false,
            max: 9,
            spaceId: _this.$store.state.spaceId,
          },
          space: {
            corpId: _this.$store.state.cid,
            spaceId: _this.$store.state.spaceId,
            max: 9,
          },
          file: { spaceId: _this.$store.state.spaceId, max: 9 },
          types: ['photo', 'file', 'space'],
          onSuccess: function (result) {
            console.log(result);
            //onSuccess将在文件上传成功之后调用
            switch (type) {
              case 3:
                result.data.forEach(item => {
                  _this.payformInline.extend_three.push(item);
                });
                break;
            }
          },
          onFail: function (err) {
            console.log('err++' + err);
          },
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    getallaccList() {
      this.$axios
        .post('//', {
          current_page: 1,
          num: 9999,
          zstatus: 7,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.allaccList = res.data.content.list;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 撤销付款
    chexiao(val) {
      console.log(val.id);
      this.$confirm('此操作将永久撤销付款, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios
            .post('//', {
              id: this.cx_id,
              biao_name: this.types,
              username: this.$store.state.userInfo.uname,
              cx_id: val.id,
              paid_money: val.money,
            })
            .then(res => {
              if (res.data.code == 1) {
                //   this.getList();
                this.payVisible1 = false;
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
            message: '已取消',
          });
        });
    },
    // 待付款
    creation(val, type, leix) {
      console.log(val, type, 'typetypetypetype', !this.isAdmin);
      if (!this.isAdmin) {
        if (val.postid == '否') {
          this.payformInline.paid_money = val.bxmoney;
        } else {
          this.payformInline.paid_money = val.bond_money;
        }
      }
      this.newitemdata = val;

      console.log('creationcreation', leix);
      this.leix = leix;
      this.payformInline.fk_riqi = this.getNowTime();
      if (type == '2') {
        this.payVisible1 = true;
        this.jiLuList(val);
      } else if (type == '6') {
        this.payVisible = true;
        // var max = this.CurrencyFomatNumber(this.newitemdata.fkamount, 0);
        var max = Number(this.newitemdata.fkamount, 0);
        this.max = max - this.newitemdata.department;
        console.log(this.max);
        this.typeS = type;
        console.log(this.typeS, 'this.typeSthis.typeS');
      } else {
        this.payVisible = true;
        var max = Number(this.newitemdata.bond_money, 0);
        this.max = max - this.newitemdata.lj_money;
        console.log(this.max);
        this.typeS = type;
        // console.log(this.typeS, 'this.typeSthis.typeS');
      }
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
    payCancel(formName) {
      this.payVisible = false;
      this.payformInline.paid_money = '';
      this.payformInline.extend_three = [];
      this.payformInline.accountname = '';
      this.payformInline.fk_riqi = this.getNowTime();
      this.$refs[formName].resetFields();
    },
    payCancel1() {
      this.payVisible1 = false;
    },
    payInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let path =
            this.leix == 'true'
              ? '/finance/pay_pettycash'
              : '/newtao/payOperation';
          path =
            this.leix == 'trues'
              ? '/finance/pay_return'
              : '/newtao/payOperation';

          console.log(this.leix, 'this.leixthis.leix');
          this.$axios
            .post(path, {
              id: this.newitemdata.id,
              account: this.payformInline.accountname,
              biao_name: this.types,
              pay_voucher: this.payformInline.extend_three,
              username: this.$store.state.userInfo.uname,
              paid_money: this.payformInline.paid_money,
              fk_riqi: this.payformInline.fk_riqi,
            })
            .then(res => {
              if (res.data.code == 1) {
                this.payVisible = false;
                this.payformInline.accountname = '';
                // this.getList();
                this.$emit('getlist');
                this.$store.commit('setisGetList', true);
                this.$refs[formName].resetFields();
                console.log(this.$store.state.isGetList, 'isGetListisGetList');
                this.$forceUpdate();
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 1500,
                });
                console.log(res.data.msg, 'res');
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(this.payformInline, 'this.payformInline');
      //   if (!this.payformInline.accountname) {
      //     return this.$message({
      //       title: '提示',
      //       message: '请选择账户',
      //       type: 'error',
      //       duration: 1500,
      //     });
      //   }
    },
    changes(value) {
      console.log(this.typeS, 'this.typethis.typethis.type');
      if (this.typeS == '1' || this.typeS == '6') {
        if (value > this.max) {
          this.payformInline.paid_money = this.max;
          console.log(
            this.max,
            'this.maxthis.max',
            this.payformInline.paid_money,
          );
        }
      } else {
      }
    },
  },
  created() {
    // this.$utils.checkding();
    // this.$utils.utilAllProject();
    // this.approvalStatus = this.$utils.utilApprovalStatus();
    // this.getTitleList();
    this.getallaccList();
  },
};
</script>
<style scoped lang="less" >
.yichu {
  width: 300px;
  height: 36px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.fukuan {
  position: relative !important;
  left: -100px !important;
}
.filesTitle {
  width: 500px;
}
.el-table .warning-row {
  background: #edf1f4;
}
.el-form-item__content {
  /* width: 400px !important; */
}
/deep/ .el-form-item__error {
  left: 84px !important;
}
</style>
