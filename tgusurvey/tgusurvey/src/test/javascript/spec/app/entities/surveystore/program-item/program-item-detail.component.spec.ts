import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { ProgramItemDetailComponent } from 'app/entities/surveystore/program-item/program-item-detail.component';
import { ProgramItem } from 'app/shared/model/surveystore/program-item.model';

describe('Component Tests', () => {
  describe('ProgramItem Management Detail Component', () => {
    let comp: ProgramItemDetailComponent;
    let fixture: ComponentFixture<ProgramItemDetailComponent>;
    const route = ({ data: of({ programItem: new ProgramItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ProgramItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProgramItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProgramItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load programItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.programItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
