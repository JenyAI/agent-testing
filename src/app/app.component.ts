import { Component } from '@angular/core';

import { AgentService } from './_services/agent.service';
import { SituationService } from './_services/situation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ AgentService, SituationService ]
})
export class AppComponent {

  private situations: any[ ] = this.situationService.getSituations();

  constructor(private situationService: SituationService) { }
}
