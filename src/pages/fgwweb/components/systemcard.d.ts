export type RangeType = {
  code: string;
  name: string;
};
export interface ICardInfo {
  id: string;
  systemName: string;
  systemCode: string;
  manufacturerName: string;
  scopes: string;
  secretKey: string;
  isEnable: string;
  createTime: null | string;
  updateTime: null | string;
  tenantId: null | string;
  ranges: RangeType[];
  callbackCount: string;
  exceptionCount: string;
}
