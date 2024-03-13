<template>
  <!-- 里程碑 -->
  <div id="projectProgress" ref="elementS">
    <div class="main">
      <div class="header">
        <div class="headerContent" style="padding: 0px">
          <el-form :inline="true" class="demo-form-inline">
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
              <el-form-item label="里程碑名称：" label-width="85px">
                <el-input
                  v-model="searchName"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <div style="text-align: center; margin-top: 22px">
                <el-button type="primary" size="medium" @click="searchClick"
                  >搜索</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </div>

      <div class="content">
        <div class="ppHerder">
          <div></div>
          <div>
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
              icon="el-icon-plus"
              @click="manyAddClick"
              >批量新建里程碑</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-plus"
              @click="newAddClick"
              >新建里程碑</el-button
            >
          </div>
        </div>
        <div class="fourLicheng">
          <div class="flMain">
            <el-table
              :border="true"
              @selection-change="handleSelectionChange"
              :data="progressList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              style="
                width: 100%;
                margin-bottom: 20px;
                border: 1px solid #ebeef5;
              "
              max-height="650"
              row-key="id"
              :tree-props="{
                children: 'zi',
                hasChildren: 'hasChildren',
              }"
              size="mini"
              :row-class-name="tableRowClassName"
            >
             <el-table-column
                type="selection"
                width="55">
                </el-table-column>
              <el-table-column type="index" label="序号" width="55" />
              <el-table-column
                label="里程碑名称"
                :show-overflow-tooltip="true"
                align="left"
              >
                <template slot-scope="scope">
                  <span
                    style="color: #409eff; cursor: pointer"
                    @click="goNext(scope.row)"
                    >{{ scope.row.name }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                label="负责人"
                align="left"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.personincharge
                      .map(person => person.name)
                      .join('，')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="里程碑描述"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column align="left" label="工程进度" width="200">
                <template slot-scope="scope">
                  <div style="display: flex; align-items: center">
                    <el-progress
                      :percentage="Number(scope.row.schedule)"
                      :show-text="false"
                      :color="[{ color: '#FDAE05' }]"
                    ></el-progress>
                    <span class="progressText">{{ scope.row.schedule }}%</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="schedule_status"
                align="left"
                label="计划状态"
              >
              </el-table-column>
              <el-table-column
                prop="starttime"
                label="开始时间"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="endtime"
                label="结束时间"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column label="操作" align="left" width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    style="margin-right: 10px"
                    @click="editClick(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    style="margin-right: 10px"
                    @click="jinAddClick(scope.row)"
                    >上报</el-button
                  >
                  <el-button
                    type="text"
                    size="mini"
                    v-if="printable"
                    @click.stop="
                      printPDF(scope.row.id).catch(err => {
                        console.log(err);
                      })
                    "
                    >打印</el-button
                  >
                  <el-popconfirm
                    title="确定删除吗？"
                    @confirm="deleteClickZ(scope.row)"
                  >
                    <el-button size="mini" type="text" slot="reference"
                      >删除</el-button
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog
        :title="taskTitle"
        :visible.sync="newProgressView"
        width="800px"
        @close="closeDialog('proform')"
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
          ref="proform"
          :label-position="labelPosition"
          :model="addForm"
          :rules="newProgressRule"
          label-width="130px"
        >
          <el-form-item label="里程碑名称：" prop="name">
            <el-input
              v-model="addForm.name"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="personincharge">
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
                <!-- <div class="mdnPlus">
                  <i class="el-icon-plus"></i>
                </div> -->
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
                      2 >= item.name.length
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
                <!-- <div class="mdnPlus">
                  <i class="el-icon-plus"></i>
                </div> -->
              </div>
              <div class="addMList addMListLast" v-if="tagsData.length == 0">
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
          <el-form-item label="协作人：" prop="sponsorname">
            <div class="addManeger" style="display: flex">
              <div class="addMList" v-if="sponsorname.length > 3">
                <div class="mdnList">
                  <div class="mdren" @click="openAllPeople1()">
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
                v-for="(item, index) in sponsorname.slice(0, 3)"
                :key="index"
              >
                <div class="mdnList">
                  <div class="mdren">
                    <img v-if="item.avatar" :src="item.avatar" alt />
                    <span class="touxiang" v-else>{{
                      2 >= item.name.length
                        ? item.name
                        : item.name.substr(item.name.length - 2, 2)
                    }}</span>
                  </div>
                  <p>{{ item.name }}</p>
                  <i
                    class="el-icon-error"
                    @click="handleClose(item, index, 5)"
                  ></i>
                </div>
                <div class="mdnPlus">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
              <div class="addMList addMListLast">
                <div class="mdnList">
                  <div class="mdren" @click="addManyPnew1">
                    <span class="touxiang">
                      <i class="el-icon-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="抄送人：" prop="cc_user">
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
                      2 >= item.name.length
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
          <el-form-item label="项目名称：" prop="project_name">
            <el-input
              v-model="addForm.project_name"
              :disabled="true"
              size="small"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="里程碑类型：" prop="type">
            <el-radio-group v-model="addForm.type" size="mini">
              <el-radio-button label="1">里程碑</el-radio-button>
              <el-radio-button label="2">里程碑</el-radio-button>
            </el-radio-group>
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
          <el-form-item label="结束时间：" prop="endtime">
            <el-date-picker
              v-model="addForm.endtime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerEnd"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="计划描述：">
            <el-input
              v-model="addForm.remarks"
              type="textarea"
              :rows="4"
              maxlength="100"
              size="small"
            ></el-input>
          </el-form-item>
               <el-form-item class="newtijiao" label="上传附件：">
                <div @click="addFilesClick1(3)" style="color: skyblue;width:146px;">
                  添加附件
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in addForm.enclosure"
                    :key="index"
                  >
                    <div style="display: flex">
                      <div style="display: flex; width: 700px">
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
                            style="width: 50px; height: 50px;margin:10px"
                          ></img>
                        </div>
                        <div class="filesTitle">
                          <div class="yichu">
                            {{ item.fileName }}
                          </div>
                          <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                        </div>
                      </div>
                      <div style="display: flex;position: relative;top: 30%;right: 30%;">
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
          ><el-button @click="closeDialog('proform')" size="small"
            >取 消</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="修改里程碑"
        :visible.sync="editProgressView"
        width="600px"
        @close="closeEdit('peform')"
      >
        <el-form
          @submit.native.prevent
          ref="peform"
          :label-position="labelPosition"
          :model="editForm"
          :rules="editProgressRule"
          label-width="130px"
        >
          <el-form-item label="里程碑名称：" prop="name">
            <el-input
              v-model="editForm.name"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="personincharge">
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
                      2 >= item.name.length
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
          <el-form-item label="协作人：" prop="sponsorname">
            <div class="addManeger" style="display: flex">
              <div class="addMList" v-if="sponsorname.length > 3">
                <div class="mdnList">
                  <div class="mdren" @click="openAllPeople1()">
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
                v-for="(item, index) in sponsorname.slice(0, 3)"
                :key="index"
              >
                <div class="mdnList">
                  <div class="mdren">
                    <img v-if="item.avatar" :src="item.avatar" alt />
                    <span class="touxiang" v-else>{{
                      2 >= item.name.length
                        ? item.name
                        : item.name.substr(item.name.length - 2, 2)
                    }}</span>
                  </div>
                  <p>{{ item.name }}</p>
                  <i
                    class="el-icon-error"
                    @click="handleClose(item, index, 5)"
                  ></i>
                </div>
                <div class="mdnPlus">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
              <div class="addMList addMListLast">
                <div class="mdnList">
                  <div class="mdren" @click="addManyPnew1(2)">
                    <span class="touxiang">
                      <i class="el-icon-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="抄送人：" prop="cc_user">
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
                      2 >= item.name.length
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
                  <div class="mdren" @click="addManyPnew(2)">
                    <span class="touxiang">
                      <i class="el-icon-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="项目名称：" prop="project_name">
            <el-input
              v-model="editForm.project_name"
              :disabled="true"
              size="small"
            ></el-input>
          </el-form-item>
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
          <el-form-item label="结束时间：" prop="endtime">
            <el-date-picker
              v-model="editForm.endtime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerEEnd"
              size="small"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="里程碑描述：">
            <el-input
              v-model="editForm.remarks"
              type="textarea"
              :rows="4"
              maxlength="100"
              size="small"
            ></el-input>
          </el-form-item>
              <el-form-item class="newtijiao" label="上传附件：">
                <div @click="addFilesClick1(3)" style="color: skyblue;width:146px;">
                  添加附件
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in addForm.enclosure"
                    :key="index"
                  >
                    <div style="display: flex">
                      <div style="display: flex; width: 700px">
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
                            style="width: 50px; height: 50px;margin:10px"
                          ></img>
                        </div>
                        <div class="filesTitle">
                          <div class="yichu">
                            {{ item.fileName }}
                          </div>
                          <p>{{ (item.fileSize / 1024).toFixed(2) }}kb</p>
                        </div>
                      </div>
                      <div style="display: flex;position: relative;top: 30%;right: 30%;">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loading"
            size="small"
            @click="editSure('peform')"
            >确 定</el-button
          >
          <!-- <el-button type="danger" @click="deleteEdit" size="small"
            >删 除</el-button
          > -->
          <el-button @click="closeEdit('peform')" size="small"
            >取 消</el-button
          >
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
                  2 >= item.name.length
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
                  2 >= item.name.length
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
                  2 >= item.name.length
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
        title="全部协作人员"
        :append-to-body="true"
        :visible.sync="sponsornameVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
      >
        <div style="margin-bottom: 10px">共有{{ sponsorname.length }}人</div>
        <div class="showAllPeople">
          <div
            class="addMList"
            v-for="(item, index) in sponsorname"
            :key="index"
          >
            <div class="mdnList">
              <div class="mdren">
                <img v-if="item.avatar" :src="item.avatar" alt />
                <span class="touxiang" v-else>{{
                  2 >= item.name.length
                    ? item.name
                    : item.name.substr(item.name.length - 2, 2)
                }}</span>
              </div>
              <p>{{ item.name }}</p>
              <i class="el-icon-error" @click="handleClose(item, index, 5)"></i>
            </div>
            <div class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="addMList addMListLast">
            <div class="mdnList">
              <div class="mdren" @click="addManyPnew1">
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
        <div>确认删除该里程碑？一旦删除无法找回！</div>
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
          <el-form-item label="完成时间：" prop="jdendtime">
            <el-date-picker
              v-model="comform.jdendtime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickStop"
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
        title="批量新建里程碑"
        :visible.sync="upFormVisible"
        :close-on-click-modal="false"
        @close="upCancel"
        class="uploadExcel"
        width="700px"
      >
        <div class="newExcel">
          <div class="leftForm">
            <div
              style="
                background: #f0f0f0;
                width: 106%;
                margin-left: -20px;
                height: 1px;
                margin-top: -20px;
                margin-bottom: 20px;
              "
            ></div>
            <el-form
              @submit.native.prevent
              ref="form"
              :label-position="labelPosition"
              :model="upForm"
              label-width="120px"
            >
              <el-form-item label="项目名称：" prop="proname">
                <el-input
                  v-model="upForm.proname"
                  :disabled="true"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item class="newtijiao" label="上传文件：">
                <div class="newcom">
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
              <div class="warn" style="margin-left: 120px">
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
                  width: 106%;
                  margin-left: -20px;
                  height: 1px;
                  margin-top: 20px;
                  margin-bottom: 20px;
                "
              ></div>
              <div
                style="
                  margin-bottom: -10px;
                  display: flex;
                  flex-direction: row-reverse;
                "
              >
                <el-button
                  style="margin-left: 10px"
                  type="primary"
                  size="small"
                  @click="upCancel"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  :loading="loaded"
                  @click="save"
                  >确定</el-button
                >
              </div>
            </el-form>
          </div>
        </div>
      </el-dialog>

      <el-dialog
        title="进度上报"
        :visible.sync="JinFormVisible"
        @close="cancelJin('jinRef')"
        width="600px"
        :close-on-click-modal="false"
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
          :label-position="labelPosition"
          :model="jinForm"
          :rules="jinFormRule"
          ref="jinRef"
          label-width="120px"
        >
          <el-form-item
            label="进度："
            prop="schedule"
            style="margin-bottom: 40px"
          >
            <el-slider
              v-model="jinForm.schedule"
              :marks="marksSlider"
              size="small"
            ></el-slider>
          </el-form-item>
          <el-form-item label="进展情况：" prop="progress">
            <el-input
              type="textarea"
              placeholder="请输入进展情况"
              v-model="jinForm.progress"
              maxlength="200"
              show-word-limit
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model="jinForm.remarks"
              maxlength="200"
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
                  <div v-for="(item, index) in jinForm.enclosure" :key="index">
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
        <div
          style="
            background: #f0f0f0;
            width: 105%;
            margin-left: -20px;
            height: 1px;
            margin-top: -20px;
            margin-bottom: -20px;
          "
        ></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelJin('jinRef')" size="small">取消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            size="small"
            @click="sureJin('jinRef')"
            >确定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="进度详情"
        :visible.sync="viewDuFormVisible"
        width="600px"
        class="mileposttimeViewClass"
        :close-on-click-modal="false"
      >
        <div class="viewDMain">
          <div class="vdmHeader" style="text-align: left">
            里程碑名称：<span>{{ duName }}</span>
          </div>
          <el-timeline v-if="viewDList.length > 0">
            <el-timeline-item
              v-for="(item, index) in viewDList"
              :key="index"
              :timestamp="item.up_time"
              color="#177ae0"
              placement="top"
            >
              <el-card>
                <div style="margin-bottom: 20px">
                  <div style="margin-bottom: 10px">
                    <span style="color: #666">进度：</span>
                    <span style="color: #3296fa">{{ item.schedule }}%</span>
                  </div>
                  <div v-if="item.progress">
                    <span style="color: #666">进展情况：</span>
                    {{ item.progress }}
                  </div>
                </div>
                <div class="dingFilesClass">
                  <div v-for="(item1, index1) in item.enclosure" :key="index1">
                    <div>
                      <div class="fileIcon">
                        <i
                          class="iconfont icon-wenjian"
                          style="color: #fcb138"
                        ></i>
                      </div>
                      <div class="filesTitle">
                        <div>
                          {{ item1.fileName }}
                        </div>
                        <p>{{ (item1.fileSize / 1024).toFixed(2) }}kb</p>
                      </div>
                    </div>
                    <div>
                      <div class="watchBtn" @click="watchFiles(item1)">
                        预览
                      </div>
                    </div>
                  </div>
                </div>

                <div class="vbottom">
                  <div>
                    <img v-if="item.avater" :src="item.avater" alt="" /><span
                      v-else
                      >{{
                        2 >= item.name.length
                          ? item.name
                          : item.name.substr(item.name.length - 2, 2)
                      }}</span
                    >
                  </div>
                  <div>
                    {{ item.name }} 提交于
                    {{ item.up_time.split(' ')[0] }}
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <div style="text-align: center" v-else>
            <img src="../../../assets/project/noData.png" alt="" />
            <p>暂无进度记录，请去上报进度</p>
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
import * as dd from 'dingtalk-jsapi';
import eupload from '../../../components/excelUpload.vue';
// import peoplePick from '../../components/complexPicker.vue';

var timeFn = null;
export default {
  name: 'progressPlan',
  components: { eupload },
  data() {
    return {
      plan_end_riqi: '',
      plan_start_riqi: '',
      is_complete: 1,
      cctagsData: [],
      sponsorname: [],
      printable: false,
      isMilestone: 2,
      marksSlider: {
        0: '0',
        20: '20%',
        40: '40%',
        60: '60%',
        80: '80%',
      },
      viewDList: [],
      duName: '',
      viewDuFormVisible: false,
      jinForm: {
        id: '',
        schedule: 0,
        remarks: '',
        progress: '',
        type: '',
        enclosure: [],
      },
      jinFormRule: {
        milepostjd: [
          {
            required: true,
            message: '选择进度',
            trigger: ['blur', 'change'],
          },
        ],
        milepostid: [
          {
            required: true,
            message: '里程碑不能为空',
            trigger: ['blur', 'change'],
          },
        ],
      },
      JinFormVisible: false,
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
        jdendtime: '',
        jdyuanyin: '',
        userid: this.$store.state.userInfo.uid,
        jdstopurl: [],
      },
      upForm: {
        proname: '',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: '',
        sponsorname: [],
        personincharge: [],
        jdstatus: '',
        url: '',
        status: '2',
      },
      comRule: {
        jdendtime: [
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
            message: '里程碑名称不能为空',
            trigger: 'blur',
          },
        ],
        personincharge: [
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
        endtime: [
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
            message: '里程碑名称不能为空',
            trigger: 'blur',
          },
        ],
        personincharge: [
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
        endtime: [
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
      listSS: [],
      newView: false,
      nextRadio: 0,
      gantRadio: 1,
      labelPosition: 'right',
      newProgressView: false,
      taskTitle: '新建里程碑',
      activeName: 'first',
      projectList: [],
      addForm: {
        jdtitle: '',
        starttime: '',
        endtime: '',
        personincharge: [],
        sponsorname: [],
        sponsorname1: [],
        cc_user: [],
        jdcontent: '',
        proname: '',
        jdstatus: '',
        status: '2',
        type: 1,
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: '',
        enclosure: [],
      },
      editForm: {
        name: '',
        starttime: '',
        endtime: '',
        personincharge: [],
        cc_user: [],
        sponsorname: [],
        jdcontent: '',
        proname: '',
        jdstatus: '',
        corp_id: this.$store.state.cid,
        status: '1',
        userid: this.$store.state.userInfo.uid,
        xmid: '',
        shangjistarttime: '',
        shangjiendtime: '',
      },
      searchForm: {
        name: '',
        starttime: '',
        endtime: '',
        city: '',
      },
      moveId: '',
      progressData: [],
      newNode: [],
      newResolve: [],
      tagsData: [],
      AllPeopleVisible: false,
      ccAllPeopleVisible: false,
      sponsornameVisible: false,
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
      pagesize: 10,
      currentPage: 1,
      currentTabName: 'first',
      isFinish: '',
      currentFid: '',
      newLStatus: 1,
      lcType: 2,
      multSelectData: [],
    };
  },

  methods: {
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map(item => {
        if (!item.id) return '';
        return item.id;
      });
    },
    //批量删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$axios
              .post('/finance/milepost_del', {
                id: this.multSelectData,
              })
              .then(res => {
                if (res.data.code == 1) {
                  this.getLCList();
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
          message: '请先勾选要删除的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    deleteFiles1(index, type) {
      this.addForm.enclosure.splice(index, 1);
    },
    imgData(leixing) {
      let $url = '';
      let $leixing = leixing.split('.')[1];
      switch ($leixing) {
        case 'bmp':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'jpg':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';
          break;

        case 'png':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'tif':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'gif':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'pcx':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'jpeg':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'tiff':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/HN5t7RrCTR1599029144744.png';

          break;

        case 'doc':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3N8rDSxbWY1599028418394.png';

          break;

        case 'docx':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3N8rDSxbWY1599028418394.png';

          break;

        case 'xls':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yYQffEzfj51599028426375.png';

          break;

        case 'xlsx':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/yYQffEzfj51599028426375.png';

          break;

        case 'pdf':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/cP3jnxmJbM1599028432693.png';

          break;

        case 'ppt':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png';

          break;

        case 'pps':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png';

          break;

        case 'pptx':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png';

          break;

        case 'ppsx':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png';

          break;

        case 'ppa':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png';

          break;

        case 'pot':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/TbsxTxwKzC1599028442433.png';

          break;

        case 'rar':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5ZefDfefAP1599028449154.png';

          break;

        case 'zip':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5ZefDfefAP1599028449154.png';

          break;

        case 'AVI':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case 'mov':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case 'rmvb':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case 'rm':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case 'FLV':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case 'mp4':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case '3GP':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/MW2Z6anDFK1599028459067.png';

          break;

        case 'dwg':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png';

          break;

        case 'dxf':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png';

          break;

        case 'dwt':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/2GytfM5BY41599028466155.png';

          break;

        case 'ai':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/3QX6Xwexr71599028901919.png';

          break;

        case '3dm':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/epfBYhnxZF1599028496013.png';

          break;

        case 'dae':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/w6wXH3rRJn1599028908835.png';

          break;

        case 'abc':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'glTF':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'fbx':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'bvh':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'obj':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'stl':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case '3ds':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'ply':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        case 'x3d':
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/AHRi6Wdyd71599028501782.png';

          break;

        default:
          $url =
            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/5wH5QxaXPB1599029452541.png';
      }
      return $url;
    },
    //添加文件
    addFilesClick1(type) {
      const _this = this;
      _this.$axios
        .post('/dingding/getAuthUp', {
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
            console.log(_this.addForm, 'enclosureenclosure');
            result.data.forEach(item => {
              _this.addForm.enclosure.push(item);
            });
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
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    searchClick() {
      this.currentPage = 1;
      this.getLCList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLCList();
    },
    async getPrintableStatus() {
      const res = await this.$axios.post('/finance/control_display', {
        tableName: 'xie_jindu1',
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === '1';
      }
    },
    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post('/finance/dc_pdf', {
        tableName: 'xie_jindu1',
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },

    tableHeaderClass() {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass() {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    jinAddClick(row) {
      console.log(row);
      this.jinForm.id = row.id;
      this.jinForm.type = row.type;
      this.JinFormVisible = true;
      this.jinForm.schedule = Number(row.schedule);
      console.log(this.jinForm.schedule);
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
    },

    pickerEStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.editForm.endtime;
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

    cancelJin(formName) {
      this.loading = false;
      this.JinFormVisible = false;
      this.$refs[formName].resetFields();
      this.jinForm.corp_id = '';
      this.jinForm.xmid = '';
      this.jinForm.enclosure = [];
    },
    sureJin(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.jinForm));
          newData['type'] = 2;
          _this.$axios
            .post('/finance/schedule_up', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.getLCList();
                _this.loading = false;
                _this.JinFormVisible = false;
                _this.jinForm.biz_data = [];
                _this.$refs[formName].resetFields();
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
    manyAddClick() {
      this.upForm = {
        proname: this.proName,
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: this.searchId,
        personincharge: [],
        sponsorname: [],
        jdstatus: '',
        url: '',
        status: '2',
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
      console.log(item);
      const _this = this;
      var fileSizea = parseInt(item.fileSize);
      console.log(fileSizea);
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
                fileSize: fileSizea,
                fileType: item.fileType,
                onSuccess: function () {
                  //无，直接在native显示文件详细信息
                },
                onFail: function (err) {
                  console.log(err);
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
    deleteFiles(index) {
      this.jinForm.biz_data.splice(index, 1);
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
            _this.jinForm.enclosure = result.data;
          },
          onFail: function () {},
        });
      });
      dd.error(function () {});
    },
    derive() {
      let url = 'http://oazhukuai.zzdingyun.com/public/file/里程碑导入模板.xls';
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: url,
          name: '里程碑导入模板.xls', //定义下载文件名字
          onProgress: function () {
            // 文件下载进度回调
          },
          onSuccess: function () {},
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
      if (_this.upForm.url) {
        //   newData['is_complete'] = this.is_complete;
        _this.$axios
          .post('/finance/batch_milepost', newData)
          .then(res => {
            if (res.data.code == 1) {
              _this.loaded = false;
              _this.upFormVisible = false;
              _this.getLCList();
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
    },
    comCancel() {
      this.comVisible = false;
      this.comform = {
        jdendtime: '',
        jdyuanyin: '',
        userid: this.$store.state.userInfo.uid,
      };
    },
    comSure(formName) {
      const _this = this;
      _this.loaded = true;
      let newTime = new Date(_this.comStop).getTime();
      let newT = new Date(_this.comform.jdendtime).getTime();
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
      _this.comform.user_id = _this.$store.state.userInfo.uid;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/task/FinishJinDu', _this.comform)
            .then(res => {
              if (res.data.code == 1) {
                _this.loaded = false;
                _this.comVisible = false;
                _this.editProgressView = false;

                _this.getLCList();

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
    deleteClickZ(row) {
      const _this = this;
      _this.$axios
        .post('/finance/milepost_del', {
          id: row.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.getLCList();
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
    deleteClick() {
      const _this = this;
      _this.$axios
        .post('/task/milepost_del', {
          id: _this.editID,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.getLCList();
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
      this.getLCList();
    },
    backClick(item) {
      const _this = this;
      clearTimeout(timeFn);
      _this.jdstatus = item.sjjdstatus;
      _this.nfid = item.sjid;
      _this.getLCList();
    },
    nextClick(item) {
      const _this = this;
      clearTimeout(timeFn); //首先清除计时器
      timeFn = setTimeout(() => {
        _this.jdstatus = item.jdstatus;
        _this.nfid = item.id;
        _this.getLCList();
      }, 300);
    },
    editClick(id) {
      this.editID = id;
      this.comform.jid = id;
      this.getInfo(id);
    },
    getInfo(id) {
      const _this = this;
      _this.$axios
        .post('/finance/milepost_feedback', {
          id: id,
          type: this.isMilestone,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.editForm = res.data.content;
            _this.editForm.id = id;
            _this.addForm.enclosure = res.data.content.enclosure;

            _this.comStop = res.data.content.endtime;
            _this.comStart = res.data.content.starttime;
            _this.cctagsData = res.data.content.cc_user
              ? res.data.content.cc_user
              : [];
            _this.tagsData = res.data.content.personincharge;
            _this.sponsorname = res.data.content.sponsorname;
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
    addManyPnew1(type) {
      const that = this;
      console.log(type, 'typetypetypetype');
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
            console.log(that.listSS, 'that.sponsorname');
            result.users.forEach(item => {
              that.sponsorname.push(item);
            });

            let map = new Map();
            for (let item of that.sponsorname) {
              if (!map.has(item.emplId)) {
                map.set(item.emplId, item);
              }
            }
            that.sponsorname = [...map.values()];
            console.log(that.sponsorname);
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
    openAllPeople1() {
      this.sponsornameVisible = true;
    },
    openAllPeople(val) {
      if (val == '2') {
        this.ccAllPeopleVisible = true;
      } else if (val === '1') {
        this.sponsornameVisible = true;
      } else {
        this.AllPeopleVisible = true;
      }
    },
    handleClose(item, index, type) {
      if (type == 1) {
        this.tagsData.splice(this.tagsData.indexOf(item), 1);
        this.addForm.personincharge = this.tagsData;
      } else if (type == 2) {
        this.tagsData.splice(this.tagsData.indexOf(item), 1);
        this.editForm.personincharge = this.tagsData;
      } else if (type == 3) {
        this.tagsData.splice(this.tagsData.indexOf(item), 1);
        this.upForm.personincharge = this.tagsData;
      } else if (type == 4) {
        this.cctagsData.splice(this.cctagsData.indexOf(item), 1);
        this.addForm.cc_user = this.cctagsData;
        this.editForm.cc_user = this.cctagsData;
      } else if (type == 5) {
        this.sponsorname.splice(this.sponsorname.indexOf(item), 1);
        this.addForm.sponsorname = this.sponsorname;
        this.editForm.sponsorname = this.sponsorname;
      }
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
              that.addForm.personincharge = that.tagsData;
            } else if (type == 2) {
              that.editForm.personincharge = that.tagsData;
            } else if (type == 3) {
              that.upForm.personincharge = that.tagsData;
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
    addManySponsors(type) {
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
            that.sponsorname = result.users;
            if (type == 1) {
              that.addForm.sponsorname = that.sponsorname;
            } else if (type == 2) {
              that.editForm.sponsorname = that.sponsorname;
            } else if (type == 3) {
              that.upForm.sponsorname = that.sponsorname;
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
              that.addForm.cc_user = that.cctagsData;
            } else if (type == 2) {
              that.editForm.cc_user = that.cctagsData;
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
    goSure(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(_this.addForm);
          _this.addForm.sponsorname = _this.sponsorname;
          let newData = JSON.parse(JSON.stringify(_this.addForm));
          //   newData['is_complete'] = this.is_complete;
          _this.$axios
            .post('/finance/milepost', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.loading = false;
                _this.newProgressView = false;
                _this.sponsorname = [];
                this.$refs[formName].resetFields();
                _this.getLCList();
                _this.$message({
                  message: res.data.msg,
                  type: 'success',
                  duration: 2000,
                });
              } else {
                _this.newProgressView = false;
                _this.loading = false;
                _this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 2000,
                });
              }
            })
            .catch(function (error) {
              _this.newProgressView = false;
              _this.$message({
                message: error,
                type: 'error',
                duration: 2000,
              });
              _this.loading = false;
              console.error(error);
            });
        } else {
          _this.loading = false;
        }
      });
    },
    //修改
    editSure(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.editForm.enclosure = _this.addForm.enclosure;

          let newData = JSON.parse(JSON.stringify(this.editForm));
          //   newData['is_complete'] = this.is_complete;
          _this.$axios
            .post('/finance/update_milepost', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.loading = false;
                _this.$refs[formName].resetFields();
                _this.editProgressView = false;

                _this.getLCList();
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
    newAddClick() {
      this.tagsData = [];
      this.cctagsData = [];
      this.newProgressView = true;
      this.addForm = {
        jdtitle: '',
        starttime: '',
        endtime: '',
        personincharge: [],
        jdcontent: '',
        project_name: this.proName,
        jdstatus: '',
        status: '2',
        type: '1',
        corp_id: this.$store.state.cid,
        userid: this.$store.state.userInfo.uid,
        xmid: this.searchId,
        enclosure: [],
      };
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();
      this.newProgressView = false;
      this.newView = false;
      this.tagsData = [];
      this.addForm.enclosure = [];
      this.sponsorname = [];
    },
    closeEdit(formName) {
      this.$refs[formName].resetFields();
      this.editProgressView = false;
      this.addForm.enclosure = [];
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
      this.getLCList();
    },
    searchLCClick() {
      this.getLCList();
    },
    goNext(item) {
      const _this = this;
      _this.duName = item.name;
      //   console.log(item);
      _this.$axios
        .post('/finance/report_history', {
          id: item.id,
          type: item.type,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.viewDList = res.data.content;
            _this.viewDuFormVisible = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getLCList() {
      const _this = this;
      _this.$axios
        .post('/finance/milepost_list', {
          name: _this.searchName,
          xmid: _this.searchId,
          //   type: 2,
          //   is_complete: _this.is_complete,
          current_page: _this.currentPage,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.progressList = res.data.content.list
              ? res.data.content.list
              : [];
            _this.lcType = res.data.type;
            _this.total = res.data.content.total;
            if (_this.total > 0 && _this.progressList.length < 1) {
              _this.currentPage = res.data.content.current_page;
              _this.getLCList();
            }
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
            _this.getLCList();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    const _this = this;
    _this.$utils.checkding();
    _this.getPrintableStatus();
    _this.getNextProject();

    // 数据解析
  },
  computed: {
    // 结束时间大于开始时间  - 8.64e7
    pickerStart() {
      return {
        disabledDate: time => {
        //   let endDateVal = this.addForm.endtime;
        //   let xmstart = this.plan_start_riqi;
        //   let xmstop = this.plan_end_riqi;
        //   if (endDateVal) {
        //     return (
        //       time.getTime() < new Date(xmstart).getTime() ||
        //       time.getTime() > new Date(endDateVal).getTime()
        //     );
        //   } else {
        //     return (
        //       time.getTime() < new Date(xmstart).getTime() ||
        //       time.getTime() > new Date(xmstop).getTime()
        //     );
        //   }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
        //   let beginDateVal = this.addForm.starttime;
        //   let xmstart = this.plan_start_riqi;
        //   let xmstop = this.plan_end_riqi;
        //   if (beginDateVal) {
        //     return (
        //       time.getTime() > new Date(xmstop).getTime() ||
        //       time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
        //     );
        //   } else {
        //     return (
        //       time.getTime() < new Date(xmstart).getTime() ||
        //       time.getTime() > new Date(xmstop).getTime()
        //     );
        //   }
        },
      };
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  > .header {
    padding: 20px 24px;
    border-radius: 10px;
    background-color: #fff;
    margin-bottom: 16px;
    .headerContent {
      margin: 0 !important;
      .el-form {
        align-items: center;
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
  > .content {
    padding: 20px 24px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 73vh;
    .el-progress {
      width: 100%;
    }
    .progressText {
      display: inline-block;
      white-space: nowrap;
      margin-left: 4px;
      width: 45px;
      text-align: right;
    }
  }
  .watchBtn {
    white-space: nowrap;
    font-size: 10px;
    text-align: center;
  }
}
.selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.dingFilesClass {
  > div {
    > div {
      display: flex;
      align-items: center;
    }
  }
}
.filesTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin-bottom: 0 !important;
  }
}
</style>
