import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILecturer, Lecturer } from 'app/shared/model/userinfo/lecturer.model';
import { LecturerService } from './lecturer.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPosition } from 'app/shared/model/userinfo/position.model';
import { PositionService } from 'app/entities/userinfo/position/position.service';
import { IUnit } from 'app/shared/model/userinfo/unit.model';
import { UnitService } from 'app/entities/userinfo/unit/unit.service';

type SelectableEntity = IUser | IPosition | IUnit;

@Component({
  selector: 'jhi-lecturer-update',
  templateUrl: './lecturer-update.component.html',
})
export class LecturerUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser | null = null;
  positions: IPosition[] = [];
  units: IUnit[] = [];
  birthDayDp: any;

  editForm = this.fb.group({
    id: [],
    msgv: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    birthDay: [null, [Validators.required]],
    address: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    cmnd: [null, [Validators.required, Validators.maxLength(9)]],
    phoneNumber: [null, [Validators.required, Validators.maxLength(10)]],
    user: [],
    position: [],
    unit: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected lecturerService: LecturerService,
    protected userService: UserService,
    protected positionService: PositionService,
    protected unitService: UnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lecturer }) => {
      this.updateForm(lecturer);

      this.userService.getCurrentUser().subscribe((res: HttpResponse<IUser>) => (this.users = res.body || null));

      this.positionService
        .query({ filter: 'lecturer-is-null' })
        .pipe(
          map((res: HttpResponse<IPosition[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPosition[]) => {
          if (!lecturer.position || !lecturer.position.id) {
            this.positions = resBody;
          } else {
            this.positionService
              .find(lecturer.position.id)
              .pipe(
                map((subRes: HttpResponse<IPosition>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPosition[]) => (this.positions = concatRes));
          }
        });

      this.unitService.query().subscribe((res: HttpResponse<IUnit[]>) => (this.units = res.body || []));
    });
  }

  updateForm(lecturer: ILecturer): void {
    this.editForm.patchValue({
      id: lecturer.id,
      msgv: lecturer.msgv,
      birthDay: lecturer.birthDay,
      address: lecturer.address,
      gender: lecturer.gender,
      cmnd: lecturer.cmnd,
      phoneNumber: lecturer.phoneNumber,
      user: lecturer.user,
      position: lecturer.position,
      unit: lecturer.unit,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('tgusurveyApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lecturer = this.createFromForm();
    if (lecturer.id !== undefined) {
      this.subscribeToSaveResponse(this.lecturerService.update(lecturer));
    } else {
      this.subscribeToSaveResponse(this.lecturerService.create(lecturer));
    }
  }

  private createFromForm(): ILecturer {
    return {
      ...new Lecturer(),
      id: this.editForm.get(['id'])!.value,
      msgv: this.editForm.get(['msgv'])!.value,
      birthDay: this.editForm.get(['birthDay'])!.value,
      address: this.editForm.get(['address'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      cmnd: this.editForm.get(['cmnd'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      //user: this.editForm.get(['user'])!.value,
      user: this.users || undefined,
      position: this.editForm.get(['position'])!.value,
      unit: this.editForm.get(['unit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILecturer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
