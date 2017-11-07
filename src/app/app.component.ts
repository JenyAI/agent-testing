import { Component } from '@angular/core';

import { SituationService } from './_services/situation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  private situations: any[ ] = this.situationService.getSituations();

  constructor(private situationService: SituationService) { }
}
