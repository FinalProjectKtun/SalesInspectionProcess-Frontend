<template>
    <div>
        <v-dialog v-model="this.$store.state.isConModalOpen" @input="$emit('update:value', $event)" max-width="1000px">
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
                                <v-text-field required variant="outlined" v-model="requestDescription">{{
                                    requestData.firmaVergiDairesi }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Vergi No</h4>
                                <v-text-field required variant="outlined" v-model="requestDescription">{{
                                    requestData.firmaVergiNo }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Açıklama</h4>
                                <v-text-field required variant="outlined" v-model="requestDescription">{{
                                    requestData.aciklama }}</v-text-field>
                            </v-col>
                            <v-col md="6" sm="12" lg="6">
                                <h4 class="mb-3">Firma Adres</h4>
                                <v-text-field required variant="outlined" v-model="requestDescription">{{
                                    requestData.firmaAdres }}</v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn size="large" mb- ml-4 color="green-lighten-1" @click="closeModal(), onApprove()">
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
                        <v-dialog v-model="showNestedDialog" persistent :position-x="0" :position-y="1" max-width="800px">
                            <v-card class="rejection-modal-wrapper pa-4">
                                <v-card-title><strong>Red Sebebini Giriniz</strong></v-card-title>
                                <v-row>
                                    <v-col cols="6" md="6">
                                        <h4 class="mb-3">Açıklama</h4>
                                        <v-text-field variant="outlined" placeholder="Red Sebebi"
                                            v-model="rejectionDescription"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <h4 class="mb-3">Red Gerçekleştiren Kişi</h4>
                                        <v-text-field variant="outlined">{{ requestData.talepEdenKisi }}</v-text-field>
                                    </v-col>
                                </v-row>
                                <v-card-actions>
                                    <v-btn color="green darken-1" text
                                        @click="showNestedDialog = false, onReject(), closeModal()"><strong>Gönder</strong></v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text
                                        @click="showNestedDialog = false"><strong>Kapat</strong></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
    
<script>
import { mapActions } from 'vuex';
export default {

    props: {
        modalTitle: {
            type: String
        }
    },

    data: () => ({
        selectedPersonName: null,
        selectedPersonPhone: null,
        selectedSystemName: null,
        connectionStartTime: '',
        connectionEndTime: null,
        supplierName: null,
        requestDescription: null,
        rejectionDescription: null,
        showNestedDialog: false,
    }),

    methods: {
        ...mapActions(['postRequestData']),
        ...mapActions(['initReasonForRejection']),
        ...mapActions(['updateStatusOfRequest']),

        onApprove() {
            // Onaylama işlemi
            if (this.$route.name === 'islem') {
                this.requestData.status = "Hukuk ve Finans Onayı Bekleniyor"
            }
            this.updateStatusOfRequest()
        },

        onReject() {
            console.log(this.requestData.reasonForRejectionPerson);
            console.log('talep eden' ,this.requestData.talepEdenKisi);
            console.log(this.rejectionDescription);
            this.requestData.status = "Reddedildi"
            this.requestData.reasonForRejection = this.rejectionDescription
            this.requestData.reasonForRejectionPerson = this.requestData.talepEdenKisi
            this.updateStatusOfRequest()
            this.initReasonForRejection()
        },

        submitData() {
            const data = [
                {
                    supplierName: this.supplierName,
                    supplierDate: this.requestDate,
                    personResponsibleForTheRequest: this.selectedPersonName,
                    phoneNumOfThePerResForTheReq: this.selectedPersonPhone,
                    supplierConnectSystemName: this.selectedSystemName,
                    supplierConnectStarted: this.connectionStartTime,
                    supplierConnectEnd: this.connectionEndTime,
                    description: this.requestDescription,
                }
            ]

            this.postRequestData(data);
        },

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