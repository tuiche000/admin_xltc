const BASE = 'http://checking.fothing.com/';

async function fetchJson(url, options = {
  headers: new Headers({
    'Authorization': `Bearer UkIY4dN3AU7aVMA0yIza9LK2tLlxxoy7`
  })
}) {
  try {
    let res = await fetch(BASE + url, options);
    let { code, status, data } = await res.json();
    if (code != '0' && status != 'OK') {
      // console.error(err);
      throw err;
    } else {
      return data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default fetchJson;
