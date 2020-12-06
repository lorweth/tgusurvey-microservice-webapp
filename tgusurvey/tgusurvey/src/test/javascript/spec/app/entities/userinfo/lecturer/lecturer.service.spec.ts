import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { LecturerService } from 'app/entities/userinfo/lecturer/lecturer.service';
import { ILecturer, Lecturer } from 'app/shared/model/userinfo/lecturer.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

describe('Service Tests', () => {
  describe('Lecturer Service', () => {
    let injector: TestBed;
    let service: LecturerService;
    let httpMock: HttpTestingController;
    let elemDefault: ILecturer;
    let expectedResult: ILecturer | ILecturer[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LecturerService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Lecturer(0, 'AAAAAAA', currentDate, 'AAAAAAA', Gender.MALE, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            birthDay: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Lecturer', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            birthDay: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDay: currentDate,
          },
          returnedFromService
        );

        service.create(new Lecturer()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Lecturer', () => {
        const returnedFromService = Object.assign(
          {
            msgv: 'BBBBBB',
            birthDay: currentDate.format(DATE_FORMAT),
            address: 'BBBBBB',
            gender: 'BBBBBB',
            cmnd: 'BBBBBB',
            phoneNumber: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDay: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Lecturer', () => {
        const returnedFromService = Object.assign(
          {
            msgv: 'BBBBBB',
            birthDay: currentDate.format(DATE_FORMAT),
            address: 'BBBBBB',
            gender: 'BBBBBB',
            cmnd: 'BBBBBB',
            phoneNumber: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDay: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Lecturer', () => {
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
