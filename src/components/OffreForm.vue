<template>
    <div class="container mt-4">
   
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="nom" class="form-label">Nom de l'Offre</label>
          <input type="text" v-model="offre.nom" class="form-control" id="nom" required />
        </div>
        <div class="mb-3">
          <label for="telephone" class="form-label">Téléphone</label>
          <input type="text" v-model="offre.telephone" class="form-control" id="telephone" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea v-model="offre.description" class="form-control" id="description" rows="3" required></textarea>
        </div>
        <div class="mb-3">
          <label for="date_limite" class="form-label">Date Limite</label>
          <input type="datetime-local" v-model="offre.date_limite" class="form-control" id="date_limite" />
        </div>
        <button type="submit" class="btn btn-primary">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Assurez-vous que axios est correctement configuré
  
  export default {
    data() {
      return {
        offre: {
          nom: '',
          telephone: '',
          description: '',
          date_limite: null,
        },
        isEditing: false,
      };
    },
    watch: {
      '$route.params.id': {
        immediate: true,
        handler(newId) {
          if (newId) {
            this.fetchOffre();
          }
        },
      },
    },
    methods: {
      async fetchOffre() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`/api/offres/${id}/`);
          this.offre = response.data;
          this.isEditing = true;
        } catch (error) {
          console.error("Erreur lors de la récupération de l'offre", error);
          alert("Impossible de récupérer les données de l'offre.");
        }
      },
      async submitForm() {
        try {
          if (this.isEditing) {
            // Modification de l'offre
            await axios.put(`/api/offres/${this.$route.params.id}/`, this.offre);
            alert('Offre modifiée avec succès !');
          } else {
            // Ajout d'une nouvelle offre
            await axios.post('/api/offres/', this.offre);
            alert('Offre ajoutée avec succès !');
          }
          this.$router.push('/offres');
        } catch (error) {
          console.error("Erreur lors de l'enregistrement de l'offre", error);
          alert("Une erreur s'est produite lors de l'enregistrement de l'offre.");
        }
      },
    },
    created() {
      if (this.$route.params.id) {
        this.fetchOffre();
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
  