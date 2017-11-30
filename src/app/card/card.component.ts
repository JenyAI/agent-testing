import { Component, Input } from '@angular/core';

import { CardService } from '../_services/card.service';

@Component ({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: [ 'card.component.scss' ]
})
export class CardComponent {

	private cards: any[ ];

  @Input() private selected: boolean;
  @Input() private data: any;

  constructor( private cardService: CardService ) { }

  /*  Request the update of the card.

    PARAMS
      none

    RETURN
      none
  */
  private onUpdateCard(): void {

    this.cardService.updateCard(this.data);
  }
}
