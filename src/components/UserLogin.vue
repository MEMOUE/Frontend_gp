<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <div class="password-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            id="password"
            required
          />
          <button type="button" @click="togglePasswordVisibility" class="toggle-password">
            {{ showPassword ? 'Masquer' : 'Afficher' }}
          </button>
        </div>
        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
      </div>
      <button type="submit" class="submit-btn">Se connecter</button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="signup-link">
        Pas encore inscrit ? <router-link to="/register">Inscrivez-vous ici</router-link>
      </p>
      <p class="signup-link">
        <router-link to="/password-reset">Mot de passe oublié ?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      showPassword: false,
      errors: {}, // Stockage des erreurs spécifiques aux champs
    };
  },
  methods: {
    // Fonction pour valider les champs du formulaire
    validateForm() {
      this.errors = {}; // Réinitialisation des erreurs à chaque soumission

      // Validation de l'email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = "L'email est requis.";
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = "Veuillez entrer un email valide.";
      }

      // Validation du mot de passe
      if (!this.password) {
        this.errors.password = "Le mot de passe est requis.";
      }

      // Retourne vrai si aucune erreur
      return Object.keys(this.errors).length === 0;
    },

    // Fonction de connexion avec gestion des erreurs
    login() {
      if (!this.validateForm()) {
        return;
      }

      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/'); // Redirection vers la page d'accueil après connexion
        })
        .catch((err) => {
          // Vérifie si le message d'erreur provient d'une mauvaise authentification
          if (err.response && err.response.status === 401) {
            this.error = "L'email ou le mot de passe est incorrect. Veuillez réessayer."; // Message d'erreur spécifique
          } else if (err.response && err.response.status === 500) {
            this.error = "Une erreur interne du serveur est survenue. Veuillez réessayer plus tard."; // Erreur serveur
          } else {
            this.error = err.response?.data?.detail || "Une erreur inconnue est survenue."; // Autres erreurs
          }
        });
    },

    // Fonction pour basculer la visibilité du mot de passe
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login {
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

.password-container {
  display: flex;
  align-items: center;
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

button.toggle-password {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-left: 10px;
  font-size: 0.9em;
}

.error-message {
  color: #d9534f;
  margin-top: 10px;
}

.signup-link {
  margin-top: 20px;
  font-size: 1em;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
