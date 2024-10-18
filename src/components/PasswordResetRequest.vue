<template>
    <div>
      <h2>Réinitialiser le mot de passe</h2>
      <form @submit.prevent="requestPasswordReset">
        <input v-model="email" type="email" placeholder="Entrez votre email" />
        <button type="submit">Réinitialiser</button>
      </form>
      <p v-if="successMessage">{{ successMessage }}</p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async requestPasswordReset() {
        try {
          await axios.post('http://localhost:8000/api/password_reset/', { email: this.email });
          this.successMessage = 'Email de réinitialisation envoyé. Veuillez vérifier votre boîte mail.';
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = 'Une erreur est survenue lors de la réinitialisation.';
          this.successMessage = '';
        }
      }
    }
  };
  </script>
  