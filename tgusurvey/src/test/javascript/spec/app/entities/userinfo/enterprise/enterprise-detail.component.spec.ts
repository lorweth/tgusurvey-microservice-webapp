import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { EnterpriseDetailComponent } from 'app/entities/userinfo/enterprise/enterprise-detail.component';
import { Enterprise } from 'app/shared/model/userinfo/enterprise.model';

describe('Component Tests', () => {
  describe('Enterprise Management Detail Component', () => {
    let comp: EnterpriseDetailComponent;
    let fixture: ComponentFixture<EnterpriseDetailComponent>;
    const route = ({ data: of({ enterprise: new Enterprise(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [EnterpriseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EnterpriseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnterpriseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load enterprise on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.enterprise).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
