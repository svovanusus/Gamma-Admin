<template>
  <div class="page pa-4">
    <v-sheet rounded elevation="2" color="white" class="pa-2">
      <v-text-field v-model="siteName" label="Name" outlined dense hide-details class="mb-2" />
      <v-select v-model="selectedDomain" :items="domains" label="Domain" item-value="id" item-text="name" outlined dense hide-details class="mb-2" />
      <v-textarea v-model="siteDescription" label="Description" outlined dense hide-details />
    </v-sheet>
    <div class="actions d-flex mt-4">
      <v-btn color="accent" @click="publish()">
        <v-icon>mdi-earth</v-icon>
        {{ site.isPublished ? 'Re-Publish': 'Publish' }}
      </v-btn>
      <v-spacer />
      <v-btn color="secondary" dark class="mr-2" @click="back()">
        <v-icon>mdi-close</v-icon>
        Cancel
      </v-btn>
      <v-btn color="primary" dark @click="save()">
        <v-icon>mdi-content-save</v-icon>
        Save
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import SiteModel from 'model/remote/Site';
import Domain from 'model/remote/Domain';
import { StoreMutations } from 'store/StoreTypes';

@Component({
  name: 'Site',
  components: {},
})
export default class Site extends RouteComponentBase {
  @Prop({ default: 0 }) public readonly siteId!: number;

  public siteName: string = '';
  public selectedDomain: number = null;
  public siteDescription: string = '';

  public constructor() {
    super('Site - ');
  }

  public get site(): SiteModel {
    const id = Number(this.siteId);
    return this.state.sites.find(x => x.id === id) ?? null;
  }

  public get domains(): Domain[] {
    return this.state.domains.filter(x => !this.isDomainUsed(x.id));
  }

  public mounted(): void {
    this.setPageTitle(`Site - ${this.site?.name}`);
    this.siteName = this.site.name;
    this.siteDescription = this.site.description;
    this.selectedDomain = this.site.domainId ?? null;
  }

  public back(): void {
    this.$router.back();
  }

  public save(): void {
    this.site.name = this.siteName;
    this.site.description = this.siteDescription;
    this.site.domainId = this.selectedDomain;
    //this.$store.commit(StoreMutations.UPDATE_SITE, this.site);
    this.$nextTick(() => {
      this.back();
    });
  }

  public publish(): void {
    this.site.isPublished = true;
  }

  private isDomainUsed(id: number): boolean {
    return this.site.domainId !== id && this.state.sites.some(x => x.domainId === id);
  }
}
</script>