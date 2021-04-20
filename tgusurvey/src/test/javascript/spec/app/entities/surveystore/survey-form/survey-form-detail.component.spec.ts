import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SurveyFormDetailComponent } from 'app/entities/surveystore/survey-form/survey-form-detail.component';
import { SurveyForm } from 'app/shared/model/surveystore/survey-form.model';

describe('Component Tests', () => {
  describe('SurveyForm Management Detail Component', () => {
    let comp: SurveyFormDetailComponent;
    let fixture: ComponentFixture<SurveyFormDetailComponent>;
    const route = ({ data: of({ surveyForm: new SurveyForm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SurveyFormDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SurveyFormDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SurveyFormDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load surveyForm on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.surveyForm).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
