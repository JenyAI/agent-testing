import { Component, Input } from '@angular/core';

import { AgentService } from '../_services/agent.service';

@Component ({
  selector: 'app-situation',
  templateUrl: 'situation.component.html',
  styleUrls: [ 'situation.component.scss' ]
})
export class SituationComponent {

  private intents: string[] = this.AgentService.getIntents();

  @Input() private utterance: string = '';
  @Input() private intent: string = '';

  constructor(private AgentService: AgentService) { }
}
