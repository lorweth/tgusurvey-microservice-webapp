import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { LecturerUpdateComponent } from 'app/entities/userinfo/lecturer/lecturer-update.component';
import { LecturerService } from 'app/entities/userinfo/lecturer/lecturer.service';
import { Lecturer } from 'app/shared/model/userinfo/lecturer.model';

describe('Component Tests', () => {
  describe('Lecturer Management Update Component', () => {
    let comp: LecturerUpdateComponent;
    let fixture: ComponentFixture<LecturerUpdateComponent>;
    let service: LecturerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [LecturerUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LecturerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LecturerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LecturerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Lecturer(123);
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
        const entity = new Lecturer();
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
