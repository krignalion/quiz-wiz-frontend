import { createStore } from 'vuex';

const store = createStore({
  state: {
    testString: 'This is a test string by vuex.'
  },
  mutations: {
    setTestString: (state, newString) => {
      state.testString = newString;
    }
  },
  actions: {
    updateTestString: ({ commit }, newString) => {
      commit('setTestString', newString);
    }
  },
  getters: {
    getTestString: (state) => state.testString
  }
});

export default store;
  