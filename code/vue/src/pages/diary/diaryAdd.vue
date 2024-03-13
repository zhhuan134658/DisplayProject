<template>
    <div id="diaryAdd">
        <div class="main">
            <div class="content">
                <div class="border">
                    <div
                        class="content1"
                        style="display: flex; flex-wrap: wrap"
                    >
                        <div
                            class="dacontent"
                            v-for="(typeChild, lindex) in typeList"
                            :key="lindex"
                            @click="newAddTask(typeChild)"
                            style="padding: 20px 0px; margin: 10px 10px"
                        >
                            <div class="left">
                                <img class="img" :src="typeChild.icon" style="margin: 0px" />
                                <span>{{ typeChild.tmpname }}</span>
                            </div>
                            <div class="center">
                              <div class="h-line"></div>
                            </div>
                            <div class="bottom">
                                <div v-if="typeChild.date" class="bottom-item">
                                    <div>{{ typeChild.date }}</div>
                                    <div>：{{ typeChild.datetext }}</div>
                                </div>
                                <div v-if="typeChild.text1" class="bottom-item">
                                    <div>{{ typeChild.text1 }}</div>
                                    <div>：{{ typeChild.text2 }}</div>
                                </div>
                                <div v-if="typeChild.text3" class="bottom-item">
                                    <div>{{ typeChild.text3 }}</div>
                                    <div>：{{ typeChild.text4 }}</div>
                                </div>
                            </div>
                        </div>
                        <div style="border: none;padding: 20px 0px; margin: 11px;width: 377px;height: 75px;">
                          <div class="left"></div>
                          <div class="center"></div>
                          <div class="bottom"></div>
                        </div>
                        <div style="border: none;padding: 20px 0px; margin: 11px;width: 377px;height: 75px;">
                          <div class="left"></div>
                          <div class="center"></div>
                          <div class="bottom"></div>
                        </div>
                        <div style="border: none;padding: 20px 0px; margin: 11px;width: 377px;height: 75px;">
                          <div class="left"></div>
                          <div class="center"></div>
                          <div class="bottom"></div>
                        </div>
                        <div style="border: none;padding: 20px 0px; margin: 11px;width: 377px;height: 75px;">
                          <div class="left"></div>
                          <div class="center"></div>
                          <div class="bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'diaryAdd',
    data() {
        var validateNumber = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
            if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        return {
            typeList: []
        };
    },
    methods: {
        newAddTask(item) {
            const _this = this;
            _this.checkNmae = item.tmpname;

            _this.$axios
                .post('/journal/logapproval', {
                    tmpname: item.tmpname
                })
                .then((res) => {
                    let newUrl =
                        'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
                        _this.$store.state.cid +
                        '#/custom/?processCode=' +
                        res.data.process_code;
                    dd.ready(function () {
                        dd.biz.util.openLink({
                            url: newUrl, //要打开链接的地址
                            onSuccess: function (result) {
                                /**/
                            },
                            onFail: function (err) {}
                        });
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/journal/loglisttype')
                .then((res) => {
                    if (res.data.code == 1) {
                        _this.typeList = res.data.tmpname;
                    } else {
                        _this.$message({
                            type: 'warning',
                            message: res.data.msg,
                            duration: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.$utils.checkding();
    },
    created() {
        // this.getNextProject();
        this.getList();
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.contractDrawerForm.stoptime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.contractDrawerForm.starttime;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        }
    }
};
</script>

<style lang="less" scoped>
.main {
  background: #fff !important;
  min-height: 700px;
  border-radius: 5px;
  .content {
    .border {
      .content1 {
        // justify-content: space-evenly;
        padding: 20px 20px;
        .dacontent {
          width: 365px !important;
          .left {
            display: flex;
            flex-direction: column;
            width: 120px;
            align-items: center;
            margin-bottom: 0px !important;
          }
          .center {
            .h-line {
              height: 75px;
              width: 1px;
              background: #E8E8E8;
            }
          }
          .bottom {
            width: 245px;
            .bottom-item {
              margin-left: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
