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

  @Input() private data: any;

  private subscription: Subscription;

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {
    this.subscription = this.agentService.subscribeToIntentsName((intentsName: string[ ]) => {
      this.intents = intentsName;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectedIntent(event: any): void {
    this.data.intentName = event.target.value;
    this.situationService.updateSituation(this.data);
  }
}
