import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IStudents } from 'app/shared/model/userinfo/students.model';

import { StudentsService } from 'app/entities/userinfo/students/students.service';
@Component({
  selector: 'jhi-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  students: IStudents | null = null;

  constructor(protected studentsService: StudentsService) {}

  loadStudentProfile(): void {
    this.studentsService.getMyInfo().subscribe((res: HttpResponse<IStudents>) => (this.students = res.body || null));
  }

  ngOnInit(): void {
    this.loadStudentProfile();
  }

  previousState(): void {
    window.history.back();
  }
}
