import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { SurveyHeaderComponent } from 'app/entities/surveystore/survey-header/survey-header.component';
import { SurveyHeaderService } from 'app/entities/surveystore/survey-header/survey-header.service';
import { SurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

describe('Component Tests', () => {
  describe('SurveyHeader Management Component', () => {
    let comp: SurveyHeaderComponent;
    let fixture: ComponentFixture<SurveyHeaderComponent>;
    let service: SurveyHeaderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SurveyHeaderComponent],
      })
        .overrideTemplate(SurveyHeaderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SurveyHeaderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyHeaderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SurveyHeader(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.surveyHeaders && comp.surveyHeaders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
