export interface IStoreTypes {
  getters?: { [key: string]: string },
  mutations?: { [key: string]: string },
  actions?: { [key: string]: string },
}

export enum StoreGetters {}

export enum StoreMutations {
  SET_PAGE_TITLE = 'SET_PAGE_TITLE',
  SET_LAYOUT_TYPE = 'SET_LAYOUT_TYPE',
  UPDATE_SITE = 'UPDATE_SITE',
  SET_SITES = 'SET_SITES',
  SET_DOMAINS = 'SET_DOMAINS',
  ADD_DOMAIN = 'ADD_DOMAIN',
  REMOVE_DOMAIN = 'REMOVE_DOMAIN',
  ADD_SITE = 'ADD_SITE',
  REMOVE_SITE = 'REMOVE_SITE',
}

export enum StoreActions {
  FETCH_SITES = 'FETCH_SITES',
  FETCH_DOMAINS = 'FETCH_DOMAINS',
}