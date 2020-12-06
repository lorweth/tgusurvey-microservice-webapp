import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { SurveyFormComponent } from 'app/entities/surveystore/survey-form/survey-form.component';
import { SurveyFormService } from 'app/entities/surveystore/survey-form/survey-form.service';
import { SurveyForm } from 'app/shared/model/surveystore/survey-form.model';

describe('Component Tests', () => {
  describe('SurveyForm Management Component', () => {
    let comp: SurveyFormComponent;
    let fixture: ComponentFixture<SurveyFormComponent>;
    let service: SurveyFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SurveyFormComponent],
      })
        .overrideTemplate(SurveyFormComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SurveyFormComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyFormService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SurveyForm(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.surveyForms && comp.surveyForms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
