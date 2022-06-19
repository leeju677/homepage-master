
/**
 * 참조
 * http://ccambo.github.io/Dev/Nuxt/6.how-to-use-axios-in-nuxt/
 */

import axios from 'axios'

let HOST = process.env.API_URL;
//let HOST = "http://54.180.179.60:8080";

export const plainAxiosInstance = axios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const nasaAxiosInstance = axios.create({
  baseURL: 'https://api.nasa.gov',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const axiosInstanceIpify = axios.create({
  baseURL: 'https://api.ipify.org',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const axiosInstanceCredentials = axios.create({
  baseURL: process.env.API_URL, //'http://54.180.179.60:8080', //process.env.API_HOST + ":"+ process.env.API_PORT, //
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const axiosFormInstanceCredentials = axios.create({
  baseURL: process.env.API_URL, //'http://54.180.179.60:8080', //process.env.API_HOST + ":"+ process.env.API_PORT, //
  withCredentials: false,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const axiosGet = ((target, url, params, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosGet ', target, url, params)
  }
  axiosInstanceCredentials.get(url, { params: params })
  .then((resp) => {
    if (process.env.DEBUG_MODE) {
      console.log('[RESPONSE] axiosGet resp', resp)
    }
    const obj = resp
    if (obj === null || obj === undefined) {
      console.log('[RESPONSE] axiosGet error :: API return value is wrong')
      reject(new Error('API return value is wrong'))
    }
    if (target) {
      commit(target, obj.data.data)
    }
    resolve(resp)
  })
  .catch((err) => {
    if (process.env.DEBUG_MODE) {
      console.log('[RESPONSE] axiosGet error ==>', err)
    }
    reject(err)
  })

});


export const axiosGetData = ((target, url, data, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosGetData ', target, url, data)
  }
  axiosInstanceCredentials.get(url, { data: data })
  .then((resp) => {
    if (process.env.DEBUG_MODE) {
      console.log('[RESPONSE] axiosGet resp', resp)
    }
    const obj = resp
    if (obj === null || obj === undefined) {
      console.log('[RESPONSE] axiosGet error :: API return value is wrong')
      reject(new Error('API return value is wrong'))
    }
    if (target) {
      commit(target, obj)
    }
    resolve(resp)
  })
  .catch((err) => {
    if (process.env.DEBUG_MODE) {
      console.log('[RESPONSE] axiosGet error ==>', err)
    }
    reject(err)
  })
});

const reqPost = ((target, url, data, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosPost ', target, url, data)
  }
  axiosInstanceCredentials.post(url, data)
    .then((resp) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPost resp', resp)
      }
      const obj = resp
      if (obj === null || obj === undefined) {
        console.log('[RESPONSE] axiosPost error :: API return value is wrong')
        reject(new Error('API return value is wrong'))
      }
      if (target) {
        commit(target, obj)
      }
      resolve(resp)
    })
    .catch((err) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPost error ==>', err)
      }
      reject(err)
    })
});
export const axiosPost = ((target, url, data, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosPost ', target, url, data)
  }
  axiosInstanceCredentials.post(url, data)
    .then((resp) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPost resp', resp)
      }
      const obj = resp
      if (obj === null || obj === undefined) {
        console.log('[RESPONSE] axiosPost error :: API return value is wrong')
        reject(new Error('API return value is wrong'))
      }
      if (target) {
        commit(target, obj)
      }
      resolve(resp)
    })
    .catch((err) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPost error ==>', err)
      }
      reject(err)
    })
});

const reqPostForm = ((target, url, data, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosPost ', target, url, data)
  }
  axiosFormInstanceCredentials.post(url, data)
    .then((resp) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPost resp', resp)
      }
      const obj = resp
      if (obj === null || obj === undefined) {
        console.log('[RESPONSE] axiosPost error :: API return value is wrong')
        reject(new Error('API return value is wrong'))
      }
      if (target) {
        commit(target, obj)
      }
      resolve(resp)
    })
    .catch((err) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPost error ==>', err)
      }
      reject(err)
    })
});
export const axiosPostForm = reqPostForm;

