import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SurveyFormService } from 'app/entities/surveystore/survey-form/survey-form.service';
import { ISurveyForm, SurveyForm } from 'app/shared/model/surveystore/survey-form.model';

describe('Service Tests', () => {
  describe('SurveyForm Service', () => {
    let injector: TestBed;
    let service: SurveyFormService;
    let httpMock: HttpTestingController;
    let elemDefault: ISurveyForm;
    let expectedResult: ISurveyForm | ISurveyForm[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SurveyFormService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SurveyForm(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SurveyForm', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.create(new SurveyForm()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SurveyForm', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            note: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SurveyForm', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            note: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SurveyForm', () => {
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
