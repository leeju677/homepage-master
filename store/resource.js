import { axiosPost, axiosGet, axiosDelete } from "./index";

export const state = () => ({
  resource: "",
  resourceList: [],
  resourceResult: null,
});

export default {
  namespaced: true,
  state,
  mutations: {
    setResource(state, resource) {
      state.resource = resource;
    },
    setList(state, list) {
      state.resourceList = list;
    },
    setResult(state, result) {
      state.resourceResult = result;
    },
  },
  getters: {
    resource: (state) => state.resource || "",
    resourceList: (state) => state.resourceList || "",
    resourceResult: (state) => state.resourceResult || "",
  },
  actions: {
    // 2.11	GET – Resource 다건 조회
    async getList({ commit }, params) {
      return await new Promise((resolve, reject) => {
        axiosGet("setList", "/agile/res", params, commit, resolve, reject);
      });
    },

    // 2.12	GET – Resource 단건 조회
    async getData({ commit }, resId) {
      return await new Promise((resolve, reject) => {
        axiosGet(
          "setResource",
          "/agile/res/" + resId,
          null,
          commit,
          resolve,
          reject
        );
      });
    },

    // 2.13	POST – Resource 수정
    async updateData({ commit }, data) {
      return await new Promise((resolve, reject) => {
        axiosPost(
          "setResult",
          "/agile/res/" + data.resId,
          data,
          commit,
          resolve,
          reject
        );
      });
    },

    // 2.14	DELETE – Resource 삭제
    async deleteData({ commit }, resId) {
      return await new Promise((resolve, reject) => {
        axiosDelete(
          "setResult",
          "/agile/res/" + resId,
          null,
          commit,
          resolve,
          reject
        );
      });
    },
  },
};
