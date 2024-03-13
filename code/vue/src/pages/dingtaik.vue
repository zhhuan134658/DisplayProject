<template>
  <!--  -->
  <div id="dingTaik">
    <div>
      <!-- <img
        @click="newtuneUp"
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//2kiAN57fsh1635730232523.png"
        alt=""
      /> -->
      <img
        @click="newtuneUp"
        src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//PTHXPwtpjM1652059846986.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi';
import { openTryoutSku } from 'dingtalk-design-libs';
export default {
  name: 'dingTaik',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    newtuneUp() {
      this.tuneUp();
    },
    tuneUp() {
      console.log('12', window.location);

      //
      const that = this;
      // const corpId = that.$route.query.corpId;
      // const corpId = 'dingea47c602975497f935c2f4657eb6378f';
      // const corpId = 'dingea47c602975497f935c2f4657eb6378f';
      const appId = '58708';
      const token = that.$route.query.purchaseToken;
      dd.ready(() => {
        openTryoutSku({
          corpId: that.$route.query.corpId,
          appId: appId,
          token: token,
          // miniAppId
        })
          .then(res => {
            const {
              // action的值为：
              // 'ok'，用户执行了开通动作，或将自己加入了已开通的应用的可见范围内
              // 'cancel', 用户点击了取消按钮
              // 'unknown'，用户点击空白区域关闭了弹窗，此时可以跟cancel采取同样的处理逻辑
              action,
              // 开通了应用的组织的corpId。因为个人开通可能会用钉钉的隐藏组织，所以开通应用的组织的corpId以这里返回的为准。
              corpId,
            } = res;
            console.log('123465', res);
            // action不是ok的情况下，可以不采取任何动作
            // Toast(res);

            if (action === 'ok') {
              const newurl =
                'https://app58708.eapps.dingtalkcloud.com/app/dist/index.html?corpid=' +
                corpId;
              window.location.replace(newurl);
              // that.$router.replace(newurl);
              // openLink({ url: newurl }).then(() => close({}));
              // dd.biz.navigation.replace({
              //     url: newurl, // 新的页面链接
              //     onSuccess: function (result) {},
              //     onFail: function (err) {}
              // });
            }
          })
          .catch(err => {
            console.log('15', err);
          });
      });
    },
  },
  created() {
    setTimeout(this.tuneUp(), 500);
    console.log('1', window.location);
    console.log(this.$route.query);
  },

  mounted() {},
};
</script>
<style lang="less">
#dingTaik {
  // height: 100vh;
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
