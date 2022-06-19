export const state = () => ({
	overlay: false,
	overlayStack: [],
});

export const getters = {
	loadingOverlay: state => state.loading.overlay,
};

export const mutations = {
	START_LOADING(state, id) {
		if (id) {
			if (!state.overlay) state.overlay = true;
			state.overlayStack.push(id);
		} else {
			state.overlay = true;
		}
	},
	FINISH_LOADING(state, id) {
		if (id) {
			if (state.overlayStack.includes(id))
				state.overlayStack = state.overlayStack.filter(i => i !== id);
			if (state.overlayStack.length === 0) {
				state.overlay = false;
			}
		} else {
			state.overlay = false;
		}
	},
};

export const actions = {
	startLoading({ commit }) {
		commit("START_LOADING");
	},
	finishLoading({ commit }) {
		commit("FINISH_LOADING");
	},
};
