import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { TgusurveyTestModule } from '../../../../test.module';
import { LecturerDetailComponent } from 'app/entities/userinfo/lecturer/lecturer-detail.component';
import { Lecturer } from 'app/shared/model/userinfo/lecturer.model';

describe('Component Tests', () => {
  describe('Lecturer Management Detail Component', () => {
    let comp: LecturerDetailComponent;
    let fixture: ComponentFixture<LecturerDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ lecturer: new Lecturer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [LecturerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LecturerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LecturerDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load lecturer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lecturer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