const reqPut = ((target, url, data, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosPut ', target, url, data)
  }
  axiosInstanceCredentials.put(url, data)
    .then((resp) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPut resp', resp)
      }
      const obj = resp
      if (obj === null || obj === undefined) {
        console.log('[RESPONSE] axiosPut error :: API return value is wrong')
        reject(new Error('API return value is wrong'))
      }
      if (target) {
        commit(target, obj)
      }
      resolve(resp)
    })
    .catch((err) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosPut error ==>', err)
      }
      reject(err)
    })
});
export const axiosPut = reqPut;

const reqDelete = ((target, url, data, commit, resolve, reject) => {
  if (process.env.DEBUG_MODE) {
    console.log('[REQUEST] axiosDelete ', target, url, data)
  }
  axiosInstanceCredentials.delete(url, data)
    .then((resp) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosDelete resp', resp)
      }
      const obj = resp
      if (obj === null || obj === undefined) {
        console.log('[RESPONSE] axiosDelete error :: API return value is wrong')
        reject(new Error('API return value is wrong'))
      }
      if (target) {
        commit(target, obj)
      }
      resolve(resp)
    })
    .catch((err) => {
      if (process.env.DEBUG_MODE) {
        console.log('[RESPONSE] axiosDelete error ==>', err)
      }
      reject(err)
    })
});
export const axiosDelete = reqDelete;

const reqGetIpify = ((target, url, commit, resolve, reject) => {
  axiosInstanceIpify.get(url)
    .then((resp) => {
      if (process.env.DEBUG_MODE) {
        console.log('[debug] axiosGetIpify resp', resp)
      }
      const obj = resp
      if (obj === null || obj === undefined) {
        console.log('[debug] axiosGetIpify error :: API return value is wrong')
        reject(new Error('API return value is wrong'))
      }
      if (target) {
        commit(target, obj)
      }
      resolve(resp)
    })
    .catch((err) => {
      if (process.env.DEBUG_MODE) {
        console.log('[debug] axiosGetIpify error ==>', err)
      }
      reject(err)
    })
});
export const axiosGetIpify = reqGetIpify;

/*
NUXT에 AXIOS 적용하기
http://ccambo.github.io/Dev/Nuxt/6.how-to-use-axios-in-nuxt/

// 환경 설정을 통해 모듈 등록을 했으므로 추가로 axios 모듈을 import할 필요는 없다.

export const state = () => ({
  loadedPosts: []
});
export const mutations = {
      // ...
};
export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    try {
      // nuxtServerInit 에서는 axios.get() -> app.$asxios.$get() 을 사용하고
      // nuxt.config.js에 BASE_URL을 설정했기 때문에 상대 경로만 설정하면 되고
      // 결과는 데이터만 추출되기 때문에 Data를 바로 사용할 수 있다.
      const data = await app.$axios.$get('/posts.json')
      const postsList = []
      for (let key in data) {
        postsList.push({ ...data[key], id: key })
      }
    } catch (e) {
      console.error(e)
    }
  },
  setPosts({ commit }, posts) { commit('setPosts', posts) },
  createPost({ commit }, createdPost) {
    createdPost.createdDate = new Date().toLocaleString();
    createdPost.updatedDate = createdPost.createdDate
    // actions 메서드 내부에서는 this.$axios를 사용하고
    // BASE_URL 설정에 따라서 상대 경로만 설정하고
    // data 바로 사용
    return this.$axios.$post('posts.json', createdPost)
      .then(data => {
        commit('createPost', { ...createdPost, id: data.name })
      })
      .catch(e => console.error(e))
  },
  updatePost({ commit }, updatedPost) {
    updatePost.updatedDate = new Date().toLocaleString()
    // actions 메서드 내부에서는 this.$axios를 사용하고
    // BASE_URL 설정에 따라서 상대 경로만 설정하고
    // data 바로 사용
    return this.$axios.$put('/posts/${updatedPost.id}.json', updatedPost)
      .then(data => {
        commit('updatePost', updatedPost)
      })
      .catch(e => console.error(e))
  }
};
export const getters = {
  loadedPosts(state) { return this.loadedPosts }
};
*/
