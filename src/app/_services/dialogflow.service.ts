import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { UuidService } from './uuid.service'

@Injectable()
export class DialogFlowService {

  private subject = new Subject();
  private sessionId = this.uuidService.generateUuid();

  constructor(private http: HttpClient, private uuidService: UuidService) { }

  /*  Subscribe to the answers of the agent.

  PARAMS
    observer (function|observer)

  RETURN
    subscription object
  */
  public subscribe(observer): Subscription {
    return this.subject.subscribe(observer);
  }

  /*  Send a message to the agent.

  PARAMS
    query (string): the text to send to the agent

  RETURN
    none
  */
  public sendMessage(query: string): void {
    let url = `${environment.dialogflow.queryUrl}?v=${environment.dialogflow.v}`;

    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${environment.dialogflow.devKey}`)
    .set('Content-Type', 'application/json; charset=utf-8');

    let body = {
      sessionId: this.sessionId,
      lang: 'en',
      query: query
    };

    this.http.post(url, body, { headers })
    .subscribe(raw => {
      this.subject.next(raw);
    });
  }
}
