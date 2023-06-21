<template>
  <div>
    <h1>Liste des offres</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <input type="text" v-model="searchTerm" placeholder="Recherche..." /> <button @click="loadData">Reload</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Responsable</th>
            <th>Domaine</th>
            <th>Lieu</th>
            <th>Rythme</th>
            <th>Salaire</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            <th>SIREN</th>
            <th>Entreprise</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="offre in displayedOffres" :key="offre.id">
            <td>{{ offre.id }}</td>
            <td>{{ offre.nom }}</td>
            <td>{{ offre.responsable }}</td>
            <td>{{ offre.domaine }}</td>
            <td>{{ offre.lieu }}</td>
            <td>{{ offre.rythme }}</td>
            <td>{{ offre.salaire }}</td>
            <td>{{ offre.description }}</td>
            <td>{{ offre.status }}</td>
            <td>{{ offre.date }}</td>
            <td>{{ offre.siren }}</td>
            <td>{{ offre.entreprise }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <select v-model="sortType">
        <option value="recent">Trier du plus récent</option>
        <option value="old">Trier du plus ancien</option>
      </select>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      offres: [],
      loading: true,
      message: 'Offres de Happy Hire',
      searchTerm: '',
      currentPage: 1,
      sortType: 'recent',
      itemsPerPage: 2
    };
  },
  computed: {
    filteredOffres() {
      if (this.sortType == "recent") {
        return this.offres
          .filter(offre => {
            const term = this.searchTerm.toLowerCase();
            return Object.values(offre).some(val =>
              val.toString().toLowerCase().includes(term)
            );
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      else {
        return this.offres
          .filter(offre => {
            const term = this.searchTerm.toLowerCase();
            return Object.values(offre).some(val =>
              val.toString().toLowerCase().includes(term)
            );
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    },
    totalPages() {
      return Math.ceil(this.filteredOffres.length / this.itemsPerPage);
    },
    displayedOffres() {
      return this.filteredOffres.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    }
  },
  methods: {
    async loadData() {
      try {
      const response = await axios.get('http://localhost:3001/api/data');
      this.offres = response.data;
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  async created() {
    await this.loadData();
  },
};
</script>
  
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 5px;
  text-align: left;
}
</style>