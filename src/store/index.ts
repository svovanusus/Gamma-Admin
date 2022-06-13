import Vue from 'vue';
import Vuex, { Store, GetterTree, MutationTree, ActionTree } from 'vuex';
import StoreState, { DefaultState } from 'store/StoreState';
import { IStoreTypes, StoreGetters, StoreMutations, StoreActions } from 'store/StoreTypes';
import { LayoutType } from 'model/Enums';
import Site from 'model/remote/Site';
import StorageService from './StorageService';
import Domain from 'model/remote/Domain';

Vue.use(Vuex);

export const StoreTypes: IStoreTypes = {
  getters: StoreGetters,
  mutations: StoreMutations,
  actions: StoreActions,
};

interface LocalDomain {
  id: number;
  name: string;
  createDate: number;
}

interface LocalSite {
  id: number;
  name: string;
  lastUpdate: number;
  description: string;
  domainId: number;
  isPublished: boolean;
}

const getters: GetterTree<StoreState, StoreState> = {};

const mutations: MutationTree<StoreState> = {
  [StoreMutations.SET_PAGE_TITLE]: (state, title: string) => {
    state.pageTitle = title;
  },

  [StoreMutations.SET_LAYOUT_TYPE]: (state, layoutType: LayoutType) => {
    state.currentLayoutType = layoutType;
  },

  [StoreMutations.UPDATE_SITE]: (state, site: Site) => {
    const siteInState = state.sites.find(x => x.id === site.id);
    if (!siteInState) return;
    siteInState.name = site.name;
    siteInState.description = site.description;
    siteInState.domainId = site.domainId;
    siteInState.isPublished = site.isPublished;
  },

  [StoreMutations.SET_DOMAINS]: (state, domains: Domain[]) => {
    state.domains = domains;
  },

  [StoreMutations.SET_SITES]: (state, sites: Site[]) => {
    state.sites = sites;
  },

  [StoreMutations.ADD_DOMAIN]: (state, domain: Domain) => {
    state.domains.push(domain);
    saveDomains(state.domains);
  },

  [StoreMutations.REMOVE_DOMAIN]: (state, id: number) => {
    const index = state.domains.findIndex(x => x.id === id);
    if (index < 0) return;

    state.domains.splice(index, 1);
    saveDomains(state.domains);
  },

  [StoreMutations.ADD_SITE]: (state, site: Site) => {
    state.sites.push(site);
    saveSites(state.sites);
  },

  [StoreMutations.REMOVE_SITE]: (state, id: number) => {
    const index = state.sites.findIndex(x => x.id === id);
    if (index < 0) return;

    state.sites.splice(index, 1);
    saveSites(state.sites);
  },

};

const actions: ActionTree<StoreState, StoreState> = {
  [StoreActions.FETCH_DOMAINS]: async (context) => {
    const domains = StorageService.get<LocalDomain[]>('domains');
    if (domains) {
      context.commit(StoreMutations.SET_DOMAINS, domains.map(x => <Domain>{
        id: x.id,
        name: x.name,
        createDate: new Date(x.createDate),
      }));
    } else {
      context.commit(StoreMutations.SET_DOMAINS, [
        {
          id: 1,
          name: 'site1.gamma.app',
          createDate: new Date(2022, 5, 12),
        },
        {
          id: 2,
          name: 'second.gamma.app',
          createDate: new Date(2022, 5, 15),
        },
        {
          id: 3,
          name: 'play.gamma.app',
          createDate: new Date(2022, 5, 20),
        },
        {
          id: 4,
          name: 'game.gamma.app',
          createDate: new Date(2022, 5, 30),
        },
        {
          id: 5,
          name: 'art.gamma.app',
          createDate: new Date(2022, 6, 1),
        },
        {
          id: 6,
          name: 'custom.gamma.app',
          createDate: new Date(2022, 6, 10),
        },
      ]);
      saveDomains(context.state.domains);
    }
  },

  [StoreActions.FETCH_SITES]: async (context) => {
    const sites = StorageService.get<LocalSite[]>('sites');
    if (sites) {
      context.commit(StoreMutations.SET_SITES, sites.map(x => <Site>{
        id: x.id,
        domainId: x.domainId,
        description: x.description,
        isPublished: x.isPublished,
        name: x.name,
        lastUpdate: new Date(x.lastUpdate),
      }));
    } else {
      context.commit(StoreMutations.SET_SITES, [
        {
          id: 1,
          name: 'The First Site',
          lastUpdate: new Date(2022, 5, 18),
          description: '',
          domainId: 1,
          isPublished: true,
        },
        {
          id: 2,
          name: 'The Best Site',
          lastUpdate: new Date(2022, 5, 30),
          description: '',
          domainId: 2,
          isPublished: true,
        },
        {
          id: 3,
          name: 'Portfolio',
          lastUpdate: new Date(2022, 6, 1),
          description: '',
          domainId: 5,
          isPublished: true,
        },
      ]);
      saveSites(context.state.sites);
    }
  },
};

const store = new Store<StoreState>({
  devtools: true,
  state: Object.assign({}, DefaultState),
  getters,
  mutations,
  actions,
});

export default store;

function saveDomains(domains: Domain[]): void {
  StorageService.save('domains', domains.map(x => <LocalDomain>{
    id: x.id,
    name: x.name,
    createDate: Number(x.createDate),
  }));
}

function saveSites(sites: Site[]): void {
  StorageService.save('sites', sites.map(x => <LocalSite>{
    id: x.id,
    name: x.name,
    description: x.description,
    isPublished: x.isPublished,
    domainId: x.domainId,
    lastUpdate: Number(x.lastUpdate),
  }));
}