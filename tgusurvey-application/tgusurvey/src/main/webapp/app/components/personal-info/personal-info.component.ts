import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IStudents } from 'app/shared/model/userinfo/students.model';
import { IEnterprise } from 'app/shared/model/userinfo/enterprise.model';
import { ILecturer } from 'app/shared/model/userinfo/lecturer.model';

import { StudentsService } from 'app/entities/userinfo/students/students.service';
import { LecturerService } from 'app/entities/userinfo/lecturer/lecturer.service';
import { EnterpriseService } from 'app/entities/userinfo/enterprise/enterprise.service';

@Component({
  selector: 'jhi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  students: IStudents | null = null;
  lecturer: ILecturer | null = null;
  enterprise: IEnterprise | null = null;

  constructor(
    protected studentsService: StudentsService,
    protected lecturersService: LecturerService,
    protected enterpriseService: EnterpriseService
  ) {}

  loadStudentProfile(): void {
    this.studentsService.getMyInfo().subscribe((res: HttpResponse<IStudents>) => (this.students = res.body || null));
  }

  loadLecturerProfile(): void {
    this.lecturersService.getMyInfo().subscribe((res: HttpResponse<ILecturer>) => (this.lecturer = res.body || null));
  }

  loadEnterpriseProfile(): void {
    this.enterpriseService.getMyInfo().subscribe((res: HttpResponse<IEnterprise>) => (this.enterprise = res.body || null));
  }

  ngOnInit(): void {
    this.loadStudentProfile();
    this.loadEnterpriseProfile();
    this.loadLecturerProfile();
  }

  previousState(): void {
    window.history.back();
  }
}
