<template>
  <div id="projectQuality">
    <div class="main">
      <div class="content">
        <!-- <div class="progressConHeader">
                    <div class="pchLeft">
                        <div>项目名称：</div>
                        <el-select
                            v-model="searchId"
                            filterable
                            placeholder="请选择项目"
                            @change="searchNext"
                        >
                            <el-option
                                v-for="item in nextProject"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <el-button type="primary" size="medium">搜索</el-button>
                </div> -->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="liu-tabs">
          <el-tab-pane label="质量列表" name="first">
            <!-- <div class="comeSearch">
                            <el-form ref="form" :model="payform" :inline="true">
                                <div class="searchLeft">
                                    <div class="slContent">
                                        <div class="searchInput">
                                            <el-input
                                                placeholder="请输入标题"
                                                prefix-icon="el-icon-search"
                                                v-model="payform.keyWord"
                                            ></el-input>
                                            <el-form-item>
                                                <el-button
                                                    type="primary"
                                                    round
                                                    @click="searchinfo"
                                                    >搜索</el-button
                                                ></el-form-item
                                            >
                                        </div>
                                        <div class="searchRight">
                                            <el-form-item>
                                                <el-button
                                                    type="primary"
                                                    @click="viewDraw"
                                                    >新建</el-button
                                                >
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="srbContent">
                                        <el-form-item label="项目：">
                                            <el-select
                                                v-model="payform.xmid"
                                                filterable
                                                clearable
                                                placeholder="请选择项目"
                                            >
                                                <el-option
                                                    v-for="item in nextProject"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.name"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="事故等级：">
                                            <el-select
                                                v-model="payform.jibie"
                                                clearable
                                                filterable
                                                placeholder="请选择事故等级"
                                            >
                                                <el-option
                                                    v-for="item in AbasicList"
                                                    :label="item.content__value"
                                                    :value="item.content__value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="事故类别：">
                                            <el-select
                                                v-model="payform.type"
                                                clearable
                                                filterable
                                                placeholder="请选择事故类别"
                                            >
                                                <el-option
                                                    v-for="item in BbasicList"
                                                    :label="item.content__value"
                                                    :value="item.content__value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="审批状态：">
                                            <el-select
                                                v-model="payform.bstatus"
                                                clearable
                                                placeholder="请选择审批状态"
                                            >
                                                <el-option
                                                    v-for="item in basicLiuList"
                                                    :label="item.name"
                                                    :value="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-form>
                        </div> -->
            <div class="header">
              <div class="headerContent">
                <el-form
                  @submit.native.prevent
                  :inline="true"
                  :model="payform"
                  class="demo-form-inline"
                >
                  <div class="hlBottom">
                    <el-form-item label="事故标题:">
                      <el-input
                        placeholder="请输入标题"
                        clearable
                        v-model="payform.keyWord"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称:">
                      <el-select
                        v-model="payform.xmid"
                        clearable
                        filterable
                        placeholder="请选择项目"
                      >
                        <el-option
                          v-for="(item, index) in allProjectList"
                          :key="index"
                          :label="item.name"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="事故等级:">
                      <el-select
                        v-model="payform.jibie"
                        clearable
                        filterable
                        placeholder="请选择事故等级"
                      >
                        <el-option
                          v-for="item in AbasicList"
                          :label="item.content__value"
                          :value="item.content__value"
                          :key="item.content_value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="事故类别:">
                      <el-select
                        v-model="payform.type"
                        clearable
                        filterable
                        placeholder="请选择事故类别"
                      >
                        <el-option
                          v-for="item in BbasicList"
                          :label="item.content__value"
                          :value="item.content__value"
                          :key="item.content_value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="审批状态:">
                      <el-select
                        v-model="payform.bstatus"
                        clearable
                        placeholder="请选择审批状态"
                      >
                        <el-option
                          v-for="item in basicLiuList"
                          :label="item.name"
                          :value="item.value"
                          :key="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="申请人">
                      <div
                        class="el-input el-input--suffix names"
                        @click="addManyP1"
                      >
                        {{ formInline.namesa }}
                      </div>
                    </el-form-item>

                    
              <el-form-item label="项目性质">
                <el-select
                    v-model="formInline.lian_ying"
                    clearable
                    filterable
                    placeholder="请选择项目性质"
                >
                       <el-option
                  v-for="(item, index) in natureProject1"
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
                        @click="searchinfo"
                        style="margin-right: 10px"
                        >搜索</el-button
                      >
                      <el-button size="medium" plain @click="resetClick"
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
                  <el-button type="primary" size="medium" @click="newAdd"
                    >新建</el-button
                  >
                </div>
                <div class="mmbRight">
                  <el-button
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-delete"
                    @click="deleteList"
                    >删除</el-button
                  >
                  <el-button
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-download"
                    @click="exportList"
                    >导出</el-button
                  >
                  <el-button
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-refresh"
                    @click="updateList"
                    >刷新</el-button
                  >
                  <el-button
                    v-if="$store.state.userInfo.admin == 1"
                    type="primary"
                    plain
                    size="medium"
                    icon="el-icon-setting"
                    @click="viewShow"
                    >设置显示字段</el-button
                  >
                </div>
                <!-- <div class="mmbLeft">
                                  <el-button
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
                                      @click="exportList"
                                      >导出</el-button
                                  >
                                  <el-button
                                      type="primary"
                                      plain
                                      size="medium"
                                      round
                                      @click="updateList"
                                      >刷新</el-button
                                  >
                              </div>
                              <div
                                  class="mmbRight"
                                  v-if="$store.state.userInfo.admin == 1"
                              >
                                  <i class="el-icon-s-tools"></i>
                                  <el-button type="text" @click="viewShow"
                                      >设置显示字段</el-button
                                  >
                              </div> -->
              </el-row>
              <commonTable
                :tpList="tpList"
                :titleList="titleList"
                :footerNumList="footerNumList"
                :isFooter="isFooter"
                @listenChild="getMult"
                printTableName="zhiliang"
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
          </el-tab-pane>
          <el-tab-pane
            label="统计分析"
            name="second"
            style="background: #fff; padding: 20px; border-radius: 5px"
          >
            <div class="qualityChart">
              <div class="qualityChartTop">
                <el-date-picker
                  v-model="qcTime"
                  type="year"
                  placeholder="选择年"
                  format="yyyy 年"
                  value-format="yyyy"
                >
                </el-date-picker>
                <el-select
                  v-model="payProject"
                  clearable
                  placeholder="请选择项目"
                  style="margin-left: 20px"
                >
                  <el-option
                    v-for="item in projectList"
                    :label="item.name"
                    :value="item.name"
                    :key="item.name"
                  ></el-option>
                </el-select>
                <el-button type="primary" @click="searchQC">搜索</el-button>
              </div>
              <div class="qchart">
                <div
                  v-if="activeName == 'second'"
                  id="qualityLX"
                  ref="QLX"
                ></div>
                <div
                  v-if="activeName == 'second'"
                  id="qualityDJ"
                  ref="QDJ"
                ></div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="基础设置"
            name="third"
            style="background: #fff; padding: 20px; border-radius: 5px"
          >
            <div class="pb_third">
              <el-button type="primary" round @click="newAddBasic"
                >新建</el-button
              >
            </div>
            <div class="projectBasic">
              <el-collapse v-model="basicActiveNames" @change="handleChange">
                <el-collapse-item
                  title="质量事故等级"
                  name="1"
                  v-if="AbasicList.length > 0"
                >
                  <div>
                    <el-tag
                      v-for="list in AbasicList"
                      :key="list.id"
                      :closable="list.type == '1' ? true : false"
                      @close="deleteTitleClick(list, 1)"
                      >{{ list.content__value }}</el-tag
                    >
                  </div>
                </el-collapse-item>
                <el-collapse-item
                  title="质量事故类别"
                  name="2"
                  v-if="BbasicList.length > 0"
                >
                  <el-tag
                    v-for="list in BbasicList"
                    :key="list.id"
                    :closable="list.type == '1' ? true : false"
                    @close="deleteTitleClick(list, 2)"
                    >{{ list.content__value }}</el-tag
                  >
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog
        title="添加基础设置"
        :visible.sync="addFormVisible"
        @close="titleCancel"
        width="600px"
      >
        <el-form
          @submit.native.prevent
          :model="basicAddForm"
          label-width="130px"
          :rules="basicAddFormRules"
          ref="addEditForm"
          label-position="right"
        >
          <div>
            <el-form-item
              label="基础设置类型："
              prop="type"
              class="projectTypeSelect"
            >
              <el-radio-group v-model="basicAddForm.type">
                <el-radio-button
                  v-for="(item, index) in titleBtnList"
                  :label="item.value"
                  :key="index"
                  >{{ item.name }}</el-radio-button
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="基础设置名称：" prop="content">
              <el-input v-model="basicAddForm.content"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loaded"
              @click="titleSave('addEditForm')"
              >保存</el-button
            >
            <el-button @click="titleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="选择项目发起审批"
        :visible.sync="appVisible"
        @close="approvalCancel('selectEditForm')"
        width="600px"
      >
        <el-form
          @submit.native.prevent
          :model="selectAddForm"
          label-width="130px"
          :rules="selectAddFormRules"
          ref="selectEditForm"
          label-position="right"
        >
          <div>
            <el-form-item
              label="项目名称："
              prop="zid"
              class="projectTypeSelect"
            >
              <el-select
                style="width: 100%"
                v-model="selectAddForm.zid"
                filterable
                clearable
                placeholder="请选择项目"
              >
                <el-option
                  v-for="item in nextProject"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loaded"
              @click="approvalSave('selectEditForm')"
              >发起审批</el-button
            >
            <el-button @click="approvalCancel('selectEditForm')"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="设置"
        :visible.sync="wFormVisible"
        :close-on-click-modal="false"
        width="600px"
        @close="wCancel"
        class="view_change_title"
      >
        <el-checkbox-group
          v-model="checkedLists"
          @change="handleCheckedListChange"
        >
          <draggable animation="1000" v-model="myArray">
            <transition-group>
              <el-checkbox
                v-for="element in myArray"
                :key="element.value"
                :label="element.value"
                border
              >
                <span> {{ element.label }}</span>
              </el-checkbox>
            </transition-group>
          </draggable>
        </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="wCancel">取 消</el-button>
          <el-button size="medium" type="primary" @click="wInfo"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import draggable from 'vuedraggable';
