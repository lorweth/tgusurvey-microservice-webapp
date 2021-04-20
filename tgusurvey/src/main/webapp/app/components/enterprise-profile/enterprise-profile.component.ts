import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IEnterprise } from 'app/shared/model/userinfo/enterprise.model';

import { EnterpriseService } from 'app/entities/userinfo/enterprise/enterprise.service';

@Component({
  selector: 'jhi-enterprise-profile',
  templateUrl: './enterprise-profile.component.html',
  styleUrls: ['./enterprise-profile.component.scss'],
})
export class EnterpriseProfileComponent implements OnInit {
  enterprise: IEnterprise | null = null;

  constructor(protected enterpriseService: EnterpriseService) {}

  loadEnterpriseProfile(): void {
    this.enterpriseService.getMyInfo().subscribe((res: HttpResponse<IEnterprise>) => (this.enterprise = res.body || null));
  }

  ngOnInit(): void {
    this.loadEnterpriseProfile();
  }

  previousState(): void {
    window.history.back();
  }
}
