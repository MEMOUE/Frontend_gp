<template>
  <div class="register">
    <!-- Section du titre -->
    <h1>Inscription</h1>
    <!-- Formulaire d'inscription -->
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="first_name">Prénom:</label>
        <input type="text" v-model="first_name" id="first_name" required />
      </div>
      <div class="form-group">
        <label for="last_name">Nom:</label>
        <input type="text" v-model="last_name" id="last_name" required />
      </div>
      <div class="form-group">
        <label for="phone">Téléphone:</label>
        <input type="text" v-model="phone" id="phone" required />
      </div>
      <button type="submit" class="submit-btn">S'inscrire</button>
      <!-- Message d'erreur -->
      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="login-link">
        Déjà inscrit ? <router-link to="/login">Connectez-vous ici</router-link>
      </p>
    </form>
  </div>
</template>

<script>
// Importer SweetAlert2
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      error: null, // Gestion des erreurs
      message: null, // Message de succès (optionnel)
    };
  },
  methods: {
    // Méthode d'inscription
    register() {
      // Créer un objet avec les données d'inscription
      const registrationData = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
      };

      console.log("Données d'inscription :", registrationData);
      
      // Appeler l'action Vuex pour l'inscription
      this.$store
        .dispatch('register', registrationData)
        .then(() => {
          // Afficher une alerte SweetAlert2 pour le succès
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Veuillez vérifier votre email pour activer votre compte.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          // Réinitialiser les erreurs
          this.error = null;
        })
        .catch((err) => {
          // Gérer l'erreur et l'afficher
          this.error = err.response?.data?.detail || 'Une erreur est survenue';
          console.error("Échec de l'inscription :", this.error);
          // Réinitialiser le message de succès en cas d'erreur
          this.message = null;
        });
    },
  },
};
</script>

<style scoped>
/* Style de base pour la page d'inscription */
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1em;
}

button.submit-btn {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.submit-btn:hover {
  background-color: #0056b3;
}

/* Styles pour les messages d'erreur */
.error-message {
  color: #d9534f;
  margin-top: 10px;
}

.login-link {
  margin-top: 20px;
  font-size: 1em;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
