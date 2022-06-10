<template>
  <v-app-bar app flat dense color="indigo darken-3" dark>
    <div v-if="!state.navigationDrawerState" class="branding mr-4">
      <v-img src="/src/assets/logo.svg" :width="124" :height="48" />
    </div>

    <v-app-bar-title v-text="state.pageTitle" />

    <v-spacer />

    <v-btn text to="/profile" class="mr-2">Profile</v-btn>
    <v-btn text to="/sign-in">Exit</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import StoreState from 'store/StoreState';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AppHeader',
  components: {},
})
export default class AppHeader extends Vue {
  public get state(): StoreState {
    return this.$store.state;
  }
}
</script>