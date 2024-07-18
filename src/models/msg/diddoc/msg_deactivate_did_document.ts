import { Categories } from '@src/models/msg/types';

class MsgDeactivateDidDocument {
  public category: Categories;
  public type: string;
  public sender: string;
  public did: string;
  public version: number;
  public signature: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'diddoc';
    this.type = payload.type;
    this.sender = payload.sender;
    this.did = payload.did;
    this.version = payload.version;
    this.signature = payload.signature;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgDeactivateDidDocument({
      json,
      type: json['@type'],
      sender: json.sender,
      did: json.did,
      version: json.version,
      signature: json.signature,
    });
  }
}

export default MsgDeactivateDidDocument;
