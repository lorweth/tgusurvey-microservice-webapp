import { Component, OnInit } from '@angular/core';
import { IStudents } from 'app/shared/model/userinfo/students.model';
import { StudentsService } from 'app/entities/userinfo/students/students.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
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
