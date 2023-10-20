const state = {
  currentUsername: null, 
};

const mutations = {
  setCurrentUsername(state, username) {
    state.currentUsername = username;
  },
  clearCurrentUsername(state) {
    state.currentUsername = null;
  },
};

const actions = {
  setCurrentUsername({ commit }, username) { 
    commit('setCurrentUsername', username);
  },
  clearCurrentUsername({ commit }) {
    commit('clearCurrentUsername');
  },
};

const getters = {
  currentUsername: state => state.currentUsername, 
};

export default {
  state,
  mutations,
  actions,
  getters,
};
