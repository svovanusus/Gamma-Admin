import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from 'routes/Landing.vue';
import SignIn from 'routes/SignIn.vue';
import SignUp from 'routes/SignUp.vue';
import Profile from 'routes/Profile.vue';
import SiteList from 'routes/SiteList.vue';
import Site from 'routes/Site.vue';
import DomainList from 'routes/DomainList.vue';
import Domain from 'routes/Domain.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      name: 'landing',
      path: '/',
      component: Landing,
    },
    {
      name: 'sign-in',
      path: '/sign-in',
      component: SignIn,
    },
    {
      name: 'sign-up',
      path: '/sign-up',
      component: SignUp,
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile,
    },
    {
      name: 'sites',
      path: '/sites',
      component: SiteList,
    },
    {
      name: 'site',
      path: '/sites/:siteId',
      component: Site,
      props: true,
    },
    {
      name: 'domains',
      path: '/domains',
      component: DomainList,
    },
    {
      name: 'domain',
      path: '/domains/:domainId',
      component: Domain,
      props: true,
    },
  ],
});

export default router;