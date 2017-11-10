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
  private selectedIntent: any;
  private agentSubscription: Subscription;

  private situations: any[ ];
  private situationSubscription: Subscription;

  private filteredSituations: any[ ];

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {

    this.init();

    this.agentSubscription = this.agentService.subscribeToIntent((intents: any[ ]) => {

      this.intents = intents;
    });

    this.situationSubscription = this.situationService.subscribeToSituations((situations: string[ ]) => {

      this.situations = situations;
      this.updateFilteredSituations();
    });

    this.findIntentById(this.situationService.getSelectedIntentId());
  }

  ngOnDestroy(): void {
    this.agentSubscription.unsubscribe();

    this.situationSubscription.unsubscribe();
  }

  /*  Initialize attributes.

    PARAMS
      none

    RETURN
      none
  */
  private init(): void {

    this.selectedIntent = { id: ' ', name: ' ' };
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
    this.updateFilteredSituations();
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

  /*  Update the filtered situations list.

    PARAMS
      none

    RETURN
      none
  */
  private updateFilteredSituations(): void {

    if (this.selectedIntent.id == ' ') this.filteredSituations = this.situations;
    else this.filteredSituations = this.situations.filter((s: any) => s.intentName === this.selectedIntent.name);
  }
}
