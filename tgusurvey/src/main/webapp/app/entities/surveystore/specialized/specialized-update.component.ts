import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISpecialized, Specialized } from 'app/shared/model/surveystore/specialized.model';
import { SpecializedService } from './specialized.service';

@Component({
  selector: 'jhi-specialized-update',
  templateUrl: './specialized-update.component.html',
})
export class SpecializedUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    mscn: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    name: [null, [Validators.required]],
  });

  constructor(protected specializedService: SpecializedService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specialized }) => {
      this.updateForm(specialized);
    });
  }

  updateForm(specialized: ISpecialized): void {
    this.editForm.patchValue({
      id: specialized.id,
      mscn: specialized.mscn,
      name: specialized.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const specialized = this.createFromForm();
    if (specialized.id !== undefined) {
      this.subscribeToSaveResponse(this.specializedService.update(specialized));
    } else {
      this.subscribeToSaveResponse(this.specializedService.create(specialized));
    }
  }

  private createFromForm(): ISpecialized {
    return {
      ...new Specialized(),
      id: this.editForm.get(['id'])!.value,
      mscn: this.editForm.get(['mscn'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecialized>>): void {
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
