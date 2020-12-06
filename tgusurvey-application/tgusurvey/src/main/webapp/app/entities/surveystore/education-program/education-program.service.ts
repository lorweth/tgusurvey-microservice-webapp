import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';

type EntityResponseType = HttpResponse<IEducationProgram>;
type EntityArrayResponseType = HttpResponse<IEducationProgram[]>;

@Injectable({ providedIn: 'root' })
export class EducationProgramService {
  public resourceUrl = SERVER_API_URL + 'services/surveystore/api/education-programs';

  constructor(protected http: HttpClient) {}

  create(educationProgram: IEducationProgram): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(educationProgram);
    return this.http
      .post<IEducationProgram>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(educationProgram: IEducationProgram): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(educationProgram);
    return this.http
      .put<IEducationProgram>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEducationProgram>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEducationProgram[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(educationProgram: IEducationProgram): IEducationProgram {
    const copy: IEducationProgram = Object.assign({}, educationProgram, {
      year: educationProgram.year && educationProgram.year.isValid() ? educationProgram.year.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.year = res.body.year ? moment(res.body.year) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((educationProgram: IEducationProgram) => {
        educationProgram.year = educationProgram.year ? moment(educationProgram.year) : undefined;
      });
    }
    return res;
  }
}
