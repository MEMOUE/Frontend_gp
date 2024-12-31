<template>
  <div class="hero_area">
    <!-- Header Section Start -->
    <header class="header_section">
      <div class="header_top bg-info">
        <div class="container-fluid">
          <div class="contact_nav d-flex justify-content-between">
            <a href="tel:+221784886752">
              <i class="fa fa-phone" aria-hidden="true"></i>
            </a>
            <a href="mailto:gpmonde22@gmail.com">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </a>
            <a href="#">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <span>Siège</span>
            </a>
          </div>
        </div>
      </div>

      <div class="header_bottom">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg custom_nav-container d-flex justify-content-between align-items-center">
            <!-- Logo Section -->
            <a class="navbar-brand" href="/">
              <img :src="logo" alt="GP_Monde Logo" class="logo" />
            </a>

            <!-- Centered Besoins and Offres Section -->
            <div class="d-flex align-items-center">
              <li class="nav-item mx-1">
                <a class="nav-link text-danger" href="/besoin-notifications" style="font-size: 0.9rem;">
                  <i class="fas fa-bell" style="font-size: 1rem;"></i> Besoins
                  <span v-if="activeBesoinsCount > 0" class="badge bg-danger" style="font-size: 0.8rem;">{{ activeBesoinsCount }}</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-success" href="/programmes" style="font-size: 0.9rem;">
                  <i class="fas fa-briefcase" style="font-size: 1rem;"></i> Offres Gp
                  <span v-if="activeOffersCount > 0" class="badge bg-success" style="font-size: 0.8rem;">{{ activeOffersCount }}</span>
                </a>
              </li>
            </div>

            <!-- Right Side Navigation -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/">
                    <i class="bi bi-house"></i> Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/dashboard">
                    <i class="bi bi-speedometer2"></i> Dashboard
                  </a>
                </li>
                <!-- <li class="nav-item">
                  <a class="nav-link" href="#our-services">
                    <i class="bi bi-gear"></i> Services
                  </a>
                </li> -->
                <li class="nav-item">
                  <a class="nav-link" href="#about-us">
                    <i class="bi bi-info-circle"></i> About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#contact">
                    <i class="bi bi-envelope"></i> Contact Us
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-person"></i> Compte
                  </a>
                  <div class="dropdown-menu" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="/login" v-if="!user">
                      <i class="bi bi-box-arrow-in-right"></i> Login
                    </a>
                    <a class="dropdown-item" href="/register" v-if="!user">
                      <i class="bi bi-person-plus"></i> Register
                    </a>
                    <a class="dropdown-item" @click="goToProfile" v-if="user">
                      <i class="bi bi-person"></i> Profile
                    </a>
                    <a class="dropdown-item" @click="logout" v-if="user">
                      <i class="bi bi-box-arrow-right"></i> Logout
                    </a>
                  </div>
                </li>
                <!-- <form class="form-inline">
                  <button class="btn my-2 my-sm-0 nav_search-btn" type="submit">
                    <i class="bi bi-search"></i>
                  </button>
                </form> -->
              </ul>
            </div>
            
          </nav>
        </div>
      </div>
    </header>
    <!-- Header Section End -->
  </div>
</template>

<script>
import logo from '@/assets/logo_sbg.png'; // Importer le logo
import axios from 'axios'; // Assurez-vous d'installer axios si ce n'est pas fait.

export default {
  name: "HeaderComponent",
  data() {
    return {
      logo, // Définir le logo dans les données
      activeOffersCount: 0, // Initialiser à 0
      activeBesoinsCount: 0,
      programmes: [], // Add this line to store filtered programmes
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // Gestion de l'état de l'utilisateur
    },
  },
  mounted() {
    this.fetchActiveOffersCount(); // Appel de l'API au montage du composant
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() { // Changer ici de beforeDestroy à beforeUnmount
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    async fetchActiveOffersCount() {
      try {
        const responseBesoins = await axios.get('https://memko.pythonanywhere.com/api/besoins-actives/'); //src/components/HeaderComponent.vue
        this.activeBesoinsCount = responseBesoins.data.count;

        const responseOffres = await axios.get('https://memko.pythonanywhere.com/api/programmes/');
        const currentDate = new Date();
        this.programmes = responseOffres.data.filter(programme => new Date(programme.date_depart) >= currentDate);
        this.activeOffersCount = this.programmes.length;
        console.log('Filtered Programmes:', this.programmes); // Debugging line
      } catch (error) {
        console.error('Erreur lors de la récupération des offres actives:', error);
      }
    },
    goToProfile() {
      this.$router.push('/profile'); // Redirection vers la page de profil
    },
    async logout() {
      try {
        await this.$store.dispatch('logout'); // Appel Vuex pour la déconnexion
        this.$router.push('/login'); // Redirection vers la page de connexion après la déconnexion
      } catch (error) {
        console.error('Déconnexion échouée:', error);
      }
    },
    handleClickOutside(event) {
      const target = event.target;
      const navbar = document.getElementById('navbarSupportedContent');
      
      // Vérifiez si le clic est en dehors de la barre de navigation
      if (navbar && !navbar.contains(target) && !target.matches('.navbar-toggler')) {
        navbar.classList.remove('show'); // Ferme le menu
      }
    }
  }
};
</script>

<!-- Liens vers le fichier CSS externe -->
<style scoped src="@/styles/header.css"></style>
