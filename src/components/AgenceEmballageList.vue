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
          </div>
          <div class="card-footer d-flex flex-column justify-content-between align-items-start">
            <div class="d-flex justify-content-between w-100">
              <div v-if="isOwner(agence.user)">
                <router-link :to="`/emballages/edit/${agence.id}`" class="text-warning mx-3" title="Modifier">
                  <i class="fas fa-edit"></i>
                </router-link>
                <i class="fas fa-trash text-danger mx-3" title="Supprimer" @click="deleteAgenceEmballage(agence.id)"></i>
              </div>
              <div class="social-icons">
                <a :href="'mailto:' + agence.email" title="Envoyer un Email" class="text-primary mx-2">
                  <i class="fas fa-envelope"></i>
                </a>
                <a :href="'https://wa.me/' + agence.telephone" title="WhatsApp" class="text-success mx-2" target="_blank">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a :href="'tel:' + agence.telephone" title="Appeler" class="text-danger mx-2">
                  <i class="fas fa-phone"></i>
                </a>
              </div>
            </div>

            <!-- Évaluations -->
            <div class="d-flex align-items-center mt-2">
              <i class="fas fa-thumbs-up" @click="toggleEvaluation(agence.id, true)" title="J'aime"></i>
              <span>{{ getEvaluationCount(agence.id, true) }}</span>
              <i class="fas fa-thumbs-down" @click="toggleEvaluation(agence.id, false)" title="Je n'aime pas"></i>
              <span>{{ getEvaluationCount(agence.id, false) }}</span>
              <i class="fas fa-comments" @click="toggleCommentSection(agence.id)" title="Commenter"></i>
            </div>

            <!-- Section des commentaires -->
            <div v-if="isCommentSectionVisible(agence.id)" class="mt-2">
              <textarea v-model="newComment[agence.id]" placeholder="Écrivez votre commentaire..." class="form-control mb-2"></textarea>
              <button class="btn btn-primary" @click="submitComment(agence.id)">Envoyer</button>
              <div class="comments">
                <div v-for="comment in getComments(agence.id)" :key="comment.id" class="comment">
                  <p><strong>{{ comment.user }}:</strong> {{ comment.commentaire }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="agencesEmballage.length === 0" class="text-warning">Aucune agence d'emballage disponible.</p>
  </div>
</template>

<script>
import axios from '../axios';
import { mapState } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      agencesEmballage: [],
      newComment: {},
      visibleCommentSections: {}, // Pour gérer la visibilité des sections de commentaires
    };
  },
  computed: {
    ...mapState(['user']),
  },
  setup() {
    const toast = useToast(); // Initialisation de useToast

    return { toast }; // Renvoyer le toast pour l'utiliser dans les méthodes
  },
  methods: {
    async fetchAgencesEmballage() {
      try {
        const response = await axios.get('/api/emballages/');
        this.agencesEmballage = response.data;
      } catch (error) {
        this.toast.error('Erreur lors de la récupération des agences d\'emballage'); // Utilisation de toast
        console.error('Erreur:', error);
      }
    },
    async deleteAgenceEmballage(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette agence ?')) {
        try {
          await axios.delete(`/api/emballages/${id}/`);
          this.fetchAgencesEmballage(); // Rafraîchir la liste après la suppression
          this.toast.success('Agence supprimée avec succès'); // Utilisation de toast
        } catch (error) {
          this.toast.error('Erreur lors de la suppression de l\'agence'); // Utilisation de toast
          console.error('Erreur:', error);
        }
      }
    },
    isOwner(ownerId) {
      return this.user && this.user.id === ownerId;
    },
    toggleCommentSection(agenceId) {
      this.$set(this.visibleCommentSections, agenceId, !this.visibleCommentSections[agenceId]);
    },
    isCommentSectionVisible(agenceId) {
      return this.visibleCommentSections[agenceId];
    },
    async submitComment(agenceId) {
      const comment = this.newComment[agenceId];
      if (!comment || comment.trim() === '') {
        this.toast.error('Le commentaire ne peut pas être vide');
        return; // Ne pas soumettre si le commentaire est vide
      }
      try {
        await axios.post('/api/commentaires/', { 
          service_id: agenceId, 
          service_type: 'AgenceEmballage', 
          commentaire: comment 
        });
        this.newComment[agenceId] = ''; // Réinitialiser le champ de commentaire
        this.fetchAgencesEmballage(); // Rafraîchir la liste
        this.toast.success('Commentaire ajouté avec succès');
      } catch (error) {
        this.toast.error('Erreur lors de l\'envoi du commentaire');
        console.error('Erreur:', error);
      }
    },
    async toggleEvaluation(agenceId, isLike) {
      try {
        await axios.post('/api/evaluations/', { 
          service_id: agenceId, 
          service_type: 'AgenceEmballage', 
          jaime: isLike 
        });
        this.fetchAgencesEmballage(); // Rafraîchir la liste
      } catch (error) {
        this.toast.error('Erreur lors de l\'évaluation');
        console.error('Erreur:', error);
      }
    },
    getEvaluationCount(agenceId, isLike) {
      const evaluations = this.agencesEmballage.find(a => a.id === agenceId)?.evaluations || [];
      return evaluations.filter(e => e.jaime === isLike).length;
    },
    getComments(agenceId) {
      return this.agencesEmballage.find(a => a.id === agenceId)?.commentaires || [];
    }
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
  max-width: 280px;
}

.card-img-top {
  height: 100px;
  object-fit: cover;
}

.card-body {
  padding: 0.5rem;
}

.card-footer {
  background: #f8f9fa;
  border-top: 1px solid #ddd;
  padding: 0.5rem;
  display: flex;
  flex-direction: column; 
}

.social-icons {
  display: flex;
  align-items: center;
}

.social-icons a {
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #0056b3;
}

.comment {
  margin: 0.5rem 0; 
}
</style>
