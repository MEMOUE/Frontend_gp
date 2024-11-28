<template>
    <div class="contenaire m-5 p-2">
      <h1>Générer une Facture</h1>
      <form @submit.prevent="generatePDF">
        <!-- Sélection du Programme de Voyage -->
        <div class="mb-3">
          <label for="programmeSelect" class="form-label">Sélectionnez un Programme</label>
          <select
            id="programmeSelect"
            v-model="selectedProgrammeId"
            class="form-select"
            @change="handleProgrammeSelection"
            required
          >
            <option value="" disabled>Choisissez un programme</option>
            <option v-for="programme in programmes" :key="programme.id" :value="programme.id">
              {{ programme.titre }}
            </option>
          </select>
        </div>
  
        <!-- Programme de Voyage (prérempli et non modifiable) -->
        <h2>Programme de Voyage</h2>
        <div v-if="programmeVoyage">
          <div class="mb-3">
            <label for="titre" class="form-label">Titre</label>
            <input type="text" v-model="programmeVoyage.titre" class="form-control" id="titre" disabled />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea v-model="programmeVoyage.description" class="form-control" id="description" disabled></textarea>
          </div>
          <div class="mb-3">
            <label for="date_depart" class="form-label">Date de Départ</label>
            <input type="datetime-local" v-model="programmeVoyage.date_depart" class="form-control" id="date_depart" disabled />
          </div>
          <div class="mb-3">
            <label for="date_arrivee" class="form-label">Date d'Arrivée</label>
            <input type="datetime-local" v-model="programmeVoyage.date_arrivee" class="form-control" id="date_arrivee" disabled />
          </div>
          <div class="mb-3">
            <label for="pays_depart" class="form-label">Pays de Départ</label>
            <input type="text" v-model="programmeVoyage.pays_depart" class="form-control" id="pays_depart" disabled />
          </div>
          <div class="mb-3">
            <label for="pays_arrivee" class="form-label">Pays d'Arrivée</label>
            <input type="text" v-model="programmeVoyage.pays_arrivee" class="form-control" id="pays_arrivee" disabled />
          </div>
        </div>
  
        <!-- Informations de la Facture -->
        <h2>Informations de la Facture</h2>
        <div class="mb-3">
          <label for="nomClient" class="form-label">Nom du Client</label>
          <input type="text" v-model="facture.nom_client" class="form-control" id="nomClient" required />
        </div>
        <div class="mb-3">
          <label for="contact" class="form-label">Contact</label>
          <input type="tel" v-model="facture.contact" class="form-control" id="contact" required />
        </div>
        <div class="mb-3">
          <label for="adresse" class="form-label">Adresse</label>
          <input type="text" v-model="facture.adresse" class="form-control" id="adresse" required />
        </div>
        <div class="mb-3">
          <label for="valeur" class="form-label">Valeur</label>
          <input type="number" v-model="facture.valeur" class="form-control" id="valeur" required />
        </div>
  
        <!-- Champ de Signature -->
        <h3>Signature</h3>
        <div>
          <canvas id="signature-pad" class="signature-pad" width="400" height="200"></canvas>
        </div>
        <div>
          <button type="button" class="btn btn-secondary" @click="clearSignature">Effacer</button>
        </div>
  
        <button type="submit" class="btn btn-primary">Télécharger la Facture en PDF</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  import jsPDF from "jspdf";
  import SignaturePad from "signature_pad";
  
  export default {
    data() {
      return {
        programmes: [], // Liste des programmes récupérés depuis l'API
        selectedProgrammeId: "", // ID du programme sélectionné
        programmeVoyage: null, // Programme sélectionné pour préremplir les champs
        facture: {
          nom_client: "",
          contact: "",
          adresse: "",
          valeur: "",
          signature: null,
        },
        signaturePad: null, // Référence pour le champ de signature
      };
    },
    methods: {
      async fetchProgrammes() {
        try {
          const response = await axios.get("/api/programmes/");
          this.programmes = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des programmes :", error);
        }
      },
      handleProgrammeSelection() {
        this.programmeVoyage = this.programmes.find(
          (programme) => programme.id === this.selectedProgrammeId
        );
      },
      clearSignature() {
        this.signaturePad.clear();
      },
      generatePDF() {
        const doc = new jsPDF();
  
        // Ajouter le logo et le nom de la plateforme
        const logo = 'logo.png'; // Ce chemin doit être relatif à la racine
        doc.addImage(logo, 'PNG', 10, 10, 50, 50);
        doc.text("gpmonde.com", 70, 20);
  
        // Ajouter les informations du programme de voyage
        doc.text("Facture", 10, 70);
        doc.text("Programme de Voyage", 10, 80);
        doc.text(`Titre: ${this.programmeVoyage.titre}`, 10, 90);
        doc.text(`Description: ${this.programmeVoyage.description}`, 10, 100);
        doc.text(`Date de Départ: ${this.formatDate(this.programmeVoyage.date_depart)}`, 10, 110);
        doc.text(`Date d'Arrivée: ${this.formatDate(this.programmeVoyage.date_arrivee)}`, 10, 120);
        doc.text(`Pays de Départ: ${this.programmeVoyage.pays_depart}`, 10, 130);
        doc.text(`Pays d'Arrivée: ${this.programmeVoyage.pays_arrivee}`, 10, 140);
  
        // Ajouter les informations de la facture
        doc.text("Informations Client", 10, 160);
        doc.text(`Nom du Client: ${this.facture.nom_client}`, 10, 170);
        doc.text(`Contact: ${this.facture.contact}`, 10, 180);
        doc.text(`Adresse: ${this.facture.adresse}`, 10, 190);
        doc.text(`Valeur: ${this.facture.valeur}`, 10, 200);
  
        // Ajouter le numéro du reçu
        doc.text(`Numéro de Reçu: ${this.receivedNumber}`, 10, 210);
  
        // Ajouter la signature capturée
        const signatureDataURL = this.signaturePad.toDataURL();
        doc.addImage(signatureDataURL, 'PNG', 10, 220, 50, 20);
  
        // Ajouter le pied de page avec la plateforme
        doc.text("Merci pour votre confiance!", 10, 270);
        doc.text("gpmonde.com", 10, 280);
  
        // Sauvegarder le PDF
        doc.save("facture.pdf");
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
      },
    },
    mounted() {
      this.fetchProgrammes();
      // Initialisation de SignaturePad
      const canvas = document.getElementById("signature-pad");
      this.signaturePad = new SignaturePad(canvas);
    },
  };
  </script>
  
  <style scoped>
  .signature-pad {
    border: 1px solid #000;
    margin-bottom: 10px;
  }
  </style>
  