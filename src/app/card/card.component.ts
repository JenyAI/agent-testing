import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CardService } from '../_services/card.service';
import { SkillService } from '../_services/skill.service';

@Component ({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: [ 'card.component.scss' ]
})
export class CardComponent implements OnInit, OnDestroy {

	private cards: any[ ];

	private skills: any[ ];
	private selectedSkill: object;
  private skillSubscription: Subscription;

  @Input() private selected: boolean;
  @Input() private data: any;

  constructor(
		private cardService: CardService,
		private skillService: SkillService
	) { }

	ngOnInit(): void {
		this.skillSubscription = this.skillService.subscribeToSkills((skills: any[ ]) => {
			this.skills = skills.map(s => {

				let title = '';
				if (s.grade) title += s.grade;
				if (s.chapter) title += '.' + s.chapter;
				if (s.skill) title += '.' + s.skill;
				if (s.subskill) title += '.' + s.subskill;
				if (s.title) title += ' ' + s.title;

				let newSkill = { title: title, id: s.id };

				return newSkill;
			});

			this.selectedSkill = this.skills.find(s => s.id == this.data.skillId);
		});
	}

	ngOnDestroy(): void {
		this.skillSubscription.unsubscribe();
	}

  /*  Request the update of the card.

    PARAMS
      none

    RETURN
      none
  */
  private onUpdateCard(): void {

    this.cardService.updateCard(this.data);
  }

	/*  Select a skill for the card.

		PARAMS
			event (object)

		RETURN
			none
	*/
	private onSelectedSkill(event: any): void {

		this.data.skillId = event.target.value;

		this.selectedSkill = this.skills.find(s => s.id == this.data.skillId);

		this.onUpdateCard();
	}
}
