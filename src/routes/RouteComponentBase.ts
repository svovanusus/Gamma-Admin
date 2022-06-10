import { Vue } from 'vue-property-decorator';
import { LayoutType } from 'model/Enums';
import StoreState from 'store/StoreState';
import { StoreMutations } from 'store/StoreTypes';

export default class RouteComponentBase extends Vue {
  private readonly routeLayout: LayoutType;

  protected constructor(title: string, layout: LayoutType = LayoutType.Main) {
    super();
    this.routeLayout = layout;
    this.resetLayoutType();
    this.setPageTitle(title);
  }

  protected get state(): StoreState {
    return this.$store.state;
  }

  private resetLayoutType(): void {
    this.$store.commit(StoreMutations.SET_LAYOUT_TYPE, this.routeLayout);
  }

  protected setPageTitle(title: string): void {
    this.$store.commit(StoreMutations.SET_PAGE_TITLE, title);
  }
}