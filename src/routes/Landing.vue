<template>
  <div class="page">
    <div class="background">
      <div class="background-inner" />
    </div>
    <div class="branding ml-4">
      <v-img src="/src/assets/logo.svg" :width="124" :height="48" />
    </div>
    <v-container class="content d-flex flex-column justify-center align-center">
      <h1 class="section-title white--text mb-8">GAMMA is the tool to create and manage your sites</h1>
      <h3 class="section-title white--text mb-8">Join us and try co create your first web site right now.<br />You will surprised how it can be easy</h3>
      <v-btn color="primary" dark @click="getStarted()">Get Started</v-btn>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  text-shadow: 0 1px 3px #333;
  text-align: center;
}
</style>

<style lang="scss" scoped>
.background {
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .background-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/src/assets/images/landing-bg.jpg');
    background-size: cover;
    background-position: center;
    transform: scale(1.03);
    filter: blur(7px);
  }

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    background: #000000;
    opacity: 0.6;
  }
}

.branding {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}

.content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import RouteComponentBase from 'routes/RouteComponentBase';
import { LayoutType } from 'model/Enums';

@Component({
  name: 'Landing',
  components: {},
})
export default class Landing extends RouteComponentBase {
  public constructor() {
    super('Landing', LayoutType.Page);
  }

  public getStarted(): void {
    this.$router.push('/sign-up');
  }
}
</script>