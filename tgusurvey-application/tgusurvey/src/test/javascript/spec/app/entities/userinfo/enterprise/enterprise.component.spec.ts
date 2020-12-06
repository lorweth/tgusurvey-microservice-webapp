import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { EnterpriseComponent } from 'app/entities/userinfo/enterprise/enterprise.component';
import { EnterpriseService } from 'app/entities/userinfo/enterprise/enterprise.service';
import { Enterprise } from 'app/shared/model/userinfo/enterprise.model';

describe('Component Tests', () => {
  describe('Enterprise Management Component', () => {
    let comp: EnterpriseComponent;
    let fixture: ComponentFixture<EnterpriseComponent>;
    let service: EnterpriseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [EnterpriseComponent],
      })
        .overrideTemplate(EnterpriseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnterpriseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnterpriseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Enterprise(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.enterprises && comp.enterprises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
