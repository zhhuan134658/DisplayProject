<template>
  <!-- 里程碑 -->
  <div id="projectProgress" ref="elementS">
    <div class="main">
      <div class="content">
        <div class="ppHerder">
          <div>
            <div style="line-height: 40px">当前项目名称：</div>
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
          <div>
            <el-button type="primary" round size="medium" @click="manyAddClick"
              >批量新建里程碑</el-button
            >
            <el-button type="primary" round size="medium" @click="newAddClick"
              >新建里程碑</el-button
            >
          </div>
        </div>
        <div class="fourLicheng">
          <div class="flMain">
            <div class="flmTips">
              <div>
                <div>
                  <img src="../../../assets/journal/startp.jpg" alt="" />
                  进度
                </div>
                <div>
                  <img src="../../../assets/journal/weip.png" alt="" />
                  进度=0
                </div>
                <div>
                  <img src="../../../assets/journal/syi.png" alt="" />
                  0%--100% 进度
                </div>
                <div>
                  <img src="../../../assets/journal/fwan.png" alt="" />
                  进度=100%
                </div>
              </div>
            </div>
            <div class="flmList">
              <div>
                <div
                  class="list"
                  v-for="(item, index) in progressList"
                  :key="index"
                >
                  <div class="listtop">
                    <div class="ltlp" @click="goNext(item)">
                      <img
                        v-if="item.sbjindu == 100"
                        src="../../../assets/journal/finish.png"
                        alt=""
                      />
                      <img
                        v-else-if="item.sbjindu == 0"
                        src="../../../assets/journal/wei.png"
                        alt=""
                      />
                      <img
                        v-else
                        src="../../../assets/journal/start.png"
                        alt=""
                      />
                      <span v-if="item.sbjindu != 100" class="jinClass"
                        >{{ item.sbjindu }}%</span
                      >
                    </div>
                    <div class="ltr">
                      <el-progress
                        :percentage="item.sbjindu"
                        :show-text="false"
                        status="success"
                      ></el-progress>
                    </div>
                  </div>
                  <div class="listbottom">
                    <el-tooltip placement="top-start">
                      <div slot="content">
                        {{ item.jdtitle }}<br />{{ item.sbjindu }}%
                      </div>
                      <div @click="editClick(item.id)">
                        {{ item.jdtitle }}
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="list">
                  <div class="listtop">
                    <div class="ltlp">
                      <img
                        v-if="lcType == 1"
                        src="../../../assets/journal/finish.png"
                        alt=""
                      />
                      <img
                        v-else
                        src="../../../assets/journal/wei.png"
                        alt=""
                      />
                      <span v-if="lcType != 1">{{ progressList.length }}</span>
                    </div>
                    <div class="ltr"></div>
                  </div>
                  <div class="listbottom">
                    <div>完成</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="display: flex; justify-content: flex-end; margin: 20px 0"
            >
              <el-button type="primary" round size="medium" @click="jinAddClick"
                >进度上报</el-button
              >
            </div>
            <el-table
              :border="true"
              :data="tpList"
              :header-cell-style="tableHeaderClass"
              :cell-style="tableRowClass"
              style="width: 100%; margin-bottom: 20px"
              border
              max-height="650"
              row-key="id"
            >
              <el-table-column
                prop="project_name"
                label="项目名称"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>

              <el-table-column
                prop="station"
                label="桩号"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="pile_diameter"
                label="桩径"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="designholedepth"
                label="设计孔深"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>

              <el-table-column
                prop="yxz_length"
                label="有效桩长"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="actualholedepth"
                label="实际孔深"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="layer_length"
                label="土层桩长"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="layer_price"
                label="土层单价"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="rock_length"
                label="岩层桩长"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="rock_price"
                label="岩层单价"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="emptyhole_length"
                label="空孔桩长"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="emptyhole_price"
                label="空孔单价"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="subsidy"
                label="孤石/溶洞补贴"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="subsidy_price"
                label="补贴单价"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="design_fl"
                label="设计砼方量"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="actual_fl"
                label="实际砼方量"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="filling_xs"
                label="充盈系数"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="total"
                label="合计总价"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="备注"
                align="left"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column label="操作" align="left" width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    style="margin-right: 10px"
                    @click="editClick(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    v-if=""
                    title="确定删除吗？"
                    @onConfirm="deleteClickZ(scope.row)"
                  >
                    <el-button size="mini" type="danger" slot="reference"
                      >删除</el-button
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <el-dialog
        :title="taskTitle"
        :visible.sync="newProgressView"
        width="800px"
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
          <el-form-item label="项目名称:">
            <el-select
              v-model="addForm.project_name"
              clearable
              filterable
              placeholder="请选择项目"
              @change="prochange"
            >
              <el-option
                v-for="(item, index) in allProjectList"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="桩号:" prop="station">
            <el-input-number
              v-model="addForm.station"
              controls-position="right"
              :min="0"
              placeholder="请输入桩号"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="桩径:" prop="pile_diameter">
            <el-input-number
              v-model="addForm.pile_diameter"
              controls-position="right"
              :min="0"
              placeholder="请输入桩径"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="设计孔深:" prop="designholedepth">
            <el-input-number
              v-model="addForm.designholedepth"
              controls-position="right"
              :min="0"
              placeholder="请输入设计孔深"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="有效桩长:" prop="yxz_length">
            <el-input-number
              v-model="addForm.yxz_length"
              controls-position="right"
              :min="0"
              placeholder="请输入有效桩长"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="实际孔深:" prop="actualholedepth">
            <el-input-number
              v-model="addForm.actualholedepth"
              controls-position="right"
              :min="0"
              placeholder="请输入实际孔深"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="土层桩长:" prop="layer_length">
            <el-input-number
              v-model="addForm.layer_length"
              controls-position="right"
              :min="0"
              placeholder="请输入土层桩长"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="土层单价:" prop="layer_price">
            <el-input-number
              v-model="addForm.layer_price"
              controls-position="right"
              :min="0"
              placeholder="请输入土层单价"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="岩层桩长:" prop="rock_length">
            <el-input-number
              v-model="addForm.rock_length"
              controls-position="right"
              :min="0"
              placeholder="请输入岩层桩长"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="岩层单价:" prop="rock_price">
            <el-input-number
              v-model="addForm.rock_price"
              controls-position="right"
              :min="0"
              placeholder="岩层单价"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="空孔桩长:" prop="emptyhole_length">
            <el-input-number
              v-model="addForm.emptyhole_length"
              controls-position="right"
              :min="0"
              placeholder="空孔桩长"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="空孔单价:" prop="emptyhole_price">
            <el-input-number
              v-model="addForm.emptyhole_price"
              controls-position="right"
              :min="0"
              placeholder="空孔单价"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="孤石/溶洞记录:" prop="subsidy">
            <el-input
              v-model="addForm.subsidy"
              controls-position="right"
              :min="0"
              placeholder="孤石/溶洞记录价"
            ></el-input>
          </el-form-item>
          <el-form-item label="补贴单价:" prop="subsidy_price">
            <el-input-number
              v-model="addForm.subsidy_price"
              controls-position="right"
              :min="0"
              placeholder="补贴单价"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="设计方量:" prop="design_fl">
            <el-input-number
              v-model="addForm.design_fl"
              controls-position="right"
              :min="0"
              placeholder="设计方量"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="实际方量:" prop="actual_fl">
            <el-input-number
              v-model="addForm.actual_fl"
              controls-position="right"
              :min="0"
              placeholder="实际方量"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="充盈系数:" prop="filling_xs">
            <el-input-number
              v-model="addForm.filling_xs"
              controls-position="right"
              :min="0"
              placeholder="充盈系数"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="合计总价:" prop="total">
            <el-input-number
              v-model="addForm.total"
              controls-position="right"
              :min="0"
              placeholder="合计总价"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="备注:" prop="remarks">
            <el-input-number
              v-model="addForm.remarks"
              controls-position="right"
              :min="0"
              placeholder="备注"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loading"
            size="medium"
            @click="goSure('proform')"
            >确 定</el-button
          ><el-button @click="closeDialog('proform')" size="medium"
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
          <el-form-item label="里程碑名称：" prop="jdtitle">
            <el-input v-model="editForm.jdtitle" maxlength="10"></el-input>
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
            <el-input v-model="editForm.proname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" prop="starttime">
            <el-date-picker
              v-model="editForm.starttime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerEStart"
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
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="里程碑描述：">
            <el-input
              v-model="editForm.jdcontent"
              type="textarea"
              :rows="4"
              maxlength="100"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loading"
            size="medium"
            @click="editSure('peform')"
            >确 定</el-button
          >
          <!-- <el-button
                        v-if="isFinish != '3'"
                        @click="completeEdit"
                        size="medium"
                        >完 成</el-button
                    > -->
          <el-button type="danger" @click="deleteEdit" size="medium"
            >删 除</el-button
          ><el-button @click="closeEdit('peform')" size="medium"
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
          <el-form-item label="完成时间：" prop="jdstoptime">
            <el-date-picker
              v-model="comform.jdstoptime"
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
      >
        <div class="newExcel">
          <div class="leftForm">
            <el-form
              @submit.native.prevent
              ref="form"
              :rules="creatProjectrules"
              :label-position="labelPosition"
              :model="upForm"
              label-width="120px"
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
              <el-form-item label="项目名称：" prop="proname">
                <el-input v-model="upForm.proname" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item class="newtijiao" label="上传文件：">
                <div class="newcom">
                  <img
                    width="50"
                    src="../../../assets/workbench/exceladd.png"
                    alt
                  />
                  <p>请上传文件</p>
                  <eupload
                    @listenToChild="showe"
                    :upImgList2="upImgList2"
                    :licenceImg2="licenceImg2"
                    :isShow2="isShow2"
                  ></eupload>
                </div>
              </el-form-item>
              <div class="warn">
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
              <el-form-item style="margin-top: 20px; text-align: center">
                <el-button
                  type="primary"
                  size="medium"
                  :loading="loaded"
                  @click="save"
                  >确定</el-button
                >
                <el-button type="primary" size="medium" @click="upCancel"
                  >取消</el-button
                >
              </el-form-item>
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
            prop="milepostjd"
            style="margin-bottom: 40px"
          >
            <el-slider
              v-model="jinForm.milepostjd"
              :marks="marksSlider"
            ></el-slider>
          </el-form-item>
          <el-form-item label="上报里程碑：" prop="milepostid">
            <el-select
              v-model="jinForm.milepostid"
              placeholder="请选择里程碑"
              filterable
            >
              <el-option
                v-for="(item, index) in progressList"
                :key="index"
                :label="item.jdtitle"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进展情况：" prop="describe">
            <el-input
              type="textarea"
              placeholder="请输入进展情况"
              v-model="jinForm.describe"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model="jinForm.remarks"
              maxlength="200"
              show-word-limit
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
                  <div v-for="(item, index) in jinForm.biz_data" :key="index">
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
          <el-button @click="cancelJin('jinRef')">取消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            size="medium"
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
          <div class="vdmHeader">
            里程碑名称：<span>{{ duName }}</span>
          </div>
          <el-timeline v-if="viewDList.length > 0">
            <el-timeline-item
              v-for="(item, index) in viewDList"
              :key="index"
              :timestamp="item.created"
              color="#177ae0"
              placement="top"
            >
              <el-card>
                <div style="margin-bottom: 20px">
                  <div style="margin-bottom: 10px">
                    <span style="color: #666">进度：</span>
                    {{ item.milepostjd }}%
                  </div>
                  <div v-if="item.describe">
                    <span style="color: #666">进展情况：</span>
                    {{ item.describe }}
                  </div>
                </div>
                <div class="dingFilesClass">
                  <div v-for="(item1, index1) in item.biz_data" :key="index">
                    <div>
                      <div class="fileIcon">
                        <i class="el-icon-document"></i>
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
                        item.name.length <= 2
                          ? item.name
                          : item.name.substr(item.name.length - 2, 2)
                      }}</span
                    >
                  </div>
                  <div>
                    {{ item.name }} 提交于
                    {{ item.createdtime }}
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
const echarts = require('echarts');
import gantt from 'dhtmlx-gantt'; // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js'; // 本地化
import * as dd from 'dingtalk-jsapi';
import eupload from '../../../components/excelUpload.vue';
// import peoplePick from '../../components/complexPicker.vue';
var timeFn = null;
export default {
  name: 'progressMilepost',
  components: { eupload },
  data() {
    const validateuser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择负责人'));
      } else {
        callback();
      }
    };
    return {
      allProjectList: [],
      cctagsData: [],
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
        milepostjd: 0,
        milepostid: '',
        describe: '',
        remarks: '',
        corp_id: '',
        xmid: '',
        biz_data: [],
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
        status: '2',
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
            message: '里程碑名称不能为空',
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
            message: '里程碑名称不能为空',
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
      taskTitle: '新建里程碑',
      activeName: 'first',
      projectList: [],
      addForm: {
        project_name: '',
        station: '',
        pile_diameter: '',
        designholedepth: '',
        yxz_length: '',
        actualholedepth: '',
        layer_length: '',
        layer_price: '',
        rock_length: '',
        rock_price: '',
        emptyhole_length: '',
        emptyhole_price: '',
        subsidy: '',
        subsidy_price: '',
        design_fl: '',
        actual_fl: '',
        filling_xs: '',
        total: 0,
        remarks: '',
        enclosure: [],
      },
      editForm: {
        jdtitle: '',
        starttime: '',
        stoptime: '',
        jdusers: [],
        jdcontent: '',
        proname: '',
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
      progressList: [],
      progressData: [],
      newNode: [],
      newResolve: [],
      tagsData: [],
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
      pagesize: 10,
      currentPage: 1,
      currentTabName: 'first',
      isFinish: '',
      currentFid: '',
      newLStatus: 1,
      lcType: 2,
    };
  },

  methods: {
    tableHeaderClass({ row, rowIndex }) {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass({ row, rowIndex }) {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    jinAddClick() {
      this.JinFormVisible = true;
    },
    cancelJin(formName) {
      this.loading = false;
      this.JinFormVisible = false;
      this.$refs[formName].resetFields();
      this.jinForm.corp_id = '';
      this.jinForm.xmid = '';
    },
    sureJin(formName) {
      const _this = this;
      _this.jinForm.corp_id = _this.$store.state.cid;
      _this.jinForm.xmid = _this.searchId;
      _this.jinForm.userid = _this.$store.state.userInfo.uid;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.jinForm));
          _this.$axios
            .post('/task/reportprogress', newData)
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
        jdusers: [],
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
            _this.jinForm.biz_data = result.data;
          },
          onFail: function (err) {},
        });
      });
      dd.error(function (err) {});
    },
    derive() {
      let url = 'http://oazhukuai.zzdingyun.com/public/lichengbei.xls';
      dd.ready(function () {
        dd.biz.util.downloadFile({
          url: url,
          name: '里程碑导入模板.xls', //定义下载文件名字
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
        .post('/task/UpdateJinDu', {
          jid: row.id,
          type: 'delete',
          user_id: _this.$store.state.userInfo.uid,
          status: '2',
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
        .post('/task/UpdateJinDu', {
          jid: _this.editID,
          type: 'delete',
          user_id: _this.$store.state.userInfo.uid,
          status: '2',
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
    editClick(id) {
      this.editID = id;
      this.comform.jid = id;
      this.getInfo(id);
    },
    getInfo(id) {
      const _this = this;
      _this.$axios
        .post('/task/JinDuContent', {
          jid: id,
          user_id: _this.$store.state.userInfo.uid,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.editForm = res.data.content;
            _this.editForm.jid = id;
            _this.isFinish = res.data.content.jdstatus;
            _this.comStop = res.data.content.stoptime;
            _this.comStart = res.data.content.starttime;
            _this.cctagsData = res.data.content.cc_userid;
            _this.tagsData = res.data.content.jdusers;
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
    goSure(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addForm));

          _this.$axios
            .post('/finance/addgcsj', newData)
            .then(res => {
              if (res.data.code == 1) {
                _this.loading = false;
                this.$refs[formName].resetFields();
                _this.newProgressView = false;
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
    //修改
    editSure(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(this.editForm));
          // newData.xmid = _this.$store.state.projectInfo.pid;
          newData.userid = _this.$store.state.userInfo.uid;
          newData.type = 'update';
          newData.user_id = _this.$store.state.userInfo.uid;
          _this.$axios
            .post('/task/UpdateJinDu', newData)
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
        jdcontent: '',
        proname: this.proName,
        jdstatus: '',
        status: '2',
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
    searchNext(val) {
      this.proName = val
        ? this.nextProject.find(ele => ele.id === val).name
        : '';
      this.getLCList();
    },
    searchLCClick() {
      this.getLCList();
    },
    goNext(item) {
      const _this = this;
      _this.duName = item.jdtitle;
      _this.$axios
        .post('/task/modifyrecord', {
          corp_id: _this.$store.state.cid,
          milepostid: item.id,
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
        .post('/finance/eventlist', {
          current_page: this.currentPage,
          num: this.pagesize,
          project_name: this.formInline.name,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.total = res.data.content.total;
            _this.progressList = res.data.content.list;
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
    _this.allProjectList = JSON.parse(_this.$store.state.allPro); //项目列表
    _this.$utils.checkding();

    _this.getNextProject();

    // 数据解析
  },
};
</script>
