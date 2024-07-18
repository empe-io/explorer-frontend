import { Categories } from '@src/models/msg/types';

class MsgUpdateDidDocument {
  public category: Categories;
  public type: string;
  public sender: string;
  public didDocumentUpdates: any;
  public signature: any;
  public json: any;

  constructor(payload: any) {
    this.category = 'diddoc';
    this.type = payload.type;
    this.sender = payload.sender;
    this.didDocumentUpdates = payload.didDocumentUpdates;
    this.signature = payload.signature;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgUpdateDidDocument({
      json,
      type: json['@type'],
      sender: json.sender,
      didDocumentUpdates: json.didDocumentUpdates,
      signature: json.signature,
    });
  }
}

export default MsgUpdateDidDocument;
