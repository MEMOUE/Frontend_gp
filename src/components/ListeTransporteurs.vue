<template>
  <div class="container mt-4">
    <h1>Transporteurs de Colis</h1>
    <button @click="addTransporteur" class="btn btn-primary mb-3">Ajouter un Transporteur</button>
    <div class="row">
      <div v-for="transporteur in transporteurs" :key="transporteur.id" class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <img v-if="transporteur.logo" :src="transporteur.logo" class="card-img-top rounded" alt="Logo du transporteur">
          <div class="card-body">
            <h5 class="card-title">{{ transporteur.nom }}</h5>
            <p class="card-text">
              <strong>Email:</strong> {{ transporteur.email }}<br>
              <strong>Adresse:</strong> {{ transporteur.adresse }}<br>
              <strong>Téléphone:</strong> {{ transporteur.telephone }}<br>
              <strong>Pays:</strong> {{ transporteur.pays }}<br>
              <strong>Type:</strong> {{ transporteur.type_transport }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div v-if="isOwner(transporteur)" class="btn-group" role="group">
              <button @click="editTransporteur(transporteur.id)" class="btn">
                <i class="fas fa-edit text-warning" title="Modifier"></i>
              </button>
              <button @click="deleteTransporteur(transporteur.id)" class="btn">
                <i class="fas fa-trash text-danger" title="Supprimer"></i>
              </button>
            </div>
            <div class="social-icons">
              <a :href="'mailto:' + transporteur.email" title="Envoyer un Email">
                <i class="fas fa-envelope"></i>
              </a>
              <a :href="'https://wa.me/' + transporteur.telephone" title="Contacter via WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a :href="'tel:' + transporteur.telephone" title="Appeler">
                <i class="fas fa-phone"></i>
              </a>
              <strong v-if="transporteur.url"></strong>
              <a v-if="transporteur.url" :href="transporteur.url" target="_blank">
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
import axios from '../axios'; // Assurez-vous que axios est correctement configuré pour appeler votre API.

export default {
  data() {
    return {
      transporteurs: [],
      userId: null, // L'ID de l'utilisateur actuel
    };
  },
  methods: {
    async fetchTransporteurs() {
      try {
        const response = await axios.get('/api/transporteurs/');
        this.transporteurs = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des transporteurs", error);
      }
    },
    addTransporteur() {
      this.$router.push('/transporteurs/create');
    },
    editTransporteur(id) {
      this.$router.push(`/transporteurs/edit/${id}`);
    },
    async deleteTransporteur(id) {
      try {
        await axios.delete(`/api/transporteurs/${id}/`);
        this.fetchTransporteurs();
      } catch (error) {
        console.error("Erreur lors de la suppression du transporteur", error);
      }
    },
    isOwner(transporteur) {
      // Vérifie si l'utilisateur actuel est le propriétaire du transporteur
      return transporteur.user === this.userId;
    },
    async fetchUserId() {
      // Récupère l'ID de l'utilisateur actuel
      try {
        const response = await axios.get('/current_user/');
        this.userId = response.data.id;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur actuel", error);
      }
    },
  },
  created() {
    this.fetchTransporteurs();
    this.fetchUserId(); // Récupère l'ID de l'utilisateur lors de l'initialisation
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  overflow: hidden;
  max-width: 250px; /* Limite la largeur de la carte */
  margin: auto;
  font-size: 0.9rem; /* Diminue légèrement la taille du texte */
}

.card-img-top {
  height: 100px; /* Réduit la hauteur de l'image */
  object-fit: cover;
}

.card-body {
  padding: 0.75rem; /* Réduit le padding de la carte */
}

.card-title {
  font-size: 1rem; /* Diminue la taille de la police du titre */
}

.card-text {
  font-size: 0.85rem; /* Diminue la taille de la police du texte */
}

.card-footer {
  background: #f8f9fa;
  border-top: 1px solid #ddd;
  padding: 0.5rem 0.75rem; /* Réduit le padding du footer */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-group .btn {
  background: transparent; /* Supprime l'arrière-plan */
  border: none; /* Supprime la bordure */
  cursor: pointer; /* Change le curseur sur survol */
  color: #333; /* Couleur des icônes */
  font-size: 1.5rem; /* Taille des icônes */
}

.btn-group .btn:hover {
  color: #0056b3; /* Change la couleur au survol */
}

.social-icons {
  display: flex; /* Utilise Flexbox */
  align-items: center; /* Aligne verticalement les icônes */
}

.social-icons a {
  margin: 0 0.3rem; /* Réduit la marge entre les icônes */
  font-size: 1.2rem; /* Diminue la taille des icônes */
  color: #333;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #0056b3; /* Change la couleur au survol */
}
</style>
