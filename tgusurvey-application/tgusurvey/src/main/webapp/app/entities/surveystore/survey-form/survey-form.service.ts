import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISurveyForm } from 'app/shared/model/surveystore/survey-form.model';

type EntityResponseType = HttpResponse<ISurveyForm>;
type EntityArrayResponseType = HttpResponse<ISurveyForm[]>;

@Injectable({ providedIn: 'root' })
export class SurveyFormService {
  public resourceUrl = SERVER_API_URL + 'services/surveystore/api/survey-forms';

  constructor(protected http: HttpClient) {}

  create(surveyForm: ISurveyForm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(surveyForm);
    return this.http
      .post<ISurveyForm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(surveyForm: ISurveyForm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(surveyForm);
    return this.http
      .put<ISurveyForm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISurveyForm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISurveyForm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(surveyForm: ISurveyForm): ISurveyForm {
    const copy: ISurveyForm = Object.assign({}, surveyForm, {
      startDate: surveyForm.startDate && surveyForm.startDate.isValid() ? surveyForm.startDate.toJSON() : undefined,
      endDate: surveyForm.endDate && surveyForm.endDate.isValid() ? surveyForm.endDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((surveyForm: ISurveyForm) => {
        surveyForm.startDate = surveyForm.startDate ? moment(surveyForm.startDate) : undefined;
        surveyForm.endDate = surveyForm.endDate ? moment(surveyForm.endDate) : undefined;
      });
    }
    return res;
  }
}
