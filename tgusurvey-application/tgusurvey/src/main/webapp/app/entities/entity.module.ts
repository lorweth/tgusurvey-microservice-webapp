import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'classroom',
        loadChildren: () => import('./userinfo/classroom/classroom.module').then(m => m.UserinfoClassroomModule),
      },
      {
        path: 'students',
        loadChildren: () => import('./userinfo/students/students.module').then(m => m.UserinfoStudentsModule),
      },
      {
        path: 'unit',
        loadChildren: () => import('./userinfo/unit/unit.module').then(m => m.UserinfoUnitModule),
      },
      {
        path: 'lecturer',
        loadChildren: () => import('./userinfo/lecturer/lecturer.module').then(m => m.UserinfoLecturerModule),
      },
      {
        path: 'position',
        loadChildren: () => import('./userinfo/position/position.module').then(m => m.UserinfoPositionModule),
      },
      {
        path: 'enterprise',
        loadChildren: () => import('./userinfo/enterprise/enterprise.module').then(m => m.UserinfoEnterpriseModule),
      },
      {
        path: 'specialized',
        loadChildren: () => import('./surveystore/specialized/specialized.module').then(m => m.SurveystoreSpecializedModule),
      },
      {
        path: 'education-program',
        loadChildren: () =>
          import('./surveystore/education-program/education-program.module').then(m => m.SurveystoreEducationProgramModule),
      },
      {
        path: 'subject',
        loadChildren: () => import('./surveystore/subject/subject.module').then(m => m.SurveystoreSubjectModule),
      },
      {
        path: 'result-survey',
        loadChildren: () => import('./surveystore/result-survey/result-survey.module').then(m => m.SurveystoreResultSurveyModule),
      },
      {
        path: 'survey-form',
        loadChildren: () => import('./surveystore/survey-form/survey-form.module').then(m => m.SurveystoreSurveyFormModule),
      },
      {
        path: 'survey-header',
        loadChildren: () => import('./surveystore/survey-header/survey-header.module').then(m => m.SurveystoreSurveyHeaderModule),
      },
      {
        path: 'section',
        loadChildren: () => import('./surveystore/section/section.module').then(m => m.SurveystoreSectionModule),
      },
      {
        path: 'question',
        loadChildren: () => import('./surveystore/question/question.module').then(m => m.SurveystoreQuestionModule),
      },
      {
        path: 'program-item',
        loadChildren: () => import('./surveystore/program-item/program-item.module').then(m => m.SurveystoreProgramItemModule),
      },
      {
        path: 'subject-condition',
        loadChildren: () =>
          import('./surveystore/subject-condition/subject-condition.module').then(m => m.SurveystoreSubjectConditionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TgusurveyEntityModule {}
