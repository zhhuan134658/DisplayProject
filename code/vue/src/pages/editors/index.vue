<template>
  <div id="editors">
    <div class="return">
      <a href="javascript:history.go(-1);">
        x
      </a>
    </div>
    <div class="editor-head">
      <h4 v-if="editable">{{ templateName }} 模版编辑</h4>
      <h4 v-else>模版预览</h4>
      <!-- <el-button v-if="editable" size="mini" type="text" @click="saveData"
        >保存模版</el-button
      > -->
    </div>
    <editor :content="html" @save="saveData" />
  </div>
</template>

<script>
import Editor from '../../components/Editor/editor.vue';

export default {
  name: 'Editors',
  components: {
    Editor,
  },
  data: () => {
    return {
      templateId: 0,
      templateName: '',
      html: '',
      json: {},
      editable: false,
    };
  },
  mounted() {
    this.editable = this.$route.query.editable;
    this.templateId = this.$route.query.id;
    this.getData(this.templateId);
  },
  methods: {
    async getData(id) {
      const res = await this.$axios.post('/finance/tmp_hx', {
        id: id,
      });
      if (res.data.code === 1) {
        this.html = res.data.data.extend_five;
        this.templateName = res.data.data.name;
      }
    },
    async saveData(data) {
      console.log(data.html);
      this.html = data.html;
      this.json = data.json;
      const res = await this.$axios.post('/finance/print_temp', {
        id: this.templateId,
        extend_five: data.html,
        extend_four: JSON.stringify(data.json),
      });
      if (res.data.code === 1) {
        this.$message({
          type: 'success',
          message: '保存成功',
          duration: 1500,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#editors {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  .return {
    position: absolute;
    right: 40px;
    top: 96px;
    font-size: 16px;
    a {
      color: #888;
    }
  }
  .editor-head {
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 150px;
    margin-bottom: 16px;
    h4 {
      white-space: nowrap;
    }
  }
}
@media screen and (max-width: 960px) {
  #editors {
    flex-direction: column;
  }
}
@media screen and (min-width: 961px) {
  #editors {
    flex-direction: column;
  }
}
</style>
