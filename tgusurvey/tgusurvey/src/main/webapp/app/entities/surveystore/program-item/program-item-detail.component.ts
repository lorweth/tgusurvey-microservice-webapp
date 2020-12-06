import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';

@Component({
  selector: 'jhi-program-item-detail',
  templateUrl: './program-item-detail.component.html',
})
export class ProgramItemDetailComponent implements OnInit {
  programItem: IProgramItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programItem }) => (this.programItem = programItem));
  }

  previousState(): void {
    window.history.back();
  }
}
