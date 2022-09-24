//issues.js
//获取应用实例
var app = getApp();
Page({
  data: {
    title: '',
    content: '',
    info: '',
    imgs: [],
    imgLen: 0,
    upload: false,
    uploading: false,
    qiniu: ''
  },
  onLoad: function(){
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        var info = '---\r\n用户信息\r\n';
        info += '用户名：' + app._user.wx.nickName;
        if(app._user.we.type){
          info += '（' + app._user.we.type + '-' + app._user.we.info.name + '-' + app._user.we.info.id + '）';
        }
        info += '\r\n手机型号：' + res.model;
        info += '（' +res.windowWidth+'x'+res.windowHeight+ '）';
        info += '\r\n微信版本号：' + res.version;
        _this.setData({
          info: info
        });
      }
    });
  },
  listenerTitle: function(e){
    this.setData({
      'title': e.detail.value
    });
  },
  listenerTextarea: function(e){
    this.setData({
      'content': e.detail.value
    });
  },
  submit: function(){
    var _this = this, title = '', content = '', imgs = '';
    if(!app.globalData.is_bind)
    {
      app.showErrorModal('请绑定先', '提交失败');
      return false;
    }
    if(_this.data.uploading){
      app.showErrorModal('正在上传图片', '提交失败');
      return false;
    }
    if(!_this.data.title){
      app.showErrorModal('请输入反馈标题', '提交失败');
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否确认提交反馈？',
      success: function(res) {
        if (res.confirm) {
          if(!_this.data.content){
            app.showErrorModal('请输入反馈内容', '提交失败');
            return false;
          }
          title = '【' + app._user.wx.nickName + '】' + _this.data.title;
          content = _this.data.content + '\r\n\r\n' + _this.data.info;
          if(_this.data.imgLen){
            _this.data.imgs.forEach(function(e){
              imgs += '\r\n\r\n' + '![img]('+e+'?imageView2/2/w/750/interlace/0/q/88|watermark/2/text/V2Xph43pgq4=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10)';
            });
            content += imgs;
          }
         // app.showLoadToast();
          wx.cloud.callFunction(
            {name:"sendEmail",
            data:{
              title:_this.data.title +'nickname is ' +app.globalData.userinfo.nickName,
              mailConent:_this.data.content + 'openid is ' + app.globalData.openId +  "mobile phone is  "+ app.globalData.MobilePhone
            },
            success(res){
              wx.showModal({
                title: '反馈成功',
                content: _this.data.title,
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
        }
      }
    });
  }
});