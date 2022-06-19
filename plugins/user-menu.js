import createPersistedState from "vuex-persistedstate";

export default ({ store, req }) => {
	createPersistedState({
		paths: ["usermenu"],
		storage: {
			getItem: (key) => {
				return localStorage.getItem(key);
			},
			setItem: (key, value) => {
				localStorage.setItem(key, value)
			}, 
			removeItem: (key) => {
				localStorage.removeItem(key)
			}
		}
	})(store);
};

