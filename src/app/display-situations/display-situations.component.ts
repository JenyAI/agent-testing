import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SituationService } from '../_services/situation.service';

@Component({
  selector: 'app-display-situations',
  templateUrl: './display-situations.component.html',
  styleUrls: [ './display-situations.component.scss' ]
})
export class DisplaySituationsComponent implements OnInit, OnDestroy  {

  private situations: any[ ];
  private subscription: Subscription;

  constructor(private situationService: SituationService) { }

  ngOnInit(): void {
    this.subscription = this.situationService.subscribeToSituations((situations: string[ ]) => {
      this.situations = situations;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
