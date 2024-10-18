<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
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
      showPassword: false, // État pour afficher ou masquer le mot de passe
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/'); // Redirection vers la page d'accueil après connexion
        })
        .catch((err) => {
          this.error = err.response?.data?.detail || 'Une erreur est survenue'; // Affiche l'erreur
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Inverser l'état de visibilité du mot de passe
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
