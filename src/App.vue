<template>
  <div id="app">
    <HeaderComponent />
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'; // Assurez-vous que le chemin est correct
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default {
  name: 'App',
  components: {
    HeaderComponent, // Utilisez "Header" ici car c'est ainsi que vous avez importé le composant
  },
};
</script>

<style>
/* Vos styles ici */
</style>
