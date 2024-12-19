<template>
  <div class="container mt-4">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} une Agence d'Emballage</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom de l'Agence</label>
        <input type="text" v-model="agenceEmballage.nom" class="form-control" id="nom" required />
      </div>
      <div class="mb-3">
        <label for="adresse" class="form-label">Adresse</label>
        <input type="text" v-model="agenceEmballage.adresse" class="form-control" id="adresse" required />
      </div>
      <div class="mb-3">
        <label for="telephone" class="form-label">Téléphone</label>
        <input type="tel" v-model="agenceEmballage.telephone" class="form-control" id="telephone" placeholder="+XXX 12345678" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="agenceEmballage.email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="pays" class="form-label">Pays</label>
        <input type="text" v-model="agenceEmballage.pays" class="form-control" id="pays" placeholder="Liste de pays ex: Fr, Ca, USA" required />
      </div>
      <div class="mb-3">
        <label for="url" class="form-label">URL du site web</label>
        <input type="url" v-model="agenceEmballage.url" class="form-control" id="url" />
      </div>
      <div class="mb-3">
        <label for="logo" class="form-label">Logo</label>
        <input type="file" @change="handleFileUpload" class="form-control" id="logo" />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
    </form>
  </div>
</template>

<script>
import axios from '../axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      agenceEmballage: {
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
        pays: '',
        url: '',
        logo: null,
      },
      isEditing: false,
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchAgenceEmballage();
        }
      },
    },
  },
  methods: {
    async fetchAgenceEmballage() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/emballages/${id}/`);
        this.agenceEmballage = response.data;
        this.isEditing = true;
      } catch (error) {
        this.handleError(error, "Impossible de récupérer les données de l'agence.");
      }
    },
    handleFileUpload(event) {
      this.agenceEmballage.logo = event.target.files[0];
    },
    validateForm() {
      // Validation basique
      if (!this.agenceEmballage.nom || !this.agenceEmballage.adresse || !this.agenceEmballage.telephone || !this.agenceEmballage.email) {
        Swal.fire('Validation', 'Tous les champs obligatoires doivent être remplis.', 'warning');
        return false;
      }
      // Validation pour un numéro de téléphone international avec au moins 8 chiffres après le code pays
      const phoneRegex = /^\+\d{1,3}\s?\d{8,}$/; // Numéro commençant par un code pays, suivi d'au moins 8 chiffres
      if (!phoneRegex.test(this.agenceEmballage.telephone)) {
        Swal.fire('Erreur de validation', 'Le numéro de téléphone doit inclure un code pays et contenir au moins 8 chiffres après celui-ci.', 'warning');
        return false;
      }
      return true;
    },
    async submitForm() {
      if (!this.validateForm()) return;

      const formData = new FormData();
      for (const key in this.agenceEmballage) {
        formData.append(key, this.agenceEmballage[key]);
      }

      try {
        if (this.isEditing) {
          await axios.put(`/api/emballages/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Succès', 'Agence modifiée avec succès !', 'success');
        } else {
          await axios.post('/api/emballages/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Succès', 'Agence ajoutée avec succès !', 'success');
        }
        this.$router.push('/api/emballages/');
      } catch (error) {
        this.handleError(error, "Veuillez vous connecter ou vous reconnecter.");
      }
    },
    handleError(error, defaultMessage) {
      let message = defaultMessage;
      if (error.response) {
        if (error.response.status === 400) {
          message = error.response.data.message || 'Requête invalide. Vérifiez vos données.';
        } else if (error.response.status === 500) {
          message = "Erreur serveur. Veuillez réessayer plus tard.";
        }
      }
      Swal.fire('Erreur', message, 'error');
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchAgenceEmballage();
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
