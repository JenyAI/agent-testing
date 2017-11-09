import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AgentService } from '../_services/agent.service';

@Component({
  selector: 'app-agent-information',
  templateUrl: './agent-information.component.html',
  styleUrls: [ './agent-information.component.scss' ]
})
export class AgentInformationComponent {

  private devKey: string = this.agentService.getKey();

  constructor(private agentService: AgentService) { }

  /*  Update agent information.

    PARAMS
      none

    RETURN
      none
  */
  private updateAgent(): void {
    this.agentService.updateKey(this.devKey);
  }
}
