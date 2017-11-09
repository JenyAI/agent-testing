import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AgentService } from '../_services/agent.service';
import { SituationService } from '../_services/situation.service';

@Component ({
  selector: 'app-situation',
  templateUrl: 'situation.component.html',
  styleUrls: [ 'situation.component.scss' ]
})
export class SituationComponent {

  @Input() private data: any;

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

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
