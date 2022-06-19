import { getFirebaseBackend } from "../helpers/firebase/authUtils";
import {
  plainAxiosInstance,
} from "./index";

export const state = () => ({
  //currentUser: sessionStorage.getItem('authUser'),
  currentUser: localStorage.getItem("auth.currentUser"),
  publicKey: localStorage.getItem("auth.publicKey"),
});

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState("auth.currentUser", newValue);
    console.log("SET_CURRENT_USER", newValue);
  },
  SET_PUBLIC_KEY(state, key) {
    state.publicKey = key;
    saveState("auth.publicKey", key);
    console.log("SET_PUBLIC_KEY", key);
  },
  LOGOUT(state) {
    state.currentUser = {};
    removeState("auth.currentUser");
  },
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },
  currentUser: (state) =>
    (typeof state.currentUser == "string"
      ? JSON.parse(state.currentUser)
      : state.currentUser) || {},
  publicKey: (state) =>
    (typeof state.publicKey == "string"
      ? JSON.parse(state.publicKey)
      : state.publicKey) || {},
};

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  // eslint-disable-next-line no-unused-vars
  init({ state, dispatch }) {
    dispatch("validate");
  },

  async getPublicKey({ commit, dispatch, getters }, { data }) {
    return await new Promise((resolve, reject) => {
      plainAxiosInstance
        .get("http://54.180.179.60:8080/agile/auth/getPublicKey", data)
        .then((resp) => {
          if (resp.data.returnCode === "S") {
            commit("SET_PUBLIC_KEY", resp.data.data);
            resolve(resp.data.data);
          } else {
            reject(resp.data.errorMessage);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch("validate");

    return getFirebaseBackend()
      .loginUser(email, password)
      .then((response) => {
        const user = response;
        commit("SET_CURRENT_USER", user);
        return Promise.resolve(user);
      });
  },

  async logInAdmin({ commit, dispatch, getters }, { data }) {
    //if (getters.loggedIn) return dispatch('validate')
    return await new Promise((resolve, reject) => {
      plainAxiosInstance
        .post("http://54.180.179.60:8080/agile/login", data)
        .then((resp) => {
          console.log("logInAdmin", resp);
          if (resp.data.returnCode === "S") {
            commit("SET_CURRENT_USER", resp.data.data);
            resolve(resp.data.data);
          } else {
            reject(resp.data.errorMessage);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Logs out the current user.
  logOut({ commit }) {
    // eslint-disable-next-line no-unused-vars
    commit("LOGOUT");
    // TODO api logout
    // return new Promise((resolve, reject) => {
    //     // eslint-disable-next-line no-unused-vars
    //     getFirebaseBackend().logout().then((response) => {
    //         resolve(true);
    //     }).catch((error) => {
    //         reject(this._handleError(error));
    //     })
    // });
  },

  // register the user
  register({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch("validate");

    return getFirebaseBackend()
      .registerUser(email, password)
      .then((response) => {
        const user = response;
        commit("SET_CURRENT_USER", user);
        return user;
      });
  },

  // register the user
  // eslint-disable-next-line no-unused-vars
  resetPassword({ commit, dispatch, getters }, { email } = {}) {
    if (getters.loggedIn) return dispatch("validate");

    return getFirebaseBackend()
      .forgetPassword(email)
      .then((response) => {
        const message = response.data;
        return message;
      });
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  // eslint-disable-next-line no-unused-vars
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null);
    const user = getFirebaseBackend().getAuthenticatedUser();
    commit("SET_CURRENT_USER", user);
    return user;
  },
};

// ===
// Private helpers
// ===

function saveState(key, state) {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(state));
  }
}
function removeState(key) {
  if (process.browser) {
    localStorage.removeItem(key);
  }
}
