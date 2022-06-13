<template>
  <div class="page pa-4">
    <div class="actions d-flex mb-4">
      <v-spacer />
      <v-btn color="primary" dark @click="openAddDialog()">
        <v-icon>mdi-plus</v-icon>
        Create New
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="state.sites"
      class="elevation-1"
    >
      <template v-slot:item.name="{ item }">
        <a :href="`http://localhost:3000/site/${item.id}`" v-text="item.name" />
      </template>

      <template v-slot:item.lastUpdate="{ item }">
        <span v-text="formatDate(item.lastUpdate)" />
      </template>

      <template v-slot:item.domain="{ item }">
        <span v-text="getDomain(item.domainId)" />
      </template>

      <template v-slot:item.isPublished="{ item }">
        <v-icon v-if="item.isPublished">mdi-check-circle</v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end">
          <v-btn icon small @click="itemEditClick(item)">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small @click="itemDeleteClick(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="createDialogState" max-width="350px">
      <v-card>
        <v-card-title>
          Add New Site
          <v-spacer />
          <v-btn icon small @click="createDialogState = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="createSiteName" outlined dense hide-details label="Domain Name" class="mb-2" />
          <v-select v-model="createSiteDomainId" :items="domains" label="Domain" item-value="id" item-text="name" outlined dense hide-details class="mb-2" />
          <v-textarea v-model="cerateSiteDescription" label="Description" outlined dense hide-details />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" dark @click="closeAddDialog()">Cancel</v-btn>
          <v-btn color="primary" @click="addSite()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialogState" max-width="350px">
      <v-card>
        <v-card-title>
          Delete Site
          <v-spacer />
          <v-btn icon small @click="deleteDialogState = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p class="ma-0">Are want to delete selected site?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" dark @click="cancelRemove()">Cancel</v-btn>
          <v-btn color="red" dark @click="removeSite()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import Site from 'model/remote/Site';
import Domain from 'model/remote/Domain';
import { StoreMutations } from 'store/StoreTypes';

@Component({
  name: 'SiteList',
  components: {},
})
export default class SiteList extends RouteComponentBase {
  public createDialogState: boolean = false;
  public deleteDialogState: boolean = false;

  public createSiteName: string = '';
  public createSiteDomainId: number = null;
  public cerateSiteDescription: string = '';
  public siteToDelete: number = null;

  public headers = [
    { text: 'Site Name', value: 'name' },
    { text: 'Last update', value: 'lastUpdate' },
    { text: 'Domain', value: 'domain' },
    { text: 'Published', value: 'isPublished', align: 'center' },
    { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
  ];

  public constructor() {
    super('Sites');
  }

  public get domains(): Domain[] {
    return this.state.domains.filter(x => !this.isDomainUsed(x.id));
  }

  public formatDate(date: Date): string {
    return date.toDateString();
  }

  public getDomain(id: number): string {
    const domain = this.state.domains.find(x => x.id === id);
    return domain ? domain.name : '-';
  }

  public itemEditClick(item: Site): void {
    this.$router.push(`/sites/${item.id}`);
  }

  public itemDeleteClick(item: Site): void {
    this.siteToDelete = item.id
    this.deleteDialogState = true;
  }

  private isDomainUsed(id: number): boolean {
    return this.state.sites.some(x => x.domainId === id);
  }

  public openAddDialog(): void {
    this.createSiteName = '';
    this.createSiteDomainId = null;
    this.cerateSiteDescription = '';
    this.createDialogState = true;
  }

  public closeAddDialog(): void {
    this.createDialogState = false;
    this.createSiteName = '';
    this.createSiteDomainId = null;
    this.cerateSiteDescription = '';
  }

  public addSite(): void {
    const newSite = <Site>{
      id: Math.ceil(Math.random() * 1000),
      name: this.createSiteName,
      domainId: this.createSiteDomainId,
      isPublished: false,
      description: this.cerateSiteDescription,
      lastUpdate: new Date(),
    };

    this.$store.commit(StoreMutations.ADD_SITE, newSite);
    this.closeAddDialog();
  }

  public cancelRemove(): void {
    this.deleteDialogState = false;
    this.siteToDelete = null;
  }

  public removeSite(): void {
    if (!this.siteToDelete) return;
    this.$store.commit(StoreMutations.REMOVE_SITE, this.siteToDelete);
    this.cancelRemove();
  }
}
</script>