<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <div class="profile-info">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Prénom:</strong> {{ user.first_name }}</p>
      <p><strong>Nom:</strong> {{ user.last_name }}</p>
      <p><strong>Téléphone:</strong> {{ user.phone }}</p> <!-- Champ Téléphone ajouté -->
    </div>
    <button @click="goToEditProfile" class="edit-btn">Modifier le Profil</button>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user; // Récupère les infos de l'utilisateur connecté depuis Vuex
    },
  },
  methods: {
    goToEditProfile() {
      this.$router.push('/edit-profile'); // Redirection vers la page de modification du profil
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  background-color: #f5f5f5; /* Couleur de fond */
  padding: 20px; /* Espacement interne */
}

h1 {
  margin-bottom: 20px; /* Marge en bas du titre */
  font-size: 2em; /* Taille du texte du titre */
  color: #333; /* Couleur du texte du titre */
}

.profile-info {
  text-align: left; /* Alignement du texte à gauche */
  margin-bottom: 20px; /* Marge en bas du bloc d'infos du profil */
  width: 100%; /* Prend toute la largeur disponible */
  max-width: 400px; /* Largeur maximale du bloc */
  background: #fff; /* Couleur de fond du bloc */
  border-radius: 8px; /* Bords arrondis */
  padding: 20px; /* Espacement interne du bloc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre autour du bloc */
}

.profile-info p {
  margin: 10px 0; /* Marge en haut et en bas des paragraphes */
}

.profile-info strong {
  color: #555; /* Couleur du texte en gras */
}

.edit-btn {
  padding: 10px 20px; /* Espacement interne du bouton */
  border: none; /* Pas de bordure */
  border-radius: 5px; /* Bords arrondis */
  background-color: #007bff; /* Couleur de fond du bouton */
  color: #fff; /* Couleur du texte du bouton */
  font-size: 1em; /* Taille du texte du bouton */
  cursor: pointer; /* Changement de curseur au survol */
  transition: background-color 0.3s ease; /* Transition de couleur au survol */
}

.edit-btn:hover {
  background-color: #0056b3; /* Couleur du bouton au survol */
}
</style>
