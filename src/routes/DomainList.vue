<template>
  <div class="page pa-4">
    <div class="actions d-flex mb-4">
      <v-spacer />
      <v-btn color="primary" dark @click="createDialogState = true">
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
          <v-text-field outlined dense hide-details label="Domain Name" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" dark @click="createDialogState = false">Cancel</v-btn>
          <v-btn color="primary" @click="createDialogState = false">Add</v-btn>
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
          <v-btn color="secondary" dark @click="deleteDialogState = false">Cancel</v-btn>
          <v-btn color="red" dark @click="deleteDialogState = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import Domain from 'model/remote/Domain';

@Component({
  name: 'DomainList',
  components: {},
})
export default class DomainList extends RouteComponentBase {
  public createDialogState: boolean = false;
  public deleteDialogState: boolean = false;

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
    this.deleteDialogState = true;
  }
}
</script>