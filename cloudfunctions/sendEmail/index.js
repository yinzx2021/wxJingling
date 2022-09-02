// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  auth: {
    user: '342749179@qq.com', //邮箱账号
    pass: 'ecyzeabtyjtwbici' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  let  concent_info = event.mailConent;
  let  concent_title = event.title;
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: '来自用户反馈 <342749179@qq.com>',
    // 主题
    subject: concent_title,
    // 收件人
    to: '342749179@qq.com',
    // 邮件内容，text或者html格式
    text: concent_info //可以是链接，也可以是验证码
  };

  let res = await transporter.sendMail(mail);
  return res;
}
// 云函数入口函数
/*exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/