import commonTable from '@/components/commonTable.vue';
const echarts = require('echarts');
export default {
  name: 'projectQuality',
  components: { draggable, commonTable },
  data() {
    return {
      searchId: '',
      nextProject: [],
      qcTime: '',
      peopleIsShow: true,
      basicLiuList: [],
      basicStatusList: [
        { name: '已同意', id: 2 },
        { name: '已拒绝', id: 4 },
        { name: '审批中', id: 3 },
      ],
      pickerVisible: false,
      clickType: 1,
      pickerNum: 9,
      selectAddForm: {
        zid: '',
        name: '',
      },
      selectAddFormRules: {
        zid: [
          {
            required: true,
            message: '请选择项目',
            trigger: ['blur', 'change'],
          },
        ],
      },
      fdFormRules: {
        sgtitle: [
          {
            required: true,
            message: '请输入事故标题',
            trigger: 'blur',
          },
        ],
        jibie: [
          {
            required: true,
            message: '请选择事故等级',
            trigger: ['blur', 'change'],
          },
        ],
        type: [
          {
            required: true,
            message: '请选择事故类别',
            trigger: ['blur', 'change'],
          },
        ],
        money: [
          {
            required: true,
            message: '请输入事故金额',
            trigger: ['blur', 'change'],
          },
        ],
        sgcontent: [
          {
            required: true,
            message: '请输入事故详情',
            trigger: 'blur',
          },
        ],
      },
      basicAddFormRules: {
        type: [
          {
            required: true,
            message: '请选择基础设置',
            trigger: ['blur', 'change'],
          },
        ],
        content: [
          {
            required: true,
            message: '基础设置名称不能为空',
            trigger: 'blur',
          },
        ],
      },
      formInline: {
        namesa: '请选择申请人',
        send_name: '',
        send_userid: '',
        lian_ying:''

      },
      basicAddForm: {
        content: '',
        type: 'a',
        status: 1,
        corp_id: this.$store.state.cid,
      },
      addFormVisible: false,
      titleBtnList: [
        { name: '质量事故等级', value: 'a' },
        { name: '质量事故类别', value: 'b' },
      ],
      AbasicList: [], //质量事故等级
      BbasicList: [], //质量事故类别
      basicActiveNames: ['1', '2'],
      activeName: 'first',
      fViewForm: {
        name: '',
        fjurl: [],
        image: [],
        spuser: [],
        csuser: [],
        money: '',
        sgcontent: '',
        xmid: this.searchId,
        corp_id: this.$store.state.cid,
      },
      viewVisible: false,
      isSend: false,
      viewDrawTitle: '查看',
      viewAllVisible: false,
      viewSendVisible: false,
      bankcount: [],
      datalist: [],
      tpList: [],
      FCTypeList: [
        { name: '待我审批', value: '1', num: 0 },
        { name: '我已审批', value: '2', num: 0 },
        { name: '我发起的审批', value: '3', num: '' },
        { name: '抄送我的', value: '4', num: '' },
      ],
      drawerVisible: false,
      activeConIndex: 0,
      payform: {
        keyWord: '',
        type: '',
        jibie: '',
        bstatus: '',
        next: '',
        xmid: '',
      },
      departmentList: [],
      projectList: [],
      selectFTypeList: [],
      tagsData: [],
      tagsPeopleData: [],
      fDrawerForm: {
        sgtitle: '',
        xmid: '',
        fjurl: [],
        image: [],
        spuser: [],
        csuser: [],
        type: '',
        money: '',
        jibie: '',
        sgcontent: '',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
      },
      AllPeopleVisible: false,
      AllSendPeopleVisible: false,
      loading: false,
      agentid: '',
      dingPicList: [],
      upImgList: [],
      licenceImg: [],
      isShow: ['1'],
      typeId: '1',
      total: 0,
      pagesize: 10,
      currentPage: 1,
      loaded: false,
      loadcan: false,
      checkId: '',
      LXData: [],
      DJData: [],
      timer: null,
      noNextProject: [],
      appVisible: false,
      currentTabName: 'first',
      payProject: '',
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
      natureProject1:[],

    };
  },
  methods: {
         searList(){
       this.$axios.post('/spread/projectNature').then(res=>{
         this.natureProject1 = res.data.data
      })
   },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    resetClick() {
      this.payform = {
        keyWord: '',
        type: '',
        jibie: '',
        bstatus: '',
        next: '',
        xmid: '',
      };
      this.formInline = {
        namesa: '请选择申请人',
        send_name: '',
        send_userid: '',
        lian_ying:''

      };
      this.getList();
    },
    getMult(val) {
      this.multSelectData = val;
    },

    addManyP1() {
      console.log('///*-**-*-');
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
            that.formInline.send_name = result.users[0].name;
            that.formInline.namesa = result.users[0].name;
            that.formInline.send_userid = result.users[0].emplId;
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
    wInfo() {
      let newT = [];
      this.myArray.forEach(element => {
        if (element.check) {
          newT.push(element);
        }
      });

      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          if (this.isFooter == 1) {
            let newFArr = [];
            this.titleList.map(item => {
              this.newFooter.forEach(element => {
                if (element.value == item.value) {
                  newFArr.push(element);
                }
              });
            });
            this.footerNumList = JSON.parse(JSON.stringify(newFArr));
          }
          this.wFormVisible = false;
        });
      } else {
        this.$message({
          type: 'warning',
          message: '不能为空！',
          duration: 1500,
        });
      }
    },
    viewShow() {
      this.getTitleList();
      this.wFormVisible = true;
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: 'zhiliang',
        })
        .then(res => {
          if (res.data.code == 1) {
            this.myArray = res.data.data;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach(element => {
              if (element.check) {
                this.titleList.push(element);
                this.checkedLists.push(element.value);
              }
            });
            this.getList();
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
    sendTitleList() {
      this.$axios
        .post('/spread/editFiledCurrency', {
          name: 'zhiliang',
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
    //获取项目
    getNextProject() {
      const _this = this;

      _this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            _this.nextProject = res.data.data;
            // if (_this.currentTabName == 'first') {
            //     _this.getList();
            // } else if (_this.currentTabName == 'second') {
            //     _this.getPie();
            // } else if (_this.currentTabName == 'third') {
            //     _this.getBasicList();
            // }
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    searchQC() {
      console.log(this.qcTime);
      if (this.qcTime == null) {
        this.qcTime = '';
      }
      this.getPie();
    },
    doPie() {
      const _this = this;
      let mChart = echarts.init(document.getElementById('qualityLX')),
        DJChart = echarts.init(document.getElementById('qualityDJ'));

      mChart.clear();
      mChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return (
              params.seriesName +
              '<br/>' +
              params.name +
              ' : ' +
              params.value +
              ' (' +
              params.percent +
              '%)' +
              '<br/>' +
              '金额：' +
              params.data.money
            );
          },
        },
        legend: {
          itemWidth: 5,
          orient: 'horizontal',
          bottom: '-1%',
        },
        series: [
          {
            name: '事故类别统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: _this.LXData,
            label: {
              show: true,
              position: 'inside',
              formatter: '{a}: {d}%',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    '#FFA200',
                    '#0089FF',
                    '#00D0AF',
                    '#FF3A3A',
                    '#F77400',
                    '#0CCB5D',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
      DJChart.clear();
      DJChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return (
              params.seriesName +
              '<br/>' +
              params.name +
              ' : ' +
              params.value +
              ' (' +
              params.percent +
              '%)' +
              '<br/>' +
              '金额：' +
              params.data.money
            );
          },
        },
        legend: {
          itemWidth: 5,
          orient: 'horizontal',
          bottom: '-1%',
        },
        series: [
          {
            name: '事故等级统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label: {
              show: true,
              position: 'inside',
              formatter: '{a}: {d}%',
            },
            data: _this.DJData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    '#FFA200',
                    '#0089FF',
                    '#00D0AF',
                    '#FF3A3A',
                    '#F77400',
                    '#0CCB5D',
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
    getPie() {
      this.$axios
        .post('/finance/zhiliantj', {
          xmid: this.searchId,
          userid: this.$store.state.userInfo.uid,
          month: this.qcTime,
          corp_id: this.$store.state.cid,
          proname: this.payProject,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newData = [];
            let newChar = [];
            res.data.jibie.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.jibie.length; i++) {
                obj.value = item.Gradenum;
                obj.name = item.accidentGrade;
                obj.money = item.accidenmoney;
              }
              newData.push(obj);
            });
            res.data.type.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.type.length; i++) {
                obj.value = item.typenum;
                obj.name = item.accidenttype;
                obj.money = item.accidenmoney;
              }
              newChar.push(obj);
            });
            this.DJData = newData;
            this.LXData = newChar;
            this.doPie();
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //删除基础设置
    deleteTitleClick(list, type) {
      this.$axios
        .post('/finance/UpdateJichu', {
          id: list.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            if (type == 1) {
              this.AbasicList.splice(this.AbasicList.indexOf(list), 1);
            } else if (type == 2) {
              this.BbasicList.splice(this.BbasicList.indexOf(list), 1);
            }
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取基础设置列表
    getBasicList() {
      this.$axios
        .post('/finance/JichuList', {
          status: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.AbasicList = res.data.content.a;
            this.BbasicList = res.data.content.b;
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新建基础设置
    newAddBasic() {
      this.addFormVisible = true;
    },
    titleCancel() {
      this.addFormVisible = false;
      this.basicAddForm = {
        content: '',
        type: 'a',
        status: 1,
        corp_id: this.$store.state.cid,
      };
    },
    //新建基础按钮
    titleSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/finance/CreatedJichu', _this.basicAddForm)
            .then(res => {
              if (res.data.code == 1) {
                _this.getBasicList();
                _this.loaded = false;
                _this.addFormVisible = false;
                _this.$refs[formName].resetFields();
                _this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: '2000',
                });
              } else {
                _this.loaded = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: '2000',
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
    approvalCancel(formName) {
      this.appVisible = false;
      this.loaded = false;
      this.$refs[formName].resetFields();
    },
    //新建基础按钮
    approvalSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/finance/qualityaccident')
            .then(res => {
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
              _this.appVisible = false;
              _this.loaded = false;
              _this.$refs[formName].resetFields();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          _this.loaded = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClick(tab) {
      this.currentTabName = tab.name;
      if (tab.name == 'first') {
        this.currentPage = 1;
        this.getList();
      } else if (tab.name == 'second') {
        this.getPie();
        this.getProjectList();
      } else if (tab.name == 'third') {
        this.getBasicList();
      }
    },
    lookimg(item) {
      const _this = this;
      dd.ready(function () {
        dd.biz.util.previewImage({
          urls: _this.fViewForm.image, //图片地址列表
          current: item, //当前显示的图片链接
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
      });
    },
    openViewAll() {
      this.viewAllVisible = true;
    },
    openViewSend() {
      this.viewSendVisible = true;
    },
    getInfo(id) {
      this.$axios
        .post('/task/ZhiLiangContent', { id: id })
        .then(res => {
          if (res.data.code == 1) {
            this.fViewForm = res.data.content;
            this.tagsData = this.fViewForm.spuser;
            this.tagsPeopleData = this.fViewForm.csuser;
            this.viewVisible = true;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error',
              duration: '2000',
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //同意拒绝审批操作
    viewSend(status) {
      let newJie = 1;
      if (status == 1) {
        newJie = status;
        this.loading = true;
      } else if (status == 2) {
        newJie = status;
        this.loaded = true;
      } else if (status == 3) {
        newJie = '';
        this.loadcan = true;
      }
      this.goDo(status, newJie);
    },
    viewClose() {
      this.viewVisible = false;
    },
    goDo(status, newJie) {
      const _this = this;
      _this.$axios
        .post('/task/UpdateZhiLiang', {
          id: _this.checkId,
          type: status,
          userid: _this.$store.state.userInfo.uid,
          spyijian: '',
          spjieguo: newJie,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.viewVisible = false;
            _this.getList();
            if (status == 1) {
              _this.loading = false;
              _this.$message({
                message: '已同意该审批',
                type: 'success',
                duration: '2000',
              });
            } else if (status == 2) {
              _this.loaded = false;
              _this.$message({
                message: '已拒绝该审批',
                type: 'success',
                duration: '2000',
              });
            } else if (status == 3) {
              _this.loadcan = false;
              _this.$message({
                message: '已撤销该审批',
                type: 'success',
                duration: '2000',
              });
            }
          } else {
            _this.loading = false;
            _this.loaded = false;
            _this.loadcan = false;
            _this.$message({
              message: res.data.msg,
              type: 'error',
              duration: '2000',
            });
          }
        })
        .catch(function (error) {
          _this.loading = false;
          _this.loaded = false;
          _this.loadcan = false;
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    jbChange(val) {
      this.currentPage = 1;
      this.getList();
    },
    jtypeChange(val) {
      this.currentPage = 1;
      this.getList();
    },
    bsChange(val) {
      this.currentPage = 1;
      this.getList();
    },
    schange(val) {
      this.currentPage = 1;
      this.getList();
    },
    closeDrawer(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.fDrawerForm.spuser.length > 0) {
            _this.$axios
              .post('/task/CreatedZhiLiang', _this.fDrawerForm)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getList();
                  _this.loading = false;
                  _this.drawerVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: '2000',
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'error',
                    duration: '2000',
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.$message({
              message: '请选择申请人！',
              type: 'warning',
              duration: '1500',
            });
          }
        } else {
          _this.loading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    //预览附件
    watchFiles(item) {
      const _this = this;
      _this.$axios
        .post('/dingyun/DingPanSaveFile', {
          corp_id: _this.$store.state.cid,
          type: 'download',
          fileids: item.fileId,
          userid: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.status == 1) {
            dd.ready(function () {
              dd.biz.cspace.preview({
                corpId: _this.$store.state.cid,
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
    //删除附件
    deleteFiles() {
      this.fDrawerForm.fjurl.splice(index, 1);
    },
    show(msg) {
      this.fDrawerForm.sgurl = msg;
    },
    openAllPeople() {
      this.AllPeopleVisible = true;
    },
    openSendPeople() {
      this.sendPeopleVisible = true;
    },
    handleClose(tag) {
      this.tagsData.splice(this.tagsData.indexOf(tag), 1);
      this.fDrawerForm.spuser = this.tagsData;
    },
    handleSendClose(tag) {
      this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
      this.fDrawerForm.csuser = this.tagsPeopleData;
    },
    drawClose(formName) {
      this.$refs[formName].resetFields();
      this.fDrawerForm = {
        sgtitle: '',
        xmid: this.searchId,
        fjurl: [],
        image: [],
        spuser: [],
        csuser: [],
        type: '',
        money: '',
        jibie: '',
        sgcontent: '',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
      };
      this.licenceImg = [];
      this.upImgList = [];
      this.isShow = [];
      this.drawerVisible = false;
    },
    //打开抽屉
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/finance/qualityaccident')
        .then(res => {
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
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //切换质量类型
    typeClick(item, index) {
      this.activeConIndex = index;
      this.typeId = item.value;
      this.tpListName = item.name;
      this.getList();
    },
    //获取项目列表
    getProjectList() {
      this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            this.projectList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取质量类型列表
    typeChange() {
      this.$axios
        .post('/index.php/api/dfinance/labelList')
        .then(res => {
          if (res.data.code == 1) {
            this.selectFTypeList = res.data.data.out;
            this.bankcount = res.data.data.account;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getPower() {
      const _this = this;
      _this.$axios
        .post('/dingyun/DingPanSaveFile', {
          corp_id: _this.$store.state.cid,
          type: 'add',
          fileids: '',
          userid: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.status == 1) {
            _this.$store.commit('setSpaceId', res.data.spaceid.toString());
            _this.addFilesClick();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addFilesClick() {
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
            //onSuccess将在文件上传成功之后调用
            result.data.forEach(item => {
              _this.fDrawerForm.fjurl.push(item);
            });
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {
        console.log('错误++' + err);
      });
    },
    addFiles() {
      this.getPower();
    },
    pickerSelect(arr, type) {
      const that = this;

      if (type == 1) {
        let newtap = JSON.parse(JSON.stringify(that.tagsPeopleData));
        let newtag = JSON.parse(JSON.stringify(that.tagsData));
        if (that.clickType == 1) {
          arr.forEach(item => {
            newtag.push(item);
          });
          that.tagsData = newtag;
          that.fDrawerForm.spuser = newtag;
        } else if (that.clickType == 2) {
          arr.forEach(item => {
            newtap.push(item);
          });
          that.tagsPeopleData = newtap;
          that.fDrawerForm.csuser = newtap;
        }
      }
      that.pickerVisible = false;
      that.peopleIsShow = false;
      that.$nextTick(() => {
        that.peopleIsShow = true;
      });
    },
    addManyP(type) {
      const that = this;
      that.clickType = type;
      // that.pickerVisible = true;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 99, //最大可选人数
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
            if (type == 1) {
              let newPeople = JSON.parse(JSON.stringify(that.tagsData));
              result.users.forEach(item => {
                newPeople.push(item);
              });
              newPeople = that.$utils.unique(newPeople);
              that.tagsData = newPeople;
              that.fDrawerForm.spuser = newPeople;
            } else if (type == 2) {
              let newPeople = JSON.parse(JSON.stringify(that.tagsPeopleData));
              result.users.forEach(item => {
                newPeople.push(item);
              });
              newPeople = that.$utils.unique(newPeople);
              that.tagsPeopleData = newPeople;
              that.fDrawerForm.csuser = newPeople;
            }
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
    searchinfo() {
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/zlexport', {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.path, //要下载的文件的url
                name: res.data.filename, //定义下载文件名字
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
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$axios
              .post('/finance/zldel', {
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
          message: '请先勾选要导出的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post('/finance/zhilian', {
          corp_id: this.$store.state.cid,
          accidenttype: this.payform.type,
          status: this.payform.status,
          accidentGrade: this.payform.jibie,
          content: this.payform.keyWord,
          current_page: this.currentPage,
          userid: this.$store.state.userInfo.uid,
          flow: this.payform.bstatus,
          proname: this.payform.xmid,
          num: this.pagesize,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_useri,
          lian_ying: this.formInline.lian_ying,

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
            this.total = res.data.content.total;
            this.tpList = res.data.content.list;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            if (this.isFooter == 1) {
              this.newFooter = res.data.mould_data.mould_data;
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
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg,
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
    this.$utils.checkding();
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    this.nextProject = JSON.parse(this.$store.state.allPro);
    this.basicLiuList = this.$utils.utilApprovalStatus();
    // this.getNextProject();
    this.getTitleList();
    this.getList();
  },
  created() {
      this.searList();

    this.$utils.utilAllProject();
    this.getBasicList();
  },
};
</script>

<style lang="less" scoped>
.main {
  background: #fff;
}
</style>

<style lang="less">
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
}
.main {
  .content {
    .liu-tabs {
      .el-tabs__header {
        padding: 20px;
      }
    }
  }
}
</style>
