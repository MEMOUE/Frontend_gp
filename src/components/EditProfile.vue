<template>
  <div class="edit-profile">
    <h1>Modifier le Profil</h1>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="first_name">Prénom:</label>
        <input type="text" v-model="first_name" required />
      </div>
      <div class="form-group">
        <label for="last_name">Nom:</label>
        <input type="text" v-model="last_name" required />
      </div>
      <div class="form-group">
        <label for="telephone">Téléphone:</label>
        <input type="tel" v-model="phone" required pattern="[0-9]{10}" placeholder="0123456789" />
        <small class="help-text">Format: 10 chiffres sans espaces</small>
      </div>
      <button type="submit" class="submit-btn">Sauvegarder</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: this.$store.state.user.email,
      first_name: this.$store.state.user.first_name,
      last_name: this.$store.state.user.last_name,
      phone: this.$store.state.user.phone || '', // Assurez-vous que le téléphone est dans l'état de l'utilisateur
      error: null,
    };
  },
  methods: {
    updateProfile() {
      this.$store
        .dispatch('updateProfile', {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone, // Ajout du téléphone dans la mise à jour
        })
        .then(() => {
          this.$router.push('/profile'); // Redirection vers la page de profil après mise à jour
        })
        .catch((err) => {
          this.error = err.response?.data?.detail || 'Une erreur est survenue'; // Affiche l'erreur
        });
    },
  },
};
</script>

<style scoped>
.edit-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

form {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: #d9534f;
  margin-top: 10px;
}

.help-text {
  font-size: 0.9em;
  color: #666;
}
</style>
