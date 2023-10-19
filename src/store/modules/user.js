const state = {
  currentUser: null,
};

const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  clearCurrentUser(state) {
    state.currentUser = null;
  },
};

const actions = {
  setCurrentUser({ commit }, user) {
    commit('setCurrentUser', user);
  },
  clearCurrentUser({ commit }) {
    commit('clearCurrentUser');
  },
};

const getters = {
  currentUser: state => state.currentUser,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
