<template>
  <div class="homepage">
    <!-- Section d'en-tête -->
    <div class="header-content">
      <h1>Bienvenue sur GpMonde</h1>
      <p v-for="(phrase, index) in phrases" :key="index" :class="{ active: activePhraseIndex === index }">
        {{ phrase }}
      </p>
    </div>

    <!-- <div class="services-container">
      <div class="services">
        <router-link to="/programmes" class="service-button">
          <i class="fas fa-check-circle "></i> GP en cours
        </router-link> -->
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
        <!-- <router-link to="/publicite" class="service-button">
          <i class="fas fa-bullhorn"></i> Publicité
        </router-link>
      </div>
    </div> -->

    <!-- Section des actions -->
    <div class="actions-container">
      <router-link to="/programmes/new" class="action-button">
        <i class="fas fa-plus-circle"></i> Publier GP
      </router-link>
      <router-link to="/publicite" class="action-button">
        <i class="fas fa-bullhorn"></i> Acheter Pub
      </router-link>
    </div>

    <!-- Section Qui sommes-nous -->
    <section class="about-us" id="about-us">
      <h2>Qui sommes-nous ?</h2>
      <p>
        GpMonde est une plateforme de mise en relation innovante entre différentes entités et clients. Notre mission est de rendre chaque expérience de transport et de service plus fluide, rapide et sécurisée.
      </p>
    </section>

    <!-- Section des départs prévus -->
    <div class="fixed-buttons">
      <div class="departures-alert">
        <router-link to="/programmes" class="departures-button">
          <i class="fas fa-calendar-alt"></i> Départs en Cours
        </router-link>
      </div>
      <div class="assistant-button" @click="toggleContactOptions">
        <i class="fas fa-headset"></i>
        <span>Assistant</span>
      </div>
    </div>
    <div v-if="showContactOptions" class="contact-options">
      <a :href="whatsappLink" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
      <a href="tel:+221761517642"><i class="fas fa-phone"></i> Téléphone</a>
      <a href="mailto:gpmonde22@gmail.com"><i class="fas fa-envelope"></i> Email</a>
    </div>

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
        <form @submit.prevent="sendMessage">
          <div class="form-group">
            <label for="name">Nom</label>
            <input v-model="form.name" type="text" id="name" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="form.email" type="email" id="email" required />
          </div>

          <div class="form-group">
            <label for="subject">Sujet</label>
            <input v-model="form.subject" type="text" id="subject" required />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea v-model="form.message" id="message" rows="5" required></textarea>
          </div>

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </section>

    <!-- Include FooterComponent -->
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './FooterComponent.vue';

export default {
  components: {
    FooterComponent
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      showContactOptions: false,
      whatsappLink: "https://wa.me/221761517642",
      phrases: [
        "Explorez nos services et profitez d'une expérience unique.",
        "GpMonde, votre partenaire de confiance.",
        "Des solutions innovantes pour vos besoins de transport.",
      ],
      activePhraseIndex: 0,
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await fetch("https://memko.pythonanywhere.com/envoyer-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });

        if (response.ok) {
          alert("Message envoyé avec succès !");
          this.form = { name: "", email: "", subject: "", message: "" }; 
        } else {
          alert("Erreur lors de l'envoi du message.");
        }
      } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur s'est produite.");
      }
    },
    toggleContactOptions() {
      this.showContactOptions = !this.showContactOptions;
    },
    cyclePhrases() {
      setInterval(() => {
        this.activePhraseIndex = (this.activePhraseIndex + 1) % this.phrases.length;
      }, 3000);
    },
  },
  mounted() {
    this.cyclePhrases();
    const servicesContainer = this.$el.querySelector('.services-container');
    
    if (servicesContainer) {
      // Arrête le défilement si l'utilisateur survole la section
      servicesContainer.addEventListener('mouseover', () => {
        servicesContainer.querySelector('.services').style.animationPlayState = 'paused';
      });

      // Relance le défilement lorsque l'utilisateur ne survole plus
      servicesContainer.addEventListener('mouseout', () => {
        servicesContainer.querySelector('.services').style.animationPlayState = 'running';
      });
    }
  }
};
</script>

<style scoped src="@/styles/home.css"></style>
<style scoped>
.assistant-button {
  background: none;
  color: #28a745;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.assistant-button:hover {
  transform: scale(1.1);
}

.contact-options {
  position: fixed;
  bottom: 70px;
  right: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
}

.contact-options a {
  display: block;
  padding: 15px;
  color: #28a745;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
}

.contact-options a:last-child {
  border-bottom: none;
}

.contact-options a:hover {
  background-color: #f1f1f1;
}

.actions-container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.action-button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}

.fixed-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
}

.departures-button {
  background-color: #ffcc00;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.departures-button:hover {
  background-color: #ff9900;
}

.header-content {
  position: relative;
  text-align: center;
  background-image: url('@/assets/image1.jpg');
  background-size: cover;
  background-position: center;
  animation: backgroundAnimation 15s infinite;
}

.header-content p {
  opacity: 0;
  transition: opacity 1s;
}

.header-content p.active {
  opacity: 1;
}

@keyframes backgroundAnimation {
  0% {
    background-image: url('@/assets/image1.jpg');
  }
  33% {
    background-image: url('@/assets/imagegpt1.png');
  }
  66% {
    background-image: url('@/assets/imagegpt2.png');
  }
  100% {
    background-image: url('@/assets/imagegpt3.png');
  }
}
</style>
