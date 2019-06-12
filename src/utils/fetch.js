import queryString from 'query-string'
import { message, Modal } from 'antd'

let BASE = 'http://checking.fothing.com/'
// let BASE = 'http://lt.loiot.com/'

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
async function commonFetcdh(url, options, method = 'GET', query) {
  const searchStr = queryString.stringify(options)
  let initObj = {}
  // const token = JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).access_token || 'UkIY4dN3AU7aVMA0yIza9LK2tLlxxoy7'
  const token = JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).access_token || 'UkIY4dN3AU7aVMA0yIza9LK2tLlxxoy7'

  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      headers: new Headers({
        'Authorization': `Bearer ${token}`
        // 'Authorization': `Bearer 00Qu0CAjtS8txW4GLjHLqaQXpKYzr3pg`
      })
    }
  } else {
    if (query) url += '?' + queryString.stringify(query)
    initObj = {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`,
        // 'Authorization': `Bearer 00Qu0CAjtS8txW4GLjHLqaQXpKYzr3pg`
      }),
      body: JSON.stringify(options)
    }
  }
  try {
    let res = await fetch((BASE + url), initObj)
    if (res.status == 401) {
      Modal.error({
        // title: '401',
        content: '登录过期了,请重新登录.',
        onOk() {
          localStorage.clear()
          message.warning('登录过期')
          window.history.go('/')
        }
      });
    }
    let { code, status, data, message } = await res.json();
    if (code === '0' && status === 'OK') {
      if (data) return data
      return {
        code,
        status
      }
    } else {
      message.error(message)
      throw new Error();
    }
  } catch (e) {
    console.log(e)
  } finally {
  }
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
export async function _GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options body请求参数
 * @param query query请求参数
 */
export async function _POST(url, options, query) {
  return commonFetcdh(url, options, 'POST', query)
}

/**
 * DELETE请求
 * @param url 请求地址
 * @param options body请求参数
 * @param query query请求参数
 */
export async function _DELETE(url, options, query) {
  return commonFetcdh(url, options, 'DELETE', query)
}

/**
 * PUT请求
 * @param url 请求地址
 * @param options body请求参数
 * @param query query请求参数
 */
export async function _PUT(url, options, query) {
  return commonFetcdh(url, options, 'PUT', query)
}

export default commonFetcdh