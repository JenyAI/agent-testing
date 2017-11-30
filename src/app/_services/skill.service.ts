import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { WebsocketService } from './websocket.service';

@Injectable()
export class SkillService {

  // id of the selected intent
  private selectedIntentId: string = '';

  private skills: any[ ] = [ ];
  private subjectSkill: BehaviorSubject<any[]> = new BehaviorSubject([ ]);

  constructor(private websocketService: WebsocketService) {

    this.websocketService.addListener('skill-created').subscribe((skill: any) => this.onSkillCreated(skill));

    this.websocketService.addListener('skill-deleted').subscribe((id: string) => this.onSkillDeleted(id));

    this.websocketService.addListener('skill-updated').subscribe((skill: any) => this.onSkillUpdated(skill));

    this.websocketService.addListener('skill-got-all').subscribe((skills: any[ ]) => this.onSkillsGot(skills));

    this.websocketService.send('skill-get-all');
  }



	/****************************************************************
  /*
  /*      WEBSOCKET EVENTS HANDLERS
  /*
  /***************************************************************/



  /*  Triggered when skill created on server.

    PARAMS
      skill (object)

    RETURN
      none
  */
  private onSkillCreated(skill: any): void {

    this.skills.push(skill);
    this.subjectSkill.next(this.skills);
  }

  /*  Triggered when skill deleted on server.

    PARAMS
      id (string): id of the deleted skill

    RETURN
      none
  */
  private onSkillDeleted(id: string): void {

    this.skills = this.skills.filter(s => s.id != id);
    this.subjectSkill.next(this.skills);
  }

  /*  Triggered when skill updated on server.

    PARAMS
      skill (object)

    RETURN
      none
  */
  private onSkillUpdated(skill: any): void {

    let oldSkill = this.skills.find(s => s.id == skill.id);
    oldSkill = skill;
    this.subjectSkill.next(this.skills);
  }

  /*  Triggered when skill retrieved from server.

    PARAMS
      skills (array of objects)

    RETURN
      none
  */
  private onSkillsGot(skills: any[ ]): void {

    this.skills = skills;
    this.subjectSkill.next(this.skills);
  }



	/****************************************************************
  /*
  /*      INTERFACE
  /*
  /***************************************************************/



  /*  Create a skill

    PARAMS
      data (object)

    RETURN
      none
  */
  public createSkill(data: any): void {

    let skill = {
      grade: data.grade,
      chapter: data.chapter,
      skill: data.skill,
      subskill: data.subskill,
      title: data.title
    };

    this.websocketService.send('skill-create', skill);
  }

  /*  Delete a skill

    PARAMS
      id (number)

    RETURN
      none
  */
  public deleteSkill(id): void {

    let data = {
      id: id
    };

    this.websocketService.send('skill-delete', data);
  }

  /*  Update a skill

    PARAMS
      skill (object)

    RETURN
      none
  */
  public updateSkill(skill): void {

    this.websocketService.send('skill-update', skill);
  }

  /*  Subscribe to changes in the list of skills

    PARAMS
      observer (function)

    RETURN
      (Subscription)
  */
  public subscribeToSkills(observer): Subscription {

    return this.subjectSkill.subscribe(observer);
  }
}
