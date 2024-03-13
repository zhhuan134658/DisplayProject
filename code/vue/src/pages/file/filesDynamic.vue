<template>
  <div id="filesCurrent">
    <div class="main">
      <div class="topContent">
        <div
          class="pchLeft"
          style="margin-bottom:16px;display:flex; align-items:center;"
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
        </div>
      </div>
      <div class="middleContent">
        <div class="file" style="margin-bottom: 20px">文件操作动态</div>
        <div>
          <el-table :data="banner" stripe border style="width: 100%">
            <el-table-column
              label="姓名"
              prop="name"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              label="操作内容"
              prop="neirong"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              label="操作时间"
              prop="time"
              width="200"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'filesDynamic',
  data() {
    return {
      preViewVisible: false,
      total: 0,
      pagesize: 10,
      currentPage: 1,
      banner: [],
      searchId: '',
      nextProject: [],
    };
  },
  methods: {
    //文件恢复
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFileList();
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

    // 文件列表
    getFileList() {
      this.$axios
        .post('/projectfile/WenJianDongTaiList', {
          xmid: this.searchId,
          admin: this.$store.state.userInfo.admin,
          current_page: this.currentPage,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.banner = res.data.content.list;
            this.total = res.data.content.total;
            if (res.data.content.total > 0 && this.banner.length < 1) {
              this.getFileList();
            }
          } else if (res.data.code == 300) {
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
  mounted() {
    this.getNextProject();
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
