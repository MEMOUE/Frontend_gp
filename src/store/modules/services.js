import axios from 'axios';

const state = {
  services: [],
};

const getters = {
  services: (state) => state.services,
};

const actions = {
  async fetchServices({ commit }) {
    try {
      const response = await axios.get('/api/services/'); 
      commit('SET_SERVICES', response.data);
    } catch (error) {
      console.error('Failed to fetch services', error);
    }
  },
};

const mutations = {
  SET_SERVICES(state, services) {
    state.services = services;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
