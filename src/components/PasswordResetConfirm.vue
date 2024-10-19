<template>
    <div>
      <h2>Réinitialiser votre mot de passe</h2>
      <form @submit.prevent="resetPassword">
        <input v-model="newPassword" type="password" placeholder="Nouveau mot de passe" />
        <input v-model="confirmPassword" type="password" placeholder="Confirmer le mot de passe" />
        <button type="submit">Réinitialiser</button>
      </form>
      <p class="text-success" v-if="successMessage">{{ successMessage }}</p>
      <p class="text-danger" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['uid', 'token'],
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async resetPassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.errorMessage = 'Les mots de passe ne correspondent pas.';
          return;
        }
        try {
          await axios.post('https://memko.pythonanywhere.com/api/password_reset/confirm/', {
            uid: this.uid,
            token: this.token,
            new_password1: this.newPassword,
            new_password2: this.confirmPassword
          });
          this.successMessage = 'Mot de passe réinitialisé avec succès.';
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = 'Une erreur est survenue lors de la réinitialisation.';
          this.successMessage = '';
        }
      }
    }
  };
  </script>
  