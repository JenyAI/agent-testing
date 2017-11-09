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
  private subscription: Subscription;

  @Input() private data: any;

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {
    this.subscription = this.agentService.subscribeToIntentsName((intents: string[ ]) => {
      this.intents = intents;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*  Select an intent name.

    PARAMS
      event (object)

    RETURN
      none
  */
  onSelectedIntent(event: any): void {
    this.data.intentName = event.target.value;
    this.situationService.updateSituation(this.data);
  }

  /*  Select an intent name.

    PARAMS
      event (object)

    RETURN
      none
  */
  deleteSituation(): void {
    this.situationService.deleteSituation(this.data.id);
  }
}
