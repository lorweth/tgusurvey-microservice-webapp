import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';

@Component({
  selector: 'jhi-education-program-detail',
  templateUrl: './education-program-detail.component.html',
})
export class EducationProgramDetailComponent implements OnInit {
  educationProgram: IEducationProgram | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ educationProgram }) => (this.educationProgram = educationProgram));
  }

  previousState(): void {
    window.history.back();
  }
}
