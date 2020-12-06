import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IResultSurvey } from 'app/shared/model/surveystore/result-survey.model';

type EntityResponseType = HttpResponse<IResultSurvey>;
type EntityArrayResponseType = HttpResponse<IResultSurvey[]>;

@Injectable({ providedIn: 'root' })
export class ResultSurveyService {
  public resourceUrl = SERVER_API_URL + 'services/surveystore/api/result-surveys';

  constructor(protected http: HttpClient) {}

  create(resultSurvey: IResultSurvey): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultSurvey);
    return this.http
      .post<IResultSurvey>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(resultSurvey: IResultSurvey): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultSurvey);
    return this.http
      .put<IResultSurvey>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IResultSurvey>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IResultSurvey[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(resultSurvey: IResultSurvey): IResultSurvey {
    const copy: IResultSurvey = Object.assign({}, resultSurvey, {
      surveyDate: resultSurvey.surveyDate && resultSurvey.surveyDate.isValid() ? resultSurvey.surveyDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.surveyDate = res.body.surveyDate ? moment(res.body.surveyDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((resultSurvey: IResultSurvey) => {
        resultSurvey.surveyDate = resultSurvey.surveyDate ? moment(resultSurvey.surveyDate) : undefined;
      });
    }
    return res;
  }
}