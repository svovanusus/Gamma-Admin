<template>
  <v-app app>
    <v-app-bar app flat dense dark color="grey darken-1">
      <div class="branding mr-4">
        <v-img src="/src/assets/logo.svg" :width="124" :height="48" />
      </div>
      <v-app-bar-title>Admin Panel</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-sheet class="d-flex flex-column align-center">
        <v-card elevation="4" rounded="lg" width="100%" max-width="420px" min-width="320px" class="ma-6 mt-16">
          <v-toolbar flat dense dark color="indigo darken-3" class="page-title">
            <v-toolbar-title v-text="state.pageTitle" />
          </v-toolbar>
          <v-card-text>
            <slot />
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
::v-deep .page-title .v-toolbar__content {
  justify-content: center;
}
</style>

<script lang="ts">
import StoreState from 'store/StoreState';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AuthLayoutComponent',
  components: {},
})
export default class AuthLayoutComponent extends Vue {
  public get state(): StoreState {
    return this.$store.state;
  }

  public mounted(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.replace('/sites');
    }
  }
}
</script>