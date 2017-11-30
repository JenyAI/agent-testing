import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { WebsocketService } from './websocket.service';

@Injectable()
export class CardService {

  private cards: any[ ] = [ ];
  private subjectCard: BehaviorSubject<any[]> = new BehaviorSubject([ ]);

  constructor(private websocketService: WebsocketService) {

    this.websocketService.addListener('card-created').subscribe((card: any) => this.onCardCreated(card));

    this.websocketService.addListener('card-deleted').subscribe((id: string) => this.onCardDeleted(id));

    this.websocketService.addListener('card-updated').subscribe((card: any) => this.onCardUpdated(card));

    this.websocketService.addListener('card-got-all').subscribe((cards: any[ ]) => this.onCardsGot(cards));

    this.websocketService.send('card-get-all');
  }



	/****************************************************************
  /*
  /*      WEBSOCKET EVENTS HANDLERS
  /*
  /***************************************************************/



  /*  Triggered when card created on server.

    PARAMS
      card (object)

    RETURN
      none
  */
  private onCardCreated(card: any): void {

    this.cards.push(card);
    this.subjectCard.next(this.cards);
  }

  /*  Triggered when card deleted on server.

    PARAMS
      id (string): id of the deleted card

    RETURN
      none
  */
  private onCardDeleted(id: string): void {

    this.cards = this.cards.filter(s => s.id != id);
    this.subjectCard.next(this.cards);
  }

  /*  Triggered when card updated on server.

    PARAMS
      card (object)

    RETURN
      none
  */
  private onCardUpdated(card: any): void {

    let oldCard = this.cards.find(s => s.id == card.id);
    oldCard = card;
    this.subjectCard.next(this.cards);
  }

  /*  Triggered when card retrieved from server.

    PARAMS
      cards (array of objects)

    RETURN
      none
  */
  private onCardsGot(cards: any[ ]): void {

    this.cards = cards;
    this.subjectCard.next(this.cards);
  }



	/****************************************************************
  /*
  /*      INTERFACE
  /*
  /***************************************************************/



  /*  Create a card

    PARAMS
      card (object)

    RETURN
      none
  */
  public createCard(card: any): void {

    let data = {
      src: card.src,
      skillId: card.skillId
    };

    this.websocketService.send('card-create', data);
  }

  /*  Delete a card

    PARAMS
      id (number)

    RETURN
      none
  */
  public deleteCard(id): void {

    let data = {
      id: id
    };

    this.websocketService.send('card-delete', data);
  }

  /*  Update a card

    PARAMS
      card (object)

    RETURN
      none
  */
  public updateCard(card): void {

    this.websocketService.send('card-update', card);
  }

  /*  Subscribe to changes in the list of cards

    PARAMS
      observer (function)

    RETURN
      (Subscription)
  */
  public subscribeToCards(observer): Subscription {

    return this.subjectCard.subscribe(observer);
  }
}
