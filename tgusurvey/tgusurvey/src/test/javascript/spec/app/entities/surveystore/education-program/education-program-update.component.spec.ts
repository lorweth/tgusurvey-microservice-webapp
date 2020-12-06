import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { EducationProgramUpdateComponent } from 'app/entities/surveystore/education-program/education-program-update.component';
import { EducationProgramService } from 'app/entities/surveystore/education-program/education-program.service';
import { EducationProgram } from 'app/shared/model/surveystore/education-program.model';

describe('Component Tests', () => {
  describe('EducationProgram Management Update Component', () => {
    let comp: EducationProgramUpdateComponent;
    let fixture: ComponentFixture<EducationProgramUpdateComponent>;
    let service: EducationProgramService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [EducationProgramUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EducationProgramUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EducationProgramUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EducationProgramService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EducationProgram(123);
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
        const entity = new EducationProgram();
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
