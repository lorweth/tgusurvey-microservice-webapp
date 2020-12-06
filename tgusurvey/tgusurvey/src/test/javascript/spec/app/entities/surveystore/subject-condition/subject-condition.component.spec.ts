import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { SubjectConditionComponent } from 'app/entities/surveystore/subject-condition/subject-condition.component';
import { SubjectConditionService } from 'app/entities/surveystore/subject-condition/subject-condition.service';
import { SubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';

describe('Component Tests', () => {
  describe('SubjectCondition Management Component', () => {
    let comp: SubjectConditionComponent;
    let fixture: ComponentFixture<SubjectConditionComponent>;
    let service: SubjectConditionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SubjectConditionComponent],
      })
        .overrideTemplate(SubjectConditionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubjectConditionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectConditionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubjectCondition(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subjectConditions && comp.subjectConditions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
