<template> 
  <div id="qualityAnalysis">
    <div class="main"> 
      <div class="top">
          <componenTtiles :indexs='3' :pid="pid" :pname="pname"></componenTtiles>
        </div>
      </div>

      <div class="centerXm">
        <div class="oneLeft">
          <div
            v-for="(item, index) in oneList"
            class="oneLeftItem"
            :class="[index==0||index==4?'oneLeftItemS':'']"
            :key="index"
          >
            <div style="margin-left: 25px">
              <div style="width: 43px; height: 43px">
                <img
                  :src="require(`../../assets/twoImg/item3${index + 1}.png`)"
                  mode=""
                  style="width: 100%; height: 100%"
                />
              </div>
            </div>
            <div style="margin-left: 15px">
              <div>{{ item.title }}</div>
              <div style="font-weight: bold">{{ item.value || 0}}</div>
            </div>
          </div>
        </div>


  <div class="centerTwo">

          <div style="position: relative">
            <div class="line"></div>
            <div style="margin-left: 8px; font-weight: bold">横道图</div>
          </div>
    

 <div class="content">
        <div class="selector header">
          <div class="selectorGroups">
            <el-radio-group v-model="is_complete" @change="getGant">
              <el-radio-button label="1">周计划</el-radio-button>
              <el-radio-button label="2">月计划</el-radio-button>
              <el-radio-button label="3">年计划</el-radio-button>
              <el-radio-button label="4">总计划</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div
          style="display: flex;justify-content: space-between;align-items:center;margin-bottom:16px;"
        >
          <div class="progressConHeader" style="width: auto; margin: 0px">
            <div class="pchLeft">
              <div class="selectorGroups">
                <span
                  :style="{
                    display: 'block',
                  }"
                  class="legend progress"
                ></span>
                <span
                  :style="{
                    display: 'block',
                  }"
                  >进行中</span
                >
                <span
                  :style="{
                    display: 'block',
                  }"
                  class="legend delayed"
                ></span>
                <span
                  :style="{
                    display: 'block',
                  }"
                  >延期</span
                >
                <span
                  :style="{
                    display: 'block',
                  }"
                  class="legend completed"
                ></span>
                <span
                  :style="{
                    display: 'block',
                  }"
                  >已完成</span
                >
                <span
                  :style="{
                    display: 'block',
                  }"
                  class="legend delayCompleted"
                ></span>
                <span
                  :style="{
                    display: 'block',
                  }"
                  >延期完成</span
                >
              </div>
            </div>
            <!-- <el-button type="primary" size="medium">搜索</el-button> -->
          </div>

          <div class="gantBtn" style="margin: 0px">
            <el-radio-group v-model="gantRadio" @change="gantChange">
              <el-radio-button label="1">按日显示</el-radio-button>
              <el-radio-button label="2">按月显示</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div class="gtt">
        <div ref="ganttRef" class="left-container" style="height:442px;" />


        <div style="text-align:center;" v-if="tasks.data.length==0" class="gttItem">
             <img
                        src="@/assets/twoImg/bianji1.png"
                        alt=""
                        style="width: 156px; height: 125px"
                      />
            <div style="margin-top:20px;color:#D8E0E6;">暂时还没有数据哦~快去添加</div>
        </div>
          </div>

      </div>

              <div class="page">
              <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 100]"
                :page-size="pagesize"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
              ></el-pagination> -->
            </div>
          
        </div>
        
        <div class="centerTwo">
          <div style="position: relative">
            <div class="line"></div>
            <div style="margin-left: 8px; font-weight: bold;margin-bottom:10px;">里程碑</div>
          </div>
          <el-table :data="progressList" border style="width: 100%"   :header-cell-style="{background:'#F8F9FB', color:''}">
                      <el-table-column prop="name" label="里程碑名称" width="280">
                           <template slot-scope="scope">
                               <el-tooltip class="item" effect="dark" :content='scope.row.name' placement="top-start">
                           <span class="xmjj1">{{scope.row.name}}</span>
                             </el-tooltip>
                    </template>
                      </el-table-column>
                      <el-table-column prop="" label="负责人" width="180">
                             <template slot-scope="scope">
                  <span>{{
                    scope.row.personincharge
                      .map(person => person.name)
                      .join('，')
                  }}</span>
                </template>
                      </el-table-column>
                      <el-table-column prop="remarks" label="里程碑描述">
                      </el-table-column>
                       <el-table-column prop="address" label="工程进度">
                    <template slot-scope="scope">
                  <div style="display: flex; align-items: center">
                    <el-progress
                      :percentage="Number(scope.row.schedule)"
                      :show-text="false"
                      :color="[{ color: '#FDAE05' }]"
                    ></el-progress>
                    <span class="progressText">{{ scope.row.schedule }}%</span>
                  </div>
                </template>
                      </el-table-column>
                       <el-table-column prop="schedule_status" label="时间进度">
                      </el-table-column>
                       <el-table-column prop="starttime" label="开始时间">
                      </el-table-column>
                       <el-table-column prop="endtime" label="结束时间">
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

              <div class="page">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-sizes="[5, 10, 100]"
                :page-size="pagesize1"
                layout="sizes,prev, pager, next, jumper"
                :total="total1"
              ></el-pagination>
            </div>
          
        </div>


