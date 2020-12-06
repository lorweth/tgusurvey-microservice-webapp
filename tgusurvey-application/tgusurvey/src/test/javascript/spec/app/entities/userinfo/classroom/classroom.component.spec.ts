import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { ClassroomComponent } from 'app/entities/userinfo/classroom/classroom.component';
import { ClassroomService } from 'app/entities/userinfo/classroom/classroom.service';
import { Classroom } from 'app/shared/model/userinfo/classroom.model';

describe('Component Tests', () => {
  describe('Classroom Management Component', () => {
    let comp: ClassroomComponent;
    let fixture: ComponentFixture<ClassroomComponent>;
    let service: ClassroomService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ClassroomComponent],
      })
        .overrideTemplate(ClassroomComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClassroomComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClassroomService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Classroom(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.classrooms && comp.classrooms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
