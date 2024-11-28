<template>
  <div class="homepage">
    <!-- Section d'en-tête -->
    <div class="header-content">
      <h1>Bienvenue sur GpMonde</h1>
      <p>Explorez nos services et profitez d'une expérience unique.</p>
    </div>

    
    <div class="services-container">
      <div class="services">
        <router-link to="/programmes" class="service-button">
          <i class="fas fa-check-circle "></i> GP en cours
        </router-link>
        <!-- <router-link to="/compagnies" class="service-button">
          <i class="fas fa-globe"></i> Compagnie de Transport
        </router-link>
        <router-link to="/transporteurs" class="service-button">
          <i class="fas fa-box"></i> Transporteur de Colis (GP)
        </router-link>
        <router-link to="/emballages" class="service-button">
          <i class="fas fa-cube"></i> Société d'Emballage
        </router-link>
        <router-link to="/agences" class="service-button">
          <i class="fas fa-ticket-alt"></i> Agence de Vente de Billets
        </router-link> -->
        <router-link to="/publicite" class="service-button">
          <i class="fas fa-bullhorn"></i> Publicité
      </router-link>
      
      </div>
    </div>

    <!-- Section Qui sommes-nous -->
    <section class="about-us" id="about-us">
      <h2>Qui sommes-nous ?</h2>
      <p>
        GpMonde est une plateforme de mise en relation innovante entre différentes entités et clients. Notre mission est de rendre chaque expérience de transport et de service plus fluide, rapide et sécurisée.
        
      </p>
    </section>

    <!-- Section des départs prévus -->
<div class="departures-alert">
  <router-link to="/programmes" class="departures-button">
    <i class="fas fa-calendar-alt"></i> Départs Prévus en Cours
  </router-link>
</div>


    <!-- Section Services -->
    <section class="our-services" id="our-services">
      <h2 class="text-center">Nos Services</h2>
      <div class="services-list">
        <div class="service-item">
          <i class="fas fa-box"></i>
          <h3>Transporteur de Colis (GP)</h3>
          <p>Nous offrons des services complets de regroupement et de transport de produits, garantissant une livraison rapide et sécurisée à travers le monde, avec suivi en temps réel.</p>
        </div>

        <div class="service-item">
          <i class="fas fa-globe"></i>
          <h3>Compagnies de Transport</h3>
          <p>Nous offrons des services de transport rapide et sécurisé pour vos colis à travers le monde, avec suivi en temps réel.</p>
        </div>
        
        <div class="service-item">
          <i class="fas fa-plane"></i>
          <h3>Vente de Billets</h3>
          <p>Réservez vos billets de voyage avec nous et bénéficiez de tarifs compétitifs et d'un service client réactif.</p>
        </div>
        
        <div class="service-item">
          <i class="fas fa-box-open"></i>
          <h3>Emballage Professionnel</h3>
          <p>Protégez vos biens avec notre service d'emballage professionnel qui garantit la sécurité pendant le transport.</p>
        </div>
      </div>
    </section>

    <!-- Section Témoignages -->
    <section class="testimonials">
      <h2 class="text-center">Ce que disent nos clients</h2>
      <div class="testimonial-list">
        <div class="testimonial-item">
          <i class="fas fa-user-circle"></i>
          <p>"GpMonde a rendu mon expérience de voyage beaucoup plus facile et agréable. Service de qualité et équipe formidable !"</p>
          <h4>Jean Dupont</h4>
        </div>
        <div class="testimonial-item">
          <i class="fas fa-user-circle"></i>
          <p>"Le service client est exceptionnel, et mes colis sont toujours livrés à temps, peu importe la destination."</p>
          <h4>Marie Claire</h4>
        </div>
        <div class="testimonial-item">
          <i class="fas fa-user-circle"></i>
          <p>"Je recommande fortement GpMonde pour tous vos besoins de transport et de logistique. Efficace et fiable."</p>
          <h4>Ahmed Diallo</h4>
        </div>
      </div>
    </section>

   <!-- Section Formulaire de Contact -->
<section class="contact-form-section" id="contact">
  <h2 class="text-center">Contact</h2>
  <div class="contact-container">
    <h2>Envoyez-nous un message</h2>
    <form action="/envoyer-message" method="POST">
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" name="name" id="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="subject">Sujet</label>
        <input type="text" name="subject" id="subject" required />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea name="message" id="message" rows="5" required></textarea>
      </div>

      <button type="submit">Envoyer</button>
    </form>
  </div>
</section>
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
        <li><i class="fas fa-phone"></i> +221 761517642</li>
        <li><i class="fas fa-map-marker-alt"></i> Dakar, Sénégal</li>
      </ul>
    </div>

    <!-- Section Réseaux sociaux -->
    <div class="footer-social">
      <h4>Suivez-nous</h4>
      <ul>
        <li><a href="https://www.facebook.com/profile.php?id=61568254163082" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
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


  </div>
</template>

<script>

export default {
  mounted() {
    const servicesContainer = this.$el.querySelector('.services-container');
    
    // Arrête le défilement si l'utilisateur survole la section
    servicesContainer.addEventListener('mouseover', () => {
      servicesContainer.querySelector('.services').style.animationPlayState = 'paused';
    });

    // Relance le défilement lorsque l'utilisateur ne survole plus
    servicesContainer.addEventListener('mouseout', () => {
      servicesContainer.querySelector('.services').style.animationPlayState = 'running';
    });
  }
};


</script>

<style scoped src="@/styles/home.css"></style>
