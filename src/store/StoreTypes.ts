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
}

export enum StoreActions {
  FETCH_SOME = 'FETCH_SOME',
}