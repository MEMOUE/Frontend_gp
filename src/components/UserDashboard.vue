<template>
    <div class="dashboard">
      <aside class="sidebar">
        <ul>
          <li @click="selectMenu('home')">
            <i class="fas fa-home"></i> Home
          </li>
          <li @click="selectMenu('settings')">
            <i class="fas fa-cog"></i> Settings
          </li>
          <li @click="navigateToFacture">
            <i class="fas fa-file-invoice"></i> Facture
          </li>
          
          <!-- <li @click="selectMenu('comments')">
            <i class="fas fa-comments"></i> Commentaires
          </li> -->
          <li @click="selectMenu('messages')">
            <i class="fas fa-envelope"></i> Messages
          </li>
          <li @click="selectMenu('offers')">
            <i class="fas fa-gift"></i> Offres
          </li>
          <li @click="selectMenu('needs')">
            <i class="fas fa-tasks"></i> Besoins
          </li>
          <li @click="selectMenu('advertisement')">
            <i class="fas fa-ad"></i> Publicité
          </li>
        </ul>
      </aside>
  
      <main class="content">
        <!-- Home -->
        <div v-if="selectedMenu === 'home'" class="text-center mt-5">
          <h1 class="display-4 text-primary mb-4">Bienvenue sur la page Dashboard</h1>
          <p class="lead text-muted">Nous sommes heureux de vous accueillir sur notre site. Explorez nos services et plus encore !</p>
          
        </div>
  
        <!-- Settings Section -->
        <div v-if="selectedMenu === 'settings'" class="settings-section">
          <h1 class="text-center text-primary mb-4">Paramètres</h1>
          <ul class="list-group">
            <li class="list-group-item d-flex align-items-center">
              <i class="fas fa-user-circle fa-2x text-primary me-3"></i>
              <a href="/profile" class="text-decoration-none text-dark">Profil</a>
            </li>
            <li class="list-group-item d-flex align-items-center">
              <i class="fas fa-history fa-2x text-primary me-3"></i>
              <a href="/profile/history" class="text-decoration-none text-dark">Historique</a>
            </li>
            <li class="list-group-item d-flex align-items-center">
              <i class="fas fa-key fa-2x text-primary me-3"></i>
              <a href="/profile/change-password" class="text-decoration-none text-dark">Changer de mot de passe</a>
            </li>
          </ul>
        </div>
  
        
  
        <!-- Messages -->
        <div v-if="selectedMenu === 'messages'" class="border p-4 rounded shadow-sm mt-4">
          <h1 class="text-center mb-4">Messages</h1>
          <ul v-if="messages.length">
            <li v-for="(message, index) in messages" :key="index" class="mb-3">
              <p>{{ message }}</p>
            </li>
          </ul>
          <p v-else class="text-muted">Pas de nouveaux messages.</p>
        </div>
  
        <!-- Offres -->
        <div v-if="selectedMenu === 'offers'" class="border p-4 rounded shadow-sm mt-4">
          <h1 class="text-center mb-4">Offres</h1>
          <p class="text-center">Consultez nos dernières offres.</p>
          <ul v-if="offers.length" class="list-group">
            <li v-for="(offer, index) in offers" :key="index" class="list-group-item">
              {{ offer }}
            </li>
          </ul>
          <p v-else class="text-muted text-center">Pas d'offres disponibles.</p>
        </div>
  
        <!-- Besoins -->
        <div v-if="selectedMenu === 'needs'" class="border p-4 rounded shadow-sm mt-4">
          <h1 class="text-center mb-4">Besoins</h1>
          <p class="text-center">Liste des besoins soumis.</p>
          <ul v-if="needs.length" class="list-group">
            <li v-for="(need, index) in needs" :key="index" class="list-group-item">
              {{ need }}
            </li>
          </ul>
          <p v-else class="text-muted text-center">Aucun besoin en attente.</p>
        </div>
  
        <!-- Publicité -->
        <div v-if="selectedMenu === 'advertisement'" class="border p-4 rounded shadow-sm mt-4">
          <h1 class="text-center mb-4">Publicité</h1>
          <div class="row">
            <div class="col-md-6 mb-4">
              <div class="card">
                <img src="https://via.placeholder.com/600x300" class="card-img-top" alt="Publicité 1">
                <div class="card-body">
                  <h5 class="card-title">Offre Spéciale</h5>
                  <p class="card-text">Profitez de notre offre spéciale à prix réduit. Ne manquez pas cette occasion!</p>
                  <a href="#" class="btn btn-primary">En savoir plus</a>
                </div>
              </div>
            </div>
  
            <div class="col-md-6 mb-4">
              <div class="card">
                <img src="https://via.placeholder.com/600x300" class="card-img-top" alt="Publicité 2">
                <div class="card-body">
                  <h5 class="card-title">Nouvelle Collection</h5>
                  <p class="card-text">Découvrez notre nouvelle collection de produits en avant-première !</p>
                  <a href="#" class="btn btn-info">Voir la collection</a>
                </div>
              </div>
            </div>
          </div>
          <p class="text-center text-muted mt-4">Restez informé de nos dernières publicités et promotions.</p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Assurez-vous d'avoir configuré axios
  


  export default {
    name: 'UserDashboard',
    data() {
      return {
        selectedMenu: 'home',
        invoiceDetails: { clientName: '', items: '' },
        invoice: null,
        comments: [],
        messages: [],
        offers: [],
        needs: [],
      };
    },
    methods: {

      navigateToFacture() {
      this.$router.push('/facture');
    },

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
      selectMenu(menu) {
        this.selectedMenu = menu;
        if (menu === 'comments') this.fetchComments();
        if (menu === 'messages') this.fetchMessages();
        if (menu === 'offers') this.fetchOffers();
        if (menu === 'needs') this.fetchNeeds();
      },
      fetchComments() {
        // Simulation des commentaires
        this.comments = [{ text: 'Excellent service!', likes: 10 }];
      },
      fetchMessages() {
        // Simulation des messages
        this.messages = ['Bienvenue sur notre site !'];
      },
      fetchOffers() {
        // Simulation des offres
        this.offers = ['Promotion 1 - 20% de réduction', 'Promotion 2 - Livraison gratuite'];
      },
      fetchNeeds() {
        // Simulation des besoins
        this.needs = ['Besoin de nouveaux produits', 'Améliorer la qualité des services'];
      },
      
      },
      downloadInvoice() {
        console.log('Télécharger la facture');
      },
      shareInvoice() {
        console.log('Partager la facture');
      },
      likeComment(index) {
        this.comments[index].likes += 1;
      }
    }
  
  </script>
  
  <style scoped>
  /* Ajoutez votre style ici */
  .dashboard {
    display: flex;
    height: 100vh;
  }
  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  .sidebar ul {
    list-style-type: none;
    padding-left: 0;
  }
  .sidebar li {
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .sidebar li:hover {
    background-color: #f1f1f1;
  }
  .sidebar i {
    margin-right: 10px;
  }
  .content {
    flex: 1;
    padding: 20px;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  