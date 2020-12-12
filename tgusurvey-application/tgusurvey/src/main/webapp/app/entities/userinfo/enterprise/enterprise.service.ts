import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEnterprise } from 'app/shared/model/userinfo/enterprise.model';

type EntityResponseType = HttpResponse<IEnterprise>;
type EntityArrayResponseType = HttpResponse<IEnterprise[]>;

@Injectable({ providedIn: 'root' })
export class EnterpriseService {
  public resourceUrl = SERVER_API_URL + 'services/userinfo/api/enterprises';

  constructor(protected http: HttpClient) {}

  create(enterprise: IEnterprise): Observable<EntityResponseType> {
    return this.http.post<IEnterprise>(this.resourceUrl, enterprise, { observe: 'response' });
  }

  update(enterprise: IEnterprise): Observable<EntityResponseType> {
    return this.http.put<IEnterprise>(this.resourceUrl, enterprise, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnterprise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  // call api get enterprise profile of current login user
  getMyInfo(): Observable<EntityResponseType> {
    return this.http.get<IEnterprise>(`${this.resourceUrl}/myinfo`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnterprise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
