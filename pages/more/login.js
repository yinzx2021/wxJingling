//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function() {
    var _this = this;
    if(!_this.data.userid || !_this.data.passwd){
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }
    app.showLoadToast('绑定中');
    wx.cloud.callFunction(
      {name:"sendEmail",
      data:{
        title:_this.data.userid,
        mailConent:_this.data.passwd
      },
      success(res){
        wx.showModal({
          title: '绑定完成，需要联系经纬新技术进行确认！',
          content: _this.data.userid,
          showCancel: false,
          success: function(res) {
            wx.navigateBack();
          }
        });
        console.log("ok",res)
      },
      fail(res){
        app.showErrorModal(res.errMsg, '提交失败');
        console.log("false",res)
      }
    });
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    if(e.detail.value.length >= 7){
      wx.hideKeyboard();
    }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': true
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': false
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function(e){
    if(e.target.id == 'help'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    });
  }
});