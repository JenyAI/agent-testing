import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  private socket;
  private connections: number = 0;

  constructor() {
    this.socket = io(environment.api);
  }

  send(event: string, obj: any = {}): void {
    this.socket.emit(event, obj);
  }

  addListener(event) {
    let observable = new Observable(observer => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });

    return observable;
  }
}
