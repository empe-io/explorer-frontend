import { Categories } from '@src/models/msg/types';

class MsgCreateDidDocument {
  public category: Categories;
  public type: string;
  public sender: string;
  public didDocument: any;
  public signatures: any[];
  public json: any;

  constructor(payload: any) {
    this.category = 'diddoc';
    this.type = payload.type;
    this.sender = payload.sender;
    this.didDocument = payload.didDocument;
    this.signatures = payload.signatures;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgCreateDidDocument({
      json,
      type: json['@type'],
      sender: json.sender,
      didDocument: json.didDocument,
      signatures: json.signatures,
    });
  }
}

export default MsgCreateDidDocument;
