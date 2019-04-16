const request = require('request');
const utils = require('./lib/util.js')
const { commonResEntity, isNullStr } = utils

/**
 * 获取access_token
 * @param {object} options 配置
 * @param {object} options.APPID 第三方用户唯一凭证
 * @param {object} options.APPSECRET 第三方用户唯一凭证密钥，即appsecret
 */
function getAccessToken({
  APPID = '',
  APPSECRET = ''
}) {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
  const errMsgMap = {
    '-1': '系统繁忙，此时请开发者稍候再试',
    '0': '请求成功',
    '40001': 'AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性',
    '40002': '请确保grant_type字段值为client_credential',
    '40164': '调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置。（小程序及小游戏调用不要求IP地址在白名单内。）'
  }

  if (isNullStr(APPID)) {
    console.log('APPID为空！');
    return false;
  }
  if (isNullStr(APPSECRET)) {
    console.log('APPSECRET为空！');
    return false;
  }

  return new Promise((resolve, reject) => {
    // 向微信服务器发起请求
    try {
      request.get(url).on('response', function (response) {
        let buf = ''
        response.on('data', function (chunk) {
          buf += chunk
        })
        response.on('end', function () {
          const result = JSON.parse(buf)
          console.log('result', buf)
          let msg = ''
          if (result.errcode) {
            msg = errMsgMap[result.errcode.toString()]
            resolve(new commonResEntity({
              data: result,
              msg,
              code: 200,
              status: 'false'
            }))
          } else {
            msg = '获取access_token成功！'
            resolve(new commonResEntity({
              data: result,
              msg,
              code: 200,
              status: 'ok'
            }))
          }
        })
      })
    } catch (error) {
      reject(new commonResEntity({
        data: error,
        msg: '获取失败！',
        code: 500,
        status: 'false'
      }))
    }
  })
}

module.exports = {
  getAccessToken
}