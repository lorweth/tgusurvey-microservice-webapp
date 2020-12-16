import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';

type EntityResponseType = HttpResponse<IProgramItem>;
type EntityArrayResponseType = HttpResponse<IProgramItem[]>;

@Injectable({ providedIn: 'root' })
export class ProgramItemService {
  public resourceUrl = SERVER_API_URL + 'services/surveystore/api/program-items';

  constructor(protected http: HttpClient) {}

  create(programItem: IProgramItem): Observable<EntityResponseType> {
    return this.http.post<IProgramItem>(this.resourceUrl, programItem, { observe: 'response' });
  }

  update(programItem: IProgramItem): Observable<EntityResponseType> {
    return this.http.put<IProgramItem>(this.resourceUrl, programItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProgramItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProgramItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getListSubjectInProgram(id?: number): Observable<EntityArrayResponseType> {
    return this.http.get<IProgramItem[]>(`${this.resourceUrl}/in-program/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
