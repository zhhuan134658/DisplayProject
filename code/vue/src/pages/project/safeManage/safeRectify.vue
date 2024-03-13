<template>
  <div id="projectQuality">
    <div class="main" style="background: inherit">
      <div class="content">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="diaryListtabs"
        >
          <el-tab-pane label="安全列表" name="first">
            <div class="header">
              <div class="headerContent">
                <el-form
                  @submit.native.prevent
                  :inline="true"
                  :model="payform"
                  label-width="120px"
                  class="demo-form-inline"
                >
                  <div class="hlBottom">
                    <el-form-item label="事故标题:" class="widths">
                      <el-input
                        placeholder="请输入标题"
                        clearable
                        v-model="payform.keyWord"
                        @keyup.enter.native="searchClick"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称:" class="widths">
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
                    <el-form-item label="安全等级:" class="widths">
                      <el-select
                        v-model="payform.jibie"
                        clearable
                        filterable
                        placeholder="请选择安全等级"
                      >
                        <el-option
                          v-for="item in AbasicList"
                          :label="item.content__value"
                          :value="item.content__value"
                          :key="item.content__value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="安全类型:" class="widths">
                      <el-select
                        v-model="payform.type"
                        clearable
                        filterable
                        placeholder="请选择安全类型"
                      >
                        <el-option
                          v-for="item in BbasicList"
                          :label="item.content__value"
                          :value="item.content__value"
                          :key="item.content__value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="审批状态:" class="widths">
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

                    <el-form-item label="申请人" class="widths">
                      <div
                        class="el-input el-input--suffix names"
                        @click="addManyP1"
                      >
                        {{ formInline.namesa }}
                      </div>
                    </el-form-item>

                    <el-form-item label="项目性质" class="widths">
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
                printTableName="anquanzhiliang"
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
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
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
              <el-button type="primary" round @click="newAddBasic()"
                >新建</el-button
              >
            </div>
            <div class="projectBasic">
              <el-collapse v-model="basicActiveNames" @change="handleChange">
                <el-collapse-item
                  title="安全事故等级"
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
                  title="安全事故类别"
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
        @close="titleCancel('addEditForm')"
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
            <el-button @click="titleCancel('addEditForm')">取消</el-button>
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
                placeholder="请选择子项目"
              >
                <el-option
                  v-for="item in noNextProject"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
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
  name: 'safeRectify',
  components: { draggable, commonTable },
  data() {
    return {
      appVisible: false,
      noNextProject: [],
      nextProject: [],
      qcTime: '',
      payProject: '',
      peopleIsShow: true,
      basicLiuList: [],
      basicStatusList: [
        // { name: '已撤销', id: 1 },
        { name: '已同意', id: 2 },
        { name: '已拒绝', id: 4 },
        { name: '审批中', id: 3 },
      ],
      pickerVisible: false,
      clickType: 1,
      pickerNum: 9,
      formInline: {
        namesa: '请选择申请人',
        send_name: '',
        send_userid: '',
        lian_ying: '',
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
      selectAddForm: {
        zid: '',
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
      basicAddForm: {
        content: '',
        type: 'a',
        status: 2,
        corp_id: this.$store.state.cid,
      },
      addFormVisible: false,
      titleBtnList: [
        { name: '安全事故等级', value: 'a' },
        { name: '安全事故类别', value: 'b' },
      ],
      AbasicList: [], //安全安全等级
      BbasicList: [], //安全安全类型
      basicActiveNames: ['1', '2'],
      activeName: 'first',
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
        xmid: '',
      },
      departmentList: [],
      projectList: [],
      selectFTypeList: [],
      tagsData: [],
      tagsPeopleData: [],
      fDrawerForm: {
        sgtitle: '',
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
      aTotalMoney: 0,
      bTotalMoney: 0,
      myArray: [],
      wFormVisible: false,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
      natureProject1: [],
    };
  },
  methods: {
    searList() {
      this.$axios.post('/spread/projectNature').then(res => {
        this.natureProject1 = res.data.data;
      });
    },
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    resetClick() {
      this.payform = {
        keyWord: '',
        type: '',
        jibie: '',
        bstatus: '',
        xmid: '',
      };
      this.formInline = {
        namesa: '请选择申请人',
        send_name: '',
        send_userid: '',
        lian_ying: '',
      };
      this.getList();
    },
    searchClick() {
      this.currentPage = 1;
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
    updateList() {
      this.getList(1);
    },
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/finance/aqexport', {
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
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: 'anquanzhiliang',
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
          name: 'anquanzhiliang',
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
    nextChange() {
      this.currentPage = 1;
      this.getList();
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
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
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
            name: '安全类型统计',
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
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
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
            name: '安全等级统计',
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
        .post('/finance/anquanzhiliantj', {
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
              duration: 2000,
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
          status: 2,
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
    titleCancel(formName) {
      this.addFormVisible = false;
      this.$refs[formName].resetFields();
      this.basicAddForm = {
        content: '',
        type: 'a',
        status: 2,
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
        } else {
          _this.loaded = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClick(tab) {
      if (tab.name == 'first') {
        this.currentPage = 1;
        this.getList();
      } else if (tab.name == 'second') {
        this.getPie();
      } else if (tab.name == 'third') {
        this.getBasicList();
      }
    },
    //查看审批
    checkCome(row) {
      dd.ready(function () {
        dd.biz.util.openSlidePanel({
          url: row.url, //打开侧边栏的url
          title: '查看安全审批', //侧边栏顶部标题
          onSuccess: function (result) {},
          onFail: function () {},
        });
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },

    //打开抽屉
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/finance/securityreport')
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
    //切换安全类型
    typeClick(item, index) {
      this.activeConIndex = index;
      this.typeId = item.value;
      this.cwListName = item.name;
      this.getList();
    },
    //获取安全类型列表
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
    searchinfo() {
      this.getList();
    },
    addManyP1() {
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
    //获取列表
    getList(ntype) {
      this.$axios
        .post('/finance/anquanzhilian', {
          corp_id: this.$store.state.cid,
          type: this.payform.type,
          status: this.payform.status,
          jibie: this.payform.jibie,
          proname: this.payform.xmid,
          sgtitle: this.payform.keyWord,
          current_page: this.currentPage,
          userid: this.$store.state.userInfo.uid,
          bstatus: this.payform.bstatus,
          num: this.pagesize,
          send_name: this.formInline.send_name,
          send_userid: this.formInline.send_userid,
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
    }, //获取子项目
    getNextProject() {
      const _this = this;
      _this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            _this.nextProject = res.data.data;
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
  },
  created() {
    this.searList();

    this.$utils.checkding();
    this.$utils.utilAllProject();
  },
  mounted() {
    this.allProjectList = JSON.parse(this.$store.state.allPro);
    this.basicLiuList = this.$utils.utilApprovalStatus();
    this.getProjectList();
    this.getNextProject();
    this.getTitleList();
    this.getList();
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
.main {
  .content {
    .liu-tabs {
      .el-tabs__header {
        padding: 20px;
      }
    }
  }
}
.names {
  border: 1px solid #dcdfe6 !important;
  padding-left: 13px;
  border-radius: 5px;
  color: #c0c9db;
}
.widths {
  width: 260px !important;
}
</style>
