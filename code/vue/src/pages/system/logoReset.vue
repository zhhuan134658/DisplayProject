<template>
  <div id="logoReset">
    <div class="main">
      <div class="setContent">
        <div class="logoTitle">LOGO设置</div>
        <div class="logoUpload">
          <div class="loadText">LOGO上传</div>
          <div class="loadUp">
            <imgUploadcopy
              :upImgList="upImgList"
              :licenceImg="licenceImg"
              :isShow="isShow"
              v-on:listenToChildEvent="imgshow"
            />
            <div class="asd">上传图片尺寸建议为220*70</div>
          </div>
          <el-button
            style="margin-top: 34px; margin-left: 80px"
            type="primary"
            @click="saveImg"
            >保存</el-button
          >
        </div>
        <div class="logoView">
          <div class="loadText">LOGO预览</div>
          <div
            class="logoView_item"
            :key="index"
            v-for="(item, index) in imgurl1"
          >
            <div class="item_img">
              <img :src="item.url" alt="" />
            </div>
            <div class="item_cao">
              <span v-if="item.status == 2" class="check" @click="checked(item)"
                >切换</span
              >

              <span v-else class="checking">使用中...</span>
              <span class="check" @click="deleImg(item)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUploadcopy from '../../components/imgUploadcopy.vue';
export default {
  components: { imgUploadcopy },
  name: 'logoReset',
  data() {
    return {
      detal: '',
      upImgList: [],
      licenceImg: [],
      imgurl: '',
      imgurl1: '',
    };
  },
  methods: {
    imgshow(data) {
      this.imgurl = data[0];
      console.log(data);
    },
    saveapi(status) {
      this.$axios
        .post('/newtao/logoUpload', {
          status: status,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.imgurl = '';
            this.getual();
            this.$router.go(0);
            this.$message({
              message: '设置成功',
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteApi() {
      this.$axios
        .post('/newtao/logoDel')
        .then(res => {
          if (res.data.code == 1) {
            this.getual();
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleImg(item) {
      let urllist = [
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/H4wMiseYbS1617767784128.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/dD558TrYXr1617767699024.jpg',
        'https://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/MdZMDmifpP1622540909687.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//kC784rEFzZ1640330156876.jpg',
      ];
      if (urllist.includes(item.url)) {
        this.$message({
          message: '默认LOGO不允许删除',
          type: 'success',
          duration: 1500,
        });
      } else {
        this.deleteApi();
      }
    },
    checked(item) {
      let urllist = [
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/H4wMiseYbS1617767784128.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/dD558TrYXr1617767699024.jpg',
        'https://compressdk.oss-cn-shanghai.aliyuncs.com/user-dir/MdZMDmifpP1622540909687.png',
        'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//kC784rEFzZ1640330156876.jpg',
      ];
      if (urllist.includes(item.url)) {
        this.saveapi(2);
      } else {
        this.saveapi(1);
      }
    },
    saveImg() {
      if (this.imgurl) {
        this.$axios
          .post('/newtao/logoUpload', {
            url: this.imgurl,
          })
          .then(res => {
            if (res.data.code == 1) {
              this.imgurl = '';
              this.getual();
              this.$router.go(0);
              this.$message({
                message: '设置成功',
                type: 'success',
                duration: 1500,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$message({
          message: '请选择图片',
          type: 'success',
          duration: 1500,
        });
      }
    },
    getual() {
      this.$axios
        .post('/spread/zkLogo')
        .then(res => {
          if (res.data.code == 1) {
            this.imgurl1 = res.data.new_data;
            // if (
            //     this.imgurl1 ==
            //     'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/H4wMiseYbS1617767784128.png'
            // ) {
            //     this.detal = false;
            // } else {
            //     this.detal = true;
            // }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getual();
  },
};
</script>
<style lang="less" scoped>
#logoReset {
  .main {
    .setContent {
      background-color: #fff;
      border-radius: 5px;
      .logoTitle {
        height: 75px;
        line-height: 75px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #3296fa;
        padding-left: 36px;
      }
      .logoUpload {
        padding-left: 36px;
        border-top: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        height: 248px;
        .loadText {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 55px;
        }
        .loadUp {
          display: flex;
          align-items: center;
          padding-left: 80px;
          .asd {
            margin-left: 24px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
          }
        }
      }
      .logoView {
        padding-left: 36px;
        padding-right: 36px;
        height: 542px;
        .loadText {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 55px;
        }
        .logoView_item {
          margin-bottom: 30px;
          margin-left: 80px;
          height: 118px;
          background: #ffffff;
          border-radius: 5px;
          border: 1px solid #eaeaea;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item_img {
            margin-left: 35px;
            background-color: #3296fa;
            width: 220px;
            height: 70px;
            img {
              width: 220px;
              height: 70px;
            }
          }
          .item_cao {
            .check {
              vertical-align: middle;
              display: inline-block;
              width: 58px;
              height: 27px;
              background: #ffffff;
              border: 1px solid #3296fa;
              border-radius: 14px;
              text-align: center;
              line-height: 27px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #3296fa;
              margin-right: 10px;
            }
            .checking {
              line-height: 27px;
              margin-right: 10px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #fa9a32;
            }
            img {
              margin-right: 20px;
              vertical-align: middle;
              width: 25px;
              height: 25px;
            }
          }
        }
      }
    }
  }
}
.el-popover {
  padding: 0 !important;
}
.el-popover--plain {
  padding: 0 !important;
  .btn {
    text-align: center;

    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;

    line-height: 30px;
  }
}
</style>
