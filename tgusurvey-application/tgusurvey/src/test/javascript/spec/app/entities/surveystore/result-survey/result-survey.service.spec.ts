import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ResultSurveyService } from 'app/entities/surveystore/result-survey/result-survey.service';
import { IResultSurvey, ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { Answer } from 'app/shared/model/enumerations/answer.model';

describe('Service Tests', () => {
  describe('ResultSurvey Service', () => {
    let injector: TestBed;
    let service: ResultSurveyService;
    let httpMock: HttpTestingController;
    let elemDefault: IResultSurvey;
    let expectedResult: IResultSurvey | IResultSurvey[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ResultSurveyService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ResultSurvey(0, currentDate, Answer.OPTION1);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            surveyDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ResultSurvey', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            surveyDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            surveyDate: currentDate,
          },
          returnedFromService
        );

        service.create(new ResultSurvey()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ResultSurvey', () => {
        const returnedFromService = Object.assign(
          {
            surveyDate: currentDate.format(DATE_TIME_FORMAT),
            answer: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            surveyDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ResultSurvey', () => {
        const returnedFromService = Object.assign(
          {
            surveyDate: currentDate.format(DATE_TIME_FORMAT),
            answer: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            surveyDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ResultSurvey', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
