import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SpecializedUpdateComponent } from 'app/entities/surveystore/specialized/specialized-update.component';
import { SpecializedService } from 'app/entities/surveystore/specialized/specialized.service';
import { Specialized } from 'app/shared/model/surveystore/specialized.model';

describe('Component Tests', () => {
  describe('Specialized Management Update Component', () => {
    let comp: SpecializedUpdateComponent;
    let fixture: ComponentFixture<SpecializedUpdateComponent>;
    let service: SpecializedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SpecializedUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SpecializedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpecializedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpecializedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Specialized(123);
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
        const entity = new Specialized();
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
