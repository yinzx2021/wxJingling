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
  choosePhoto: function() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '上传图片需要消耗流量，是否继续？',
      confirmText: '继续',
      success: function(res) {
        if (res.confirm) {
          wx.chooseImage({
            count: 4,
            sourceType: ['album'],
            success: function (res) {
              var tempFilePaths = res.tempFilePaths, imgLen = tempFilePaths.length;
              _this.setData({
                uploading: true,
                imgLen: imgLen
              });
              tempFilePaths.forEach(function(e){
                _this.uploadImg(e);
              });
            }
          });
        }
      }
    });
  },
  uploadImg: function(path){
    var _this = this;
    // 上传图片
    var tempFilePaths = res.tempFilePaths
    for (var i = 0; i < tempFilePaths.length; i++) {
    wx.uploadFile({
      url: 'https://graph.baidu.com/upload',
      filePath: tempFilePaths[i],
      name: "file",
      header: {
        "content-type": "multipart/form-data"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: "上传成功",
            icon: "none",
            duration: 1500
          })

          that.data.imgs.push(JSON.parse(res.data).data)

          that.setData({
            imgs: that.data.imgs
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: "上传失败",
          icon: "none",
          duration: 2000
        })
      },
      complete: function (result) {
        console.log(result.errMsg)
      }
    })}
  },
  previewPhoto: function(e){
    var _this = this;
    //预览图片
    if(_this.data.uploading){
      app.showErrorModal('正在上传图片', '预览失败');
      return false;
    }
    wx.previewImage({
      current: _this.data.imgs[e.target.dataset.index],
      urls: _this.data.imgs
    });
  },
  submit: function(){
    var _this = this, title = '', content = '', imgs = '';
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
          app.showLoadToast();
          wx.cloud.callFunction(
            {name:"sendEmail",
            data:{
              title:_this.data.title,
              mailConent:_this.data.content
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