import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultSurveyService } from 'app/entities/surveystore/result-survey/result-survey.service';
import { IAnswerCount } from 'app/shared/model/surveystore/answer-count.model';
import { ISurveyHeaderDTO } from 'app/shared/model/surveystore/header-dto.model';
import { IQuestionDTO } from 'app/shared/model/surveystore/question-dto.model';
import { IQuestion } from 'app/shared/model/surveystore/question.model';
import { ISectionDTO } from 'app/shared/model/surveystore/section-dto.model';
import { ISurveyFormDTO } from 'app/shared/model/surveystore/survey-form-dto.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { SurveyStatisticsComponent } from './survey-statistics.component';

@Component({
  selector: 'jhi-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-manager.component.scss'],
})
export class SurveyEditComponent implements OnInit {
  surveyForm: ISurveyFormDTO | null = null;
  eventSubscriber?: Subscription;
  data?: IAnswerCount[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    public resultSurveyService: ResultSurveyService
  ) {}

  loadChart(question: IQuestion): void {
    if (question.id !== undefined)
      this.resultSurveyService
        .getDataStatisticsOfQuestion(question.id)
        .subscribe((res: HttpResponse<IAnswerCount[]>) => (this.data = res.body || []));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyForm }) => (this.surveyForm = surveyForm));
  }

  previousState(): void {
    window.history.back();
  }

  trackHeaderId(index: number, item: ISurveyHeaderDTO): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  trackSectionId(index: number, item: ISectionDTO): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  trackQuestionId(index: number, item: IQuestionDTO): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  showChart(question: IQuestion): void {
    this.loadChart(question);

    const modalRef = this.modalService.open(SurveyStatisticsComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.question = question;
    modalRef.componentInstance.data = this.data;
  }
}
