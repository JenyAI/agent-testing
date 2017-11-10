import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AgentService } from '../_services/agent.service';
import { SituationService } from '../_services/situation.service';

@Component ({
  selector: 'app-situation',
  templateUrl: 'situation.component.html',
  styleUrls: [ 'situation.component.scss' ]
})
export class SituationComponent implements OnInit, OnDestroy {

  private intents: string[ ];
  private agentSubscription: Subscription;

  @Input() private data: any;

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {
    this.agentSubscription = this.agentService.subscribeToIntentsName((intents: string[ ]) => {
      this.intents = intents;
    });
  }

  ngOnDestroy(): void {
    this.agentSubscription.unsubscribe();
  }

  /*  Request the deletion of the situation.

    PARAMS
      none

    RETURN
      none
  */
  private onDeleteSituation(): void {

    this.situationService.deleteSituation(this.data.id);
  }

  /*  Request the deletion of the situation.

    PARAMS
      none

    RETURN
      none
  */
  private onUpdateSituation(): void {

    this.situationService.updateSituation(this.data);
  }

  /*  Select an intent name.

    PARAMS
      event (object)

    RETURN
      none
  */
  private onSelectedIntent(event: any): void {
    
    this.data.intentName = event.target.value;
    this.onUpdateSituation();
  }
}
