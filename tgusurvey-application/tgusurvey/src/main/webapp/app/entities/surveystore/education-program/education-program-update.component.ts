import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEducationProgram, EducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { EducationProgramService } from './education-program.service';
import { ISpecialized } from 'app/shared/model/surveystore/specialized.model';
import { SpecializedService } from 'app/entities/surveystore/specialized/specialized.service';

@Component({
  selector: 'jhi-education-program-update',
  templateUrl: './education-program-update.component.html',
})
export class EducationProgramUpdateComponent implements OnInit {
  isSaving = false;
  specializeds: ISpecialized[] = [];
  yearDp: any;

  editForm = this.fb.group({
    id: [],
    msct: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    name: [null, [Validators.minLength(5), Validators.maxLength(30)]],
    year: [null, [Validators.required]],
    specialized: [],
  });

  constructor(
    protected educationProgramService: EducationProgramService,
    protected specializedService: SpecializedService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ educationProgram }) => {
      this.updateForm(educationProgram);

      this.specializedService.query().subscribe((res: HttpResponse<ISpecialized[]>) => (this.specializeds = res.body || []));
    });
  }

  updateForm(educationProgram: IEducationProgram): void {
    this.editForm.patchValue({
      id: educationProgram.id,
      msct: educationProgram.msct,
      name: educationProgram.name,
      year: educationProgram.year,
      specialized: educationProgram.specialized,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const educationProgram = this.createFromForm();
    if (educationProgram.id !== undefined) {
      this.subscribeToSaveResponse(this.educationProgramService.update(educationProgram));
    } else {
      this.subscribeToSaveResponse(this.educationProgramService.create(educationProgram));
    }
  }

  private createFromForm(): IEducationProgram {
    return {
      ...new EducationProgram(),
      id: this.editForm.get(['id'])!.value,
      msct: this.editForm.get(['msct'])!.value,
      name: this.editForm.get(['name'])!.value,
      year: this.editForm.get(['year'])!.value,
      specialized: this.editForm.get(['specialized'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEducationProgram>>): void {
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

  trackById(index: number, item: ISpecialized): any {
    return item.id;
  }
}
