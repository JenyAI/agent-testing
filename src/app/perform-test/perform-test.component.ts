import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AgentService } from '../_services/agent.service';
import { SituationService } from '../_services/situation.service';

@Component ({
  selector: 'app-perform-test',
  templateUrl: 'perform-test.component.html',
  styleUrls: [ 'perform-test.component.scss' ]
})
export class PerformTestComponent implements OnInit, OnDestroy {

  private results: string[ ] = [ ];

  private situations: any[ ] = [ ];
  private subscription: Subscription;

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {
    this.subscription = this.situationService.subscribeToSituations((situations: string[ ]) => {
      this.situations = situations;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*  Perform test on agent.

    PARAMS
      none

    RETURN
      none
  */
  private performTest(): void {
    this.situations.forEach(situation => {
      if (!situation.utterance || situation.utterance === '') return;

      this.agentService.sendMessage(situation.utterance).subscribe((raw: any) => {
        let triggeredIntentName = raw.result.metadata.intentName;

        let result = triggeredIntentName === situation.intentName ? 'success: ' : 'fail: ';
        result += situation.utterance + ' → ' + triggeredIntentName + ' (obtained) - ' + situation.intentName + ' (expected)';

        this.results.push(result);
      });
    });
  }
}
