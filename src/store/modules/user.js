const state = {
  currentUser: {
    username: null,
    email: null,
    user_id: null,
  },
  isAuthenticated: false,
};

const mutations = {
  setCurrentUser(state, { user_id, username, email }) {
    state.currentUser.username = username;
    state.currentUser.email = email;
    state.currentUser.user_id = user_id;
    state.isAuthenticated = true;
  },
  clearCurrentUser(state) {
    state.currentUser.username = null;
    state.currentUser.email = null;
    state.currentUser.user_id = null,

    state.isAuthenticated = false;
  },
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
};

const actions = {
  setCurrentUser({ commit }, {user_id, username, email }) {
    commit('setCurrentUser', {user_id, username, email });
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
