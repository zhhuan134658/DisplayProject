/* * @Author: NorthWind * @Date: 2020-12-21 10:35:31 * @Last Modified by:
mikey.zhaopeng * @Last Modified time: 2022-01-07 17:22:54 */
<template>
  <div id="systemRole">
    <div class="main">
      <div
        class="appContent"
        style="background: white; padding-right: 30px; padding-bottom: 50px"
      >
        <div class="appContentLeft">
          <div class="top">
            <div class="line">
              <el-input
                placeholder="搜索"
                prefix-icon="el-icon-search"
                size="mini"
                v-model="searchKey"
                @change="searchUser"
              />
            </div>
          </div>

          <div class="top">
            <div class="line">
              <div style="font-weight: bold">角色列表 ({{ roleNum }})</div>
              <div>
                <i class="el-icon-circle-plus-outline" @click="addRole"></i>
              </div>
            </div>
          </div>
          <div v-if="!searchingUser">
            <!-- <draggable animation="1000" v-model="roleList"> -->

            <div
              class="item"
              v-for="(item, index) in roleList"
              :key="index"
              :class="index === activeAppRole ? 'activeRoleClassD' : ''"
            >
              <div class="line">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.name + '（' + item.num + '）'"
                  placement="right-start"
                >
                  <div
                    class="nameLeft"
                    :class="index === activeAppRole ? 'activeRoleClass' : ''"
                    @click="changeRole(item, index)"
                  >
                    {{ item.name }}（{{ item.num }}）
                  </div>
                </el-tooltip>

                <div class="iconOperation">
                  <el-dropdown class="editDROP" style="height: 30px">
                    <i v-if="item.name != '管理员'" class="el-icon-setting"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item style="padding: 0"
                        ><div
                          style="padding: 0 20px"
                          @click="editRoleBtn(item, index)"
                        >
                          重命名
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item style="padding: 0"
                        ><div
                          style="padding: 0 20px"
                          @click="deleteRoleBtn(item, index)"
                        >
                          删除
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
            <!-- </draggable> -->
          </div>
          <div v-else>
            <div class="item" v-for="(item, index) in roleList" :key="index">
              <div
                class="line"
                @click="changeSearchUser(item.name, item.group, item.avatar)"
              >
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="appContentRight">
          <div
            v-if="!searchingUser"
            class="appCRLine"
            style="background: #f8f9fb"
          >
            <div class="appCRHeader">
              <div class="appCRHLeft">
                <div
                  v-for="(item, index) in titleList"
                  :key="index"
                  :class="index === activeAppItem ? 'activeRoleClass' : ''"
                  @click="changeItem(item, index)"
                  style="font-weight: bold"
                >
                  {{ item.name }}
                </div>
                <div
                  v-if="!viewPage"
                  class="appCRHRight"
                  style="margin-left: 20px"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击添加角色成员"
                  >
                    <i class="el-icon-plus" @click="addManyP"></i>
                  </el-tooltip>
                </div>
              </div>

              <div v-if="viewPage" class="appCRHRight">
                <span v-if="isDisa" @click="editRole" :class="comEdit"
                  >编辑</span
                >
                <span v-else @click="saveRole">保存</span>
              </div>
              <div v-else class="appCRHRight">
                <span @click="allDelete">批量删除</span>

                &nbsp;
                <!-- <i class="el-icon-plus" @click="addManyP"></i> -->
              </div>
            </div>
          </div>
          <div v-else class="appCRLine">
            <div class="appCRHeader">
              <div class="appCRHLeft">
                <div :class="'activeRoleClass'" style="font-weight: bold">
                  {{ '用户详情' }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!searchingUser"
            class="appCRBottom"
            style="padding-top: 0px"
          >
            <div v-if="viewPage">
              <div v-for="(item, index) in PowerList" :key="index">
                <el-collapse v-model="activeNames" accordion>
                  <el-collapse-item
                    :title="item.title"
                    :name="index + 1"
                    style="border-top: none"
                  >
                    <div
                      class="acrbHeader"
                      style="
                        width: 100%;
                        display: flex;
                        background-color: #e5f1fa;
                      "
                    >
                      <el-checkbox
                        class="acf2"
                        :indeterminate="item.isIndeterminate"
                        :disabled="isDisa"
                        v-model="item.checkAll"
                        :label="item.id"
                        :key="index"
                        @change="handleTotalAllChange($event, item, index)"
                        >全部</el-checkbox
                      >
                      <div
                        class="acf1"
                        :class="isDisa == true ? 'garyDivColor' : 'bDivColor'"
                        style="padding-left: 20px"
                      >
                        表单权限
                        <el-checkbox
                          style="margin-left: 20px"
                          :indeterminate="item.isIndeterminate1"
                          :disabled="isDisa"
                          v-model="item.checkAll1"
                          :label="item.id"
                          :key="index"
                          @change="addAllChange($event, item, index, '新建')"
                          >新建</el-checkbox
                        >
                        <el-checkbox
                          :indeterminate="item.isIndeterminate2"
                          :disabled="isDisa"
                          v-model="item.checkAll2"
                          :label="item.id"
                          :key="index"
                          @change="addAllChange($event, item, index, '查看')"
                          >查看</el-checkbox
                        >
                        <el-checkbox
                          :indeterminate="item.isIndeterminate3"
                          :disabled="isDisa"
                          v-model="item.checkAll3"
                          :label="item.id"
                          :key="index"
                          @change="addAllChange($event, item, index, '删除')"
                          >删除</el-checkbox
                        >
                        <el-checkbox
                          :indeterminate="item.isIndeterminate4"
                          :disabled="isDisa"
                          v-model="item.checkAll4"
                          :label="item.id"
                          :key="index"
                          @change="addAllChange($event, item, index, '导出')"
                          >导出</el-checkbox
                        >
                        <el-checkbox
                          v-if="item.title == '设置'"
                          :indeterminate="item.isIndeterminate5"
                          :disabled="isDisa"
                          v-model="item.checkAll5"
                          :label="item.id"
                          :key="index"
                          @change="addAllChange($event, item, index, '导入')"
                          >导入</el-checkbox
                        >
                      </div>

                      <div
                        class="acf2"
                        :class="isDisa == true ? 'garyDivColor' : 'bDivColor'"
                        style="padding-left: 40px; width: 400px"
                      >
                        项目权限
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="
                          
                             "
                          placement="top-start"
                        >
                          <div slot="content">
                            参与的项目是指和自己相关的审批单。<br />
                            所有的项目是指所有人提交的审批单,在这个前提下,角色成员添加管理范围会生效,生效后可查看,管理本人和管理范围内成员的审批单。
                          </div>
                          <a-icon
                            style="margin-left: 5px"
                            type="question-circle"
                          />
                        </el-tooltip>
                        <el-checkbox
                          style="margin-left: 20px"
                          :indeterminate="item.isIndeterminate6"
                          :disabled="isDisa"
                          v-model="item.checkAll6"
                          :label="item.id"
                          :key="index"
                          @change="
                            addAllChange($event, item, index, '所有的审批单')
                          "
                          >所有的审批单</el-checkbox
                        >
                        <el-checkbox
                          :indeterminate="item.isIndeterminate7"
                          :disabled="isDisa"
                          v-model="item.checkAll7"
                          :label="item.id"
                          :key="index"
                          class="Cy"
                          @change="
                            addAllChange($event, item, index, '参与的审批单')
                          "
                          >参与的审批单</el-checkbox
                        >
                      </div>
                    </div>
                    <div
                      v-for="(litem, liindex) in item.children"
                      :key="liindex"
                      class="acf1Father"
                    >
                      <!-- :class="
                        liindex % 2 == 0 ? 'arcbMain' : 'grayDiv arcbMain'
                      " -->
                      <div class="acrbHeader acrbHeaderTwo">
                        <el-checkbox
                          :indeterminate="litem.isIndeterminate"
                          :disabled="isDisa"
                          v-model="litem.checkAll"
                          :label="litem.id"
                          :key="liindex"
                          @change="
                            handleCheckAllChange(
                              $event,
                              litem,
                              liindex,
                              index,
                              item,
                            )
                          "
                          >{{ litem.title }}</el-checkbox
                        >
                      </div>
                      <div
                        class="acrbFooter acf1 acrbHeaderTwo acrbHeaderTwoS"
                        style="position: relative"
                      >
                        <el-checkbox
                          v-for="(ilist, lindex) in litem.children"
                          :label="ilist.id"
                          :disabled="isDisa"
                          :class="[
                            ilist.title == '所有的审批单'
                              ? 'rightCheckOne'
                              : '',
                            ilist.title == '参与的审批单'
                              ? 'rightCheckTwo'
                              : '',
                          ]"
                          v-model="ilist.checkAll"
                          :key="lindex"
                          @change="
                            handlecheckedRoleChange(
                              $event,
                              litem.children,
                              ilist,
                              index,
                              liindex,
                              lindex,
                              item.children,
                              item,
                            )
                          "
                          >{{ ilist.title }}</el-checkbox
                        >
                      </div>
                      <!-- <div class="acrbFooter acf2">
                        <el-radio-group
                          :disabled="isDisa"
                          v-if="litem.pop != 'no'"
                          v-model="litem.pop"
                        >
                          {{ litem }}
                          <el-radio :label="1">参与的项目</el-radio>
                          <el-radio :label="2">所有项目</el-radio>
                        </el-radio-group>
                      </div> -->
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div v-else class="acrbUser">
              <div v-if="roleUserList.length > 0">
                <el-checkbox-group
                  v-model="checkList"
                  @change="handleCheckedCitiesChange"
                >
                  <div
                    class="userLine"
                    v-for="(item, index) in roleUserList"
                    :key="index"
                  >
                    <div class="userContent">
                      <div class="ucLeft">
                        <el-checkbox :label="item.userid">
                          <div class="touPic" v-if="item.avatar">
                            <img :src="item.avatar" :alt="item.name + '头像'" />
                          </div>
                          <div class="notou" v-else>
                            {{
                              2 >= item.name.length
                                ? item.name
                                : item.name.substr(item.name.length - 2, 2)
                            }}
                          </div>
                          <div>{{ item.name }}</div>
                        </el-checkbox>
                      </div>

                      <div>
                        <!-- v-if="false" -->
                        <el-button
                          type="text"
                          size="small"
                          @click="selectSubbranch(item.userid)"
                          >添加管理范围</el-button
                        >
                        <!-- v-if="false" -->
                        <el-button
                          type="text"
                          size="small"
                          @click="showSubbranch(item.userid)"
                          >查看</el-button
                        >
                        <i
                          style="margin-left: 16px"
                          class="el-icon-delete"
                          @click="deleteRoleUser(item, index)"
                        ></i>
                      </div>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
              <div v-if="roleUserList.length < 1" style="text-align: center">
                <img
                  src="../../assets/menu/NoData.png"
                  alt=""
                  style="width: 200px; margin-top: 80px"
                />
                <p style="margin-top: 20px">暂无数据</p>
              </div>
            </div>
          </div>
          <div v-else class="appCRBottom">
            <div class="acrbUser" style="border: 1px solid #e9ecf3">
              <div v-if="searchingUserInfo.name">
                <div class="userLine">
                  <div class="userContent">
                    <div class="ucLeft">
                      <div class="touPic" v-if="searchingUserInfo.avatar">
                        <img
                          :src="searchingUserInfo.avatar"
                          :alt="searchingUserInfo.name + '头像'"
                        />
                      </div>
                      <div class="notou" v-else>
                        {{
                          2 >= searchingUserInfo.name.length
                            ? searchingUserInfo.name
                            : searchingUserInfo.name.substr(
                                searchingUserInfo.name.length - 2,
                                2,
                              )
                        }}
                      </div>
                      <div>
                        {{ `${searchingUserInfo.name}`
                        }}<span class="roles">{{
                          `角色：${searchingUserInfo.role
                            .map(role => role['role_name'])
                            .join('、')}`
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="新建角色"
      :visible.sync="addFormVisible"
      @close="handleClose('addEditForm')"
    >
      <el-form
        @submit.native.prevent
        :model="addForm"
        label-width="130px"
        :rules="addFormRules"
        ref="addEditForm"
        label-position="right"
        @submit.native.prevent
      >
        <div>
          <el-form-item label="角色名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <input type="hidden" />
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loaded"
            @click="addSave('addEditForm')"
            >保存</el-button
          >
          <el-button @click="handleClose('addEditForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="删除成员" :visible.sync="dialogVisible">
      <span>
        确认删除
        <span class="deleteRoleClass">{{ deleteRoleName }}</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoleUserSure()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="二级权限" :visible.sync="subbranchVisible">
      <el-empty
        image="https://app58708.eapps.dingtalkcloud.com/app/dist/static/img/bianji1.f4d09d63.png"
        description="暂时还没有数据哦~快去添加吧"
        v-if="subbranchList.length == 0"
      ></el-empty>
      <div class="subList" v-else>
        <div
          class="userLine"
          v-for="(item, index) in subbranchList"
          :key="index"
        >
          <div class="userContent">
            <div class="ucLeft">
              <div class="touPic" v-if="item.pullman_news">
                <img
                  :src="item.pullman_news"
                  :alt="item.pullman_user + '头像'"
                />
              </div>
              <div class="notou" v-else>
                {{
                  2 >= item.pullman_user.length
                    ? item.pullman_user
                    : item.pullman_user.substr(item.pullman_user.length - 2, 2)
                }}
              </div>
              <div>{{ item.pullman_user }}</div>
            </div>

            <div>
              <i
                style="margin-left: 16px"
                class="el-icon-delete"
                @click="deleteSubbranch(item.id)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="删除角色" :visible.sync="deleteVisible">
      <span>
        确认删除
        <span class="deleteRoleClass">{{ deleteRoleIdName }}</span>
        <span>角色？</span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoleIdSure()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量删除角色" :visible.sync="alldeleteVisible">
      <span> 是否确认删除 </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alldeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="alldeleteRoleIdSure()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="角色重命名" :visible.sync="editVisible">
      <span>
        原角色名:
        <span class="deleteRoleClass">{{ editRoleIdName }}</span>
      </span>
      <el-input
        style="margin-top: 10px"
        v-model="newRoleName"
        placeholder="请输入新的角色名"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleIdSure()">确 定</el-button>
      </span>
    </el-dialog>

    <div class="guodu" v-if="editVisible1">
      <div style="color: white">正在保存,请稍等...</div>
      <div v-loading="true" style="margin-top: 30px"></div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import draggable from 'vuedraggable';
export default {
  name: 'systemRole',
  components: { draggable },
  data() {
    return {
      AllCheckedList: [],
      alldeleteVisible: false,
      checkList: [],
      newRoleName: '',
      editVisible: false,
      editVisible1: false,
      isDisa: true,
      activeNames: '1',
      dialogVisible: false,
      isIndeterminate: false,
      deleteVisible: false,
      deleteRoleName: '',
      searchKey: '',
      roleNum: 0,
      searchingUser: false,
      searchingUserInfo: {},
      addFormRules: {
        name: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur',
          },
        ],
      },
      roleList: [],
      roleListNum: [],
      activeAppRole: 0,
      activeAppItem: 0,
      titleList: [
        { name: '功能权限', value: '1' },
        { name: '角色成员', value: '2' },
      ],
      viewPage: true,
      loaded: false,
      addFormVisible: false,
      cover_set_id: 0,
      subbranchList: [],
      subbranchVisible: false,
      addForm: {
        name: '',
      },
      roleId: '1', //角色id
      roleUserList: [],
      deleteRoleUserData: {}, //删除角色数据
      deleteRoleUserIndex: 0, //删除角色索引
      PowerList: [],
      rolePower: [],
      postPowerId: [],
      deleteRoleId: '',
      deleteRoleIdName: '',
      deleteRoleIdIndex: 0,
      editRoleId: '',
      editRoleIdName: '',
      editRoleIdIndex: 0,
      addUserId: [],
      isEditId: '1',
    };
  },
  methods: {
    //   批量删除dialog

    allDelete() {
      if (this.AllCheckedList.length == 0) {
        this.$message({
          message: '请您先选择要删除的角色',
          type: 'success',
          duration: '2000',
        });
      } else {
        this.alldeleteVisible = true;
      }
    },
    //批量选中
    handleCheckedCitiesChange(value) {
      this.AllCheckedList = value;
      console.log(value);
    },
    //批量删除角色
    alldeleteRoleIdSure() {
      const _this = this;
      _this.loaded = true;
      _this.$axios
        .post(
          '/finance/ryqx_del',
          {
            // userid: _this.AllCheckedList,
            // group_id: _this.roleId,
            // corp_id: this.$store.state.cid,
            userid: _this.AllCheckedList,
            j_id: _this.roleId,
          },
          {
            // headers: { other: true },
          },
        )
        .then(res => {
          if (res.data.code == 1) {
            _this.getRoleUserList();
            _this.loaded = false;
            _this.alldeleteVisible = false;
            _this.$message({
              message: '删除成功',
              type: 'success',
              duration: '2000',
            });

            _this.dialogVisible = false;
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
          console.log(error);
        });
    },
    //启动编辑
    editRole() {
      if (this.isEditId !== '1') {
        this.isDisa = false;
      }
    },
    saveRole() {
      this.editVisible1 = true;
      //   let newArr = this.PowerList;
      //   newArr.forEach(item => {
      //     item.children.forEach(e => {
      //       e.children.forEach(k => {
      //         if (k.title == '所有的审批单' || k.title == '参与的审批单') {
      //           if (k.check == 1) {
      //             k.check = true;
      //           }
      //           if (k.check == 0) {
      //             k.check = false;
      //           }
      //         }
      //       });
      //     });
      //   });
      //   this.PowerList = newArr;
      this.$axios
        .post(
          '/finance/roleupdate',
          {
            // group_id: this.roleId,
            // data_json: JSON.stringify(this.PowerList),
            // corp_id: this.$store.state.cid,
            id: this.roleId,
            rules: JSON.stringify(this.PowerList),
          },
          {
            // headers: { other: true },
          },
        )
        .then(res => {
          if (res.data.code == 1) {
            this.roleUserList = res.data.content;
            this.editVisible1 = false;
            this.$message({
              type: 'success',
              message: '编辑成功',
              duration: 1500,
            });
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
      this.isDisa = true;
    },
    //一级全选
    handleTotalAllChange(e, item, index) {
      item.checkAll = e;
      if (e == false) {
        item.isIndeterminate = false;
        item.check = 0;
        item.checkAll1 = false;
        item.isIndeterminate1 = false;
        item.isIndeterminate2 = false;
        item.isIndeterminate3 = false;
        item.isIndeterminate4 = false;
        item.isIndeterminate5 = false;
        // item.isIndeterminate6 = false;

        item.checkAll2 = false;
        item.checkAll3 = false;
        item.checkAll4 = false;
        item.checkAll5 = false;
        // item.checkAll6 = false;
      } else {
        item.check = 1;
        item.checkAll = true;
        item.checkAll1 = true;
        item.checkAll2 = true;
        item.checkAll3 = true;
        item.checkAll4 = true;
        item.checkAll5 = true;
        // item.checkAll6 = true;
        item.isIndeterminate = false;
        item.isIndeterminate1 = false;
        item.isIndeterminate2 = false;
        item.isIndeterminate3 = false;
        item.isIndeterminate4 = false;
        item.isIndeterminate5 = false;
        // item.isIndeterminate6 = false;
      }
      let childArray = this.PowerList[index].children;
      let nonArray = [];
      if (childArray) {
        for (let i = 0, len = childArray.length; i < len; i++) {
          childArray[i].checkAll = e;
          if (e) {
            childArray[i].check = 1;
            childArray[i].isCheckNum = 1;
          } else {
            childArray[i].check = 0;
            childArray[i].isCheckNum = 0;
          }
          childArray[i].children.forEach(element => {
            if (
              element.title == '所有的审批单' ||
              element.title == '参与的审批单'
            ) {
              return;
            } else {
              element.checkAll = e;
              if (e) {
                element.check = 1;
              } else {
                element.check = 0;
              }
            }
          });
        }
      }
      //   this.topAll();
      this.PowerList = this.PowerList.concat(nonArray);
    },
    //一级新增全选
    addAllChange(e, item, index, type) {
      if (type == '新建') {
        item.checkAll1 = e;
        item.isIndeterminate1 = false;
      } else if (type == '查看') {
        item.checkAll2 = e;
        item.isIndeterminate2 = false;
      } else if (type == '删除') {
        item.checkAll3 = e;
        item.isIndeterminate3 = false;
      } else if (type == '导出') {
        item.checkAll4 = e;
        item.isIndeterminate4 = false;
      } else if (type == '导入') {
        item.checkAll5 = e;
        item.isIndeterminate5 = false;
      } else if (type == '所有的审批单') {
        item.checkAll6 = e;
        item.isIndeterminate6 = false;
      } else if (type == '参与的审批单') {
        item.checkAll7 = e;
        item.isIndeterminate7 = false;
      }

      let childArray = this.PowerList[index].children;
      let nonArray = [];
      if (childArray) {
        for (let i = 0, len = childArray.length; i < len; i++) {
          if (childArray[i].title == type) {
            childArray[i].checkAll = e;
            if (e) {
              childArray[i].check = 1;
              childArray[i].isCheckNum = 1;
            } else {
              childArray[i].check = 0;
              childArray[i].isCheckNum = 0;
            }
          }
          childArray[i].children.forEach(element => {
            if (type == '所有的审批单') {
              if (element.title == '参与的审批单') {
                element.checkAll = false;
                element.check = 0;
                item.checkAll7 = '';
                item.isIndeterminate7 = false;
              }
            } else if (type == '参与的审批单') {
              if (element.title == '所有的审批单') {
                element.checkAll = false;
                element.check = 0;
                item.checkAll6 = '';
                item.isIndeterminate6 = false;
              }
            }

            if (element.title == type) {
              element.checkAll = e;
            }
            if (e) {
              if (element.title == type) {
                element.check = 1;
              }
            } else {
              if (element.title == type) {
                element.check = 0;
              }
            }
          });
        }
      }
      this.PowerList = this.PowerList.concat(nonArray);
      console.log(
        this.PowerList[1],
        'this.PowerListthis.PowerListthis.PowerList',
      );
    },
    //二级全选
    handleCheckAllChange(e, item, lindex, index) {
      let tottc = 0;
      item.checkAll = e;
      if (e == false) {
        item.isIndeterminate = false;
        item.check = 0;
        item.isCheckNum = 0;
      } else {
        item.isCheckNum = 1;
        item.check = 1;
      }
      this.PowerList[index].children[lindex].checkedRole = e;

      let childrenArray = this.PowerList[index].children[lindex].children;
      let noneArray = [];
      if (childrenArray) {
        for (let i = 0, len = childrenArray.length; i < len; i++) {
          console.log(childrenArray[i].title, 'childrenArray[i].title');
          if (
            childrenArray[i].title == '所有的审批单' ||
            childrenArray[i].title == '参与的审批单'
          ) {
            childrenArray[i].checkAll = childrenArray[i].checkAll;
          } else {
            childrenArray[i].checkAll = e;
            if (e) {
              childrenArray[i].check = 1;
            } else {
              childrenArray[i].check = 0;
            }
          }
        }
      }
      for (let k = 0; k < this.PowerList[index].children.length; k++) {
        if (this.PowerList[index].children[k].checkAll == true) {
          tottc++;
        }
      }
      if (tottc == this.PowerList[index].children.length) {
        this.PowerList[index].checkAll = true;
        this.PowerList[index].checkAll1 = true;
        this.PowerList[index].checkAll2 = true;
        this.PowerList[index].checkAll3 = true;
        this.PowerList[index].checkAll4 = true;
        // this.PowerList[index].checkAll6 = true;
        // this.PowerList[index].checkAll7 = true;
        this.PowerList[index].checkAll5 = true;
        this.PowerList[index].check = 1;
        this.PowerList[index].isIndeterminate = true;
        this.PowerList[index].isIndeterminate1 = true;
        this.PowerList[index].isIndeterminate2 = true;
        this.PowerList[index].isIndeterminate3 = true;
        this.PowerList[index].isIndeterminate4 = true;
        this.PowerList[index].isIndeterminate5 = true;
        // this.PowerList[index].isIndeterminate6 = true;
        // this.PowerList[index].isIndeterminate7 = true;
      } else {
        this.PowerList[index].checkAll = false;
        this.PowerList[index].checkAll1 = false;
        this.PowerList[index].checkAll2 = false;
        this.PowerList[index].checkAll3 = false;
        this.PowerList[index].checkAll4 = false;
        this.PowerList[index].checkAll6 = false;
        // this.PowerList[index].checkAll7 = false;
        // this.PowerList[index].checkAll5 = false;
        this.PowerList[index].check = 0;
        this.PowerList[index].isIndeterminate = true;
        this.PowerList[index].isIndeterminate1 = true;
        this.PowerList[index].isIndeterminate2 = true;
        this.PowerList[index].isIndeterminate3 = true;
        this.PowerList[index].isIndeterminate4 = true;
        this.PowerList[index].isIndeterminate5 = true;
        // this.PowerList[index].isIndeterminate6 = true;
        // this.PowerList[index].isIndeterminate7 = true;
      }
      this.PowerList = this.PowerList.concat(noneArray);
      this.topAll();
      // this.updateRolePower();
    },
    // 子级新增查看等选择
    changeChid(index, ilist, type) {
      let arr = this.PowerList[index].children;

      var oBj = {
        numAdd: 0,
        countAdd: 0,
        numShow: 0,
        countShow: 0,
        numDelete: 0,
        counDelete: 0,
        numExport: 0,
        counExport: 0,
        numimport: 0,
        counimport: 0,
        numAll: 0,
        counAll: 0,
        numCy: 0,
        counCy: 0,
      };
      arr.forEach((e, index) => {
        e.children.forEach((k, iindex) => {
          if (k.title == '新建') {
            oBj.numAdd += 1;
            if (k.check && k.title == '新建') {
              oBj.countAdd += 1;
            }
          }
          if (k.title == '查看') {
            oBj.numShow += 1;
            if (k.check && k.title == '查看') {
              oBj.countShow += 1;
            }
          }
          if (k.title == '删除') {
            oBj.numDelete += 1;
            if (k.check && k.title == '删除') {
              oBj.counDelete += 1;
            }
          }
          if (k.title == '导出') {
            oBj.numExport += 1;
            if (k.check && k.title == '导出') {
              oBj.counExport += 1;
            }
          }
          if (k.title == '导入') {
            oBj.numimport += 1;
            if (k.check && k.title == '导入') {
              oBj.counimport += 1;
            }
          }
          if (k.title == '所有的审批单') {
            oBj.numAll += 1;
            if (k.check && k.title == '所有的审批单') {
              oBj.counAll += 1;
            }
          }
          if (k.title == '参与的审批单') {
            oBj.numCy += 1;
            if (k.check && k.title == '参与的审批单') {
              oBj.counCy += 1;
            }
          }
        });
      });

      if (ilist.title == '新建') {
        if (oBj.numAdd == oBj.countAdd) {
          this.PowerList[index].checkAll1 = true;
          this.PowerList[index].isIndeterminate1 = false;
        } else if (oBj.countAdd == 0) {
          this.PowerList[index].checkAll1 = false;
          this.PowerList[index].isIndeterminate1 = false;
        } else {
          this.PowerList[index].checkAll1 = false;
          this.PowerList[index].isIndeterminate1 = true;
        }

        console.log(oBj.numShow, oBj.countShow, 'numShownumShow');
        if (oBj.numShow == oBj.countShow) {
          this.PowerList[index].checkAll2 = true;
          this.PowerList[index].isIndeterminate2 = false;
        } else if (oBj.countShow == 0) {
          this.PowerList[index].checkAll2 = false;
          this.PowerList[index].isIndeterminate2 = false;
        } else {
          this.PowerList[index].checkAll2 = false;
          this.PowerList[index].isIndeterminate2 = true;
        }
      } else if (ilist.title == '查看') {
        console.log(oBj.numShow, oBj.countShow);
        if (oBj.numShow == oBj.countShow) {
          this.PowerList[index].checkAll2 = true;
          this.PowerList[index].isIndeterminate2 = false;
        } else if (oBj.countShow == 0) {
          this.PowerList[index].checkAll2 = false;
          this.PowerList[index].isIndeterminate2 = false;
        } else {
          this.PowerList[index].checkAll2 = false;
          this.PowerList[index].isIndeterminate2 = true;
        }
      } else if (ilist.title == '删除') {
        if (oBj.numDelete == oBj.counDelete) {
          this.PowerList[index].checkAll3 = true;
          this.PowerList[index].isIndeterminate3 = false;
        } else if (oBj.counDelete == 0) {
          this.PowerList[index].checkAll3 = false;
          this.PowerList[index].isIndeterminate3 = false;
        } else {
          this.PowerList[index].checkAll3 = false;
          this.PowerList[index].isIndeterminate3 = true;
        }
      } else if (ilist.title == '导出') {
        if (oBj.numExport == oBj.counExport) {
          this.PowerList[index].checkAll4 = true;
          this.PowerList[index].isIndeterminate4 = false;
        } else if (oBj.counExport == 0) {
          this.PowerList[index].checkAll4 = false;
          this.PowerList[index].isIndeterminate4 = false;
        } else {
          this.PowerList[index].checkAll4 = false;
          this.PowerList[index].isIndeterminate4 = true;
        }
      } else if (ilist.title == '导入') {
        if (oBj.numimport == oBj.counimport) {
          this.PowerList[index].checkAll5 = true;
          this.PowerList[index].isIndeterminate5 = false;
        } else if (oBj.counimport == 0) {
          this.PowerList[index].checkAll5 = false;
          this.PowerList[index].isIndeterminate5 = false;
        } else {
          this.PowerList[index].checkAll5 = false;
          this.PowerList[index].isIndeterminate5 = true;
        }
      } else if (ilist.title == '所有的审批单') {
        if (oBj.numAll == oBj.counAll) {
          this.PowerList[index].checkAll6 = true;
          this.PowerList[index].isIndeterminate6 = false;

          this.PowerList[index].checkAll7 = false;
          this.PowerList[index].isIndeterminate7 = false;
        } else if (oBj.counAll == 0) {
          this.PowerList[index].checkAll6 = false;
          this.PowerList[index].isIndeterminate6 = false;
        } else {
          this.PowerList[index].checkAll6 = false;
          this.PowerList[index].isIndeterminate6 = true;
          this.PowerList[index].checkAll7 = false;
          this.PowerList[index].isIndeterminate7 = true;
        }
      } else if (ilist.title == '参与的审批单') {
        if (oBj.numCy == oBj.counCy) {
          this.PowerList[index].checkAll7 = true;
          this.PowerList[index].isIndeterminate7 = false;
          this.PowerList[index].checkAll6 = false;
          this.PowerList[index].isIndeterminate6 = false;
        } else if (oBj.counCy == 0) {
          this.PowerList[index].checkAll7 = false;
          this.PowerList[index].isIndeterminate7 = false;
        } else {
          this.PowerList[index].checkAll7 = false;
          this.PowerList[index].isIndeterminate7 = true;
          this.PowerList[index].checkAll6 = false;
          this.PowerList[index].isIndeterminate6 = true;
        }
      }
    },
    //子级选择
    handlecheckedRoleChange(e, list, ilist, index, liindex, items) {
      let tickCount = 0, //二级判断选中数
        unTickCount = 0, //二级判断未选中数
        tottc = 0; //一级判断选中数
      let noneArray = [];
      ilist.checkAll = e;
      if (e) {
        ilist.check = 1;
      } else {
        ilist.check = 0;
      }
      // if (ilist.name != '修改' && ilist.checkAll) {
      //     // if (e) {
      //     //     list[2].checkAll = true;
      //     //     list[2].check = 1;
      //     // }
      //     if (e) {
      //     }
      // }
      if (ilist.title == '所有的审批单') {
        list.map((item, index) => {
          if (item.title == '参与的审批单') {
            list[index].checkAll = false;
            list[index].check = false;
            if (!ilist.checkAll) {
              list[index].checkAll = true;
              list[index].check = true;
              this.topAll();
            }
          }
        });
      }
      if (ilist.title == '参与的审批单') {
        list.map((item, index) => {
          if (item.title == '所有的审批单') {
            list[index].checkAll = false;
            list[index].check = false;
            if (!ilist.checkAll) {
              list[index].checkAll = true;
              list[index].check = true;
              this.topAll();
            }
          }
        });
      }

      console.log(
        ilist.title,
        'ilist.title ilist.title ',
        ilist.check,
        ilist.checkAll,
      );

      if (ilist.title == '新建') {
        if (e) {
          list.map((item, index) => {
            if (item.title == '查看') {
              list[index].checkAll = true;
              list[index].check = 1;
            }
          });
          // list[2].checkAll = true;
          // list[2].check = 1;
        }
      }
      this.changeChid(index, ilist);

      //   console.log('123', this.PowerList[index].children);

      for (let i = 0; i < list.length - 2; i++) {
        if (list[i].checkAll == true) tickCount++;
        if (list[i].checkAll == false) unTickCount++;
      }
      console.log(
        tickCount,
        'tickCount',
        list.length - 2,
        tickCount == list.length - 2,
      );
      if (tickCount == list.length - 2) {
        //子级全勾选
        let SList = this.PowerList[index].children;
        this.PowerList[index].children[liindex].checkAll = true;
        this.PowerList[index].children[liindex].isIndeterminate = false;
        for (let i = 0; i < SList.length; i++) {
          if (SList[i].checkAll == true) tottc++;
        }
        if (tottc == SList.length) {
          this.PowerList[index].checkAll = true;
          this.PowerList[index].isIndeterminate = false;
        } else {
          this.PowerList[index].checkAll = false;
          this.PowerList[index].isIndeterminate = true;
        }
      } else if (unTickCount == list.length || tickCount < list.length - 2) {
        //子级全不勾选或没有全勾选
        this.PowerList[index].children[liindex].checkAll = false;
        this.PowerList[index].children[liindex].isIndeterminate = false;
        this.PowerList[index].checkAll = false;
        this.PowerList[index].isIndeterminate = true;
      } else {
        this.PowerList[index].children[liindex].checkAll = false;
        this.PowerList[index].children[liindex].isIndeterminate = true; //添加不确定状态
      }
      if (unTickCount == list.length - 2) {
        this.PowerList[index].children[liindex].isCheckNum = 0;
      } else {
        this.PowerList[index].children[liindex].isCheckNum = 1;
      }

      this.PowerList = this.PowerList.concat(noneArray);
      // this.updateRolePower();
    },
    //切换角色
    changeRole(item, index) {
      this.checkList = [];
      this.isDisa = true;
      if (item.name == '管理员') {
        this.isEditId = item.extend_first;
      } else {
        this.isEditId = null;
      }

      this.activeAppRole = index;
      this.roleId = item.id;
      this.getAllPower();
      this.getRoleUserList();
    },
    //切换页面
    changeItem(item, index) {
      this.activeAppItem = index;
      this.checkList = [];
      if (index == 0) {
        this.viewPage = true;
        this.changeRoleList();
      } else {
        this.viewPage = false;
        this.getRoleUserList();
      }
    },
    async searchUser(userName) {
      if (!userName) {
        this.searchingUser = false;
        this.getRoleList();
        return false;
      }
      const res = await this.$axios.post('/finance/personnel_search', {
        user_name: userName,
      });
      if (res.data.code === 1) {
        this.searchingUser = true;
        this.roleList = res.data.data;
        if (res.data.data && res.data.data.length > 0) {
          this.changeSearchUser(
            res.data.data[0].name,
            res.data.data[0].group,
            res.data.data[0].avatar,
          );
        }
      }
    },
    async changeSearchUser(userName, group, avatar) {
      const res = await this.$axios.post('/finance/personnel', {
        name: userName,
        group: group,
        avatar: avatar,
      });
      if (res.data.code === 1) {
        this.searchingUserInfo = res.data.data;
      }
    },
    //获取角色成员列表
    getRoleUserList() {
      this.$axios
        .post('/finance/rolemember', {
          id: this.roleId,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.roleUserList = res.data.content;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeRoleList() {
      this.$axios
        .post('/finance/rolelist')
        .then(res => {
          if (res.data.code == 1) {
            this.roleList = res.data.content;
            this.getAllPower();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 获取角色数量
    getRoleListNum() {
      this.$axios
        .post('/finance/rolelist')
        .then(res => {
          if (res.data.code == 1) {
            this.roleList = res.data.content;
            this.roleId = res.data.content[0].id;
            this.getAllPower();
            this.getRoleUserList();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取角色列表
    getRoleList() {
      this.$axios
        .post('/finance/rolelist')
        .then(res => {
          if (res.data.code == 1) {
            this.roleList = res.data.content;
            this.roleId = res.data.content[0].id;
            this.getAllPower();
            this.getRoleUserList();
            if (res.data.content && res.data.content.length >= 1) {
              const roleNums = res.data.content.map(item => item.num);
              this.roleNum = roleNums.reduce((a, b) => a + b, 0);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新建角色
    addSave(formName) {
      const _this = this;
      _this.loaded = true;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/finance/addqxuser', {
              user_id: '',
              rules: [],
              role_name: this.addForm.name,
            })
            .then(res => {
              if (res.data.code == 1) {
                _this.getRoleList();
                _this.loaded = false;
                _this.addFormVisible = false;
                _this.$refs[formName].resetFields();
                _this.$message({
                  message: '添加角色成功',
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
    //取消新建
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.addFormVisible = false;
    },
    addRole() {
      this.addFormVisible = true;
    },
    //删除角色成员页面
    deleteRoleUser(item, index) {
      this.dialogVisible = true;
      this.deleteRoleName = item.name;
      this.deleteRoleUserData = item;
      this.deleteRoleUserIndex = index;
    },
    //删除角色成员
    deleteRoleUserSure() {
      const _this = this;
      _this.loaded = true;
      _this.$axios
        .post('/finance/ryqx_del', {
          userid: [_this.deleteRoleUserData.userid],
          j_id: _this.roleId,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.loaded = false;
            _this.$message({
              message: '删除成功',
              type: 'success',
              duration: '2000',
            });
            _this.roleUserList.splice(_this.deleteRoleUserIndex, 1);
            _this.dialogVisible = false;
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
          console.log(error);
        });
    },
    leftAll() {
      let arr = this.PowerList;
      arr.forEach((even, index) => {
        even.children.forEach((kes, index) => {
          //   kes.children.splice(kes.children.indexOf('所有的审批单'), 1);
          //   kes.children.splice(kes.children.indexOf('参与的审批单'), 1);
          let num = 0;
          let numCheck = 0;
          kes.children.forEach((j, iindex) => {
            if (j.title == '所有的审批单' || j.title == '参与的审批单') {
              num = kes.children.length-2;
            } else {
              num = kes.children.length-1;
            }
            if (j.check) {
              numCheck += 1;
            }
          });
          if (num == numCheck - 1) {
            kes.checkAll = true;
          } else {
            kes.checkAll = false;
          }
          console.log(num, 'numChecknumCheck', numCheck-1, kes.title,kes.checkAll);
        });
      });

      //   this.PowerList = arr;
    },
    // 上方全选
    topAll(type) {
      this.PowerList.forEach(even => {
        even.nums = 0;
        even.numsD = 0;
        even.nums1 = 0;
        even.numsD1 = 0;
        even.nums2 = 0;
        even.numsD2 = 0;
        even.nums3 = 0;
        even.numsD3 = 0;
        even.nums4 = 0;
        even.numsD4 = 0;
        even.nums5 = 0;
        even.numsD5 = 0;
        even.nums6 = 0;
        even.numsD6 = 0;
        even.children.forEach((kes, index) => {
          kes.children.forEach((j, iindex) => {
            if (j.title == '新建' && j.check) {
              even.nums += 1;
            }
            if (j.title == '新建') {
              even.numsD += 1;
            }
            if (j.title == '查看' && j.check) {
              even.nums1 += 1;
            }
            if (j.title == '查看') {
              even.numsD1 += 1;
            }

            if (j.title == '删除' && j.check) {
              even.nums2 += 1;
            }
            if (j.title == '删除') {
              even.numsD2 += 1;
            }

            if (j.title == '导出' && j.check) {
              even.nums3 += 1;
            }
            if (j.title == '导出') {
              even.numsD3 += 1;
            }

            if (j.title == '导入' && j.check) {
              even.nums4 += 1;
            }
            if (j.title == '导入') {
              even.numsD4 += 1;
            }

            if (j.title == '所有的审批单' && j.check) {
              even.nums5 += 1;
            }
            if (j.title == '所有的审批单') {
              even.numsD5 += 1;
            }

            if (j.title == '参与的审批单' && j.check) {
              even.nums6 += 1;
            }
            if (j.title == '参与的审批单') {
              even.numsD6 += 1;
            }
          });
        });

        if (
          even.numsD1 != 0 ||
          even.numsD2 != 0 ||
          even.numsD3 != 0 ||
          even.numsD4 != 0 ||
          even.numsD5 != 0 ||
          even.numsD6 != 0 ||
          even.numsD7 != 0
        ) {
          even.checkAll = false;
          even.chcek = 0;
          even.isIndeterminate = true;
        }

        if (even.nums == even.numsD) {
          even.checkAll1 = true;
          even.isIndeterminate1 = false;
        } else if (even.nums == 0) {
          even.isIndeterminate1 = false;
          even.checkAll1 = false;
        } else {
          even.isIndeterminate1 = true;
          even.checkAll1 = false;
        }

        if (even.nums1 == even.numsD1) {
          even.checkAll2 = true;
          even.isIndeterminate2 = false;
        } else if (even.nums1 == 0) {
          even.isIndeterminate2 = false;
          even.checkAll2 = false;
        } else {
          even.isIndeterminate2 = true;
          even.checkAll2 = false;
        }

        if (even.nums2 == even.numsD2) {
          even.checkAll3 = true;
          even.isIndeterminate3 = false;
        } else if (even.nums2 == 0) {
          even.isIndeterminate3 = false;
          even.checkAll3 = false;
        } else {
          even.isIndeterminate3 = true;
          even.checkAll3 = false;
        }

        if (even.nums3 == even.numsD3) {
          even.checkAll4 = true;
          even.isIndeterminate4 = false;
        } else if (even.nums3 == 0) {
          even.isIndeterminate4 = false;
          even.checkAll4 = false;
        } else {
          even.isIndeterminate4 = true;
          even.checkAll4 = false;
        }

        if (even.nums4 != 0 && even.nums4 == even.numsD4) {
          even.checkAll5 = true;
          even.isIndeterminate5 = false;
        } else if (even.nums4 == 0) {
          even.isIndeterminate5 = false;
          even.checkAll5 = false;
        } else {
          even.isIndeterminate5 = true;
          even.checkAll5 = false;
        }

        if (even.nums5 == even.numsD5) {
          even.checkAll6 = true;
          even.isIndeterminate6 = false;
        } else if (even.nums5 == 0) {
          even.isIndeterminate6 = false;
          even.checkAll6 = false;
        } else {
          even.isIndeterminate6 = true;
          even.checkAll6 = false;
        }

        if (even.nums6 == even.numsD6) {
          even.checkAll7 = true;
          even.isIndeterminate7 = false;
        } else if (even.nums6 == 0) {
          even.isIndeterminate7 = false;
          even.checkAll7 = false;
        } else {
          even.isIndeterminate7 = true;
          even.checkAll7 = false;
        }
      });
    },
    //获取所有权限
    getAllPower() {
      this.$axios
        .post(
          '/mobile/rulesList',
          { group_id: this.roleId, corp_id: this.$store.state.cid },
          //   { headers: { other: true } },
        )
        .then(res => {
          if (res.data.code == 1) {
            this.PowerList = res.data.data;
            this.PowerList = this.PowerList.map(item => {
              return Object.assign(item, {
                isIndeterminate: false,
                checkAll: false,
                checkedRole: false,
              });
            });
            this.PowerList.forEach(item => {
              item.children = item.children.map(item => {
                return Object.assign(item, {
                  isIndeterminate: false,
                  checkAll: false,
                  checkedRole: false,
                  isCheckNum: 0,
                });
              });
            });
            this.PowerList.forEach(item => {
              item.children.forEach(element => {
                element.children = element.children.map(element => {
                  return Object.assign(element, {
                    checkAll: false,
                  });
                });
              });
              // item.children = item.children.map((item) => {
              //     return Object.assign(item, {
              //         checkAll: false
              //     });
              // });
            });

            this.PowerList.forEach(item => {
              if (item.check == 1) {
                item.isIndeterminate = false;
                item.checkAll = true;
                item.checkedRole = true;
              } else {
                item.isIndeterminate = false;
                item.checkAll = false;
                item.checkedRole = false;
              }
              if (item.children.length > 0) {
                item.children.forEach(list => {
                  if (list.check == 1) {
                    list.isIndeterminate = false;
                    list.checkAll = true;
                    list.checkedRole = true;
                  } else {
                    list.isIndeterminate = false;
                    list.checkAll = false;
                    list.checkedRole = false;
                  }
                  if (list.children.length > 0) {
                    list.children.forEach(element => {
                      if (element.check == 1) {
                        element.checkAll = true;
                        list.isCheckNum = 1;
                      } else {
                        element.checkAll = false;
                      }
                    });
                  }
                });
              }
            });
            this.topAll();
            this.leftAll();
            this.PowerList = this.PowerList;
            // console.log('456++' + JSON.stringify(this.PowerList));
            // this.getRolePower();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取角色权限
    // getRolePower() {
    //     const _this = this;
    //     _this.$axios
    //         .post('/finance/roleqxxq', {
    //             id: _this.roleId
    //         })
    //         .then((res) => {
    //             if (res.data.code == 1) {
    //                 let newArray = res.data.content;
    //                 if (newArray.length > 0) {
    //                     // _this.rolePower = newArray.map(item => {
    //                     //     if (!item.id) return '';
    //                     //     return item.id;
    //                     // });
    //                     _this.rolePower = newArray;
    //                     _this.comparison(_this.PowerList, _this.rolePower);
    //                 }
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // },
    //对比相同值更改是否checked
    // comparison(arr, Newarr) {
    //     const _this = this;
    //     for (let i = 0; i < arr.length; i++) {
    //         let item = arr[i];
    //         for (let j = 0; j < Newarr.length; j++) {
    //             let items = Newarr[j];
    //             if (item.id == items) {
    //                 // item.isIndeterminate;
    //                 item.checkAll = true;
    //             }
    //         }
    //         if (item.children.length > 0) {
    //             for (let k = 0; k < item.children.length; k++) {
    //                 for (let p = 0; p < Newarr.length; p++) {
    //                     let items = Newarr[p];
    //                     if (item.children[k].id == items) {
    //                         // item.isIndeterminate;
    //                         item.children[k].checkAll = true;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     let noneArray = [];
    //     _this.PowerList = _this.PowerList.concat(noneArray);
    //     console.log('对比++' + JSON.stringify(_this.PowerList));
    // },
    //更改角色权限
    updateRolePower() {
      const _this = this;
      _this.getPostPowerId();
      _this.$axios
        .post('/index.php/api/dapplication/distributeRoleAuth', {
          id: _this.roleId,
          rules: _this.postPowerId.toString(),
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.getAllPower();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //抽取更改权限id
    getPostPowerId() {
      const _this = this;
      _this.postPowerId = [];
      for (let i = 0, len = _this.PowerList.length; i < len; i++) {
        if (_this.PowerList[i].checkAll == true)
          _this.postPowerId.push(_this.PowerList[i].id);
        if (
          _this.PowerList[i].children &&
          _this.PowerList[i].children.length > 0
        ) {
          let sonPermissionArray = _this.PowerList[i].children;
          for (let j = 0, leng = sonPermissionArray.length; j < leng; j++)
            if (sonPermissionArray[j].checkAll == true) {
              _this.postPowerId.push(sonPermissionArray[j].id);
            }
        }
      }
    },
    //打开重命名覆盖层
    editRoleBtn(item, index) {
      console.log(item);
      this.editRoleId = item.id;
      this.editRoleIdName = item.name;
      this.editRoleIdIndex = index;
      this.editVisible = true;
    },
    //打开删除覆盖层
    deleteRoleBtn(item, index) {
      console.log(item);
      this.deleteRoleId = item.id;
      this.deleteRoleIdName = item.name;
      this.deleteRoleIdIndex = index;
      this.deleteVisible = true;
    },
    //角色重命名
    editRoleIdSure() {
      const _this = this;

      if (_this.newRoleName) {
        _this.$axios
          .post('/finance/role_alter', {
            id: _this.editRoleId,
            name: _this.newRoleName,
          })
          .then(res => {
            if (res.data.code == 1) {
              _this.editVisible = false;
              _this.getRoleList();
              _this.newRoleName = '';
              _this.$message({
                type: 'success',
                message: '角色修改成功',
                duration: 1500,
              });
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
      } else {
        _this.$message({
          type: 'warning',
          message: '请输入新的角色名',
          duration: 1500,
        });
      }
    },
    //删除角色
    deleteRoleIdSure() {
      const _this = this;
      _this.$axios
        .post('/finance/roledel', {
          id: _this.deleteRoleId,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.roleList.splice(_this.deleteRoleIdIndex, 1);
            _this.deleteVisible = false;
            _this.$message({
              type: 'success',
              message: '删除角色成功',
              duration: 1500,
            });
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
    //添加角色人员
    addRoleUser(newarr) {
      const _this = this;
      _this.$axios
        .post(
          '/finance/ryqxadd',
          {
            // group_id: _this.roleId,
            // user_arr: newarr,
            // corp_id: this.$store.state.cid,
            j_id: _this.roleId,
            userid: newarr,
          },
          {
            // headers: { other: true },
          },
        )
        .then(res => {
          if (res.data.code == 1) {
            _this.getRoleUserList();
            _this.$message({
              type: 'success',
              message: '添加人员成功',
              duration: 1500,
            });
          } else {
            _this.$message({
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
    async showSubbranch(cover_set_id) {
      this.cover_set_id = cover_set_id;
      void (await this.getSubbranch(cover_set_id));
      this.subbranchVisible = true;
    },
    async getSubbranch(cover_set_id) {
      const url = '/finance/two_power_list';
      const res = await this.$axios.post(url, {
        cover_set_id,
      });
      if (res.data.code === 1) {
        this.subbranchList = res.data.content;
      } else {
        this.$message.error(res.msg);
      }
    },
    async deleteSubbranch(subId) {
      const url = '/finance/two_power_del';
      const res = await this.$axios.post(url, {
        id: subId,
      });
      if (res.data.code === 1) {
        this.$message.success('删除成功');
        this.getSubbranch(this.cover_set_id);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async addSubbranch(users) {
      const url = '/finance/two_power';
      const res = await this.$axios.post(url, {
        user: users,
        j_id: this.roleId,
        cover_set_id: this.cover_set_id,
      });
      if (res.data.code == 1) {
        this.$message({
          type: 'success',
          message: res.data.msg,
        });
      } else {
        this.$message({
          type: 'warning',
          message: res.data.msg,
        });
      }
    },
    selectSubbranch(id) {
      const _this = this;
      _this.cover_set_id = id;
      dd.ready(() => {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: _this.$store.state.cid, //企业的corpId
          multiple: true, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 99, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: _this.agentid, //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) retÎurn '';
            //     return item.emplId;
            // });
            _this.addSubbranch(result.users);
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
    addManyP() {
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
          startWithDepartdeptId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // let newPeople = [];
            // newPeople = result.users.map((item) => {
            //     if (!item.emplId) return '';
            //     return item.emplId;
            // });
            that.addRoleUser(result.users);
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
  },
  mounted() {
    this.getRoleList();
    this.$utils.checkding();
  },
  computed: {
    comEdit() {
      if (this.isEditId == '1') {
        return 'crhrSpan';
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="less" scoped>
.guodu {
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  text-align: center;
  padding-top: 45vh;
}
@media screen and (max-width: 1840px) {
  .rightCheckOne {
    right: -262px !important;
    bottom: 28px !important;
  }
  .rightCheckTwo {
    right: -232px !important;
    bottom: 4px !important;
  }
  .Cy {
    margin-left: 93px !important;
  }
}
@media screen and (max-width: 1700px) {
  .rightCheckOne {
    right: -162px !important;
    bottom: 28px !important;
  }
  .rightCheckTwo {
    right: -132px !important;
    bottom: 4px !important;
  }
  .acrbHeaderTwoS {
    padding-left: 55px !important;
  }
}
@media screen and (max-width: 1500px) {
  .rightCheckOne {
    right: 62px !important;
    bottom: 28px !important;
  }
  .rightCheckTwo {
    right: 92px !important;
    bottom: 4px !important;
  }
  .acrbHeaderTwoS {
    padding-left: 30px !important;
  }
  .Cy {
    margin-left: 20px !important;
  }
}
.el-collapse {
  border-top: none;
}
.subList {
  min-height: 380px;
  .userLine {
    border-bottom: 1px solid #e6e6e7;
    .userContent {
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      line-height: 48px;
      .ucLeft {
        display: flex;
        .notou {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 30px;
          background-color: #409eff;
          text-align: center;
          color: #fff;
        }
        .touPic {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 30px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      i {
        cursor: pointer;
      }
      .el-icon-delete {
        color: red;
      }
    }
  }
}

span.roles {
  color: #ccc;
  font-size: 14px;
  margin-left: 10px;
}
/deep/ .el-collapse-item__header {
  padding: 20px 30px !important;
}
#systemRole {
  .item {
    .iconOperation {
      opacity: 0;
    }
    .line:hover {
      .iconOperation {
        opacity: 1;
      }
    }
  }
}
/deep/.el-dropdown-menu {
  .el-dropdown-menu__item {
    padding: 0 !important;
  }
}
.rightCheckOne {
  position: absolute;
  right: -278px;
  bottom: 12px;
}
.rightCheckTwo {
  position: absolute;
  right: -386px;
  bottom: 12px;
}
</style>
