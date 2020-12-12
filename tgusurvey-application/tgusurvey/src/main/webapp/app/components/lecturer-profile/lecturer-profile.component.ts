import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ILecturer } from 'app/shared/model/userinfo/lecturer.model';

import { LecturerService } from 'app/entities/userinfo/lecturer/lecturer.service';

@Component({
  selector: 'jhi-lecturer-profile',
  templateUrl: './lecturer-profile.component.html',
  styleUrls: ['./lecturer-profile.component.scss'],
})
export class LecturerProfileComponent implements OnInit {
  lecturer: ILecturer | null = null;

  constructor(protected lecturersService: LecturerService) {}

  loadLecturerProfile(): void {
    this.lecturersService.getMyInfo().subscribe((res: HttpResponse<ILecturer>) => (this.lecturer = res.body || null));
  }

  ngOnInit(): void {
    this.loadLecturerProfile();
  }

  previousState(): void {
    window.history.back();
  }
}
