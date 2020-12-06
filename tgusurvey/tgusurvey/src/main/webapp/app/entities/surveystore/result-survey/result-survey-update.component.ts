import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IResultSurvey, ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { ResultSurveyService } from './result-survey.service';
import { IQuestion } from 'app/shared/model/surveystore/question.model';
import { QuestionService } from 'app/entities/surveystore/question/question.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IQuestion | IUser;

@Component({
  selector: 'jhi-result-survey-update',
  templateUrl: './result-survey-update.component.html',
})
export class ResultSurveyUpdateComponent implements OnInit {
  isSaving = false;
  questions: IQuestion[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    surveyDate: [],
    answer: [],
    question: [],
    user: [],
  });

  constructor(
    protected resultSurveyService: ResultSurveyService,
    protected questionService: QuestionService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resultSurvey }) => {
      if (!resultSurvey.id) {
        const today = moment().startOf('day');
        resultSurvey.surveyDate = today;
      }

      this.updateForm(resultSurvey);

      this.questionService
        .query({ filter: 'resultsurvey-is-null' })
        .pipe(
          map((res: HttpResponse<IQuestion[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IQuestion[]) => {
          if (!resultSurvey.question || !resultSurvey.question.id) {
            this.questions = resBody;
          } else {
            this.questionService
              .find(resultSurvey.question.id)
              .pipe(
                map((subRes: HttpResponse<IQuestion>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IQuestion[]) => (this.questions = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(resultSurvey: IResultSurvey): void {
    this.editForm.patchValue({
      id: resultSurvey.id,
      surveyDate: resultSurvey.surveyDate ? resultSurvey.surveyDate.format(DATE_TIME_FORMAT) : null,
      answer: resultSurvey.answer,
      question: resultSurvey.question,
      user: resultSurvey.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resultSurvey = this.createFromForm();
    if (resultSurvey.id !== undefined) {
      this.subscribeToSaveResponse(this.resultSurveyService.update(resultSurvey));
    } else {
      this.subscribeToSaveResponse(this.resultSurveyService.create(resultSurvey));
    }
  }

  private createFromForm(): IResultSurvey {
    return {
      ...new ResultSurvey(),
      id: this.editForm.get(['id'])!.value,
      surveyDate: this.editForm.get(['surveyDate'])!.value ? moment(this.editForm.get(['surveyDate'])!.value, DATE_TIME_FORMAT) : undefined,
      answer: this.editForm.get(['answer'])!.value,
      question: this.editForm.get(['question'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResultSurvey>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
