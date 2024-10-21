<template>
  <div class="container mt-4">
    <h5>{{ isEditing ? 'Modifier' : 'Ajouter' }} une Agence de Vente de Billets</h5>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input type="text" v-model="agence.nom" class="form-control" id="nom" required />
      </div>
      <div class="mb-3">
        <label for="adresse" class="form-label">Adresse</label>
        <input type="text" v-model="agence.adresse" class="form-control" id="adresse" required />
      </div>
      <div class="mb-3">
        <label for="telephone" class="form-label">Téléphone</label>
        <input type="tel" v-model="agence.telephone" class="form-control" id="telephone" placeholder="+XXX 12345678" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="agence.email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="pays" class="form-label">Pays</label>
        <input type="text" v-model="agence.pays" class="form-control" id="pays" required />
      </div>
      <div class="mb-3">
        <label for="url" class="form-label">URL du site web</label>
        <input type="url" v-model="agence.url" class="form-control" id="url" />
      </div>
      <div class="mb-3">
        <label for="logo" class="form-label">Logo</label>
        <input type="file" @change="handleFileUpload" class="form-control" id="logo" />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
      <router-link to="/agences" class="btn btn-secondary">Annuler</router-link>
    </form>
  </div>
</template>

<script>
import axios from '../axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      agence: {
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
  methods: {
    async fetchAgence() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`/api/agences/${id}/`);
        this.agence = response.data;
        this.isEditing = true;
      } catch (error) {
        this.handleError("Impossible de récupérer les données de l'agence.");
      }
    },
    handleFileUpload(event) {
      this.agence.logo = event.target.files[0];
    },
    async submitForm() {
      // Check if telephone has at least 8 digits including country code
      const telephonePattern = /^\+\d{1,3}\d{8,}$/; // Example pattern: +12345678901
      if (!telephonePattern.test(this.agence.telephone)) {
        return this.handleError("Le numéro de téléphone doit contenir au moins 8 chiffres avec le code du pays.");
      }

      const formData = new FormData();
      for (const key in this.agence) {
        formData.append(key, this.agence[key]);
      }

      try {
        if (this.isEditing) {
          await axios.put(`/api/agences/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Succès', 'Agence modifiée avec succès !', 'success');
        } else {
          await axios.post('/api/agences/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Succès', 'Agence ajoutée avec succès !', 'success');
        }
        this.$router.push('/agences');
      } catch (error) {
        this.handleError("Veuillez vous connecter ou vous reconnecter.");
      }
    },
    handleError(message) {
      Swal.fire('Erreur', message, 'error');
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetchAgence();
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
