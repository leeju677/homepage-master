import { plainAxiosInstance, axiosGetIpify } from '../index'

export default {
  /*
  유저의 현재 IP 주소를 구한다.
  */
  async getIpAddr({ commit }) {
    return await new Promise((resolve, reject) => {
      axiosGetIpify('setIpAddr', 'https://api.ipify.org?format=json', commit, resolve, reject);
    })
    /*
    return axiosGetPlain(commit, 'https://api.ipify.org?format=json');
    */
    /*
    return await new Promise((resolve, reject) => {
      plainAxiosInstance
        .get('https://api.ipify.org?format=json')
        .then((resp) => {
          window.console.log('[debug] getIpAddr resp', resp)
          const obj = resp
          if (obj === null || obj === undefined) {
            reject(new Error('API return value is wrong'))
          }
          commit('setIpAddr', obj)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
    */
  },
}