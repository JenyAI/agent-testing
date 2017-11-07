import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DialogFlowService } from '../_services/dialogflow.service';
import { SituationService } from '../_services/situation.service';

@Component ({
  selector: 'app-perform-test',
  templateUrl: 'perform-test.component.html',
  styleUrls: [ 'perform-test.component.scss' ]
})
export class PerformTestComponent {

  private situations: any[ ] = this.situationService.getSituations();

  private maxSimultaneousQueries: number = 5;
  private simultaneousQueries: number = 0;

  constructor(
    private dialogFlowService: DialogFlowService,
    private situationService: SituationService
  ) {
    this.performTest();
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

      while (this.simultaneousQueries >= this.maxSimultaneousQueries) { }

      this.simultaneousQueries++;

      this.dialogFlowService.sendMessage(situation.utterance).subscribe((raw: any) => {
        console.log(raw);

        this.simultaneousQueries--;
      });
    });
  }

  /*  Pause the program.

    PARAMS
      none

    RETURN
      none
  */
  private delay(ms: number): Promise<{}> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
