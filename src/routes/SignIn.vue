<template>
  <div class="sign-in">
    <v-text-field outlined dense hide-details type="text" label="Login" class="mb-4" />
    <v-text-field outlined dense hide-details type="password" label="Password" class="mb-4" />
    <p v-if="showError" class="red--text mb-4">Incorrect Login or Password</p>
    <div class="d-flex">
      <v-spacer />
      <v-btn color="secondary" text class="mr-2" to="/sign-up">Create a new account</v-btn>
      <v-btn color="primary" dark to="/sites">Sign-In</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import { LayoutType } from 'model/Enums';

@Component({
  name: 'SignIn',
  components: {},
})
export default class SignIn extends RouteComponentBase {
  public showError = false;

  public constructor() {
    super('Sign In', LayoutType.Auth);
  }
}
</script>