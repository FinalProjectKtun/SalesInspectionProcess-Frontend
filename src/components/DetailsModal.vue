<template>
    <div>
        <v-dialog v-model="this.$store.state.isDetailsModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
            <v-card>
                <v-card-title class="headline grey lighten-6" primary-title>
                    <strong>
                        {{ modalTitle }}
                    </strong>
                </v-card-title>
                <v-card-title class="headline grey lighten-6" primary-title>
                    <strong>
                        Talep Bilgileri
                    </strong>
                </v-card-title>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Talep Eden</h4>
                                <v-text-field variant="outlined">{{ requestData.talepEdenKisi }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Talep Tarihi</h4>
                                <div class="d-flex justify-center">
                                    <v-text-field variant="outlined" readonly
                                        append-inner-icon="mdi-calendar-month-outline">{{ requestData.talepTarihi
                                        }}</v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Firma Adı</h4>
                                <v-text-field variant="outlined">{{ requestData.firmaAdi }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Firma Satış Temsilcisi</h4>
                                <v-text-field variant="outlined">{{ requestData.firmaSatisTemsilcisi }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Vergi Dairesi</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.firmaVergiDairesi }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Vergi No</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.firmaVergiNo }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Açıklama</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.aciklama }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Adres</h4>
                                <v-text-field required variant="outlined">{{
                                    requestData.firmaAdres }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="this.requestData.status === 'Reddedildi'">
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Red Sebebi</h4>
                                <v-text-field readonly required variant="outlined">{{
                                    requestData.reasonForRejection }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Reddeden Kişi</h4>
                                <v-text-field readonly required variant="outlined">{{
                                    requestData.reasonForRejectionPerson }}</v-text-field>
                            </v-col>
                        </v-row>
                        <div v-if="this.requestData.status !== 'Reddedildi'">
                            <!-- FİNANS TAHKİK BÖLÜMÜ -->
                            <v-row>
                                <v-col>
                                    <v-card flat>
                                        <v-card-title class="headline grey lighten-6 pl-0 mb-5" primary-title>
                                            <strong>
                                                Finans Tahkik Bilgileri
                                            </strong>
                                        </v-card-title>
                                        <v-row>
                                            <v-col md="6" sm="12" lg="6">
                                                <h4 class="mb-3">Tahkik Yapan Kişi</h4>
                                                <v-text-field item-title="name" readonly variant="outlined">{{
                                                    requestData.finansTahkikYapanKisi }}</v-text-field>
                                            </v-col>
                                            <v-col md=" 6" sm="12" lg="6">
                                                <h4 class="mb-3">Talep Tamamlanma Tarihi</h4>
                                                <div class="d-flex justify-center">
                                                    <v-text-field variant="outlined" readonly
                                                        append-inner-icon="mdi-calendar-month-outline">{{
                                                            requestData.finansTalepTamamlamaTarihi }}</v-text-field>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col md="12" sm="12" lg="12">
                                                <h4 class="mb-3">Banka İnceleme Sonuçları</h4>
                                                <v-text-field readonly required variant="outlined">{{
                                                    requestData.finansBankaIncelemeSonuclari }}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col md="12" sm="12" lg="12">
                                                <h4 class="mb-3">Açıklama</h4>
                                                <v-text-field readonly required variant="outlined">{{
                                                    requestData.finansAciklama }}</v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <!--    -->

                            <!-- HUKUK TAHKİK BÖLÜMÜ -->
                            <v-row>
                                <v-col>
                                    <v-card flat>
                                        <v-card-title class="headline grey lighten-6 pl-0 mb-5" primary-title>
                                            <strong>
                                                Hukuk Tahkik Bilgileri
                                            </strong>
                                        </v-card-title>
                                        <v-row>
                                            <v-col md="6" sm="12" lg="6">
                                                <h4 class="mb-3">Tahkik Yapan Kişi</h4>
                                                <v-text-field item-title="name" readonly variant="outlined">{{
                                                    requestData.hukukTahkikYapanKisi }}</v-text-field>
                                            </v-col>
                                            <v-col md=" 6" sm="12" lg="6">
                                                <h4 class="mb-3">Talep Tamamlanma Tarihi</h4>
                                                <div class="d-flex justify-center">
                                                    <v-text-field variant="outlined" readonly
                                                        append-inner-icon="mdi-calendar-month-outline">{{
                                                            requestData.hukukTalepTamamlamaTarihi }}</v-text-field>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col md="12" sm="12" lg="12">
                                                <h4 class="mb-3">Hukuksal İnceleme Sonuçları</h4>
                                                <v-text-field readonly required variant="outlined">{{
                                                    requestData.hukukBankaIncelemeSonuclari }}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col md="12" sm="12" lg="12">
                                                <h4 class="mb-3">Açıklama</h4>
                                                <v-text-field readonly required variant="outlined">{{
                                                    requestData.hukukAciklama }}</v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <!-- -->
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn size="large" mb-4 ml-4 color="primary" @click="closeModal()">
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
    
<script>
export default {

    props: {
        modalTitle: {
            type: String
        }
    },

    methods: {
        closeModal() {
            this.$store.commit('CLOSE_MODAL')
        },
    },

    computed: {

        requestData() {
            return this.$store.state.requestData;
        },
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

body {
    font-family: 'Karla', sans-serif !important;
}
</style>