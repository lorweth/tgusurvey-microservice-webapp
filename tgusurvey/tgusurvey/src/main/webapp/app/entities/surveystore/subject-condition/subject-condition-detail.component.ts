import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';

@Component({
  selector: 'jhi-subject-condition-detail',
  templateUrl: './subject-condition-detail.component.html',
})
export class SubjectConditionDetailComponent implements OnInit {
  subjectCondition: ISubjectCondition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subjectCondition }) => (this.subjectCondition = subjectCondition));
  }

  previousState(): void {
    window.history.back();
  }
}
