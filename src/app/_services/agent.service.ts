import { Injectable } from '@angular/core';

@Injectable()
export class AgentService {

  private intents: string[ ] = ['bla','bli','blo'];

  /*  Get the list of available intents

    PARAMS
      none

    RETURN
      (string[]) array of intents
  */
  public getIntents(): string[ ] {
    return this.intents;
  }
}
