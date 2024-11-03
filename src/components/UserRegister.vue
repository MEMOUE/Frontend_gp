<template>
  <div class="register">
    <h1>Inscription</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" v-model="password" id="password" required />
        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
      </div>
      <div class="form-group">
        <label for="first_name">Prénom:</label>
        <input type="text" v-model="first_name" id="first_name" required />
        <p v-if="errors.first_name" class="error-message">{{ errors.first_name }}</p>
      </div>
      <div class="form-group">
        <label for="last_name">Nom:</label>
        <input type="text" v-model="last_name" id="last_name" required />
        <p v-if="errors.last_name" class="error-message">{{ errors.last_name }}</p>
      </div>
      <div class="form-group">
        <label for="phone">Téléphone:</label>
        <input type="text" v-model="phone" id="phone" required />
        <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
      </div>
      <button type="submit" class="submit-btn">S'inscrire</button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="login-link">
        Déjà inscrit ? <router-link to="/login">Connectez-vous ici</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      error: null,
      errors: {} // Pour stocker les erreurs spécifiques aux champs
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      // Validation de l'email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = "L'email est requis.";
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = "Veuillez entrer un email valide.";
      }

      // Validation du mot de passe
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!this.password) {
        this.errors.password = "Le mot de passe est requis.";
      } else if (!passwordPattern.test(this.password)) {
        this.errors.password = "Le mot de passe doit comporter au moins 8 caractères, dont majuscule, minuscule et chiffre.";
      }

      // Validation du prénom
      if (!this.first_name) {
        this.errors.first_name = "Le prénom est requis.";
      }

      // Validation du nom
      if (!this.last_name) {
        this.errors.last_name = "Le nom est requis.";
      }

      // Validation du téléphone
      const phonePattern = /^[0-9]{10,}$/;
      if (!this.phone) {
        this.errors.phone = "Le téléphone est requis.";
      } else if (!phonePattern.test(this.phone)) {
        this.errors.phone = "Le numéro de téléphone doit contenir au moins 10 chiffres.";
      }

      // Retourne vrai si aucune erreur
      return Object.keys(this.errors).length === 0;
    },
    register() {
      if (!this.validateForm()) {
        return;
      }

      const registrationData = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
      };

      this.$store
        .dispatch('register', registrationData)
        .then(() => {
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Veuillez vérifier votre email pour activer votre compte.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.error = null;
        })
        .catch((err) => {
          this.error = err.response?.data?.detail || 'Une erreur est survenue';
          console.error("Échec de l'inscription :", this.error);
        });
    },
  },
};
</script>

<style scoped>
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
