import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClassroom, Classroom } from 'app/shared/model/userinfo/classroom.model';
import { ClassroomService } from './classroom.service';

@Component({
  selector: 'jhi-classroom-update',
  templateUrl: './classroom-update.component.html',
})
export class ClassroomUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    mslh: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    name: [null, [Validators.required]],
  });

  constructor(protected classroomService: ClassroomService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroom }) => {
      this.updateForm(classroom);
    });
  }

  updateForm(classroom: IClassroom): void {
    this.editForm.patchValue({
      id: classroom.id,
      mslh: classroom.mslh,
      name: classroom.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classroom = this.createFromForm();
    if (classroom.id !== undefined) {
      this.subscribeToSaveResponse(this.classroomService.update(classroom));
    } else {
      this.subscribeToSaveResponse(this.classroomService.create(classroom));
    }
  }

  private createFromForm(): IClassroom {
    return {
      ...new Classroom(),
      id: this.editForm.get(['id'])!.value,
      mslh: this.editForm.get(['mslh'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassroom>>): void {
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
}
