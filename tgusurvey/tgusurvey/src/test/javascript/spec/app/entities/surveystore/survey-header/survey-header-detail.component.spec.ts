import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SurveyHeaderDetailComponent } from 'app/entities/surveystore/survey-header/survey-header-detail.component';
import { SurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

describe('Component Tests', () => {
  describe('SurveyHeader Management Detail Component', () => {
    let comp: SurveyHeaderDetailComponent;
    let fixture: ComponentFixture<SurveyHeaderDetailComponent>;
    const route = ({ data: of({ surveyHeader: new SurveyHeader(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SurveyHeaderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SurveyHeaderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SurveyHeaderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load surveyHeader on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.surveyHeader).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
