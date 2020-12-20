import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStudents, Students } from 'app/shared/model/userinfo/students.model';
import { StudentsService } from './students.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IClassroom } from 'app/shared/model/userinfo/classroom.model';
import { ClassroomService } from 'app/entities/userinfo/classroom/classroom.service';

type SelectableEntity = IUser | IClassroom;

@Component({
  selector: 'jhi-students-update',
  templateUrl: './students-update.component.html',
})
export class StudentsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser | null = null;
  classrooms: IClassroom[] = [];
  birthDayDp: any;

  editForm = this.fb.group({
    id: [],
    mssv: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    birthDay: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    cmnd: [null, [Validators.required, Validators.maxLength(9)]],
    phoneNumber: [null, [Validators.required, Validators.maxLength(10)]],
    graduationStatus: [null, [Validators.required]],
    user: [],
    classroom: [],
  });

  constructor(
    protected studentsService: StudentsService,
    protected userService: UserService,
    protected classroomService: ClassroomService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ students }) => {
      this.updateForm(students);

      this.userService.getCurrentUser().subscribe((res: HttpResponse<IUser>) => (this.users = res.body || null));

      this.classroomService.query().subscribe((res: HttpResponse<IClassroom[]>) => (this.classrooms = res.body || []));
    });
  }

  updateForm(students: IStudents): void {
    this.editForm.patchValue({
      id: students.id,
      mssv: students.mssv,
      birthDay: students.birthDay,
      gender: students.gender,
      cmnd: students.cmnd,
      phoneNumber: students.phoneNumber,
      graduationStatus: students.graduationStatus,
      user: students.user,
      classroom: students.classroom,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const students = this.createFromForm();
    if (students.id !== undefined) {
      this.subscribeToSaveResponse(this.studentsService.update(students));
    } else {
      this.subscribeToSaveResponse(this.studentsService.create(students));
    }
  }

  private createFromForm(): IStudents {
    return {
      ...new Students(),
      id: this.editForm.get(['id'])!.value,
      mssv: this.editForm.get(['mssv'])!.value,
      birthDay: this.editForm.get(['birthDay'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      cmnd: this.editForm.get(['cmnd'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      graduationStatus: this.editForm.get(['graduationStatus'])!.value,
      // eslint-disable-next-line
      //user: this.editForm.get(['user'])!.value,
      user: this.users || undefined,
      classroom: this.editForm.get(['classroom'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudents>>): void {
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
