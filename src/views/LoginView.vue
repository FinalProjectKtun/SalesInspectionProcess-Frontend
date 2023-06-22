<template>
    <div id="login-container">
        <v-container>
            <v-card elevation-19 class="pa-10">
                <v-row>
                    <v-col>
                        <img src='../assets/alisan-logo.png' width="200" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="text-left text-h5 mb-5">Kullanıcı Adı ya da E-mail</div>
                        <v-text-field append-inner-icon="mdi-email-outline" variant="outlined" v-model="username"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="text-left text-h5 mb-5">Şifre</div>
                        <v-text-field append-inner-icon="mdi-lock-outline" variant="outlined" v-model="password" type="password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn append-icon="mdi-login" block size="x-large" color="info" @click="validate()">Login</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "Login",

    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        ...mapActions(['signIn']),

        validate() {
            const userInfo = {
                usernameOrEmail: this.username,
                password: this.password
            }
            this.signIn(userInfo)
        }
    }
}
</script>