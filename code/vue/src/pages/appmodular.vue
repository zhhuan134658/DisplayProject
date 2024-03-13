<template>
  <!--  -->
  <div id="modular">
    <div>
      <h3>从模板中心选择</h3>
      <div>
        可选择与所需场景类似的系统模版，修改系统的配置，使模版符合您的业务
      </div>
    </div>
    <div class="modular_content">
      <div
        class="content_item"
        v-for="(item, index) in MouldList"
        @click="opendra(item)"
        :key="index"
      >
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//rNP8fs6pdK1624265052219.png"
          alt=""
        />
        <div class="content_item_bto">
          <div class="bot_name">
            <div class="bot_name_left">{{ item.name }}</div>
            <div class="bot_name_right" v-if="item.is_az == 1">已安装</div>
            <div class="bot_name_right" v-else>未安装</div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer :title="itemdata.name" :visible.sync="drawer" size="80%">
      <div>
        <el-button @click="appMouldInstall" v-if="itemdata.is_az == 0"
          >安装</el-button
        >
        <el-button v-else @click="MouldUninstall">卸载</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'modular',
  components: {},
  data() {
    return {
      MouldList: [],
      drawer: false,
      itemdata: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    opendra(item) {
      this.drawer = true;
      this.itemdata = item;
    },
    getdata() {
      this.$axios
        .post('/spread/noMouldList')
        .then(res => {
          if (res.data.code == 1) {
            this.MouldList = res.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //安装
    appMouldInstall() {
      this.$axios
        .post('/spread/appMouldInstall', {
          gl_id: this.itemdata.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.getdata();
            this.drawer = false;
            this.$message({
              message: res.data.msg,
              type: 'info',
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //卸载
    MouldUninstall() {
      this.$axios
        .post('/spread/appMouldUninstall', {
          az_id: this.itemdata.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.getdata();
            this.drawer = false;
            this.$message({
              message: res.data.msg,
              type: 'info',
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getdata();
  },
  mounted() {},
};
</script>
<style lang="less">
#modular {
    padding: 20px;
  width: 90%;
  margin: auto;
  .modular_content {
    display: flex;
    flex-wrap: wrap;
    .content_item {
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      margin: 20px;
      width: 250px;
      height: 250px;

      img {
        width: 100%;
        height: 100%;
      }
      .content_item_bto {
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        padding: 10px;
        position: absolute;
        bottom: 0;
        .bot_name {
          display: flex;
          justify-content: space-between;
          .bot_name_right {
            font-size: 14px;
            color: #585858;
          }
        }
      }
    }
  }
}
</style>
