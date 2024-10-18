<template>
  <div class="container mt-4">
    <h1>Liste des Offres</h1>
    <router-link to="/offres/create" class="btn btn-primary mb-3">Ajouter une Offre</router-link>

    <!-- Afficher le nombre d'offres actives -->
    <p v-if="count > 0" class="text-info">Nombre d'offres disponibles : {{ count }}</p>
    <p v-if="offres.length === 0" class="text-warning">Aucune offre disponible.</p>

    <div class="row">
      <!-- Affichage de chaque offre -->
      <div v-for="offre in offres" :key="offre.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ offre.nom }}</h5>
            <p class="card-text">Téléphone : {{ offre.telephone }}</p>
            <p class="card-text">Description : {{ offre.description }}</p>
            <p class="card-text" v-if="offre.date_limite">
              Date limite : {{ new Date(offre.date_limite).toLocaleString() }}
            </p>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <!-- Afficher Modifier/Supprimer seulement si l'utilisateur est propriétaire et connecté -->
            <div v-if="isOwner(offre)">
              <router-link :to="`/offres/edit/${offre.id}`" class="text-warning mx-3" title="Modifier">
                <i class="fas fa-edit"></i>
              </router-link>
              <i class="fas fa-trash text-danger mx-3" title="Supprimer" @click="deleteOffre(offre.id)"></i>
            </div>

            <!-- Liens pour contacter via WhatsApp ou appel téléphonique -->
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

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '../axios'; // Utilisation d'une instance Axios personnalisée
import { mapState } from 'vuex';

export default {
  data() {
    return {
      offres: [],       // Liste des offres
      count: 0,         // Nombre d'offres
      errorMessage: '', // Message d'erreur
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user || null,  // Récupère l'utilisateur s'il est connecté
    }),
  },
  methods: {
    // Récupérer les offres actives
    async fetchOffres() {
      try {
        const response = await axios.get('/api/offres-actives/');  // Appel à l'API pour les offres
        this.offres = response.data.offres;  // Stocke les offres reçues
        this.count = response.data.count;    // Stocke le nombre d'offres
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération des offres';
        console.error(this.errorMessage, error);
      }
    },
    // Supprimer une offre
    async deleteOffre(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
        try {
          await axios.delete(`/api/offres/${id}/`);
          this.fetchOffres(); // Recharger les offres après suppression
        } catch (error) {
          this.errorMessage = 'Erreur lors de la suppression de l\'offre';
          console.error(this.errorMessage, error);
        }
      }
    },
    // Vérifie si l'utilisateur connecté est le propriétaire de l'offre
    isOwner(offre) {
      return this.user && offre.user === this.user.id; // Vérifie si l'utilisateur connecté est le propriétaire
    },
  },
  created() {
    this.fetchOffres(); // Charger les offres dès la création du composant
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
