import { Injectable } from '@angular/core';

@Injectable()
export class SituationService {

  private situations: any[ ] = [
    {
      utterance: 'hey!'
    },
    {
      utterance: 'how are you?'
    },
    {
      utterance: 'how are you?',
      intent: 'blo'
    },
    {
      utterance: 'how are you?',
      intent: 'bla'
    }
  ];

  /*  Get the list of situations

    PARAMS
      none

    RETURN
      (any[ ]) array of situations
  */
  public getSituations(): any[ ] {
    return this.situations;
  }
}
