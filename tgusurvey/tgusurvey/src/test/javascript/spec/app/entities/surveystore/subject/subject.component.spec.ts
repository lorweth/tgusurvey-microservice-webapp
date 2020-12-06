import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { SubjectComponent } from 'app/entities/surveystore/subject/subject.component';
import { SubjectService } from 'app/entities/surveystore/subject/subject.service';
import { Subject } from 'app/shared/model/surveystore/subject.model';

describe('Component Tests', () => {
  describe('Subject Management Component', () => {
    let comp: SubjectComponent;
    let fixture: ComponentFixture<SubjectComponent>;
    let service: SubjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SubjectComponent],
      })
        .overrideTemplate(SubjectComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubjectComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Subject(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subjects && comp.subjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
