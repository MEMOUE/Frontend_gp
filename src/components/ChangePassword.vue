<template>
  <div class="container mt-5">
    <h2>Changer le mot de passe</h2>
    <form @submit.prevent="changePassword" class="p-fluid">
      <div class="field">
        <label for="currentPassword">Mot de passe actuel:</label>
        <input type="password" v-model="currentPassword" class="form-control" required />
      </div>
      <div class="field">
        <label for="newPassword">Nouveau mot de passe:</label>
        <input type="password" v-model="newPassword" class="form-control" required />
      </div>
      <div class="field">
        <label for="confirmPassword">Confirmer le nouveau mot de passe:</label>
        <input type="password" v-model="confirmPassword" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Changer le mot de passe</button>
    </form>
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
    
    <!-- Include FooterComponent -->
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './FooterComponent.vue';

export default {
  components: {
    FooterComponent
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Les nouveaux mots de passe ne correspondent pas.";
        return;
      }

      try {
        const response = await fetch('/change-password/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCookie('csrftoken')
          },
          body: JSON.stringify({
            current_password: this.currentPassword,
            new_password: this.newPassword
          })
        });

        if (!response.ok) {
          throw new Error('Échec du changement de mot de passe.');
        }

        const data = await response.json();
        if (data.success) {
          this.successMessage = "Mot de passe changé avec succès.";
          this.errorMessage = '';
        } else {
          this.errorMessage = data.error || 'Échec du changement de mot de passe.';
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  }
};
</script>