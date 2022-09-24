// pages/intro/intro.js
let user = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_intro:'',
    //url:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUwOTc0MTEwOA==#wechat_redirect'
    url:"https://mp.weixin.qq.com/s/eT2oRLiNCs0uj6JJDCNDPw",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this
    const db = wx.cloud.database();
    const collections = db.collection('news').orderBy("newsID",'desc');
    const total = await (await collections.count()).total
    const batchTimes = Math.ceil(total / 20)
    console.log(batchTimes) //计算需要获取几次  比如你有36条数据就要获取两次 第一次20条第二次16条
    let arraypro = [] // 定义空数组 用来存储每一次获取到的记录 
    let x = 0 //这是一个标识每次循环就+1 当x等于batchTimes 说明已经到了最后一次获取数据的时候
    //没错，循环查询，看着就觉得很影响性能，但是么的办法。
    for (let i = 0; i < batchTimes; i++) {
    //分组获取
      db.collection("news").orderBy("newsID",'desc').skip(i * 20).get({
        success: function (res) {
          x += 1
          // 20个20个的获取 最后一次不够20 那就是剩下的
          for (let j = 0; j < res.data.length; j++) 
            arraypro.push(res.data[j])
          //判断是否是最后一次，如果是说明已经不用再继续获取了，这时候就可以赋值了
          if (x == batchTimes) {
            console.log(arraypro)
            that.setData({
              list: arraypro
            })
            console.log("list result is "+that.data.list)
          }
        }
      })
    }    
  },
  onPostTap:function(event){
    var url = event.currentTarget.dataset.postidNum;
    console.log('onposttat is '+url)
    //currentTarget表示当前鼠标点击的组件
    //dataset表示所有自定义属性的集合,然后dataset其中一个属性名是postId的存放的值(如data-postId={{值}})
    wx.navigateTo({
      url: "post-detail/post-detail?url="+url        
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      // 下载文件
     wx.cloud.downloadFile({
      //   // 返回链接地址 仅支持小程序中展示 cloud协议
         // cloud://text-wx55c.7465-text-wx55c-1254351324/img/1594809942978.jpg
         fileID : "cloud://jwxjs-0gr7moa55160b291.6a77-jwxjs-0gr7moa55160b291-1314067655/intro-2.png",
         success:res=>{
          // console.log(res)
           this.setData({
            img_intro:res.tempFilePath  
           })
          },
         fail(err){
           console.log(err);
         }
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