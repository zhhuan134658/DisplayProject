<template>
  <div id="qualityAnalysis">
    <div class="main">
      <div class="top">
          <componenTtiles :indexs='5' :pid="pid" :pname="pname"></componenTtiles>
  
        </div>
      </div>

      <div class="centerXm">
        <div class="oneLeft">
          <div
            v-for="(item, index) in oneList"
            class="oneLeftItem"
            :key="index"
          >
            <div style="margin-left: 25px">
              <div style="width: 43px; height: 43px">
                <img
                  :src="require(`../../assets/twoImg/item4${index + 1}.png`)"
                  mode=""
                  style="width: 100%; height: 100%"
                />
              </div>
            </div>
            <div style="margin-left: 15px">
              <div>{{ item.title }}</div>
              <div style="font-weight: bold">{{ item.value || 0 }}</div>
            </div>
          </div>
        </div>

 <div class="two">
          <el-row>
            <el-col
              :span="24"
              style="width: 100%; border-radius: 10px;height:400px;"
              class="twoLeft grid-content bg-purple"
            >
              <div class="twoLeftTop">
                <el-row>
                  <el-col :span="12"
                    ><div>
                      <div class="line"></div>
                      <div style="margin-left: 8px; font-weight: bold">
                        详细情况 
                      </div>
                    </div></el-col
                  >
                  <el-col :span="12"
                    ><div style="text-align: right" @click="changeShow">
                      <img
                        src="@/assets/twoImg/bianji.png"
                        alt=""
                        style="width: 15px; height: 15px"
                      /></div
                  ></el-col>
                </el-row>
              </div>
              <div class="twoLeftBtn">
                <div class="twoLeftBtnCount">
                  <div class="left ">合同主要条款:</div>
                  <div class="right xmjj1">
                      <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.extend_first' placement="right-start">
                    <div >{{ project_situation.extend_first }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        @input="inputs"
                        placeholder=""
                        v-model="project_situation.extend_first"
                      >
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left ">结算条款:</div>
                  <div class="right xmjj1">
  <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.extend_two' placement="right-start">
                    <div >{{ project_situation.extend_two }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        @input="inputs"
                        placeholder=""
                        v-model="project_situation.extend_two"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left">付款条款:</div>
                  <div class="right xmjj1">
                                            <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.extend_three' placement="right-start">
                    <div >{{ project_situation.extend_three }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        @input="inputs"
                        placeholder=""
                        v-model="project_situation.extend_three"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left">违约条款:</div>
                  <div class="right xmjj1">
                                            <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.extend_four' placement="right-start">
                    <div >{{ project_situation.extend_four }}</div>
                    </el-tooltip>
              
                    <div v-else>
                      <el-input
                        @input="inputs"
                        placeholder=""
                        v-model="project_situation.extend_four"
                      ></el-input>
                    </div>
                  </div>
                </div>
                   
                   <div style="display:flex;">
                    <div class="twoLeftBtnCount heT">
                  <div class="left" style="width:44.5%;">签约主体:</div>
                  <div class="right xmjj1">
                    <!-- <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.construction_unit' placement="right-start">
                    <div >{{ zhuTlist.jia_unit }}</div>
                    </el-tooltip>
                  
                    <div v-else>
                      <el-input
                        @input="inputs"
                        placeholder=""
                        disabled
                        v-model="project_situation.construction_unit"
                      ></el-input>
                    </div> -->
                  </div>
                </div>
                       <div class="twoLeftBtnCount heT">
                  <div class="left" style="width:45.5%;">甲方:</div>
                  <div class="right xmjj1">
                    <el-tooltip v-if="isShow" class="item" effect="dark" :content='zhuTlist.jia_unit' placement="right-start">
                    <div >{{ zhuTlist.jia_unit }}</div>
                    </el-tooltip>
                  
                    <div v-else>
                      <el-input
                        @input="inputs"
                        disabled
                        placeholder=""
                        v-model="zhuTlist.jia_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                       <div class="twoLeftBtnCount heT">
                  <div class="left" style="width:45.5%;">乙方:</div>
                  <div class="right xmjj1">
                    <el-tooltip v-if="isShow" class="item" effect="dark" :content='zhuTlist.yi_unit' placement="right-start">
                    <div >{{ zhuTlist.yi_unit }}</div>
                    </el-tooltip>
                  
                    <div v-else>
                      <el-input
                        @input="inputs"
                        placeholder=""
                        disabled
                        v-model="zhuTlist.yi_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                </div>       


                <div class="" style="display:flex;">
                <div class="twoLeftBtnCount heTs">
                  <div class="left" style="width:25.3%;">签约时间:</div>
                  <div class="right xmjj1">
                                            <el-tooltip v-if="isShow" class="item" effect="dark" :content='zhuTlist.riqi' placement="right-start">
                    <div >{{ zhuTlist.riqi }}</div>
                    </el-tooltip>
                    <div v-else> 
                      <el-input
                        @input="inputs"
                        disabled
                        placeholder=""
                        v-model="zhuTlist.riqi"
                      ></el-input>
                    </div>
                  </div>
                </div>
                 <div class="twoLeftBtnCount heTs">
                  <div class="left" style="width:25.5%;">工期:</div>
                  <div class="right xmjj1">
        <el-tooltip v-if="isShow" class="item" effect="dark" :content='zhuTlist.plan_period' placement="right-start">
                    <div >{{ zhuTlist.plan_period }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        @input="inputs"
                        disabled
                        placeholder=""
                        v-model="zhuTlist.plan_period"
                      ></el-input>
                    </div>
                  </div>
                </div>
                </div>
               
              </div>
            </el-col>
      
          </el-row>
        </div>
        <div class="centerTwo">
          <div style="position: relative">
            <div class="line"></div>
            <div style="margin-left: 8px; font-weight: bold">工程回款数据分析</div>
          </div>
          <div class="centerTwoChan">
            <div>
              <span
                v-for="(item, index) in changList"
                @click="changeTwo(item.title,index)"
                :key="index"
                class="child"
                :class="[index == fxindex ? 'childCh' : '']"
                :style="{borderRight:(index==0?'none':'')}"

              >
                {{ item.title }}
              </span>
            </div>

            <div style="display:flex;align-items:center;">
              <div style="display:flex;align-items:center;">
                <div class="orange"></div>
              <div class="right" style="margin-right: 10px">回款金额</div>
              </div>
              <div style="display:flex;align-items:center;">
                <div class="orange" style="background: #3296fa"></div>
              <div class="right">签证金额</div>
              </div>
            </div>

          </div>

          <div class="three" style="padding:0">
            <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
            <div>
              <el-row>
                <el-col :span="3">
                  <div class="countLeft" style="border-right:1px solid #ebeef5">
                    <div class="child"><span>指标/月份</span></div>
                    <div class="child"><span>回款金额</span></div>
                    <div class="child"><span>签证金额</span></div>
                    <div class="child"><span>累计回款占合同比</span></div>
                  </div>
                </el-col>
                <el-col :span="21"
                  >
                 
                  <div v-if="tableData.length==0" style="margin-left:500px;">
                       <img
                        src="@/assets/twoImg/bianji1.png"
                        alt=""
                        style="width: 156px; height: 125px"
                      />
                      <div>暂时还没有数据哦~快去添加</div>
                  </div>
                    <div style="overflow-x:auto;width:100%;white-space: nowrap;" v-else>
                <div v-for="(item,index) in tableData" :key="index" class="countLeft" style="background-color:#F8F9FB;border-right:1px solid #ebeef5;display: inline-block;width:240px;">
                    <div class="child"> {{item.month || 0}}</div>
                    <div class="child">{{item.contract_collection_money || 0}}</div>
                    <div class="child">{{item.income_visa_money || 0}}</div>
                    <div class="child">{{item.lj_return_bi || 0}}</div>
                            </div>
                  </div>
                  </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div class="centerTwo">
          <div style="position: relative">
            <div class="line"></div>
            <div style="margin-left: 8px; font-weight: bold">收入结算数据分析</div>
          </div>
          <div class="centerTwoChan">
            <div>
              <span
                v-for="(item, index) in changListTwo"
                @click="changeTwo1(item.title,index)"
                :key="index"
                class="child"
                :class="[index == fxindex1 ? 'childCh' : '']"
                :style="{borderRight:(index==0?'none':'')}"
              >
                {{ item.title }}
              </span>
            </div>

              <div style="display:flex;align-items:center;">
              <div style="display:flex;align-items:center;">
                <div class="orange" ></div>
              <div class="right" style="margin-right: 10px">结算金额</div>
              </div>
              <div style="display:flex;align-items:center;">
                <div class="orange" style="background: #3296fa"></div>
              <div class="right">累计结算占合同比</div>
              </div>
            </div>
          </div>

          <div class="three" style="padding:0">
            <div
              id="myChartTwo"
              :style="{ width: '100%', height: '300px' }"
            ></div>
            <div>
              <el-row>
                <el-col :span="3">
                  <div class="countLeft">
                    <div class="child"><span>指标/月份</span></div>
                    <div class="child"><span>结算金额</span></div>
                    <div class="child"><span>累计结算占合同比</span></div>
                  </div>
                </el-col>
                  <el-col :span="21"
                  >
                     <div v-if="tableData1.length==0" style="margin-left:500px;">
                       <img
                        src="@/assets/twoImg/bianji1.png"
                        alt=""
                        style="width: 156px; height: 125px"
                      />
                      <div>暂时还没有数据哦~快去添加</div>
                  </div>

                             <div style="overflow-x:auto;width:100%;white-space: nowrap;" v-else>
                        <div v-for="(item,index) in tableData1" :key="index" class="countLeft" style="background-color:#F8F9FB;border-right:1px solid #ebeef5;display: inline-block;width:240px;">
                    <div class="child"> {{item.month || 0}}</div>
                    <div class="child">{{item.sett_output || 0}}</div>
                    <div class="child">{{item.lj_sett_bi || 0}}</div>
                            </div>
                  </div>
                  </el-col>
              </el-row>
            </div>
          </div>
        </div>


  <div class="three">
          <el-row class="threeOne">
            <el-col :span="24">
              <div class="twoLeftTop">
                <el-row>
                  <el-col :span="12"
                    ><div>
                      <div class="line"></div>
                      <div style="margin-left: 8px; font-weight: bold">
                        合同变更记录
                      </div>
                    </div></el-col
                  >
                </el-row>
              </div>
            </el-col>
          </el-row>
         <commonTable
          :tpList="tpList"
          :titleList="titleList"
          :footerNumList="footerNumList"
          :isFooter="isFooter"
          @listenChild="getMult"
          :istwo='true'
          printTableName="income_contract_change_visa"
        ></commonTable>

          <el-row class="threeSan">
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
          </el-row>
        </div>
       
      </div>


        <el-dialog 
      :title="newDialogTitle1"
      :visible.sync="dialogFormVisibleTwo"
      width="80%"
      @close="editCancelTwo('kanBanForm')"
    >
      <div style="padding-bottom: 100px">
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="kanBan"
          label-width="120px"
          class="demo-form-inline"
          :rules="aufRules1"
          ref='kanBanForm'
        >
          <div class="hlBottom" style="margin: autol">
            <el-form-item label="标题" prop="title" class="dRemarkList">
              <el-input
                v-model="kanBan.title"
                placeholder="请输入标题"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="作者"
              prop="author"
              class="dRemarkList"
              style="display: block"
            >
              <el-input
                v-model="kanBan.author"
                placeholder="请输入作者"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="正文"
              prop="content"
              class="dRemarkList"
              style="display: flex;"
            >
              <div>
                <!-- <quill-editor
                  v-model="kanBan.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  style="height: 200px"
                >
                </quill-editor> -->
      <!-- <qul-editor @func="func" ref="child" :contents='kanBan.content'></qul-editor> -->


      <qul-editor @func="func" ref="child" :contents='kanBan.content'></qul-editor>

              </div>
            </el-form-item>

                  <el-form-item class="dRemarkList" label="附件："  style="margin:90px 0 0 35px;">
                <div @click="addFilesClick(3)" class="addWen">
                  添加文件
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in kanBan.extend_five"
                    :key="index"
                  >
                    <div style="display: flex;align-items:center;">
                      <div style="display: flex; width: 300px">
                        <div class="fileIcon">
                          <!-- <i class="el-icon-document"></i> -->
                          <!-- <img
                            src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png"
                            alt=""
                            style="width: 50px; height: 50px;margin:right:10px"
                          /> -->
                          <img
                            :src="imgData(item.fileName)"
                            mode=""
                            style="width: 50px; height: 50px;margin:10px 10px 10px 0"
                          ></img>
                        </div>
                        <div class="filesTitle">
                          <div class="yichu">
                            {{ item.fileName }}
                          </div>
                          <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                        </div>
                      </div>
                      <div style="display: flex">
                        <div
                          class="watchBtn"
                          @click="watchFiles(item)"
                          style="width: 55px;color:skyblue"
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancelTwo('kanBanForm')">取 消</el-button>
        <el-button type="primary" @click="addKanban('kanBanForm')">确 定</el-button>
      </span>
    </el-dialog>

              <!-- 穿透 -->
    <el-dialog :title="titleData" width="80%" :visible.sync="viewVisible">
      <pierceTable
        :tableList="tableList"
        :key="pierceTableid"
        :titleName="titleName"
        :taPLoading="taPLoading"
        :proName="proName"
      ></pierceTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewVisible = false">取 消</el-button>
        <el-button type="primary" @click="viewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>


  </div>
</template>
<script>
import componenTtiles from './componenTtiles.vue';
import pierceTable from '@/components/Piercethrough/pierceTable.vue';
import commonTable from '@/components/commonTable.vue';

import qulEditor from './quEditor'; //富文本编辑器组件的路径

export default {
  name: 'qualityAnalysis',
  components: { componenTtiles, pierceTable, qulEditor, commonTable },
  data() {
    return {
      indexs: 1,
      fxindex: 0,
      fxindex1: 0,
      tpList: [],
      titleList: [],
      footerNumList: [],
      fxindex2: 0,
      isFooter: 0,
      pid: '',
      name: '',
      pname: '',
      pagesize: 10,
      currentPage: 1,
      total: 0,
      newDialogTitle1: '新增变更记录',
      dialogFormVisibleTwo: false,
      dialogFormVisibleTwo1: false,
      aufRules1: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: ['blur', 'change'],
          },
        ],
        author: [
          {
            required: true,
            message: '请输入作者',
            trigger: ['blur', 'change'],
          },
        ],
        content: [
          {
            required: true,
            message: '请输入内容',
            trigger: ['blur', 'change'],
          },
        ],
      },
      titleData: '',
      tableList: [], //穿透
      titleName: [], //穿透
      proName: '', //穿透
      totalMoney: '', //穿透
      taPLoading: false, //穿透
      viewVisible: false, //穿透
      pierceTableid: +new Date(),

      titlesList: [
        { name: '项目简介' },
        { name: '质量分析' },
        { name: '安全分析' },
        { name: '进度分析' },
        { name: '成本分析' },
        { name: '收入分析' },
        { name: '支出分析' },
        { name: '税务分析' },
        { name: '材料分析' },
        { name: '劳务分析' },
        { name: '专业分包分析' },
        { name: '机械租赁分析' },
        { name: '间接费分析' },
        { name: '经营分析' },
        { name: '风险管理' },
        { name: '项目排行榜' },
      ],
      tableData: [],
      tableData1: [],
      isShow: true,
      project_situation: {
        id: '', //详细情况id
        extend_first: '', //合同主要条款
        extend_two: '', //结算条款
        extend_three: '', //付款条款
        extend_four: '', //违约条款
        project_id: '',
        project_name: '',
      },
      tableDatas: [],
      threeList: [],
      zhuTlist: '',
      kanBan: {
        id: '', //项目大事记id
        title: '',
        author: '',
        content: '',
        created: '',
        extend_first: '',
        project_id: '',
        project_name: '',
        extend_five: [],
      },
      oneList: [
        { title: '合同金额(元)', value: '' },
        { title: '履约保证金(元)', value: '' },
        { title: '质保金(元)', value: '' },
        { title: '签约人', value: '' },
        { title: '签证金额(元)', value: '' },
        { title: '签证占比', value: '' },
        { title: '结算产值(元)', value: '' },
        { title: '累计回款(元)', value: '' },
        { title: '甲方欠款', value: '' },
        { title: '回款比率(元)', value: '' },
      ],
      changList: [
        { title: '2022年' },
        { title: '2021年' },
        { title: '2020年' },
      ],
      changListTwo: [
        { title: '2022年' },
        { title: '2021年' },
        { title: '2020年' },
      ],
      changListThree: [{ title: '整改数量' }, { title: '按经济损失' }],
    };
  },
  methods: {
    getMult(val) {
      this.multSelectData = val;
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: 'income_contract_change_visa',
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
    getList(ntype) {
      console.log('getListgetList');
      this.$axios
        .post('/project/incomeContractChangeVisaList', {
          page: this.currentPage,
          number: this.pagesize,
          shenpi: '7',
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
              this.currentPage = res.data.page_number;
              this.getList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    inputs(e) {
      //详情信息更改
      //   console.log(this.project_situation);
      //   this.project_situation.project_id = this.pid;
      //   this.project_situation.project_name = this.pname;
      //   this.$axios
      //     .post('/bulletin/incomeClauseAdd', this.project_situation)
      //     .then(res => {
      //       if (res.data.code == 1) {
      //       } else {
      //         this.$message({
      //           title: '提示',
      //           message: res.data.msg,
      //           type: 'error',
      //           duration: 1500,
      //         });
      //       }
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    func(e) {
      this.kanBan1.content = e;
      this.kanBan.content = e;
    },
    showDetails(row) {
      this.dialogFormVisibleTwo2 = true;
      row.content = row.content.replace(
        /\<img/gi,
        '<img style="width:50%;height:auto;margin-left:33%" ',
      );
      this.kanBan = row;
    },
    changeShow() {
      this.isShow = !this.isShow;
      console.log(this.project_situation);
      if (this.isShow) {
        this.project_situation.project_id = this.pid;
        this.project_situation.project_name = this.pname;
        this.$axios
          .post('/bulletin/incomeClauseAdd', this.project_situation)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: 'success',
                duration: 1500,
              });
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
      }
    },
    showCt(row) {
      this.getpierceList(row);
      this.viewVisible = true;
      // this.titleData = row.unit;
      this.proName = `${'项目名称:' + this.pname}`;
      // this.totalMoney = `${'收入合同总额:' + row.revenue_money}`;
    },
    //获取穿透dialog里所有数据
    getpierceList(row) {
      console.log(row);
      this.$axios
        .post('/newtao/projectKanWangUnit', {
          biao_shi: 'wang_unit',
          project_name: this.pname,
          supplier: row.unit,
        })
        .then(res => {
          let onenewArr = [
            'collection_money',
            'other_collection_money',
            'other_fk',
            'reimbursement',
          ];
          let twonewArr = [''];
          this.tableList = [
            res.data.lease,
            res.data.material_ht,
            res.data.material_order,
            res.data.service,
            res.data.sub,
          ];
        });
      this.viewVisible = true; //控制dialog显示
      this.taPLoading = false;
    },

    //收入结算数据分析列表
    getDTList(row) {
      this.$axios
        .post('/bulletin/incomeRevenueSettlement', {
          project_id: this.pid,
          project_name: this.pname,
          year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data;
            this.$nextTick(() => {
              this.drawLine1();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //上方信息
    getLInfo() {
      const _this = this;

      _this.$axios
        .post('/bulletin/incomeInfo', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.contract_money;
            _this.oneList[1].value = res.data.data.income_bond_money;
            _this.oneList[2].value = res.data.data.income_warranty_money;
            _this.oneList[3].value = res.data.data.contract_signer;
            _this.oneList[4].value = res.data.data.income_visa_money;
            _this.oneList[5].value = res.data.data.visa_bi;
            _this.oneList[6].value = res.data.data.sett_output;
            _this.oneList[7].value = res.data.data.contract_collection_money;
            _this.oneList[8].value = res.data.data.jia_arrears;
            _this.oneList[9].value = res.data.data.payment_bi;
            _this.zhuTlist = res.data.data;
            _this.project_situation.extend_first = res.data.data.extend_first;
            _this.project_situation.extend_two = res.data.data.extend_two;
            _this.project_situation.extend_three = res.data.data.extend_three;
            _this.project_situation.extend_four = res.data.data.extend_four;
            _this.project_situation.id = res.data.data.project_situation_id;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    changeTwo(item, e) {
      this.fxindex = e;
      let row = item.slice(0, item.length - 1);
      this.wenti(row);
    },
    changeTwo1(item, e) {
      this.fxindex1 = e;
      let row = item.slice(0, item.length - 1);
      this.getDTList(row);
    },
    changeTwo2(e) {
      this.fxindex2 = e;
      this.getList(e + 1);
    },
    data2() {
      let res = [];
      let len = 0;
      while (len < 10) {
        res.push(+(Math.random() * 500 + 5).toFixed(2));
        len++;
      }
      return res;
    },
    //工程回款数据列表
    wenti(row) {
      this.$axios
        .post('/bulletin/incomeReturnMoney', {
          project_id: this.pid,
          project_name: this.pname,
          year: row,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
            console.log(res.data.data, '------');
            this.$nextTick(() => {
              this.drawLine();
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      let heLit = [];
      this.tableData.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.contract_collection_money);
        textLit.push(e.income_visa_money);
        heLit.push(e.lj_return_bi);
      });
      console.log(countLit,"countLit")
      let isShow1 = true;
      let n1 = 0
      countLit.map((e,index)=>{
        if(e>10){
          n1++  
        }
        if(n1>0){
            isShow1 = true
          }else{
          isShow1 = false
        }
      })
      let isShow2 = true;
      let n2 = 0
      textLit.map((e,index)=>{
        if(e>10){
          n2++  
        }
        if(n2>0){
            isShow2 = true
          }else{
          isShow2 = false
        }
      })
      
      // let zoomShow = false;
      // if (nameLit.length >=6) {
      //   zoomShow = true;
      // } else {
      //   zoomShow = false;
      // }
      var start = this.tableData.length - 6;
      var end = this.tableData.length - 1;
      let newObj1 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '10',
          subtext: '单位:元', //---副标题内容样式
          subtextStyle: {
            color: '#bbb',
            fontSize: 12,
          },
          padding: [0, 0, 20, 0],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
          //   show: false,
        },
        dataZoom: [
          {
            start: 0, //默认为0
            end: 100 - 1500 / 41, //默认为100
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            handleSize: 0, //滑动条的 左右2个滑动条的大小
            height: 26, //组件高度
            left: '0%', //左边的距离
            right: '0%', //右边的距离
            bottom: 26, //右边的距离
            startValue: start, // 重点在这   -- 开始的值
            endValue: end, // 重点在这   -- 结束的值
            borderColor: 'none',
            fillerColor: '#E0E0E0',
            borderRadius: 5,
            backgroundColor: '#F1F1F1', //两边未选中的滑动条区域的颜色
            showDataShadow: false, //是否显示数据阴影 默认auto
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
            realtime: true, //是否实时更新
            filterMode: 'filter',
            y: 278,
          },
          {
            zoomLock: true, // 这个开启之后只能通过鼠标左右拉动，不能滚动显示
            type: 'inside',
          },
        ],
        legend: {
          data: ['意向', '预购', '成交'],
        },
        xAxis: [
          {
            type: 'category',
            data: nameLit,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            name: '',
            type: 'value',

            // minInterval:1,
            // min: 0,
           max: (isShow1||isShow2) ? null:10,
            //interval: 100,
            axisLine: {
              show: true,
              lineStyle: {
                //lineStyle里面写y轴那一条线的样式
                color: '#BBB',
                width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
              },
            },

            // boundaryGap : [ 0.2, 0.2 ],
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: '{value}',
              margin: 30,
            },
            postition: 'left',
            offset: 5,
          },
        ],
        series: [
          {
            name: '回款金额',
            type: 'bar',
            barWidth: '50',
            barCategoryGap: '20%',
            data: countLit,
            itemStyle: {
              color: '#FCB224',
              barBorderRadius: [5, 5, 0, 0],
            },
          },
          {
            name: '签证金额',
            type: 'line',
            data: textLit,
            smooth: true,
            itemStyle: {
              color: '#3296FA',
              barBorderRadius: [18, 18, 8, 8],
            },
            symbolSize: 7,
            colorBy: 'series',
          },
        ],
      };
      if (this.tableData.length <= 8) {
        newObj1.dataZoom = '';
      } else {
        newObj1.dataZoom = newObj1.dataZoom;
      }
      // 绘制图表
      myChart.setOption(newObj1);

      //   myChartTwo.setOption({
      //     title: {
      //       //   text: '单位:万户',
      //       //   textStyle: {
      //       //     //---主标题内容样式
      //       //     color: '#fff',
      //       //     fontSize: 18,
      //       //   },
      //       //   left: '50',
      //       //   top: '20',
      //       //   subtext: '副标题', //---副标题内容样式
      //       //   subtextStyle: {
      //       //     color: '#bbb',
      //       //     fontSize: 14,
      //       //   },
      //       //   padding: [0, 0, 20, 0],
      //     },
      //     tooltip: {
      //       trigger: 'axis',
      //       axisPointer: {
      //         type: 'shadow',
      //       },
      //     },
      //     grid: {
      //       left: '3%',
      //       right: '4%',
      //       bottom: '3%',
      //       containLabel: true,
      //       show: false,
      //     },
      //     dataZoom: {
      //       show: true,
      //       realtime: true,
      //       y: 280,
      //       height: 20,
      //       start: 20,
      //       end: 100,
      //       zoomLock: true,
      //     },
      //     legend: {
      //       data: ['意向', '预购', '成交'],
      //     },
      //     xAxis: [
      //       {
      //         type: 'category',
      //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLine: {
      //           show: false,
      //         },
      //       },
      //     ],
      //     yAxis: [
      //       {
      //         name: '单位:条',
      //         type: 'value',
      //         min: 0,
      //         max: 500,
      //         //interval: 100,

      //         axisLine: {
      //           show: false,
      //         },
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLabel: {
      //           formatter: '{value}',
      //         },
      //         postition: 'left',
      //         offset: 25,
      //       },
      //       {
      //         name: '单位:元',
      //         // nameLocation: 'start',
      //         alignTicks: true,
      //         type: 'value',
      //         // inverse: true,
      //         min: 0,
      //         max: 500,
      //         //interval: 100,
      //         axisLine: {
      //           show: false,
      //         },
      //         axisTick: {
      //           show: false,
      //         },
      //         axisLabel: {
      //           formatter: '{value}',
      //         },
      //         offset: 25,
      //       },
      //     ],
      //     series: [
      //       {
      //         name: '销量555',
      //         type: 'bar',
      //         barWidth: '50',
      //         barCategoryGap: '20%',

      //         data: [10, 52, 200, 334, 390, 330, 220],
      //         itemStyle: {
      //           color: '#515CC5',
      //           barBorderRadius: [5, 5, 0, 0],
      //         },
      //       },
      //       {
      //         name: 'Dynamic Line',
      //         type: 'line',
      //         data: this.data2(),
      //         smooth: true,
      //         itemStyle: {
      //           color: '#3296FA',
      //           barBorderRadius: [18, 18, 8, 8],
      //         },
      //         symbolSize: 7,
      //         colorBy: 'series',
      //       },
      //     ],
      //   });
    },
    addShow1() {
      this.dialogFormVisibleTwo = true;
      this.newDialogTitle1 = '新增变更记录';
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo'),
      );
      let nameLit = [];
      let countLit = [];
      let textLit = [];
      this.tableData1.forEach(e => {
        nameLit.push(e.month);
        countLit.push(e.sett_output);
        textLit.push(e.lj_sett_bi);
      });
      let isShow1 = true;
      let n1 = 0
      countLit.map((e,index)=>{
        if(e>10){
          n1++  
        }
        if(n1>0){
            isShow1 = true
          }else{
          isShow1 = false
        }
      })
      console.log(isShow1,"ppp")

      // console.log(isShow,'isShowisShow')
      console.log(countLit,textLit,'countLitcountLit------')
      var start = this.tableData1.length - 6;
      var end = this.tableData1.length - 1;
      let newObj2 = {
        title: {
          // text: '单位:万户',
          // textStyle: {
          //   //---主标题内容样式
          //   color: '#fff',
          //   fontSize: 18,
          // },
          left: '30',
          top: '22',
          subtext: '单位:元', //---副标题内容样式
          subtextStyle: {
            color: '#bbb',
            fontSize: 12,
          },
          padding: [0, 0, 20, 0],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
          //   show: false,
        },
        dataZoom: [
          {
            start: 0, //默认为0
            end: 100 - 1500 / 41, //默认为100
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            handleSize: 0, //滑动条的 左右2个滑动条的大小
            height: 26, //组件高度
            left: '0%', //左边的距离
            right: '0%', //右边的距离
            bottom: 26, //右边的距离
            borderColor: 'none',
            fillerColor: '#E0E0E0',
            startValue: start, // 重点在这   -- 开始的值
            endValue: end, // 重点在这   -- 结束的值
            borderRadius: 5,
            backgroundColor: '#F1F1F1', //两边未选中的滑动条区域的颜色
            showDataShadow: false, //是否显示数据阴影 默认auto
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
            realtime: true, //是否实时更新
            filterMode: 'filter',
            y: 278,
          },
          {
            zoomLock: true, // 这个开启之后只能通过鼠标左右拉动，不能滚动显示
            type: 'inside',
          },
        ],
        legend: {
          data: ['意向', '预购', '成交'],
        },
        xAxis: [
          {
            type: 'category',
            data: nameLit,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            name: '',
            type: 'value',
            // minInterval:isShow = false ? 1 : '',
            // min: 0,
            max: isShow1 ? null:10,
            //interval: 100,
            axisLine: {
              show: true,
              lineStyle: {
                //lineStyle里面写y轴那一条线的样式
                color: '#BBB',
                width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
              },
            },

            // boundaryGap : [ 0.2, 0.2 ],
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: '{value}',
              margin: 30,
            },
            postition: 'left',
            offset: 5,
          },
          {
            // name: '单位:元',
            // nameLocation: 'start',
            alignTicks: false,
            type: 'value',
            // inverse: true,
            // min: 0,
            // max: 10,
            //interval: 100,
            axisLine: {
              show: false,
              lineStyle: {
                //lineStyle里面写y轴那一条线的样式
                // color: '#BBB',
                // width: 1, //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
              },
            },
            axisTick: {
              show: false,
            },

            axisLabel: {
              formatter: '{value}',
            },
            offset: 25,
          },
        ],
        series: [
          {
            name: '结算金额',
            type: 'bar',
            barWidth: '50',
            barCategoryGap: '20%',
            data:countLit ,
            itemStyle: {
              color: '#FDB223',
              barBorderRadius: [5, 5, 0, 0],
            },
          },
          {
            name: '累计结算占合同比',
            type: 'line',
            data: textLit,
            smooth: true,
            itemStyle: {
              color: '#3296FA',
              barBorderRadius: [18, 18, 8, 8],
            },
            symbolSize: 7,
            colorBy: 'series',
          },
        ],
      };
      if (this.tableData1.length <= 8) {
        newObj2.dataZoom = '';
      } else {
        newObj2.dataZoom = newObj2.dataZoom;
      }
      myChartTwo.setOption(newObj2);
    },
    resCharts() {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let myChartTwo = this.$echarts.init(
        document.getElementById('myChartTwo'),
      );
      myChart.resize();
      myChartTwo.resize();
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getLInfo();
    this.wenti('1');
    this.getDTList('1');
    this.getTitleList();
    window.addEventListener('resize', () => {
      this.resCharts();
    });
  },
};
</script>
<style scoped lang='scss'>
.line {
  width: 3px;
  height: 15px;
  background: #ff275a;
  position: absolute;
  top: 4px;
  left: 0;
}
#qualityAnalysis {
  background: url('../../assets/twoImg/bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 80px;
}
.page {
  text-align: center;
  margin-top: 11px;
}
.two {
  .line {
    width: 3px;
    height: 15px;
    background: #ff275a;
    position: absolute;
    top: 4px;
    left: 0;
  }
  margin-top: 20px;
  .twoLeft {
    background-color: white;
    padding: 15px;

    .twoLeftBtn {
      border: 1px solid #ebeef5;
      margin-top: 20px;
      background-color: #f8f9fb;
      .twoLeftBtnCount {
        display: flex;
        .xmjj {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
        .xmjj1 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .left {
          width: 11%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #333333;
        }
        .right {
          width: 89%;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ebeef5;
          padding-left: 20px;
          background-color: white;
          color: #666666;
        }
      }
      .heT {
        width: 33.3%;
      }
      .heTs {
        width: 50%;
      }
    }
  }
  .twoRight {
    background-color: white;

    height: 467px;
    padding: 15px;
  }
}
.centerXm {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  margin-top: 20px;
  border-radius: 10px;
  .oneLeft {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    .oneLeftItem {
      display: flex;
      //   justify-content: space-evenly;
      width: 19%;
      background-color: white;
      border-radius: 10px;
      align-items: center;
      padding: 15px 0;
      margin-top: 10px;
      font-size: 16px;
      margin-left: 0;
    }
    .oneBton {
      width: 66%;
    }
  }
  .centerTwo {
    background-color: white;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    .centerTwoChan {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      .child {
        width: 150px;
        height: 28px;
        border: 1px solid #d8e0e6;
        text-align: center;
        line-height: 26px;
        border-bottom: none;
        display: inline-block;
      }
      .childCh {
        color: white;
        background-color: #0189fe;
        border: 1px solid #0189fe;
      }
      .orange {
        width: 8px;
        height: 13px;
        background: #fcb224;
        border-radius: 3px;
        display: inline-block;
        margin: 0px 4px 0 0;
      }
      .right {
        color: #999999;
        font-size: 14px;
      }
    }
    .three {
      border: 1px solid #d8e0e6;
      width: 100%;
      .countLeft {
        .child {
          height: 49px;
          text-align: center;
          line-height: 50px;
          border-top: 1px solid #ebeef5;
          background-color: #f8f9fb;
        }
      }
    }
    .line {
      width: 3px;
      height: 15px;
      background: #ff275a;
      position: absolute;
      top: 4px;
      left: 0;
    }
  }
}
.three {
  margin-top: 17px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  .threeTwo {
    border: 1px solid #ebeef5;
    margin-top: 15px;
    .threeTwoS {
      .item {
        padding: 20px;
        border-bottom: 1px solid #ebeef5;
      }
      .zhiding {
        width: 50px;
        height: 20px;
        background-color: #ff3922;
        color: white;
        text-align: center;
        margin-right: 5px;
        display: inline-block;
        border-radius: 20px;
        line-height: 20px;
      }
      .threeVlue {
        width: 98%;
        height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        margin-top: 10px;
      }
      .threeInfo {
        color: #999999;
        font-size: 12px;
        .riqi {
          margin: 5px 10px;
        }
        .lines {
          position: relative;
          top: -1px;
          left: 5px;
        }
      }
    }
  }
  .threeSan {
    .page {
      text-align: center;
      margin-top: 11px;
    }
  }
}
</style>