import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { EducationProgramComponent } from 'app/entities/surveystore/education-program/education-program.component';
import { EducationProgramService } from 'app/entities/surveystore/education-program/education-program.service';
import { EducationProgram } from 'app/shared/model/surveystore/education-program.model';

describe('Component Tests', () => {
  describe('EducationProgram Management Component', () => {
    let comp: EducationProgramComponent;
    let fixture: ComponentFixture<EducationProgramComponent>;
    let service: EducationProgramService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [EducationProgramComponent],
      })
        .overrideTemplate(EducationProgramComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EducationProgramComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EducationProgramService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EducationProgram(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.educationPrograms && comp.educationPrograms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
