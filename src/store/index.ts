import Vue from 'vue';
import Vuex, { Store, GetterTree, MutationTree, ActionTree } from 'vuex';
import StoreState, { DefaultState } from 'store/StoreState';
import { IStoreTypes, StoreGetters, StoreMutations, StoreActions } from 'store/StoreTypes';
import { LayoutType } from 'model/Enums';
import Site from 'model/remote/Site';

Vue.use(Vuex);

export const StoreTypes: IStoreTypes = {
  getters: StoreGetters,
  mutations: StoreMutations,
  actions: StoreActions,
};

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
};

const actions: ActionTree<StoreState, StoreState> = {
  [StoreActions.FETCH_SOME]: async (context) => {
    //context.commit(StoreMutations.SET_SOME, 'SOME NEW');
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