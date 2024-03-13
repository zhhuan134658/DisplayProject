<template>
  <div id="taskMould">
    <div class="main">
      <div class="content">
        <!-- <div class="content_header">
                    <div class="headerTitle">
                      <div class="span"></div>
                      <div class="text">发起任务</div>
                    </div>
                    <div class="headerContent">
                        <div class="headerHover" @click="viewDialog">
                            <div class="bigWord">文档任务</div>
                            <div class="smallWord">公共模板</div>
                        </div>
                        <div class="headerHover" @click="sendNormal">
                            <div class="bigWord">普通任务</div>
                            <div class="smallWord">简易模板</div>
                        </div>
                    </div>
                </div> -->
        <div class="top">
          <div class="post">
            <div class="title">
              <div class="span"></div>
              <div class="text">发起审批</div>
            </div>
            <div class="cards">
              <div class="item" @click="viewDialog">
                <div class="info">
                  <div class="label show">文档任务</div>
                  <div class="label hidde">公共模板</div>
                  <div class="desc">
                    查看详情<i class="el-icon-arrow-right" />
                  </div>
                </div>
                <div class="img">
                  <img src="@/assets/images/task-top-card1.png" />
                </div>
              </div>
              <div class="item" @click="sendNormal">
                <div class="info">
                  <div class="label show">普通任务</div>
                  <div class="label hidde">简易模板</div>
                  <div class="desc">
                    查看详情<i class="el-icon-arrow-right" />
                  </div>
                </div>
                <div class="img">
                  <img src="@/assets/images/task-top-card2.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="approval">
            <div class="title">
              <div class="span"></div>
              <div class="text">审批流程</div>
            </div>
            <div class="cards">
              <div class="item" @click="goList('1')">
                <div class="content">
                  <div class="img">
                    <img src="@/assets/images/task-approval-1.png" />
                  </div>
                  <div class="num">
                    <CountUp :value="dzxtask"></CountUp>
                  </div>
                  <div class="label">审批中</div>
                </div>
              </div>
              <div class="item" @click="goList('2')">
                <div class="content">
                  <div class="img">
                    <img src="@/assets/images/task-approval-2.png" />
                  </div>
                  <div class="num">
                    <CountUp :value="yzxtask"></CountUp>
                  </div>
                  <div class="label">归档中</div>
                </div>
              </div>
              <div class="item" @click="goList('3')">
                <div class="content">
                  <div class="img">
                    <img src="@/assets/images/task-approval-3.png" />
                  </div>
                  <div class="num">
                    <CountUp :value="ygdtask"></CountUp>
                  </div>
                  <div class="label">已完结</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="content_header tmBottom">
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '1' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ dzxtask }}</div>
                            <div class="headline">待执行任务</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '4' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ wcjtask }}</div>
                            <div class="headline">我创建任务</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '5' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ cstask }}</div>
                            <div class="headline">抄送我的</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '2' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ yzxtask }}</div>
                            <div class="headline">已执行任务</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '3' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ ygdtask }}</div>
                            <div class="headline">已归档任务</div>
                        </div>
                    </router-link>
                </div> -->
        <div class="task-types">
          <div class="title">
            <div class="span"></div>
            <div class="text">任务类别</div>
          </div>
          <div class="types">
            <div class="item" @click="jumpTask(1)">
              <div class="img">
                <img src="@/assets/images/task-type-1.png" />
              </div>
              <div class="info">
                <div class="label">待执行任务</div>
                <div class="num">
                  <CountUp :value="dzxtask"></CountUp>
                </div>
              </div>
            </div>
            <div class="item" @click="jumpTask(4)">
              <div class="img">
                <img src="@/assets/images/task-type-2.png" />
              </div>
              <div class="info">
                <div class="label">我创建任务</div>
                <div class="num">
                  <CountUp :value="wcjtask"></CountUp>
                </div>
              </div>
            </div>
            <div class="item" @click="jumpTask(5)">
              <div class="img">
                <img src="@/assets/images/task-type-3.png" />
              </div>
              <div class="info">
                <div class="label">抄送我的</div>
                <div class="num">
                  <CountUp :value="cstask"></CountUp>
                </div>
              </div>
            </div>
            <div class="item" @click="jumpTask(2)">
              <div class="img">
                <img src="@/assets/images/task-type-4.png" />
              </div>
              <div class="info">
                <div class="label">已执行任务</div>
                <div class="num">
                  <CountUp :value="yzxtask"></CountUp>
                </div>
              </div>
            </div>
            <div class="item" @click="jumpTask(3)">
              <div class="img">
                <img src="@/assets/images/task-type-5.png" />
              </div>
              <div class="info">
                <div class="label">已归档任务</div>
                <div class="num">
                  <CountUp :value="ygdtask"></CountUp>
                </div>
              </div>
            </div>
            <div class="item" style="background: #fff"></div>
            <div class="item" style="background: #fff"></div>
            <div class="item" style="background: #fff"></div>
          </div>
        </div>
      </div>
      <el-dialog
        title="选择模板"
        :visible.sync="viewMould"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
        width="1085px"
      >
        <div class="viewMould">
          <div v-if="taskMouldList.length < 1">暂无数据</div>
          <div v-else>
            <!-- <div class="searchMlist">
                            <div
                                v-if="taskMouldList.length > 0"
                                v-for="(item, index) in taskMouldList"
                                @click="sendMould(item)"
                            >
                                <div>
                                    <img :src="item.tmpimg" alt="" />
                                    <span>发起审批</span>
                                </div>
                                <p>{{ item.tmpname }}</p>
                            </div>
                        </div> -->
            <div class="templates">
              <template v-for="(item, index) in taskMouldList">
                <div class="item" @click="sendMould(item)">
                  <div class="a">
                    <div class="img">
                      <img :src="item.tmpimg" />
                    </div>
                    <div class="label">
                      {{ item.tmpname }}
                    </div>
                  </div>
                  <div class="b">
                    <div class="label">发起审批</div>
                  </div>
                </div>
              </template>
              <div class="item" style="border: 0px">
                <div style="width: 240px"></div>
              </div>
              <div class="item" style="border: 0px">
                <div style="width: 240px"></div>
              </div>
              <div class="item" style="border: 0px">
                <div style="width: 240px"></div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="选择项目发起审批"
        :visible.sync="appVisible"
        @close="approvalCancel('selectEditForm')"
        append-to-body
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
              label="模板名称："
              prop="name"
              class="projectTypeSelect"
            >
              <div>{{ selectAddForm.name }}</div>
            </el-form-item>
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
                  v-for="item in noNextProject"
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
        title="新建普通任务"
        :visible.sync="drawerVisible"
        @close="drawClose('cComeform')"
        ref="contractDrawer"
        width="700px"
        class="liuDialog"
      >
        <div class="cDrawerContent">
          <div
            style="
              background: #f0f0f0;
              width: 105%;
              margin-left: -20px;
              height: 1px;
              margin-top: -20px;
              margin-bottom: 20px;
            "
          ></div>
          <el-form
            @submit.native.prevent
            :model="addTaskForm"
            :rules="taskRule"
            ref="cComeform"
            label-width="130px"
            style="padding-right: 10px"
          >
            <el-form-item label="项目名称：" prop="xmid">
              <el-select
                style="width: 100%"
                v-model="addTaskForm.xmid"
                filterable
                clearable
                placeholder="请选择项目"
                size="small"
              >
                <el-option
                  v-for="item in noNextProject"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务标题：" prop="tasktitle">
              <el-input
                v-model="addTaskForm.tasktitle"
                maxlength="50"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="任务开始时间：" prop="starttime">
              <el-date-picker
                v-model="addTaskForm.starttime"
                :picker-options="pickerStart"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="small"
              ></el-date-picker>
              <!-- <el-date-picker
                                v-model="addTaskForm.starttime"
                                :picker-options="pickerStart"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择时间"
                            >
                            </el-date-picker> -->
            </el-form-item>
            <el-form-item label="任务结束时间：" prop="endtime">
              <el-date-picker
                v-model="addTaskForm.endtime"
                :picker-options="pickerEnd"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="small"
              ></el-date-picker>
              <!-- <el-date-picker
                                v-model="addTaskForm.endtime"
                                :picker-options="pickerEnd"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择时间"
                            >
                            </el-date-picker> -->
            </el-form-item>
            <el-form-item label="备注：" prop="taskdesc">
              <el-input
                type="textarea"
                v-model="addTaskForm.taskdesc"
                maxlength="240"
                show-word-limit
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="附件：">
              <div class="uploadFileList">
                <div class="ufSfz">
                  <div class="ufsTop">
                    <div @click="addFilesPower()" class="addImgClass">
                      添加附件
                    </div>
                  </div>
                  <div class="dingFilesClass">
                    <div
                      v-for="(item, index) in addTaskForm.enclosure"
                      :key="index"
                    >
                      <div>
                        <div class="fileIcon">
                          <i class="el-icon-document"></i>
                        </div>
                        <div class="filesTitle">
                          <div>
                            {{ item.fileName }}
                          </div>
                          <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                        </div>
                      </div>
                      <div>
                        <div class="watchBtn" @click="watchFiles(item)">
                          预览
                        </div>
                        <div class="fileIcon2">
                          <i
                            class="el-icon-error"
                            @click="deleteFiles(index)"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <div class="shenpi">
              <!-- <div>审批流程：</div> -->
              <div class="line" style="height: 160px">
                <div class="spList">
                  <div>
                    <div>
                      <span style="color: red">* &nbsp;&nbsp;</span>待办人
                    </div>
                    <p>请选择待办人</p>
                  </div>
                  <div class="addManeger">
                    <div
                      class="addMList"
                      v-if="addTaskForm.logspare.length > 3"
                    >
                      <div class="mdnList">
                        <div class="mdren" @click="openAllPeople">
                          <span class="touxiang">
                            <i class="el-icon-s-custom"></i>
                          </span>
                        </div>
                        <p>查看全部</p>
                      </div>
                      <div class="mdnPlus">
                        <i class="el-icon-plus"></i>
                      </div>
                    </div>
                    <div
                      class="addMList"
                      v-for="(item, index) in addTaskForm.logspare.slice(0, 3)"
                      :key="index"
                    >
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
                        <i
                          class="el-icon-error"
                          @click="handleClose(item, index)"
                        ></i>
                      </div>
                      <div class="mdnPlus">
                        <i class="el-icon-plus"></i>
                      </div>
                    </div>
                    <div class="addMList addMListLast">
                      <div class="mdnList">
                        <div class="mdren" @click="addManyP(1)">
                          <span class="touxiang">
                            <i class="el-icon-plus"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="spList">
                  <div>
                    <div>可见人</div>
                    <p>请选择可见人</p>
                  </div>
                  <div class="addManeger">
                    <div
                      class="addMList"
                      v-if="addTaskForm.logspare1.length > 3"
                    >
                      <div class="mdnList">
                        <div class="mdren" @click="openSendPeople">
                          <span class="touxiang">
                            <i class="el-icon-s-custom"></i>
                          </span>
                        </div>
                        <p>查看全部</p>
                      </div>
                      <div class="mdnPlus">
                        <i class="el-icon-plus"></i>
                      </div>
                    </div>
                    <div
                      class="addMList"
                      v-for="(item, index) in addTaskForm.logspare1.slice(0, 3)"
                      :key="index"
                    >
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
                        <i
                          class="el-icon-error"
                          @click="handleSendClose(item, index)"
                        ></i>
                      </div>
                      <div class="mdnPlus">
                        <i class="el-icon-plus"></i>
                      </div>
                    </div>
                    <div class="addMList addMListLast">
                      <div class="mdnList">
                        <div class="mdren" @click="addManyP(2)">
                          <span class="touxiang">
                            <i class="el-icon-plus"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="shenpiThree">
                  <span><span></span></span>
                </div>
                <div class="shenpiFore">
                  <span><span></span></span>
                </div>
              </div>
            </div>
            <div
              style="
                background: #f0f0f0;
                width: 107.5%;
                margin-left: -20px;
                height: 1px;
              "
            ></div>
            <div class="demo-drawer__footer">
              <el-button
                type="primary"
                @click="closeDrawer('cComeform')"
                :loading="loading"
                size="small"
                >{{ loading ? '提交中 ...' : '提 交' }}</el-button
              >
              <el-button @click="drawClose('cComeform')" size="small"
                >取 消</el-button
              >
            </div>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="全部待办人员"
        :append-to-body="true"
        :visible.sync="AllPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ addTaskForm.logspare.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in addTaskForm.logspare"
            :key="index"
          >
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
              <i class="el-icon-error" @click="handleClose(item)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(1)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="全部可见人员"
        :append-to-body="true"
        :visible.sync="AllSendPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">
          共有{{ addTaskForm.logspare1.length }}人
        </div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in addTaskForm.logspare1"
            :key="index"
          >
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
              <i class="el-icon-error" @click="handleSendClose(item)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyP(2)">
                <span class="touxiang">
                  <i class="el-icon-plus"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import CountUp from '@/components/CountUp';

