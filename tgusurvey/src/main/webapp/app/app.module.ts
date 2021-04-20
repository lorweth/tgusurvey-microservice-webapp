import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TgusurveySharedModule } from 'app/shared/shared.module';
import { TgusurveyCoreModule } from 'app/core/core.module';
import { TgusurveyAppRoutingModule } from './app-routing.module';
import { TgusurveyHomeModule } from './home/home.module';
import { TgusurveyEntityModule } from './entities/entity.module';
// thêm module của component
import { TgusurveyComponentModule } from './components/component.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TgusurveySharedModule,
    TgusurveyCoreModule,
    TgusurveyHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TgusurveyEntityModule,
    TgusurveyComponentModule,
    TgusurveyAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class TgusurveyAppModule {}
