import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { UuidService } from './uuid.service'

@Injectable()
export class AgentService {

  private devKey: string = 'bdc62c870d424f29a0574cf3c3667beb';
  private sessionId = this.uuidService.generateUuid();

  private intents: any[ ];
  private intentsName: string[ ];

  constructor(private http: HttpClient, private uuidService: UuidService) {
    this.getIntentsFromAgent();
  }

  /*  Provide the list of intents

    PARAMS
      none

    RETURN
      (string[ ]) list of intents name
  */
  public getIntentsName(): string[ ] {
    return this.intentsName;
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
    });
  }
}
