import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { ResultSurveyDetailComponent } from 'app/entities/surveystore/result-survey/result-survey-detail.component';
import { ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';

describe('Component Tests', () => {
  describe('ResultSurvey Management Detail Component', () => {
    let comp: ResultSurveyDetailComponent;
    let fixture: ComponentFixture<ResultSurveyDetailComponent>;
    const route = ({ data: of({ resultSurvey: new ResultSurvey(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ResultSurveyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ResultSurveyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ResultSurveyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load resultSurvey on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.resultSurvey).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
