import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { ClassroomUpdateComponent } from 'app/entities/userinfo/classroom/classroom-update.component';
import { ClassroomService } from 'app/entities/userinfo/classroom/classroom.service';
import { Classroom } from 'app/shared/model/userinfo/classroom.model';

describe('Component Tests', () => {
  describe('Classroom Management Update Component', () => {
    let comp: ClassroomUpdateComponent;
    let fixture: ComponentFixture<ClassroomUpdateComponent>;
    let service: ClassroomService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ClassroomUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClassroomUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClassroomUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClassroomService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Classroom(123);
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
        const entity = new Classroom();
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
