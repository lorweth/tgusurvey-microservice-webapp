import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SubjectConditionDetailComponent } from 'app/entities/surveystore/subject-condition/subject-condition-detail.component';
import { SubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';

describe('Component Tests', () => {
  describe('SubjectCondition Management Detail Component', () => {
    let comp: SubjectConditionDetailComponent;
    let fixture: ComponentFixture<SubjectConditionDetailComponent>;
    const route = ({ data: of({ subjectCondition: new SubjectCondition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SubjectConditionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubjectConditionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubjectConditionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subjectCondition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subjectCondition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
