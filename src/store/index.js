// store/index.js

import { createStore } from 'vuex';
import axios from '../axios';
import createPersistedState from 'vuex-persistedstate'; // Importez le plugin

const store = createStore({
  state() {
    return {
      user: null,
      offers: [], // Ajoutez l'état pour les offres
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setOffers(state, offers) { // Mutation pour définir les offres
      state.offers = offers;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login/', credentials);
        const { access, refresh } = response.data;
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        // Fetch user details
        const userResponse = await axios.get('/profile/', {
          headers: { Authorization: `Bearer ${access}` },
        });
        commit('setUser', userResponse.data);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register(_, userData) {
      try {
        await axios.post('/register/', userData);
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    async updateProfile({ commit }, userData) {
      try {
        const access = localStorage.getItem('access');
        await axios.put('/profile/update/', userData, {
          headers: { Authorization: `Bearer ${access}` },
        });
        commit('setUser', userData);
      } catch (error) {
        console.error('Profile update failed:', error);
        throw error;
      }
    },
    async fetchOffers({ commit }) { // Action pour charger les offres
      try {
        const response = await axios.get('/offers/'); // Modifiez l'URL selon votre API
        commit('setOffers', response.data);
      } catch (error) {
        console.error('Failed to fetch offers:', error);
        throw error;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      commit('clearUser');
    },
  },
  plugins: [createPersistedState()], // Ajoutez le plugin pour persister l'état
});

export default store;
