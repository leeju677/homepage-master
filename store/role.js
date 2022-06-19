import { axiosPost, axiosGet, axiosDelete } from './index'

export const state = () => ({
    role: '',
    roleList: [],
    result: null
})

export default {
    namespaced: true,
    state,
    mutations: {
        setRole(state, role) {
            state.role = role
        },
        setRoleList(state, roleList) {
            state.roleList = roleList
        },
        setResult(state, result) {
            state.result = result
        },
    },
    getters: {
        role: (state) => state.role || '',
        roleList: (state) => state.roleList || '',
        result: (state) => state.result || ''
    },
    actions: {

        //2.6	POST - Role 등록
        async addRole({ commit }, data) {
            return await new Promise((resolve, reject) => {
                axiosPost('setResult', '/agile/roles', data, commit, resolve, reject);
            });
        },
    
        // 2.7	GET – Role 다건 조회
        async getRoleList({ commit }, params) {
            return await new Promise((resolve, reject) => {
                axiosGet('setRoleList', '/agile/roles', params, commit, resolve, reject);
            });
        },
        
        // 2.8	GET – Role 단건 조회
        async getRole({ commit }, roleId) {
            return await new Promise((resolve, reject) => {
                axiosGet('setRole',  '/agile/roles/'+roleId, null, commit, resolve, reject);
            });
        },
    
        // 2.9	POST – Role 수정
        async editRole({ commit }, data) {
            return await new Promise((resolve, reject) => {
                axiosPost('setResult', '/agile/roles/'+data.roleId, data, commit, resolve, reject);
            });
        },
    
        // 2.10	DELETE – Role 삭제
        async deleteRole({ commit }, roleId) {
            return await new Promise((resolve, reject) => {
                axiosDelete('setResult', '/agile/roles/'+roleId, null, commit, resolve, reject);
            });
        },
        
    },
}