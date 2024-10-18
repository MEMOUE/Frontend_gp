<template>
    <div class="container mt-4">
      <h1>Liste des Agences de Vente de Billets</h1>
      <button @click="addAgence" class="btn btn-primary mb-3">Ajouter une Agence</button>
      <div class="row">
        <div v-for="agence in agences" :key="agence.id" class="col-md-4 mb-3">
          <div class="card shadow-sm">
            <img v-if="agence.logo" :src="agence.logo" class="card-img-top rounded" alt="Logo de l'agence">
            <div class="card-body">
              <h5 class="card-title">{{ agence.nom }}</h5>
              <p class="card-text">
                <strong>Email:</strong> {{ agence.email }}<br>
                <strong>Adresse:</strong> {{ agence.adresse }}<br>
                <strong>Téléphone:</strong> {{ agence.telephone }}<br>
                <strong>Pays:</strong> {{ agence.pays }}
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <div v-if="isOwner(agence)" class="btn-group" role="group">
                <button @click="editAgence(agence.id)" class="btn">
                  <i class="fas fa-edit text-warning" title="Modifier"></i>
                </button>
                <button @click="deleteAgence(agence.id)" class="btn">
                  <i class="fas fa-trash text-danger" title="Supprimer"></i>
                </button>
              </div>
              <div class="social-icons">
                <a :href="'mailto:' + agence.email" title="Envoyer un Email">
                  <i class="fas fa-envelope"></i>
                </a>
                <a :href="'https://wa.me/' + agence.telephone" title="Contacter via WhatsApp">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a :href="'tel:' + agence.telephone" title="Appeler">
                  <i class="fas fa-phone"></i>
                </a>
                <strong v-if="agence.url"></strong>
              <a v-if="agence.url" :href="agence.url" target="_blank">
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
        agences: [],
        userId: null,
      };
    },
    methods: {
      async fetchAgences() {
        try {
          const response = await axios.get('/api/agences/');
          this.agences = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des agences", error);
        }
      },
      addAgence() {
        this.$router.push('/agences/create');
      },
      editAgence(id) {
        this.$router.push(`/agences/edit/${id}`);
      },
      async deleteAgence(id) {
        try {
          await axios.delete(`/api/agences/${id}/`);
          this.fetchAgences();
        } catch (error) {
          console.error("Erreur lors de la suppression de l'agence", error);
        }
      },
      isOwner(agence) {
        return agence.user === this.userId;
      },
      async fetchUserId() {
        try {
          const response = await axios.get('/current_user/');
          this.userId = response.data.id;
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur actuel", error);
        }
      },
    },
    created() {
      this.fetchAgences();
      this.fetchUserId();
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    overflow: hidden;
    max-width: 250px;
    margin: auto;
    font-size: 0.9rem;
  }
  
  .card-img-top {
    height: 100px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 0.75rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-text {
    font-size: 0.85rem;
  }
  
  .card-footer {
    background: #f8f9fa;
    border-top: 1px solid #ddd;
    padding: 0.5rem 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .btn-group .btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #333;
    font-size: 1.5rem;
  }
  
  .btn-group .btn:hover {
    color: #0056b3;
  }
  
  .social-icons {
    display: flex;
    align-items: center;
  }
  
  .social-icons a {
    margin: 0 0.3rem;
    font-size: 1.2rem;
    color: #333;
    transition: color 0.3s;
  }
  
  .social-icons a:hover {
    color: #0056b3;
  }
  </style>
  