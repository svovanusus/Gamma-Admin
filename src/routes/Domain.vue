<template>
  <div class="page pa-4">
    <v-sheet rounded elevation="2" color="white" class="pa-2">
      <v-text-field v-model="domain.name" label="Name" readonly outlined dense hide-details class="mb-2" />
      <p v-if="usedFor">Used for site: '{{ usedFor.name }}'</p>
      <p v-else>Unused</p>
    </v-sheet>
    <div class="actions d-flex mt-4">
      <v-spacer />
      <v-btn color="secondary" dark class="mr-2" @click="back()">
        <v-icon>mdi-close</v-icon>
        Cancel
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import DomainModel from 'model/remote/Domain';
import Site from 'model/remote/Site';

@Component({
  name: 'Domain',
  components: {},
})
export default class Domain extends RouteComponentBase {
  @Prop({ default: 0 }) public readonly domainId!: number;

  public constructor() {
    super('Domain');
  }

  public get domain(): DomainModel {
    const id = Number(this.domainId);
    return this.state.domains.find(x => x.id === id) ?? null;
  }

  public get usedFor(): Site {
    return this.state.sites.find(x => x.domainId === this.domain.id) ?? null;
  }

  public mounted(): void {
    //this.setPageTitle(`Domain - ${this.domain.name}`);
  }

  public back(): void {
    this.$router.back();
  }
}
</script>