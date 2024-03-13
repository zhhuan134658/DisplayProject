<template>
  <div id="template-list">
    <div class="template-list-header">
      <div class="template-list-header-left">
        <div class="template-list-header-left-title">
          <span class="title">模版列表</span>
          <span class="description">
            默认模板会将表单字段列表展示，当默认无法满足需求的时候，可以自定义打印模板，自定义打印样式及展示字段。
          </span>
        </div>
      </div>
      <div class="template-list-header-right">
        <div class="template-list-header-right-search">
          <el-input v-model="search" placeholder="搜索模板">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getTemplateList"
            />
          </el-input>
        </div>
      </div>
    </div>
    <div class="template-list-table-container">
      <el-table
        v-loading="loading"
        stripe
        :data="templateList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="模版名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="source"
          label="使用范围"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="created_time"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="modify_time"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :disabled="loading"
              active-value="1"
              inactive-value="0"
              @change="switchStatus(scope.row.id, scope.row.status)"
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
            <el-button
              type="text"
              size="small"
              @click="editTemplate(true, scope.row.id, scope.row.account)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="editTemplate(false, scope.row.id, scope.row.account)"
            >
              预览
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateList',
  data: () => {
    return {
      templateList: [
        {
          id: 1,
          name: '默认模板',
          editable: false,
          source: '所有人',
          createTime: '2019-01-01',
          updateTime: '2022-01-01',
        },
      ],
      loading: false,
      search: '',
    };
  },
  created() {
    this.generateDefaultTemplate();
    this.getTemplateList();
  },
  methods: {
    async generateDefaultTemplate() {
      const res = await this.$axios.post('/finance/menu');
      if (res.data.code === 1) {
        this.$message({
          type: 'success',
          message: '生成默认模版成功',
          duration: 1500,
        });
        this.getTemplateList();
      }
    },
    async switchStatus(id, status) {
      this.loading = true;
      const res = await this.$axios.post('/finance/tmp_start_stop', {
        id,
        type: status,
      });
      if (res.data.code === 1) {
        this.$message({
          type: 'success',
          message: '操作成功',
          duration: 1500,
        });
        this.getTemplateList();
      }
    },
    async getTemplateList() {
      this.loading = true;
      const res = await this.$axios.post('/finance/tmp_list', {
        name: this.search,
      });
      this.loading = false;
      if (res.data.code === 1) {
        this.templateList = res.data.data;
      }
    },
    editTemplate(editable, id, tableName) {
      if (editable) {
        this.$router.push({
          path: '/system/edit-template',
          query: {
            id,
            editable,
            tableName,
          },
        });
      } else {
        this.$router.push({
          path: '/system/edit-template',
          query: {
            id,
            tableName,
          },
        });
      }
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
