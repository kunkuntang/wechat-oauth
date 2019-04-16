class commonResEntity {
  /**
   * 通用的http响应对象实体
   * @param {object} data 响应对象
   * @param {any} data.data 返回的数据
   * @param {string} data.msg 返回的提示信息
   * @param {string} data.status 返回的状态
   * @param {number} data.code 返回的code值
   */
  constructor(data) {
    this.data = data.data || {};
    this.msg = data.msg || '';
    this.status = data.status || 'ok';
    this.code = data.code || 200;
  }
}

function trimStr(str) {
  return str.replace(/\s+/g, "");
}

function isNull(data) {
  // 是否空字符串
  if (isNullStr(data)) return true
  // 判断是不是空对象
  if (isNullObj(data)) return true
  // 判断是不是null & undefined
  if (data !== 0 && !data) return true
}

function isNullStr(str) {
  // 是否空字符串
  if (typeof data === 'string' && data === '') {
    return true
  } else {
    return false
  }
}

function isNullObj(object) {
  if (Object.prototype.toString.call(object) === "[object Object]") {
    return JSON.stringify(data) === '{}'
  } else {
    return false
  }
}

module.exports = {
  commonResEntity,
  trimStr,
  isNull,
  isNullStr,
  isNullObj
}