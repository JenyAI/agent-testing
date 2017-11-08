import { Component } from '@angular/core';

import { SituationService } from '../_services/situation.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [ './side-bar.component.scss' ]
})
export class SideBarComponent {

  private situations: any[ ] = this.situationService.getSituations();

  constructor(private situationService: SituationService) { }
}
