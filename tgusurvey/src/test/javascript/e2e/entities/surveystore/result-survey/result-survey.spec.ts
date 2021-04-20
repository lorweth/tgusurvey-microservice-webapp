import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ResultSurveyComponentsPage, ResultSurveyDeleteDialog, ResultSurveyUpdatePage } from './result-survey.page-object';

const expect = chai.expect;

describe('ResultSurvey e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resultSurveyComponentsPage: ResultSurveyComponentsPage;
  let resultSurveyUpdatePage: ResultSurveyUpdatePage;
  let resultSurveyDeleteDialog: ResultSurveyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ResultSurveys', async () => {
    await navBarPage.goToEntity('result-survey');
    resultSurveyComponentsPage = new ResultSurveyComponentsPage();
    await browser.wait(ec.visibilityOf(resultSurveyComponentsPage.title), 5000);
    expect(await resultSurveyComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreResultSurvey.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(resultSurveyComponentsPage.entities), ec.visibilityOf(resultSurveyComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ResultSurvey page', async () => {
    await resultSurveyComponentsPage.clickOnCreateButton();
    resultSurveyUpdatePage = new ResultSurveyUpdatePage();
    expect(await resultSurveyUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreResultSurvey.home.createOrEditLabel');
    await resultSurveyUpdatePage.cancel();
  });

  it('should create and save ResultSurveys', async () => {
    const nbButtonsBeforeCreate = await resultSurveyComponentsPage.countDeleteButtons();

    await resultSurveyComponentsPage.clickOnCreateButton();

    await promise.all([
      resultSurveyUpdatePage.answerSelectLastOption(),
      resultSurveyUpdatePage.setCommentInput('comment'),
      resultSurveyUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      resultSurveyUpdatePage.userSelectLastOption(),
      resultSurveyUpdatePage.questionSelectLastOption(),
    ]);

    expect(await resultSurveyUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
    expect(await resultSurveyUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');

    await resultSurveyUpdatePage.save();
    expect(await resultSurveyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await resultSurveyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ResultSurvey', async () => {
    const nbButtonsBeforeDelete = await resultSurveyComponentsPage.countDeleteButtons();
    await resultSurveyComponentsPage.clickOnLastDeleteButton();

    resultSurveyDeleteDialog = new ResultSurveyDeleteDialog();
    expect(await resultSurveyDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreResultSurvey.delete.question');
    await resultSurveyDeleteDialog.clickOnConfirmButton();

    expect(await resultSurveyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
