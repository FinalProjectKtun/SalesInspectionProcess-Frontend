<template>
    <div>
        <v-dialog v-model="this.$store.state.isHukukModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
            <v-card>
                <v-card-title class="headline grey lighten-6" primary-title>
                    <strong>
                        {{ modalTitle }}
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
                        <!-- HUKUK TAHKİK BÖLÜMÜ -->
                        <v-row>
                            <v-col cols="12">
                                <v-card flat>
                                    <v-card-title class="headline grey lighten-6 pl-0 mb-5" primary-title>
                                        <strong>
                                            Hukuk Tahkik Bilgileri
                                        </strong>
                                    </v-card-title>
                                    <v-row>
                                        <v-col md="6" sm="12" lg="6">
                                            <h4 class="mb-3">Tahkik Yapan Kişi</h4>
                                            <v-select :items="responsiblePersons" item-title="name" variant="outlined"
                                                v-model="hukukTahkikYapanKisi"></v-select>
                                        </v-col>
                                        <v-col md="6" sm="12" lg="6">
                                            <h4 class="mb-3">Talep Tamamlanma Tarihi</h4>
                                            <div class="d-flex justify-center">
                                                <VDatePicker v-model="hukukTalepTamamlamaTarihi" :popover="false">
                                                    <template #default="{ togglePopover, inputValue, inputEvents }">
                                                        <v-text-field variant="outlined" :value="inputValue" readonly
                                                            v-on="inputEvents"
                                                            append-inner-icon="mdi-calendar-month-outline"
                                                            @click:append-inner="() => togglePopover()"></v-text-field>
                                                    </template>
                                                </VDatePicker>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="12" sm="12" lg="12">
                                            <h4 class="mb-3">Hukuksal İnceleme Sonuçları</h4>
                                            <v-text-field required variant="outlined"
                                                v-model="hukukBankaIncelemeSonuclari"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="12" sm="12" lg="12">
                                            <h4 class="mb-3">Açıklama</h4>
                                            <v-text-field required variant="outlined"
                                                v-model="hukukAciklama"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        <!--    -->
                        <v-card-actions>
                            <v-btn size="large" mb- ml-4 color="green-lighten-1"
                                @click="closeModal(), onApprove(), submitData()">
                                <strong>Onayla</strong>
                            </v-btn>
                            <v-btn size="large" mb-6 ml-8 color="red-darken-4" @click="showNestedDialog = true">
                                <strong>Red</strong>
                            </v-btn>
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
import { mapActions } from 'vuex';
import { ref } from 'vue';
export default {

    props: {
        modalTitle: {
            type: String
        }
    },

    data: () => ({
        hukukTahkikYapanKisi: '',
        hukukTalepTamamlamaTarihi: ref(new Date()),
        hukukBankaIncelemeSonuclari: '',
        hukukAciklama: ''
    }),

    methods: {
        ...mapActions(['postLegalRequestData']),

        onApprove() {
            // Onaylama işlemi
            if (this.$route.name === 'legal' && this.requestData.finansStatus !== null) {
                this.requestData.status = "Onaylandı"
            }

            else if (this.$route.name === 'legal' && this.requestData.finansStatus === null) {
                this.requestData.status = "Finans Onayı Bekleniyor"
            }
            this.$store.dispatch('updateStatusOfRequest')
        },

        submitData() {
            const formattedDate = this.hukukTalepTamamlamaTarihi.toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
            const data = {
                id: this.requestData.id,
                hukukTahkikYapanKisi: this.hukukTahkikYapanKisi,
                hukukTalepTamamlamaTarihi: formattedDate,
                hukukBankaIncelemeSonuclari: this.hukukBankaIncelemeSonuclari,
                hukukAciklama: this.hukukAciklama,
                hukukStatus: 'Hukuk Tarafından Onaylandı'
            }

            this.postLegalRequestData(data);
        },

        closeModal() {
            this.$store.commit('CLOSE_MODAL')
        },
    },

    computed: {
        responsiblePersons() {
            return this.$store.state.responsiblePersons;
        },

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