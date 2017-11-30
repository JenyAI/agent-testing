import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SkillService } from '../_services/skill.service';

@Component({
  selector: 'app-display-skills',
  templateUrl: './display-skills.component.html',
  styleUrls: [ './display-skills.component.scss' ]
})
export class DisplaySkillsComponent implements OnInit, OnDestroy  {

  private skills: any[ ];
  private selectedSkill: number; // id of the selected skill
  private skillSubscription: Subscription;

	private filter: string = '';
  private displayedSkills: any[ ];
  private page: number = 0; // current page
  private totalPages: number = 0; // total number of page for this set of skills
  private skillsPerPages: number = 20;  // number of skills displayed per page

  constructor(
    private skillService: SkillService
  ) { }

  ngOnInit(): void {

    this.skillSubscription = this.skillService.subscribeToSkills((skills: string[ ]) => {

      this.skills = skills;
      this.updateDisplayedSkills();
    });
  }

  ngOnDestroy(): void {

    this.skillSubscription.unsubscribe();
  }

  /*  Trigger the event to create a new skill

    PARAMS
      none

    RETURN
      none
  */
  private onCreateSkill(): void {

		let skill = {
			grade: null,
			chapter: null,
			skill: null,
			subskill: null,
			title: null
		};

    this.skillService.createSkill(skill);
  }

	/*  Trigger the event to delete a skill.

    PARAMS
      id (number)

    RETURN
      none
  */
  private onDeleteSkill(id: number): void {

    this.skillService.deleteSkill(id);
  }

  /*  End the edition of a skill.

    PARAMS
      none

    RETURN
      none
  */
  private onEndEditing(): void {

		this.selectedSkill = -1;
  }

  /*  Trigger the event to create a new skill

    PARAMS
      id (number): id of the selected skill

    RETURN
      none
  */
  private onSelectedSkill(id: number): void {

		this.selectedSkill = id;
  }

  /*  Increment the page number

    PARAMS
      none

    RETURN
      none
  */
  private onNextPage(): void {

    if (this.page < this.totalPages) this.page++;
    this.updateDisplayedSkills();
  }

  /*  Decrement the page number

    PARAMS
      none

    RETURN
      none
  */
  private onPreviousPage(): void {

    if (this.page > 0) this.page--;
    this.updateDisplayedSkills();
  }

  /*  Update the filtered skills list.

    PARAMS
      none

    RETURN
      none
  */
  private updateDisplayedSkills(): void {

    let filteredSkills;
		if (this.filter == '' || this.filter == null) filteredSkills = this.skills;
    else filteredSkills = this.skills.filter((s: any) => s.title ? (s.title.toLowerCase()).includes(this.filter) : false);

    this.totalPages = Math.ceil(filteredSkills.length / this.skillsPerPages);
    if (this.page >= this.totalPages && this.page !== 0) this.page = this.totalPages -1;

    let index = this.page * this.skillsPerPages;
    this.displayedSkills = filteredSkills.slice(index, index + this.skillsPerPages);
  }
}
