/* * @Author: NorthWind * @Date: 2020-11-12 16:49:37 * @Last Modified by:
NorthWind * @Last Modified time: 2022-01-11 15:54:53 */
<template>
  <div id="tenderProject">
    <!-- 投标项目列表 -->
    <div class="main">
      <!-- 搜索条件 -->
      <commonSearch
        :formcommonList="formcommonList"
        :formInline="formInline"
        @searchClick="searchClick"
        @getList="getList"
        :isShen='true'
      ></commonSearch>
      <div class="mainContent">
        <!-- <el-row class="maincBtn">
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="deleteList"
                        >删除</el-button
                    >
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="backList"
                        >还原</el-button
                    >
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        round
                        @click="exportList"
                        >导出</el-button
                    >
                </el-row> -->
        <el-row class="maincBtn mainMoveBtn">
          <div class="mmbLeft">
            <el-button type="primary" size="medium" @click="newAdd"
              >新建</el-button
            >
          </div>
          <div class="mmbRight">
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-delete"
              @click="deleteList"
              >删除</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-download"
              @click="exportList"
              >导出</el-button
            >
            <el-button
              type="primary"
              plain
              size="medium"
              icon="el-icon-refresh"
              @click="updateList"
              >刷新</el-button
            >
            <el-button
              v-if="$store.state.userInfo.admin == 1"
              type="primary"
              plain
              size="medium"
              icon="el-icon-setting"
              @click="viewShow"
              >设置显示字段</el-button
            >
          </div>
        </el-row>

        <el-table
          :border="true"
          class="moterialTotalClass"
          :data="tpList"
          :header-cell-style="tableHeaderClass"
          :cell-style="tableRowClass"
          @row-click="checkList"
          @header-dragend="checkWidth"
          style="width: 100%; border: 1px solid #ebeef5"
          max-height="650"
          ref="table"
          @selection-change="handleSelectionChange"
          size="mini"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column
            v-for="(item, index) in titleList"
            :key="index"
            :prop="item.value"
            :label="item.label"
            :show-overflow-tooltip="true"
            align="left"
          >
          </el-table-column>

          <el-table-column label="审批状态" align="left">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '2'" style="color: #17c298"
                >已同意</span
              >
              <span v-else-if="scope.row.status == '1'" style="color: #e8a54c"
                >审批中</span
              >
              <span v-else style="color: #f16d6d">已拒绝</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="project_riqi"
            label="操作"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                :disabled="scope.row.status == '3' ? true : false"
                v-if="scope.row.extend_first==''|| scope.row.extend_first==null"
                @click.stop="setDateClick(scope.row)"
                >设置提醒日期</el-button
              >

                 <el-button
                type="text"
                size="mini"
                :disabled="scope.row.status == '3' ? true : false"
                v-else-if="scope.row.extend_first!=''|| scope.row.extend_first!=null"
                @click.stop="setDateClick(scope.row)"
                ><div style="color:#409EFF;">{{scope.row.extend_first}}</div></el-button
              >
              <el-button
                type="text"
                size="mini"
                v-if="printable"
                @click="
                  printPDF(scope.row.id).catch(err => {
                    console.log(err);
                  })
                "
                >打印</el-button
              >
            </template>
          </el-table-column>
          <div slot="append" v-if="isFooter == 1">
            <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
              <div class="sum_footer xiaoji" ref="sum_xiaoji">
                <div class="sum_footer_unit center">小计</div>
                <div class="sum_footer_unit"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.xj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
                  "
                >
                  <el-tooltip
                    v-if="item.xj"
                    class="item"
                    effect="dark"
                    :content="item.xj"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ item.xj }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
              </div>
              <div class="sum_footer" ref="sum_heji">
                <div class="sum_footer_unit center">合计</div>
                <div class="sum_footer_unit"></div>
                <div
                  v-for="(item, index) in footerNumList"
                  :key="index"
                  :class="
                    item.hj
                      ? 'over_sum_text sum_footer_unit'
                      : 'sum_footer_unit'
                  "
                >
                  <el-tooltip
                    v-if="item.hj"
                    class="item"
                    effect="dark"
                    :content="item.hj"
                    placement="top"
                  >
                    <div style="text-align: left">
                      {{ item.hj }}
                    </div>
                  </el-tooltip>
                </div>
                <div class="sum_footer_unit"></div>
                <div class="sum_footer_unit"></div>
              </div>
            </div>
          </div>
        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 50, 100]"
            :page-size="pagesize"
            layout="sizes,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="设置日期"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div style="display: flex">
        <div style="width: 120px; line-height: 40px; text-align: right">
          <span style="color: red">*</span>提醒日期：
        </div>
        <el-date-picker
          v-model="warnTime"
          :picker-options="pickerWarn"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="设置"
      :visible.sync="wFormVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="wCancel"
      class="view_change_title"
    >
      <el-checkbox-group
        v-model="checkedLists"
        @change="handleCheckedListChange"
      >
        <draggable animation="1000" v-model="myArray">
          <transition-group>
            <el-checkbox
              v-for="element in myArray"
              :key="element.value"
              :label="element.value"
              border
            >
              <span> {{ element.label }}</span>
            </el-checkbox>
          </transition-group>
        </draggable>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="wCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="wInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import draggable from 'vuedraggable';
