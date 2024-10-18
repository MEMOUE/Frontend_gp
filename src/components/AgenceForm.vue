<template>
  <div class="container mt-4">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} une Agence de Vente de Billets</h2>
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
        <input type="tel" v-model="agence.telephone" class="form-control" id="telephone" required />
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
        <input type="url" v-model="agence.url" class="form-control" id="url"  />
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
import axios from '../axios'; // Assurez-vous d'avoir configuré axios

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
      const id = this.$route.params.id; // ID passé via les paramètres de route
      try {
        const response = await axios.get(`/api/agences/${id}/`);
        this.agence = response.data;
        this.isEditing = true;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'agence", error);
        alert("Impossible de récupérer les données de l'agence.");
      }
    },
    handleFileUpload(event) {
      this.agence.logo = event.target.files[0]; // Gestion du fichier
    },
    async submitForm() {
      const formData = new FormData();
      for (const key in this.agence) {
        formData.append(key, this.agence[key]);
      }

      try {
        if (this.isEditing) {
          await axios.put(`/api/agences/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Agence modifiée avec succès !');
        } else {
          await axios.post('/api/agences/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Agence ajoutée avec succès !');
        }
        this.$router.push('/agences'); // Redirection après succès
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'agence", error);
        alert("Une erreur s'est produite lors de l'enregistrement de l'agence.");
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetchAgence(); // Récupérer les données si on édite
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
