import { Component, Input } from '@angular/core';

import { SkillService } from '../_services/skill.service';

@Component ({
  selector: 'app-skill',
  templateUrl: 'skill.component.html',
  styleUrls: [ 'skill.component.scss' ]
})
export class SkillComponent {

	private skills: any[ ];

  @Input() private selected: boolean;
  @Input() private data: any;

  constructor( private skillService: SkillService ) { }

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
