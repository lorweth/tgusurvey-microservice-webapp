import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SubjectComponentsPage, SubjectDeleteDialog, SubjectUpdatePage } from './subject.page-object';

const expect = chai.expect;

describe('Subject e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectComponentsPage: SubjectComponentsPage;
  let subjectUpdatePage: SubjectUpdatePage;
  let subjectDeleteDialog: SubjectDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Subjects', async () => {
    await navBarPage.goToEntity('subject');
    subjectComponentsPage = new SubjectComponentsPage();
    await browser.wait(ec.visibilityOf(subjectComponentsPage.title), 5000);
    expect(await subjectComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreSubject.home.title');
    await browser.wait(ec.or(ec.visibilityOf(subjectComponentsPage.entities), ec.visibilityOf(subjectComponentsPage.noResult)), 1000);
  });

  it('should load create Subject page', async () => {
    await subjectComponentsPage.clickOnCreateButton();
    subjectUpdatePage = new SubjectUpdatePage();
    expect(await subjectUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreSubject.home.createOrEditLabel');
    await subjectUpdatePage.cancel();
  });

  it('should create and save Subjects', async () => {
    const nbButtonsBeforeCreate = await subjectComponentsPage.countDeleteButtons();

    await subjectComponentsPage.clickOnCreateButton();

    await promise.all([
      subjectUpdatePage.setMsmhInput('msmh'),
      subjectUpdatePage.setNameInput('name'),
      subjectUpdatePage.setNumOfCreditInput('5'),
      subjectUpdatePage.setTheoryLessonInput('5'),
      subjectUpdatePage.setPracticeLessonInput('5'),
    ]);

    expect(await subjectUpdatePage.getMsmhInput()).to.eq('msmh', 'Expected Msmh value to be equals to msmh');
    expect(await subjectUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await subjectUpdatePage.getNumOfCreditInput()).to.eq('5', 'Expected numOfCredit value to be equals to 5');
    expect(await subjectUpdatePage.getTheoryLessonInput()).to.eq('5', 'Expected theoryLesson value to be equals to 5');
    expect(await subjectUpdatePage.getPracticeLessonInput()).to.eq('5', 'Expected practiceLesson value to be equals to 5');

    await subjectUpdatePage.save();
    expect(await subjectUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Subject', async () => {
    const nbButtonsBeforeDelete = await subjectComponentsPage.countDeleteButtons();
    await subjectComponentsPage.clickOnLastDeleteButton();

    subjectDeleteDialog = new SubjectDeleteDialog();
    expect(await subjectDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreSubject.delete.question');
    await subjectDeleteDialog.clickOnConfirmButton();

    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
