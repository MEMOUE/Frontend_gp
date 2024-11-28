import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Importez le fichier CSS pour les notifications

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toast, {
    // Options de configuration pour les notifications
    position: 'top-right', // Position des notifications
    timeout: 5000, // Durée d'affichage des notifications
    closeOnClick: true, // Fermer la notification sur un clic
    pauseOnHover: true, // Mettre en pause l'affichage lors du survol
    draggable: true, // Rendre la notification draggable
    draggablePercent: 0.6, // Pourcentage de déplacement de la notification
});

app.mount('#app');
