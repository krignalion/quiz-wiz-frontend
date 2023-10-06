import { createStore } from 'vuex';

const store = createStore({
  state: {
    testString: 'This is a test string by vuex.'
  },
  getters: {
    getTestString: (state) => state.testString
  },
  actions: {
    updateTestString: ({ commit }, newString) => {
      commit('setTestString', newString);
    }
  },
  mutations: {
    setTestString: (state, newString) => {
      state.testString = newString;
    }
  }
});

export default store;
