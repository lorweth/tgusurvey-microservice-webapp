import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<ISurveyForm>(this.resourceUrl, surveyForm, { observe: 'response' });
  }

  update(surveyForm: ISurveyForm): Observable<EntityResponseType> {
    return this.http.put<ISurveyForm>(this.resourceUrl, surveyForm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISurveyForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISurveyForm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
