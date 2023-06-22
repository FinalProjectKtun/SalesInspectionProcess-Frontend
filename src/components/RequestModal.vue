<template>
    <div>
        <v-dialog v-model="this.$store.state.isModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
            <v-card>
                <v-card-title class="headline grey lighten-6" primary-title>
                    <strong>
                        Yeni Tahkik Talebi
                    </strong>
                </v-card-title>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Talep Eden</h4>
                                <v-select :items="responsiblePersons" item-title="name" variant="outlined"
                                    v-model="talepEdenKisi"></v-select>
                            </v-col>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Talep Tarihi</h4>
                                <div class="d-flex justify-center">
                                    <VDatePicker v-model="date" :popover="false">
                                        <template #default="{ togglePopover, inputValue, inputEvents }">
                                            <v-text-field variant="outlined" :value="inputValue" readonly v-on="inputEvents"
                                                append-inner-icon="mdi-calendar-month-outline"
                                                @click:append-inner="() => togglePopover()"></v-text-field>
                                        </template>
                                    </VDatePicker>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Firma Adı</h4>
                                <v-text-field variant="outlined" v-model="firmaAdi"></v-text-field>
                            </v-col>
                            <v-col md="6" sm="12">
                                <h4 class="mb-3">Firma Satış Temsilcisi</h4>
                                <v-text-field v-model="firmaSatisTemsilcisi" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                            <v-col cols="12" md="12">
                                <h4 class="mb-3">Adres</h4>
                                <v-text-field :value="selectedPersonPhone" required variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="4">
                                <h4 class="mb-3">Teminat Mektubu Cinsi</h4>
                                <v-select :items="['Kesin', 'Geçici', 'Avans']" variant="outlined"></v-select>
                            </v-col>
                            <v-col md="4">
                                <h4 class="mb-3">Vergi Dairesi</h4>
                                <v-text-field v-model="connectionStartTime" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col md="4">
                                <h4 class="mb-3">Vergi No</h4>
                                <v-text-field v-model="connectionEndTime" required variant="outlined"></v-text-field>
                            </v-col>
                        </v-row> -->
                        <v-row>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Vergi Dairesi</h4>
                                <v-text-field required variant="outlined" v-model="firmaVergiDairesi"></v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Vergi No</h4>
                                <v-text-field required variant="outlined" v-model="firmaVergiNo"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Açıklama</h4>
                                <v-text-field required variant="outlined" v-model="aciklama"></v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Adres</h4>
                                <v-text-field required variant="outlined" v-model="firmaAdres"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn size="x-large" mb-4 ml-4 color="green" @click="closeModal(), submitData()">
                                Kaydet
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn size="x-large" mb-4 ml-4 color="primary" @click="closeModal()">
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
        talepEdenKisi: '',
        talepTarihi: '',
        firmaAdi: '',
        firmaSatisTemsilcisi: '',
        firmaAdres: '',
        firmaVergiDairesi: '',
        firmaVergiNo: '',
        aciklama: '',
        date: ref(new Date())
    }),


    methods: {
        ...mapActions(['postRequestData']),

        submitData() {
            const formattedDate = this.date.toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
            const data = {
                talepEdenKisi: this.talepEdenKisi,
                talepTarihi: formattedDate,
                firmaAdi: this.firmaAdi,
                firmaSatisTemsilcisi: this.firmaSatisTemsilcisi,
                firmaAdres: this.firmaAdres,
                firmaVergiDairesi: this.firmaVergiDairesi,
                firmaVergiNo: this.firmaVergiNo,
                aciklama: this.aciklama,
            }

            this.postRequestData(data);
        },

        closeModal() {
            this.$store.commit('CLOSE_MODAL')
        },
    },

    computed: {
        responsiblePersons() {
            return this.$store.state.responsiblePersons;
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