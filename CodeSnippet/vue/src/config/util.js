import axios from './https.js';
import * as dd from 'dingtalk-jsapi';
import store from '@/store';
export default {
  // 时间戳转日期
  formateTime: function(time) {
    let date;
    if (time.length < 11) {
      // 秒
      date = new Date(time * 1000);
    } else {
      // 豪秒
      date = new Date(time);
    }

    let Y = date.getFullYear();
    let M =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + '-' + M + '-' + D;
  },
  //时间转换
  timeChange: function(val, type) {
    let chinaStandard = val;
    let newTime;
    let date = new Date(chinaStandard);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    let h = date.getHours();
    h = h < 10 ? '0' + h : h;
    let minute = date.getMinutes();
    let s = date.getSeconds();
    minute = minute < 10 ? '0' + minute : minute;
    s = s < 10 ? '0' + s : s;
    if (type == 1) {
      newTime = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
    } else if (type == 2) {
      newTime = y + '-' + m + '-' + d;
    }
    return newTime;
  },
  //时间日期格式化
  dateFormat(dateObj, format) {
    let date = {
      'M+': dateObj.getMonth() + 1,
      'd+': dateObj.getDate(),
      'h+': dateObj.getHours(),
      'm+': dateObj.getMinutes(),
      's+': dateObj.getSeconds(),
      'q+': Math.floor((dateObj.getMonth() + 3) / 3),
      'S+': dateObj.getMilliseconds(),
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(
        RegExp.$1,
        (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? date[k]
            : ('00' + date[k]).substr(('' + date[k]).length),
        );
      }
    }
    return format;
  },

  //获取地址栏参数
  GetQueryString: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  },
  //获取全部物资
  async getmaterialList() {
    try {
      const res = await axios.post('//');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  //数组对象去重
  unique: function(arr) {
    const res = new Map();
    return arr.filter(arr => !res.has(arr.emplId) && res.set(arr.emplId, 1));
  },
  idunique: function(arr) {
    const res = new Map();
    return arr.filter(arr => !res.has(arr.id) && res.set(arr.id, 1));
  },
  //计算大小
  renderSize: function(value) {
    if (null == value || value == '') {
      return '0 Bytes';
    }
    var unitArr = new Array(
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    );
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2); //保留的小数位数
    return size + unitArr[index];
  },

  async commonAllPro() {
    try {
      const res = await axios.post('//');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async commonAllaccount() {
    try {
      const res = await axios.post('//');
      return res.data.content;
    } catch (error) {
      console.log(error);
    }
  },
  async commonAlltouProjectType() {
    try {
      const res = await axios.post('//');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async commonAllProjece() {
    try {
      const res = await axios.post('//');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async commonAllProjece1() {
    try {
      const res = await axios.post('//');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async commontouProjectType() {
    try {
      const res = await axios.post('//');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  async commontouProjectType1() {
    try {
      const res = await axios.post('//', {
        type: 'all',
      });
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  utilProjectType: function() {
    axios.post('').then(res => {
      if (res.data.code == 1) {
        store.commit('setPtype', JSON.stringify(res.data.data));
      }
    });
  },
  utilAllProject: function() {
    axios.post('').then(res => {
      if (res.data.code == 1) {
        store.commit('setAllP', JSON.stringify(res.data.data));
      }
    });
  },

  utilAllZProject: function() {
    axios.post('//').then(res => {
      if (res.data.code == 1) {
        store.commit('setAllZP', JSON.stringify(res.data.data));
      }
    });
  },
 
  utilApprovalStatus: function() {
    // let val = []
    // if (store.state.userInfo.admin != 1) {
    //     val = [
    //         { name: '待我审批', value: 1 },
    //         { name: '我已审批', value: 2 },
    //         { name: '我发起的审批', value: 3 },
    //         { name: '抄送我的', value: 4 }
    //     ]
    // } else {
    //     val = [
    //         { name: '待我审批', value: 1 },
    //         { name: '我已审批', value: 2 },
    //         { name: '我发起的审批', value: 3 },
    //         { name: '抄送我的', value: 4 },
    //         { name: '审批中', value: 5 },
    //         { name: '审批拒绝', value: 6 },
    //         { name: '审批通过', value: 7 }
    //     ]
    // }
    let val = [
      { name: '待我审批', value: 1 },
      { name: '我已审批', value: 2 },
      { name: '我发起的审批', value: 3 },
      { name: '抄送我的', value: 4 },
      { name: '审批中', value: 5 },
      { name: '审批拒绝', value: 6 },
      { name: '审批通过', value: 7 },
    ];
    return val;
  },

  utilProjectStatus: function() {
    axios.post('').then(res => {
      if (res.data.code == 1) {
        store.commit('setPstatus', JSON.stringify(res.data.data));
      }
    });
  },
  utilAdjustWidth: function(stable, appendDiv, sx, sh) {
    // stable是ref选中的table表格
    //appendDiv append的小计合计外层div
    //sx是小计的ref
    //sh是合计的ref
    // let width = getComputedStyle(
    //     stable.$refs.headerWrapper.querySelector('table')
    // ).width;
    if (stable && stable.$refs.headerWrapper && appendDiv && sx && sh) {
      let width = getComputedStyle(
        stable.$refs.bodyWrapper.querySelector('table'),
      ).width;
      //修改append后的宽度和表格宽度一致
      appendDiv.style.width = width;
      sx.style = 'width:' + width;
      sh.style = 'width:' + width;

    //   console.log(
    //     typeof Array.from(stable.$refs.headerWrapper.querySelectorAll('col')),
    //   );
      Array.from(stable.$refs.headerWrapper.querySelectorAll('col')).forEach(
        (item, i) => {
          if (i == 0) {
            sx.children[0].style = 'width:' + '54px';
            sh.children[0].style = 'width:' + '54px';

            // sx.children[0].style.height = '35px';
            // sh.children[0].style.height = '35px';
          } else {
            //sx.children[i],sh.children[i]会多出一个undefined，做判断规避
            if (sx.children[i]) {
              sx.children[i].style =
                'width:' + item.getAttribute('width') + 'px';
              //   sx.children[i].style.height = '35px';
            }
            if (sh.children[i]) {
              sh.children[i].style =
                'width:' + item.getAttribute('width') + 'px';
              //   sh.children[i].style.height = '35px';
            }
          }
        },
      );
    }
  },
  utilAdjustxiao: function(stable, appendDiv, sx) {
    // stable是ref选中的table表格
    //appendDiv append的小计合计外层div
    //sx是小计的ref
    //sh是合计的ref
    // let width = getComputedStyle(
    //     stable.$refs.headerWrapper.querySelector('table')
    // ).width;
    if (stable && stable.$refs.headerWrapper && appendDiv && sx) {
      let width = getComputedStyle(
        stable.$refs.bodyWrapper.querySelector('table'),
      ).width;
      //修改append后的宽度和表格宽度一致
      appendDiv.style.width = width;
      sx.style = 'width:' + width;

      Array.from(stable.$refs.headerWrapper.querySelectorAll('col')).forEach(
        (item, i) => {
          if (i == 0) {
            sx.children[0].style = 'width:' + '54px';
            // sx.children[0].style.height = '35px';
          } else {
            //sx.children[i],sh.children[i]会多出一个undefined，做判断规避
            if (sx.children[i]) {
              sx.children[i].style =
                'width:' + item.getAttribute('width') + 'px';
              //   sx.children[0].style.height = '35px';
            }
          }
        },
      );
    }
  },
  canDelete(arrList) {
    console.log(arrList);
    let iconindex;
    if (arrList.length > 0) {
      iconindex = arrList.some(item => item.status == '2');
    } else {
      iconindex = false;
    }

    return iconindex;
  },
};
