import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SpecializedDetailComponent } from 'app/entities/surveystore/specialized/specialized-detail.component';
import { Specialized } from 'app/shared/model/surveystore/specialized.model';

describe('Component Tests', () => {
  describe('Specialized Management Detail Component', () => {
    let comp: SpecializedDetailComponent;
    let fixture: ComponentFixture<SpecializedDetailComponent>;
    const route = ({ data: of({ specialized: new Specialized(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SpecializedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SpecializedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpecializedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load specialized on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.specialized).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
