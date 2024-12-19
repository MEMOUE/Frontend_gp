<template>
  <div class="container">
    <h2>Réinitialisation de votre mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="password">Nouveau mot de passe :</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          placeholder="Entrez votre nouveau mot de passe"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirm_password">Confirmer le mot de passe :</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirm_password"
          class="form-control"
          placeholder="Confirmez votre mot de passe"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Réinitialiser le mot de passe</button>
    </form>
    <div v-if="message" class="mt-3" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['uid', 'token'], // Paramètres de l'URL
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: '',
      messageClass: '',
    };
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.message = 'Les mots de passe ne correspondent pas.';
        this.messageClass = 'alert alert-danger';
        return;
      }

      try {
        const response = await axios.post(`https://memko.pythonanywhere.com/reset-password/${this.token}/`, {
          uid: this.uid,
          password: this.password,
          confirm_password: this.confirmPassword,
        });
        this.message = response.data.message || 'Mot de passe réinitialisé avec succès.';
        this.messageClass = 'alert alert-success';
      } catch (error) {
        this.message = error.response.data.error || 'Une erreur est survenue.';
        this.messageClass = 'alert alert-danger';
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>
