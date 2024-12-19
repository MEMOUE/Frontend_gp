<template>
  <div class="container">
    <h2>Réinitialisation du mot de passe</h2>
    <form @submit.prevent="requestPasswordReset">
      <div class="form-group">
        <label for="email">Email :</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control"
          placeholder="Entrez votre e-mail"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Envoyer l'email de réinitialisation</button>
    </form>
    <div v-if="message" class="mt-3" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: '',
      messageClass: '',
    };
  },
  methods: {
    async requestPasswordReset() {
      try {
        const response = await axios.post('https://memko.pythonanywhere.com/request-reset-password/', {
          email: this.email,
        });
        this.message = response.data.message || 'Un e-mail de réinitialisation a été envoyé.';
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
