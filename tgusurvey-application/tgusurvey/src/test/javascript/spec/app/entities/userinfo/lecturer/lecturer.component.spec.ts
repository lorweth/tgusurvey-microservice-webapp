import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { LecturerComponent } from 'app/entities/userinfo/lecturer/lecturer.component';
import { LecturerService } from 'app/entities/userinfo/lecturer/lecturer.service';
import { Lecturer } from 'app/shared/model/userinfo/lecturer.model';

describe('Component Tests', () => {
  describe('Lecturer Management Component', () => {
    let comp: LecturerComponent;
    let fixture: ComponentFixture<LecturerComponent>;
    let service: LecturerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [LecturerComponent],
      })
        .overrideTemplate(LecturerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LecturerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LecturerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Lecturer(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lecturers && comp.lecturers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
