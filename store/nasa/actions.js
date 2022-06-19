import { plainAxiosInstance } from '../index'

export default {
  /*
  지구 인근의 소행성 목록
  */
  async getNeoList({ commit }) {
    return await new Promise((resolve, reject) => {
      plainAxiosInstance
            .get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-04-21&end_date=2022-04-28&api_key=cERNFNDd9cFCCNGmbyB4LOPlPzolRHCXsFN2lKD2')
            .then((resp) => {
            window.console.log('[debug] getNeoList resp', resp)
            const obj = resp
            if (obj === null || obj === undefined) {
                reject(new Error('API return value is wrong'))
            }
            commit('setNeoList', obj)
            resolve(resp)
            })
            .catch((err) => {
            reject(err)
        })
    })
  },
  /*
  화성 탐사 사진
  */
  async getMarsPhoto({ commit }) {
    return await new Promise((resolve, reject) => {
      plainAxiosInstance
        .get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY')
        .then((resp) => {
          window.console.log('[debug] getMarsPhoto resp', resp)
          const obj = resp
          if (obj === null || obj === undefined) {
            reject(new Error('API return value is wrong'))
          }
          commit('setMarsPhoto', obj)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}