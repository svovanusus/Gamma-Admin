<template>
  <div id="app">
    <component :is="layoutComponentName">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LayoutFactory from 'model/layout/LayoutFactory';
import LayoutBase from 'model/layout/LayoutBase';
import StoreState from 'store/StoreState';

import MainLayoutComponent from 'components/layout/MainLayoutComponent.vue';
import AuthLayoutComponent from 'components/layout/AuthLayoutComponent.vue';
import PageLayoutComponent from 'components/layout/PageLayoutComponent.vue';
import { StoreActions } from 'store/StoreTypes';

@Component({
  name: '',
  components: {
    MainLayoutComponent,
    AuthLayoutComponent,
    PageLayoutComponent,
  },
})
export default class AppComponent extends Vue {
  private layoutFactory: LayoutFactory = LayoutFactory.getInstance();

  public get state(): StoreState {
    return this.$store.state;
  }

  public get layout(): LayoutBase {
    return this.layoutFactory.getLayout(this.state.currentLayoutType);
  }

  public get layoutComponentName(): string {
    return this.layout?.layoutComponent ?? 'div';
  }

  public mounted(): void {
    this.$store.dispatch(StoreActions.FETCH_DOMAINS);
    this.$store.dispatch(StoreActions.FETCH_SITES);
  }
}
</script>