import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { ClassroomDetailComponent } from 'app/entities/userinfo/classroom/classroom-detail.component';
import { Classroom } from 'app/shared/model/userinfo/classroom.model';

describe('Component Tests', () => {
  describe('Classroom Management Detail Component', () => {
    let comp: ClassroomDetailComponent;
    let fixture: ComponentFixture<ClassroomDetailComponent>;
    const route = ({ data: of({ classroom: new Classroom(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [ClassroomDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClassroomDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClassroomDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load classroom on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.classroom).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
