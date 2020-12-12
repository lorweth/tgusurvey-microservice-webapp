import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILecturer } from 'app/shared/model/userinfo/lecturer.model';

type EntityResponseType = HttpResponse<ILecturer>;
type EntityArrayResponseType = HttpResponse<ILecturer[]>;

@Injectable({ providedIn: 'root' })
export class LecturerService {
  public resourceUrl = SERVER_API_URL + 'services/userinfo/api/lecturers';

  constructor(protected http: HttpClient) {}

  create(lecturer: ILecturer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lecturer);
    return this.http
      .post<ILecturer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(lecturer: ILecturer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lecturer);
    return this.http
      .put<ILecturer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILecturer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  // call api get enterprise profile of current login user
  getMyInfo(): Observable<EntityResponseType> {
    return this.http
      .get<ILecturer>(`${this.resourceUrl}/myinfo`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILecturer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(lecturer: ILecturer): ILecturer {
    const copy: ILecturer = Object.assign({}, lecturer, {
      birthDay: lecturer.birthDay && lecturer.birthDay.isValid() ? lecturer.birthDay.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDay = res.body.birthDay ? moment(res.body.birthDay) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((lecturer: ILecturer) => {
        lecturer.birthDay = lecturer.birthDay ? moment(lecturer.birthDay) : undefined;
      });
    }
    return res;
  }
}
