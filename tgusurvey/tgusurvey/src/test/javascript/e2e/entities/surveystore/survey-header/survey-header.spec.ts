import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SurveyHeaderComponentsPage, SurveyHeaderDeleteDialog, SurveyHeaderUpdatePage } from './survey-header.page-object';

const expect = chai.expect;

describe('SurveyHeader e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let surveyHeaderComponentsPage: SurveyHeaderComponentsPage;
  let surveyHeaderUpdatePage: SurveyHeaderUpdatePage;
  let surveyHeaderDeleteDialog: SurveyHeaderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SurveyHeaders', async () => {
    await navBarPage.goToEntity('survey-header');
    surveyHeaderComponentsPage = new SurveyHeaderComponentsPage();
    await browser.wait(ec.visibilityOf(surveyHeaderComponentsPage.title), 5000);
    expect(await surveyHeaderComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreSurveyHeader.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(surveyHeaderComponentsPage.entities), ec.visibilityOf(surveyHeaderComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SurveyHeader page', async () => {
    await surveyHeaderComponentsPage.clickOnCreateButton();
    surveyHeaderUpdatePage = new SurveyHeaderUpdatePage();
    expect(await surveyHeaderUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreSurveyHeader.home.createOrEditLabel');
    await surveyHeaderUpdatePage.cancel();
  });

  it('should create and save SurveyHeaders', async () => {
    const nbButtonsBeforeCreate = await surveyHeaderComponentsPage.countDeleteButtons();

    await surveyHeaderComponentsPage.clickOnCreateButton();

    await promise.all([
      surveyHeaderUpdatePage.setSttInput('5'),
      surveyHeaderUpdatePage.setTitleInput('title'),
      surveyHeaderUpdatePage.surveyFormSelectLastOption(),
    ]);

    expect(await surveyHeaderUpdatePage.getSttInput()).to.eq('5', 'Expected stt value to be equals to 5');
    expect(await surveyHeaderUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');

    await surveyHeaderUpdatePage.save();
    expect(await surveyHeaderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await surveyHeaderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SurveyHeader', async () => {
    const nbButtonsBeforeDelete = await surveyHeaderComponentsPage.countDeleteButtons();
    await surveyHeaderComponentsPage.clickOnLastDeleteButton();

    surveyHeaderDeleteDialog = new SurveyHeaderDeleteDialog();
    expect(await surveyHeaderDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreSurveyHeader.delete.question');
    await surveyHeaderDeleteDialog.clickOnConfirmButton();

    expect(await surveyHeaderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
