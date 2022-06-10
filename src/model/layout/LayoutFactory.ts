import { LayoutType } from 'model/Enums';
import LayoutBase from 'model/layout/LayoutBase';
import MainLayout from 'model/layout/impl/MainLayout';
import AuthLayout from 'model/layout/impl/AuthLayout';
import PageLayout from 'model/layout/impl/PageLayout';

interface LayoutTable {
  [type: string]: new () => LayoutBase;
}

export default class LayoutFactory {
  private constructor() {
    this.layoutTable[LayoutType.Main] = MainLayout;
    this.layoutTable[LayoutType.Auth] = AuthLayout;
    this.layoutTable[LayoutType.Page] = PageLayout;
  }

  public getLayout<TLayout extends LayoutBase>(type: LayoutType): TLayout {
    const constructor = this.layoutTable[type];
    if (!constructor) return null;

    return new constructor() as TLayout;
  }

  public static getInstance(): LayoutFactory {
    if (!LayoutFactory.instance) {
      LayoutFactory.instance = new LayoutFactory();
    }
    return LayoutFactory.instance;
  }

  private layoutTable: LayoutTable = {};
  private static instance: LayoutFactory = null;
}