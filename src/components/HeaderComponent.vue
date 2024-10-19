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
            <a href="mailto:memko021@gmail.com">
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
              <li class="nav-item mx-2">
                <a class="nav-link text-danger" href="/besoin-notifications">
                  <i class="fas fa-bell"></i> Besoins
                  <span class="badge bg-danger">{{ activeBesoinsCount }}</span> <!-- Compteur d'offres actives -->
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-success" href="/offres">
                  <i class="fas fa-briefcase"></i> Offres
                  <span class="badge bg-success">{{ activeOffersCount }}</span> <!-- Compteur d'offres actives -->
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
                  <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#our-services">Services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#about-us">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#contact">Contact Us</a>
                </li>
                <li class="nav-item" v-if="!user">
                  <a class="nav-link" href="/login"><i class="fa fa-user" aria-hidden="true"></i> Login</a>
                </li>
                <li class="nav-item" v-if="!user">
                  <a class="nav-link" href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i> Register</a>
                </li>
                <li class="nav-item" v-if="user">
                  <a class="nav-link" @click="goToProfile"><i class="fa fa-user" aria-hidden="true"></i> Profile</a>
                </li>
                <li class="nav-item" v-if="user">
                  <a class="nav-link" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                </li>
                <form class="form-inline">
                  <button class="btn my-2 my-sm-0 nav_search-btn" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
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
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // Gestion de l'état de l'utilisateur
    },
  },
  mounted() {
    this.fetchActiveOffersCount(); // Appel de l'API au montage du composant
  },
  methods: {
    async fetchActiveOffersCount() {
      try {
        const responseBesoins = await axios.get('https://memko.pythonanywhere.com/api/besoins-actives/');
        this.activeBesoinsCount = responseBesoins.data.count;

        const responseOffres = await axios.get('https://memko.pythonanywhere.com/api/offres-actives/');
        this.activeOffersCount = responseOffres.data.count;
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
    }
  }
};
</script>

<!-- Liens vers le fichier CSS externe -->
<style scoped src="@/styles/header.css"></style>
