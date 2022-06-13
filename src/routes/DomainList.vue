<template>
  <div class="page pa-4">
    <div class="actions d-flex mb-4">
      <v-spacer />
      <v-btn color="primary" dark @click="openAddDialog()">
        <v-icon>mdi-plus</v-icon>
        Add New
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="state.domains"
      class="elevation-1"
    >
      <template v-slot:item.createDate="{ item }">
        <span v-text="formatDate(item.createDate)" />
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
          Add New Domain
          <v-spacer />
          <v-btn icon small @click="createDialogState = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="createDomainName" outlined dense hide-details label="Domain Name" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" dark @click="closeAddDialog()">Cancel</v-btn>
          <v-btn color="primary" @click="addDomain()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialogState" max-width="350px">
      <v-card>
        <v-card-title>
          Delete Domain
          <v-spacer />
          <v-btn icon small @click="deleteDialogState = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p class="ma-0">Are want to delete selected domain?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" dark @click="cancelRemove()">Cancel</v-btn>
          <v-btn color="red" dark @click="removeDomain()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import Domain from 'model/remote/Domain';
import { StoreMutations } from 'store/StoreTypes';

@Component({
  name: 'DomainList',
  components: {},
})
export default class DomainList extends RouteComponentBase {
  public createDialogState: boolean = false;
  public deleteDialogState: boolean = false;

  public createDomainName: string = '';
  public domainToRemove: number = null;

  public headers = [
    { text: 'Domain Name', value: 'name' },
    { text: 'Create Date', value: 'createDate' },
    { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
  ];

  public constructor() {
    super('Domains');
  }

  public formatDate(date: Date): string {
    return date.toDateString();
  }

  public itemEditClick(item: Domain): void {
    this.$router.push(`/domains/${item.id}`);
  }

  public itemDeleteClick(item: Domain): void {
    this.domainToRemove = item.id
    this.deleteDialogState = true;
  }

  public openAddDialog(): void {
    this.createDomainName = '';
    this.createDialogState = true;
  }

  public closeAddDialog(): void {
    this.createDialogState = false;
    this.createDomainName = '';
  }

  public addDomain(): void {
    const newDomain = <Domain>{
      id: Math.ceil(Math.random() * 1000),
      name: this.createDomainName,
      createDate: new Date(),
    };

    this.$store.commit(StoreMutations.ADD_DOMAIN, newDomain);
    this.closeAddDialog();
  }

  public cancelRemove(): void {
    this.deleteDialogState = false;
    this.domainToRemove = null;
  }

  public removeDomain(): void {
    if (!this.domainToRemove) return;
    this.$store.commit(StoreMutations.REMOVE_DOMAIN, this.domainToRemove);
    this.cancelRemove();
  }
}
</script>