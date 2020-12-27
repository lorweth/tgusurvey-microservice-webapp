import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ResultSurveyService } from 'app/entities/surveystore/result-survey/result-survey.service';
import { ISurveyHeaderDTO } from 'app/shared/model/surveystore/header-dto.model';
import { IQuestionDTO } from 'app/shared/model/surveystore/question-dto.model';
import { IResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { ISectionDTO } from 'app/shared/model/surveystore/section-dto.model';
import { ISurveyFormDTO } from 'app/shared/model/surveystore/survey-form-dto.model';
import * as moment from 'moment';
import { JhiEventManager } from 'ng-jhipster';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'jhi-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-manager.component.scss'],
})
export class SurveyDetailComponent implements OnInit, OnDestroy {
  surveyForm: ISurveyFormDTO | null = null;

  isSelectQuestion = false;
  isSaving = false;

  userAnswer: IResultSurvey = {}; // Khởi tạo biến lưu câu trả lời

  eventSubscriber?: Subscription;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected resultSurveyService: ResultSurveyService,
    protected eventManager: JhiEventManager,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyForm }) => (this.surveyForm = surveyForm));
    this.userService.getCurrentUser().subscribe((res: HttpResponse<IUser>) => (this.userAnswer.user = res.body || undefined));
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  previousState(): void {
    window.history.back();
  }

  /**
   * lấy dữ liệu câu trả lời
   * @param idQues id của câu hỏi cần hiển thị câu trả lời
   */
  getAnswer(idQues: number): void {
    this.eventSubscriber = this.resultSurveyService
      .getAnswerOfQuestion(idQues)
      .subscribe((res: HttpResponse<IResultSurvey>) => (this.userAnswer = res.body || {}));
  }

  /**
   * lưu thông tin câu hỏi vào biến userAnser,
   * cập nhật câu trả lời của user với câu hỏi đó
   * @param question câu hỏi cần trả lời
   */
  selectQuesion(question: IQuestionDTO): void {
    this.getAnswer(question.id!);
    this.userAnswer.question = question;
    this.isSelectQuestion = true;
  }

  /**
   * Lưu, hoặc cập nhật câu trả lời của User login
   */
  saveAnswer(): void {
    this.isSaving = true;
    const today = moment().startOf('day');
    this.userAnswer.date = today;
    if (this.surveyForm!.startDate! <= today && this.surveyForm!.endDate! >= today && this.selectQuesion) {
      if (this.userAnswer.id !== undefined) {
        this.subscribeToSaveResponse(this.resultSurveyService.update(this.userAnswer));
      } else {
        this.subscribeToSaveResponse(this.resultSurveyService.create(this.userAnswer));
      }
    } else {
      window.alert('Không phải thời gian kiểm tra');
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResultSurvey>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
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
}
