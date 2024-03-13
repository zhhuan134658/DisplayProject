/* * @Author: NorthWind * @Date: 2020-11-12 16:49:08 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-02-07 17:38:57 */
<template>
  <div id="home">
    <el-container class="homeContain" style="border: 1px solid #eee">
      <el-header class="homeHeader">
        <div class="workbench-img">
          <img :src="logoUrl" alt="" />
        </div>
        <div class="workbench_main">
          <div class="workbench-center">
            <ul class="firstInjs">
              <li
                v-for="(item, index) in titleList"
                :key="index"
                :class="cNameTwoS(item.url)"
              >
                <div
                  v-if="item.is_hui && item.is_hui == 1"
                  style="height: 70px; line-height: 70px"
                >
                  <div
                    style="
                      white-space: nowrap;
                      line-height: inherit;
                      color: #ccc;
                    "
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div
                  v-else
                  @click="buttonTop(item)"
                  style="height: 70px; line-height: 70px"
                >
                  <div style="white-space: nowrap; line-height: inherit">
                    {{ item.name }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="workbench_right">
            <div class="relation-box">
              <ul>
                <li class="secondInjs">
                  <el-popover
                    placement="bottom"
                    width="290"
                    trigger="click"
                    v-model="muvisible"
                    @show="getallrouter"
                  >
                    <div slot="reference">
                      <img
                        style="cursor: pointer"
                        src="../assets/images/sousuo.png"
                        alt
                      />
                    </div>
                    <div class="down">
                      <el-form
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                        label-position="left"
                      >
                        <el-form-item label="模块名称" style="width: 65%">
                          <el-select
                            v-model="formInline.region"
                            clearable
                            filterable
                            placeholder="请选择模块"
                            style="width: 172px"
                          >
                            <el-option
                              v-for="(item, index) in allregion"
                              :key="index"
                              :label="item.title"
                              :value="item.url"
                            ></el-option>
                          </el-select>

                          <!-- <el-button type="primary" @click="onok"
                            >跳转</el-button
                          > -->
                        </el-form-item>
                        <el-form-item
                          style="display: flex; flex-direction: column-reverse"
                        >
                          <el-button type="primary" @click="onok"
                            >跳转</el-button
                          >
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-popover>
                </li>
                <li>
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                      更多 <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <div class="noticeBox" @click="viewMore">
                          <img src="../assets/images/bell.png" alt="" />消息
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-popover
                          placement="bottom"
                          width="290"
                          trigger="click"
                        >
                          <div class="noticeBox" slot="reference">
                            <img
                              style="cursor: pointer"
                              src="../assets/images/customerService.png"
                              alt
                            />用户群
                          </div>
                          <div class="down" style="text-align: center">
                            <img
                              style="width: 220px; height: 242px"
                              src="../assets/workbench/erweima.png"
                              alt
                            />
                            <div style="margin: 0.06rem 0" @click="gophone">
                              手机钉钉扫描二维码加入“用户服务群”
                            </div>
                            <div>联系电话：0371-56775558</div>
                          </div>
                        </el-popover>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div class="noticeBox" @click="gohelp">
                          <img
                            style="cursor: pointer"
                            src="../assets/images/helpDoc.png"
                            alt
                          />帮助文档
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div class="noticeBox" @click="addBack">
                          <img
                            style="cursor: pointer"
                            src="../assets/images/feedback.png"
                            alt
                          />意见反馈
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
            </div>
            <div class="admin">
              <img :src="Image" v-if="Image" />
              <div class="notou" v-else>
                {{
                  2 >= uname.length ? uname : uname.substr(uname.length - 2, 2)
                }}
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="homeBottomContain">
        <router-view v-if="menushow" />
      </el-container>
    </el-container>

    <el-dialog :visible.sync="createVisible" class="carouselDialog">
      <el-carousel
        trigger="click"
        height="559px"
        :autoplay="false"
        arrow="always"
      >
        <el-carousel-item v-for="(item, index) in helplist" :key="index">
          <el-image style="width: 100%; height: 100%" :src="item"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <!-- <div class="edition" v-if="isHui=='true'">
      <img
        src="@/assets/twoImg/bg.png"
        alt=""
        style="width: 100%; height: 100%"
      />
    </div> -->
    <el-dialog
      title="意见反馈"
      :visible.sync="addFormVisible"
      @close="handleClose('addEditForm')"
      width="600px"
    >
      <el-form
        @submit.native.prevent
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
        ref="addEditForm"
        label-position="right"
      >
        <div>
          <el-form-item label="意见：" prop="parere">
            <el-input
              type="textarea"
              v-model="addForm.parere"
              maxlength="240"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="addForm.tel" maxlength="11"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loaded"
            @click="addSave('addEditForm')"
            >提交</el-button
          >
          <el-button @click="handleClose('addEditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="dialogVisible1"
      width="812px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="dialog">
        <img
          src="@/assets/twoImg/clear.png"
          alt=""
          class="clear"
          @click="dialogVisible1 = false"
        />
        <img src="@/assets/twoImg/logBg.png" alt="" class="bg" />
        <div
          style="
            font-weight: bold;
            color: #2d91fa;
            text-align: center;
            font-size: 24px;
            z-index: 1;
            position: relative;
          "
        >
          亲爱的用户,您好! 筑快OA升级了
        </div>
        <div class="oneCount">
          <div style="color: #ff7c00" class="updata">
            • • 更新了以下表单 • •
          </div>
          <div>
            1.（财务）材料付款、劳务合同付款、代发班组工资、零星劳务付款、自有人员工资发放、分包付款、租赁付款、其他付款、保证金付款、合同收款、其他收款、保证金收入；
          </div>
          <div>2.（投标）投标保证金收入、投标保证金退回；</div>
          <div>3.（收入）履约保证金支出、履约保证金退回；</div>
          <div>
            4.（支出）劳务分包保证金支出、劳务分包保证金退回、分包保证金支出、分包保证金退回。
          </div>
        </div>

        <div class="oneCount" style="height: 81px">
          <div style="color: #ff7c00" class="updata">
            • • 增加了以下表单 • •
          </div>
          <div>
            （投标）投标支出申请、投标收入申请；（招标）直接发包；（财务）投标付款、投标收款。
          </div>
        </div>

        <div
          style="
            width: 615px;
            color: #2d91fa;
            margin: auto;
            margin-top: 23px;
            z-index: 1;
            position: relative;
          "
        >
          除了修改表单内容，我们做了逻辑上的调整，把收付款登记调整为收付款申请单，财务只需要在列表
          中对审批通过的表单进行收付款操作就可以了！升级后操作更方便！
        </div>

        <div
          style="
            z-index: 1;
            position: relative;
            text-align: center;
            margin-top: 26px;
          "
        >
          <el-button type="primary" round @click="upgrade">立即升级</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="dialogVisible2"
      width="445px"
      top="280px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="dialog">
        <img
          src="@/assets/twoImg/clear.png"
          alt=""
          class="clear"
          @click="dialogVisible2 = false"
        />
        <img src="@/assets/twoImg/logBg.png" alt="" class="bg" />

        <div
          style="
            font-weight: bold;
            color: #2d91fa;
            text-align: center;
            font-size: 18px;
            z-index: 1;
            position: relative;
          "
        >
          申请已提交，客服人员会及时与您联系
        </div>
        <div
          style="
            color: #2d91fa;
            text-align: center;
            margin-top: 23px;
            z-index: 1;
            position: relative;
          "
        >
          客服电话：13290940906
        </div>

        <div
          style="
            z-index: 1;
            position: relative;
            text-align: center;
            margin-top: 26px;
          "
        >
          <el-button type="primary" round @click="endifo">确定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- <el-dialog
      title=""
      :visible.sync="fufei"
      width="812px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="dialog">
        <img
          src="@/assets/twoImg/clear.png"
          alt=""
          class="clear"
          @click="changeRa"
        />
        <img src="@/assets/twoImg/logBg.png" alt="" class="bg" />
        <div class="dianji" @click="upgrades"></div>
        <div class="clearBox">
          <img src="@/assets/twoImg/xiaofei.png" alt="" class="clearS" />
          <div class="xiaofeiText">
            <el-checkbox v-model="radio"
              ><span class="text">不再提示</span></el-checkbox
            >
          </div>
        </div>
      </div>
    </el-dialog> -->

    <!-- <el-dialog
      title=""
      :visible.sync="isHui"
      width="1100px"
      top="40px"
      :close-on-click-modal="false"
    >
      <div class="dialog">
        <img
          src="@/assets/twoImg/clear.png"
          alt=""
          class="clear"
          @click="closeHui"
        />
        <img src="@/assets/twoImg/logBg.png" alt="" class="bg" />
        <div
          style="
            font-weight: bold;
            color: #2d91fa;
            text-align: center;
            font-size: 32px;
            z-index: 1;
            position: relative;
          "
        >
          开 通 尊 享 版 ， 项 目 管 理 精 益 求 精 !
        </div>
        <div class="oneCounts">
          <div class="banb">尊 享 版 获 取 更 多 权 益</div>

          <div class="tables">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              :header-cell-style="{ background: '#FFE0BB', color: '#634934' }"
              border
              style="width: 100%"
            >
              <el-table-column prop="date" label="首页"> </el-table-column>
              <el-table-column prop="name" label="招标" width="135">
              </el-table-column>
              <el-table-column prop="address" width="125" label="成本">
              </el-table-column>
              <el-table-column prop="zhichu" width="185" label="支出">
              </el-table-column
              ><el-table-column prop="caiwu" width="170" label="财务">
              </el-table-column
              ><el-table-column prop="renwu" label="任务"> </el-table-column
              ><el-table-column prop="shezhi" width="120" label="设置">
              </el-table-column
              ><el-table-column prop="zidingyi" label="自定义">
              </el-table-column>
            </el-table>
          </div>

          <div style="z-index: 1; text-align: center; margin-top: 26px">
            <el-button type="primary" class="benx" round @click="upgrades"
              >升级尊享版</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi';
import 'driver.js/dist/driver.min.css';

export default {
  name: 'home',
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      maincorpid: '',
      menushow: false,
      muvisible: false,
      tableData: [
        {
          date: '项目看板',
          name: '物资招标申请',
          address: '税务策划',
          zhichu: '材料费用分类报表',
          caiwu: '收票付款汇总表(按合同)',
          renwu: '新建任务',
          shezhi: '预警设置',
          zidingyi: '自定义',
        },
        {
          date: '驾驶舱',
          name: '工程分包招标申请',
          address: '税务对比表',
          zhichu: '材料合同台账',
          caiwu: '收票付款汇总表(按单位)',
          renwu: '任务列表',
          shezhi: '结算转付款申请',
          zidingyi: '',
        },
        {
          date: '',
          name: '招标报价对比',
          address: '预估利润',
          zhichu: '材料进出库汇总',
          caiwu: '开票收款汇总表',
          renwu: '',
          shezhi: 'LOGO设置',
          zidingyi: '',
        },
        {
          date: '',
          name: '中标登记',
          address: '利润对比分析表',
          zhichu: '材料执行情况表(按项目)',
          caiwu: '税金缴纳申请',
          renwu: '',
          shezhi: '打印模板编辑',
          zidingyi: '',
        },
        {
          date: '',
          name: '直接发包',
          address: '',
          zhichu: '材料执行情况表(按总计划)',
          caiwu: '跨区域涉税事项报告',
          renwu: '',
          shezhi: '',
          zidingyi: '',
        },
        {
          date: '',
          name: '',
          address: '',
          zhichu: '',
          caiwu: '税务报表',
          renwu: '',
          shezhi: '',
          zidingyi: '',
        },
      ],
      formInline: {
        region: '',
      },
      allregion: [],
      helplist: [
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zXDkXNeNkd1609724091928.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7s26jHzTtf1609724267189.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/KHEMpJfKJT1609724623208.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7KAxBPaE7F1609724624335.png',
      ],
      createVisible: false,
      addFormRules: {
        parere: [
          {
            required: true,
            message: '请输入意见',
            trigger: 'blur',
          },
        ],
        tel: [
          {
            required: true,
            message: '请选择手机号',
            trigger: 'blur',
          },
        ],
      },
      loaded: false,
      addFormVisible: false,
      radio: false,
      Image: '',
      cname: '',
      name: '',
      corp_time: '',
      corp_name: '',
      uname: '',
      cNameOne: 'colorName',
      cNameTwo: '',
      checkedLists: [],
      fufei: false,
      titleList: [],
      isHui: false,
      addForm: {
        tel: '',
        parere: '',
      },
      logoUrl: '',
      // https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/H4wMiseYbS1617767784128.png
      // titleList: [
      //     { name: '首页', url: '/appIndex' },
      //     { name: '项目', url: '/project/tenderProject' },
      //     { name: '财务', url: '/finance/financeAccountInfo' },
      //     { name: '证书', url: '/certificate/tenderProject' },
      //     { name: '资料', url: '/files/tenderProject' },
      //     { name: '系统', url: '/system/systemRole' },
      //     { name: '基本信息', url: '/basicInfo/basicHouseManage' }
      // ]
    };
  },
  methods: {
    upgrades() {
      // window.open(`http://${res.data.file_path}`);
      window.open(
        `http://h5.dingtalk.com/open-purchase/mobileUrl.html?redirectUrl=https%3A%2F%2Fh5.dingtalk.com%2Fopen-market%2Fshare.html%3FshareGoodsCode%3DD34E5A30A9AC7FC6AD8246C12A831FFADCFBB31D7EEA9E85BF04759C5DD2E85C0B864D39FD4CD30A%26token%3D14f2ef7182d4f62ceb1500adaece032e%26shareUid%3D55297CFA59D61508A2D58853D5063F3D&dtaction=os`,
      );
    },
    tableRowClassName({ row, rowIndex }) {
      return 'warning-row';
    },
    upgrade() {
      console.log(
        this.$store.state.userInfo.uid,
        'this.$store.state.userInfo.uid',
      );
      this.$axios
        .post('/order/upgradeEditionRemind', {
          userid: this.$store.state.userInfo.uid,
        })
        .then(res => {
          //   if (res.data.code == 1) {
          //   }
        });
      this.dialogVisible2 = true;
    },
    endifo() {
      this.dialogVisible1 = false;
      this.dialogVisible2 = false;
    },
    onok() {
      this.muvisible = false;
      this.$router.push({ path: this.formInline.region });
      this.formInline.region = '';
    },
    viewMore() {
      this.$router.push({
        path: '/appIndex8/appIndexMsg',
      });
    },
    // 所有路由
    getallrouter() {
      this.$axios
        .post('/order/menuSou')
        .then(res => {
          if (res.data.code == 1) {
            this.allregion = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLogo() {
      //   console.log('123456');
      this.$axios
        .post('/spread/zkLogo')
        .then(res => {
          if (res.data.code == 1) {
            // console.log('123456', res.data.new_data);
            res.data.new_data.filter(item => {
              if (item.status == 1) {
                // console.log('123456', item);
                this.logoUrl = item.url;
              }
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeRa() {
      this.fufei = false;
      console.log(this.radio);
      if (this.radio) {
        this.$axios
          .post('/mobile/zkoaActivity')
          .then(res => {})
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    //刷新表单
    updateForm() {
      const _this = this;
      let newID = _this.$store.state.cid;
      _this.$axios
        .post('/projecttwo/projectInfoRegisterUpdate1', {
          corp_id: newID,
        })
        .then(() => {
          _this.$message({
            message: '刷新审批表单成功',
            type: 'success',
            duration: 1500,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.$axios
        .post('/projecttwo/projectInfoRegisterUpdate2', {
          corp_id: newID,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.$axios
        .post('/projecttwo/projectInfoRegisterUpdate3', {
          corp_id: newID,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.$axios
        .post('/projecttwo/projectInfoRegisterUpdate4', {
          corp_id: newID,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.$axios
        .post('/projecttwo/projectInfoRegisterUpdate5', {
          corp_id: newID,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.$axios
        .post('/projecttwo/projectInfoRegisterUpdate6', {
          corp_id: newID,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.$axios
        .post('/projecttwo/projectAddUpdate', {
          corp_id: newID,
        })
        .then(res => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    gohelp() {
      dd.ready(function () {
        dd.biz.util.openLink({
          url: 'https://www.yuque.com/books/share/834d6476-ad45-4f80-8a94-51d767673b9d?#', //要打开链接的地址
          onSuccess: function () {
            /**/
          },
          onFail: function () {},
        });
      });
    },
    open() {
      this.$notify.error({
        title: '错误',
        message: '获取数据失败，请刷新页面',
      });
    },
    addBack() {
      this.addFormVisible = true;
    },
    //意见
    addSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/finance/parereadd', {
              tel: this.addForm.tel,
              img: '',
              parere: this.addForm.parere,
            })
            .then(res => {
              if (res.data.code == 1) {
                _this.loaded = false;
                _this.addFormVisible = false;
                _this.$refs[formName].resetFields();
                _this.$message({
                  message: '提交意见成功',
                  type: 'success',
                  duration: 1500,
                });
              } else {
                _this.loaded = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 1500,
                });
              }
            })
            .catch(function (error) {
              _this.loaded = false;
              console.log(error);
            });
        } else {
          _this.loaded = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    //取消意见
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.addFormVisible = false;
    },
    closeHui() {
      this.$store.commit('setEdition', false);
      this.isHui = false;
    },
    getMenuList() {
      this.$axios
        .post('/user/menu', { type: 0 })
        .then(res => {
          if (res.data.code == 1) {
            this.titleList = res.data.data;
            // this.$refs.tableRef.setCurrentRow();

            if (this.$store.state.edition == 'true') {
              this.isHui = true;
            } else if (this.$store.state.edition == 'false') {
              this.isHui = false;
            }
            //新手指引
            // this.$nextTick(() => {
            //     this.guide();
            // });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
              duration: '1500',
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    buttonTop(row) {
      //   if (row.is_hui == '1') {
      //     this.$store.commit('setEdition', true);
      //     this.isHui = this.$store.state.edition;
      //   } else {
      //     this.$store.commit('setEdition', false);
      //     this.isHui = this.$store.state.edition;
      this.$router.push(row.url);
      //   }
      //   this.$store.commit('setOrdinary', 'false');
    },
    gophone() {
      let newP = window.location.protocol;
      if (
        this.$store.state.userInfo.uid == '1955162522782338' ||
        this.$store.state.userInfo.uid == '1743511105903146' ||
        this.$store.state.userInfo.uid == '195516252224279904' ||
        this.$store.state.userInfo.uid == 'manager9288'
      ) {
        if (newP == 'http:') {
          window.location.href =
            'http://oazhukuai.zzdingyun.com/app/mobile/index.html';
        } else {
          window.location.href =
            'https://app58708.eapps.dingtalkcloud.com/app/mobile/index.html';
        }
      }
    },
    GetQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getReady() {
      const that = this;
      let corpId = that.GetQueryString('corpid');
      // 免登录信息获取
      dd.ready(function () {
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.runtime.permission.requestAuthCode({
          // corpId: "dingea47c602975497f935c2f4657eb6378f",
          corpId: corpId,
          onSuccess: function (result) {
            if (result.code != '') {
              that.$axios
                .post('/user/userinfo', {
                  corp_id: corpId,
                  code: result.code,
                })
                .then(res => {
                  if (res.data.code == 1) {
                    that.$nextTick(() => {
                      that.menushow = true;
                    });
                    that.getLogo();
                    sessionStorage.setItem('errcode', 1);
                    let userData = JSON.parse(
                      JSON.stringify(res.data.data.content),
                    );
                    if (
                      userData.jobnumber != 1 &&
                      Number(userData.corp_created) < 1650729600
                    ) {
                      that.dialogVisible1 = true;
                    } else {
                      that.dialogVisible1 = false;
                    }

                    if (userData.email != '1') {
                      that.fufei = true;
                    } else {
                      that.fufei = false;
                    }
                    // if (userData.jobnumber == 0) {
                    //   that.createVisible = true;
                    // } else {
                    //   that.createVisible = false;
                    // }
                    let user = userData.userid;
                    that.Image = userData.avatar;
                    that.uname = userData.name;
                    that.$store.commit('setUname', that.uname);
                    that.$store.commit('setCname', userData.company);
                    that.$store.commit('setAvatar', that.Image);
                    that.$store.commit('setUid', user);
                    that.$store.commit('setAdmin', userData.zk_admin);
                    that.$store.commit(
                      'setCorpcreated',
                      res.data.data.content.corp_created,
                    );
                    // 判断是不是个人版   个人版 2  企业版 1
                    // if (res.data.data.content.type == 2) {
                    //     that.firstshow = true;
                    // } else {
                    //     that.firstshow = false;
                    // }
                    that.$store.commit(
                      'setmaincorpid',
                      res.data.data.content.mainCorpId,
                    );
                    that.$store.commit(
                      'setfirstshow',
                      res.data.data.content.type,
                    );
                    that.maincorpid = res.data.data.content.mainCorpId;

                    that.$utils.checkding();
                    that.getMenuList();
                    that.$utils.utilProjectType();
                    that.$utils.utilProjectStatus();
                    that.$utils.utilAllProject();
                  } else if (res.data.code == 2) {
                    sessionStorage.setItem('errMsg', res.data.msg);
                    sessionStorage.setItem('errcode', 2);
                    that.$router.push('/error');
                  } else if (res.data.code == 3) {
                    that.$store.commit('setOutTime', res.data.data.time);
                    sessionStorage.setItem('errStatus', res.data.data.status);
                    sessionStorage.setItem('errcode', 3);
                    that.$router.push('/errorOut');
                  } else if (res.data.code == 0) {
                    sessionStorage.setItem('errcode', 0);
                    sessionStorage.setItem('errMsg', res.data.msg);
                    that.$router.push('/error');
                  }
                });
            }
          },
          onFail: function () {},
        });
      });
    },
    login() {
      const that = this;
      that.$axios
        .post('/user/userinfo', {
          corp_id: that.$store.state.cid,
          code: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            that.$nextTick(() => {
              that.menushow = true;
            });
            that.getLogo();
            sessionStorage.setItem('errcode', 1);
            let userData = JSON.parse(JSON.stringify(res.data.data.content));
            if (userData.email != '1') {
              that.fufei = true;
            } else {
              that.fufei = false;
            }
            if (
              userData.jobnumber != 1 &&
              Number(userData.corp_created) < 1650729600
            ) {
              that.dialogVisible1 = true;
            } else {
              that.dialogVisible1 = false;
            }

            // if (userData.jobnumber == 0) {
            //   that.createVisible = true;
            // } else {
            //   that.createVisible = false;
            // }
            let user = userData.userid;
            that.Image = userData.avatar;
            that.uname = userData.name;
            that.$store.commit('setUname', that.uname);
            that.$store.commit('setCname', userData.company);
            that.$store.commit('setAvatar', that.Image);
            that.$store.commit('setUid', user);
            that.$store.commit('setAdmin', userData.zk_admin);
            // 判断是不是个人版   个人版 2  企业版 1
            // if (res.data.data.content.type == 2) {
            //     that.firstshow = true;
            // } else {
            //     that.firstshow = false;
            // }
            that.$store.commit(
              'setmaincorpid',
              res.data.data.content.mainCorpId,
            );
            that.$store.commit(
              'setCorpcreated',
              res.data.data.content.corp_created,
            );

            that.$store.commit('setfirstshow', res.data.data.content.type);
            that.maincorpid = res.data.data.content.mainCorpId;

            that.$utils.checkding();
            that.getMenuList();
            that.$utils.utilProjectType();
            that.$utils.utilProjectStatus();
            that.$utils.utilAllProject();
          } else if (res.data.code == 2) {
            sessionStorage.setItem('errMsg', res.data.msg);
            sessionStorage.setItem('errcode', 2);
            that.$router.push('/error');
          } else if (res.data.code == 3) {
            that.$store.commit('setOutTime', res.data.data.time);
            sessionStorage.setItem('errStatus', res.data.data.status);
            sessionStorage.setItem('errcode', 3);
            that.$router.push('/errorOut');
          } else if (res.data.code == 0) {
            sessionStorage.setItem('errcode', 0);
            sessionStorage.setItem('errMsg', res.data.msg);
            that.$router.push('/error');
          }
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    menuClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeColor(val) {
      let newPath = this.$route.path,
        newUrl = '',
        valUrl = '';
      let index = newPath.lastIndexOf('/');
      let valIndex = val.lastIndexOf('/');
      newUrl = newPath.substring(0, index + 1);
      valUrl = val.substring(0, valIndex + 1);
      if (valUrl == '/appIndex8/') {
        if (newUrl == '/appIndex8/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/project/') {
        if (newUrl == '/project/') {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == '/projectincome/') {
        if (newUrl == '/projectincome/') {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == '/projetcout/') {
        if (newUrl == '/projetcout/') {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == '/projectcost/') {
        if (newUrl == '/projectcost/') {
          return this.cNameOne;
        } else {
          return this.cNameFour;
        }
      } else if (valUrl == '/finance/') {
        if (newUrl == '/finance/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/files/') {
        if (newUrl == '/files/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/certificate/') {
        if (newUrl == '/certificate/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/system/') {
        if (newUrl == '/system/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/scene/') {
        if (newUrl == '/scene/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/task/') {
        if (newUrl == '/task/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/production/') {
        if (newUrl == '/production/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/administration/') {
        if (newUrl == '/administration/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      } else if (valUrl == '/zidy/') {
        if (newUrl == '/zidy/') {
          return this.cNameOne;
        } else {
          return this.cNameTwo;
        }
      }
    },
    guide() {
      const _this = this;
      let introJs = require('intro.js');
      introJs()
        .setOptions({
          nextLabel: '下一步 &rarr;',
          prevLabel: '&larr; 上一步',
          skipLabel: '退出',
          doneLabel: '下一步',
          // showButtons: false,
          showBullets: false,
          steps: [
            {
              element: document.querySelector('.firstInjs'),
              intro: '您可以在这里选择操作',
            },
            {
              element: document.querySelector('.secondInjs'),
              intro: '在这里联系我们',
            },
            {
              element: document.querySelector('.thirdInjs'),
              intro: '在这里获取更多帮助',
            },

            // {
            //     title: 'Farewell!',
            //     element: document.querySelector('.card__image'),
            //     intro: 'And this is our final step!'
            // }
          ],
        })
        .oncomplete(function () {
          //点击跳过按钮后执行的事件
        })
        .onexit(function () {
          _this.createVisible = true;
          // introJs().refresh();
          //点击结束按钮后， 执行的事件
          // _this.$router.push({ path: '/project/tenderProject' });
        })
        // .onchange(function (targetElement) {
        //     console.log('45+++' + targetElement.className);
        //     _this.currentClass = targetElement.className;
        // })
        // .onbeforechange(function (targetElement) {
        //     console.log('47+++' + targetElement.className);
        //     if (_this.currentClass == 'firstInjs') {
        //         _this.$router.push({ path: '/project/tenderProject' });
        //     }
        // })
        .start();
    },
  },
  mounted() {
    // this.framework();
    // this.$nextTick(() => {
    //     let gonext = document.getElementsByClassName('.introGoNext');
    //     gonext.onclick = function () {
    //         console.log('45666++');
    //     };
    // });
  },
  created() {
    const _this = this;
    let CorpId = '';
    var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
    CorpId = url.split('?corpid=')[1];
    _this.$store.commit('setCid', CorpId);
    // _this.getallrouter();
    if (process.env.VUE_APP_AUTH_CODE == 666) {
      _this.$message(`测试环境`);

      // 本地测试环境
      _this.$store.commit('setCid', 'dinga090000f57c90b3eee0f45d8e4f7c288');
      _this.login();

      //   线下测试环境
      //   _this.getReady();
    } else {
      _this.getReady();
    }
  },
  computed: {
    ImageShow() {
      if (this.Image == '' || this.Image == null || this.Image == undefined) {
        return true;
      } else {
        return false;
      }
    },
    cNameOneS() {
      let newPath = this.$route.path,
        newUrl = '';
      let index = newPath.lastIndexOf('/');
      newUrl = newPath.substring(0, index + 1);
      if (newUrl == '/project/') {
        return this.cNameOne;
      } else {
        return this.cNameTwo;
      }
    },
    cNameTwoS() {
      return function (value) {
        return this.changeColor(value);
      };
    },
    cNameFourS() {
      return true;
    },
    cNameThreeS() {
      return true;
    },
    cNameTS() {
      return true;
    },
  },
  watch: {
    '$store.state.isNewTitle': {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        if (val != '') {
          this.getMenuList();
        }
      },
      deep: true, //true 深度监听
    },
  },
};
</script>
<style lang="scss">
.tables .el-table tbody tr:hover > td {
  background: #fff4e7 !important;
}
.tables .el-table__body tr.current-row > td.el-table__cell {
  background: #fff4e7 !important;
}
.el-table .warning-row {
  background: #fff4e7;
}

.edition {
  position: fixed;
  top: 7.3%;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog {
  .clear {
    position: absolute;
    top: 15px;
    right: 20px;
    z-index: 2;
    width: 12px;
    height: 12px;
  }
  .dianji {
    width: 94%;
    height: 82%;
    // background-color: red;
    position: absolute;
    z-index: 3;
  }
  .clearBox {
    width: 500px;
    height: 500px;

    .xiaofeiText {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-52%);
      z-index: 1;
      .text {
        color: #007af6;
      }
    }
    .clearS {
      position: absolute;
      top: -0.1%;
      right: -0.4%;
      z-index: 1;
      width: 101%;
      height: 101%;
    }
  }

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .oneCounts {
    // width: 648px;
    height: 586px;
    background: #fff4e7;
    box-shadow: 0px 0px 15px 1px rgba(45, 145, 250, 0.11);
    border-radius: 12px;
    // padding: 28px;
    font-size: 14px;
    line-height: 31px;
    position: relative;
    margin: 0 11px;
    margin-top: 53px;
    color: black;
    .benx {
      font-size: 16px;
      font-weight: bold;
      color: #663700;
      border: none;
      box-shadow: 0px 0px 55px 4px rgba(178, 101, 3, 0.1);
      background: linear-gradient(
        0deg,
        rgba(255, 178, 80, 0.99),
        rgba(255, 176, 77, 0.99)
      );
    }
    .banb {
      background: url('~@/assets/twoImg/blackBg.png') no-repeat center center;
      border-radius: 12px;
      width: 100%;
      height: 135px;
      text-align: center;
      line-height: 6;
      font-size: 22px;
      color: #ffffff;
    }
    .tables {
      margin: 0 31px;
    }
  }
  .oneCount {
    width: 648px;
    height: 210px;
    background: #ffffff;
    box-shadow: 0px 0px 15px 1px rgba(45, 145, 250, 0.11);
    border-radius: 12px;
    padding: 28px;
    font-size: 14px;
    line-height: 31px;
    position: relative;
    margin: auto;
    margin-top: 53px;
    color: black;
    .updata {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 198px;
      height: 37px;
      background: #fff2e6;
      border: 1px solid #ff7c00;
      border-radius: 12px;
      font-size: 16px;
      text-align: center;
      line-height: 34px;
    }
  }
}
.noticeBox {
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  img {
    display: inline-block;
    width: 20px;
    margin-right: 8px;
  }
}
.notou {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #409eff;
  text-align: center;
  color: #fff;
}
.el-dropdown-menu__item {
  padding: 0;
}
</style>
