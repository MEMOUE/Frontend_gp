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
        <input type="text" v-model="agenceEmballage.telephone" class="form-control" id="telephone" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="agenceEmballage.email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="pays" class="form-label">Pays</label>
        <input type="text" v-model="agenceEmballage.pays" class="form-control" id="pays" placeholder="Liste de pays ex: Fr,Ca,USA" required />
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
        console.error("Erreur lors de la récupération de l'agence d'emballage", error);
        alert("Impossible de récupérer les données de l'agence.");
      }
    },
    handleFileUpload(event) {
      this.agenceEmballage.logo = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      for (const key in this.agenceEmballage) {
        formData.append(key, this.agenceEmballage[key]);
      }

      try {
        if (this.isEditing) {
          await axios.put(`/api/emballages/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Agence modifiée avec succès !');
        } else {
          await axios.post('/api/emballages/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('Agence ajoutée avec succès !');
        }
        this.$router.push('/api/emballages/');
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'agence", error);
        alert("Une erreur s'est produite lors de l'enregistrement de l'agence.");
      }
    },
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
