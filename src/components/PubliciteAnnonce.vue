<template>
    <div class="publicite-annonce">
      <h2>Publicité Bientôt Disponible</h2>
      <p>Restez à l'écoute ! Bientôt, vous pourrez acheter des espaces publicitaires ici.</p>
      <i class="fas fa-bullhorn fa-3x"></i>
    </div>
  </template>
  
  <script>
  export default {
    name: "PubliciteAnnonce"
  };
  </script>
  
  <style scoped>
  .publicite-annonce {
    text-align: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .publicite-annonce h2 {
    color: #ff9800;
  }
  
  .publicite-annonce p {
    font-size: 1.2em;
  }
  
  .publicite-annonce i {
    margin-top: 10px;
    color: #ff9800;
  }
  </style>
  