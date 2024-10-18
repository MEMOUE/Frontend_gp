<template>
  <div class="container mt-4">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} un Transporteur de Colis</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input type="text" v-model="transporteur.nom" class="form-control" id="nom" required />
      </div>
      <div class="mb-3">
        <label for="adresse" class="form-label">Adresse</label>
        <input type="text" v-model="transporteur.adresse" class="form-control" id="adresse" required />
      </div>
      <div class="mb-3">
        <label for="telephone" class="form-label">Téléphone</label>
        <input type="tel" v-model="transporteur.telephone" class="form-control" id="telephone" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="transporteur.email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="url" class="form-label">URL du site web</label>
        <input type="url" v-model="transporteur.url" class="form-control" id="url"  />
      </div>
      <div class="mb-3">
        <label for="pays" class="form-label">Pays</label>
        <input type="text" v-model="transporteur.pays" class="form-control" id="pays" required />
      </div>
      <div class="mb-3">
        <label for="type_transport" class="form-label">Type de Transport</label>
        <select v-model="transporteur.type_transport" class="form-select" id="type_transport" required>
          <option value="terrestre">Terrestre</option>
          <option value="aerien">Aérien</option>
          <option value="maritime">Maritime</option>
        </select>
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
import axios from '../axios'; // Assurez-vous d'avoir configuré axios

export default {
  data() {
    return {
      transporteur: {
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
        pays: '',
        type_transport: 'terrestre',
        url: '',
        logo: null,

      },
      isEditing: false,
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchTransporteur(); // Fetch transporteur details when the ID changes
        }
      },
    },
  },
  methods: {
    async fetchTransporteur() {
      const id = this.$route.params.id; // Assuming you're passing the ID via route params
      try {
        const response = await axios.get(`/api/transporteurs/${id}/`);
        this.transporteur = response.data;
        this.isEditing = true;
      } catch (error) {
        console.error("Erreur lors de la récupération du transporteur", error);
        alert("Impossible de récupérer les données du transporteur.");
      }
    },
    handleFileUpload(event) {
      this.transporteur.logo = event.target.files[0]; // Gestion du fichier
    },
    async submitForm() {
      const formData = new FormData();
      for (const key in this.transporteur) {
        formData.append(key, this.transporteur[key]);
      }

      try {
        if (this.isEditing) {
          await axios.put(`/api/transporteurs/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Transporteur modifié avec succès !');
        } else {
          await axios.post('/api/transporteurs/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Transporteur ajouté avec succès !');
        }
        this.$router.push('/transporteurs'); // Redirection après succès
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du transporteur", error);
        alert("Une erreur s'est produite lors de l'enregistrement du transporteur.");
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetchTransporteur(); // Récupérer les données si on édite
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
