import { Injectable } from '@angular/core';

@Injectable()
export class UuidService {

  constructor() { }

  /*  Generate a uuid.

  PARAMS
    none

  RETURN
    (string) uuid
  */
  public generateUuid(): string {
    return this._generateUuid();
  }

  /*  Generate a uuid.

  PARAMS
    none

  RETURN
    (string) uuid
  */
  private _generateUuid(): string {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
