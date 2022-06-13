import { LayoutType } from "model/Enums";
import Domain from "model/remote/Domain";
import Site from "model/remote/Site";

export default interface StoreState {
  pageTitle: string;
  currentLayoutType: LayoutType;
  navigationDrawerState: boolean;
  domains: Domain[];
  sites: Site[];
}

export const DefaultState: StoreState = {
  pageTitle: '',
  currentLayoutType: LayoutType.Page,
  navigationDrawerState: true,
  domains: [],
  sites: [],
};