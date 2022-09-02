

let app = getApp();
// 获取云数据库引用
//const db = wx.cloud.database();
//const admin = db.collection('adminlist3');
let username_query='';

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   deviceStatus:1
  },
  
  options: { styleIsolation: 'shared' },
  
  
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    username_query = options.username_query;    
    console.log(username_query);
    //1、引用数据库
    //const db = wx.cloud.database({ envs: "tjnk3u19"})
    const db = wx.cloud.database({});
    const cont = db.collection('adminlist3').where({name:username_query});
    //2、开始查询数据了  news对应的是集合的名称
    cont.get({
        //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        console.log(res.data);
        this.setData({
          list: res.data
        })
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
  goBack:function(){
    wx.switchTab({
      url: '../index/index',//指定界面
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },
  login:function(e){
    console.log('device login');
    var deviceid = e.currentTarget.id;//获取到设备的ID号码，根据ID号获取
    console.log(deviceid);
    wx.navigateTo({
      url: `/pages/device/index?deviceid=${e.currentTarget.id}`,
     // url: `/pages/multiCharts/index?deviceid=${e.currentTarget.id}`,
     // url: '/pages/multiCharts/index',
    })
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})
/*
 <view class="vw">
         <label for="" class="font14" class="cs">工厂信息</label> <label for="" class="font14" class="cs">{{item.factoryName}}</label>
    <!--/view-->
    <!--view class="vw"-->
          <label for="" class="font14" class="cs">产线类型</label> <label for="" class="font14" class="cs">{{item.proline}}</label>
      </view>    
     <view class="vw">
          <label for="" class="font14" class="cs">设备型号</label> <label for="" class="font14" class="cs">{{item.DeviceType}}</label>
    <!--/view-->
    <!--view class="vw"-->
          <label for="" class="font14" class="cs">设备编号</label> <label for="" class="font14" class="cs">{{item.DeviceNo}}</label>
     </view>

*/
/*
<i-row i-class="demo-row">
          <i-col span="12" font="" offset="0" i-class="demo-col">  工厂信息：{{item.factoryName}}  </i-col>
          <i-col span="12" i-class="demo-col light">产线类型：{{item.proline}}</i-col>
     </i-row>
     <i-row i-class="demo-row">
          <i-col span="12"  offset="0" i-class="demo-col">  设备型号：{{item.DeviceType}}  </i-col>
          <i-col span="12" i-class="demo-col light">设备编号：{{item.DeviceNo}}</i-col>
     </i-row>
     <view class="btnforquery">
        <button bindtap='login'  size = "mini" id="{{item.DeviceNo}}" type="primary">查看设备状态</button>
    </view>
    <view class='line'></view>
*/