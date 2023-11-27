import 'vue-router';
export interface IStackInfo {
  path: string;
  pathName: string;
  meta?: any;
}
export interface IrouteInfo {
  stack: IStackInfo[];
  routeCur: IStackInfo;
}
export interface IRouteStack {
  [key: string]: IrouteInfo | undefined;
}
