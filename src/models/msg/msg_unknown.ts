import { Categories } from './types';
import { convertMsgType } from '@screens/home/components/transactions/hooks';

class MsgUnknown {
  public category: Categories;
  public type: string;
  public json: JSON;

  constructor(payload: any) {
    this.category = 'others';
    this.type = payload.type;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgUnknown({
      type: convertMsgType([json['@type']]) ?? '',
      json,
    });
  }
}

export default MsgUnknown;
