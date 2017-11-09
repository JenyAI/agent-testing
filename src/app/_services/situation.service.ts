import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SituationService {

  private id: number = 0;

  private situations: any[ ] = [ ];
  private subjectSituation: BehaviorSubject<any[]> = new BehaviorSubject([ ]);

  /*  Subscribe to changes in the list of situations

    PARAMS
      observer (function)

    RETURN
      (Subscription)
  */
  public subscribeToSituations(observer): Subscription {
    return this.subjectSituation.subscribe(observer);
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
    this.subjectSituation.next(this.situations);
  }

  /*  Update a situation

    PARAMS
      situation (object)

    RETURN
      none
  */
  public updateSituation(situation): void {
    this.situations[situation.id] = situation;
    this.subjectSituation.next(this.situations);
  }

  /*  Delete a situation

    PARAMS
      id (number)

    RETURN
      none
  */
  public deleteSituation(id): void {
    console.log(id);
    this.situations = this.situations.filter(s => {
      return s.id != id;
    });
    this.subjectSituation.next(this.situations);
  }
}
