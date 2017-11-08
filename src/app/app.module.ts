import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { DisplaySituationsComponent } from './display-situations/display-situations.component';
import { PerformTestComponent } from './perform-test/perform-test.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SituationComponent } from './situation/situation.component';

import { AgentService } from './_services/agent.service';
import { DialogFlowService } from './_services/dialogflow.service';
import { SituationService } from './_services/situation.service';
import { UuidService } from './_services/uuid.service';

@NgModule({
  declarations: [
    AppComponent,
    DisplaySituationsComponent,
    PerformTestComponent,
    SideBarComponent,
    SituationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'test',
          component: PerformTestComponent
        },
        {
          path: 'situations',
          component: DisplaySituationsComponent
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
    DialogFlowService,
    SituationService,
    UuidService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
