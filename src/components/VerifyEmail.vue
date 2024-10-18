<template>
  <div class="verify-email">
    <h1>Email Verification</h1>
    <p v-if="loading">Verifying your email, please wait...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="success">{{ message }} <a href="/login">Ici</a></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      error: null,
      message: null,
    };
  },
  created() {
    const token = this.$route.params.token;
    this.verifyEmail(token);
  },
  methods: {
    async verifyEmail(token) {
      try {
        const response = await axios.get(`http://localhost:8000/verify-email/${token}/`);
        this.message = response.data.message;
        // Optionnel : Redirection après succès
        // this.$router.push('/login');
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = err.response.data.error || 'An error occurred while verifying your email.';
        } else {
          this.error = 'An unexpected error occurred.';
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.verify-email {
  text-align: center;
  margin-top: 50px;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
