import axiosInstance from '@/services/axiosInstance'

const state = {
  userList: { results: [], count: 0 },
};

const mutations = {
  setUserList(state, userList) {
    state.userList = userList;
  },
};

const actions = {
  async fetchAndSetUserList({ commit }, page = 1) {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      axiosInstance.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;
      const response = await axiosInstance.get(`/users/?page=${page}`);
      commit('setUserList', response.data);
    } catch (error) {
      console.error('Error fetching and setting user list:', error);
    }
  },
};

const getters = {
  userList: state => state.userList,
  paginationTotalPages: state => {
    const count = state.userList.count;
    if (count <= 10) {
      return 1;
    } else {
      return Math.ceil(count / 10);
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
