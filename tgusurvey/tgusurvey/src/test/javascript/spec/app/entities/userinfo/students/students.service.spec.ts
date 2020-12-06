import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { StudentsService } from 'app/entities/userinfo/students/students.service';
import { IStudents, Students } from 'app/shared/model/userinfo/students.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { GraduationStatus } from 'app/shared/model/enumerations/graduation-status.model';

describe('Service Tests', () => {
  describe('Students Service', () => {
    let injector: TestBed;
    let service: StudentsService;
    let httpMock: HttpTestingController;
    let elemDefault: IStudents;
    let expectedResult: IStudents | IStudents[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StudentsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Students(0, 'AAAAAAA', currentDate, Gender.MALE, 'AAAAAAA', 'AAAAAAA', GraduationStatus.GRADUATED);
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

      it('should create a Students', () => {
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

        service.create(new Students()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Students', () => {
        const returnedFromService = Object.assign(
          {
            mssv: 'BBBBBB',
            birthDay: currentDate.format(DATE_FORMAT),
            gender: 'BBBBBB',
            cmnd: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            graduationStatus: 'BBBBBB',
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

      it('should return a list of Students', () => {
        const returnedFromService = Object.assign(
          {
            mssv: 'BBBBBB',
            birthDay: currentDate.format(DATE_FORMAT),
            gender: 'BBBBBB',
            cmnd: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            graduationStatus: 'BBBBBB',
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

      it('should delete a Students', () => {
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
