<template>
  <v-navigation-drawer v-model="state.navigationDrawerState" app>
    <v-toolbar dense flat color="indigo darken-3" dark>
      <div class="branding mr-4">
        <v-img src="/src/assets/logo.svg" :width="124" :height="48" />
      </div>
      <v-toolbar-title />
    </v-toolbar>
    <v-list nav dense>
      <v-list-item-group :value="activePage" color="primary" mandatory>
        <v-list-item to="/sites">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sites</v-list-item-title>
        </v-list-item>

        <v-list-item to="/domains">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Domains</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
::v-deep .v-navigation-drawer__content {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 48px;
    right: 0;
    height: calc(100% - 48px);
    width: 1px;
    background: rgba(0, 0, 0, 0.12);
  }
}
</style>

<script lang="ts">
import StoreState from 'store/StoreState';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AppDrawer',
  components: {},
})
export default class AppDrawer extends Vue {
  private readonly pages: string[] = ['site', 'domain'];

  public get state(): StoreState {
    return this.$store.state;
  }

  public get activePage(): number {
    const pageName = this.$route.name;
    if (!pageName) return -1;
    return this.pages.findIndex(x => pageName.indexOf(x) > -1);
  }
}
</script>