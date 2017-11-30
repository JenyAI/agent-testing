import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SkillService } from '../_services/skill.service';

@Component ({
  selector: 'app-skill',
  templateUrl: 'skill.component.html',
  styleUrls: [ 'skill.component.scss' ]
})
export class SkillComponent implements OnInit, OnDestroy {

	private skills: any[ ];
  private skillSubscription: Subscription;

  @Input() private selected: boolean;
  @Input() private data: any;

  constructor(
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
    this.skillSubscription = this.skillService.subscribeToSkills((skills: string[ ]) => {
      this.skills = skills;
    });
  }

  ngOnDestroy(): void {
    this.skillSubscription.unsubscribe();
  }

  /*  Request the update of the skill.

    PARAMS
      none

    RETURN
      none
  */
  private onUpdateSkill(): void {

    this.skillService.updateSkill(this.data);
  }
}
