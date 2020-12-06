import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { EducationProgramDetailComponent } from 'app/entities/surveystore/education-program/education-program-detail.component';
import { EducationProgram } from 'app/shared/model/surveystore/education-program.model';

describe('Component Tests', () => {
  describe('EducationProgram Management Detail Component', () => {
    let comp: EducationProgramDetailComponent;
    let fixture: ComponentFixture<EducationProgramDetailComponent>;
    const route = ({ data: of({ educationProgram: new EducationProgram(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [EducationProgramDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EducationProgramDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EducationProgramDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load educationProgram on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.educationProgram).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
