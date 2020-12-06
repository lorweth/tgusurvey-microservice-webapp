import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecialized } from 'app/shared/model/surveystore/specialized.model';

@Component({
  selector: 'jhi-specialized-detail',
  templateUrl: './specialized-detail.component.html',
})
export class SpecializedDetailComponent implements OnInit {
  specialized: ISpecialized | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specialized }) => (this.specialized = specialized));
  }

  previousState(): void {
    window.history.back();
  }
}
