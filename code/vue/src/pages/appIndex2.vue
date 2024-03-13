<template>
    <div id="appIndex2" style="padding: 20px">
        <div class="main">
            <div class="content">
                <div class="title">{{ tname }}</div>
                <div class="sec">
                    <div>
                        <!-- <el-select
                            v-model="name"
                            filterable
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in titleData"
                                :key="item.title"
                                :label="item.title"
                                :value="item.title"
                            >
                            </el-option>
                        </el-select> -->

                <el-input
                  v-model="name"
                  clearable
                  clear="fukuan"
                  placeholder="请输入"
                  style="width:230px;"
                ></el-input>
                        <el-button
                            type="primary"
                            size="medium"
                            style="margin-left:30px;"
                            @click="searchClick"
                            >搜索</el-button
                        >
                    </div>
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        @click="backClick"
                        >返回</el-button
                    >
                </div>
                <el-table :border="true"
                    :data="tableData"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                    @row-click="checkList"
                    max-height="600"
                    style="border: 1px solid #ebeef5"
                    size="mini"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column label="序号" type="index" width="50" />
                    <el-table-column
                        prop="name"
                        label="审批标题"
                        :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        label="审批摘要"
                        :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <div>{{ scope.row.field_one }}</div>
                            <div>{{ scope.row.field_two }}</div>
                            <div>{{ scope.row.field_three }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="发起人"
                        class-name="aiFa"
                        align="left"
                        width="200"
                    >
                        <template slot-scope="scope">
                            <img
                                v-if="scope.row.avatar"
                                :src="scope.row.avatar"
                                alt=""
                            />
                            <span v-else class="aifas">{{
                                scope.row.send_name.length <= 2
                                    ? scope.row.send_name
                                    : scope.row.send_name.substr(
                                          scope.row.send_name.length - 2,
                                          2
                                      )
                            }}</span
                            ><span class="aistext">{{
                                scope.row.send_name
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="created"
                        label="发起时间"
                        width="100"
                        align="left"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="finishtime"
                        label="完成时间"
                        width="100"
                        align="left"
                    >
                    </el-table-column>
                    <el-table-column label="状态" width="100" align="right">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status == '2'"
                                style="color: #17c298"
                                >已同意</span
                            >
                            <span
                                v-else-if="scope.row.status == '1'"
                                style="color: #e8a54c"
                                >审批中</span
                            >
                            <span v-else style="color: #f16d6d">已拒绝</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        :page-sizes="[50, 100, 200]"
                        layout="sizes,prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    data() {
        return {
            currentPage: 1,
            total: 0,
            pagesize: 50,
            name: '',
            tableData: [],
            id: 1,
            tname: '',
            titleData: []
        };
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'statistics-warning-row';
            } else {
                return '';
            }
        },
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
        },
        tableRowClass({ row, rowIndex }) {
            return 'color:#5f5f5f;border-color:#F1F8FF;';
        },
        searchClick() {
            this.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getList();
        },
        getTitle() {
            this.$axios
                .post('/user/indexType')
                .then((res) => {
                    if (res.data.code == 1) {
                        this.titleData = res.data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getList() {
            this.$axios
                .post('/mobile/dingApprovalList', {
                    page: this.currentPage,
                    number: this.pagesize,
                    name: this.name,
                    type: this.id
                })
                .then((res) => {
                    if (res.data.code == 1) {
                        this.total = res.data.count;
                        this.tableData = res.data.data;
                        if (this.total > 0 && this.tableData.length < 1) {
                            this.currentPage = res.data.page_number;
                            this.getList();
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        checkList(row) {
            const _this = this;
            dd.ready(function () {
                dd.biz.util.openSlidePanel({
                    url: row.url, //打开侧边栏的url
                    title: '详情', //侧边栏顶部标题
                    onSuccess: function (result) {},
                    onFail: function () {
                        setTimeout(() => {
                            _this.getList();
                        }, 5000);
                        setTimeout(() => {
                            _this.getList();
                        }, 10000);
                    }
                });
            });
            _this.$axios
                .post('/mobile/ccUseridStatus', {
                    id: row.id
                })
                .then((res) => {})
                .catch(function (error) {
                    console.log(error);
                });
        },
        backClick() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.id = this.$route.query.id;
        this.tname = this.$route.query.name;
        this.getTitle();
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.main {
    background: #ffffff;
    border-radius: 5px;
    .content {
        width: auto !important;
        padding: 0px 36px;
        padding-bottom: 62px;
        .title {
            font-size: 16px;
            font-weight: 800;
            color: #3296fa;
            line-height: 55px;
            text-align: left;
        }
        .page {
            display: flex;
            flex-direction: row-reverse;
        }
    }
}
</style>

<style lang="less">
.el-table__row.statistics-warning-row {
    background: #f1f8ff;
}
.sec {
    .el-select,
    .el-input {
        width: 280px;
    }
}
.el-table tr {
    height: 49px;
}
</style>