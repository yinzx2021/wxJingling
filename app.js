//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'cloud1-5grrxptx9b5595f3',
        traceUser: true,
      })
    } 
  },
  //后台切换至前台时
  onShow: function(){

  },
  globalData:{
      DeviceNo:"232",
      listNo:0,
      name: "",
      password:"",
      date:Date(),
      deviceStatus:0,
      mailConent:"2345",
      headers:{
        公司名称: '北京经纬纺机新技术有限公司',
        设备序列号: '22086',
        设备型号:'JWF0015G',
        工艺流程:'卓朗清梳',
        地址:'北京经济技术开发区永昌中路8号',
        联系方式:'01067875566',
        远控码:'423829570',
        安装人员:'常现忠',
        安装时间:'2022.7'
        },
        settings:{
          ModelName:'20211215',
          色彩灵敏度:50,
          黑色灵敏度:50,
          彩丝灵敏度:50,
          青灰灵敏度:60,
          头发丝灵敏度:80,
          白丝灵敏度:90,
          麻绳灵敏度:67,
          羽毛灵敏度:77,
          地膜灵敏度:30,
          黄棉灵敏度:80,
          油棉灵敏度:98,
          棉杆灵敏度:99,
          荧光灵敏度:34,
          偏振灵敏度:32,
          红外灵敏度:21
        },
        state:{
          照明寿命:10000,
          灯管用时:2342,
          开关状态:1,
          收集:1,
          气压状态:1,
          排杂状态:1,
          有无挂花:1,
          成像质量:1,
          照明:1,
          AI模块:1
        },
        record:
            {
              当日日光喷出次数:[1388,1547,1376,834,1401,1412,1473,1453,1109,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],紫外喷出次数:[110,152,109,91,120,152,169,161,143,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              红外喷出次数保留:[11,15,11,9,12,15,17,16,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              dataClass:[
                {value: 23.6,name: '黑/灰色'},
                {value: 12.3,name: '彩色'},
                {value: 8.23,name: '荧光'},
                {value: 6.11,name: '偏振'},
                {value: 24.54,name: 'C5'},
                {value: 11.76,name: 'C6'},
                {value: 4,name: 'C7'},
                {value: 9.21,name: 'C8'},
              ],
              当日24小时气压:[5.4,5.5,5.4,5.3,5.4,5.5,5.4,5.3,5.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              当日24小时流速:[11.01,11.07,10.98,11.01,10.92,11.02,11.00,11.02,11.03,11.11,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]      
            },
        passdevice:{
              普通密码:'abc',
              信号密码:'bcd',
              超级密码:'def'
            }, 
            detail: {
              sys:{
                load:['倒装','ttyTHS0','喷阀自动'],      
                hostname:"JWF0016F",uptime:"220188",
                cpus:{percent:"8部",list:{
                  日前1:{index:1,percent:70,free:80,total:32,trans:1},
                  日前2:{percent:12,free:22,total:45,trans:1},
                  日后1:{percent:70,free:80,total:32,trans:0},
                  日后2:{percent:12,free:22,total:45,trans:0},
                  紫前1:{percent:70,free:80,total:32,trans:1},
                  紫前2:{percent:12,free:22,total:45,trans:1},
                  紫后1:{percent:70,free:80,total:32,trans:0},
                  紫后2:{percent:12,free:22,total:45,trans:0}
                }},
                mem:{percent:0,free:0},        
              },
            procs:{
              日前:{pid:"日前",cpu:368,mem:350,pid2:580,cpu2:3,mem2:1},
              日后:{pid:"日后",cpu:458,mem:350,pid2:680,cpu2:3,mem2:1},
              紫前:{pid:"紫前",cpu:59,mem:320,pid2:300,cpu2:1,mem2:1},
              紫后:{pid:"紫后",cpu:16,mem:320,pid2:220,cpu2:1,mem2:1},
            },        
          } 
  },
  callClound(name,data,callback){
    if(!cloudInited) {
      wx.cloud.init()
      cloudInited = true
      console.debug(`初始化云开发环境...`)
    }
    console.debug(`开始执行云函数调用 name=${name} ...`)
    wx.cloud.callFunction({
      name,
      data,
      success: (res)=>{
          console.debug(`来自云函数${name}的调用结果：`, res.result)
          callBack(res.result)
      },
      fail: err=>{
          console.error("云函数调用失败", err.errCode, err.errMsg)
          console.log(err)
      }
    })
  },
  //getUser函数，在index中调用
  getUser: function(update_cb, bind) {
    var _this = this;
    wx.login({
      success: function(res){
        if(res.code){
          //调用函数获取微信用户信息
          _this.getUserInfo(function(info){
            _this._user.wx = info.userInfo;
            //发送code与微信用户信息，获取学生数据
            wx.request({
              method: 'POST',
              url: _this._server + '/api/users/get_info.php',
              data: {
                code: res.code,
                key: info.encryptedData,
                iv: info.iv
              },
              success: function(res){
                if(res.data && res.data.status >= 200 && res.data.status < 400){
                  var status = false;
                  //判断缓存是否有更新
                  if(!_this.cache || _this.cache != res.data.data){
                    wx.setStorage({
                      key: "cache",
                      data: res.data.data
                    });
                    status = true;
                    _this.processData(res.data.data);
                  }
                  if(!_this._user.is_bind){
                    wx.navigateTo({
                      url: '/pages/more/login'
                    });
                  }
                  //如果缓存有更新，则执行回调函数
                  if(status){
                    typeof update_cb == "function" && update_cb();
                  }
                }else{
                  //清除缓存
                  if(_this.cache){
                    wx.removeStorage({ key: 'cache' });
                    _this.cache = '';
                  }
                }
              },
              fail: function(res){
                //清除缓存
                if(_this.cache){
                  wx.removeStorage({ key: 'cache' });
                  _this.cache = '';
                }
              }
            });
          });
        }
      }
    });
  },
  processData: function(key){
    var _this = this;
    var data = JSON.parse(_this.util.base64.decode(key));
    _this._user.is_bind = data.is_bind;
    _this._user.openid = data.user.openid;
    _this._user.teacher = data.user.type == '教职工';
    _this._user.we = data.user;
    _this._time = data.time;
    _this._t = data['\x74\x6f\x6b\x65\x6e'];
    return data;
  },
  getUserInfo: function(cb){
    //获取微信用户信息
    wx.getUserInfo({
      success: function(res){
        typeof cb == "function" && cb(res);
      }
    });
  },
  //完善信息
  appendInfo: function(data){
    var _this = this;
    wx.removeStorage({ key: 'cache' });
    _this._user.we.build = data.build || '';
    _this._user.we.room = data.room || '';
  },
  showErrorModal: function(content, title){
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration){
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 10000
    });
  },
  util: require('./utils/util'),
  key: function(data){ return this.util.key(data) },
  _server: 'https://we.cqu.pt',
  _user: {
    //微信数据
    wx: {},
    //学生\老师数据
    we: {}
  },
  _time: {} //当前学期周数
})
