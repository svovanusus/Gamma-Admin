<template>
  <v-app app>
    <app-header />
    <app-drawer />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from 'components/layout/parts/AppHeader.vue';
import AppDrawer from 'components/layout/parts/AppDrawer.vue';

@Component({
  name: 'MainLayoutComponent',
  components: {
    AppHeader,
    AppDrawer
  },
})
export default class MainLayoutComponent extends Vue {}
</script>