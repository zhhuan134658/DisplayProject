<template>
  <div id="filesCurrent">
    <div class="main">
      <div class="topContent">
        <!-- <div
          class="pchLeft"
          style="margin-bottom:16px;display:flex; align-items:center; width:100%;"
        >
          <div>项目名称：</div>
          <el-select
            v-model="searchId"
            filterable
            placeholder="请选择项目"
            @change="getFileList"
          >
            <el-option
              v-for="item in nextProject"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="flexRow" style="display:flex;flex-wrap:wrap;">
          <div class="piccontent" @click="drawing(1)">
            <img class="img" src="../../assets/management/TZ.png" />
            <span>图纸文件</span>
          </div>
          <div class="piccontent" @click="drawing(2)">
            <img class="img" src="../../assets/management/MX.png" />
            <span>模型文件</span>
          </div>
          <div class="piccontent" @click="drawing(5)">
            <img class="img" src="../../assets/management/GF.png" />
            <span>规范图集</span>
          </div>
          <div class="piccontent" @click="drawing(3)">
            <img class="img" src="../../assets/management/GX.png" />
            <span>参建各方文件</span>
          </div>
          <div class="piccontent" @click="drawing(4)">
            <img class="img" src="../../assets/management/BD.png" />
            <span>私人文件</span>
          </div>
          <div class="piccontent" @click="drawing(6)">
            <img class="img" src="../../assets/management/SC.png" />
            <span>我的收藏</span>
          </div>
        </div>
      </div>
      <div class="middleContent">
        <div class="file">最近文件列表</div>

        <div>
          <el-table
            :data="banner"
            :default-sort="{ prop: 'time', order: 'descending' }"
            style="width: 100%"
          >
            <el-table-column label="图标" width="100">
              <template slot-scope="scope">
                <el-row :gutter="20" class="left">
                  <el-col :span="3" v-if="scope.row.gurl">
                    <img
                      :src="scope.row.gurl"
                      style="height: 40px; width: 40px"
                    />
                  </el-col>
                  <el-col :span="3" v-else>
                    <img
                      src="../../assets/management/guidang.png"
                      style="height: 34px; width: 38px"
                      v-show="scope.row.type == 'file' ? true : false"
                    />
                    <img
                      src="../../assets/management/TZ.png"
                      style="height: 40px; width: 40px"
                      v-show="
                        scope.row.filetype == '2' && scope.row.type != 'file'
                          ? true
                          : false
                      "
                    />
                    <img
                      src="../../assets/management/MX.png"
                      style="height: 40px; width: 40px"
                      v-show="
                        scope.row.filetype == '3' && scope.row.type != 'file'
                          ? true
                          : false
                      "
                    />
                    <img
                      src="../../assets/management/GX.png"
                      style="height: 40px; width: 40px"
                      v-show="
                        scope.row.filetype == '4' && scope.row.type != 'file'
                          ? true
                          : false
                      "
                    />
                    <img
                      src="../../assets/management/BD.png"
                      style="height: 40px; width: 40px"
                      v-show="
                        scope.row.filetype == '5' && scope.row.type != 'file'
                          ? true
                          : false
                      "
                    />
                    <img
                      src="../../assets/management/GF.png"
                      style="height: 40px; width: 40px"
                      v-show="
                        scope.row.filetype == '6' && scope.row.type != 'file'
                          ? true
                          : false
                      "
                    />
                    <img
                      src="../../assets/management/SC.png"
                      style="height: 40px; width: 40px"
                      v-show="scope.row.filetype == '7' ? true : false"
                    />
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="文件名称">
              <template slot-scope="scope">
                <span @click="previewFiles(scope.row)">{{
                  scope.row.name
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="上传方式" width="100">
              <template slot-scope="scope">
                <el-button v-if="scope.row.type == 'DD'" type="text"
                  >钉盘文件</el-button
                >
                <el-button v-else type="text">工程文件</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="日期"
              sortable
              width="100"
            ></el-table-column>
            <el-table-column
              prop="size"
              label="大小"
              sortable
              width="120"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      title="预览   (ESC关闭)"
      :visible.sync="preViewVisible"
      width="80%"
      :close-on-click-modal="false"
      @close="closeBimface"
      class="viewFileDialog"
    >
      <div style="text-align: right; margin-bottom: 10px; color: red">
        <i
          class="el-icon-question"
          style="font-size: 16px; color: red; cursor: pointer"
          @click="openWarn"
        ></i>
      </div>
      <div id="domId"></div>
      <el-dialog
        width="900px"
        title="提示"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div style="text-align: center">
          <p style="margin-bottom: 30px; font-size: 16px">
            如果无法查看文件，请去钉钉的系统设置-开启WebGL与SVG支持
          </p>
          <el-carousel arrow="always" :autoplay="false" height="420px">
            <el-carousel-item v-for="item in picWarnList" :key="item">
              <img :src="item" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'filesCurrent',
  data() {
    return {
      preViewVisible: false,

      dialogVisible: false,
      banner: [],
      nextProject: [],
      searchId: '',
      innerVisible: false,
      picWarnList: [
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/WzfnNZZfQP1615520214522.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/sijBDStyrj1615520216033.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/jAH6EcdHpZ1615520216243.png',
      ],
    };
  },
  methods: {
    openWarn() {
      this.innerVisible = true;
    },
    closeBimface() {
      document.getElementById('domId').innerHTML = ' ';
      this.preViewVisible = false;
    },
    //预览
    getRebort(stype) {
      const _this = this;
      let name, czconten;
      if (stype == 'delete') {
        czconten = '删除人员权限' + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == 'delete2') {
        czconten = '删除人员权限' + JSON.stringify(_this.selectPowerPeople);
        name = 6;
      } else if (stype == 'edit') {
        czconten = '更改人员权限' + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == 'add') {
        czconten = '添加人员权限' + JSON.stringify(_this.editPeople);
        name = 6;
      } else if (stype == 'preview') {
        czconten = '预览文件' + _this.previewFileId;
        name = 1;
      }
      _this.$axios
        .post('/projectfile/CreatedJiLu', {
          corp_id: _this.$store.state.cid,
          xmid: _this.searchId,
          userid: _this.$store.state.userInfo.uid,
          fid: _this.managePId || _this.previewFileId,
          name: name,
          czconten: czconten,
          admin: _this.$store.state.userInfo.admin,
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log(res.data.msg);
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        });
    },

    previewFiles(row) {
        console.log(row,'24515')
      const _this = this;
      if (row.type == 'bimface') {
        _this.preViewVisible = true;
        _this.previewBIM(row.id);
      } else if (row.type == 'DD') {
        _this.watchFiles(row.url);
        _this.getRebort('preview');
      } else if (row.type == 'OSS') {
        let newType = row.name.substring(row.name.lastIndexOf('.') + 1);
        if (
          newType == 'png' ||
          newType == 'jpg' ||
          newType == 'jpeg' ||
          newType == 'gif' ||
          newType == 'bmp'
        ) {
          _this.previewPic(row.url);
        } else {
          _this.previewOffice(row.url);
        }
        _this.getRebort('preview');
      }
    },
    //预览附件
    watchFiles(item) {
        console.log(item,'121221')
      const _this = this;
      _this.$axios
        .post('/dingding/DingPanSaveFiles', {
          type: 'download',
          fileids: item.fileId,
        })
        .then(res => {
          if (res.data.code == 1) {
            dd.ready(function() {
              dd.biz.cspace.preview({
                corpId: _this.$store.state.cid,
                spaceId: item.spaceId,
                fileId: item.fileId,
                fileName: item.fileName,
                fileSize: item.fileSize,
                fileType: item.fileType,
                onSuccess: function() {
                  //无，直接在native显示文件详细信息
                },
                onFail: function() {
                  // 无，直接在native页面显示具体的错误
                },
              });
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //预览BIMFACE
    previewBIM(id) {
      const _this = this;

      _this.$axios
        .post('/projectfile/BimFileYuLan', {
          id: id,
          admin: _this.$store.state.userInfo.admin,
        })
        .then(res => {
          if (res.data.code === 1) {
            _this.viewToken = res.data.viewtoken;
            // 设置BIMFACE JSSDK加载器的配置信息
            // eslint-disable-next-line no-undef
            let loaderConfig = new BimfaceSDKLoaderConfig();
            loaderConfig.viewToken = res.data.viewtoken;
            // 加载BIMFACE JSSDK加载器
            // eslint-disable-next-line no-undef
            BimfaceSDKLoader.load(
              loaderConfig,
              _this.successCallback,
              _this.failureCallback,
            );
          } else {
            _this.$message.warning(`${res.data.msg}`);
          }
        });
    },
    successCallback(viewMetaData) {
      // 创建WebApplication，直接显示模型或图纸
      let dom4Show = document.getElementById('domId');
      // eslint-disable-next-line no-undef
      new Glodon.Bimface.Application.WebApplicationDemo(viewMetaData, dom4Show);
    },
    failureCallback(error) {
      console.log(error);
    },
    getNextProject() {
      const _this = this;
      _this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            _this.nextProject = res.data.data;
            _this.searchId = res.data.data[0].id;

            _this.getFileList();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //预览图片
    previewPic(url) {
      dd.ready(function() {
        dd.biz.util.previewImage({
          urls: [url], //图片地址列表
          current: url, //当前显示的图片链接
          onSuccess: function() {
            /**/
          },
          onFail: function() {},
        });
      });
    },
    //预览office
    previewOffice(url) {
      dd.ready(function() {
        dd.biz.util.openLink({
          url: url,
          onSuccess: function() {
            /**/
          },
          onFail: function() {},
        });
      });
    },
    drawing(type) {
      switch (type) {
        case 1:
          this.$router.push({ path: '/files/filesImg' });
          break;
        case 2:
          this.$router.push({ path: '/files/filesModel' });
          break;
        case 3:
          this.$router.push({ path: '/files/filesShare' });
          break;
        case 4:
          this.$router.push({ path: '/files/filesLocal' });
          break;
        case 5:
          this.$router.push({ path: '/files/filesAtlas' });
          break;
        case 6:
          this.$router.push({ path: '/files/filesCollect' });
          break;
      }
    },
    // 文件列表
    getFileList() {
      this.$axios
        .post('/projectfile/FileList', {
          type: 1,
          parentid: 1,
          corp_id: this.$store.state.cid,
          userid: this.$store.state.userInfo.uid,
          xmid: this.searchId,
          admin: this.$store.state.userInfo.admin,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.banner = res.data.content;
          } else if (res.data.code == 0) {
            dd.ready(function() {
              dd.device.notification.alert({
                message: res.data.msg,
                title: '提示', //可传空
                buttonName: '收到',
                onSuccess: function() {
                  //onSuccess将在点击button之后回调
                  /*回调*/
                },
                onFail: function() {},
              });
            });
          } else {
            this.$message.warning(`${res.data.msg}`);
          }
        });
    },
  },
  computed: {
    bannerSS() {
      if (this.banner.length < 9) {
        return this.banner;
      } else {
        var bannerS = [];
        for (let i = 0; i < 9; i++) {
          bannerS.push(this.banner[i]);
        }
        return bannerS;
      }
    }, // 文件列表
  },
  mounted() {
    // this.getPRole();

    this.getNextProject();
    this.$utils.checkding();
  },
  watch: {
    '$store.state.projectInfo': {
      handler(val, oldVal) {
        if (oldVal) {
          this.getFileList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
