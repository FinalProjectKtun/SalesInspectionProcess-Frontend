<template>
    <div class="director pt-10">
        <h1 class="director-page-header d-flex justify-center mb-10" color="#CD9394">Hukuk Onay Ekranı</h1>
        <div>
            <DataTable />
        </div>
        <div>
            <ConfirmationModal modalTitle="Hukuk Onay Ekranı" v-show=this.$store.state.isHukukModalOpen>
            </ConfirmationModal>
        </div>
    </div>
</template>

<script>
import DataTable from '../components/MainPageDataTable.vue';
import ConfirmationModal from '../components/HukukTahkikModal.vue';

export default {
    name: "Hukuk",
    components: {
        DataTable,
        ConfirmationModal
    },
}
</script>

<style>
.director-page-header {
    color: #B71C1C;
}
</style>