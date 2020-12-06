import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { ResultSurveyComponent } from 'app/entities/surveystore/result-survey/result-survey.component';
import { ResultSurveyService } from 'app/entities/surveystore/result-survey/result-survey.service';
import { ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';

describe('Component Tests', () => {
  describe('ResultSurvey Management Component', () => {
    let comp: ResultSurveyComponent;
    let fixture: ComponentFixture<ResultSurveyComponent>;
    let service: ResultSurveyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ResultSurveyComponent],
      })
        .overrideTemplate(ResultSurveyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultSurveyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultSurveyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ResultSurvey(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.resultSurveys && comp.resultSurveys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
