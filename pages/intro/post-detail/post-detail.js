Page({
  data: {
    img_intro:'',
    url:"https://mp.weixin.qq.com/s/eT2oRLiNCs0uj6JJDCNDPw",
  },
  onLoad:function(option){  
    var url = option.url; //这个id是post.js的navigate的自定义名称传值过来的
    wx.cloud.downloadFile({
      fileID : option.url,
      success:res=>{
          this.setData({
            url:res.tempFilePath
          })
       },
      fail(err){
        console.log(err);
      }
    })
   
    console.log("url in the detail" +url);  //获取数组指定的文章下标值    
  }
})