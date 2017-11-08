import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AgentService } from '../_services/agent.service';

@Component ({
  selector: 'app-situation',
  templateUrl: 'situation.component.html',
  styleUrls: [ 'situation.component.scss' ]
})
export class SituationComponent implements OnInit, OnDestroy {

  private intents: string[ ];

  @Input() private utterance: string = '';
  @Input() private intent: string = '';

  private subscription: Subscription;

  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    this.subscription = this.agentService.subscribeToIntentsName((intentsName: string[ ]) => {
      this.intents = intentsName;
    });
  }

  ngOnDestroy(): void {

  }
}
