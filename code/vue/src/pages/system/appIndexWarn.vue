<template>
    <div id="appIndex2" style="padding: 20px">
        <div class="main">
            <div class="content">
                <h3 style="padding: 20px; margin: 0px">预警信息</h3>
                <div class="sec">
                    <div>
                        <el-select
                            v-model="name"
                            filterable
                            clearable
                            placeholder="请选择状态"
                            @change="typeChange"
                        >
                            <el-option label="已读" value="2"> </el-option>
                            <el-option label="未读" value="1"> </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex">
                        <el-button
                            type="warning"
                            size="medium"
                            @click="allClick"
                            >全部已读</el-button
                        >
                        <el-button
                            type="primary"
                            plain
                            size="medium"
                            @click="backClick"
                            >返回</el-button
                        >
                    </div>
                </div>
                <el-table :border="true"
                    :data="tableData"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                    @row-click="checkList"
                    max-height="600"
                    size="mini"
                    style="border: 1px solid #ebeef5"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column type="index" label="序号" width="55" />
                    <el-table-column
                        prop="content"
                        label="预警内容"
                        :show-overflow-tooltip="true"
                        align="left"
                    >
                    </el-table-column>
                    <el-table-column
                        label="时间"
                        prop="created"
                        :show-overflow-tooltip="true"
                        align="left"
                        width="140"
                    >
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        width="140"
                        align="left"
                        :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.extend_first == 2"
                                style="color: #17c298"
                                >已读</span
                            >
                            <span v-else style="color: #f16d6d">未读</span>
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
            return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
        },
        allClick() {
            const _this = this;
            _this.$axios
                .post('/projectfour/yujingEdit', {
                    id: '0'
                })
                .then((res) => {
                    if (res.data.code == 1) {
                        _this.getList();
                        _this.$message({
                            type: 'success',
                            message: '信息已全部已读',
                            duration: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        typeChange() {
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
        getList() {
            this.$axios
                .post('/projectfour/yujingList', {
                    page: this.currentPage,
                    number: this.pagesize,
                    type: this.name
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
            if (row.extend_first == 1) {
                _this.$axios
                    .post('/projectfour/yujingEdit', {
                        id: row.id
                    })
                    .then((res) => {
                        if (res.data.code == 1) {
                            _this.getList();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        backClick() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.main {
    background: #ffffff;
    border-radius: 5px;
    .page {
        padding-bottom: 20px;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>
