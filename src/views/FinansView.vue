<template>
    <div class="director pt-10">
        <h1 class="director-page-header text-center mb-10" color="#CD9394">Finans Onay Ekranı</h1>
        <div>
            <DataTable />
        </div>
        <div>
            <FinanceModal modalTitle="Finans Onay Ekranı" v-show=this.$store.state.isFinanceModalOpen>
            </FinanceModal>
        </div>
    </div>
</template>

<script>
import DataTable from '../components/MainPageDataTable.vue';
import FinanceModal from '../components/FinansTahkikModal.vue';

export default {
    name: "FinansView",
    components: {
        DataTable,
        FinanceModal
    },
}
</script>

<style>
.director-page-header {
    color: #B71C1C;
}
</style>