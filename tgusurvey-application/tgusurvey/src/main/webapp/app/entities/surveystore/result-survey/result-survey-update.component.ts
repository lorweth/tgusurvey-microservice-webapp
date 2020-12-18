import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IResultSurvey, ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { ResultSurveyService } from './result-survey.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IQuestion } from 'app/shared/model/surveystore/question.model';
import { QuestionService } from 'app/entities/surveystore/question/question.service';

type SelectableEntity = IUser | IQuestion;

@Component({
  selector: 'jhi-result-survey-update',
  templateUrl: './result-survey-update.component.html',
})
export class ResultSurveyUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  questions: IQuestion[] = [];

  editForm = this.fb.group({
    id: [],
    answer: [],
    comment: [],
    date: [],
    user: [],
    question: [],
  });

  constructor(
    protected resultSurveyService: ResultSurveyService,
    protected userService: UserService,
    protected questionService: QuestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resultSurvey }) => {
      if (!resultSurvey.id) {
        const today = moment().startOf('day');
        resultSurvey.date = today;
      }

      this.updateForm(resultSurvey);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.questionService.query().subscribe((res: HttpResponse<IQuestion[]>) => (this.questions = res.body || []));
    });
  }

  updateForm(resultSurvey: IResultSurvey): void {
    this.editForm.patchValue({
      id: resultSurvey.id,
      answer: resultSurvey.answer,
      comment: resultSurvey.comment,
      date: resultSurvey.date ? resultSurvey.date.format(DATE_TIME_FORMAT) : null,
      user: resultSurvey.user,
      question: resultSurvey.question,
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
      answer: this.editForm.get(['answer'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      user: this.editForm.get(['user'])!.value,
      question: this.editForm.get(['question'])!.value,
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
