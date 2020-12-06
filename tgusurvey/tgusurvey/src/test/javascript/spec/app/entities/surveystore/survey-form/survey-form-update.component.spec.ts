import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SurveyFormUpdateComponent } from 'app/entities/surveystore/survey-form/survey-form-update.component';
import { SurveyFormService } from 'app/entities/surveystore/survey-form/survey-form.service';
import { SurveyForm } from 'app/shared/model/surveystore/survey-form.model';

describe('Component Tests', () => {
  describe('SurveyForm Management Update Component', () => {
    let comp: SurveyFormUpdateComponent;
    let fixture: ComponentFixture<SurveyFormUpdateComponent>;
    let service: SurveyFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SurveyFormUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SurveyFormUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SurveyFormUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyFormService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SurveyForm(123);
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
        const entity = new SurveyForm();
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
