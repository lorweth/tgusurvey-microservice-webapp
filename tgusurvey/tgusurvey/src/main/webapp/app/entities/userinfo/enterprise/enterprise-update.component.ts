import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEnterprise, Enterprise } from 'app/shared/model/userinfo/enterprise.model';
import { EnterpriseService } from './enterprise.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-enterprise-update',
  templateUrl: './enterprise-update.component.html',
})
export class EnterpriseUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required, Validators.maxLength(10)]],
    representative: [null, [Validators.required]],
    lineOfBussiness: [null, [Validators.required]],
    user: [],
  });

  constructor(
    protected enterpriseService: EnterpriseService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enterprise }) => {
      this.updateForm(enterprise);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(enterprise: IEnterprise): void {
    this.editForm.patchValue({
      id: enterprise.id,
      name: enterprise.name,
      address: enterprise.address,
      phoneNumber: enterprise.phoneNumber,
      representative: enterprise.representative,
      lineOfBussiness: enterprise.lineOfBussiness,
      user: enterprise.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enterprise = this.createFromForm();
    if (enterprise.id !== undefined) {
      this.subscribeToSaveResponse(this.enterpriseService.update(enterprise));
    } else {
      this.subscribeToSaveResponse(this.enterpriseService.create(enterprise));
    }
  }

  private createFromForm(): IEnterprise {
    return {
      ...new Enterprise(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      representative: this.editForm.get(['representative'])!.value,
      lineOfBussiness: this.editForm.get(['lineOfBussiness'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnterprise>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
