import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { WebsocketService } from './websocket.service';

@Injectable()
export class SituationService {

  // id of the selected intent
  private selectedIntentId: string = '';

  private situations: any[ ] = [ ];
  private subjectSituation: BehaviorSubject<any[]> = new BehaviorSubject([ ]);

  constructor(private websocketService: WebsocketService) {

    this.websocketService.addListener('situation-created').subscribe((situation: any) => this.onSituationCreated(situation));

    this.websocketService.addListener('situation-deleted').subscribe((id: string) => this.onSituationDeleted(id));

    this.websocketService.addListener('situation-updated').subscribe((situation: any) => this.onSituationUpdated(situation));

    this.websocketService.addListener('situation-got-all').subscribe((situations: any[ ]) => this.onSituationsGot(situations));

    this.websocketService.send('situation-get-all');
  }



	/****************************************************************
  /*
  /*      WEBSOCKET EVENTS HANDLERS
  /*
  /***************************************************************/



  /*  Triggered when situation created on server.

    PARAMS
      situation (object)

    RETURN
      none
  */
  private onSituationCreated(situation: any): void {

    this.situations.push(situation);
    this.subjectSituation.next(this.situations);
  }

  /*  Triggered when situation deleted on server.

    PARAMS
      id (string): id of the deleted situation

    RETURN
      none
  */
  private onSituationDeleted(id: string): void {

    this.situations = this.situations.filter(s => s.id != id);
    this.subjectSituation.next(this.situations);
  }

  /*  Triggered when situation updated on server.

    PARAMS
      situation (object)

    RETURN
      none
  */
  private onSituationUpdated(situation: any): void {

    let oldSituation = this.situations.find(s => s.id == situation.id);
    oldSituation = situation;
    this.subjectSituation.next(this.situations);
  }

  /*  Triggered when situation retrieved from server.

    PARAMS
      situations (array of objects)

    RETURN
      none
  */
  private onSituationsGot(situations: any[ ]): void {

    this.situations = situations;
    this.subjectSituation.next(this.situations);
  }



	/****************************************************************
  /*
  /*      INTERFACE
  /*
  /***************************************************************/



  /*  Create a situation

    PARAMS
      intentName (string)

    RETURN
      none
  */
  public createSituation(intentName: string = '', utterance: string = ''): void {

    let situation = {
      intentName: intentName,
      utterance: utterance
    };

    this.websocketService.send('situation-create', situation);
  }

  /*  Delete a situation

    PARAMS
      id (number)

    RETURN
      none
  */
  public deleteSituation(id): void {

    let data = {
      id: id
    };

    this.websocketService.send('situation-delete', data);
  }

  /*  Update a situation

    PARAMS
      situation (object)

    RETURN
      none
  */
  public updateSituation(situation): void {

    this.websocketService.send('situation-update', situation);
  }

  /*  Subscribe to changes in the list of situations

    PARAMS
      observer (function)

    RETURN
      (Subscription)
  */
  public subscribeToSituations(observer): Subscription {

    return this.subjectSituation.subscribe(observer);
  }

  /*  Get the selected intent name.

    PARAMS
      none

    RETURN
      (string) selected intent name
  */
  public getSelectedIntentId(): string {

    return this.selectedIntentId;
  }

  /*  Update the selected intent name.

    PARAMS
      id (string): id of the freshly selected intent

    RETURN
      none
  */
  public updateSelectedIntentId(id): void {

    this.selectedIntentId = id;
  }
}
