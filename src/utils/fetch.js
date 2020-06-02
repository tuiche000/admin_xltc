import queryString from 'query-string'
import { message as Message, Modal } from 'antd'

let BASE = process.env.API_HOST

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
async function commonFetcdh(url, options, method = 'GET', query) {
  const searchStr = queryString.stringify(options)
  let initObj = {}
  const token = JSON.parse(sessionStorage.getItem('token')) && JSON.parse(sessionStorage.getItem('token')).access_token
  // const token = JSON.parse(sessionStorage.getItem('token')) ? JSON.parse(sessionStorage.getItem('token')).access_token : 'sUz4g8tohKk8QWnNlHfYhDiHSCNApSmi'

  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      headers: new Headers({
        'Authorization': `Bearer ${token}`
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
      }),
      body: JSON.stringify(options)
    }
  }
  try {
    let res = await fetch((BASE + '/' + url), initObj)
    // console.log(res.json())
    if (res.status == 401) {
      Modal.error({
        // title: '401',
        content: '登录过期了,请重新登录.',
        onOk() {
          sessionStorage.clear()
          window.location.href = 'http://ticksite.fothing.com/'
        }
      });
      return
    }
    if (res.status > 399) {
      let { message } = await res.json();
      Message.error(message)
      return
    }
    let { code, status, data, message } = await res.json();
    if (code === '0' && status === 'OK') {
      if (data) return data
      return {
        code,
        status
      }
    } else {
      Message.error(message)
      throw new Error();
    }
  } catch (e) {
    
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