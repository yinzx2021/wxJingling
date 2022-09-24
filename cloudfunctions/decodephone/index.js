// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
 // let code = event.code
 if (event.weRunOrNot){
    try {
      var result = event.weRunData.data.phoneNumber;
        //return result
    } catch (err) {
        throw err
    }
  }
  return {
    result,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}