<div class="centerTwo">
          <div style="position: relative">
            <div class="line"></div>
            <div style="margin-left: 8px; font-weight: bold;margin-bottom:10px;">最新动态</div>
          </div>
          <el-table :data="tableData" border style="width: 100%"   :header-cell-style="{background:'#F8F9FB', color:''}">
                      <el-table-column prop="name" label="申请人" >
                           <template slot-scope="scope">
                               <el-tooltip class="item" effect="dark" :content='scope.row.name' placement="top-start">
                           <span class="xmjj1">{{scope.row.name}}</span>
                             </el-tooltip>
                    </template>
                      </el-table-column>
                      <el-table-column prop="log_date" label="日志时间" >
                      </el-table-column>
                      <el-table-column prop="log_type" label="分类">
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

              <div class="page">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page.sync="currentPage2"
                :page-sizes="[5, 10, 100]"
                :page-size="pagesize2"
                layout="sizes,prev, pager, next, jumper"
                :total="total2"
              ></el-pagination>
            </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import gantt from 'dhtmlx-gantt'; // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js'; // 本地化
import componenTtiles from './componenTtiles.vue';

export default {
  name: 'qualityAnalysis',
  components: { componenTtiles },
  data() {
    return {
      indexs: 3,
      fxindex: 0,
      fxindex1: 0,
      fxindex2: 0,
      pid: '',
      name: '',
      pname: '',
      pagesize: 10,
      currentPage: 1,
      total: 0,
      pagesize1: 10,
      currentPage1: 1,
      total1: 0,
      pagesize2: 10,
      currentPage2: 1,
      total2: 0,
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
      tableData: [],
      oneList: [
        { title: '计划开工日期', value: '' },
        { title: '计划竣工日期', value: '' },
        { title: '计划工期', value: '' },
        { title: '当前状态', value: '' },
        { title: '实际开工日期', value: '' },
        { title: '实际竣工日期', value: '' },
        { title: '实际工期', value: '' },
      ],
      changList: [{ title: '安全整改图标分析' }, { title: '按负责人排名' }],
      changListTwo: [{ title: '事故图表分析' }, { title: '按负责人排名' }],
      changListThree: [{ title: '整改数量' }, { title: '按经济损失' }],
      peopleIsShow: true,
      searchLCId: '',
      searchId: '',
      type: 1,
      is_complete: 1,
      nextProject: [],
      clickType: 1,
      chartsData: { bing: {}, content: [] },
      formInline: {
        name: '',
        type: '',
      },
      searchName: '',
      isLast: false,
      loaded: false,
      editID: '',
      deleteVisible: false,
      comVisible: false,
      editProgressView: false,
      progressList: [],
      newView: false,
      nextRadio: 0,
      gantRadio: 1,
      labelPosition: 'right',
      newProgressView: false,
      taskTitle: '新建工程事件',
      activeName: 'first',
      projectList: [],
      searchForm: {
        name: '',
        starttime: '',
        endtime: '',
        city: '',
      },
      moveId: '',
      jdstatus: '',
      tasks: {
        data: [
          //   {
          //     id: 1,
          //     text: '开工开工开工开工开工开工开工开工',
          //     start_date: '15-04-2017',
          //     end_date: '18-04-2017',
          //     personName: '张总',
          //     duration: 3,
          //     progress: 0.6,
          //   },
          //            {
          //     id: 6,
          //     text: '笑嘻了',
          //     start_date: '15-04-2017',
          //     end_date: '18-04-2017',
          //     personName: '张总',
          //     duration: 3,
          //     progress: 0.6,
          //   },
          //   {
          //     id: 2,
          //     text: 'Task #2',
          //     start_date: '18-04-2017',
          //     end_date: '21-04-2017',
          //     personName: '李总',
          //     duration: 3,
          //     progress: 0.4,
          //   },
          //   {
          //     id: 3,
          //     text: 'Task #3',
          //     start_date: '20-04-2017',
          //     end_date: '23-04-2017',
          //     personName: '赵总',
          //     duration: 3,
          //     progress: 0.4,
          //     parent: 2,
          //   },
        ],
        // links: [{ id: 1, source: 1, target: 2, type: '0' }]
      },
      searchForm: {
        proname: '',
        name: '',
        startTime: '',
        endTime: '',
        type: '',
        status: '',
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGant();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getGant();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getLCList();
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
      this.getLCList();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getDTList();
    },
    handleSizeChange2(val) {
      this.pagesize2 = val;
      this.getDTList();
    },
    //上方信息
    getLInfo() {
      const _this = this;
      _this.$axios
        .post('/bulletin/speedAnalysis', {
          project_id: _this.pid,
          project_name: _this.pname,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.oneList[0].value = res.data.data.plan_kai;
            _this.oneList[1].value = res.data.data.plan_jun;
            _this.oneList[2].value = res.data.data.plan_period;
            _this.oneList[3].value = res.data.data.project_status;
            _this.oneList[4].value = res.data.data.actual_kai;
            _this.oneList[5].value = res.data.data.actual_jun;
            _this.oneList[6].value = res.data.data.actual_period;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //里程碑列表
    getLCList() {
      const _this = this;
      _this.$axios
        .post('/finance/milepost_list', {
          name: _this.searchName,
          xmid: '', //_this.searchId
          //   type: 2,
          //   is_complete: _this.is_complete,
          current_page: _this.currentPage1,
          //   page: _this.currentPage1,
          num: _this.pagesize1,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.progressList = res.data.content.list
              ? res.data.content.list
              : [];
            _this.lcType = res.data.type;
            _this.total1 = res.data.content.total;
            if (_this.total1 > 0 && _this.progressList.length < 1) {
              _this.currentPage1 = res.data.content.current_page;
              _this.getLCList();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //动态列表
    getDTList() {
      const _this = this;
      _this.$axios
        .post('/journal/loglist', {
          logtype: _this.searchForm.type,
          starttime: _this.searchForm.startTime,
          stoptime: _this.searchForm.endTime,
          proname: _this.searchForm.proname,
          name: _this.searchForm.name,
          current_page: _this.currentPage2,
          num: _this.pagesize2,
          status: _this.searchForm.status,
        })
        .then(res => {
          if (res.data.code == 1) {
            _this.tableData = res.data.content.list;
            _this.total2 = res.data.content.total;
            if (_this.total1 > 0 && _this.tableData.length < 1) {
              _this.currentPage1 = res.data.content.page;
              _this.getDTList();
            }
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
    changeTwo(e) {
      this.fxindex = e;
    },
    changeTwo1(e) {
      this.fxindex1 = e;
    },
    changeTwo2(e) {
      this.fxindex2 = e;
    },
    data2() {
      let res = [];
      let len = 0;
      while (len < 10) {
        res.push(+(Math.random() * 500 + 5).toFixed(2));
        len++;
      }
      return res;
    },
    searchNext() {
      this.getGant();
    },
    gantChange(val) {
      const quarter_template = date => {
        return 'Q' + (Math.floor(date.getMonth() / 3) + 1);
      };
      if (val == 1) {
        gantt.config.scales = [
          { unit: 'month', step: 1, format: '%F, %Y' },
          { unit: 'day', step: 1, format: '%j, %D' },
        ];
        // 数据解析
        // gantt.parse(this.tasks);
      } else if (val == 2) {
        gantt.config.scales = [
          { unit: 'year', step: 1, format: '%Y' },
          { unit: 'month', step: 1, format: '%M' },
        ];
        // 数据解析
        // gantt.parse(this.tasks);
      } else if (val == 3) {
        gantt.config.scales = [
          { unit: 'quarter', step: 1, template: quarter_template },
          { unit: 'year', step: 1, format: '%Y' },
        ];
        // 数据解析
        // gantt.parse(this.tasks);
      }
      this.getGant();
    },
    getGant() {
      const _this = this;
      _this.$axios
        .post('/finance/schedule_chart', {
          is_complete: _this.is_complete,
          xmid: _this.searchId,
          type: _this.type,
        })
        .then(res => {
          if (res.data.code == 1) {
            gantt.clearAll();
            _this.tasks.data = res.data.content;
            gantt.parse(_this.tasks);
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取子项目
    getNextProject() {
      const _this = this;
      _this.$axios
        .post('/project/projectInfoRegisterZbList')
        .then(res => {
          if (res.data.code == 1) {
            _this.nextProject = res.data.data;
            _this.searchId = res.data.data[0].id;

            _this.getGant();
          } else {
            _this.$message.warning(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.pid = this.$route.query.id;
    this.pname = this.$route.query.name;
    const _this = this;
    _this.getLCList();
    _this.getLInfo();
    _this.getDTList();
    _this.$utils.checkding();
    gantt.plugins({
      tooltip: true,
    });
    gantt.templates.tooltip_text = function (start, end, task) {
      return (
        '<b>' +
        task.text +
        '</b><br/>' +
        '开始时间: ' +
        new Date(start).toLocaleDateString() +
        '<br/>' +
        '结束时间: ' +
        new Date(end).toLocaleDateString()
      );
    };
    gantt.templates.task_class = function (start, end, task) {
      console.log('Task', task);
      switch (task.status) {
        case 4: {
          return 'delayed';
        }
        case 1: {
          return 'completed';
        }
        case 3: {
          return 'progress';
        }
        case 2: {
          return 'delayCompleted';
        }
      }
    };
    // gantt.templates.task_class = function (start, end, item) {
    //   console.log(item.$level, 'item.$levelitem.$level', item);
    //   return item.$level == 0 ? 'gantt_demo' : '';
    // };

    gantt.i18n.setLocale('cn');
    gantt.config.columns = [
    //   {
    //     name: 'id',
    //     label: '序号',
    //     tree: true,
    //     width: '80',
    //   },
      {
        name: 'text',
        label: '工程事件名称',
        tree: true,
        width: '200',
      },
      {
        name: 'personName',
        label: '负责人',
        align: 'center',
        resize: true,
      },
      {
        name: 'start_date',
        label: '开始时间',
        align: 'center',
        width: 150,
      },
      // {
      //     name: 'end_date',
      //     label: '结束时间',
      //     align: 'center',
      //     width: 150
      // },
      {
        name: 'duration',
        label: '工期',
        align: 'center',
        // template: function (obj) {
        //     return obj.duration + 1;
        // }
      },
    ];
    // gantt.config.readonly = true;
    gantt.config.scales = [
      { unit: 'month', step: 1, format: '%F, %Y' },
      { unit: 'day', step: 1, format: '%j, %D' },
    ];
    gantt.config.grid_width = 500;
    // 初始化
    gantt.init(_this.$refs.ganttRef);
    _this.getNextProject();

    // 数据解析
  },
};
</script>
<style  lang='scss' scoped>
.gantt_task .gantt_task_scale .gantt_scale_cell {
  color: black;
}
.gtt {
  height: 400px;
  overflow-y: auto;
  position: relative;
  .gttItem {
    width: 99%;
    height:400px;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }
  img {
    margin-top: 130px;
  }
}
// .gantt_demo {
//   border: 2px solid #09a1ff;
//   color: #09a1ff;
//   background: #09a1ff;
// }
.gantt_task_line.progress {
  background-color: #09a1ff;
}
.progress {
  background-color: #09a1ff;
}
/* medium */
.gantt_task_line.delayed {
  background-color: #ff4b5c;
}
.delayed {
  background-color: #ff4b5c;
}
/* low */
.gantt_task_line.completed {
  background-color: #06cdaf;
}
.completed {
  background-color: #06cdaf;
}
.gantt_task_line.delayCompleted {
  background-color: #ffb614;
}
.delayCompleted {
  background-color: #ffb614;
}
.gantt_grid_scale .gantt_grid_head_cell {
  color: black;
}
.gantt_grid_scale {
  //     width: 509px;
  // height: 60px;
  background: #f8f9fb;
  // border: 1px solid #EBEEF5;
}
#qualityAnalysis {
  background: url('../../assets/twoImg/bg.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 80px;
}
.pchLeft {
  align-items: center;
}
.selectorGroups {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}
.legend {
  width: 14px;
  height: 14px;
  border-radius: 9px;
  margin-left: 10px;
  margin-right: 8px;
}
.page {
  text-align: center;
  margin-top: 11px;
}
.xmjj1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.centerXm {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  margin-top: 20px;
  border-radius: 10px;
  .oneLeft {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    // justify-content: space-between;

    .oneLeftItem {
      display: flex;
      //   justify-content: space-evenly;
      width: 24%;
      background-color: white;
      border-radius: 10px;
      align-items: center;
      padding: 15px 0;
      margin-top: 10px;
      font-size: 16px;
      margin-left: 1%;
    }
    .oneLeftItemS {
      margin-left: 0 !important;
    }
    .oneBton {
      width: 66%;
    }
  }
  .centerTwo {
    background-color: white;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    .centerTwoChan {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      .child {
        width: 150px;
        height: 28px;
        border: 1px solid #d8e0e6;
        text-align: center;
        line-height: 26px;
        display: inline-block;
      }
      .childCh {
        color: white;
        background-color: #0189fe;
        // border:1px solid white;
      }
      .orange {
        width: 8px;
        height: 13px;
        background: #ff6827;
        border-radius: 3px;
        display: inline-block;
        margin: 0px 4px 0 0;
      }
      .right {
        color: #999999;
        font-size: 14px;
      }
    }
    .three {
      border: 1px solid #d8e0e6;
      width: 100%;
      .countLeft {
        .child {
          height: 49px;
          text-align: center;
          line-height: 50px;
          border-top: 1px solid #ebeef5;
          background-color: #f8f9fb;
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
  }
}
</style>