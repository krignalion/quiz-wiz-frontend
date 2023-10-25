const state = {
  currentUser: {
    username: null,
    email: null,
  },
  isAuthenticated: false,
};

const mutations = {
  setCurrentUser(state, { username, email }) {
    state.currentUser.username = username;
    state.currentUser.email = email;
    state.isAuthenticated = true;
  },
  clearCurrentUser(state) {
    state.currentUser.username = null;
    state.currentUser.email = null;
    state.isAuthenticated = false;
  },
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
};

const actions = {
  setCurrentUser({ commit }, { username, email }) {
    commit('setCurrentUser', { username, email });
  },
  clearCurrentUser({ commit }) {
    commit('clearCurrentUser');
  },
  setIsAuthenticated({ commit }, isAuthenticated) {
    commit('setIsAuthenticated', isAuthenticated);
  },
};

const getters = {
  currentUser: (state) => state.currentUser,
  isAuthenticated: (state) => state.isAuthenticated,
};

export default {
  state,
  mutations,
  actions,
  getters,
};