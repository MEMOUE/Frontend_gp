<template>
  <div class="container mt-4">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} une Compagnie de Transport</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3" v-for="(value, key) in compagnie" :key="key">
        <label :for="key" class="form-label">{{ capitalizeFirstLetter(key) }}</label>
        <input
          v-if="key === 'nom' || key === 'adresse' || key === 'telephone' || key === 'email' || key === 'pays' || key === 'url'"
          :type="key === 'email' ? 'email' : key === 'telephone' ? 'tel' : key === 'url' ? 'url' : 'text'"
          v-model="compagnie[key]"
          class="form-control"
          :id="key"
          required
        />
        <input v-if="key === 'logo'" type="file" @change="handleFileUpload" class="form-control" id="logo" />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
      <div v-if="loading" class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      compagnie: {
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
        pays: '',
        url: '',
        logo: null,
      },
      isEditing: false,
      loading: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async fetchCompagnie() {
      this.loading = true;
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/compagnies/${id}/`);
        this.compagnie = response.data;
        this.isEditing = true;
      } catch (error) {
        this.handleError(error, "Impossible de récupérer les données de la compagnie.");
      } finally {
        this.loading = false;
      }
    },
    handleFileUpload(event) {
      this.compagnie.logo = event.target.files[0];
    },
    validateForm() {
      // Validation pour le numéro de téléphone
      const phoneRegex = /^(\+\d{1,3})?\d{8,}$/; // Vérifie que le numéro de téléphone commence par un code de pays optionnel et contient au moins 8 chiffres
      if (!phoneRegex.test(this.compagnie.telephone)) {
        Swal.fire('Erreur de validation', 'Le numéro de téléphone doit contenir au moins 8 chiffres, incluant le code du pays.', 'warning');
        return false;
      }
      return true;
    },
    async submitForm() {
      if (!this.validateForm()) return; // Appel à la méthode de validation

      this.loading = true;
      const formData = new FormData();
      Object.keys(this.compagnie).forEach((key) => {
        formData.append(key, this.compagnie[key]);
      });

      try {
        if (this.isEditing) {
          await axios.put(`/api/compagnies/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Succès', 'Compagnie modifiée avec succès !', 'success');
        } else {
          await axios.post('/api/compagnies/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Succès', 'Compagnie ajoutée avec succès !', 'success');
        }
        this.$router.push('/compagnies');
      } catch (error) {
        this.handleError(error, "Veuillez vous connecter ou vous reconnecter.");
      } finally {
        this.loading = false;
      }
    },
    handleError(error, defaultMessage) {
      let message = defaultMessage;
      if (error.response) {
        if (error.response.status === 400) {
          message = error.response.data.message || 'Requête invalide. Veuillez vérifier les champs.';
        } else if (error.response.status === 500) {
          message = "Erreur interne du serveur. Veuillez réessayer plus tard.";
        }
      }
      Swal.fire('Erreur', message, 'error');
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchCompagnie();
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
