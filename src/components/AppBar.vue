<template>
    <v-app-bar color="inherit">
        <v-toolbar-title>
            <div class="text-left">
                <RouterLink :to="{ name: 'home' }">
                    <img src='../assets/alisan-logo.png' width="150" />
                </RouterLink>
            </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <RouterLink :to="{ name: 'islem' }">
            <v-btn variant="text" color="red-darken-4"><strong>İşlemde Bekliyor</strong></v-btn>
        </RouterLink>
        <RouterLink :to="{ name: 'legal' }">
            <v-btn variant="text" color="red-darken-4"><strong>Hukukta Bekliyor</strong></v-btn>
        </RouterLink>
        <RouterLink :to="{ name: 'finance' }">
            <v-btn variant="text" color="red-darken-4"><strong>Finansta Bekliyor</strong></v-btn>
        </RouterLink>
        <v-btn icon @click="toggleTheme">
            <Transition>
                <template v-if="this.theme.global.current.value.dark">
                    <v-icon>mdi-weather-sunny</v-icon>
                </template>
                <template v-else>
                    <v-icon>mdi-weather-night</v-icon>
                </template>
            </Transition>
        </v-btn>
    </v-app-bar>
</template>
  
<script>
import { useTheme } from 'vuetify/lib/framework.mjs';
export default {

    setup() {
        const theme = useTheme()

        return {
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        }
    },
}
</script>
  
<style scoped>
@media screen and (max-width: 959px) {
    .v-col {
        flex-basis: auto !important;
    }
}

.home-logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.vertical-nav-divider {
    margin-left: 1rem;
    margin-right: 1rem;
}

.nav-list-item {
    padding: 0.5rem !important;
    border-radius: 9px !important;
}

.v-navigation-drawer {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
}

.theme-switch {
    max-width: max-content;
}
</style>