import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { PositionUpdateComponent } from 'app/entities/userinfo/position/position-update.component';
import { PositionService } from 'app/entities/userinfo/position/position.service';
import { Position } from 'app/shared/model/userinfo/position.model';

describe('Component Tests', () => {
  describe('Position Management Update Component', () => {
    let comp: PositionUpdateComponent;
    let fixture: ComponentFixture<PositionUpdateComponent>;
    let service: PositionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [PositionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PositionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PositionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PositionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Position(123);
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
        const entity = new Position();
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
