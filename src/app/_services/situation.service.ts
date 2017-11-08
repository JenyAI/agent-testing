import { Injectable } from '@angular/core';

@Injectable()
export class SituationService {

  private id: number = 0;

  private situations: any[ ] = [ ];

  /*  Get the list of situations

    PARAMS
      none

    RETURN
      (any[ ]) array of situations
  */
  public getSituations(): any[ ] {
    return this.situations;
  }

  /*  Create a situation

    PARAMS
      none

    RETURN
      none
  */
  public createSituation(): void {
    let situation = {
      id: this.id
    };

    this.id++;

    this.situations.push(situation);
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
