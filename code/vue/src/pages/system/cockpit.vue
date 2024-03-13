/*
 * @Author: NorthWind 
 * @Date: 2021-04-01 10:16:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-07-01 08:43:52
 */

<template>
  <div id="cockpit" class="main">
    <el-container>
      <el-header>
        <!-- <div>时间：2021-04-01 10:10</div>
                <div>{{ cname }}</div>
                <div>天气</div> -->
        <el-row :gutter="20">
          <el-col :span="6">
            <dv-decoration-7 style="width: 150px; height: 30px">
              <div
                @click="backClick"
                style="cursor: pointer; padding: 0px 10px"
              >
                返回
              </div>
            </dv-decoration-7>
          </el-col>
          <el-col :span="12">
            大数据驾驶舱
            <!-- <dv-decoration-5
              style="width: 100%; height: 50px; margin-top: -40px"
              :color="['#00D8FF', '#1E51E7']"
              :dur="10"
            /> -->
          </el-col>
          <el-col :span="6">
            <div style="height: 100%">
              {{ currentDate }}
            </div>
            <!-- <el-tooltip content="返回首页" placement="bottom">
                            <i class="el-icon-s-home" @click="backClick"></i>
                        </el-tooltip> -->
            <!-- 项目总数：{{ totalNum }} -->
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <div style="margin-bottom: 15px">
              <dv-border-box-7 :color="['#286A8F', '#58E7FF']">
                <div class="crow">
                  <div style="width: 100%">
                    <div class="crimg">
                      <div class="title">收/支合同比</div>
                    </div>
                    <div class="topLeft">
                      <div>
                        <el-progress
                          type="circle"
                          :percentage="monthMap.srht_bl"
                          :stroke-width="16"
                          :color="[{ color: '#00CAFF' }]"
                        ></el-progress>
                      </div>
                      <div>
                        <div style="margin-bottom: 10px">
                          收入合同额（万元）：
                          <CountUp
                            :value="monthMap.srht / 10000"
                            :decimalPlaces="4"
                          />
                        </div>
                        <div>
                          支出合同额（万元）：
                          <CountUp
                            :value="monthMap.zcht / 10000"
                            :decimalPlaces="4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-7>
            </div>
            <div style="margin-bottom: 15px">
              <dv-border-box-7 :color="['#286A8F', '#58E7FF']">
                <div class="crow">
                  <div style="width: 100%">
                    <div class="crimg" style="margin-bottom: 0">
                      <div class="title">最近中标项目</div>
                    </div>
                    <div id="bottomLeft">
                      <div class="bllist">
                        <div v-for="(item, index) in cpList" :key="index">
                          <div>{{ item.name }}</div>
                          <div>
                            {{ item.changed }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-7>
            </div>
          </el-col>
          <el-col :span="12">
            <dv-border-box-7 :color="['#286A8F', '#58E7FF']">
              <div class="cmrow">
                <div class="mapProvince">
                  <el-row :gutter="20" class="appIPmcPie">
                    <el-col :span="6">
                      <!-- <dv-border-box-8 :color="['#286A8F', '#58E7FF']" :dur="1"> -->
                      <div style="border: 1px solid #58e7ff">
                        <div class="grid-content">
                          <div>
                            <div class="gct1">
                              项目总数(个数)：<CountUp
                                :value="tjData.zong_count"
                              />
                            </div>
                            <div>
                              <img src="../../assets/cockpit/co1.png" alt="" />
                            </div>
                          </div>
                          <div style="margin-bottom: 0">
                            造价总额(万元)：
                            <span class="gct1">
                              <CountUp
                                :value="tjData.zong_money"
                                :decimalPlaces="4"
                              /> </span
                            >万元
                          </div>
                        </div>
                      </div>
                      <!-- </dv-border-box-8> -->
                    </el-col>
                    <el-col :span="6">
                      <!-- <dv-border-box-8 :color="['#286A8F', '#58E7FF']" :dur="1"> -->
                      <div style="border: 1px solid #58e7ff">
                        <div class="grid-content">
                          <div>
                            <div class="gct2">
                              在建项目(个数)：<CountUp
                                :value="tjData.zj_count"
                              />
                            </div>
                            <div>
                              <img src="../../assets/cockpit/co2.png" alt="" />
                            </div>
                          </div>
                          <div style="margin-bottom: 0">
                            造价总额(万元)：
                            <span class="gct2">
                              <CountUp
                                :value="tjData.zj_money"
                                :decimalPlaces="4"
                              /> </span
                            >万元
                          </div>
                        </div>
                      </div>
                      <!-- </dv-border-box-8> -->
                    </el-col>
                    <el-col :span="6">
                      <!-- <dv-border-box-8 :color="['#286A8F', '#58E7FF']" :dur="1"> -->
                      <div style="border: 1px solid #58e7ff">
                        <div class="grid-content">
                          <div>
                            <div class="gct3">
                              本年新增(个数)：<CountUp
                                :value="tjData.xz_count"
                              />
                            </div>
                            <div>
                              <img src="../../assets/cockpit/co3.png" alt="" />
                            </div>
                          </div>
                          <div style="margin-bottom: 0">
                            造价总额(万元)：
                            <span class="gct3">
                              <CountUp
                                :value="tjData.xz_money"
                                :decimalPlaces="4"
                              /> </span
                            >万元
                          </div>
                        </div>
                      </div>
                      <!-- </dv-border-box-8> -->
                    </el-col>
                    <el-col :span="6">
                      <!-- <dv-border-box-8 :color="['#286A8F', '#58E7FF']" :dur="1"> -->
                      <div style="border: 1px solid #58e7ff">
                        <div class="grid-content">
                          <div>
                            <div class="gct4">
                              本年竣工(个数)：<CountUp
                                :value="tjData.jg_count"
                              />
                            </div>
                            <div>
                              <img src="../../assets/cockpit/co4.png" alt="" />
                            </div>
                          </div>
                          <div style="margin-bottom: 0">
                            造价总额(万元)：
                            <span class="gct4">
                              <CountUp
                                :value="tjData.jg_money"
                                :decimalPlaces="4"
                              /> </span
                            >万元
                          </div>
                        </div>
                      </div>
                      <!-- </dv-border-box-8> -->
                    </el-col>
                  </el-row>
                </div>
                <div class="map" id="mapChart"></div>
              </div>
            </dv-border-box-7>
          </el-col>
          <el-col :span="6">
            <div style="margin-bottom: 15px">
              <dv-border-box-7 :color="['#286A8F', '#58E7FF']">
                <div class="crow">
                  <div style="width: 100%">
                    <div class="crimg">
                      <div class="title">结算分析</div>
                    </div>
                    <div class="topLeft">
                      <div>
                        <el-progress
                          type="circle"
                          :percentage="monthMap.srjs_bl"
                          color="#E8A54C"
                          :stroke-width="16"
                          :color="[{ color: '#00CAFF' }]"
                        ></el-progress>
                      </div>
                      <div>
                        <div style="margin-bottom: 10px">
                          收入结算（万元）：
                          <CountUp
                            :value="monthMap.srjs / 10000"
                            :decimalPlaces="4"
                          />
                        </div>
                        <div>
                          支出结算（万元）：
                          <CountUp
                            :value="monthMap.zcjs / 10000"
                            :decimalPlaces="4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-7>
            </div>
            <dv-border-box-7 :color="['#286A8F', '#58E7FF']">
              <div class="crow">
                <div style="width: 100%">
                  <div class="crimg">
                    <div class="title">项目分类（个数/金额）</div>
                  </div>
                  <div
                    id="bottomRight"
                    style="height: 288px; margin-top: -23px"
                  ></div>
                </div>
              </div>
            </dv-border-box-7>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import cityMap from '../../../public/static/js/china-main-city-map.js';
import geoCityMap from '../../../public/static/js/geoMap.js';
import echarts from 'echarts';
// import '../../../node_modules/echarts/map/js/china.js';
import CountUp from '@/components/CountUp';

export default {
  name: 'cockpit',
  components: { CountUp },
  data() {
    return {
      cname: '',
      provinceList: [],
      cpList: [],
      myChart: null,
      topLeft: null,
      topRight: null,
      bottomRight: null,
      currentDate: '',
      totalNum: '',
      chinaId: 100000,
      timeFn: null,
      mapStack: [],
      parentId: null,
      parentName: null,
      markPointData: [],
      areaId: '',
      provinceName: '',
      code: '100000',
      codeName: '',
      chinaName: 'china',
      allMap: [],
      xmtotalnum: '',
      monthMap: {
        srht: 0,
        srht_bl: 0,
        srjs: 0,
        srjs_bl: 0,
        zcht: 0,
        zcjs: 0,
      },
      tjData: {
        jg_count: 0,
        jg_money: 0,
        xz_count: 0,
        xz_money: 0,
        zj_count: 0,
        zj_money: 0,
        zong_count: 0,
        zong_money: 0,
      },
    };
  },
  methods: {
    getList() {
      this.$axios
        .post('/project/projectInfoRegisterList', {
          page: 1,
          number: 1,
          start_plan_start_riqi: '',
          end_plan_start_riqi: '',
          stand_termer: '',
          start_plan_end_riqi: '',
          end_plan_end_riqi: '',
          name: '',
          stalker: '',
          construction_unit: '',
          type: '',
          project_status: '',
          shenpi: '',
          p_number: '',
        })
        .then(res => {
          if (res.data.code == 1) {
            this.tjData = res.data.tj;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    backClick() {
      this.$router.go(-1);
    },
    mapChart(divid) {
      const _this = this;
      _this.$axios
        .post('/projectfour/driveTwo', {
          code: _this.code,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.allMap = res.data.map_arr;
            if (_this.allMap.length > 0) {
              if (_this.allMap.length > 8) {
                _this.provinceList = _this.allMap.slice(0, 8);
              } else {
                _this.provinceList = _this.allMap;
              }
            } else {
              _this.provinceList = [];
            }

            _this.$axios
              .get('/app/static/json/map/' + _this.chinaId + '.json')
              .then(response => {
                const mapJson = response.data;
                _this.chinaJson = mapJson;
                _this.myChart = echarts.init(document.getElementById(divid));
                _this.registerAndsetOption(
                  _this.myChart,
                  _this.chinaId,
                  _this.chinaName,
                  mapJson,
                  false,
                );
                _this.parentId = _this.chinaId;
                _this.parentName = 'china';
                _this.myChart.on('dblclick', function (params) {
                  clearTimeout(_this.timeFn);
                  _this.codeName = params.name + 'BB';
                  if (cityMap[params.name]) {
                    _this.code = cityMap[params.name];
                  } else {
                    _this.codeName = params.name + 'AB';
                  }

                  _this.back();
                });
                _this.myChart.on('click', function (params) {
                  clearTimeout(_this.timeFn);
                  console.log('点击');
                  //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
                  this._this.timeFn = setTimeout(function () {
                    let cityId = cityMap[params.name];
                    _this.codeName = params.name;
                    if (cityMap[params.name]) {
                      _this.code = cityMap[params.name];
                    } else {
                      _this.codeName = _this.codeName + 'AA';
                    }
                    _this.getMap();
                    _this.leftChart();
                    if (cityId) {
                      // 代表有下级地图;
                      _this.$axios
                        .post('/projectfour/driveTwo', {
                          code: cityId,
                        })
                        .then(res => {
                          if (res.data.code == 1) {
                            _this.allMap = res.data.map_arr;
                            if (_this.allMap.length > 0) {
                              if (_this.allMap.length > 8) {
                                _this.provinceList = _this.allMap.slice(0, 8);
                              } else {
                                _this.provinceList = _this.allMap;
                              }
                            } else {
                              _this.provinceList = [];
                            }
                            _this.$axios
                              .get('/app/static/json/map/' + cityId + '.json')
                              .then(response => {
                                const mapJson = response.data;
                                _this.registerAndsetOption(
                                  _this.myChart,
                                  cityId,
                                  params.name,
                                  mapJson,
                                  true,
                                );
                              });
                          } else {
                            _this.$message({
                              message: res.data.msg,
                              type: 'warning',
                              duration: 1500,
                            });
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    } else {
                      //没有下级地图，回到一级中国地图，并将mapStack清空
                      // registerAndsetOption(
                      //     myChart,
                      //     chinaId,
                      //     chinaName,
                      //     chinaJson,
                      //     false
                      // );
                      // mapStack = [];
                      // parentId = chinaId;
                      // parentName = chinaName;
                    }
                  }, 250);
                });
              });
          } else {
            _this.$message({
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
    mainChart() {
      const _this = this;
      _this.$axios
        .post('/projectfour/driveTwo', {
          code: _this.code,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.allMap = res.data.map_arr;
            if (_this.allMap.length > 0) {
              if (_this.allMap.length > 8) {
                _this.provinceList = _this.allMap.slice(0, 8);
              } else {
                _this.provinceList = _this.allMap;
              }
            } else {
              _this.provinceList = [];
            }
          } else {
            _this.$message({
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
    leftChart() {
      const _this = this;
      _this.$axios
        .post('/projectfour/driveOne', {
          code: _this.code,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.monthMap = res.data.tj;
            this.cpList = res.data.project_zuijin;
            let sbl = res.data.tj.srht_bl;
            let sbll = sbl.toString();
            let sxl = res.data.tj.srjs_bl;
            let sxll = sxl.toString();
            if (sbll.indexOf('.') != -1) {
              this.monthMap.srht_bl = Number(
                sbll.substring(0, sbll.indexOf('.') + 2),
              );
            } else {
              this.monthMap.srht_bl = sbl;
            }
            if (sxll.indexOf('.') != -1) {
              this.monthMap.srjs_bl = Number(
                sxll.substring(0, sxll.indexOf('.') + 2),
              );
            } else {
              this.monthMap.srjs_bl = sxl;
            }
          } else {
            _this.$message({
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
    getMap() {
      const _this = this;
      _this.$axios
        .post('/projectfour/driveThree', {
          code: _this.code,
        })
        .then(res => {
          if (res.data.code == 1) {
            let pieArr = [];
            res.data.type_arr.forEach(item => {
              let obj = {};
              for (let i = 0; i <= res.data.type_arr.length; i++) {
                obj.value = item.number;
                obj.name = item.name;
                obj.money = item.money;
              }
              pieArr.push(obj);
            });
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
                      '总造价：' +
                      params.data.money
                    );
                  },
                },
                toolbox: {
                  show: true,
                  //   feature: {
                  //     mark: { show: true },
                  //     dataView: { show: true, readOnly: false },
                  //     restore: { show: true },
                  //     saveAsImage: { show: true },
                  //   },
                },
                legend: {
                  top: '15%',
                  right: '2%',
                  orient: 'vertical',
                  textStyle: {
                    color: '#ffffff', //字体颜色
                  },
                },
                series: [
                  {
                    name: '项目分类',
                    type: 'pie',
                    radius: [20, 80],
                    roseType: 'area',
                    // avoidLabelOverlap: true,
                    label: {
                      show: false,
                    },
                    labelLine: {
                      //是否展示线
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                        // fontSize: '18',
                        // fontWeight: 'bold'
                      },
                    },
                    // radius: '50%',
                    itemStyle: {
                      //   borderRadius: 8,
                      normal: {
                        color: function (params) {
                          //自定义颜色
                          var colorList = [
                            '#AC3842',
                            '#AF821E',
                            '#92B23C',
                            '#067690',
                            '#396EBC',
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
                    data: pieArr,
                    // emphasis: {
                    //     itemStyle: {
                    //         shadowBlur: 10,
                    //         shadowOffsetX: 0,
                    //         shadowColor:
                    //             'rgba(0, 0, 0, 0.5)'
                    //     }
                    // }
                  },
                ],
              },
              dataAxis = res.data.construction_arr.map(item => {
                if (!item.name) return '';
                return item.name;
              }),
              cdata = res.data.construction_arr.map(item => {
                if (!item.value) return '';
                return item.value;
              });
            // troption = {
            //     // title: { text: '人员概览', left: 'center' },
            //     tooltip: {
            //         trigger: 'axis',
            //         axisPointer: {
            //             // 坐标轴指示器，坐标轴触发有效
            //             type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            //         }
            //     },
            //     xAxis: {
            //         data: dataAxis,
            //         axisLabel: {
            //             inside: false,
            //             textStyle: {
            //                 color: '#999',
            //                 fontSize: 14
            //             },
            //             interval: 0
            //         },
            //         axisTick: {
            //             show: false
            //         },
            //         axisLine: {
            //             show: false
            //         },
            //         z: 10
            //     },
            //     yAxis: {
            //         axisLine: {
            //             show: false
            //         },
            //         axisTick: {
            //             show: false
            //         },
            //         axisLabel: {
            //             textStyle: {
            //                 color: '#999'
            //             }
            //         }
            //     },
            //     dataZoom: [
            //         {
            //             type: 'inside'
            //         }
            //     ],
            //     series: [
            //         {
            //             type: 'bar',
            //             itemStyle: {
            //                 textStyle: {
            //                     fontSize: 12
            //                 },
            //                 normal: {
            //                     color: new echarts.graphic.LinearGradient(
            //                         0,
            //                         0,
            //                         0,
            //                         1,
            //                         [
            //                             {
            //                                 offset: 0,
            //                                 color: '#83bff6'
            //                             },
            //                             {
            //                                 offset: 0.5,
            //                                 color: '#188df0'
            //                             },
            //                             {
            //                                 offset: 1,
            //                                 color: '#188df0'
            //                             }
            //                         ]
            //                     )
            //                 },
            //                 emphasis: {
            //                     color: new echarts.graphic.LinearGradient(
            //                         0,
            //                         0,
            //                         0,
            //                         1,
            //                         [
            //                             {
            //                                 offset: 0,
            //                                 color: '#2378f7'
            //                             },
            //                             {
            //                                 offset: 0.7,
            //                                 color: '#2378f7'
            //                             },
            //                             {
            //                                 offset: 1,
            //                                 color: '#83bff6'
            //                             }
            //                         ]
            //                     )
            //                 }
            //             },
            //             barWidth: 40,
            //             data: cdata
            //         }
            //     ]
            // };

            // this.topRight.setOption(troption);
            this.bottomRight.setOption(bption);
          } else {
            _this.$message({
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
    strTime(str) {
      if (str <= 9) {
        str = '0' + str;
      }
      return str;
    },
    getTime() {
      let date = new Date(),
        H = date.getHours(), //时
        M = date.getMinutes(), //分
        day = date.getDay();
      if (day == '1') {
        day = '星期一';
      } else if (day == '2') {
        day = '星期二';
      } else if (day == '3') {
        day = '星期三';
      } else if (day == '4') {
        day = '星期四';
      } else if (day == '5') {
        day = '星期五';
      } else if (day == '6') {
        day = '星期六';
      } else if (day == '0') {
        day = '星期日';
      }
      //console.log(H,M,S);
      this.currentDate = this.strTime(H) + ' : ' + this.strTime(M) + '  ' + day;
    },
    /**
     * 返回上一级地图
     */
    back() {
      if (this.mapStack.length != 0) {
        //如果有上级目录则执行
        var map = this.mapStack.pop();
        this.code = map.mapId;
        this.getMap();
        this.leftChart();
        // this.mainChart();
        this.$axios
          .post('/projectfour/driveTwo', { code: this.code })
          .then(res => {
            if (res.data.code == 1) {
              this.allMap = res.data.map_arr;
              if (this.allMap.length > 0) {
                if (this.allMap.length > 8) {
                  this.provinceList = this.allMap.slice(0, 8);
                } else {
                  this.provinceList = this.allMap;
                }
              } else {
                this.provinceList = [];
              }
              this.$axios
                .get('/app/static/json/map/' + map.mapId + '.json')
                .then(response => {
                  const mapJson = response.data;
                  this.registerAndsetOption(
                    this.myChart,
                    map.mapId,
                    map.mapName,
                    mapJson,
                    false,
                  );
                  //返回上一级后，父级的ID、Name随之改变
                  this.parentId = map.mapId;
                  this.parentName = map.mapName;
                });
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
      }
    },
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].name) {
          let geoCoord = geoCityMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              coord: geoCoord,
              value: data[i].value,
            });
          }
        }
      }
      return res;
    },
    registerAndsetOption(myChart, id, name, mapJson, flag) {
      console.log(mapJson.features, '4546');
      //   mapJson.features.forEach(e => {
      //     console.log(e.properties.name);
      //     e.properties.name = '河南省'+e.properties.name;
      //   });
      let zoomID = 1.1;
      // if (id == '310000') {
      //     zoomID = 1.1;
      // } else {
      //     zoomID = 1;
      // }
      echarts.registerMap(name, mapJson);
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let value = params.value ? params.value : 0;
            return params.name + ' : ' + value;
          },
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         dataView: { readOnly: false },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        // visualMap: {
        //     left: 'right',
        //     min: 500000,
        //     max: 38000000,
        //     inRange: {
        //         color: [
        //             '#313695',
        //             '#4575b4',
        //             '#74add1',
        //             '#abd9e9',
        //             '#e0f3f8',
        //             '#ffffbf',
        //             '#fee090',
        //             '#fdae61',
        //             '#f46d43',
        //             '#d73027',
        //             '#a50026'
        //         ]
        //     },
        //     text: ['High', 'Low'], // 文本，默认为数值文本
        //     calculable: true
        // },
        // regions: [
        //     {
        //         name: '南海诸岛',
        //         value: 0,
        //         itemStyle: {
        //             normal: {
        //                 opacity: 0,
        //                 label: {
        //                     show: false
        //                 }
        //             }
        //         }
        //     }
        // ],
        //外边框
        // geo: [
        //   {
        //     zlevel: 0, //geo显示级别，默认是0
        //     map: 'china', //地图名
        //     roam: false, //设置为false,不启动roam就无所谓缩放拖曳同步了
        //     zoom: 1.1, //缩放级别
        //     itemStyle: {
        //       //顶层地图的样式，如地图区域颜色，边框颜色，边框大小等
        //       normal: {
        //         areaColor: '#08407D',
        //         borderColor: '#00FFFF',
        //         borderWidth: 0.5,
        //       },
        //     },
        //   },
        //   {
        //     map: 'china',
        //     roam: false, //roam与上一个geo配置相同
        //     zoom: 1.1,
        //     itemStyle: {
        //       //底层地图样式
        //       normal: {
        //         //此处border设置你想要显示的地图外边框样式，可设置border颜色，阴影等
        //         borderColor: '#66C7F2',
        //         borderWidth: 10,
        //       },
        //     },
        //   },
        // ],
        series: [
          {
            type: 'map',
            map: name,
            // label: {
            //     show: true,
            //     color: '#000'
            // },
            zoom: zoomID,
            label: {
              normal: {
                show: true,
                // textStyle: {
                //   color: '#fff',
                //   fontSize: 18,
                //   fontFamily: 'Arial',
                // },
                color: 'white',
                shadowColor: '',
              },

              emphasis: {
                show: true,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: '#1568D0',
                borderColor: '#056992',
                borderWidth: 0.5,
                borderType: 'solid',
                shadowColor: '#58E7FF',
                //shadowBlur: 10,
                // shadowOffsetY: 8,
                shadowOffsetY: 8,
                // shadowOffsetX: 10
                opacity: 1,
              },
              emphasis: {
                areaColor: '#58E7FF',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            // itemStyle: {
            //     normal: {
            //         areaColor: '#E7EEEE',
            //         borderColor: '#09bdc6',
            //         borderWidth: 1
            //     },
            //     emphasis: {
            //         areaColor: '#409eef'
            //     }
            // },
            markPoint: {
              // //图表标注。
              symbol: 'pin',
              symbolSize: 28, //图形大小
              itemStyle: {
                // color: '#E86F48',
                color: '#F4E925',
              },
              // showEffectOn: 'render',
              // zlevel: 2,
              // rippleEffect: {
              //     period: 2.5, //波纹秒数
              //     brushType: 'fill', //stroke(涟漪)和fill(扩散)，两种效果
              //     scale: 20 //波纹范围
              // },
              // hoverAnimation: true,
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              // itemStyle: {
              //     normal: {
              //         color: 'red'
              //     }
              // },
              // symbol: 'circle',
              // symbolSize: function (val) {
              //     return 6;
              // },
              // label: {
              //     color: '#409eff'
              // },
              // itemStyle: {
              //     normal: {
              //         borderColor: '#87cefa',
              //         borderWidth: 1, // 标注边线线宽，单位px，默认为1
              //         label: {
              //             show: false
              //         }
              //     },
              //     color: {
              //         type: 'radial',
              //         x: 0.5,
              //         y: 0.5,
              //         r: 0.5,
              //         colorStops: [
              //             {
              //                 offset: 0,
              //                 color: 'red' // 0% 处的颜色
              //             },
              //             {
              //                 offset: 1,
              //                 color: 'blue' // 100% 处的颜色
              //             }
              //         ],
              //         global: false // 缺省为 false
              //     },
              //     emphasis: {
              //         borderColor: '#1e90ff',
              //         borderWidth: 5,
              //         label: {
              //             show: false
              //         }
              //     }
              // },
              // effect: {
              //     show: true,
              //     shadowBlur: 0
              // },
              // geoCoord: {
              //     郑州: [113.65, 34.76],
              //     石家庄: [114.48, 38.03],
              //     合肥: [117.27, 31.86],
              //     长沙: [113, 28.21],
              //     重庆: [106.54, 29.59],
              //     北京: [116.46, 39.92],
              //     太原: [112.53, 37.87]
              // },
              data: this.convertData(this.allMap),
            },
            data: this.allMap,
          },
        ],
      });
      if (flag) {
        //往mapStack里添加parentId，parentName,返回上一级使用
        this.mapStack.push({
          mapId: this.parentId,
          mapName: this.parentName,
        });
        this.parentId = id;
        this.parentName = name;
      }
    },
    initMapData(mapJson) {
      let mapData = [];
      for (let i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name,
          id: mapJson.features[i].id,
        });
      }
      return mapData;
    },
  },
  mounted() {
    this.getTime();
    this.getList();
    setInterval(() => {
      this.getTime();
    }, 1000);
    this.myChart = echarts.init(document.getElementById('mapChart'));
    // this.topLeft = echarts.init(document.getElementById('topLeft'));
    // this.topRight = echarts.init(document.getElementById('topRight'));
    this.bottomRight = echarts.init(document.getElementById('bottomRight'));
    // this.mapChart();
    this.mapChart('mapChart');
    this.getMap();
    this.leftChart();
    window.addEventListener('resize', () => {
      // 自动渲染echarts
      this.myChart.resize();
      // this.topLeft.resize();
      // this.topRight.resize();
      this.bottomRight.resize();
    });
  },
  created() {
    this.cname = this.$store.state.cname;
  },
};
</script>
<style lang="less" scoped>
// .el-progress-circle__track {
//   stroke: #d72e36 !important;
// }
.appIPmcPie {
  margin-bottom: 20px;
  padding-top: 28px;
  margin-left: 0 !important;
  margin-right: 0 !important;
  .el-col {
    border-radius: 10px;
    .grid-content {
      width: 100%;
      border-radius: 10px;
      padding: 20px 0;
      text-align: center;
      // background-color: #0f4e90;
      font-size: 12px;
      > div {
        display: flex;
        justify-content: center;
        // width: 40px;
        // height: 40px;
        border-radius: 50%;
        text-align: center;
        // background-color: #91d5ff;
        margin: 0 auto;
        margin-bottom: 10px;
        color: #fff;
        line-height: 40px;
        flex-flow: wrap;
        img {
          margin-left: 25px;
          width: 29px;
          height: 29px;
          vertical-align: middle;
          margin-top: -4px;
        }
        .gct {
          text-align: center;
        }
      }
      > p {
        margin-bottom: 6px;
        span {
          margin: 0 4px;
          font-size: 14px;
        }
      }
      .gct1 {
        color: #ffffff;
      }
      .gct2 {
        color: #ffffff;
      }
      .gct3 {
        color: #ffffff;
      }
      .gct4 {
        color: #ffffff;
      }
      .gc1 {
        background-color: #aede82;
      }
      .gc2 {
        background-color: #6ae0d0;
      }
      .gc3 {
        background-color: #78c5f5;
      }
      .gc4 {
        background-color: #ffa39e;
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  #mapChart {
    top: -80px;
  }
}

.main {
  //   background: url('~@/assets/cockpit/bg.png') no-repeat center center;
  background: url('~@/assets/cockpit/bg1.png') no-repeat center center;
  background-size: cover;
}

.crow {
  display: flex;
  justify-content: center;
  .crimg {
    margin-bottom: 34px;
    display: flex;
    justify-content: center;
    .title {
      background: url('~@/assets/cockpit/title-bg.png') no-repeat center center;
      background-size: cover;
      width: 296px;
      height: 43px;
      font-size: 16px;
      font-weight: bold;
      color: #58e7ff;
      text-align: center;
      line-height: 43px;
    }
  }
  .topLeft {
    display: flex;
    justify-content: center;
    flex-direction: column;
    div:nth-child(1) {
      margin: 0 auto;
      margin-bottom: 30px;
    }
    div:nth-child(2) {
      text-align: center;
      font-size: 14px;
      color: #a9ddee;
    }
  }
}

.el-header {
  text-align: center;
  font-size: 36px;
  //   background: url(~@/assets/cockpit/header-bg.png) no-repeat 0 bottom;
  background: url(~@/assets/cockpit/header-bg1.png) no-repeat;
  background-size: 100%;
}
.el-col:nth-child(2) {
  background: linear-gradient(to top bottom, #cddc39, #8bc34a, #ffeb3b);
}
</style>