import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SurveyHeaderUpdateComponent } from 'app/entities/surveystore/survey-header/survey-header-update.component';
import { SurveyHeaderService } from 'app/entities/surveystore/survey-header/survey-header.service';
import { SurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

describe('Component Tests', () => {
  describe('SurveyHeader Management Update Component', () => {
    let comp: SurveyHeaderUpdateComponent;
    let fixture: ComponentFixture<SurveyHeaderUpdateComponent>;
    let service: SurveyHeaderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SurveyHeaderUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SurveyHeaderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SurveyHeaderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyHeaderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SurveyHeader(123);
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
        const entity = new SurveyHeader();
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
