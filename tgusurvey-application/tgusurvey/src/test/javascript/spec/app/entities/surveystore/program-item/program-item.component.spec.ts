import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TgusurveyTestModule } from '../../../../test.module';
import { ProgramItemComponent } from 'app/entities/surveystore/program-item/program-item.component';
import { ProgramItemService } from 'app/entities/surveystore/program-item/program-item.service';
import { ProgramItem } from 'app/shared/model/surveystore/program-item.model';

describe('Component Tests', () => {
  describe('ProgramItem Management Component', () => {
    let comp: ProgramItemComponent;
    let fixture: ComponentFixture<ProgramItemComponent>;
    let service: ProgramItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ProgramItemComponent],
      })
        .overrideTemplate(ProgramItemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgramItemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgramItemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProgramItem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.programItems && comp.programItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
