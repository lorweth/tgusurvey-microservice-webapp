import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';

type EntityResponseType = HttpResponse<ISubjectCondition>;
type EntityArrayResponseType = HttpResponse<ISubjectCondition[]>;

@Injectable({ providedIn: 'root' })
export class SubjectConditionService {
  public resourceUrl = SERVER_API_URL + 'services/surveystore/api/subject-conditions';

  constructor(protected http: HttpClient) {}

  create(subjectCondition: ISubjectCondition): Observable<EntityResponseType> {
    return this.http.post<ISubjectCondition>(this.resourceUrl, subjectCondition, { observe: 'response' });
  }

  update(subjectCondition: ISubjectCondition): Observable<EntityResponseType> {
    return this.http.put<ISubjectCondition>(this.resourceUrl, subjectCondition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubjectCondition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubjectCondition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getConditionInSubject(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubjectCondition[]>(`${this.resourceUrl}/in-subject/${id}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
