import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { AgentInformationComponent } from './agent-information/agent-information.component';
import { DisplaySituationsComponent } from './display-situations/display-situations.component';
import { DisplaySkillsComponent } from './display-skills/display-skills.component';
import { PerformTestComponent } from './perform-test/perform-test.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SituationComponent } from './situation/situation.component';
import { SkillComponent } from './skill/skill.component';

import { AgentService } from './_services/agent.service';
import { CardService } from './_services/card.service';
import { SituationService } from './_services/situation.service';
import { SkillService } from './_services/skill.service';
import { UuidService } from './_services/uuid.service';
import { WebsocketService } from './_services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    AgentInformationComponent,
    DisplaySituationsComponent,
		DisplaySkillsComponent,
    PerformTestComponent,
    SideBarComponent,
    SituationComponent,
		SkillComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'information',
          component: AgentInformationComponent
        },
        {
          path: 'situations',
          component: DisplaySituationsComponent
        },
        {
          path: 'skills',
          component: DisplaySkillsComponent
        },
        {
          path: 'test',
          component: PerformTestComponent
        },
        {
          path: '**',
          redirectTo: '/situations'
        }
      ]
    )
  ],
  providers: [
    AgentService,
		CardService,
    SituationService,
    SkillService,
    UuidService,
    WebsocketService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
