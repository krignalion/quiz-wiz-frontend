 import axiosInstance from '@/services/axiosInstance'

const state = {
  userInfo: {
    id: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    image_path: null,
  },
  saveError: null,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setSaveError(state, error) {
    state.saveError = error;
  },
  clearUserInfo(state) {
    state.userInfo.username = null;
    state.userInfo.email = null;
    state.userInfo.first_name = null;
    state.userInfo.last_name = null;
    state.userInfo.image_path = null;
  },
};

const actions = {
  async fetchUserInfo({ commit }, userId) {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      axiosInstance.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;
      const response = await axiosInstance.get(`/users/${userId}/`);
      commit('setUserInfo', response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        commit('setUserInfo', null);
        throw new Error('User is not found');
      } else {
        console.error('Error fetching user information:', error);
        throw error;
      }
    }
  },
  async updateUserInfo({ commit }, updatedUserInfo) {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      axiosInstance.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;
      const { username, email, first_name, last_name, password } = updatedUserInfo;
      const response = await axiosInstance.put(`/users/${updatedUserInfo.id}/`, {
        username,
        email,
        first_name,
        last_name,
        password,
      });
      commit('setUserInfo', response.data);
      commit('setSaveError', null);
    } catch (error) {
      commit('setSaveError', error.response.data.detail); 
      throw error;
    }
  },
};

const getters = {
  getUserInfo: (state) => state.userInfo,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
