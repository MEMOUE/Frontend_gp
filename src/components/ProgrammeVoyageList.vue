<template>
  <div class="container mt-4">
    <h1>Programmes de Voyage</h1>
    <router-link to="/programmes/new" class="btn btn-primary mb-3">Ajouter un Programme</router-link>
    
    <!-- Grid for Cards -->
    <div class="row">
      <div v-for="programme in programmes" :key="programme.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <!-- Logo of the Programme -->
          <img v-if="programme.logo" :src="programme.logo" alt="Logo" class="card-img-top" />

          <div class="card-body">
            <h5 class="card-title">{{ programme.titre }}</h5>
            <p class="card-text">{{ programme.description }}</p>
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Date de Départ :</strong> {{ formatDate(programme.date_depart) }}</li>
            <li class="list-group-item"><strong>Date d'Arrivée :</strong> {{ formatDate(programme.date_arrivee) }}</li>
            <li class="list-group-item"><strong>Pays de Départ :</strong> {{ programme.pays_depart }}</li>
            <li class="list-group-item"><strong>Pays d'Arrivée :</strong> {{ programme.pays_arrivee || 'Non spécifié' }}</li>
            <li class="list-group-item"><strong>Téléphone :</strong> {{ programme.telephone || 'Non disponible' }}</li>
          </ul>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <!-- Action Icons -->
            <div>
              <router-link v-if="isOwner(programme.user)" :to="`/programmes/${programme.id}/edit`">
                <i class="fas fa-edit text-warning" title="Modifier"></i>
              </router-link>
              <i v-if="isOwner(programme.user)" class="fas fa-trash text-danger mx-4" title="Supprimer" @click="deleteProgramme(programme.id)"></i>
            </div>

            <!-- Contact Icons -->
            <div class="contact-icons">
              <a :href="`mailto:?subject=${programme.titre}&body=${programme.description} - ${programme.url}`" target="_blank">
                <i class="fas fa-envelope text-success" title="Envoyer par Email"></i>
              </a>
              <a :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(programme.url)}`" target="_blank">
                <i class="fab fa-whatsapp text-success mx-5" title="Partager sur WhatsApp"></i>
              </a>
              <a v-if="programme.telephone" :href="`tel:${programme.telephone}`" target="_blank">
                <i class="fas fa-phone text-primary" title="Appeler"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message si aucun programme n'est disponible -->
    <p v-if="programmes.length === 0" class="text-warning">Aucun programme de voyage disponible.</p>

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '../axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      programmes: [],
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async fetchProgrammes() {
      try {
        const response = await axios.get('/api/programmes/');
        // Filtrer les programmes dont la date de départ n'est pas passée
        const currentDate = new Date();
        this.programmes = response.data.filter(programme => new Date(programme.date_depart) >= currentDate);
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des programmes';
        console.error(this.errorMessage, error);
      }
    },
    async deleteProgramme(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
        try {
          await axios.delete(`/api/programmes/${id}/`);
          this.fetchProgrammes();
        } catch (error) {
          this.errorMessage = 'Erreur lors de la suppression du programme';
          console.error(this.errorMessage, error);
        }
      }
    },
    isOwner(ownerId) {
      return this.user && this.user.id === ownerId;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR'); // Format de date amélioré
    },
  },
  created() {
    this.fetchProgrammes();
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: auto;
  max-width: 280px; /* Réduit la largeur maximale de la carte */
}

.card-img-top {
  height: 100px; /* Réduit la hauteur de l'image */
  object-fit: cover;
}

.card-body {
  padding: 0.5rem; /* Réduit l'espace interne */
}

.card-footer {
  background: #f8f9fa;
  border-top: 1px solid #ddd;
  padding: 0.5rem; /* Réduit l'espace interne du footer */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-group {
  margin-right: 0.5rem; /* Réduit la marge droite du groupe de boutons */
}

.social-icons {
  display: flex; /* Utilise Flexbox */
  align-items: center; /* Aligne verticalement les icônes */
}

.social-icons a {
  margin: 0 0.5rem; /* Réduit la marge entre les icônes */
  font-size: 1.2rem; /* Réduit la taille des icônes */
  color: #333;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #0056b3;
}


</style>

