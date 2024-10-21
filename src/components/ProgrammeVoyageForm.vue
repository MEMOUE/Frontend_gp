<template>
  <div class="container mt-4">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} un Programme de Voyage</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" v-model="programmeVoyage.titre" class="form-control" id="titre" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="programmeVoyage.description" class="form-control" id="description" placeholder="En Bref" required></textarea>
      </div>
      <div class="mb-3">
        <label for="date_depart" class="form-label">Date de Départ</label>
        <input type="datetime-local" v-model="programmeVoyage.date_depart" class="form-control" id="date_depart" required />
      </div>
      <div class="mb-3">
        <label for="date_arrivee" class="form-label">Date d'Arrivée</label>
        <input type="datetime-local" v-model="programmeVoyage.date_arrivee" class="form-control" id="date_arrivee" required />
      </div>
      <div class="mb-3">
        <label for="pays_depart" class="form-label">Pays de Départ</label>
        <input type="text" v-model="programmeVoyage.pays_depart" class="form-control" id="pays_depart" required />
      </div>
      <div class="mb-3">
        <label for="pays_arrivee" class="form-label">Pays d'Arrivée</label>
        <input type="text" v-model="programmeVoyage.pays_arrivee" class="form-control" id="pays_arrivee" />
      </div>
      <div class="mb-3">
        <label for="telephone" class="form-label">Téléphone</label>
        <input type="tel" v-model="programmeVoyage.telephone" class="form-control" placeholder="+XXX 12345678" id="telephone" required />
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
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      programmeVoyage: {
        titre: '',
        description: '',
        date_depart: '',
        date_arrivee: '',
        pays_depart: '',
        pays_arrivee: '',
        telephone: '',
        logo: null,
      },
      isEditing: false,
    };
  },
  methods: {
    async fetchProgrammeVoyage() {
      const id = this.$route.params.id; // Assuming you're passing the ID via route params
      try {
        const response = await axios.get(`/api/programmes/${id}/`);
        this.programmeVoyage = response.data;
        this.isEditing = true;
      } catch (error) {
        console.error("Erreur lors de la récupération du programme de voyage", error);
        Swal.fire("Erreur", "Impossible de récupérer les données du programme de voyage.", "error");
      }
    },
    handleFileUpload(event) {
      this.programmeVoyage.logo = event.target.files[0]; // Gestion du fichier
    },
    validateTelephone() {
      const phonePattern = /^\+\d{1,3}\d{8,}$/; // Regex for country code + 8 digits
      return phonePattern.test(this.programmeVoyage.telephone);
    },
    async submitForm() {
      if (!this.validateTelephone()) {
        Swal.fire("Erreur", "Le numéro de téléphone doit contenir au moins 8 chiffres avec le code du pays.", "error");
        return;
      }

      const formData = new FormData();
      for (const key in this.programmeVoyage) {
        formData.append(key, this.programmeVoyage[key]);
      }

      try {
        if (this.isEditing) {
          await axios.put(`/api/programmes/${this.$route.params.id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire("Succès", "Programme de voyage modifié avec succès !", "success");
        } else {
          await axios.post('/api/programmes/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire("Succès", "Programme de voyage ajouté avec succès !", "success");
        }
        this.$router.push('/programmes'); // Redirection après succès
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du programme de voyage", error);
        Swal.fire("Erreur", "Une erreur s'est produite lors de l'enregistrement du programme de voyage.", "error");
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.fetchProgrammeVoyage(); // Récupérer les données si on édite
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
