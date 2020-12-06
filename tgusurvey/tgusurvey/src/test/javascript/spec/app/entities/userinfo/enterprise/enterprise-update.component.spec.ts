import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { EnterpriseUpdateComponent } from 'app/entities/userinfo/enterprise/enterprise-update.component';
import { EnterpriseService } from 'app/entities/userinfo/enterprise/enterprise.service';
import { Enterprise } from 'app/shared/model/userinfo/enterprise.model';

describe('Component Tests', () => {
  describe('Enterprise Management Update Component', () => {
    let comp: EnterpriseUpdateComponent;
    let fixture: ComponentFixture<EnterpriseUpdateComponent>;
    let service: EnterpriseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [EnterpriseUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EnterpriseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnterpriseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnterpriseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Enterprise(123);
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
        const entity = new Enterprise();
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
