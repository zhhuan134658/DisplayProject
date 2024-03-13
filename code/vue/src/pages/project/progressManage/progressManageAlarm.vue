<template>
  <div id="template-list">
    <div class="template-list-header">
      <div class="template-list-header-left">
        <div class="template-list-header-left-title">
          <span class="title">预警列表</span>
        </div>
      </div>
    </div>
    <div class="template-list-table-container">
      <el-table
        v-loading="loading"
        stripe
        :data="alarmList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="预警名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="push_date"
          label="预警时间"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>计划开始前{{ scope.row.push_date }}天</span>
          </template>
        </el-table-column>
        <el-table-column label="启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :disabled="loading"
              active-value="1"
              inactive-value="0"
              @change="
                submitEditAlarm({
                  id: scope.row.id,
                  status: scope.row.status,
                  push_date: scope.row.push_date,
                })
              "
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editAlarm(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="alarmForm.name" :visible.sync="dialogVisible">
      <el-form :model="alarmForm">
        <el-form-item label="预警天数" prop="push_date">
          <el-input-number
            v-model="alarmForm.push_date"
            placeholder="请输入预警天数"
            :disabled="loading"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit()">取 消</el-button>
        <el-button type="primary" @click="submitEditAlarm(alarmForm)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AlarmList',
  data: () => {
    return {
      alarmList: [],
      alarmForm: {
        id: '',
        status: 0,
        name: '',
        push_date: 0,
      },
      loading: false,
      dialogVisible: false,
    };
  },
  created() {
    this.generateDefaultAlarm();
    this.getAlarmList();
  },
  methods: {
    async generateDefaultAlarm() {
      const res = await this.$axios.post('/finance/created_warning');
      if (res.data.code === 1) {
        this.$message({
          type: 'success',
          message: '生成预警信息成功',
          duration: 1500,
        });
        this.getAlarmList();
      }
    },
    async getAlarmList() {
      this.loading = true;
      const res = await this.$axios.post('/finance/warning_list');
      this.loading = false;
      if (res.data.code === 1) {
        this.alarmList = res.data.content;
      }
    },
    editAlarm(row) {
      this.dialogVisible = true;
      this.alarmForm.push_date = row.push_date;
      this.alarmForm.status = row.status;
      this.alarmForm.id = row.id;
      this.alarmForm.name = row.name;
    },
    async submitEditAlarm(form = {}) {
      this.dialogVisible = false;
      this.loading = true;
      const res = await this.$axios.post('/finance/up_warning', {
        ...form,
      });
      if (res.data.code === 1) {
        this.$message({
          type: 'success',
          message: '修改成功',
          duration: 1500,
        });
      }
      await this.getAlarmList();
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
#template-list {
  min-height: 85vh;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  .template-list-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .description {
      margin-top: 8px;
      display: block;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
