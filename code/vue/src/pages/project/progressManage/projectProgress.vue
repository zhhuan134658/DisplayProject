<template>
  <!-- 工程事件 -->
  <div id="projectProgress" ref="elementS">
    <div class="main">
      <div class="header">
        <div class="headerContent" style="padding: 0px">
          <el-form
            @submit.native.prevent
            v-if="activeName != 'third'"
            :inline="true"
            class="demo-form-inline"
          >
            <div class="hlBottom" style="margin-left: 0px">
              <el-form-item label="项目名称：" label-width="85px">
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
              </el-form-item>
              <el-form-item label="事件名称：" label-width="85px">
                <el-input
                  v-model="searchName"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="searchClick"
                  >搜索</el-button
                >
              </el-form-item>
            </div>
          </el-form>
          <el-form
            @submit.native.prevent
            v-if="activeName == 'third'"
            :inline="true"
            :model="formInline"
            label-width="120px"
            class="demo-form-inline"
          >
            <div class="hlBottom">
              <el-form-item label="项目名称：" label-width="90px">
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
              </el-form-item>
              <el-form-item label="名称：" label-width="90px">
                <el-input
                  v-model="formInline.name"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态：" label-width="90px">
                <el-select
                  v-model="formInline.type"
                  clearable
                  placeholder="请选择状态"
                >
                  <el-option label="已完成" value="1"></el-option>
                  <el-option label="未完成" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="right">
              <div>
                <el-button type="primary" size="medium" @click="onSubmit"
                  >搜索</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="工程事件" name="first">
            <div class="ppHerder">
              <div></div>
              <div>
                <el-button
                  type="primary"
                  plain
                  size="medium"
                  @click="manyAddClick"
                  >批量新建工程事件</el-button
                >
                <el-button
                  type="primary"
                  plain
                  size="medium"
                  @click="newAddClick"
                  >新建工程事件</el-button
                >
              </div>
            </div>
            <div class="ppcontent">
              <!-- <h4>郑州项目</h4> -->
              <div v-if="progressData.length > 0">
                <!-- <div class="panelList">
                                    <div
                                        class="progress"
                                        v-for="(item, index) in progressData"
                                        :key="index"
                                    >
                                        <div class="project-title">
                                            <div class="title_left">
                                                {{ item.jdtitle }}
                                            </div>
                                            <div
                                                class="title_right"
                                                @click="editClick(item)"
                                            >
                                                <i
                                                    class="el-icon-edit-outline"
                                                ></i>
                                            </div>
                                        </div>
                                        <div
                                            class="circle"
                                            @click="editClick(item)"
                                        >
                                            <div style="font-size: 15px">
                                                <div
                                                    style="margin-bottom: 20px"
                                                >
                                                    负责人：{{ item.jduser }}
                                                </div>
                                                <div>
                                                    总工期：{{ item.day }}天
                                                    <span style="color: #0089ff"
                                                        >({{
                                                            item.sytime
                                                        }})</span
                                                    >
                                                </div>
                                            </div>
                                            <div>
                                                <el-progress
                                                    width="100"
                                                    type="circle"
                                                    :percentage="item.jindu"
                                                    color="#FF4A4A"
                                                ></el-progress>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                <div style="margin-top: 20px">
                  <el-table
                    :border="true"
                    :data="progressData"
                    style="width: 100%; border: 1px solid #ebeef5"
                    size="mini"
                    :row-class-name="tableRowClassName"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                  >
                    <el-table-column
                      label="序号"
                      type="index"
                      width="55"
                    ></el-table-column>
                    <el-table-column
                      label="事件名称"
                      prop="jdtitle"
                    ></el-table-column>
                    <el-table-column
                      label="负责人"
                      prop="jduser"
                    ></el-table-column>
                    <el-table-column
                      label="总工期(天）"
                      prop="day"
                    ></el-table-column>
                    <el-table-column
                      label="已使用(天)"
                      prop="sytime"
                    ></el-table-column>
                    <el-table-column label="进度" prop="jindu">
                      <template slot-scope="scope">
                        <progress-liu :width="scope.row.jindu" />
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" @click="editClick(scope.row)"
                          >编辑</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div style="display: flex; flex-direction: row-reverse">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    layout="prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
              </div>
              <div v-else style="text-align: center; padding: 0.3rem 0">
                <img src="@/assets/images/empty.png" alt />
                <p style="font-size: 0.16rem">暂时还没有数据哦</p>
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="横道图" name="second">
                        <div class="gantBtn">
                            <el-radio-group
                                v-model="gantRadio"
                                @change="gantChange"
                            >
                                <el-radio-button label="1"
                                    >按日显示</el-radio-button
                                >
                                <el-radio-button label="2"
                                    >按月显示</el-radio-button
                                >
                            </el-radio-group>
                        </div>
                        <div ref="ganttRef" class="left-container" />
                    </el-tab-pane> -->
          <el-tab-pane label="统计分析" name="third">
            <div class="pprogressChart">
              <div class="pchart">
                <div class="prchart">
                  <el-table
                    :border="true"
                    :data="chartsData.content"
                    style="width: 100%; border: 1px solid #ebeef5"
                    maxheight="450"
                    size="mini"
                    :row-class-name="tableRowClassName"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                  >
                    <el-table-column type="index" label="序号" width="55" />
                    <el-table-column
                      prop="jdtitle"
                      align="left"
                      label="工程事件名称"
                      :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="jduser"
                      label="负责人"
                      align="left"
                      :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="starttime"
                      align="left"
                      :show-overflow-tooltip="true"
                      label="开始时间"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="stoptime"
                      align="left"
                      :show-overflow-tooltip="true"
                      label="结束时间"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="wctime"
                      align="left"
                      :show-overflow-tooltip="true"
                      label="完成时间"
                    >
                    </el-table-column>
                    <el-table-column
                      label="进度"
                      prop="jindu"
                      min-width="110px"
                    >
                      <template slot-scope="scope">
                        <progress-liu :width="scope.row.jindu" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      align="left"
                      label="状态"
                      :formatter="fortStatus"
                    >
                    </el-table-column>
                  </el-table>
                  <div class="cPag">
                    <el-pagination
                      @current-change="chartChange"
                      :current-page.sync="ccurrentPage"
                      :page-size="10"
                      layout="prev, pager, next, jumper"
                      :total="ctotal"
                    ></el-pagination>
                  </div>
                </div>
                <div class="echarts" style="height: 500px; width: 378px">
                  <div class="">
                    <div class="title">统计分析表</div>
                    <div
                      v-if="activeName == 'third'"
                      id="progressBar"
                      ref="pbar"
                      style="height: 260px; width: 378px"
                    ></div>
                  </div>
                  <div class="nums">
                    <div class="item">
                      <div>
                        <count-up :value="chartsData.bing.yiw" />
                      </div>
                      <div>已完成</div>
                    </div>
                    <div class="item">
                      <div>
                        <count-up :value="chartsData.bing.weiw" />
                      </div>
                      <div>未完成</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog
        :title="taskTitle"
        :visible.sync="newProgressView"
        width="700px"
        @close="closeDialog('proform')"
      >
        <el-form
          @submit.native.prevent
          ref="proform"
          :label-position="labelPosition"
          :model="addForm"
          :rules="newProgressRule"
          label-width="130px"
        >
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
          <el-form-item label="工程事件名称：" prop="jdtitle">
            <el-input
              v-model="addForm.jdtitle"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="jdusers">
            <div class="addManeger" style="display: flex">
              <div class="addMList" v-if="tagsData.length > 3">
                <div class="mdnList">
                  <div class="mdren" @click="openAllPeople(1)">
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
                v-for="(item, index) in tagsData.slice(0, 3)"
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
                    @click="handleClose(item, index, 1)"
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
          </el-form-item>
          <el-form-item label="抄送人：" prop="cc_userid">
            <div class="addManeger" style="display: flex">
              <div class="addMList" v-if="cctagsData.length > 3">
                <div class="mdnList">
                  <div class="mdren" @click="openAllPeople(2)">
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
                v-for="(item, index) in cctagsData.slice(0, 3)"
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
                    @click="handleClose(item, index, 4)"
                  ></i>
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
          </el-form-item>
          <el-form-item label="项目名称：" prop="proname">
            <el-input
              v-model="addForm.proname"
              :disabled="true"
              size="small"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="上级事件：" class="upOrg">
                        <el-button
                            @click="selectCorp"
                            size="medium"
                            plain
                            style="width: 100%"
                        >
                            <span>{{ addForm.uname }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <div class="addNewDiv" v-if="newView">
                            <div class="addNewMain">
                                <div class="addNewList">
                                    <el-tree
                                        :props="sDefaultProps"
                                        :load="sloadNode"
                                        node-key="id"
                                        accordion="true"
                                        lazy
                                        :expand-on-click-node="false"
                                        ref="stree"
                                        show-checkbox
                                        check-strictly
                                        @check="handleCheck"
                                    ></el-tree>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="定义为里程碑：" prop="status">
                        <el-radio v-model="addForm.status" label="2"
                            >是</el-radio
                        >
                        <el-radio v-model="addForm.status" label="1"
                            >否</el-radio
                        >
                    </el-form-item> -->
          <el-form-item label="开始时间：" prop="starttime">
            <el-date-picker
              v-model="addForm.starttime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerStart"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="stoptime">
            <el-date-picker
              v-model="addForm.stoptime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerEnd"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="工程事件描述：">
            <el-input
              v-model="addForm.jdcontent"
              type="textarea"
              :rows="4"
              maxlength="100"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          style="
            background: #f0f0f0;
            width: 105%;
            margin-left: -20px;
            height: 1px;
            margin-top: 20px;
            margin-bottom: -20px;
          "
        ></div>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loading"
            size="small"
            @click="goSure('proform')"
            >确 定</el-button
          >
          <el-button @click="closeDialog('proform')" size="small"
            >取 消</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="修改事件"
        :visible.sync="editProgressView"
        width="700px"
        @close="closeEdit('peform')"
      >
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
          ref="peform"
          :label-position="labelPosition"
          :model="editForm"
          :rules="editProgressRule"
          label-width="130px"
        >
          <el-form-item label="事件名称：" prop="jdtitle">
            <el-input
              v-model="editForm.jdtitle"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="jdusers">
            <div class="addManeger" style="display: flex">
              <div class="addMList" v-if="tagsData.length > 3">
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
                v-for="(item, index) in tagsData.slice(0, 3)"
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
                    @click="handleClose(item, index, 2)"
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
          </el-form-item>
          <el-form-item label="抄送人：" prop="cc_userid">
            <div class="addManeger" style="display: flex">
              <div class="addMList" v-if="cctagsData.length > 3">
                <div class="mdnList">
                  <div class="mdren" @click="openAllPeople(2)">
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
                v-for="(item, index) in cctagsData.slice(0, 3)"
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
                    @click="handleClose(item, index, 4)"
                  ></i>
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
          </el-form-item>

          <el-form-item label="项目名称：" prop="proname">
            <el-input
              v-model="editForm.proname"
              :disabled="true"
              size="small"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="定义为里程碑：" prop="status">
                        <el-radio v-model="editForm.status" label="2"
                            >是</el-radio
                        >
                        <el-radio v-model="editForm.status" label="1"
                            >否</el-radio
                        >
                    </el-form-item> -->
          <el-form-item label="开始时间：" prop="starttime">
            <el-date-picker
              v-model="editForm.starttime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerEStart"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="stoptime">
            <el-date-picker
              v-model="editForm.stoptime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerEEnd"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="事件描述：">
            <el-input
              v-model="editForm.jdcontent"
              type="textarea"
              :rows="4"
              maxlength="100"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          style="
            background: #f0f0f0;
            width: 105%;
            margin-left: -20px;
            height: 1px;
            margin-top: 20px;
            margin-bottom: -20px;
          "
        ></div>
        <div slot="footer" class="dialog-footer">
          <!--    v-if="isFinish != '3'" -->
          <el-button
            type="primary"
            :loading="loading"
            size="small"
            @click="editSure('peform')"
            >确 定</el-button
          >
          <!--   v-if="isFinish != '3'" -->
          <el-button @click="completeEdit" size="small">完 成</el-button>
          <!--       v-if="isFinish != '3'" -->
          <el-button @click="deleteEdit" size="small">删 除</el-button>
          <el-button @click="closeEdit('peform')" size="small">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="全部待办人员"
        :append-to-body="true"
        :visible.sync="AllPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">共有{{ tagsData.length }}人</div>
        <div class="showAllPeople">
          <div class="addMList" v-for="(item, index) in tagsData" :key="index">
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
              <i class="el-icon-error" @click="handleClose(item, index, 1)"></i>
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
        title="全部抄送人员"
        :append-to-body="true"
        :visible.sync="ccAllPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">共有{{ cctagsData.length }}人</div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in cctagsData"
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
              <i class="el-icon-error" @click="handleClose(item, index, 4)"></i>
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
      <el-dialog
        title="全部待办人员"
        :append-to-body="true"
        :visible.sync="AllPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">共有{{ tagsData.length }}人</div>
        <div class="showAllPeople">
          <div class="addMList" v-for="(item, index) in tagsData" :key="index">
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
              <i class="el-icon-error" @click="handleClose(item, index, 1)"></i>
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
      <el-dialog
        title="删除"
        width="600px"
        :append-to-body="true"
        :visible.sync="deleteVisible"
        :close-on-click-modal="false"
      >
        <div>一旦删除,无法恢复,请确认是否删除</div>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="deleteVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="medium" @click="deleteClick"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="完成"
        width="800px"
        :append-to-body="true"
        :visible.sync="comVisible"
        :close-on-click-modal="false"
        @close="comCancel"
      >
        <el-form
          @submit.native.prevent
          :model="comform"
          :rules="comRule"
          ref="comFRef"
          label-width="130px"
        >
          <el-form-item label="完成时间：" prop="jdstoptime">
            <el-date-picker
              v-model="comform.jdstoptime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="完成说明：" prop="jdyuanyin">
            <el-input type="textarea" v-model="comform.jdyuanyin"></el-input>
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
                  <div v-for="(item, index) in comform.jdstopurl" :key="index">
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
                      <div class="watchBtn" @click="watchFiles(item)">预览</div>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="comCancel" size="medium">取 消</el-button>
          <el-button
            type="primary"
            :loading="loaded"
            size="medium"
            @click="comSure('comFRef')"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="批量新建工程事件"
        :visible.sync="upFormVisible"
        :close-on-click-modal="false"
        @close="upCancel"
        class="uploadExcel"
        width="700px"
      >
        <div class="newExcel">
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
          <div class="leftForm">
            <el-form
              @submit.native.prevent
              ref="form"
              :rules="creatProjectrules"
              :label-position="labelPosition"
              :model="upForm"
              label-width="100px"
            >
              <el-form-item label="负责人：" prop="jdusers">
                <div class="addManeger" style="display: flex">
                  <div class="addMList" v-if="tagsData.length > 3">
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
                    v-for="(item, index) in tagsData.slice(0, 3)"
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
                        @click="handleClose(item, index, 3)"
                      ></i>
                    </div>
                    <div class="mdnPlus">
                      <i class="el-icon-plus"></i>
                    </div>
                  </div>
                  <div class="addMList addMListLast">
                    <div class="mdnList">
                      <div class="mdren" @click="addManyP(3)">
                        <span class="touxiang">
                          <i class="el-icon-plus"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <!-- <el-form-item label="上级事件：" class="upOrg">
                                <el-button
                                    @click="selectCorp"
                                    size="medium"
                                    plain
                                    style="width: 100%"
                                >
                                    <span>{{ upForm.uname }}</span>
                                    <i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </el-button>
                                <div class="addNewDiv" v-if="newView">
                                    <div class="addNewMain">
                                        <div class="addNewList">
                                            <el-tree
                                                :props="dDefaultProps"
                                                :load="dloadNode"
                                                node-key="id"
                                                accordion="true"
                                                lazy
                                                :expand-on-click-node="false"
                                                ref="dtree"
                                                show-checkbox
                                                check-strictly
                                                @check="handleMCheck"
                                            ></el-tree>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item> -->
              <el-form-item label="项目名称：" prop="proname">
                <el-input
                  v-model="upForm.proname"
                  :disabled="true"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item class="newtijiao" label="上传文件：">
                <div
                  class="newcom"
                  style="padding-top: 40px; background: #ffffff"
                >
                  <i
                    class="iconfont icon-wenjian"
                    style="font-size: 36px; color: #fcb138"
                  ></i>
                  <p>请上传文件</p>
                  <eupload
                    @listenToChild="showe"
                    :upImgList2="upImgList2"
                    :licenceImg2="licenceImg2"
                    :isShow2="isShow2"
                  ></eupload>
                </div>
              </el-form-item>
              <div class="warn" style="margin-left: 100px; width: 313px">
                <div>
                  <p>注意：</p>
                  <p>
                    以下载的模板为准，否则将无法读取报表数据，重复上传数据将被覆盖
                  </p>
                  <span @click="derive" style="color: #3a99f2; cursor: pointer"
                    >下载模板</span
                  >
                </div>
              </div>
              <div
                style="
                  background: #f0f0f0;
                  width: 105%;
                  margin-left: -20px;
                  height: 1px;
                  margin-top: 20px;
                  margin-bottom: 20px;
                "
              ></div>
              <el-form-item
                style="
                  display: flex;
                  flex-direction: row-reverse;
                  margin-bottom: 0px;
                "
              >
                <el-button
                  type="primary"
                  size="small"
                  :loading="loaded"
                  @click="save"
                  >确定</el-button
                >
                <el-button
                  style="margin-left: 10px"
                  type="primary"
                  size="small"
                  plain
                  @click="upCancel"
                  >取消</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-dialog>

      <!-- <el-dialog
                title="通讯录"
                :visible.sync="pickerVisible"
                :append-to-body="true"
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                width="850px"
            >
                <peoplePick
                    v-if="peopleIsShow"
                    :pickerNum="pickerNum"
                    @listenPicker="pickerSelect"
                ></peoplePick>
            </el-dialog> -->
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
import gantt from 'dhtmlx-gantt'; // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js'; // 本地化
import * as dd from 'dingtalk-jsapi';
import eupload from '../../../components/excelUpload.vue';
// import peoplePick from '../../components/complexPicker.vue';

import ProgressLiu from '@/components/Progress';
import CountUp from '@/components/CountUp';

var timeFn = null;
export default {
  name: 'projectProgress',
  components: { eupload, ProgressLiu, CountUp },
  data() {
    const validateuser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择负责人'));
      } else {
        callback();
      }
    };
    return {
      plan_end_riqi: '',
      plan_start_riqi: '',
      proName: '',
      peopleIsShow: true,
      searchLCId: '',
      searchId: '',
      nextProject: [],
      clickType: 1,
      chartsData: { bing: {}, content: [] },
      formInline: {
        name: '',
        type: '',
      },
      searchName: '',
      isLast: false,
      upFormVisible: false,
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      loaded: false,
      editID: '',
      deleteVisible: false,
      comVisible: false,
      editProgressView: false,
      progressList: [],
      comform: {
        jdstoptime: '',
        jdyuanyin: '',
        userid: this.$store.state.userInfo.uid,
        jdstopurl: [],
      },
      upForm: {
        proname: '',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: '',
        jdusers: [],
        jdstatus: '',
        url: '',
        status: '1',
      },
      comRule: {
        jdstoptime: [
          {
            required: true,
            message: '完成时间不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      editProgressRule: {
        jdtitle: [
          {
            required: true,
            message: '工程事件名称不能为空',
            trigger: 'blur',
          },
        ],
        jdusers: [
          {
            required: true,
            message: '负责人不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        starttime: [
          {
            required: true,
            message: '结束时间不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        stoptime: [
          {
            required: true,
            message: '结束时间不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      newProgressRule: {
        jdtitle: [
          {
            required: true,
            message: '工程事件名称不能为空',
            trigger: 'blur',
          },
        ],
        jdusers: [
          {
            required: true,
            message: '负责人不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        fid: [
          {
            required: true,
            message: '请选择上级事件',
            trigger: ['blur', 'change'],
          },
        ],
        starttime: [
          {
            required: true,
            message: '结束时间不能为空',
            trigger: ['blur', 'change'],
          },
        ],
        stoptime: [
          {
            required: true,
            message: '结束时间不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      sDefaultProps: {
        id: 'id',
        label: 'name',
        children: 'content',
        isLeaf: 'leaf',
      },
      dDefaultProps: {
        id: 'id',
        label: 'name',
        children: 'content',
        isLeaf: 'leaf',
      },
      newView: false,
      nextRadio: 0,
      gantRadio: 1,
      labelPosition: 'right',
      newProgressView: false,
      taskTitle: '新建工程事件',
      activeName: 'first',
      projectList: [],
      addForm: {
        cc_userid: [],
        jdtitle: '',
        starttime: '',
        stoptime: '',
        jdusers: [],
        jdcontent: '',
        proname: '',
        jdstatus: '',
        status: '1',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: '',
      },
      editForm: {
        cc_userid: [],
        proname: '',
        jdtitle: '',
        starttime: '',
        stoptime: '',
        jdusers: [],
        jdcontent: '',
        jdstatus: '',
        corp_id: this.$store.state.cid,
        status: '1',
        userid: this.$store.state.userInfo.uid,
        xmid: '',
        shangjistarttime: '',
        shangjistoptime: '',
      },
      searchForm: {
        name: '',
        starttime: '',
        endtime: '',
        city: '',
      },
      moveId: '',
      tasks: {
        data: [
          // {
          //     id: 1,
          //     text: '开工开工开工开工开工开工开工开工',
          //     start_date: '15-04-2017',
          //     end_date: '18-04-2017',
          //     personName: '张总',
          //     duration: 3,
          //     progress: 0.6
          // },
          // {
          //     id: 2,
          //     text: 'Task #2',
          //     start_date: '18-04-2017',
          //     end_date: '21-04-2017',
          //     personName: '李总',
          //     duration: 3,
          //     progress: 0.4
          // },
          // {
          //     id: 3,
          //     text: 'Task #3',
          //     start_date: '20-04-2017',
          //     end_date: '23-04-2017',
          //     personName: '赵总',
          //     duration: 3,
          //     progress: 0.4,
          //     parent: 2
          // }
        ],
        // links: [{ id: 1, source: 1, target: 2, type: '0' }]
      },
      progressData: [],
      newNode: [],
      newResolve: [],
      tagsData: [],
      cctagsData: [],
      AllPeopleVisible: false,
      ccAllPeopleVisible: false,
      loading: false,
      nfid: '',
      jdstatus: '',
      comStop: '',
      comStart: '',
      pickerVisible: false,
      ccurrentPage: 1,
      ctotal: 0,
      pickerNum: 9,
      total: 0,
      pagesize: 9,
      currentPage: 1,
      currentTabName: 'first',
      isFinish: '',
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
    fortStatus(row) {
      switch (row.status) {
        case '0':
          return '按期完成';
          break;
        case '1':
          return '提前完成';
          break;
        case '2':
          return '延期完成';
          break;
        case '3':
          return '未完成';
          break;
      }
    },
    manyAddClick() {
      this.upForm = {
        proname: this.proName,
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: this.searchId,
        jdusers: [],
        jdstatus: '',
        url: '',
        status: '1',
      };
      this.upImgList2 = '';
      this.licenceImg2 = '';
      this.isShow2 = ['1'];
      this.upFormVisible = true;
    },
    showe(url) {
      this.upForm.url = url;
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
      this.comform.jdstopurl.splice(index, 1);
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
            _this.comform.jdstopurl = result.data;
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    handleClick(tab, event) {
      console.log(tab);
      this.currentTabName = tab.name;
      if (tab.name == 'first') {
        this.currentPage = 1;
        this.jdstatus = '';
        this.nfid = '';
        this.getProgressList();
      } else if (tab.name == 'second') {
        this.getGant();
      } else if (tab.name == 'third') {
        this.getCharts();
      } else if (tab.name == 'four') {
        this.getLCList();
      }
    },
    derive() {
      let url = 'http://oazhukuai.zzdingyun.com/public/shijian.xls';
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: url,
          name: '工程事件导入模板.xls', //定义下载文件名字
          onProgress: function (msg) {
            // 文件下载进度回调
          },
          onSuccess: function (result) {},
          onFail: function () {},
        });
      });
    },
    upCancel() {
      this.upFormVisible = false;
      this.newView = false;
      this.tagsData = [];
      this.isShow2 = [];
    },
    save() {
      const _this = this;
      let newData = JSON.parse(JSON.stringify(_this.upForm));
      _this.loaded = true;
      if (_this.upForm.jdusers.length > 0) {
        if (_this.upForm.url) {
          newData.user_id = _this.$store.state.userInfo.uid;
          _this.$axios
            .post('/task/JinDuSCreated', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.loaded = false;
                _this.upFormVisible = false;
                _this.getProgressList();
                _this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 2000,
                });
              } else {
                _this.loaded = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 2000,
                });
              }
            })
            .catch(function (error) {
              _this.loaded = false;
              console.log(error);
            });
        } else {
          _this.loaded = false;
          _this.$message.warning('请上传Excel文件');
        }
      } else {
        _this.loaded = false;
        _this.$message.warning('请选择负责人');
      }
    },
    comCancel() {
      this.comVisible = false;
      this.comform = {
        jdstoptime: '',
        jdyuanyin: '',
        userid: this.$store.state.userInfo.uid,
      };
    },
    comSure(formName) {
      const _this = this;
      _this.loaded = true;
      let newTime = new Date(_this.comStop).getTime();
      let newT = new Date(_this.comform.jdstoptime).getTime();
      if (newT < newTime) {
        _this.comform.type = 1;
        _this.comform.jdgongqi = (newTime - newT) / (1000 * 60 * 60 * 24);
      } else if (newT > newTime) {
        _this.comform.type = 2;
        _this.comform.jdgongqi = (newT - newTime) / (1000 * 60 * 60 * 24);
      } else {
        _this.comform.type = 0;
        _this.comform.jdgongqi = 0;
      }
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.comform.user_id = _this.$store.state.userInfo.uid;
          _this.$axios
            .post('/task/FinishJinDu', _this.comform)
            .then(res => {
              if (res.data.code == 1) {
                _this.loaded = false;
                _this.comVisible = false;
                _this.editProgressView = false;
                if (_this.currentTabName == 'first') {
                  _this.getProgressList();
                } else if (_this.currentTabName == 'four') {
                  _this.getLCList();
                }

                _this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 2000,
                });
              } else {
                _this.loaded = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 2000,
                });
              }
            })
            .catch(function (error) {
              _this.loaded = false;
              console.log(error);
            });
        } else {
          _this.loaded = false;
        }
      });
    },
    deleteClick() {
      const _this = this;
      _this.$axios
        .post('/task/UpdateJinDu', {
          jid: _this.editID,
          type: 'delete',
        })
        .then(res => {
          if (res.data.code == 1) {
            if (_this.currentTabName == 'first') {
              _this.getProgressList();
            } else if (_this.currentTabName == 'four') {
              _this.getLCList();
            }
            _this.deleteVisible = false;
            _this.editProgressView = false;
          } else {
            _this.$message({
              message: res.data.msg,
              type: 'error',
              duration: 2000,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    completeEdit() {
      this.comVisible = true;
    },
    deleteEdit() {
      this.deleteVisible = true;
    },
    startClick() {
      this.jdstatus = '';
      this.nfid = '';
      this.getProgressList();
    },
    backClick(item) {
      const _this = this;
      clearTimeout(timeFn);
      _this.jdstatus = item.sjjdstatus;
      _this.nfid = item.sjid;
      _this.getProgressList();
    },
    nextClick(item) {
      const _this = this;
      clearTimeout(timeFn); //首先清除计时器
      timeFn = setTimeout(() => {
        _this.jdstatus = item.jdstatus;
        _this.nfid = item.id;
        _this.getProgressList();
      }, 300);
    },
    editClick(item) {
      this.editID = item.id;
      this.comform.jid = item.id;
      this.getInfo(item.id, item.fid);
    },
    getInfo(id, fid) {
      const _this = this;
      _this.$axios
        .post('/task/JinDuContent', {
          jid: id,
          // fid: fid,
          user_id: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.editForm = res.data.content;
            _this.editForm.jid = id;
            _this.isFinish = res.data.content.jdstatus;
            _this.comStop = res.data.content.stoptime;
            _this.comStart = res.data.content.starttime;
            _this.tagsData = res.data.content.jdusers;
            _this.cctagsData = res.data.content.cc_userid;
            _this.editProgressView = true;
          } else {
            _this.$message({
              message: res.data.msg,
              type: 'error',
              duration: 2000,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    openAllPeople(val) {
      if (val == '2') {
        this.ccAllPeopleVisible = true;
      } else {
        this.AllPeopleVisible = true;
      }
    },
    handleClose(item, index, type) {
      if (type == 1) {
        this.tagsData.splice(this.tagsData.indexOf(item), 1);
        this.addForm.jdusers = this.tagsData;
      } else if (type == 2) {
        this.tagsData.splice(this.tagsData.indexOf(item), 1);
        this.editForm.jdusers = this.tagsData;
      } else if (type == 3) {
        this.tagsData.splice(this.tagsData.indexOf(item), 1);
        this.upForm.jdusers = this.tagsData;
      } else if (type == 4) {
        this.cctagsData.splice(this.cctagsData.indexOf(item), 1);
        this.addForm.cc_userid = this.cctagsData;
      }
    },
    pickerSelect(arr, type) {
      const that = this;
      if (type == 1) {
        let newPeople = JSON.parse(JSON.stringify(that.tagsData));

        arr.forEach(item => {
          newPeople.push(item);
        });
        if (newPeople.length > 9) {
          that.$message({
            message: '负责人不得超过9人',
            type: 'warning',
            duration: '1500',
          });
        } else {
          that.tagsData = newPeople;
          if (that.clickType == 1) {
            that.addForm.jdusers = that.tagsData;
          } else if (that.clickType == 2) {
            that.editForm.jdusers = that.tagsData;
          } else if (that.clickType == 3) {
            that.upForm.jdusers = that.tagsData;
          }
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
          multiple: false, //是否多选
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
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            that.tagsData = result.users;
            if (type == 1) {
              that.addForm.jdusers = that.tagsData;
            } else if (type == 2) {
              that.editForm.jdusers = that.tagsData;
            } else if (type == 3) {
              that.upForm.jdusers = that.tagsData;
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
    addManyPnew(type) {
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
            that.cctagsData = result.users;
            if (type == 1) {
              that.addForm.cc_userid = that.cctagsData;
            } else if (type == 2) {
              that.editForm.cc_userid = that.cctagsData;
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
    selectCorp() {
      this.newView = !this.newView;
      this.sloadNode(this.newNode, this.newResolve);
    },
    //el-tree执行单选
    handleCheck(a, b) {
      //a为传递给 data 属性的数组中该节点所对应的对象；b为树目前的选中状态对象
      this.$refs.stree.setCheckedNodes([a]);
      this.addForm.uname = a.name;
      this.addForm.jdstatus = a.status;
      this.addForm.xmid = a.xmid;
      if (a.status == 1 || a.status == 2) {
        this.addForm.fid = '';
      } else {
        this.addForm.fid = a.id;
      }
      this.newView = false;
    },
    sloadNode(node, resolve) {
      const that = this;
      that.newNode = node;
      that.newResolve = resolve;
      that.newNode.childNodes = [];
      if (node.level === 0) {
        that.$axios
          .post('/task/JinDuShuXingList', {
            xmid: that.searchId,
            status: '',
            fid: '',
          })
          .then(res => {
            if (res.data.code == 1) {
              let result = res.data.content;
              return resolve(result);
            }
          });
      } else if (node.level > 0) {
        let _id = node.data.fid;
        //-----获取子级组织
        that.$axios
          .post('/task/JinDuShuXingList', {
            xmid: that.searchId,
            status: node.data.status,
            fid: _id,
          })
          .then(res => {
            if (res.data.code == 1) {
              let result = res.data.content;
              return resolve(result);
            }
          });
      }
    },
    handleMCheck(a, b) {
      //a为传递给 data 属性的数组中该节点所对应的对象；b为树目前的选中状态对象
      this.$refs.dtree.setCheckedNodes([a]);
      this.upForm.uname = a.name;
      this.upForm.jdstatus = a.status;
      this.upForm.fid = a.fid;
      this.upForm.xmid = a.xmid;
      if (a.status == 1 || a.status == 2) {
        this.addForm.fid = '';
      } else {
        this.addForm.fid = a.id;
      }
      this.newView = false;
    },
    dloadNode(node, resolve) {
      const that = this;
      that.newNode = node;
      that.newResolve = resolve;
      that.newNode.childNodes = [];
      if (node.level === 0) {
        that.$axios
          .post('/task/JinDuShuXingList', {
            xmid: that.searchId,
            status: '',
            fid: '',
          })
          .then(res => {
            if (res.data.code == 1) {
              let result = res.data.content;
              return resolve(result);
            }
          });
      } else if (node.level > 0) {
        let _id = node.data.fid;
        //-----获取子级组织
        that.$axios
          .post('/task/JinDuShuXingList', {
            xmid: that.searchId,
            status: node.data.status,
            fid: _id,
          })
          .then(res => {
            if (res.data.code == 1) {
              let result = res.data.content;
              return resolve(result);
            }
          });
      }
    },
    goSure(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(this.addForm));
          delete newData.uname;
          newData.user_id = _this.$store.state.userInfo.uid;

          _this.$axios
            .post('/task/CreatedJinDu', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.loading = false;
                _this.$refs[formName].resetFields();
                _this.newProgressView = false;
                _this.getProgressList();
                _this.$message({
                  message: res.data.msg,
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
          _this.loading = false;
        }
      });
    },
    //修改
    editSure(formName) {
      // console.log(this.cctagsData);
      const _this = this;
      _this.editForm.cc_userid = _this.cctagsData;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.editForm));
          // newData.xmid = _this.$store.state.projectInfo.pid;
          newData.userid = _this.$store.state.userInfo.uid;
          newData.user_id = _this.$store.state.userInfo.uid;
          newData.type = 'update';
          _this.$axios
            .post('/task/UpdateJinDu', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.loading = false;
                _this.$refs[formName].resetFields();
                _this.editProgressView = false;
                if (_this.currentTabName == 'first') {
                  _this.getProgressList();
                } else if (_this.currentTabName == 'four') {
                  _this.getLCList();
                }
                _this.$message({
                  message: res.data.msg,
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
          _this.loading = false;
        }
      });
    },
    gantChange(val) {
      if (val == 1) {
        gantt.config.scales = [
          { unit: 'month', step: 1, format: '%F, %Y' },
          { unit: 'day', step: 1, format: '%j, %D' },
        ];
        // 数据解析
        // gantt.parse(this.tasks);
      } else if (val == 2) {
        gantt.config.scales = [
          { unit: 'year', step: 1, format: '%Y' },
          { unit: 'month', step: 1, format: '%M' },
        ];
        // 数据解析
        // gantt.parse(this.tasks);
      }
      this.getGant();
    },
    newAddClick() {
      this.tagsData = [];
      this.cctagsData = [];
      this.newProgressView = true;
      this.addForm = {
        jdtitle: '',
        starttime: '',
        stoptime: '',
        jdusers: [],
        cc_userid: [],
        jdcontent: '',
        proname: this.proName,
        jdstatus: '',
        status: '1',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: this.searchId,
      };
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();
      this.newProgressView = false;
      this.newView = false;
      this.tagsData = [];
    },
    closeEdit(formName) {
      this.$refs[formName].resetFields();
      this.editProgressView = false;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProgressList();
    },
    searchClick() {
      this.currentPage = 1;
      this.getProgressList();
    },
    searchNext(val) {
      this.proName = val
        ? this.nextProject.find(ele => ele.id === val).name
        : '';
      this.plan_end_riqi = val
        ? this.nextProject.find(ele => ele.id === val).plan_end_riqi
        : '';
      this.plan_start_riqi = val
        ? this.nextProject.find(ele => ele.id === val).plan_start_riqi
        : '';
      console.log(this.plan_start_riqi, this.plan_end_riqi);
      console.log(new Date(this.plan_start_riqi).getTime());
      if (this.currentTabName == 'first') {
        this.currentPage = 1;
        this.getProgressList();
      } else if (this.currentTabName == 'second') {
        this.getGant();
      } else if (this.currentTabName == 'third') {
        this.getCharts();
      }
    },
    searchLCClick() {
      this.getLCList();
    },
    getLCList() {
      const _this = this;

      _this.$axios
        .post('/task/JinDuList', {
          corp_id: _this.$store.state.cid,
          jdstatus: _this.jdstatus,
          fid: _this.nfid,
          name: '',
          status: 2,
          xmid: _this.searchId,
          user_id: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.progressList = res.data.content;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getProgressList() {
      const _this = this;
      _this.$axios
        .post('/task/JinDuList', {
          corp_id: _this.$store.state.cid,
          jdstatus: _this.jdstatus,
          fid: _this.nfid,
          name: _this.searchName,
          current_page: _this.currentPage,
          status: 1,
          xmid: _this.searchId,
          user_id: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.progressData = res.data.content.list;
            _this.total = res.data.content.total;
            if (_this.total > 0 && _this.progressData.length < 1) {
              _this.currentPage = res.data.content.current_page;
              _this.getProgressList();
            }
          } else {
            _this.$message({
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
    getGant() {
      const _this = this;
      _this.$axios
        .post('/task/JinDuHengDaoTu', {
          corp_id: _this.$store.state.cid,
          xmid: _this.searchId,
          user_id: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            gantt.clearAll();
            _this.tasks.data = res.data.content;
            gantt.parse(_this.tasks);
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit() {
      this.ccurrentPage = 1;
      this.getCharts();
    },
    chartChange(val) {
      this.ccurrentPage = val;
      this.getCharts();
    },
    getCharts() {
      const _this = this;
      _this.$axios
        .post('/task/JinDuTongJiList', {
          corp_id: _this.$store.state.cid,
          xmid: _this.searchId,
          name: _this.formInline.name,
          type: _this.formInline.type,
          current_page: _this.ccurrentPage,
          user_id: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.chartsData.bing = res.data.bing;
            _this.chartsData.content = res.data.content.list;
            _this.ctotal = res.data.content.total;
            _this.$nextTick(() => {
              // echarts.getInstanceByDom(_this.$refs.pbar).resize();
              _this.doPie();
            });
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取子项目
    getNextProject() {
      const _this = this;
      _this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            _this.nextProject = res.data.data;
            _this.searchId = res.data.data[0].id;
            _this.proName = res.data.data[0].name;
            _this.plan_end_riqi = res.data.data[0].plan_end_riqi;
            _this.plan_start_riqi = res.data.data[0].plan_start_riqi;

            if (_this.currentTabName == 'first') {
              _this.getProgressList();
            } else if (_this.currentTabName == 'third') {
              _this.getCharts();
            }
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doPie() {
      const _this = this;
      let mChart = echarts.init(document.getElementById('progressBar'));

      let newData = [];
      let newChart = JSON.parse(JSON.stringify(_this.chartsData.bing));
      newData = [
        { name: '已完成', value: newChart.yiw },
        { name: '未完成', value: newChart.weiw },
      ];
      mChart.clear();
      mChart.setOption({
        // tooltip: {
        //     trigger: 'item',
        //     formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '-5',
          textStyle: {
            color: ['red', '#fff'],
          },
          icon: 'circle',
          itemGap: 80,
        },
        series: [
          {
            name: '工程事件统计',
            type: 'pie',
            radius: ['56%', '80%'],
            width: 'auto',
            height: 'auto',
            data: newData,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              // formatter: '111'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = ['#01B1EE', '#06CDAF'];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    const _this = this;
    _this.$utils.checkding();
    _this.getNextProject();
    gantt.i18n.setLocale('cn');
    gantt.config.columns = [
      {
        name: 'text',
        label: '工程事件名称',
        // tree: true,
        width: '200',
      },
      {
        name: 'personName',
        label: '负责人',
        align: 'center',
        resize: true,
      },
      {
        name: 'start_date',
        label: '开始时间',
        align: 'center',
        width: 150,
      },
      // {
      //     name: 'end_date',
      //     label: '结束时间',
      //     align: 'center',
      //     width: 150
      // },
      { name: 'duration', label: '工期', align: 'center' },
    ];
    // gantt.config.readonly = true;
    gantt.config.scales = [
      { unit: 'month', step: 1, format: '%F, %Y' },
      { unit: 'day', step: 1, format: '%j, %D' },
    ];
    gantt.config.grid_width = 500;
    // 初始化
    gantt.init(_this.$refs.ganttRef);
    _this.getGant();
    // 数据解析
  },
  computed: {
    // 结束时间大于开始时间  - 8.64e7
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.addForm.stoptime;
          let xmstart = this.plan_start_riqi;
          let xmstop = this.plan_end_riqi;
          if (endDateVal) {
            return (
              time.getTime() < new Date(xmstart).getTime() ||
              time.getTime() > new Date(endDateVal).getTime()
            );
          } else {
            return (
              time.getTime() < new Date(xmstart).getTime() ||
              time.getTime() > new Date(xmstop).getTime()
            );
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.addForm.starttime;
          let xmstart = this.plan_start_riqi;
          let xmstop = this.plan_end_riqi;
          if (beginDateVal) {
            return (
              time.getTime() > new Date(xmstop).getTime() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return (
              time.getTime() < new Date(xmstart).getTime() ||
              time.getTime() > new Date(xmstop).getTime()
            );
          }
        },
      };
    },
    pickerEStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.editForm.stoptime;
          let xmstart = this.plan_start_riqi;
          let xmstop = this.plan_end_riqi;
          if (endDateVal) {
            return (
              time.getTime() < new Date(xmstart).getTime() ||
              time.getTime() > new Date(endDateVal).getTime()
            );
          } else {
            return (
              time.getTime() < new Date(xmstart).getTime() ||
              time.getTime() > new Date(xmstop).getTime()
            );
          }
        },
      };
      // return {
      //     disabledDate: (time) => {
      //         let endDateVal = this.editForm.stoptime;
      //         let MinVal = this.editForm.shangjistarttime;
      //         if (endDateVal) {
      //             return (
      //                 time.getTime() > new Date(endDateVal).getTime() ||
      //                 time.getTime() < new Date(MinVal).getTime()
      //             );
      //         }
      //     }
      // };
    },
    pickerEEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.editForm.starttime;
          let xmstart = this.plan_start_riqi;
          let xmstop = this.plan_end_riqi;
          if (beginDateVal) {
            return (
              time.getTime() > new Date(xmstop).getTime() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return (
              time.getTime() < new Date(xmstart).getTime() ||
              time.getTime() > new Date(xmstop).getTime()
            );
          }
        },
      };
      // return {
      //     disabledDate: (time) => {
      //         let beginDateVal = this.editForm.starttime;
      //         let MaxVal = this.editForm.shangjistoptime;
      //         if (beginDateVal) {
      //             return (
      //                 // time.getTime() < Date.now() - 8.64e7 ||
      //                 time.getTime() <
      //                     new Date(beginDateVal).getTime() - 8.64e7 ||
      //                 time.getTime() > new Date(MaxVal).getTime()
      //             );
      //         }
      //     }
      // };
    },
    pickStop() {
      return {
        disabledDate: time => {
          let beginDateVal = this.comStart;

          return (
            // time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() < new Date(beginDateVal).getTime() ||
            time.getTime() > new Date().getTime()
          );
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
  background: #ffffff;
  padding: 20px 37px !important;
  border-radius: 5px;
}

.echarts {
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    margin-top: 70px;
    text-align: center;
  }
  .nums {
    display: flex;
    justify-content: space-between;
    height: 104px;
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    .item {
      width: 190px;
      border-top: 1px solid #dbdbdb;
      display: flex;
      flex-direction: column;
      padding: 20px 0px;
      div {
        height: 30px;
        line-height: 30px;
        font-weight: 400;
        color: #333333;
      }
    }
    .item:nth-child(1) {
      border-right: 1px solid #dbdbdb;
    }
  }
}
</style>
