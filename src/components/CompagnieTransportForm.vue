<template>
  <div class="container mt-4">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} une Compagnie de Transport</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3" v-for="(value, key) in compagnie" :key="key">
        <label :for="key" class="form-label">{{ capitalizeFirstLetter(key) }}</label>
        <!-- Condition pour afficher les champs texte, email, téléphone, et url -->
        <input
          v-if="key === 'nom' || key === 'adresse' || key === 'telephone' || key === 'email' || key === 'pays' || key === 'url'"
          :type="key === 'email' ? 'email' : key === 'telephone' ? 'tel' : key === 'url' ? 'url' : 'text'"
          v-model="compagnie[key]"
          class="form-control"
          :id="key"
          required
        />
        <!-- Champ pour le téléchargement du logo -->
        <input v-if="key === 'logo'" type="file" @change="handleFileUpload" class="form-control" id="logo" />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
      <div v-if="loading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </form>
  </div>
</template>


<script>
import axios from '../axios'; // Assurez-vous que axios est correctement configuré

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
      const id = this.$route.params.id; // Assuming you're passing the ID via route params
      try {
        const response = await axios.get(`/api/compagnies/${id}/`);
        this.compagnie = response.data;
        this.isEditing = true;
      } catch (error) {
        console.error("Erreur lors de la récupération de la compagnie", error);
        alert("Impossible de récupérer les données de la compagnie.");
      } finally {
        this.loading = false;
      }
    },
    handleFileUpload(event) {
      this.compagnie.logo = event.target.files[0]; // Gestion du fichier
    },
    async submitForm() {
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
          alert('Compagnie modifiée avec succès !');
        } else {
          await axios.post('/api/compagnies/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Compagnie ajoutée avec succès !');
        }
        this.$router.push('/compagnies'); // Redirection après succès
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de la compagnie", error);
        alert("Une erreur s'est produite lors de l'enregistrement de la compagnie.");
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetchCompagnie(); // Récupérer les données si on édite
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
