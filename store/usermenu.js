export const state =() => ({
	menuList: [
	]	
});

// export const getters = {
// 	menuList: state => state.menuList,
// };

export const mutations = {
	SETMENU(state, menuList) {
		state.menuList = menuList;
	},
	CLEARMENU(state) {
		state.menuList = null;
	},
};

export const actions = {
    setMenu({ commit }, { menuList }) {
      commit("SETMENU", menuList);
    },
  
    claerMenu({ commit }) {
      commit("CLEARMENU");
    },
  };
  