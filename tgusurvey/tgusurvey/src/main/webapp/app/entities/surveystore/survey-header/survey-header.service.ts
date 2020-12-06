import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

type EntityResponseType = HttpResponse<ISurveyHeader>;
type EntityArrayResponseType = HttpResponse<ISurveyHeader[]>;

@Injectable({ providedIn: 'root' })
export class SurveyHeaderService {
  public resourceUrl = SERVER_API_URL + 'services/surveystore/api/survey-headers';

  constructor(protected http: HttpClient) {}

  create(surveyHeader: ISurveyHeader): Observable<EntityResponseType> {
    return this.http.post<ISurveyHeader>(this.resourceUrl, surveyHeader, { observe: 'response' });
  }

  update(surveyHeader: ISurveyHeader): Observable<EntityResponseType> {
    return this.http.put<ISurveyHeader>(this.resourceUrl, surveyHeader, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISurveyHeader>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISurveyHeader[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