export default {
  name: 'taskMould',
  components: { CountUp },
  data() {
    return {
      loaded: false,
      selectAddForm: {
        zid: '',
        name: '',
      },
      noNextProject: [],
      appVisible: false,
      timer: null,
      selectAddFormRules: {
        zid: [
          {
            required: true,
            message: '请选择项目',
            trigger: ['blur', 'change'],
          },
        ],
      },
      taskRule: {
        xmid: [
          {
            required: true,
            message: '请选择项目',
            trigger: ['blur', 'change'],
          },
        ],
        tasktitle: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
        ],
        starttime: [
          {
            required: true,
            message: '请选择日期',
            trigger: ['blur', 'change'],
          },
        ],
        endtime: [
          {
            required: true,
            message: '请选择日期',
            trigger: ['blur', 'change'],
          },
        ],
      },
      drawerVisible: false,
      taskMouldID: '',
      AllPeopleVisible: false,
      AllSendPeopleVisible: false,
      dzxtask: 0,
      cstask: 0,
      wcjtask: 0,
      yzxtask: 0,
      ygdtask: 0,
      quanbutask: 0,
      backTaskNum: 0,
      uploadTaskType: false,
      total: 0,
      pagesize: 12,
      currentPage: 1,
      taskMouldList: [],
      viewMould: false,
      viewTaskType: false,
      loading: false,
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      searchMould: '',
      searchStatus: 1,
      excelUrl: '',
      isUpShow: false,
      addTaskForm: {
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        enclosure: [],
        logspare: [],
        logspare1: [],
        starttime: '',
        endtime: '',
        taskdesc: '',
        tasktitle: '',
        xmid: '',
      },
      peopleType: 1,
      checkName: '',
    };
  },
  methods: {
    jumpTask(status) {
      this.$router.push({
        path: '/task/taskList',
        query: {
          status: status,
        },
      });
    },
    goUpload() {
      this.uploadTaskType = true;
    },
    getNum() {
      const _this = this;
      _this.$axios
        .post('/task/tasknumber', {
          corp_id: _this.$store.state.cid,
          userid: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.dzxtask = res.data.list.dzxtask;
            _this.yzxtask = res.data.list.filetask;
            _this.ygdtask = res.data.list.ywjtask;
            _this.wcjtask = res.data.list.myfoundertask;
            _this.cstask = res.data.list.cctotask;
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendMould(item) {
      const _this = this;
      if (item.tmpname == '自由流程') {
        _this.$axios
          .post('/task/gettmpcode', {
            corp_id: _this.$store.state.cid,
            xmid: '',
            tmpname: '自由流程',
            userid: _this.$store.state.userInfo.uid,
          })
          .then(res => {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.process_code;
            dd.ready(function () {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
            _this.viewMould = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // _this.checkName = item.tmpname;
        // _this.selectAddForm.name = item.tmpname;
        // _this.getProList();
        // _this.appVisible = true;
        _this.$axios
          .post('/task/gettmpcode', {
            corp_id: _this.$store.state.cid,

            tmpname: item.tmpname,
            userid: _this.$store.state.userInfo.uid,
          })
          .then(res => {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.process_code;
            dd.ready(function () {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function (result) {
                  /**/
                },
                onFail: function (err) {},
              });
            });
            _this.viewMould = false;
            // _this.appVisible = false;
            _this.loaded = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    sendNormal() {
      // if (this.noNextProject.length>0) {
      this.addTaskForm.enclosure = [];
      this.drawerVisible = true;
      // } else {
      //     dd.ready(function () {
      //         dd.device.notification.alert({
      //             message: '无项目，请您先创建项目才能进行其他操作！',
      //             title: '提示', //可传空
      //             buttonName: '收到',
      //             onSuccess: function () {},
      //             onFail: function (err) {}
      //         });
      //     });
      // }
    },
    drawClose(formName) {
      this.$refs[formName].resetFields();
      this.addTaskForm.enclosure = [];
      this.addTaskForm.logspare1 = [];
      this.addTaskForm.logspare = [];
      this.drawerVisible = false;
    },
    closeDrawer(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.addTaskForm.logspare.length > 0) {
            let newData = _this.addTaskForm;
            newData.userid = _this.$store.state.userInfo.uid;
            _this.$axios
              .post('/task/Addtask', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.loading = false;
                  _this.drawerVisible = false;
                  _this.getNum();
                  _this.$refs[formName].resetFields();
                  _this.addTaskForm.logspare = [];
                  _this.addTaskForm.logspare1 = [];
                  _this.$message({
                    message: '新建任务成功',
                    type: 'success',
                    duration: 2000,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'error',
                    duration: 2000,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.$message.warning('请选择待办人员');
            _this.loading = false;
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
        .post('/dingding/getAuthUp', {
          auth: 'download',
          fields: item.fileId,
        })
        .then(res => {
          if (res.data.code == 1) {
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
            dd.error(function (err) {});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //删除附件
    deleteFiles(index) {
      this.addTaskForm.enclosure.splice(index, 1);
    },
    openAllPeople() {
      this.AllPeopleVisible = true;
    },
    openSendPeople() {
      this.AllSendPeopleVisible = true;
    },
    handleClose(tag) {
      this.addTaskForm.logspare.splice(
        this.addTaskForm.logspare.indexOf(tag),
        1,
      );
    },
    handleSendClose(tag) {
      this.addTaskForm.logspare1.splice(
        this.addTaskForm.logspare1.indexOf(tag),
        1,
      );
    },
    addFilesPower() {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
          auth: 'add',
          fields: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.$store.commit('setSpaceId', res.data.data.toString());
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
              _this.addTaskForm.enclosure.push(item);
            });
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    addManyP(type) {
      const that = this;
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
              result.users.forEach(item => {
                that.addTaskForm.logspare.push(item);
              });
            } else {
              result.users.forEach(item => {
                that.addTaskForm.logspare1.push(item);
              });
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
            .post('/task/gettmpcode', {
              corp_id: _this.$store.state.cid,

              tmpname: _this.checkName,
              userid: _this.$store.state.userInfo.uid,
            })
            .then(res => {
              let newUrl =
                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
                _this.$store.state.cid +
                '#/custom/?processCode=' +
                res.data.process_code;
              dd.ready(function () {
                dd.biz.util.openLink({
                  url: newUrl, //要打开链接的地址
                  onSuccess: function (result) {
                    /**/
                  },
                  onFail: function (err) {},
                });
              });
              _this.viewMould = false;
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
    //打开模板选择覆盖层
    viewDialog() {
      this.isUpShow = false;

      this.searchMould = '';
      this.viewMould = true;
    },
    //去列表
    goList(status) {
      this.$router.push({
        path: '/task/taskList',
        query: { status: status },
      });
    },
    //发起审批
    goCheck() {
      this.viewTaskType = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    searchMClick() {
      this.currentPage = 1;
      this.getList();
    },
    getProList() {
      this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            this.noNextProject = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTypeList() {
      this.$axios
        .post('/task/tmptypelist')
        .then(res => {
          if (res.data.code == 1) {
            this.taskMouldList = res.data.content;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {},
  created() {
    this.$utils.checkding();
    this.getNum();
    this.getTypeList();
    this.getProList();
  },
  computed: {
    // 结束时间大于开始时间
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.addTaskForm.endtime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.addTaskForm.starttime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
    projectData() {
      return this.$store.state.projectInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  .content {
    .top {
      display: flex;
      justify-content: space-between;
      .post {
        width: 1006px;
        height: 290px;
        background: #ffffff;
        border-radius: 5px;
        margin-bottom: 20px;
        margin-right: 20px;
        .title {
          border-bottom: none !important;
          display: flex;
          flex-direction: row;
          margin-left: 30px;
          margin-bottom: 20px;
          .span {
            margin-top: 27px;
            width: 3px;
            height: 16px;
            background: #3296fa;
          }
          .text {
            margin-top: 27px;
            line-height: 15px;
            margin-left: 5px;
          }
        }
        .cards {
          display: flex;
          justify-content: space-between;
          padding: 0px 30px;
          .item {
            width: 429px;
            height: 185px;
            border-radius: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .info {
              .hidde {
                display: none;
              }
              .label {
                font-size: 30px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #ffffff;
              }
              .desc {
                margin-top: 34px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
              }
            }
            .info:hover {
              .show {
                display: none;
                font-size: 26px;
              }
              .hidde {
                display: block;
                font-size: 26px;
              }
            }
            .img {
              width: 81px;
              height: 73px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .item:nth-child(1) {
            background: linear-gradient(0deg, #006dff, #009bff);
          }
          .item:nth-child(2) {
            background: linear-gradient(0deg, #ffa800, #edcb11);
            margin-left: 20px;
          }
        }
      }
      .approval {
        width: 563px;
        height: 290px;
        background: #ffffff;
        border-radius: 5px;
        margin-bottom: 20px;
        .title {
          border-bottom: none !important;
          display: flex;
          flex-direction: row;
          margin-left: 30px;
          margin-bottom: 20px;
          .span {
            margin-top: 27px;
            width: 3px;
            height: 16px;
            background: #3296fa;
          }
          .text {
            margin-top: 27px;
            line-height: 15px;
            margin-left: 5px;
          }
        }
        .cards {
          display: flex;
          justify-content: space-between;
          background: #fdfdfd;
          padding: 0px 20px;
          .item {
            height: 185px;
            width: 143px;
            background: #ffffff;
            box-shadow: 0px 19px 51px 0px rgba(132, 132, 132, 0.11);
            border-radius: 10px;
            display: flex;
            align-items: center;
            .content {
              margin: 0 auto;
              .img {
                display: flex;
                margin: 0 auto;
                width: 86px;
                height: 86px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .num {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #ff4343;
                text-align: center;
              }
              .label {
                margin-top: 16px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                text-align: center;
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 1720px) {
      .top {
        .post {
          width: 100%;
          height: auto;
          .cards {
            flex-wrap: wrap;
            .item:nth-child(1) {
              margin-bottom: 20px;
            }
            .item:nth-child(2) {
              margin-left: 0px;
              margin-bottom: 20px;
            }
          }
        }
        .approval {
          width: 100%;
        }
      }
    }
    .task-types {
      background: #ffffff;
      border-radius: 5px;
      .title {
        border-bottom: none !important;
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        margin-bottom: 20px;
        .span {
          margin-top: 27px;
          width: 3px;
          height: 16px;
          background: #3296fa;
        }
        .text {
          margin-top: 27px;
          line-height: 15px;
          margin-left: 5px;
        }
      }
      .types {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 30px;
        justify-content: space-between;
        .item {
          margin-bottom: 40px;
          width: 339px;
          height: 110px;
          background: #f8f8fb;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;

          .img {
            margin-left: 40px;
            width: 60px;
            height: 60px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            margin-left: 30px;
            .label {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #000000;
            }
            .num {
              margin-top: 17px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: bold;
              color: #ff4343;
            }
          }
        }
      }
    }
  }
}

// 模板弹窗
.templates {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    transform-style: preserve-3d;
    transition: transform 1.3s;
    .a {
      display: flex;
      align-items: center;
      width: 240px;
      height: 68px;
      border: 1px solid #e8e8e8;
      margin-bottom: 20px;
      border-radius: 5px;
      .img {
        padding: 14px 0px;
        margin-left: 30px;
        margin-right: 20px;
        // height: 40px;
        width: 40px;
        img {
          width: 100%;
          // height: 100%;
          border-radius: 15px;
        }
      }
      .label {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    .b {
      display: none;
      align-items: center;
      width: 240px;
      height: 68px;
      border: 1px solid #3296fa;
      box-shadow: 1px 0px 23px #dfdfde;
      margin-bottom: 20px;
      border-radius: 5px;
      .label {
        width: 240px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3296fa;
        text-align: center;
      }
    }
  }
  .item:hover {
    // transform:rotateY(60deg);
    cursor: pointer;
    .a {
      display: none;
    }
    .b {
      display: flex;
    }
  }
}
</style>

<style lang="less">
.liuDialog {
  .el-dialog {
    .el-dialog__body {
      padding-bottom: 20px;
    }
  }
}
</style>
