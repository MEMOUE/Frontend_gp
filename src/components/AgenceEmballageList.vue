<template>
  <div class="container mt-4">
    <h1>Agences d'Emballage</h1>
    <router-link to="/emballages/create" class="btn btn-primary mb-3">Ajouter une Agence</router-link>
    
    <div class="row">
      <div v-for="agence in agencesEmballage" :key="agence.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img v-if="agence.logo" :src="agence.logo" alt="Logo" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ agence.nom }}</h5>
            <p class="card-text">Adresse : {{ agence.adresse }}</p>
            <p class="card-text">Téléphone : {{ agence.telephone }}</p>
            <p class="card-text">Email : {{ agence.email }}</p>
            <p class="card-text">Pays : {{ agence.pays }}</p>
            <!-- <p class="card-text" v-if="agence.url">
              <i class="fas fa-link text-primary"></i>
              Site web : 
              <a :href="agence.url" target="_blank">{{ agence.url }}</a>
            </p> -->
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div v-if="isOwner(agence.user)">
              <router-link :to="`/emballages/edit/${agence.id}`" class="text-warning mx-3" title="Modifier">
                <i class="fas fa-edit"></i>
              </router-link>
              <i class="fas fa-trash text-danger mx-3" title="Supprimer" @click="deleteAgenceEmballage(agence.id)"></i>
            </div>
            <div>
              <a :href="'mailto:' + agence.email" title="Envoyer un Email" class="text-primary mx-2">
                <i class="fas fa-envelope"></i>
              </a>
              <a :href="'https://wa.me/' + agence.telephone" title="WhatsApp" class="text-success mx-2" target="_blank">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a :href="'tel:' + agence.telephone" title="Appeler" class="text-danger mx-2">
                <i class="fas fa-phone"></i>
              </a>
              <strong v-if="agence.url"></strong>
              <a :href="agence.url" target="_blank" title="Visiter le site" class="text-info mx-2">
                <i class="fas fa-link"></i> Site web
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="agencesEmballage.length === 0" class="text-warning">Aucune agence d'emballage disponible.</p>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '../axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      agencesEmballage: [],
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async fetchAgencesEmballage() {
      try {
        const response = await axios.get('/api/emballages/');
        this.agencesEmballage = response.data;
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des agences d\'emballage';
        console.error(this.errorMessage, error);
      }
    },
    async deleteAgenceEmballage(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette agence ?')) {
        try {
          await axios.delete(`/api/emballages/${id}/`);
          this.fetchAgencesEmballage();
        } catch (error) {
          this.errorMessage = 'Erreur lors de la suppression de l\'agence';
          console.error(this.errorMessage, error);
        }
      }
    },
    isOwner(ownerId) {
      return this.user && this.user.id === ownerId;
    },
  },
  created() {
    this.fetchAgencesEmballage();
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

