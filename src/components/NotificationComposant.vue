<template>
  <div class="besoin-notifications">
    <!-- Header avec icône de notifications -->
    <header class="app-header">
      <div class="logo">
        <h1>GPMonde</h1>
      </div>
      <div class="notification-icon" @click="toggleNotifications" aria-label="Notifications">
        <i v-if="showNotifications" class="fas fa-eye"></i>
        <i v-else class="fas fa-eye-slash"></i>
        <span v-if="unreadCount > 0" class="notification-count">{{ unreadCount }}</span>
      </div>
    </header>

    <!-- Formulaire de soumission du besoin -->
    <div class="besoin-form">
      <h2>Soumettre un Besoin</h2>
      <form @submit.prevent="submitBesoin">
        <div>
          <textarea v-model="message" placeholder="Décrivez votre besoin ici..." required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      <p v-if="successMessage" class="success-message">Publié avec succès</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>

    <!-- Notifications -->
    <div v-if="showNotifications" class="notifications">
      <h3>Notifications ({{ notifications.length }})</h3>
      <ul v-if="notifications.length > 0">
        <li v-for="notification in notifications" :key="notification.id" 
            :class="{ 'read': notification.is_read }"
            @click="markNotificationAsRead(notification)">
          {{ notification.message }} 
        </li>
      </ul>
      <p v-else>Aucune notification</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'; // Importation de SweetAlert2

export default {
  data() {
    return {
      message: '',
      successMessage: '',
      errorMessage: '',
      apiUrl: 'https://memko.pythonanywhere.com/api', // URL de l'API
      notifications: [],
      unreadCount: 0,
      showNotifications: true, // Afficher les notifications par défaut
      newNotifications: [],
      oldNotifications: [],
    };
  },
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    submitBesoin() {
      const authToken = localStorage.getItem('access');
      if (!authToken) {
        Swal.fire({
          icon: 'error', // Icône d'erreur
          title: 'Erreur',
          text: 'Vous devez être connecté pour soumettre un besoin.', // Message d'erreur
        });
        return; // Arrêter la fonction ici
      }

      axios.post(
        `${this.apiUrl}/submit_besoin/`,
        { message: this.message },
        { headers: { Authorization: `Bearer ${authToken}` } } // Ajout du token JWT dans l'en-tête
      )
        .then(response => {
          this.successMessage = response.data.message;
          Swal.fire("Publié avec succès!"); // Affichage de l'alerte de succès
          this.message = '';
          this.fetchNotifications(); // Rafraîchir les notifications
          this.errorMessage = '';
        })
        .catch(error => {
          this.errorMessage = "Erreur lors de la soumission du besoin.";
          console.error("Erreur lors de la soumission du besoin :", error);
        });
    },
    fetchNotifications() {
      axios.get(`${this.apiUrl}/notifications/`)
        .then(response => {
          this.notifications = response.data;

          const now = Date.now(); // Date actuelle en millisecondes
          const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000); // Calcul de 7 jours en millisecondes

          // Filtrer les notifications pour afficher celles de moins de 7 jours
          this.notifications = this.notifications.filter(notification => {
            const notificationDate = new Date(notification.created_at).getTime();
            return notificationDate >= sevenDaysAgo;
          });

          // Séparer les nouvelles notifications des notifications déjà vues
          this.newNotifications = this.notifications.filter(n => !n.is_read);
          this.oldNotifications = this.notifications.filter(n => n.is_read);

          // Trier les nouvelles et anciennes notifications par date (plus récentes en premier)
          this.newNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          this.oldNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          // Mettre à jour le compteur de notifications non lues
          this.unreadCount = this.newNotifications.length; 
        })
        .catch(error => {
          this.errorMessage = "Erreur lors de la récupération des notifications.";
          console.error('Erreur lors de la récupération des notifications :', error);
        });
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.fetchNotifications(); // Rafraîchir les notifications
        this.markAllAsRead(); // Marquer toutes les notifications comme lues
      }
    },
    markAllAsRead() {
      axios.post(`${this.apiUrl}/mark_all_as_read/`)
        .then(() => {
          this.newNotifications = [];
          this.oldNotifications = this.notifications; 
          this.unreadCount = 0; 
        })
        .catch(error => {
          console.error('Erreur lors du marquage des notifications comme lues :', error);
        });
    },
    markNotificationAsRead(notification) {
      axios.post(`${this.apiUrl}/mark_notification_as_read/`, { id: notification.id })
        .then(() => {
          notification.is_read = true; // Mettre à jour l'état de la notification
          this.fetchNotifications(); // Rafraîchir les notifications
        })
        .catch(error => {
          console.error('Erreur lors du marquage de la notification comme lue :', error);
        });
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
}

.notification-icon {
  position: relative;
  cursor: pointer;
}

.notification-icon i {
  font-size: 24px;
}

.notification-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
}

.besoin-form {
  margin: 20px 0;
}

textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.notifications {
  margin-top: 20px;
}

.notifications h3 {
  margin-top: 10px;
}

.notifications ul {
  list-style-type: none;
  padding: 0;
}

.notifications li {
  background-color: #e9e9e9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.notifications li:hover {
  background-color: #d0d0d0;
}
</style>
