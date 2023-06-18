<script>
import MainPageDataTable from './components/MainPageDataTable.vue';
import AppBar from './components/AppBar.vue';
import RequestModal from './components/RequestModal.vue';

export default {
  components: {
    AppBar
  },

  created() {
    this.$store.dispatch("initResponsiblePersonsData")
    // this.$store.dispatch("initAccessRequestedSystemsData"),
    this.$store.dispatch("initAllRequestsData")
  }
}
</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
