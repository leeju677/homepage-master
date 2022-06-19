import { plainAxiosInstance, axiosPost, axiosGet, axiosDelete, axiosPostForm } from './index'

export const state = () => ({
    user: '',
    userResult: null,
    checkResult: null,
})

export default {
  namespaced: true,
  state,
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setResult(state, result) {
      state.userResult = result
    },
    setCheckResult(state, result) {
        state.checkResult = result
    }
  },
  getters: {
    user: (state) => state.user || '',
    userResult: (state) => state.userResult || '',
    checkResult: (state) => state.checkResult || '',
  },
  actions: {

    async getUserAll({ commit }, params) {
      return await new Promise((resolve, reject) => {
        axiosGet('setUser', '/agile/user', params, commit, resolve, reject);
      });
    },

    async getUser({ commit }, userId) {
      return await new Promise((resolve, reject) => {
        axiosGet('setUser',  '/agile/user/'+userId, null, commit, resolve, reject);
      });
    },

    async checkUserId({ commit }, userId) {
        return await new Promise((resolve, reject) => {
          axiosGet('setCheckResult',  '/agile/user/check/'+userId, null, commit, resolve, reject);
        });
      },

    async addUser({ commit }, data) {
      return await new Promise((resolve, reject) => {
        plainAxiosInstance
          .post('http://54.180.179.60:8080/agile/user', data)
          .then((resp) => {
              if(resp.data.returnCode === "S") {
                commit('setResult', resp.data.data)
                resolve(resp.data.data)
              } else {
                reject(resp.data.errorMessage)
              }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    async updateUser({ commit }, data) {
      console.log("updateUser", data.userId, data);
      return await new Promise((resolve, reject) => {
        axiosPost('setResult', '/agile/user/'+ data.userId, data, commit, resolve, reject);
      });
    },

    async deleteUser({ commit }, userId) {
      return await new Promise((resolve, reject) => {
        axiosDelete('setResult', '/agile/user/'+ userId, null, commit, resolve, reject);
      });
    },

    async uploadPhoto({ commit }, data) {
      console.log("uploadPhoto", data);
      return await new Promise((resolve, reject) => {
        axiosPostForm('setResult', '/agile/user/profile', data, commit, resolve, reject);
      });
    },

    async findUserId({ commit }, data) {
      console.log("findUserId", data);
      return await new Promise((resolve, reject) => {
        axiosPost('setResult', '/agile/user/find/userId', data, commit, resolve, reject);
      });
    },

    async changePassword({ commit }, data) {
      return await new Promise((resolve, reject) => {
        plainAxiosInstance
          .post('http://54.180.179.60:8080/agile/user/change/pwd', data)
          .then((resp) => {
              if(resp.data.returnCode === "S") {
                commit('setResult', resp.data.data)
                resolve(resp.data.data)
              } else {
                reject(resp.data.errorMessage)
              }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    async adminLogin({ commit }, data) {
      console.log("adminLogin", data);
      return await new Promise((resolve, reject) => {
        axiosPost('setResult', 'agile/admin/login', data, commit, resolve, reject);
      });
    },

    async getUserAll1({ commit }) {
      return await new Promise((resolve, reject) => {

        plainAxiosInstance
          .get('http://54.180.179.60:8080/agile/user')
          .then((resp) => {
            if (process.env.DEBUG_MODE) {
              console.log('[debug] getUser resp', resp)
            }
            const obj = resp
            if (obj === null || obj === undefined) {
              reject(new Error('API return value is wrong'))
            }
            commit('setUser', obj)
            resolve(resp)
          })
          .catch((err) => {
            if (process.env.DEBUG_MODE) {
              console.log('[debug] getUser error', err)
            }
            reject(err)
          })
      })
    },

    async getTimeout({ commit }) {
      return await new Promise((resolve, reject) => {

        plainAxiosInstance
          .get('http://54.180.179/agile/user')
          .then((resp) => {
            if (process.env.DEBUG_MODE) {
              console.log('[debug] getUser resp', resp)
            }
            const obj = resp
            if (obj === null || obj === undefined) {
              reject(new Error('API return value is wrong'))
            }
            commit('setUser', obj)
            resolve(resp)
          })
          .catch((err) => {
            if (process.env.DEBUG_MODE) {
              console.log('[debug] getUser error', err)
            }
            reject(err)
          })
      })
    },

    async getNetworkError({ commit }) {
      return await new Promise((resolve, reject) => {

        plainAxiosInstance
          .get('http://54.180.179.60:8080/nowhere/agile/user')
          .then((resp) => {
            if (process.env.DEBUG_MODE) {
              console.log('[debug] getUser resp', resp)
            }
            const obj = resp
            if (obj === null || obj === undefined) {
              reject(new Error('API return value is wrong'))
            }
            commit('setUser', obj)
            resolve(resp)
          })
          .catch((err) => {
            if (process.env.DEBUG_MODE) {
              console.log('[debug] getUser error', err)
            }
            reject(err)
          })
      })
    },

  },
}
