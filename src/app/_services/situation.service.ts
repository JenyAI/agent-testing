import { Injectable } from '@angular/core';

@Injectable()
export class SituationService {

  private situations: any[ ] = [
    {
      id: 0,
      utterance: 'hey!'
    },
    {
      id: 1,
      utterance: 'how are you?'
    },
    {
      id: 2,
      utterance: 'how are you?',
    },
    {
      id: 3,
      utterance: 'how are you?',
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

  /*  Update a situation

    PARAMS
      situation (object)

    RETURN
      none
  */
  public updateSituation(situation): void {
    this.situations[situation.id] = situation;
  }
}
