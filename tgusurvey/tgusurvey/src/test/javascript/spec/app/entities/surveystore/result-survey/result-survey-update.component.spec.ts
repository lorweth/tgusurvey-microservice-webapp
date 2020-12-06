import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { ResultSurveyUpdateComponent } from 'app/entities/surveystore/result-survey/result-survey-update.component';
import { ResultSurveyService } from 'app/entities/surveystore/result-survey/result-survey.service';
import { ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';

describe('Component Tests', () => {
  describe('ResultSurvey Management Update Component', () => {
    let comp: ResultSurveyUpdateComponent;
    let fixture: ComponentFixture<ResultSurveyUpdateComponent>;
    let service: ResultSurveyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ResultSurveyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ResultSurveyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ResultSurveyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ResultSurveyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ResultSurvey(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ResultSurvey();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
