import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AgentService } from '../_services/agent.service';
import { SituationService } from '../_services/situation.service';

@Component({
  selector: 'app-display-situations',
  templateUrl: './display-situations.component.html',
  styleUrls: [ './display-situations.component.scss' ]
})
export class DisplaySituationsComponent implements OnInit, OnDestroy  {

  private intents: any[ ];
  private selectedIntent: any = { id: ' ', name: ' ' };;
  private agentSubscription: Subscription;

  private situations: any[ ];
  private situationSubscription: Subscription;

  private displayedSituations: any[ ];
  private page: number = 0; // current page
  private totalPages: number = 0; // total number of page for this set of situations
  private situationsPerPages: number = 10;  // number of situations displayed per page

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {

    this.agentSubscription = this.agentService.subscribeToIntent((intents: any[ ]) => {

      this.intents = intents;
    });

    this.situationSubscription = this.situationService.subscribeToSituations((situations: string[ ]) => {

      this.situations = situations;
      this.updateDisplayedSituations();
      this.onNextPage();
    });

    this.findIntentById(this.situationService.getSelectedIntentId());
  }

  ngOnDestroy(): void {
    this.agentSubscription.unsubscribe();

    this.situationSubscription.unsubscribe();
  }

  /*  Find the intent in the intents list by id.

    PARAMS
      id (string)

    RETURN
      none
  */
  private findIntentById(id): void {

    let selectedIntent = this.intents.find(i => i.id == id);
    if (selectedIntent) this.selectedIntent = selectedIntent;
    else this.selectedIntent = { id: ' ', name: ' ' };
  }

  /*  Select an intent name.

    PARAMS
      event (object)

    RETURN
      none
  */
  private onSelectedIntent(event: any): void {

    this.findIntentById(event.target.value);

    this.situationService.updateSelectedIntentId(this.selectedIntent.id);
    this.updateDisplayedSituations();
  }

  /*  Trigger the event to create a new situation

    PARAMS
      none

    RETURN
      none
  */
  private onCreateSituation(): void {

    this.situationService.createSituation(this.selectedIntent.name);
  }

  /*  Trigger the event to create a new situation

    PARAMS
      none

    RETURN
      none
  */
  private onGetUserSays(): void {

    this.agentService.getIntentDetailsFromAgent(this.selectedIntent.id);
  }

  /*  Increment the page number

    PARAMS
      none

    RETURN
      none
  */
  private onNextPage(): void {

    if (this.page < this.totalPages) this.page++;
    this.updateDisplayedSituations();
  }

  /*  Decrement the page number

    PARAMS
      none

    RETURN
      none
  */
  private onPreviousPage(): void {

    if (this.page > 0) this.page--;
    this.updateDisplayedSituations();
  }

  /*  Update the filtered situations list.

    PARAMS
      none

    RETURN
      none
  */
  private updateDisplayedSituations(): void {

    let filteredSituations;
    if (this.selectedIntent.id == ' ') filteredSituations = this.situations;
    else filteredSituations = this.situations.filter((s: any) => s.intentName === this.selectedIntent.name);

    this.totalPages = Math.ceil(filteredSituations.length / this.situationsPerPages);
    if (this.page >= this.totalPages && this.page !== 0) this.page = this.totalPages -1;

    let index = this.page * this.situationsPerPages;
    this.displayedSituations = filteredSituations.slice(index, index + this.situationsPerPages);
  }
}
