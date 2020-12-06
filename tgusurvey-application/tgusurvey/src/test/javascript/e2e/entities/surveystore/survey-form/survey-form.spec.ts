import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SurveyFormComponentsPage, SurveyFormDeleteDialog, SurveyFormUpdatePage } from './survey-form.page-object';

const expect = chai.expect;

describe('SurveyForm e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let surveyFormComponentsPage: SurveyFormComponentsPage;
  let surveyFormUpdatePage: SurveyFormUpdatePage;
  let surveyFormDeleteDialog: SurveyFormDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SurveyForms', async () => {
    await navBarPage.goToEntity('survey-form');
    surveyFormComponentsPage = new SurveyFormComponentsPage();
    await browser.wait(ec.visibilityOf(surveyFormComponentsPage.title), 5000);
    expect(await surveyFormComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreSurveyForm.home.title');
    await browser.wait(ec.or(ec.visibilityOf(surveyFormComponentsPage.entities), ec.visibilityOf(surveyFormComponentsPage.noResult)), 1000);
  });

  it('should load create SurveyForm page', async () => {
    await surveyFormComponentsPage.clickOnCreateButton();
    surveyFormUpdatePage = new SurveyFormUpdatePage();
    expect(await surveyFormUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreSurveyForm.home.createOrEditLabel');
    await surveyFormUpdatePage.cancel();
  });

  it('should create and save SurveyForms', async () => {
    const nbButtonsBeforeCreate = await surveyFormComponentsPage.countDeleteButtons();

    await surveyFormComponentsPage.clickOnCreateButton();

    await promise.all([
      surveyFormUpdatePage.setNameInput('name'),
      surveyFormUpdatePage.setNoteInput('note'),
      surveyFormUpdatePage.programSelectLastOption(),
    ]);

    expect(await surveyFormUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await surveyFormUpdatePage.getNoteInput()).to.eq('note', 'Expected Note value to be equals to note');

    await surveyFormUpdatePage.save();
    expect(await surveyFormUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await surveyFormComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SurveyForm', async () => {
    const nbButtonsBeforeDelete = await surveyFormComponentsPage.countDeleteButtons();
    await surveyFormComponentsPage.clickOnLastDeleteButton();

    surveyFormDeleteDialog = new SurveyFormDeleteDialog();
    expect(await surveyFormDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreSurveyForm.delete.question');
    await surveyFormDeleteDialog.clickOnConfirmButton();

    expect(await surveyFormComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
