<template>
  <div id="projectProgress" ref="elementS">
    <div class="main">
      <div class="content">
        <div style="display: flex;justify-content: space-between;">
          <div class="progressConHeader" style="width: auto; margin: 0px">
            <div class="pchLeft">
              <div>项目名称：</div>
              <el-select
                v-model="searchId"
                filterable
                placeholder="请选择项目"
                @change="searchNext"
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
            <!-- <el-button type="primary" size="medium">搜索</el-button> -->
          </div>

          <div class="gantBtn" style="margin: 0px 0 30px 0">
            <el-radio-group v-model="gantRadio" @change="gantChange">
              <el-radio-button label="1">按日显示</el-radio-button>
              <el-radio-button label="2">按月显示</el-radio-button>
              <el-radio-button label="3">按年显示</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div ref="ganttRef" class="left-container" />
      </div>
    </div>
  </div>
</template>

<script>
import gantt from 'dhtmlx-gantt'; // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js'; // 本地化
export default {
  name: 'progressGant',
  data() {
    return {
      peopleIsShow: true,
      searchLCId: '',
      searchId: '',
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
      tasks: {
        data: [
          // {
          //     id: 1,
          //     text: '开工开工开工开工开工开工开工开工',
          //     start_date: '15-04-2017',
          //     end_date: '18-04-2017',
          //     personName: '张总',
          //     duration: 3,
          //     progress: 0.6
          // },
          // {
          //     id: 2,
          //     text: 'Task #2',
          //     start_date: '18-04-2017',
          //     end_date: '21-04-2017',
          //     personName: '李总',
          //     duration: 3,
          //     progress: 0.4
          // },
          // {
          //     id: 3,
          //     text: 'Task #3',
          //     start_date: '20-04-2017',
          //     end_date: '23-04-2017',
          //     personName: '赵总',
          //     duration: 3,
          //     progress: 0.4,
          //     parent: 2
          // }
        ],
        // links: [{ id: 1, source: 1, target: 2, type: '0' }]
      },
    };
  },

  methods: {
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
        .post('/task/JinDuHengDaoTu', {
          corp_id: _this.$store.state.cid,
          xmid: _this.searchId,
          user_id: _this.$store.state.userInfo.uid,
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
        .catch(function(error) {
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
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  mounted() {
    const _this = this;
    _this.$utils.checkding();

    gantt.i18n.setLocale('cn');
    gantt.config.columns = [
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

<style lang="less" scoped>
.main {
  background: #ffffff;
  padding: 30px 36px !important;
  border-radius: 5px;
}
</style>
