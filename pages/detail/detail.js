var app = getApp();
Page({
    data: {//detail.sys.hostname
        detail: getApp().globalData.detail,
        /*{sys:{hostname:"JWF0016F",uptime:"220188",
        cpus:{percent:"8部",list:{
          日前1:{index:"1",percent:"70",free:"80",total:"32",trans:"fz"},
          日前2:{percent:"12",free:"22",total:"45",trans:"fz"},
          日后1:{percent:"70",free:"80",total:"32",trans:"nfz"},
          日后2:{percent:"12",free:"22",total:"45",trans:"nfz"},
          紫前1:{percent:"70",free:"80",total:"32",trans:"fz"},
          紫前2:{percent:"12",free:"22",total:"45",trans:"fz"},
          紫后1:{percent:"70",free:"80",total:"32",trans:"nfz"},
          紫后2:{percent:"12",free:"22",total:"45",trans:"nfz"}
        }},
        mem:{percent:"0",free:"0"},
      },
        
      }*/
    },
    onLoad: function(opts){
      console.log(getApp().globalData.detail);
      this.setData({
          detail: getApp().globalData.detail
      });
    }
});