import commonSearch from '@/components/commonSearch.vue';

export default {
  name: 'tenderProject',
  components: { draggable, commonSearch },
  data() {
    return {
      //搜索条件
      formcommonList: [
        {
          labelName: ' 投标项目名称', //空格为识别特殊项 不删除
          labelData: 'name',
        },

        {
          labelName: '开始时间',
          labelData: 'startTime',
        },
        {
          labelName: '结束时间',
          labelData: 'endTime',
        },

        {
          labelName: ' 项目类型', //空格为识别特殊项 不删除
          labelData: 'type',
        },
        {
          labelName: '审批状态',
          labelData: 'status',
        },
        {
          labelName: ' 项目性质',
          labelData: 'lian_ying',
        },
      ],
      wFormVisible: false,
      myArray: [],
      loading: false,
      dialogVisible: false,
      warnTime: '',
      checkData: {
        riqi: '',
        remind_id: '',
      },
     ids:'',
      formInline: {
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name:'',
        send_userid:'',
        lian_ying:''
      },
      printable: false,
      currentPage: 1,
      total: 0,
      pagesize: 10,
      tpList: [],
      multSelectData: [],
      projectType: [],
      approvalStatus: [],
      xiaoji: 0,
      heji: 0,
      checkedLists: [],
      titleList: [],
      footerNumList: [],
      newFooter: [],
      isFooter: 0,
      allProjectList: [],
    };
  },
  methods: {
    onEnd() {}, // 因为是未定义补充的
    onStart() {}, // 因为是未定义补充的
    tableRowClassName({ row, rowIndex }) {
      if (row && rowIndex % 2 == 1) {
        return 'statistics-warning-row';
      } else {
        return '';
      }
    },
    handleCheckedListChange(value) {
      this.myArray.forEach(element => {
        if (value.includes(element.value)) {
          element.check = true;
        } else {
          element.check = false;
        }
      });
    },
    wCancel() {
      this.wFormVisible = false;
      let Ids = this.titleList.map(item => item.value);
      this.myArray.forEach(item => {
        if (!Ids.includes(item.value)) {
          item.check = false;
        } else {
          item.check = true;
        }
      });
    },
    wInfo() {
      let newT = [];
      this.myArray.forEach(element => {
        if (element.check) {
          newT.push(element);
        }
      });

      if (newT.length > 0) {
        this.$nextTick(() => {
          this.titleList = JSON.parse(JSON.stringify(newT));
          this.sendTitleList();
          if (this.isFooter == 1) {
            let newFArr = [];
            this.titleList.map(item => {
              this.newFooter.forEach(element => {
                if (element.value == item.value) {
                  newFArr.push(element);
                }
              });
            });
            this.footerNumList = JSON.parse(JSON.stringify(newFArr));
          }
          this.wFormVisible = false;
          setTimeout(() => {
            this.adjustWidth();
          }, 500);
        });
      } else {
        this.$message({
          type: 'warning',
          message: '不能为空！',
          duration: 1500,
        });
      }
    },
    viewShow() {
      this.wFormVisible = true;
      this.getTitleList();
      // for (let i = 0; i < this.myArray.length; i++) {
      //     for (let k = 0; k < this.titleList.length; k++) {
      //         if (this.myArray[i].value === this.titleList[k].value) {
      //             this.myArray[i].check = true;
      //         } else {
      //             this.myArray[i].check = false;
      //         }
      //     }
      // }
    },
    sendTitleList() {
      this.$axios
        .post('/spread/editFiledCurrency', {
          name: 'zk_project',
          mould_data: JSON.stringify(this.myArray),
        })
        .then(res => {
          if (res.data.code !== 1) {
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getPrintableStatus() {
      const res = await this.$axios.post('/finance/control_display', {
        tableName: 'zk_project',
      });
      if (res.data.code === 1) {
        this.printable = res.data.type === '1';
      }
    },
    async printPDF(id) {
      const _this = this;
      const res = await _this.$axios.post('/finance/dc_pdf', {
        tableName: 'zk_project',
        id: id,
      });
      if (res.data.code === 1) {
        console.log(res);
        window.open(`http://${res.data.file_path}`);
      }
    },
    adjustWidth() {
      const _this = this;

      _this.$nextTick(() => {
        let newW = document.getElementsByClassName(
          'el-table__append-wrapper',
        )[0];
        _this.$utils.utilAdjustWidth(
          _this.$refs.table,
          newW,
          _this.$refs.sum_xiaoji,
          _this.$refs.sum_heji,
        );
      });
    },
    setDateClick(row) {
        console.log(row,'checkData.remind_idcheckData.remind_id')
      this.$axios
        .post('/projectfour/newRemindRq', {
          remind_id: row.id,
        })
        .then(res => {
          if (res.data.code == 1) {
            this.checkData.riqi = row.bid_riqi;
            this.warnTime = res.data.data;
            this.checkData.remind_id = row.id;
            this.dialogVisible = true;
          } else {
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClose() {
      const _this = this;
      _this.loading = false;
      _this.dialogVisible = false;
      _this.checkData = {
        riqi: '',
        remind_id: '',
      };
      _this.warnTime = '';
    },
    handleSure() {
      const _this = this;
      _this.loading = true;
      if (_this.warnTime) {
        _this.$axios
          .post('/projecttwo/editRemindRiqi', {
            name: 'zk_project',
            remind_id: _this.checkData.remind_id,
            riqi: _this.warnTime,
          })
          .then(res => {
            if (res.data.code == 1) {
              _this.loading = false;
              _this.dialogVisible = false;
              _this.checkData = {
                riqi: '',
                remind_id: '',
              };
              _this.warnTime = '';
              _this.getList();
              _this.$message({
                type: 'success',
                message: '修改提醒日期成功',
                duration: 1500,
              });
            } else {
              _this.loading = false;
              _this.$notify({
                title: '提示',
                message: res.data.msg,
                type: 'error',
                duration: 1500,
              });
            }
          })
          .catch(function(error) {
            _this.loading = false;
            console.log(error);
          });
      } else {
        _this.loading = false;
        _this.$message({
          type: 'warning',
          message: '请您选择日期',
          duration: 2000,
        });
      }
    },
    fortStatus(row) {
      switch (row.status) {
        case '1':
          return '审批中';
        case '2':
          return '审批同意';
        case '3':
          return '审批拒绝';
      }
    },
    tableHeaderClass() {
      return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;border-color:#F1F8FF;font-size: 14px';
    },
    tableRowClass() {
      return 'color:#5f5f5f;padding:6px 0;border-color:#F1F8FF;';
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    checkWidth() {
      setTimeout(() => {
        this.adjustWidth();
      }, 200);
    },
    //查看审批
    checkList(row, column) {
      const _this = this;
      if (column.type != 'selection' && column.label != '提醒日期') {
        dd.ready(function() {
          dd.biz.util.openSlidePanel({
            url: row.url, //打开侧边栏的url
            title: '详情', //侧边栏顶部标题
            onSuccess: function() {},
            onFail: function() {
              setTimeout(() => {
                _this.getList();
              }, 5000);
              setTimeout(() => {
                _this.getList();
              }, 10000);
            },
          });
        });
      }
    },
    //发起审批
    newAdd() {
      const _this = this;
      _this.$axios
        .post('/project/projectAdd')
        .then(res => {
          if (res.data.code == 1) {
            let newUrl =
              'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
              _this.$store.state.cid +
              '#/custom/?processCode=' +
              res.data.data;
            dd.ready(function() {
              dd.biz.util.openLink({
                url: newUrl, //要打开链接的地址
                onSuccess: function() {
                  /**/
                },
                onFail: function() {},
              });
            });
          } else {
            _this.$notify({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchClick() {
      this.currentPage = 1;
      this.getList();
    },
    resetClick() {
      this.formInline = {
        name: '',
        type: '',
        status: '',
        startTime: '',
        endTime: '',
        send_name:'',
        send_userid:'',
        lian_ying:''
      };
      this.getList();
    },
    updateList() {
      this.getList(1);
    },
    //获取列表
    getList(ntype) {
      this.$axios
        .post('/project/projectList', {
          page: this.currentPage,
          number: this.pagesize,
          start_riqi: this.formInline.startTime,
          end_riqi: this.formInline.endTime,
          applicant: '',
          estimate_contract_money_start: '',
          estimate_contract_money_end: '',
          name: this.formInline.name,
          inputer: '',
          construction_unit: '',
          type: this.formInline.type,
          shenpi: this.formInline.status,
          send_name:this.formInline.send_name, 
          send_userid:this.formInline.send_userid,
          lian_ying:this.formInline.lian_ying
        })
        .then(res => {
          if (res.data.code == 1) {
            if (ntype == 1) {
              this.$message({
                message: '列表刷新成功',
                type: 'success',
                duration: 1500,
              });
            }
            this.total = res.data.count;
            this.tpList = res.data.data;
            this.footerNumList = [];
            this.isFooter = res.data.mould_data.is_heji;
            this.newFooter = res.data.mould_data.mould_data;
            this.titleList.map(item => {
              this.newFooter.forEach(element => {
                if (element.value == item.value) {
                  this.footerNumList.push(element);
                }
              });
            });
            this.$nextTick(() => {
              setTimeout(() => {
                this.adjustWidth();
              }, 200);
              if (document.body.scrollHeight > window.innerHeight) {
                setTimeout(() => {
                  this.adjustWidth();
                }, 1000);
              }
            });
            if (this.total > 0 && this.tpList.length < 1) {
              this.currentPage = res.data.page_number;
              this.getList();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //筛选
    handleSelectionChange(val) {
      this.multSelectData = val.map(item => {
        if (!item.id) return '';
        return item.id;
      });
    },
    //删除列表
    deleteList() {
      if (this.multSelectData.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$axios
              .post('/project/projectDel', {
                id: this.multSelectData,
              })
              .then(res => {
                if (res.data.code == 1) {
                  this.getList();
                  this.updateForm();
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    duration: 1500,
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'warning',
                    duration: 1500,
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      } else {
        this.$message({
          message: '请先勾选要删除的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    //还原列表
    backList() {
      this.$axios
        .post('/project/projectReduction')
        .then(res => {
          if (res.data.code == 1) {
            this.getList();
            this.updateForm();
            this.$message({
              message: '已还原',
              type: 'success',
              duration: 1500,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //刷新
    updateForm() {
      const _this = this;
      _this.$axios
        .post('/project/projectReductionEup')
        .then(res => {
          if (res.data.code == 1) {
            return true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteExport(url) {
      const _this = this;
      _this.$axios
        .post('/project/fileDownloadDel', { path: url })
        .then(res => {
          if (res.data.code == 1) {
            return true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //导出列表
    exportList() {
      const _this = this;
      if (_this.multSelectData.length > 0) {
        _this.$axios
          .post('/project/projectDownload', {
            id: _this.multSelectData,
          })
          .then(res => {
            if (res.data.code == 1) {
              dd.biz.util.downloadFile({
                url: res.data.data.url, //要下载的文件的url
                name: res.data.data.name, //定义下载文件名字
                onProgress: function() {
                  // 文件下载进度回调
                },
                onSuccess: function() {
                  _this.deleteExport(res.data.data.path);
                },
                onFail: function() {
                  _this.deleteExport(res.data.data.path);
                },
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: 'warning',
                duration: 1500,
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        _this.$message({
          message: '请先勾选要导出的数据！',
          type: 'warning',
          duration: 1500,
        });
      }
    },
    getTitleList() {
      this.$axios
        .post('/spread/showFiledList', {
          name: 'zk_project_spreadfield',
        })
        .then(res => {
          if (res.data.code == 1) {
            this.myArray = res.data.data;
            this.titleList = [];
            this.checkedLists = [];
            this.myArray.forEach(element => {
              if (element.check) {
                this.titleList.push(element);
                this.checkedLists.push(element.value);
              }
            });
            this.getList();
          } else {
            this.$message({
              title: '提示',
              message: res.data.msg,
              type: 'error',
              duration: 1500,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    guide() {
      const _this = this;
      let introJs = require('intro.js');
      introJs().refresh();
      introJs()
        .setOptions({
          nextLabel: '下一步 &rarr;',
          prevLabel: '&larr; 上一步',
          skipLabel: '退出',
          doneLabel: '下一步',
          // showButtons: false,
          showBullets: false,
          steps: [
            {
              element: document.querySelector('.secondInjs'),
              intro: '新建投标项目信息，点击下一步进入立项信息登记',
            },
          ],
        })
        .oncomplete(function() {
          //点击跳过按钮后执行的事件
        })
        .onexit(function() {
          //点击结束按钮后， 执行的事件
          _this.$router.push({
            path: '/project/projectApprovalList',
          });
        })
        .start();
    },
  },
  mounted() {
    this.$utils.checkding();
    this.getTitleList();
    this.projectType = JSON.parse(this.$store.state.pType);
    this.allProjectList = JSON.parse(this.$store.state.allZPro);
    // this.guide();
    window.addEventListener('resize', () => {
      if (this.$refs.table) {
        this.$refs.table.doLayout();
      }
      setTimeout(() => {
        this.adjustWidth();
      }, 100);
    });
  },
  created() {
    this.approvalStatus = this.$utils.utilApprovalStatus();
    this.$utils.utilAllZProject();
    this.getPrintableStatus();
  },
  computed: {
    pickerWarn() {
    //   return {
    //     disabledDate: time => {
    //       let endDateVal = this.checkData.riqi;
    //       if (endDateVal) {
    //         return time.getTime() > new Date(endDateVal).getTime();
    //       }
    //     },
    //   };
    },
    pickerStart() {
      return {
        disabledDate: time => {
          let endDateVal = this.formInline.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      };
    },
    pickerEnd() {
      return {
        disabledDate: time => {
          let beginDateVal = this.formInline.startTime;
          if (beginDateVal) {
            return (
              // time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          }
        },
      };
    },
  },
};
</script>
