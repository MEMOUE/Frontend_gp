<template>
  <div class="container m-5 p-4 border rounded shadow">
    <header class="text-center mb-4">
      <img src="logo.png" alt="Logo" class="mb-3" style="width: 150px;">
      <h1 class="fw-bold">Facture</h1>
      <p class="text-muted">gpmonde.com</p>
    </header>

    <form @submit.prevent="generatePDF">
      <!-- Programme de voyage -->
      <section class="mb-5">
        <h2 class="text-primary">Programme de Voyage</h2>
        <label for="programmeSelect" class="form-label">Sélectionnez un Programme</label>
        <select id="programmeSelect" v-model="selectedProgrammeId" class="form-select" @change="handleProgrammeSelection" required>
          <option value="" disabled>Choisissez un programme</option>
          <option v-for="programme in programmes" :key="programme.id" :value="programme.id">
            {{ programme.titre }}
          </option>
        </select>
      </section>

      <!-- Détails du programme -->
      <section v-if="programmeVoyage" class="mb-5">
        <h2 class="text-primary">Détails du Programme</h2>
        <div class="row g-3">
          <div class="col-md-6" v-for="(value, key) in programmeVoyage" :key="key">
            <label :for="key" class="form-label">{{ formatLabel(key) }}</label>
            <input :id="key" type="text" :value="value" class="form-control" disabled />
          </div>
        </div>
      </section>

      <!-- Informations de la facture -->
      <section class="mb-5">
        <h2 class="text-primary">Informations de la Facture</h2>
        <div class="row g-3">
          <div class="col-md-6" v-for="(value, key) in factureFields" :key="key">
            <label :for="key" class="form-label">{{ formatLabel(key) }}</label>
            <input :id="key" v-model="facture[key]" type="text" class="form-control" required />
          </div>
        </div>
        <div class="form-check mt-3">
          <input type="checkbox" id="verification" v-model="facture.verification" class="form-check-input" required />
          <label for="verification" class="form-check-label">Le colis a été vérifié</label>
        </div>
      </section>

      <!-- Signature -->
      <section class="mb-5 text-center">
        <h3 class="text-primary">Signature</h3>
        <canvas id="signature-pad" class="signature-pad border" width="400" height="200"></canvas>
        <button type="button" class="btn btn-secondary mt-2" @click="clearSignature">Effacer</button>
      </section>

      <!-- Bouton pour générer la facture -->
      <button type="submit" class="btn btn-primary w-100">Télécharger la Facture en PDF</button>
    </form>
  </div>
</template>

<script>
import axios from '../axios';
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure this import is correct
import SignaturePad from "signature_pad";

export default {
  data() {
    return {
      programmes: [],
      selectedProgrammeId: "",
      programmeVoyage: null,
      facture: {
        nom_client: "",
        contact: "",
        adresse: "",
        prix: "",
        valeur: "",
        verification: false,
      },
      signaturePad: null,
      factureFields: {
        nom_client: "Nom du Client",
        contact: "Contact",
        adresse: "Adresse",
        prix: "Prix du transport",
        valeur: "Valeur du colis",
      },
    };
  },
  methods: {
    async fetchProgrammes() {
      try {
        const response = await axios.get("/api/voyages-a-venir/");
        this.programmes = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des programmes:", error);
      }
    },
    handleProgrammeSelection() {
      this.programmeVoyage = this.programmes.find(p => p.id === this.selectedProgrammeId);
    },
    clearSignature() {
      this.signaturePad.clear();
    },
    formatLabel(key) {
      return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    generatePDF() {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 297] // A4 size in mm
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = pageWidth / 2;

      doc.addImage('logo.png', 'PNG', centerX - 25, 10, 50, 50);
      doc.setFontSize(20);
      doc.text("gpmonde.com", centerX, 70, { align: 'center' });
      doc.setFontSize(30);
      doc.text("Facture", centerX, 90, { align: 'center' });

      // Programme de voyage
      doc.setFontSize(18);
      doc.text("Programme de Voyage", centerX, 110, { align: 'center' });
      let yPosition = 120;
      const programmeVoyageFiltered = Object.entries(this.programmeVoyage).filter(([key]) => key !== 'id' && key !== 'user');
      const programmeData = programmeVoyageFiltered.map(([key, value]) => [this.formatLabel(key), value]);

      // Informations client
      doc.setFontSize(18);
      doc.text("Informations Client", centerX, yPosition + 10, { align: 'center' });
      yPosition += 20;
      const clientData = Object.entries(this.facture).filter(([key]) => key !== 'verification').map(([key, value]) => [this.formatLabel(key), value]);

      // Combine data
      const tableData = [...programmeData, ...clientData, ["Colis vérifié", this.facture.verification ? 'Oui' : 'Non']];

      // Add table
      doc.autoTable({
        startY: yPosition,
        head: [['Label', 'Valeur']],
        body: tableData,
        theme: 'grid',
        styles: { halign: 'center' },
        headStyles: { fillColor: [0, 0, 0] },
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 90 }
        }
      });

      yPosition = doc.lastAutoTable.finalY + 10;

      // Signature
      const signatureDataURL = this.signaturePad.toDataURL();
      doc.addImage(signatureDataURL, 'PNG', centerX - 25, yPosition, 50, 20);
      yPosition += 30;

      // Message de remerciement
      doc.setFontSize(12);
      doc.text("Merci pour votre confiance!", centerX, yPosition, { align: 'center' });
      doc.text("gpmonde.com", centerX, yPosition + 10, { align: 'center' });

      // Sauvegarde du PDF
      doc.save("facture.pdf");
    },
  },
  mounted() {
    this.fetchProgrammes();
    this.signaturePad = new SignaturePad(document.getElementById("signature-pad"));
  },
};
</script>

<style scoped>
.signature-pad {
  width: 100%;
  height: 200px;
  border: 2px dashed #007bff;
}
</style>
