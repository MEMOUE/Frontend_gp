<template>
    <div class="container mt-4">
      <h1>Liste des Offres</h1>
      <router-link to="/offres/create" class="btn btn-primary mb-3">Ajouter une Offre</router-link>
  
      <div class="row">
        <div v-for="offre in offres" :key="offre.id" class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ offre.nom }}</h5>
              <p class="card-text">Téléphone : {{ offre.telephone }}</p>
              <p class="card-text">Description : {{ offre.description }}</p>
              <p class="card-text" v-if="offre.date_limite">Date limite : {{ new Date(offre.date_limite).toLocaleString() }}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <div v-if="isOwner(offre)">
                <router-link :to="`/offres/edit/${offre.id}`" class="text-warning mx-3" title="Modifier">
                  <i class="fas fa-edit"></i>
                </router-link>
                <i class="fas fa-trash text-danger mx-3" title="Supprimer" @click="deleteOffre(offre.id)"></i>
              </div>
              <div class="social-icons">
                <a :href="'https://wa.me/' + offre.telephone" title="WhatsApp" class="text-success mx-2" target="_blank">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a :href="'tel:' + offre.telephone" title="Appeler" class="text-danger mx-2">
                  <i class="fas fa-phone"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <p v-if="offres.length === 0" class="text-warning">Aucune offre disponible.</p>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Utilise l'instance axios personnalisée
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        offres: [],
        errorMessage: '',
      };
    },
    computed: {
      ...mapState(['user']), // Accéder à l'utilisateur depuis le store
    },
    methods: {
      async fetchOffres() {
        try {
          const response = await axios.get('/api/offres/');
          this.offres = response.data;
        } catch (error) {
          this.errorMessage = 'Erreur lors de la récupération des offres';
          console.error(this.errorMessage, error);
        }
      },
      async deleteOffre(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
          try {
            await axios.delete(`/api/offres/${id}/`);
            this.fetchOffres();
          } catch (error) {
            this.errorMessage = 'Erreur lors de la suppression de l\'offre';
            console.error(this.errorMessage, error);
          }
        }
      },
      isOwner(offre) {
        return this.user && this.user.id === offre.proprietaire; // Vérifiez que `proprietaire` est correct
      },
    },
    created() {
      this.fetchOffres(); // Charge les offres dès que le composant est créé
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .card-body {
    padding: 0.5rem;
  }
  
  .card-footer {
    background: #f8f9fa;
    border-top: 1px solid #ddd;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .social-icons a {
    margin: 0 0.5rem;
    font-size: 1.2rem;
    color: #333;
  }
  
  .social-icons a:hover {
    color: #0056b3;
  }
  </style>
  