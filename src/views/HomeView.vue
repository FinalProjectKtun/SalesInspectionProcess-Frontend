<template>
    <div class="home">
        <h1 class="director-page-header d-flex justify-center mb-10" color="#CD9394">Ana Ekran</h1>
        <DataTable />
        <RequestModal v-show="this.$store.state.isModalOpen"/>
        <DetailsModal  modalTitle="Detaylar" v-show="this.$store.state.isDetailsModalOpen"/>
    </div>
</template>

<script>
import DataTable from '../components/MainPageDataTable.vue';
import RequestModal from '../components/RequestModal.vue';
import DetailsModal from '../components/DetailsModal.vue';

export default {
    name: "HomeView",
    components: {
    DataTable,
    RequestModal,
    DetailsModal
},

    data: () => ({

    })
}
</script>