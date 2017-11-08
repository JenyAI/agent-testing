import { Component } from '@angular/core';

import { SituationService } from '../_services/situation.service';

@Component({
  selector: 'app-display-situations',
  templateUrl: './display-situations.component.html',
  styleUrls: [ './display-situations.component.scss' ]
})
export class DisplaySituationsComponent {

  private situations: any[ ] = this.situationService.getSituations();

  constructor(private situationService: SituationService) { }

  /*  Trigger the event to create a new situation

    PARAMS
      none

    RETURN
      none
  */
  private createSituation(): void {
    this.situationService.createSituation();
  }
}
