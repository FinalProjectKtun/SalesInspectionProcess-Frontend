<template>
    <v-card class="pa-2" flat>
        <div class="notice-wrapper pt-5 pb-5 pl-5 pr-5 mt-10" v-if="this.filteredRequestList.length === 0 && this.$route.name !== 'home'">
            <div>
                <v-card variant="outlined">
                    <v-alert type="info" title="No Data" text="Henüz Gösterilecek Bir Talep Bulunamadı!">
                    </v-alert>
                </v-card>
            </div>
        </div>
        <v-data-table v-else :items-per-page="itemsPerPage" :search="search" :headers="headers" :items="filteredRequestList"
            item-value="ad" class="elevation-6">
            <template v-slot:top>
                <v-toolbar flat
                    :style="this.theme.global.current.value.dark ? { backgroundColor: 'inherit' } : { backgroundColor: 'white' }">

                    <v-btn v-if="this.$route.name === 'home'" color="#13C56B" prepend-icon="mdi-plus" variant="flat"
                        class="text-white font-weight-bold" @click="openModal()">Yeni
                        Tahkik Talebi</v-btn>
                    <v-spacer v-if="this.$route.name === 'home'"></v-spacer>
                    <v-text-field class="mx-4" v-model="search" label="Search" single-line hide-details
                        style="background: none;" variant="outlined" prepend-inner-icon="mdi-magnify" density="compact"
                        width="100px">
                    </v-text-field>
                </v-toolbar>
                <v-divider class="my-4"></v-divider>
            </template>
            <template v-slot:[`item.islem`]="{ item }">
                <div v-if="$route.name !== 'home'">
                    <v-btn color="blue-lighten-5" size="small" @click="openConModal(item.raw)">
                        <strong>
                            İşlem
                        </strong>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn color="blue" size="small" @click="openDetailModal(item.raw)">
                        Detaylar
                    </v-btn>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { useTheme } from 'vuetify/lib/framework.mjs';
export default {
    data() {
        return {
            search: '',
            itemsPerPage: 5,
            headers: [
                { title: 'ID', align: 'center', key: 'id' },
                { title: 'T. Eden', align: 'center', key: 'talepEdenKisi' },
                { title: 'T. Tarihi', align: 'center', key: 'talepTarihi' },
                { title: 'Firma Adı', align: 'center', key: 'firmaAdi', },
                { title: 'F. Satış Temsilcisi', align: 'center', key: 'firmaSatisTemsilcisi' },
                { title: 'F. Vergi Dairesi', align: 'center', key: 'firmaVergiDairesi', sortable: false },
                { title: 'Açıklama', align: 'center', key: 'aciklama' },
                { title: 'Firma Adres', align: 'center', key: 'firmaAdres', sortable: false },
                { title: 'Durum', align: 'center', key: 'status', sortable: false },
                { title: 'İşlem', align: 'center', key: 'islem', sortable: false }
            ]
        }
    },

    setup() {
        const theme = useTheme()

        return {
            theme,
        }
    },

    methods: {
        openModal() {
            this.$store.commit('OPEN_REQUEST_MODAL')
        },

        openDetailModal(item) {
            this.$store.commit('OPEN_DETAILS_MODAL')
            this.$store.dispatch('getRequestDataToModal', item)
            console.log(item);
        },

        openConModal(item) {
            if (this.$route.name === 'finance') {
                this.$store.dispatch('openFinanceModal')
            }

            else if (this.$route.name === 'legal') {
                this.$store.dispatch('openHukukModal')
            }
            else {
                this.$store.dispatch('openConModal')
            }
            this.$store.dispatch('getRequestDataToModal', item)
        },
    },

    computed: {
        filteredRequestList() {
            if (this.$route.name === 'islem') {
                return this.$store.state.allRequestsData.filter(item => item.status === 'İslem Bekliyor');
            }

            else if (this.$route.name === 'finance') {
                return this.$store.state.allRequestsData.filter(item => item.finansStatus === null && item.status !== 'İslem Bekliyor' && item.status !== 'Reddedildi' && item.status !== 'Hukuk Onayı Bekleniyor');
            }

            else if (this.$route.name === 'legal') {
                return this.$store.state.allRequestsData.filter(item => item.hukukStatus === null && item.status !== 'İslem Bekliyor' && item.status !== 'Reddedildi' && item.status !== 'Finans Onayı Bekleniyor');
            }
            else {
                return this.$store.state.allRequestsData;
            }
        },
    },
}
</script>
<style scoped>
.v-data-table__td>.v-data-table-header__content {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.v-input {
    max-width: 200px;
}

table {
    font-size: 0.5rem !important;
}
</style>