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
  currentLayoutType: LayoutType.Main,
  navigationDrawerState: true,
  domains: [
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
  ],
  sites: [
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
  ],
};