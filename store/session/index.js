import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  ipAddr: '',
})

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}