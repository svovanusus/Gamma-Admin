export default abstract class LayoutBase {
  public readonly layoutComponent: string;

  protected constructor(layoutComponent: string) {
    this.layoutComponent = layoutComponent;
  }
}