// const BASE = 'http://checking.fothing.com/';

// async function fetchJson(url, options = {
//   headers: new Headers({
//     'Authorization': `Bearer UkIY4dN3AU7aVMA0yIza9LK2tLlxxoy7`
//   })
// }) {
//   try {
//     let res = await fetch(BASE + url, options);
//     let { code, status, data } = await res.json();
//     if (code != '0' && status != 'OK') {
//       // console.error(err);
//       throw err;
//     } else {
//       return data;
//     }
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }

// export default fetchJson;

import queryString from 'query-string'

let BASE = 'http://checking.fothing.com/'

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
async function commonFetcdh(url, options, method = 'GET') {
  const searchStr = queryString.stringify(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      headers: new Headers({
        // 'Authorization': `Bearer ${localStorage.getItem('folidayToken')}`
        'Authorization': `Bearer UkIY4dN3AU7aVMA0yIza9LK2tLlxxoy7`
      })
    }
  } else {
    initObj = {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Authorization': `Bearer ${localStorage.getItem('folidayToken')}`,
        'Authorization': `Bearer UkIY4dN3AU7aVMA0yIza9LK2tLlxxoy7`
      }),
      body: JSON.stringify(options)
    }
  }
  try {
    let res = await fetch((BASE + url), initObj)
    let { code, status, data } = await res.json();
    if (code === '0' && status === 'OK') {
      return data
    } else {
      throw new Error(message);
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
 * @param options 请求参数
 */
export async function _POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}

export default commonFetcdh
