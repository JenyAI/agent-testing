import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: [ './display-cards.component.scss' ]
})
export class DisplayCardsComponent implements OnInit, OnDestroy  {

  private cards: any[ ];
  private selectedCard: number; // id of the selected card
  private cardSubscription: Subscription;

	private filter: string = '';
  private displayedCards: any[ ];
  private page: number = 0; // current page
  private totalPages: number = 0; // total number of page for this set of cards
  private cardsPerPages: number = 20;  // number of cards displayed per page

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit(): void {

    this.cardSubscription = this.cardService.subscribeToCards((cards: string[ ]) => {

      this.cards = cards;
      this.updateDisplayedCards();
    });
  }

  ngOnDestroy(): void {

    this.cardSubscription.unsubscribe();
  }

  /*  Trigger the event to create a new card

    PARAMS
      none

    RETURN
      none
  */
  private onCreateCard(): void {

		let card = {
			src: null,
			skillId: -1
		};

    this.cardService.createCard(card);
  }

	/*  Trigger the event to delete a card.

    PARAMS
      id (number)

    RETURN
      none
  */
  private onDeleteCard(id: number): void {

    this.cardService.deleteCard(id);
  }

  /*  End the edition of a card.

    PARAMS
      none

    RETURN
      none
  */
  private onEndEditing(): void {

		this.selectedCard = -1;
  }

  /*  Trigger the event to create a new card

    PARAMS
      id (number): id of the selected card

    RETURN
      none
  */
  private onSelectedCard(id: number): void {

		this.selectedCard = id;
  }

  /*  Increment the page number

    PARAMS
      none

    RETURN
      none
  */
  private onNextPage(): void {

    if (this.page < this.totalPages) this.page++;
    this.updateDisplayedCards();
  }

  /*  Decrement the page number

    PARAMS
      none

    RETURN
      none
  */
  private onPreviousPage(): void {

    if (this.page > 0) this.page--;
    this.updateDisplayedCards();
  }

  /*  Update the filtered cards list.

    PARAMS
      none

    RETURN
      none
  */
  private updateDisplayedCards(): void {

    let filteredCards;
		if (this.filter == '' || this.filter == null) filteredCards = this.cards;
    else filteredCards = this.cards.filter((s: any) => s.src ? (s.src.toLowerCase()).includes(this.filter) : false);

    this.totalPages = Math.ceil(filteredCards.length / this.cardsPerPages);
    if (this.page >= this.totalPages && this.page !== 0) this.page = this.totalPages -1;

    let index = this.page * this.cardsPerPages;
    this.displayedCards = filteredCards.slice(index, index + this.cardsPerPages);
  }
}
