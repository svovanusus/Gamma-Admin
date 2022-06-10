<template>
  <div class="page pa-4">
    <v-sheet rounded elevation="2" color="white" class="pa-2">
      <h2 class="mb-2">Profile Info</h2>
      <v-text-field v-model="login" label="Login" readonly outlined dense hide-details class="mb-2" />
      <v-text-field v-model="firstName" label="First Name" outlined dense hide-details class="mb-2" />
      <v-text-field v-model="lastName" label="Last Name" outlined dense hide-details class="mb-2" />
    </v-sheet>
    <div class="actions d-flex mt-4 mb-8">
      <v-spacer />
      <v-btn color="primary" dark>
        <v-icon>mdi-content-save</v-icon>
        Save
      </v-btn>
    </div>

    <v-sheet rounded elevation="2" color="white" class="pa-2">
      <h2 class="mb-2">Change Password</h2>
      <v-text-field v-model="oldPassword" type="password" label="Old Password" outlined dense hide-details class="mb-2" />
      <v-text-field v-model="newPassword" type="password" label="New Password" outlined dense hide-details class="mb-2" />
      <v-text-field v-model="confirmPassword" type="password" label="Confirm Password" outlined dense hide-details class="mb-2" />
    </v-sheet>
    <div class="actions d-flex mt-4">
      <v-spacer />
      <v-btn color="primary" dark>
        <v-icon>mdi-content-save</v-icon>
        Save
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';

@Component({
  name: 'Profile',
  components: {},
})
export default class Profile extends RouteComponentBase {
  public login: string = 'admin';
  public firstName: string = 'Vladimir';
  public lastName: string = 'Solodovnikov';
  public oldPassword: string = '';
  public newPassword: string = '';
  public confirmPassword: string = '';

  public constructor() {
    super('Profile');
  }
}
</script>