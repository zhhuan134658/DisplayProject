<template>
  <div id="appPanel">
    <!-- 项目看板 -->
    <div class="main">
      <div class="panelHeader">
        <div class="headerTop">
          <!-- <div>
            <el-button type="primary" plain size="medium" @click="backClick"
              >返回</el-button
            >
          </div> -->
          <componenTtiles :indexs='0' :pid="pid" :pname="pname"></componenTtiles>

        </div>
      </div>

      <div class="centers">
        <div class="one">
          <div class="oneLeft">
            <div
              v-for="(item, index) in oneList"
              class="oneLeftItem"
              :key="index"
              :class="[index == 7 ? 'oneBton xmjj1' : '']"
            >
              <div style="margin-left: 25px">
                <div  style="width: 43px; height: 43px">
                     <img
                  :src="require(`../../assets/twoImg/item${index + 1}.png`)"
                  mode=""
                  style="width: 100%; height: 100%"
                />
                </div>
              </div>
              <div style="margin-left: 15px">
                <div>{{ item.title }}</div>
                <div style="font-weight: bold">{{ item.value }}</div>
              </div>
            </div>
          </div>
          <div class="oneRight">
            <div class="oneRightnoShow" v-if="!projectInfo.project_video">
              <img
                src="@/assets/twoImg/add.png"
                alt=""
                style="width: 60px; height: 62px"
              />
              <eupload
                @listenToChild="showe"
                :upImgList2="upImgList2"
                :licenceImg2="licenceImg2"
                :isShow2="isShow2"
                :headers="11111"
                :isShows="true"
              ></eupload>
            </div>

            <div class="oneRightShow" v-else>
                <video :src="projectInfo.project_video" class="videos"></video>
              <div @click="bofang" class="bofang"> 
                <img
                  src="@/assets/twoImg/bofang1.png"
                  alt=""
                  style="width: 35px; height: 32px"
                />
              </div>
              <div style="width: 35px; height: 32px" class="zanting">
                <eupload
                  @listenToChild="showe1"
                  :upImgList2="upImgList2"
                  :licenceImg2="licenceImg2"
                  :isShow2="isShow2"
                  :headers="11111"
                  :isShows="false"
                ></eupload>
              </div>
            </div>
          </div>
        </div>
        <div class="two">
          <el-row>
            <el-col
              :span="11"
              style="width: 49.5%; border-radius: 10px;height:500px;"
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
                  <div class="left ">建设单位:</div>
                  <div class="right xmjj1">
                      <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.build_unit' placement="right-start">
                    <div >{{ project_situation.build_unit }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        placeholder=""
                        v-model="project_situation.build_unit"
                      >
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left ">设计单位:</div>
                  <div class="right xmjj1">
                                         <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.design_unit' placement="right-start">
                    <div >{{ project_situation.design_unit }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        placeholder=""
                        v-model="project_situation.design_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left">勘察单位:</div>
                  <div class="right xmjj1">
                                            <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.survey_unit' placement="right-start">
                    <div >{{ project_situation.survey_unit }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        placeholder=""
                        v-model="project_situation.survey_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left">监理单位:</div>
                  <div class="right xmjj1">
                                            <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.supervisor_unit' placement="right-start">
                    <div >{{ project_situation.supervisor_unit }}</div>
                    </el-tooltip>
              
                    <div v-else>
                      <el-input
                        placeholder=""
                        v-model="project_situation.supervisor_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left">施工单位:</div>
                  <div class="right xmjj1">
                                            <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.construction_unit' placement="right-start">
                    <div >{{ project_situation.construction_unit }}</div>
                    </el-tooltip>
                  
                    <div v-else>
                      <el-input
                        placeholder=""
                        v-model="project_situation.construction_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div class="left">总承包单位:</div>
                  <div class="right xmjj1">
                <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.zong_unit' placement="right-start">
                    <div >{{ project_situation.zong_unit }}</div>
                    </el-tooltip>
                    <div v-else>
                      <el-input
                        placeholder=""
                        v-model="project_situation.zong_unit"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="twoLeftBtnCount">
                  <div
                    class="left"
                    style="
                      border-right: none;
                      border-bottom: none;
                      width: 120px;
                    "
                  >
                    项目简介:
                  </div>
                  <div 
                    class="right xmjj"
                    style="
                      height: 110px;
                      border-left: 1px solid #EBEEF5;
                      border-bottom: none;
                      line-height: 25px;
                      padding: 10px 20px;
                    "
                  >
                <el-tooltip v-if="isShow" class="item" effect="dark" :content='project_situation.project_introduction' placement="bottom">
                    <div >{{ project_situation.project_introduction }}</div>
                    </el-tooltip>
               
                    <div v-else>
                      <el-input
                        maxlength="300"
                        show-word-limit
                        type="textarea"
                        placeholder=""
                        v-model="project_situation.project_introduction"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col
              :span="1"
              style="background: none; height: 100px; width: 1%"
            ></el-col>
            <el-col
              :span="11"
              style="width: 49.5%; border-radius: 10px;height:500px"
              class="twoRight grid-content bg-purple"
            >
              <div class="headerBtn" style="position: relative">
                <div
                  v-for="(item, index) in btnList"
                  :class="[activeTop == index ? 'blue' : '',index==4?'widths':'']"
                  class="headerBtnItem"
                  @click="btnClick(index)"
                  style="width: 30%"
                >
                  {{ item.name }}
                </div>
                <div class="add" @click="addCount1('1','{}','AddUserForm')"><span>+</span></div>
              </div>
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{
                    background: '#EBEEF5',
                    color: '#606266',
                  }"
                  height="400"
                >
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="100"
                    align="center"
                    type='index'
                  >
                  </el-table-column>
                  <el-table-column
                    prop="full_name"
                    label="姓名"
                    width="154"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="zhi_wu"
                    label="职务"
                    width="154"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="mobile"
                    label="电话"
                    width="154"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="操作"
                    width="140"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        slot="reference"
                        size="mini"
                        @click="addCount('2', scope.row)"
                      
                        >编辑</el-button
                      >
                      <el-popconfirm
                        title="确定删除吗？"
                        @confirm="deleteFiles(scope.row)"
                      >
                        <el-button
                          type="text"
                          slot="reference"
                          size="mini"
                           class="delS"
                          >删除</el-button
                        >
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                  <template slot="empty">
                    <slot name="empty">
                      <img
                        src="@/assets/twoImg/bianji1.png"
                        alt=""
                        style="width: 156px; height: 125px"
                      />
                      <div>暂时还没有数据哦~快去添加</div>
                    </slot>
                  </template>
                </el-table>
              </div>
            </el-col>
          </el-row>
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
                        项目大事记
                      <el-tooltip class="item" effect="dark" content="记录项目重要时刻,我们共同见证!" placement="top-start">

                         <a-icon
         
                style="margin-left: 5px"
                type="question-circle"
              />
                </el-tooltip>
                      </div>
                        
                    </div></el-col
                  >
                  <el-col :span="12"
                    ><div
                      style="
                        text-align: right;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                      "
                      @click="addShow1('1')"
                    >
                      <img
                        src="@/assets/twoImg/add1.png"
                        alt=""
                        style="width: 15px; height: 15px"
                      />
                      <div style="color: #3296fa; margin-left: 5px">
                        新增
                      </div>
                    </div></el-col
                  >
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row class="threeTwo">
            <el-col :span="24">
              <el-empty
              image="https://app58708.eapps.dingtalkcloud.com/app/dist/static/img/bianji1.f4d09d63.png"
                description="暂时还没有数据哦~快去添加吧"
                v-if="threeList.length==0"
              ></el-empty>
              <div class="threeTwoS">
                <div
                  v-for="(item, index) in threeList"
                  :key="index"
                  class="item"
                >
                  <div>
                    <span class="zhiding" v-if="item.extend_first==1">置顶</span
                    ><span style="font-size: 14px;color:black;font-weight:bold"  @click="showDetails(item)">{{ item.title }}</span>
                  </div>
                  <div class="threeVlue" v-html="item.content" style="color:#666666;" @click="showDetails(item)"></div>
                  <div class="threeInfo">
                    <span @click="showDetails(item)">{{ item.author }}</span>
                    <span class="riqi" style="color:#666666;" @click="showDetails(item)">{{ item.created }}</span>
                    <!-- <span>{{ item.time }}</span> -->
                    <span class="lines">|</span>
                    <el-dropdown trigger="click" @command="handleCommand" @visible-change='handleCommands(item)' >
                      <span class="el-dropdown-link" style="margin-left: 10px">
                        <i class="el-icon-more"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  command='a' style="padding:0 10px;"
                          >编辑公告</el-dropdown-item
                        >
                        <el-dropdown-item   command='b'  style="padding:0 10px;"
                          >撤回</el-dropdown-item
                        >
                        <el-dropdown-item  command='c'  style="padding:0 10px;" v-if="item.extend_first==0"
                          >设为置顶</el-dropdown-item
                        >
                           <el-dropdown-item  command='d'  v-else  style="padding:0 10px;"
                          >取消置顶</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="threeSan">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 100]"
                :page-size="pagesize"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      :title="newDialogTitle"
      :visible.sync="dialogFormVisible"
      width="30%"
      @close="editCancel1('AddUserForm')"
    >
      <div>
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="telCount"
          label-width="120px"
          class="demo-form-inline"
          :rules="aufRules"
          ref="AddUserForm"
        >
          <div class="hlBottom">
            <el-form-item label="单位类型:" prop="unit_type">
              <el-select
                v-model="telCount.unit_type"
                clearable
                placeholder="请选择单位类型"
                class="dRemarkList"
              >
                <el-option label="施工单位" value="1"></el-option>
                <el-option label="建设单位" value="2"></el-option>
                <el-option label="勘察单位" value="3"></el-option>
                <el-option label="监理单位" value="4"></el-option>
                <el-option label="总承包单位" value="5"></el-option>
                <el-option label="其他" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="姓名" prop="full_name" class="dRemarkList">
              <el-input
                v-model="telCount.full_name"
                placeholder="请输入姓名"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item label="职务" prop="zhi_wu" class="dRemarkList">
              <el-input
                v-model="telCount.zhi_wu"
                placeholder="请输入职务"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="mobile" class="dRemarkList">
              <el-input
                v-model="telCount.mobile"
                placeholder="请输入电话"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancel1('AddUserForm')">取 消</el-button>
        <el-button type="primary" @click="eninfo('AddUserForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

   <el-dialog
      title="新增项目"
      :visible.sync="dialogFormVisible1"
      width="30%"
      @close="editCancel('AddUserForm')"
    >
      <div>
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="telCount1"
          label-width="120px"
          class="demo-form-inline"
          :rules="aufRules"
          ref="AddUserForm"
        >
          <div class="hlBottom">
            <el-form-item label="单位类型:" prop="unit_type">
              <el-select
                v-model="telCount1.unit_type"
                clearable
                placeholder="请选择单位类型"
                class="dRemarkList"
              >
                <el-option label="施工单位" value="1"></el-option>
                <el-option label="建设单位" value="2"></el-option>
                <el-option label="勘察单位" value="3"></el-option>
                <el-option label="监理单位" value="4"></el-option>
                <el-option label="总承包单位" value="5"></el-option>
                <el-option label="其他" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="姓名" prop="full_name" class="dRemarkList">
              <el-input
                v-model="telCount1.full_name"
                placeholder="请输入姓名"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item label="职务" prop="zhi_wu" class="dRemarkList">
              <el-input
                v-model="telCount1.zhi_wu"
                placeholder="请输入职务"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="mobile" class="dRemarkList">
              <el-input
                v-model="telCount1.mobile"
               oninput = "value=value.replace(/[^\d.]/g,'')"
                placeholder="请输入电话"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancel('AddUserForm')">取 消</el-button>
        <el-button type="primary" @click="eninfo('AddUserForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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


  <el-dialog
      title="新增"
      :visible.sync="dialogFormVisibleTwo1"
      width="80%"
      @close="editCancelTwo('kanBanForm')"
    >
      <div style="padding-bottom: 100px">
        <el-form
          @submit.native.prevent
          :inline="true"
          :model="kanBan1"
          label-width="120px"
          class="demo-form-inline"
          :rules="aufRules1"
          ref='kanBanForm'
        >
          <div class="hlBottom" style="margin: autol">
            <el-form-item label="标题" prop="title" class="dRemarkList">
              <el-input
                v-model="kanBan1.title"
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
                v-model="kanBan1.author"
                placeholder="请输入作者"
                maxlength="50"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="正文"
              prop="content"
              class="dRemarkList"
            >
              <div>
                <!-- <quill-editor
                  v-model="kanBan1.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  style="height: 200px"
                >
                </quill-editor> -->
                <div class="publish_container" style="width:100%;">
      <qul-editor @func="func" ref="child"></qul-editor>
  </div>
              </div>
            </el-form-item>

                  <el-form-item class="dRemarkList" label="附件："  style="margin:90px 0 0 35px;">
                <div @click="addFilesClick(3)" class="addWen">
                  添加文件
                </div>
                <div class="dingFilesClass">
                  <div
                    v-for="(item, index) in kanBan1.extend_five"
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
                          style="width: 55px;color:skyblue;"
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

    <el-dialog
      title="项目大事记详情"
      :visible.sync="dialogFormVisibleTwo2"
      width="80%"
      @close="dialogFormVisibleTwo2=false"
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
            <el-form-item label="标题:" prop="title" class="dRemarkList" style="color:black;">
                <div>{{kanBan.title}}</div>
            </el-form-item>

            <el-form-item
              label="作者:"
              prop="author"
              class="dRemarkList"
              style="display:block;color:black;"
            >
                <div>{{kanBan.author}}</div>
            </el-form-item>



            <div style="display:flex;">
                <div style="width:60px;text-align:center;margin-left:58px;color:#999;">
                    <span style="color:red;">*</span>
                    正文:
                </div>
                <div v-html="kanBan.content" style="color:black;width:90%;border-bottom:1px solid #999;margin-bottom:20px;"></div>

            </div>
            <!-- <el-form-item
              label="正文:"
              prop="content"
              class="dRemarkList"
              style="display:flex;"
            >
                <span v-html="kanBan.content" style="color:black;"></span>
            </el-form-item> -->

                  <el-form-item class="dRemarkList" label="附件："  style="margin:0px 0 0 8px;">
                <!-- <div @click="addFilesClick(3)" style="color: skyblue">
                  添加文件
                </div> -->
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
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleTwo2=false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleTwo2=false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="视频播放"
      :visible.sync="dialogFormVisibleThree"
      width="80%"
      @close="editCancelThree('ViedeForm')"
    >
      <div style="text-align: center">
        <video
          autoplay
          controls="controls"
         
        >
        <source :src="projectInfo.project_video"/>
        </video>
<div id="output"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancelThree('ViedeForm')">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleThree = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script src="https://cdn.bootcss.com/jquery/1.10.1/jquery.min.js"></script>

<script>
import * as dd from 'dingtalk-jsapi';
import { nextTick } from 'vuedraggable';
// import echarts from 'echarts';
const echarts = require('echarts');
import commonTable from '@/components/commonTable.vue';
import CountUp from '@/components/CountUp';
import EchartProjectLog from './components/echartProjectLog';
import eupload from '../../components/excelUpload1.vue';
import qulEditor from './quEditor'; //富文本编辑器组件的路径
import componenTtiles from './componenTtiles.vue';

export default {
  name: 'appPanel',
  components: {
    commonTable,
    CountUp,
    EchartProjectLog,
    eupload,
    qulEditor,
    componenTtiles,
  },
  data() {
    return {
      text: '',
      content: `<p>请输入内容</p>`,
      editorOption: {},
      indexs: 0,
      newDialogTitle: '添加信息',
      newDialogTitle1: '新增项目大事记',
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
      dialogFormVisible1: false,
      oneList: [
        { title: '中标时间', value: '' },
        { title: '工程规模', value: '2022-03-09' },
        { title: '合同金额/元', value: '2022-03-09' },
        { title: '计划开工日期', value: '2022-03-09' },
        { title: '项目类型', value: '2022-03-09' },
        { title: '项目状态', value: '2022-03-09' },
        { title: '计划竣工日期', value: '2022-03-09' },
        {
          title: '项目地址',
          value: '河南省郑州市管城回族区航海路中州大道美景鸿城小区xx街道',
        },
      ],
      tableData: [],
      threeList: [],
      isShow: true,
      newView: false,
      intername: '',
      pagesize: 5,
      currentPage: 1,
      total: 0,
      myArray: [],
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
      activeNames: ['0'],
      newhtgData: { piling_number: 0, total: 0, rock_length: 0 },
      dialogFormVisible: false,
      dialogFormVisibleTwo: false,
      dialogFormVisibleTwo1: false,
      dialogFormVisibleTwo2: false,
      dialogFormVisibleThree: false,
      pid: '',
      pname: '',
      projectInfo: {
        bid_riqi: '', //中标时间
        quantities: '', //工程规模
        contract_money: '', //合同金额
        plan_start_riqi: '', //计划开工日期
        type: '', //项目类型
        project_status: '', //项目状态
        plan_end_riqi: '', //计划竣工日期
        address: '-', //项目地址
        project_video: '', //视频链接
        project_video_id: '', //视频链接id
      },
      project_situation: {
        id: '', //详细情况id
        build_unit: '', //建设单位
        design_unit: '', //设计单位
        survey_unit: '', //勘察单位
        supervisor_unit: '', //监理单位
        construction_unit: '', //施工单位
        zong_unit: '', //总承包单位
        project_introduction: '', //项目简介
        project_id: '',
        project_name: '',
      },
      btnList: [
        { name: '施工单位' },
        { name: '建设单位' },
        { name: '勘察单位' },
        { name: '监理单位' },
        { name: '总承包单位' },
        { name: '其他单位' },

        // { name: '列表看板' }
      ],
      activeTop: 0,
      safeTypeData: ['1'],
      safeData: ['1'],
      qualityData: ['1'],
      qualityTypeData: ['1'],
      diaryData: {
        names: [],
        values: [],
      },
      shouruData: ['1'],
      shouruTypeData: ['1'],
      shouruP: ['1'],
      zhichuData: ['1'],
      zhichuTypeData: ['1'],
      zhichuP: ['1'],
      szcType: ['1'],
      jscType: ['1'],
      xjlType: ['1'],
      customColors: [
        { color: '#F16D6D', percentage: 20 },
        { color: '#E8A54C', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
      aufRules: {
        unit_type: [
          {
            required: true,
            message: '请选择单位类型',
            trigger: ['blur', 'change'],
          },
        ],
        full_name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: ['blur', 'change'],
          },
        ],
        zhi_wu: [
          {
            required: true,
            message: '请输入职务',
            trigger: ['blur', 'change'],
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入电话',
            trigger: ['blur', 'change'],
          },
        ],
      },
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
      gcMoney: {
        settlement: '',
        payment_lj: '',
        no_pay_money: '',
      },
      lrData: {
        shou_money: '',
        expenditure: '',
        li_run: '',
        income_money: '',
        settlement: '',
        js_cha: '',
        collection_money: '',
        zc_lj: '',
        liu_cha: '',
      },
      xmgData: {
        dai_js: '',
        shiji_pay: '',
      },
      htgData: {
        chanzhi_xiuz: '',
        yi_js_chanzhi: '',
        cha_chanzhi: '',
      },
      fpData: {
        invoice_money_out: '',
        tax_amount_out: '',
        invoice_money_in: '',
        tax_amount_in: '',
      },
      addForm: {
        project_name: '',
        money: '',
        remarks: '',
        supplier_type: '',
      },
      openType: 1,
      loading: false,
      upImgList2: '',
      licenceImg2: '',
      isShow2: ['1'],
      telCount: {
        id: '',
        full_name: '',
        zhi_wu: '',
        mobile: '',
        status: '',
        project_id: '',
        project_name: '',
        unit_type: '',
      },
      telCount1: {
        id: '',
        full_name: '',
        zhi_wu: '',
        mobile: '',
        status: '',
        project_id: '',
        project_name: '',
        unit_type: '',
      },
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
      kanBan1: {
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
    };
  },
  methods: {
    showDetails(row) {
      this.dialogFormVisibleTwo2 = true;
      row.content = row.content.replace(
        /\<img/gi,
        '<img style="width:50%;height:auto;margin-left:33%" ',
      );
      this.kanBan = row;
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
    //删除附件
    deleteFiles1(index, type) {
      switch (type) {
        case 1:
          this.addUserForm.fjurl.sfz.splice(index, 1);
          break;
        case 2:
          this.addUserForm.fjurl.zjz.splice(index, 1);
          break;
        case 3:
          this.kanBan.extend_five.splice(index, 1);
          this.kanBan1.extend_five.splice(index, 1);
          break;
        case 4:
          this.addUserForm.fjurl.enclosure.splice(index, 1);
          break;
      }
    },
    //预览附件
    watchFiles(item) {
      this.$axios
        .post('/dingding/getAuthUp', {
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
            switch (type) {
              case 3:
                result.data.forEach(item => {
                  _this.kanBan.extend_five.push(item);
                  _this.kanBan1.extend_five.push(item);
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
    handleCommand(e) {
      if (e == 'a') {
        this.addShow('2');
        setTimeout(() => {
          //加定时器原因是，子组件页面未渲染处理就做子组件的请求导致失败，稍微延时一下就可解决问题
          this.$refs.child.changes();
        }, 100);
      } else if (e == 'b') {
        this.open();
      } else if (e == 'c') {
        this.zhiDing();
      } else if (e == 'd') {
        this.quZhiding();
      }
    },
    open() {
      this.$confirm('撤回并删除该事记,该操作无法撤回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteKan();
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回',
          });
        });
    },
    handleCommands(e) {
      this.kanBan = e;
    },
    quZhiding() {
      this.kanBan.status = '1';
      this.kanBan.extend_first = '0';
      this.Kanban();
    },
    zhiDing() {
      this.kanBan.status = '1';
      this.kanBan.extend_first = '1';
      this.Kanban();
    },
    deleteKan() {
      this.kanBan.status = '0';
      this.Kanban();
    },
    Kanban() {
      this.$axios
        .post('/bulletin/projectNotesAdd', this.kanBan)
        .then(res => {
          if (res.data.code == 1) {
            this.getDkb();
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: '',
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
    },
    func(e) {
      this.kanBan1.content = e;
      this.kanBan.content = e;
    },
    addKanban(formName) {
      this.kanBan.status = '1';
      this.kanBan.extend_first = '0';
      console.log(this.newDialogTitle1);
      //    this.$refs[formName].validate((valid) => {
      if (this.newDialogTitle1 == '新增项目大事记') {
        console.log('新增');
        this.kanBan1.status = '1';
        this.kanBan1.extend_first = '0';
        this.kanBan1.project_id = this.pid;
        this.kanBan1.project_name = this.pname;
        this.$axios
          .post('/bulletin/projectNotesAdd', this.kanBan1)
          .then(res => {
            if (res.data.code == 1) {
              //   this.tableData = res.data.data;
              this.dialogFormVisibleTwo1 = false;
              //   this.kanBan1 = [];
              this.getDkb();
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: '',
                duration: 1500,
              });
              this.$refs[formName].resetFields();
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
      } else {
        console.log('修改');
        this.kanBan.project_id = '';
        this.kanBan.project_name = '';
        this.$axios
          .post('/bulletin/projectNotesAdd', this.kanBan)
          .then(res => {
            if (res.data.code == 1) {
              //   this.tableData = res.data.data;
              this.getDkb();
              this.dialogFormVisibleTwo = false;
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: '',
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
      // });
    },
    getDkb(e) {
      //大看板列表
      this.$axios
        .post('/bulletin/projectBriefIntroduction2', {
          project_id: this.pid,
          project_name: this.pname,
          page: this.currentPage,
          number: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.count;
            this.threeList = res.data.data;
            if (this.total > 0 && this.threeList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getDkb();
            }
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
    deleteFiles(e) {
      //删除联系人
      console.log('11');
      this.telCount.status = '2';
      this.telCount.id = e.id;
      this.$axios
        .post('/bulletin/projectContactsAdd', this.telCount)
        .then(res => {
          if (res.data.code == 1) {
            // this.tableData = res.data.data;
            this.getLxr(this.activeTop + 1);
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: '',
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
    },
    eninfo() {
      //联系人添加编辑
      this.telCount.status = '1';
      //    this.$refs[formName].validate((valid) => {
      if (this.newDialogTitle == '新增信息') {
        this.telCount1.status = '1';
        this.telCount1.project_id = this.pid;
        this.telCount1.project_name = this.pname;
        this.$axios
          .post('/bulletin/projectContactsAdd', this.telCount1)
          .then(res => {
            if (res.data.code == 1) {
              this.tableData = res.data.data;
              this.dialogFormVisible1 = false;
              this.getLxr(this.activeTop + 1);
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: '',
                duration: 1500,
              });
              this.$refs[formName].resetFields();
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
      } else {
        this.telCount.project_id = '';
        this.telCount.project_name = '';
        this.$axios
          .post('/bulletin/projectContactsAdd', this.telCount)
          .then(res => {
            if (res.data.code == 1) {
              //   this.tableData = res.data.data;
              this.getLxr(this.activeTop + 1);
              this.dialogFormVisible = false;
              this.$message({
                title: '提示',
                message: res.data.msg,
                type: '',
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
      //   });
    },
    getLxr(e) {
      //联系人列表
      this.$axios
        .post('/bulletin/projectBriefIntroduction1', {
          project_id: this.pid,
          project_name: this.pname,
          unit_type: e,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
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
    inputs(e) {
      //详情信息更改
      console.log(this.project_situation);
      this.project_situation.project_id = this.pid;
      this.project_situation.project_name = this.pname;
      this.$axios
        .post('/bulletin/projectSituationAdd', this.project_situation)
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
    },
    bofang() {
      //视频播放
      this.dialogFormVisibleThree = true;
    },
    showe(url) {
      //无视频添加视频
      //   console.log(url);
      this.$axios
        .post('/bulletin/projectVideoAdd', {
          video_url: url,
          status: '1',
          project_id: this.pid,
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.getInfo();
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
    },
    showe1(url) {
      //修改视频
      //   console.log(url);
      this.$axios
        .post('/bulletin/projectVideoAdd', {
          id: this.projectInfo.project_video_id,
          video_url: url,
          status: '1',
        })
        .then(res => {
          if (res.data.code == 1) {
            this.getInfo();
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
    },
    addShow(e, i) {
      this.dialogFormVisibleTwo = true;
      if (e == '2') {
        this.newDialogTitle1 = '编辑项目大事记';
      } else {
        this.newDialogTitle1 = '新增项目大事记';
        this.kanBan.id = '';
        this.kanBan.extend_five = [];
        this.kanBan1.extend_five = [];
      }
    },
    addShow1() {
      this.dialogFormVisibleTwo1 = true;
      this.newDialogTitle1 = '新增项目大事记';
    },
    addCount(e, c, AddUserForm) {
      this.dialogFormVisible = true;
      if (e == '2') {
        this.newDialogTitle = '编辑信息';
        this.telCount = c;
      } else {
        this.newDialogTitle = '新增信息';
        return;
      }
    },
    addCount1() {
      this.dialogFormVisible1 = true;
      this.newDialogTitle = '新增信息';
    },
    handleclick(item) {
      console.log(item);
      const InterfaceList = this.InterfaceList;
      this.getTitleList(
        InterfaceList[item].showFiled,
        InterfaceList[item].Interdata,
      );
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getDkb(this.intername);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDkb(this.intername);
    },
    // 表格表头
    getTitleList(name, inter) {
      this.intername = inter;
      this.$axios
        .post('/spread/showFiledCurrencyList', {
          name: name,
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
            this.getList(inter);
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
    //获取列表
    getList(inter) {
      this.$axios
        .post(inter, {
          project_name: this.pname,
          page: this.currentPage,
          number: this.pagesize,
        })
        .then(res => {
          if (res.data.code == 1) {
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
    editCancel(formName) {
      this.getLxr(this.activeTop + 1);

      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    editCancel1(formName) {
      //   this.getLxr(this.activeTop + 1);

      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
      //   this.$nextTick(() => {
      //     this.$refs[formName].resetFields();

      //   });
    },
    editCancelTwo(form) {
      this.dialogFormVisibleTwo = false;
      this.dialogFormVisibleTwo1 = false;
      this.dialogFormVisibleTwo2 = false;
      this.kanBan.extend_five = [];
      this.kanBan1.extend_five = [];
      this.$refs.child.clear();
      this.getDkb();
      this.$nextTick(() => {
        this.$refs[form].resetFields();
      });
    },
    editCancelThree(formName) {
      this.dialogFormVisibleThree = false;

      this.$nextTick(() => {
        // this.$refs[formName].resetFields();
      });
    },
    addClick(formName) {
      const _this = this;
      _this.loading = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let newData = JSON.parse(JSON.stringify(_this.addForm));
          if (_this.openType == 1) {
            _this.$axios
              .post('/projectfour/payOutputCorrect', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getZCpie();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          } else {
            _this.$axios
              .post('/projectfour/incomeOutputCorrect', newData)
              .then(res => {
                if (res.data.code == 1) {
                  _this.getSRpie();
                  _this.loading = false;
                  _this.dialogFormVisible = false;
                  _this.$refs[formName].resetFields();
                  _this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  _this.loading = false;
                  _this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function (error) {
                _this.loading = false;
                console.log(error);
              });
          }
        } else {
          _this.loading = false;
        }
      });
    },
    getFa() {
      const _this = this;
      _this.$axios
        .post('/projectfour/invoiceAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.fpData = res.data.data;
          } else {
            _this.$notify({
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
    goXm(type) {
      const _this = this;
      _this.openType = type;
      _this.addForm.project_name = _this.pname;
      _this.dialogFormVisible = true;
    },
    changeShow() {
      this.isShow = !this.isShow;
      console.log(this.isShow);
      if (this.isShow) {
        this.inputs();
      }
    },
    backClick() {
      this.$router.go(-1);
    },
    btnClick(index) {
      this.activeTop = index;
      console.log(index);
      this.getLxr(index + 1);
    },
    getJpie() {
      this.getSRpie();
      this.getZCpie();
      this.getLRpie();
      this.getFa();
    },
    getLRpie() {
      this.$axios
        .post('/projectfour/profitAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lrData = res.data.data;
            let newData = JSON.parse(JSON.stringify(res.data.data));
            // let newA = [
            //     {
            //         name: '收入总金额',
            //         value: newData.shou_money
            //     },
            //     {
            //         name: '支出总金额',
            //         value: newData.expenditure
            //     },
            //     { name: '利润', value: newData.li_run }
            // ];
            let newA = [
              newData.shou_money / 10000,
              newData.expenditure / 10000,
              newData.li_run / 10000,
            ];
            // let newB = [
            //     {
            //         name: '累计收入结算',
            //         value: newData.income_money
            //     },
            //     {
            //         name: '累计支出结算',
            //         value: newData.settlement
            //     },
            //     { name: '结算差', value: newData.js_cha }
            // ];
            let newB = [
              newData.income_money / 10000,
              newData.settlement / 10000,
              newData.js_cha / 10000,
            ];
            let newC = [
              newData.collection_money / 10000,
              newData.zc_lj / 10000,
              newData.liu_cha / 10000,
            ];
            if (
              newData.shou_money == 0 &&
              newData.expenditure == 0 &&
              newData.li_run == 0
            ) {
              this.szcType = [];
              // newA[0].value = 1;
              // newA[1].value = 1;
              // newA[2].value = 1;
              newA = [1, 1, 1];
            } else {
              this.szcType = ['1'];
            }
            if (
              newData.income_money == 0 &&
              newData.settlement == 0 &&
              newData.js_cha == 0
            ) {
              this.jscType = [];
              // newB[0].value = 1;
              // newB[1].value = 1;
              // newB[2].value = 1;
              newB = [1, 1, 1];
            } else {
              this.jscType = ['1'];
            }
            if (
              newData.collection_money == 0 &&
              newData.zc_lj == 0 &&
              newData.liu_cha == 0
            ) {
              this.xjlType = [];
              newC = [1, 1, 1];
            } else {
              this.xjlType = ['1'];
            }
            // this.doSRpie(newA, 5);
            // this.doSRpie(newB, 6);
            this.doSelfPie(newC, 3);
            this.doSelfPie(newA, 4);
            this.doSelfPie(newB, 5);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doSelfPie(arr, type) {
      let dataAxis = [];
      if (type == 1) {
        dataAxis = ['结算产值', '累计支付', '未支付'];
      } else if (type == 2) {
        dataAxis = ['结算产值', '累计回款', '甲方欠款'];
      } else if (type == 3) {
        // dataAxis = ['实际完成产值', '已结算产值', '实际应付'];
        dataAxis = ['累计回款金额', '累计支出金额', '现金流差'];
      } else if (type == 4) {
        dataAxis = ['收入总金额', '支出总金额', '利润'];
      } else if (type == 5) {
        dataAxis = ['累计收入结算', '累计支出结算', '结算差'];
      }
      let bption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: 'category',
          data: dataAxis,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            inside: false,
            // textStyle: {
            //     color: '#999'
            // },
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#999',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#999',
            },
          },
          splitLine: {
            //分割线配置
            show: true,
            lineStyle: {
              color: '#F9F9F9',
            },
          },
        },
        series: [
          {
            data: [
              {
                value: arr[0],
                itemStyle: {
                  color: '#83bff6',
                },
              },
              {
                value: arr[1],
                itemStyle: {
                  color: '#FFB81E',
                },
              },
              {
                value: arr[2],
                itemStyle: {
                  color: '#FF6A5B',
                },
              },
            ],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#E6F3FF',
            },
            barWidth: 24,
            itemStyle: {
              textStyle: {
                fontSize: 12,
              },
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2378f7',
                  },
                  {
                    offset: 0.7,
                    color: '#2378f7',
                  },
                  {
                    offset: 1,
                    color: '#83bff6',
                  },
                ]),
              },
            },
          },
        ],
      };
      this.$nextTick(() => {
        if (type == 1) {
          let gcqian = echarts.init(document.getElementById('gcqian'));
          gcqian.clear();
          gcqian.setOption(bption);
        } else if (type == 2) {
          let srgqian = echarts.init(document.getElementById('srgqian'));
          srgqian.clear();
          srgqian.setOption(bption);
        } else if (type == 3) {
          let xjlcha = echarts.init(document.getElementById('xjlcha'));
          xjlcha.clear();
          xjlcha.setOption(bption);
        } else if (type == 4) {
          let szcha = echarts.init(document.getElementById('szcha'));
          szcha.clear();
          szcha.setOption(bption);
        } else if (type == 5) {
          let jscha = echarts.init(document.getElementById('jscha'));
          jscha.clear();
          jscha.setOption(bption);
        }
      });
    },
    getZCpie() {
      this.$axios
        .post('/projectfour/expenditureAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newData = JSON.parse(JSON.stringify(res.data.data));
            this.xmgData.dai_js = newData.dai_js;
            this.xmgData.shiji_pay = newData.shiji_pay;
            let newD = [newData.dai_js, newData.shiji_pay];
            let newC = [
              newData.settlement,
              newData.payment_lj,
              newData.no_pay_money,
            ];
            let newChar = [
              { value: newData.service, name: '劳务' },
              { value: newData.material, name: '材料' },
              { value: newData.sub, name: '分包' },
              { value: newData.lease, name: '租赁' },

              { value: newData.reimbursement, name: '间接费' },
              { value: newData.other, name: '其他' },
            ];
            if (
              newData.service == 0 &&
              newData.material == 0 &&
              newData.sub == 0 &&
              newData.lease == 0 &&
              newData.reimbursement == 0 &&
              newData.other == 0
            ) {
              this.zhichuData = [];
              newChar[0].value = 1;
              newChar[1].value = 1;
              newChar[2].value = 1;
              newChar[3].value = 1;
              newChar[4].value = 1;
              newChar[5].value = 1;
            } else {
              this.zhichuData = ['1'];
            }
            if (
              newData.settlement == 0 &&
              newData.payment_lj == 0 &&
              newData.no_pay_money == 0
            ) {
              this.zhichuTypeData = [];
              newC[0] = 1;
              newC[1] = 1;
              newC[2] = 1;
            } else {
              this.zhichuTypeData = ['1'];
            }
            if (newData.dai_js == 0 && newData.shiji_pay == 0) {
              this.zhichuP = [];
              newD = [1, 1];
            } else {
              this.zhichuP = ['1'];
            }
            this.doSRpie(newChar, 3);
            this.doSelfPie(newC, 1);
            this.doZCpie(newD, 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doZCpie(arr, type) {
      let dataAxis = [];
      if (type == 1) {
        dataAxis = ['待结算金额', '实际应付金额'];
      } else if (type == 2 || type == 3) {
        dataAxis = ['实际完成产值', '已结算产值', '实际应付'];
      } else if (type == 4) {
        dataAxis = ['收入总金额', '支出总金额', '利润'];
      } else if (type == 5) {
        dataAxis = ['累计收入结算', '累计支出结算', '结算差'];
      }
      let bption = {
        // title: { text: newT, left: 'center' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#999',
              fontSize: 14,
            },
            interval: 0,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              textStyle: {
                fontSize: 12,
              },
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#83bff6',
                  },
                  {
                    offset: 0.5,
                    color: '#188df0',
                  },
                  {
                    offset: 1,
                    color: '#188df0',
                  },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2378f7',
                  },
                  {
                    offset: 0.7,
                    color: '#2378f7',
                  },
                  {
                    offset: 1,
                    color: '#83bff6',
                  },
                ]),
              },
            },
            data: arr,
          },
        ],
      };
      this.$nextTick(() => {
        // if (type == 1) {
        //     let zccgai = echarts.init(
        //         document.getElementById('zccgai')
        //     );
        //     zccgai.clear();
        //     zccgai.setOption(bption);
        // } else if (type == 2) {
        //     let srcgai = echarts.init(
        //         document.getElementById('srcgai')
        //     );
        //     srcgai.clear();
        //     srcgai.setOption(bption);
        // } else
        if (type == 3) {
          let xjlcha = echarts.init(document.getElementById('xjlcha'));
          xjlcha.clear();
          xjlcha.setOption(bption);
        } else if (type == 4) {
          let szcha = echarts.init(document.getElementById('szcha'));
          szcha.clear();
          szcha.setOption(bption);
        } else if (type == 5) {
          let jscha = echarts.init(document.getElementById('jscha'));
          jscha.clear();
          jscha.setOption(bption);
        }
      });
    },
    //收入分析
    getSRpie() {
      this.$axios
        .post('/projectfour/incomeAnalysis', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newData = JSON.parse(JSON.stringify(res.data.data));
            this.htgData.chanzhi_xiuz = newData.chanzhi_xiuz;
            this.htgData.yi_js_chanzhi = newData.yi_js_chanzhi;
            this.htgData.cha_chanzhi = newData.cha_chanzhi;
            let newC = [
              newData.income_money,
              newData.shou_kuan,
              newData.party_a_qian,
            ];
            if (
              newData.income_money == 0 &&
              newData.shou_kuan == 0 &&
              newData.party_a_qian == 0
            ) {
              this.shouruTypeData = [];
              newC[0] = 1;
              newC[1] = 1;
              newC[2] = 1;
            } else {
              this.shouruTypeData = ['1'];
            }
            let newChar = [
              {
                name: '合同收入',
                value: newData.shou_money,
              },
              {
                name: '签证变更',
                value: newData.qian_money,
              },
            ];
            if (newData.shou_money == 0 && newData.qian_money == 0) {
              this.shouruData = [];
              newChar[0].value = 1;
              newChar[1].value = 1;
            } else {
              this.shouruData = ['1'];
            }
            let newD = [
              newData.chanzhi_xiuz,
              newData.yi_js_chanzhi,
              newData.cha_chanzhi,
            ];
            if (
              newData.chanzhi_xiuz == 0 &&
              newData.yi_js_chanzhi == 0 &&
              newData.cha_chanzhi == 0
            ) {
              this.shouruP = [];
              newD = [1, 1, 1];
            } else {
              this.shouruP = ['1'];
            }
            this.doSRpie(newChar, 1);
            this.doSelfPie(newC, 2);
            this.doZCpie(newD, 2);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    doSRpie(arr, type) {
      let newName = '';
      if (type == 1) {
        newName = '收入构成';
      } else if (type == 2) {
        newName = '收入工程款';
      } else if (type == 3) {
        newName = '支出构成';
      } else if (type == 4) {
        newName = '支出工程款';
      } else if (type == 5) {
        newName = '收支差';
      } else if (type == 6) {
        newName = '结算差';
      }
      let bption = {
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
              '%)'
            );
          },
        },
        legend: {
          type: 'scroll',
          bottom: '-5',
          textStyle: {
            color: ['red', '#fff'],
          },
          icon: 'circle',
          itemGap: 40,
        },
        series: [
          {
            name: newName,
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            minAngle: 5,
            label: {
              show: false,
              position: 'center',
              formatter: '{b}\n{d}%',
              fontSize: '18',
            },
            labelLine: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold',
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
                // label: {
                //     show: true,
                //     formatter: ' {b} \n {d}% '
                // }
              },
            },
            // radius: '50%',
            data: arr,
          },
        ],
      };

      this.$nextTick(() => {
        if (type == 1) {
          let shouru = echarts.init(document.getElementById('shouru'));
          shouru.clear();
          shouru.setOption(bption);
        } else if (type == 2) {
          let srgqian = echarts.init(document.getElementById('srgqian'));
          srgqian.clear();
          srgqian.setOption(bption);
        } else if (type == 3) {
          let zhichu = echarts.init(document.getElementById('zhichu'));
          zhichu.clear();
          zhichu.setOption(bption);
        } else if (type == 4) {
          let gcqian = echarts.init(document.getElementById('gcqian'));
          gcqian.clear();
          gcqian.setOption(bption);
        } else if (type == 5) {
          let szcha = echarts.init(document.getElementById('szcha'));
          szcha.clear();
          szcha.setOption(bption);
        } else if (type == 6) {
          let jscha = echarts.init(document.getElementById('jscha'));
          jscha.clear();
          jscha.setOption(bption);
        }
      });
    },
    //项目详情
    getInfo() {
      this.$axios
        .post('/bulletin/projectBriefIntroduction', {
          project_id: this.pid,
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.projectInfo = JSON.parse(
              JSON.stringify(res.data.data.project_info),
            );
            this.project_situation = JSON.parse(
              JSON.stringify(res.data.data.project_situation),
            );
            this.oneList[0].value = this.projectInfo.bid_riqi;
            this.oneList[1].value = this.projectInfo.quantities;
            this.oneList[2].value = this.projectInfo.contract_money;
            this.oneList[3].value = this.projectInfo.plan_start_riqi;
            this.oneList[4].value = this.projectInfo.type;
            this.oneList[5].value = this.projectInfo.project_status;
            this.oneList[6].value = this.projectInfo.plan_end_riqi;
            this.oneList[7].value = this.projectInfo.address;
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
    },
    getPie(arr, type) {
      let newT = '';
      if (type == 1) {
        newT = '质量检查';
      } else {
        newT = '安全检查';
      }

      let dataAxis = ['检查总数', '整改总数', '待整总数'];
      let cdata = [arr[0].value, arr[1].value, arr[2].value];
      let bption = {
        // title: { text: newT, left: 'center' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#999',
              fontSize: 14,
            },
            interval: 0,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
          splitLine: {
            //分割线配置
            show: true,
            lineStyle: {
              color: '#F9F9F9',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'line',
            barWidth: 30,
            areaStyle: {
              color: '#E6F3FF',
            },
            smooth: true,
            itemStyle: {
              textStyle: {
                fontSize: 12,
              },
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#83bff6',
                  },
                  {
                    offset: 0.5,
                    color: '#188df0',
                  },
                  {
                    offset: 1,
                    color: '#188df0',
                  },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#2378f7',
                  },
                  {
                    offset: 0.7,
                    color: '#2378f7',
                  },
                  {
                    offset: 1,
                    color: '#83bff6',
                  },
                ]),
              },
            },
            data: cdata,
          },
        ],
      };
      //   this.$nextTick(() => {
      //     if (type == 1) {
      //       let quality = echarts.init(document.getElementById('quality'));
      //       quality.clear();
      //       quality.setOption(bption);
      //     } else if (type == 2) {
      //       let safe = echarts.init(document.getElementById('safe'));
      //       safe.clear();

      //       safe.setOption(bption);
      //     }
      //   });
    },
    doPie(arr, type) {
      let newT = '';
      if (type == 1) {
        newT = '质量事故';
      } else {
        newT = '安全事故';
      }
      let bption = {
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
              '总金额：' +
              params.data.money
            );
          },
        },
        // graphic: {
        //     elements: [
        //         {
        //             type: 'image',
        //             style: {
        //                 image: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/kf3pfsPkiA1619084333464.png',
        //                 width: 38,
        //                 height: 42
        //             },
        //             left: 'center',
        //             top: 'center'
        //         }
        //     ]
        // },
        legend: {
          bottom: '-5',
          textStyle: {
            color: ['red', '#fff'],
          },
          icon: 'circle',
          itemGap: 40,
        },
        series: [
          {
            name: newT,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              formatter: '{b}\n{d}%',
              fontSize: '18',
            },
            labelLine: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                // fontSize: '18',
                // fontWeight: 'bold'
              },
            },
            itemStyle: {
              normal: {
                // label: {
                //     show: true,
                //     formatter: ' {b} :  {c} '
                // },
                color: function (params) {
                  //自定义颜色
                  var colorList = ['#09A1FF', '#7788F9', '#FFB614'];
                  return colorList[params.dataIndex];
                },
              },
            },
            data: arr,
          },
        ],
      };
      //   this.$nextTick(() => {
      //     if (type == 1) {
      //       let qualityType = echarts.init(
      //         document.getElementById('qualityType'),
      //       );
      //       qualityType.clear();
      //       qualityType.setOption(bption);
      //     } else {
      //       let safeType = echarts.init(document.getElementById('safeType'));
      //       safeType.clear();
      //       safeType.setOption(bption);
      //     }
      //   });
    },
    //日志
    getPer() {
      this.$axios
        .post('/task/qualityaccident', {
          corp_id: this.$store.state.cid,
          project_name: this.pname,
          id: this.pid,
        })
        .then(res => {
          if (res.data.code == 1) {
            res.data.content.map(item => {
              this.diaryData.names.push(item.type);
            });
            res.data.content.map((item, index) => {
              //   if (index == 4) {
              //     this.diaryData.values.push(item.jllog_number);
              //   } else if (index == 5) {
              //     this.diaryData.values.push(item.tylog_number);
              //   } else {
              this.diaryData.values.push(item.anquan_number);
              //   }
            });
            console.log(this.diaryData);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //质量检查
    getZLC() {
      this.$axios
        .post('/task/qualitytesting', {
          corp_id: this.$store.state.cid,
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [
              {
                name: '检查总数',
                value: res.data.content.inspectnumbeer,
              },
              {
                name: '整改总数',
                value: res.data.content.rectificationnumbeer,
              },
              {
                name: '待整总数',
                value: res.data.content.toberectified,
              },
            ];
            if (
              res.data.content.inspectnumbeer == 0 &&
              res.data.content.rectificationnumbeer == 0 &&
              res.data.content.toberectified == 0
            ) {
              this.qualityData = [];
              newChar = [
                {
                  name: '检查总数',
                  value: 1,
                },
                {
                  name: '整改总数',
                  value: 1,
                },
                {
                  name: '待整总数',
                  value: 1,
                },
              ];
            } else {
              this.qualityData = ['1'];
            }

            this.getPie(newChar, 1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //安全检查
    getAQC() {
      this.$axios
        .post('/task/securitycheck', {
          corp_id: this.$store.state.cid,
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [
              {
                name: '检查总数',
                value: res.data.content.aq_inspectnumbeer,
              },
              {
                name: '整改总数',
                value: res.data.content.aq_rectificationnumbeer,
              },
              {
                name: '待整总数',
                value: res.data.content.aq_toberectified,
              },
            ];
            if (
              res.data.content.aq_inspectnumbeer == 0 &&
              res.data.content.aq_rectificationnumbeer == 0 &&
              res.data.content.aq_toberectified == 0
            ) {
              this.safeData = [];
              newChar = [
                {
                  name: '检查总数',
                  value: 1,
                },
                {
                  name: '整改总数',
                  value: 1,
                },
                {
                  name: '待整总数',
                  value: 1,
                },
              ];
            } else {
              this.safeData = ['1'];
            }

            this.getPie(newChar, 2);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //质量事故
    getZLT() {
      this.$axios
        .post('/finance/zhiliantj', {
          xmid: this.pid,
          userid: this.$store.state.userInfo.uid,
          month: '',
          corp_id: this.$store.state.cid,
          proname: this.pname,
          type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [];
            res.data.type.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.type.length; i++) {
                obj.value = item.typenum;
                obj.name = item.accidenttype;
                obj.money = item.accidenmoney;
              }
              newChar.push(obj);
            });
            if (res.data.type.length > 0) {
              this.qualityTypeData = ['1'];
            } else {
              this.qualityTypeData = [];
              newChar = [
                { name: '专业分包', value: 1, money: 1 },
                { name: '土木', value: 1, money: 1 },
                { name: '防水工', value: 1, money: 1 },
              ];
            }
            this.doPie(newChar, 1);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //安全事故
    getAQT() {
      this.$axios
        .post('/finance/anquanzhiliantj', {
          userid: this.$store.state.userInfo.uid,
          month: '',
          corp_id: this.$store.state.cid,
          proname: this.pname,
          type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            let newChar = [];

            res.data.type.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.type.length; i++) {
                obj.value = item.typenum;
                obj.name = item.accidenttype;
                obj.money = item.accidenmoney;
              }
              newChar.push(obj);
            });
            if (res.data.type.length > 0) {
              this.safeTypeData = ['1'];
            } else {
              this.safeTypeData = [];
              newChar = [
                { name: '专业分包', value: 1, money: 1 },
                { name: '土木', value: 1, money: 1 },
                { name: '防水工', value: 1, money: 1 },
              ];
            }
            this.doPie(newChar, 2);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // getZpie() {
    //   this.getZLC();
    //   //   this.getZLT();
    //   //   this.getAQT();
    //   this.getPer();
    //   this.getAQC();
    // },
    // resCharts() {
    //   if (this.activeTop == 0) {
    //     let quality = echarts.init(document.getElementById('quality')),
    //       qualityType = echarts.init(document.getElementById('qualityType')),
    //       safe = echarts.init(document.getElementById('safe')),
    //       safeType = echarts.init(document.getElementById('safeType'));

    //     quality.resize();
    //     qualityType.resize();
    //     safe.resize();
    //     safeType.resize();
    //   } else if (this.activeTop == 1) {
    //     let shouru = echarts.init(document.getElementById('shouru')),
    //       gcqian = echarts.init(document.getElementById('gcqian')),
    //       srgqian = echarts.init(document.getElementById('srgqian')),
    //       szcha = echarts.init(document.getElementById('szcha')),
    //       jscha = echarts.init(document.getElementById('jscha')),
    //       xjlcha = echarts.init(document.getElementById('xjlcha')),
    //       zhichu = echarts.init(document.getElementById('zhichu'));
    //     gcqian.resize();
    //     shouru.resize();
    //     zhichu.resize();
    //     srgqian.resize();
    //     szcha.resize();
    //     jscha.resize();
    //     xjlcha.resize();
    //   }
    // },
    //新加
    getnewAQT() {
      this.$axios
        .post('/task/bulletin_board  ', {
          project_name: this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.newhtgData = res.data;
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeColor(val) {
      this.indexs = val;
      this.$router.push({
        path: '/appIndex8/tabs' + val,
        query: { id: this.pid, name: this.pname },
      });
    },
  },
  mounted() {
    // this.getZpie();
    window.addEventListener('resize', () => {
      //   this.resCharts();
    });
  },
  created() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    this.getInfo();
    this.getnewAQT();
    this.getLxr('1');
    this.getDkb();
    if (this.$store.state.cid == 'ding6623028c672c42cb35c2f4657eb6378f') {
      this.newView = true;
    } else {
      this.newView = false;
    }
  },
  computed: {},
  editor() {
    return this.$refs.myQuillEditor.quill;
  },
  // watch: {
  //     activeTop(newval, val) {
  //         if (newval == 0) {
  //             let quality = echarts.init(document.getElementById('quality')),
  //                 qualityType = echarts.init(
  //                     document.getElementById('qualityType')
  //                 ),
  //                 safe = echarts.init(document.getElementById('safe')),
  //                 safeType = echarts.init(
  //                     document.getElementById('safeType')
  //                 );

  //             quality.resize();
  //             qualityType.resize();
  //             safe.resize();
  //             safeType.resize();
  //         }
  //     }
  // }
};
</script>
<style  lang="less">
.el-form--inline .el-form-item__label {
  color: #999;
}
.el-tooltip__popper {
  max-width: 30%;
}
.delS {
  margin-left: 15px;
}
.addWen {
  width: 81px;
  height: 28px;
  background: #fafafa;
  border: 1px solid #dedede;
  border-radius: 5px;
  text-align: center;
  line-height: 28px;
  margin-top: 6px;
}
#appPanel {
  background: url('../../assets/twoImg/bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 80px;
}

.yichu {
  width: 300px;
  height: 36px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.filesTitle {
  width: 500px;
}
.add {
  width: 31px;
  height: 31px;
  color: #3296fa;
  font-size: 30px;
  position: relative;
  top: -13px;
  left: -21px;
}
.titleWs {
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-flow: wrap;
  //   justify-content: space-between;
  width: 100%;
  padding: 18px 20px;
  border-radius: 10px;
  .titleItem {
    width: 12%;
    // padding: 9px 0px;
    margin-top: 10px;
    height: 40px;
    text-align: center;
    background-color: white;
    color: #3296fa;
    border-radius: 20px;
    display: flex;
    // align-items: center;
    margin-left: 0.5%;
  }
  .colorItem {
    background: #3296fa;
    color: white;
  }
}
.centers {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 20px;
  .one {
    display: flex;
    .oneLeft {
      display: flex;
      width: 63%;
      flex-wrap: wrap;
      justify-content: space-between;

      .oneLeftItem {
        display: flex;
        //   justify-content: space-evenly;
        width: 32.5%;
        background-color: white;
        border-radius: 10px;
        align-items: center;
        padding: 15px 0;
        margin-top: 10px;
        font-size: 16px;
      }
      .oneBton {
        width: 66%;
      }
    }
    .oneRight {
      width: 37%;
      margin-left: 1%;
      .oneRightShow {
        width: 100%;
        height: 96%;
        border-radius: 10px;
        margin-top: 10px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;
        .bofang {
          z-index: 2;
        }
        .zanting {
          z-index: 2;
        }
        .videos {
          width: 100%;
          height: 100%;
          position: absolute;
          padding: 10px 0;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }
      .oneRightnoShow {
        width: 100%;
        height: 96%;
        background-color: white;
        text-align: center;
        line-height: 160px;
        border-radius: 10px;
        margin-top: 10px;
        .addVideo {
          width: 150px;
          margin: auto;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #3396fb;
          color: white;
          border-radius: 20px;
        }
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
  .two {
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
            width: 120px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            border-right: 1px solid #ebeef5;
            border-bottom: 1px solid #ebeef5;
            color: #333333;
          }
          .right {
            width: 85%;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ebeef5;
            padding-left: 20px;
            background-color: white;
            color: #666666;
          }
        }
      }
    }
    .twoRight {
      background-color: white;

      height: 467px;
      padding: 15px;
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
}

.el-dialog {
  .el-input-number {
    width: 100%;
  }
}
.widths {
  width: 33% !important;
}
.main {
  .panelHeader {
    // background: url('~@/assets/images/project-bg.png') no-repeat center center;
    background-color: rgba(255, 255, 255, 0.4) !important;
    background-size: cover;
    color: #fff;
    font-weight: bold;
    padding: 0 !important;
    // padding-bottom: 32px !important;
    .headerTop {
      .liu-tag {
        // height: 22px;
        // line-height: 22px;
        padding: 3px 10px;
        border: 1px solid #ffe191;
        border-radius: 11px;
        font-weight: bold;
        color: #ffe191;
        font-size: 12px;
      }
    }
  }
  .headerBtn-mainContent {
    background: #ffffff;
    border-radius: 5px 5px 0px 0px;
    padding: 20px 25px;
  }
  .mainContent {
    // padding: 20px 0px !important;
    .mainList {
      box-shadow: 0px 0px 24px 2px rgba(3, 3, 3, 0.05);
      border-radius: 10px;
      width: 24% !important;
    }
    .mainJinList {
      box-shadow: 0px 0px 24px 2px rgba(3, 3, 3, 0.05) !important;
    }
  }
}
@media screen and (max-width: 1643px) {
  .headerBtn {
    flex-flow: wrap;
  }
  .headerBtnItem {
    width: 27% !important;
  }
}
</style>
