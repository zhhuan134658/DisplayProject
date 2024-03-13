<template>
  <!--  -->
  <div id="systemRole">
    <div class="main">
      <div class="appContent">
        <div class="appContentLeft">
          <div class="top">
            <div class="line">
              <div style="font-weight: bold">菜单列表</div>
              <div v-show="false">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </div>
          </div>
          <div class="item" v-for="(item, index) in topmenuList" :key="index">
            <div class="line" v-if="item.name != '任务'">
              <div
                :class="index === activeAppRole ? 'activeRoleClass' : ''"
                @click="changeRole(item, index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="appContentRight">
          <div class="appCRLine">
            <div class="appCRHeader">
              <div class="appCRHLeft">
                <div>菜单列表</div>
              </div>
              <div
                class="appCRHRight"
                style="padding-right: 26px"
                @click="saveall"
              >
                保存
              </div>
            </div>
          </div>
          <div class="appCRBottom liu-tree">
            <!--     :render-content="renderContent"  -->
            <el-tree
              @node-click="deptNodeClick"
              ref="alltree"
              :data="AllmenuList"
              :props="defaultProps"
              node-key="id"
              :expand-on-click-node="false"
              default-expand-all
            >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
                v-if="node.data.is_xs == 1"
              >
                <div>
                  <img
                    style="
                      width: 13px;
                      height: 13px;
                      margin-right: 5px;
                      vertical-align: middle;
                    "
                    :src="node.childNodes.length > 0 ? oneUrl : twoUrl"
                    alt=""
                  />
                  <span
                    style="
                      color: #000;
                      vertical-align: middle;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #333333;
                    "
                    >{{ node.label }}</span
                  >
                </div>

                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                  >
                    隐藏
                  </el-button>
                </span>
              </span>

              <span class="custom-tree-node" slot-scope="{ node, data }" v-else>
                <div>
                  <img
                    style="
                      width: 13px;
                      height: 13px;
                      margin-right: 5px;
                      vertical-align: middle;
                    "
                    :src="node.childNodes.length > 0 ? oneUrl : twoUrl"
                    alt=""
                  />
                  <span
                    style="
                      color: #c0c4cc;
                      vertical-align: middle;
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #333333;
                    "
                    >{{ node.label }}</span
                  >
                </div>

                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => xianshi(node, data)"
                  >
                    显示
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import imgupload from '../../components/imgUploadcopy.vue';
export default {
  name: 'menuReset',
  components: { imgupload },
  data() {
    return {
      oneUrl:
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//GP28rMEZ2c1641524725472.png',
      twoUrl:
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//BCWXmWMcjY1641525414378.png',
      titlenum: '1',
      upImgList: [],
      licenceImg: [],
      childArr: [],
      activeAppRole: 0,
      topmenuList: [],
      AllmenuList: [],
      activeName: 'second',
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    imgshow(data) {
      console.log(data[0]);
    },
    deptNodeClick(item, e) {
      console.log('节点', e);
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      console.log(node, data);
      if (node.childNodes.length == 0) {
        node.data.is_xs = 0;
      } else {
        // let isList = [];
        // data.children.map((item) => {
        //     isList.push(item.is_xs);
        // });
        // console.log(isList);
        // if (isList.includes(1)) {
        //     this.$message({
        //         message: '请先修改子级',
        //         type: 'warning',
        //         duration: 1500
        //     });
        // } else {
        //     node.data.is_xs = 0;
        // }
        node.data.is_xs = 0;
        data.children.map(item => {
          if (item.children.length == 0) {
            item.is_xs = 0;
          } else {
            item.is_xs = 0;
            item.children.map(item1 => {
              item1.is_xs = 0;
            });
          }

          // isList.push(item.is_xs);
        });
      }
    },
    xianshi(node, data) {
      console.log(node);
      // if (node.parent.data.is_xs == 0) {
      //     this.$message({
      //         message: '请先修改父级',
      //         type: 'warning',
      //         duration: 1500
      //     });
      // } else {
      //     node.data.is_xs = 1;

      // }
      if (node.childNodes.length == 0) {
        if (node.parent.data.is_xs == 0) {
          this.$message({
            message: '请先修改父级',
            type: 'warning',
            duration: 1500,
          });
        } else {
          node.data.is_xs = 1;
        }
      } else {
        node.data.is_xs = 1;
        data.children.map(item => {
          if (item.children.length == 0) {
            item.is_xs = 1;
          } else {
            item.is_xs = 1;
            item.children.map(item1 => {
              item1.is_xs = 1;
            });
          }

          // item.is_xs = 1;
          // isList.push(item.is_xs);
        });
      }
    },
    changeRole(item, index) {
      console.log(item, index);
      this.activeAppRole = index;
      // if (item.name == '商务') {
      //     this.getAllmenu('1');
      // } else if (item.name == '财务') {
      //     this.getAllmenu('2');
      // } else if (item.name == '生产') {
      //     this.getAllmenu('3');
      // } else if (item.name == '现场') {
      //     this.getAllmenu('4');
      // }

      if (item.name == '投标') {
        this.getAllmenu('2');
        this.titlenum = '2';
      } else if (item.name == '招标') {
        this.getAllmenu('3');
        this.titlenum = '3';
      } else if (item.name == '收入') {
        this.getAllmenu('4');
        this.titlenum = '4';
      } else if (item.name == '支出') {
        this.getAllmenu('5');
        this.titlenum = '5';
      } else if (item.name == '技术') {
        this.getAllmenu('6');
        this.titlenum = '6';
      } else if (item.name == '成本') {
        this.getAllmenu('7');
        this.titlenum = '7';
      } else if (item.name == '财务') {
        this.getAllmenu('8');
        this.titlenum = '8';
      } else if (item.name == '首页') {
        this.getAllmenu('1');
        this.titlenum = '1';
      } else if (item.name == '设置') {
        this.getAllmenu('11');
        this.titlenum = '11';
      }
    },

    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
      // console.log(JSON.stringify(this.$refs.alltree.data));
    },
    getMenuBtnList(menuTreeList, menuList) {
      for (let item of menuTreeList) {
        if (item.children.length > 0) {
          if (item.is_xs === 0) {
            menuList.push(item.id);
          }
          this.getMenuBtnList(item.children, menuList);
        } else {
          if (item.is_xs === 0) {
            menuList.push(item.id);
          }
        }

        // if (item.is_xs === 1) {
        //     menuList.push(item.id);
        // } else if (item.children.length > 0) {
        //     this.getMenuBtnList(item.children, menuList);
        // }
      }
    },
    menuCustomSort(menu_ids, name) {
      console.log('12113', menu_ids);
      this.$axios
        .post('/order/menuCustomSort', {
          name: name,
          menu_ids: menu_ids,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: res.data.msg,
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 保存
    saveall() {
      let arr = [];
      this.getMenuBtnList(this.$refs.alltree.data, arr);

      this.menuCustomSort(arr, this.titlenum);

      console.log('123', arr);
      console.log('123');

      // this.getNewmenu(JSON.stringify(this.$refs.alltree.data), '');
    },
    allowDrop(draggingNode, dropNode, type) {
      return true;
      // if (dropNode.data.label === '二级 3-1') {
      //     return type !== 'inner';
      // } else {
      //     return true;
      // }
    },
    allowDrag(draggingNode) {
      console.log('asjdiosajiojafiojfa', draggingNode);
      if (draggingNode.data.is_xs == 0) {
        return false;
      } else {
        return true;
      }

      // return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },
    // 顶部导航
    getTopmenu() {
      this.$axios
        .post('/user/menu', {
          type: 0,
        })
        .then(res => {
          if (res.data.code == 1) {
            // this.topmenuList = res.data.data.slice(1, 5);
            this.topmenuList = res.data.data;
            this.getAllmenu('1');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAllmenu(type) {
      this.typeindex = type;
      this.$axios
        .post('/user/menu', {
          type: type,
          wz_type: 1,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.AllmenuList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 排序后
    getNewmenu(newdata, id) {
      this.$axios
        .post('/order/menuCustomSort', {
          menu_s: this.typeindex,
          menu_j: newdata,
          id: id,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.getAllmenu(this.typeindex);
            this.$message({
              message: res.data.msg,
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getTopmenu();
  },
  mounted() {},
};
</script>
<style lang='less' >
#systemRole {
  // .el-tree-node:focus > .el-tree-node__content {
  //     background-color: #fff; //节点的背景颜色
  //     color: #409eff; //节点的字体颜色
  // }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .main {
    .appTitle {
      background: #fff;
      box-shadow: 0px 1px 4px 0px rgb(0 0 0 / 6%);
      border-radius: 5px;
      border: solid 1px #edf0f5;
    }
  }
}

.liu-tree {
  padding-top: 0px !important;
  .el-tree {
    .el-tree-node {
      // height: 48px;
      .el-tree-node__content {
        height: 48px;
        padding: 10px 0px;
        border-bottom: 1px solid #e6e6e7;
      }
    }
  }
}
</style>