import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { UnitComponent } from 'app/entities/userinfo/unit/unit.component';
import { UnitService } from 'app/entities/userinfo/unit/unit.service';
import { Unit } from 'app/shared/model/userinfo/unit.model';

describe('Component Tests', () => {
  describe('Unit Management Component', () => {
    let comp: UnitComponent;
    let fixture: ComponentFixture<UnitComponent>;
    let service: UnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [UnitComponent],
      })
        .overrideTemplate(UnitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Unit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.units && comp.units[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
