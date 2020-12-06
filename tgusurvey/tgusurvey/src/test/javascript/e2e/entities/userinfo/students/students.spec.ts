import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { StudentsComponentsPage, StudentsDeleteDialog, StudentsUpdatePage } from './students.page-object';

const expect = chai.expect;

describe('Students e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentsComponentsPage: StudentsComponentsPage;
  let studentsUpdatePage: StudentsUpdatePage;
  let studentsDeleteDialog: StudentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Students', async () => {
    await navBarPage.goToEntity('students');
    studentsComponentsPage = new StudentsComponentsPage();
    await browser.wait(ec.visibilityOf(studentsComponentsPage.title), 5000);
    expect(await studentsComponentsPage.getTitle()).to.eq('tgusurveyApp.userinfoStudents.home.title');
    await browser.wait(ec.or(ec.visibilityOf(studentsComponentsPage.entities), ec.visibilityOf(studentsComponentsPage.noResult)), 1000);
  });

  it('should load create Students page', async () => {
    await studentsComponentsPage.clickOnCreateButton();
    studentsUpdatePage = new StudentsUpdatePage();
    expect(await studentsUpdatePage.getPageTitle()).to.eq('tgusurveyApp.userinfoStudents.home.createOrEditLabel');
    await studentsUpdatePage.cancel();
  });

  it('should create and save Students', async () => {
    const nbButtonsBeforeCreate = await studentsComponentsPage.countDeleteButtons();

    await studentsComponentsPage.clickOnCreateButton();

    await promise.all([
      studentsUpdatePage.setMssvInput('mssv'),
      studentsUpdatePage.setBirthDayInput('2000-12-31'),
      studentsUpdatePage.genderSelectLastOption(),
      studentsUpdatePage.setCmndInput('cmnd'),
      studentsUpdatePage.setPhoneNumberInput('phoneNumber'),
      studentsUpdatePage.graduationStatusSelectLastOption(),
      studentsUpdatePage.userSelectLastOption(),
      studentsUpdatePage.classroomSelectLastOption(),
    ]);

    expect(await studentsUpdatePage.getMssvInput()).to.eq('mssv', 'Expected Mssv value to be equals to mssv');
    expect(await studentsUpdatePage.getBirthDayInput()).to.eq('2000-12-31', 'Expected birthDay value to be equals to 2000-12-31');
    expect(await studentsUpdatePage.getCmndInput()).to.eq('cmnd', 'Expected Cmnd value to be equals to cmnd');
    expect(await studentsUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');

    await studentsUpdatePage.save();
    expect(await studentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await studentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Students', async () => {
    const nbButtonsBeforeDelete = await studentsComponentsPage.countDeleteButtons();
    await studentsComponentsPage.clickOnLastDeleteButton();

    studentsDeleteDialog = new StudentsDeleteDialog();
    expect(await studentsDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.userinfoStudents.delete.question');
    await studentsDeleteDialog.clickOnConfirmButton();

    expect(await studentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
