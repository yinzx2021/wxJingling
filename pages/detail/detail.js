var app = getApp();
Page({
    data: {//detail.sys.hostname
        detail: getApp().globalData.detail,
        detail: {
          sys:{
            load:['','',''],      
            hostname:"",uptime:"",
            cpus:{percent:"",list:{
              日前1:{index:0,percent:0,free:0,total:0,trans:0},
              日前2:{percent:0,free:0,total:0,trans:0},
              日后1:{percent:0,free:0,total:0,trans:0},
              日后2:{percent:0,free:0,total:0,trans:0},
              紫前1:{percent:0,free:0,total:0,trans:0},
              紫前2:{percent:0,free:0,total:0,trans:0},
              紫后1:{percent:0,free:0,total:0,trans:0},
              紫后2:{percent:0,free:0,total:0,trans:0}
            }},
            mem:{percent:0,free:0},        
          },
        procs:{
          日前:{pid:"日前",cpu:0,mem:0,pid2:0,cpu2:0,mem2:0},
          日后:{pid:"日后",cpu:0,mem:0,pid2:0,cpu2:0,mem2:0},
          紫前:{pid:"紫前",cpu:0,mem:0,pid2:0,cpu2:0,mem2:0},
          紫后:{pid:"紫后",cpu:0,mem:0,pid2:0,cpu2:0,mem2:0},
        },        
      } 
    },
    onLoad: function(opts){
      console.log(app.globalData.detail);
      if ((app.globalData.listNo > 0)|(app.globalData.tiyan))
      this.setData({
          detail: app.globalData.detail
      });
    }
});