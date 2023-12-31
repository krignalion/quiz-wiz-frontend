import { createStore } from 'vuex';
import userModule from './modules/user';
import usersModule from './modules/users';
import userProfileModule from './modules/userProfile';

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
  },
  modules: {
    user: userModule,
    users: usersModule,
    userProfile: userProfileModule,
  }
});

export default store;