import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';
import { SituationService } from './situation.service'
import { UuidService } from './uuid.service'

@Injectable()
export class AgentService {

  private devKey: string = '';
  private sessionId = this.uuidService.generateUuid();

  private intents: any[ ];
  private intentsName: string[ ];
  private subjectIntentsName: BehaviorSubject<string[ ]> = new BehaviorSubject(['']);

  constructor(
    private http: HttpClient,
    private situationService: SituationService,
    private uuidService: UuidService
  ) { }

  /*  Get the dev key.

    PARAMS
      none

    RETURN
      (string) the dev key
  */
  public getKey(): string {
    return this.devKey;
  }

  /*  Update the dev key.

    PARAMS
      devKey (string)

    RETURN
      none
  */
  public updateKey(devKey): void {
    this.devKey = devKey;
    this.getIntentsFromAgent();
  }

  /*  Subscribe an observer on intents name update.

    PARAMS
      observer (function)

    RETURN
      (Subscription)
  */
  public subscribeToIntentsName(observer): Subscription {
    return this.subjectIntentsName.subscribe(observer);
  }

  /*  Send a message to the agent.

  PARAMS
    query (string): the text to send to the agent

  RETURN
    none
  */
  public sendMessage(query: string): Observable<{}> {
    let observable = new Observable(observer => {
      let url = `${environment.dialogflow.queryUrl}?v=${environment.dialogflow.v}`;

      let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.devKey}`)
      .set('Content-Type', 'application/json; charset=utf-8');

      let body = {
        sessionId: this.sessionId,
        lang: 'en',
        query: query
      };

      this.http.post(url, body, { headers })
      .subscribe(raw => {
        observer.next(raw);
      });
    });

    return observable;
  }

  /*  Get the list of intents from the agent

    PARAMS
      none

    RETURN
      void
  */
  private getIntentsFromAgent(): void {

    let url = `${environment.dialogflow.intentsUrl}?v=${environment.dialogflow.v}`;

    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.devKey}`)
    .set('Content-Type', 'application/json; charset=utf-8');

    this.http.get(url, { headers })
    .subscribe((raw: any[ ]) => {
      this.intents = raw;
      this.intentsName = this.intents.map(i => i.name).sort();
      this.subjectIntentsName.next(this.intentsName);

      // let intentsId = this.intents.map(i => i.id);
      // Observable
      // .from(intentsId)
      // .bufferCount(1)
      // .concatMap(ids => {
      //   let tasks = ids.map(id => this.getIntentDetailFromAgent(id).delay(2000).do((details: any) => {
      //     if (details.userSays && !details.userSays.isTemplate) {
      //       details.userSays.forEach((us: any) => {
      //         let utterance: string = us.data.map((data: any) => data.text).join(' ');
      //         this.situationService.createSituation(details.name, utterance);
      //       });
      //     }
      //   }));
      //
      //   return Observable.forkJoin(tasks);
      // })
      // .subscribe();
    });
  }

  /*  Get intent details from the agent

    PARAMS
      id (string): id of the intent

    RETURN
      (Observable<any>)
  */
  private getIntentDetailFromAgent(id: string): Observable<any> {

    let observable = new Observable(observer => {
      let url = `${environment.dialogflow.intentsUrl}/${id}?v=${environment.dialogflow.v}`;

      let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.devKey}`)
      .set('Content-Type', 'application/json; charset=utf-8');

      let obs = {
        next: (details) => {
          observer.next(details);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
          observer.complete();
        },
        complete: () => {
          observer.complete();
        }
      };

      return this.http.get(url, { headers })
      .subscribe(obs);
    });

    return observable;
  }
}
