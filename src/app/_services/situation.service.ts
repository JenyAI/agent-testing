import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SituationService {

  private id: number = 0;

  private selectedIntentName: string = '';

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
      intentName (string)

    RETURN
      none
  */
  public createSituation(intentName: string, utterance: string = ''): void {
    let situation = {
      id: this.id,
      intentName: intentName,
      utterance: utterance
    };

    this.id++;

    this.situations.push(situation);
    this.subjectSituation.next(this.situations);
  }

  /*  Get the selected intent name.

    PARAMS
      none

    RETURN
      (string) selected intent name
  */
  public getSelectedIntentName(): string {
    return this.selectedIntentName;
  }

  /*  Update the selected intent name.

    PARAMS
      intentName (string)

    RETURN
      none
  */
  public updateSelectedIntentName(intentName): void {
    this.selectedIntentName = intentName;
  }

  /*  Update a situation

    PARAMS
      situation (object)

    RETURN
      none
  */
  public updateSituation(situation): void {
    let oldSituation = this.situations.find(s => s.id == situation.id);
    oldSituation = situation;
    this.subjectSituation.next(this.situations);
  }

  /*  Delete a situation

    PARAMS
      id (number)

    RETURN
      none
  */
  public deleteSituation(id): void {
    this.situations = this.situations.filter(s => {
      return s.id != id;
    });
    this.subjectSituation.next(this.situations);
  }
}
