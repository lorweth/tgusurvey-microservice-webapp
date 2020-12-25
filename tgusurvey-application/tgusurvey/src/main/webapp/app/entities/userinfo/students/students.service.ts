import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStudents } from 'app/shared/model/userinfo/students.model';

type EntityResponseType = HttpResponse<IStudents>;
type EntityArrayResponseType = HttpResponse<IStudents[]>;

@Injectable({ providedIn: 'root' })
export class StudentsService {
  public resourceUrl = SERVER_API_URL + 'services/userinfo/api/students';

  constructor(protected http: HttpClient) {}

  create(students: IStudents): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(students);
    return this.http
      .post<IStudents>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(students: IStudents): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(students);
    return this.http
      .put<IStudents>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStudents>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  // call api get student profile of current login user
  getMyInfo(): Observable<EntityResponseType> {
    return this.http
      .get<IStudents>(`${this.resourceUrl}/myinfo`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudents[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getStudentsInClass(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudents[]>(`${this.resourceUrl}/in-class/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getStudentsByMssvContain(keyword: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudents[]>(`${this.resourceUrl}/find-by-mssv/${keyword}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(students: IStudents): IStudents {
    const copy: IStudents = Object.assign({}, students, {
      birthDay: students.birthDay && students.birthDay.isValid() ? students.birthDay.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((students: IStudents) => {
        students.birthDay = students.birthDay ? moment(students.birthDay) : undefined;
      });
    }
    return res;
  }
}
