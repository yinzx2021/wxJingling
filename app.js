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
      user_name:"",
      user_ID: "",
      device_ID:""
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
