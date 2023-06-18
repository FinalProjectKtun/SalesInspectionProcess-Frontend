<template>
    <div class="director pt-10">
        <!-- <DirectorPage /> -->
        <h1 class="director-page-header d-flex justify-center mb-10" color="#CD9394">İlk İnceleme</h1>
        <div>
            <DataTable />

        </div>
        <div>
            <ConfirmationModal modalTitle="Finans Onay Ekranı" v-show = this.$store.state.isConModalOpen>
            </ConfirmationModal>
        </div>
    </div>
</template>

<script>
import DataTable from '../components/MainPageDataTable.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';

export default {
    name: "IslemView",
    components: {
        DataTable,
        ConfirmationModal
    },

    data: () => ({

    })
}
</script>

<style>
.director-page-header {
    color: #B71C1C;
}
</style>