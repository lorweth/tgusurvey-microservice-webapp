import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SubjectConditionComponentsPage, SubjectConditionDeleteDialog, SubjectConditionUpdatePage } from './subject-condition.page-object';

const expect = chai.expect;

describe('SubjectCondition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectConditionComponentsPage: SubjectConditionComponentsPage;
  let subjectConditionUpdatePage: SubjectConditionUpdatePage;
  let subjectConditionDeleteDialog: SubjectConditionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SubjectConditions', async () => {
    await navBarPage.goToEntity('subject-condition');
    subjectConditionComponentsPage = new SubjectConditionComponentsPage();
    await browser.wait(ec.visibilityOf(subjectConditionComponentsPage.title), 5000);
    expect(await subjectConditionComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreSubjectCondition.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(subjectConditionComponentsPage.entities), ec.visibilityOf(subjectConditionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SubjectCondition page', async () => {
    await subjectConditionComponentsPage.clickOnCreateButton();
    subjectConditionUpdatePage = new SubjectConditionUpdatePage();
    expect(await subjectConditionUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreSubjectCondition.home.createOrEditLabel');
    await subjectConditionUpdatePage.cancel();
  });

  it('should create and save SubjectConditions', async () => {
    const nbButtonsBeforeCreate = await subjectConditionComponentsPage.countDeleteButtons();

    await subjectConditionComponentsPage.clickOnCreateButton();

    await promise.all([
      subjectConditionUpdatePage.constraintSelectLastOption(),
      subjectConditionUpdatePage.subjectSelectLastOption(),
      subjectConditionUpdatePage.beforeSubjectSelectLastOption(),
    ]);

    await subjectConditionUpdatePage.save();
    expect(await subjectConditionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subjectConditionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SubjectCondition', async () => {
    const nbButtonsBeforeDelete = await subjectConditionComponentsPage.countDeleteButtons();
    await subjectConditionComponentsPage.clickOnLastDeleteButton();

    subjectConditionDeleteDialog = new SubjectConditionDeleteDialog();
    expect(await subjectConditionDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreSubjectCondition.delete.question');
    await subjectConditionDeleteDialog.clickOnConfirmButton();

    expect(await subjectConditionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
