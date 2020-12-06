import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClassroom } from 'app/shared/model/userinfo/classroom.model';

type EntityResponseType = HttpResponse<IClassroom>;
type EntityArrayResponseType = HttpResponse<IClassroom[]>;

@Injectable({ providedIn: 'root' })
export class ClassroomService {
  public resourceUrl = SERVER_API_URL + 'services/userinfo/api/classrooms';

  constructor(protected http: HttpClient) {}

  create(classroom: IClassroom): Observable<EntityResponseType> {
    return this.http.post<IClassroom>(this.resourceUrl, classroom, { observe: 'response' });
  }

  update(classroom: IClassroom): Observable<EntityResponseType> {
    return this.http.put<IClassroom>(this.resourceUrl, classroom, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClassroom>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClassroom[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
