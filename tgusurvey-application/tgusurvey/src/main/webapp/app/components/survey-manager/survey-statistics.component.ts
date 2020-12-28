import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultSurveyService } from 'app/entities/surveystore/result-survey/result-survey.service';
import { IAnswerCount } from 'app/shared/model/surveystore/answer-count.model';
import { IData } from 'app/shared/model/surveystore/data-statistics.model';
import { IQuestion } from 'app/shared/model/surveystore/question.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-survey-statistics',
  templateUrl: './survey-statistics.component.html',
  styleUrls: ['./survey-manager.component.scss'],
})
export class SurveyStatisticsComponent implements OnInit {
  question?: IQuestion;
  result: IData[] = [];
  data: IAnswerCount[] = [];
  eventSubscriber?: Subscription;

  view: [number, number] = [700, 400];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FFF'],
  };

  constructor(
    public activeModal: NgbActiveModal,
    public resultSurveyService: ResultSurveyService,
    protected eventManager: JhiEventManager
  ) {}

  loadChart(): void {
    this.result = this.handleDataStatistics(this.data);
  }

  ngOnInit(): void {
    this.loadChart();
  }

  handleDataStatistics(data: any[]): IData[] {
    const result: IData[] = [];
    data.forEach(item => result.push({ name: item.answer, value: item.count }));
    return result;
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
