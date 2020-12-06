import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { ProgramItemUpdateComponent } from 'app/entities/surveystore/program-item/program-item-update.component';
import { ProgramItemService } from 'app/entities/surveystore/program-item/program-item.service';
import { ProgramItem } from 'app/shared/model/surveystore/program-item.model';

describe('Component Tests', () => {
  describe('ProgramItem Management Update Component', () => {
    let comp: ProgramItemUpdateComponent;
    let fixture: ComponentFixture<ProgramItemUpdateComponent>;
    let service: ProgramItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ProgramItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProgramItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgramItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgramItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProgramItem(123);
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
        const entity = new ProgramItem();
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
