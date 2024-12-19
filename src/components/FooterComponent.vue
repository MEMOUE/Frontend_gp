<template>
    <!-- Section Footer -->
    <footer class="footer">
      <div class="footer-container">
        <!-- Section À propos -->
        <div class="footer-about">
          <h4>À propos de nous</h4>
          <p>
            GPMonde est une plateforme de gestion innovante qui aide à connecter le monde du transport. Notre mission est de faciliter les opérations des compagnies de transport avec des solutions numériques modernes.
          </p>
        </div>
  
        <!-- Section Liens rapides -->
        <div class="footer-links">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="#about-us">Accueil</a></li>
            <li><a href="#about-us">À propos</a></li>
            <li><a href="#our-services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
  
        <!-- Section Contact -->
        <div class="footer-contact">
          <h4>Nous contacter</h4>
          <ul>
            <li><i class="fas fa-envelope"></i> <a href="mailto:contact@gpmonde.com">contact@gpmonde.com</a></li>
            <li><i class="fas fa-phone"></i> +123 456 7890</li>
            <li><i class="fas fa-map-marker-alt"></i> Afrique <i class="fas fa-globe-africa"></i></li>
            <li><i class="fas fa-map-marker-alt"></i> Asie <i class="fas fa-globe-asia"></i></li>
            <li><i class="fas fa-map-marker-alt"></i> Europe <i class="fas fa-globe-europe"></i></li>
            <li><i class="fas fa-map-marker-alt"></i> Amérique du Nord <i class="fas fa-globe-americas"></i></li>
            <li><i class="fas fa-map-marker-alt"></i> Amérique du Sud <i class="fas fa-globe-americas"></i></li>
            <li><i class="fas fa-map-marker-alt"></i> Océanie <i class="fas fa-globe"></i></li>
            <li><i class="fas fa-map-marker-alt"></i> Antarctique <i class="fas fa-globe"></i></li>
          </ul>
        </div>
  
        <!-- Section Réseaux sociaux -->
        <div class="footer-social">
          <h4>Suivez-nous</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a></li>
            <li><a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
  
      <div class="footer-bottom">
        <p>&copy; 2024 GPMonde. Tous droits réservés.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComponent",
  };
  </script>
  
  <style scoped>
  /* Style pour la section footer */
  .footer {
    background-color: #333;
    color: #fff;
    padding: 40px 0;
    font-size: 0.9rem;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  
  .footer-about,
  .footer-links,
  .footer-contact,
  .footer-social {
    flex: 1 1 200px;
    margin-bottom: 20px;
  }
  
  .footer-about h4,
  .footer-links h4,
  .footer-contact h4,
  .footer-social h4 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  .footer-about p {
    line-height: 1.6;
  }
  
  .footer-links ul,
  .footer-contact ul,
  .footer-social ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-links ul li,
  .footer-contact ul li,
  .footer-social ul li {
    margin-bottom: 10px;
  }
  
  .footer-links ul li a,
  .footer-contact ul li a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-links ul li a:hover,
  .footer-contact ul li a:hover {
    color: #007bff;
  }
  
  .footer-contact ul li i {
    margin-right: 10px;
  }
  
  .footer-social ul {
    display: flex;
  }
  
  .footer-social ul li {
    margin-right: 10px;
  }
  
  .footer-social ul li a {
    color: #fff;
    font-size: 1.5rem;
    transition: color 0.3s;
  }
  
  .footer-social ul li a:hover {
    color: #007bff;
  }
  
  .footer-bottom {
    background-color: #222;
    text-align: center;
    padding: 20px;
    margin-top: 20px;
  }
  
  .footer-bottom p {
    margin: 0;
    font-size: 0.85rem;
  }
  </style>
