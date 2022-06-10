<template>
  <v-app app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'PageLayoutComponent',
  components: {},
})
export default class PageLayoutComponent extends Vue {}
</script>