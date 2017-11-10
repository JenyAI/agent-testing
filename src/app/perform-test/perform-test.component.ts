import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

import { AgentService } from '../_services/agent.service';
import { SituationService } from '../_services/situation.service';

@Component ({
  selector: 'app-perform-test',
  templateUrl: 'perform-test.component.html',
  styleUrls: [ 'perform-test.component.scss' ]
})
export class PerformTestComponent implements OnInit, OnDestroy {

  private results: any[ ] = [ ];
  private status: string = 'ready';
  private testsPerformed: number = 0;
  private totalTests: number = 0;
  private successes: number = 0;
  private failures: number = 0;
  private successRate = 0.0;

  private situations: any[ ] = [ ];
  private subscription: Subscription;

  constructor(
    private agentService: AgentService,
    private situationService: SituationService
  ) { }

  ngOnInit(): void {
    this.subscription = this.situationService.subscribeToSituations((situations: string[ ]) => {
      this.situations = situations;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*  Perform test on agent.

    PARAMS
      none

    RETURN
      none
  */
  private performTests(): void {

    let testableSituations = this.prepareTest();

    Observable
    .from(testableSituations)
    .bufferCount(3)
    .concatMap(situations => {
      let tasks = situations.map(s => this.agentService.sendMessage(s.utterance).delay(1000).do(((raw: any) => this.checkResponse(raw, s))));

      return Observable.forkJoin(tasks);
    })
    .subscribe(() => {
      this.computeResults();
    });
  }

  /*  Prepare a test.

    PARAMS
      none

    RETURN
      none
  */
  private prepareTest(): any[ ] {

    let testableSituations = this.situations.filter(s => s.utterance);

    this.status = 'in-progress';
    this.testsPerformed = 0;
    this.totalTests = testableSituations.length;
    this.successes = 0;
    this.failures = 0;
    this.results = [ ];

    return testableSituations;
  }

  /*  Prepare a test.

    PARAMS
      raw (object): response from agent
      situation (object)

    RETURN
      none
  */
  private checkResponse(raw: any, situation: any): void {
    let triggeredIntentName = raw.result.metadata.intentName;

    let success = triggeredIntentName === situation.intentName;
    if (success) this.successes++;
    else this.failures++;

    let result = {
      success: success,

      expectedIntent: situation.intentName,
      utterance: situation.utterance,

      obtainedIntent: triggeredIntentName
    };

    this.results.push(result);

    this.testsPerformed++;
  }

  /*  Compute test results.

    PARAMS
      none

    RETURN
      none
  */
  private computeResults(): void {

    this.successRate = Math.floor(this.successes / this.totalTests * 100);
    this.status = 'done';
  }
}
