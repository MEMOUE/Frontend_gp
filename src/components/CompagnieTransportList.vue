<template>
  <div class="container mt-4">
    <h1>Compagnies de Transport</h1>
    <!-- <button v-if="userId" @click="addCompagnie" class="btn btn-primary mb-3">Ajouter Compagnie</button> -->
    <button v-if="userId" @click="addCompagnie" class="btn btn-primary mb-3">Ajouter Compagnie</button>
    <div class="row">
      <div v-for="compagnie in compagnies" :key="compagnie.id" class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <img v-if="compagnie.logo" :src="compagnie.logo" class="card-img-top rounded" alt="Logo de la compagnie">
          <div class="card-body">
            <h5 class="card-title">{{ compagnie.nom }}</h5>
            <p class="card-text">
              <strong>Email:</strong> {{ compagnie.email }}<br>
              <strong>Adresse:</strong> {{ compagnie.adresse }}<br>
              <strong>Téléphone:</strong> {{ compagnie.telephone }}<br>
              <strong>Pays:</strong> {{ compagnie.pays }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div v-if="isOwner(compagnie)" class="btn-group" role="group">
              <button @click="editCompagnie(compagnie.id)" class="btn">
                <i class="fas fa-edit text-warning" title="Modifier"></i>
              </button>
              <button @click.prevent="confirmDelete(compagnie.id)" class="btn">
                <i class="fas fa-trash text-danger mx-3" title="Supprimer"></i>
              </button>
            </div>
            <div class="social-icons">
              <a :href="'mailto:' + compagnie.email" title="Envoyer un Email">
                <i class="fas fa-envelope"></i>
              </a>
              <a :href="'https://wa.me/' + compagnie.telephone" title="Contacter via WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a :href="'tel:' + compagnie.telephone" title="Appeler">
                <i class="fas fa-phone"></i>
              </a>
              <strong v-if="compagnie.url"></strong>
              <a v-if="compagnie.url" :href="compagnie.url" target="_blank">
                <i class="fas fa-link"></i> Site web
              </a>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      compagnies: [],
      userId: null,  // L'ID de l'utilisateur actuel
    };
  },
  methods: {
    async fetchCompagnies() {
      try {
        const response = await axios.get('/api/compagnies/');
        this.compagnies = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des compagnies", error);
      }
    },
    addCompagnie() {
      this.$router.push('/compagnies/create');
    },
    editCompagnie(id) {
      this.$router.push(`/compagnies/edit/${id}`);
    },
    async confirmDelete(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette compagnie ?")) {
        await this.deleteCompagnie(id);
      }
    },
    async deleteCompagnie(id) {
      try {
        await axios.delete(`/api/compagnies/${id}/`);
        this.fetchCompagnies();
        alert("Compagnie supprimée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression de la compagnie", error);
        alert("Une erreur s'est produite lors de la suppression de la compagnie.");
      }
    },
    isOwner(compagnie) {
      return compagnie.user === this.userId;
    },
    async fetchUserId() {
      try {
        const response = await axios.get('/current_user/');
        this.userId = response.data.id;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur actuel", error);
      }
    }
  },
  created() {
    this.fetchCompagnies();
    this.fetchUserId();  // Récupérer l'ID de l'utilisateur actuel lors de l'initialisation
  }
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
