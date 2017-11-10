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

  private intents: string[ ];
  private agentSubscription: Subscription;

  private selectedIntentName: string = this.situationService.getSelectedIntentName();

  private situations: any[ ];
  private situationSubscription: Subscription;

  private filteredSituations: any[ ];

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {
    this.agentSubscription = this.agentService.subscribeToIntentsName((intents: string[ ]) => {
      this.intents = intents;
    });

    this.situationSubscription = this.situationService.subscribeToSituations((situations: string[ ]) => {
      this.situations = situations;
      this.updateFilteredSituations();
    });
  }

  ngOnDestroy(): void {
    this.agentSubscription.unsubscribe();

    this.situationSubscription.unsubscribe();
  }

  /*  Select an intent name.

    PARAMS
      event (object)

    RETURN
      none
  */
  private onSelectedIntent(event: any): void {
    this.selectedIntentName = event.target.value;
    this.situationService.updateSelectedIntentName(this.selectedIntentName);
    this.updateFilteredSituations();
  }

  /*  Update the filtered situations list.

    PARAMS
      none

    RETURN
      none
  */
  private updateFilteredSituations(): void {
    if (this.selectedIntentName == '') this.filteredSituations = this.situations;
    else this.filteredSituations = this.situations.filter((s: any) => s.intentName === this.selectedIntentName);
  }

  /*  Trigger the event to create a new situation

    PARAMS
      none

    RETURN
      none
  */
  private createSituation(): void {
    this.situationService.createSituation(this.selectedIntentName);
  }
}
