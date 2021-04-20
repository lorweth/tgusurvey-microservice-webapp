import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LecturerComponentsPage, LecturerDeleteDialog, LecturerUpdatePage } from './lecturer.page-object';

const expect = chai.expect;

describe('Lecturer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lecturerComponentsPage: LecturerComponentsPage;
  let lecturerUpdatePage: LecturerUpdatePage;
  let lecturerDeleteDialog: LecturerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Lecturers', async () => {
    await navBarPage.goToEntity('lecturer');
    lecturerComponentsPage = new LecturerComponentsPage();
    await browser.wait(ec.visibilityOf(lecturerComponentsPage.title), 5000);
    expect(await lecturerComponentsPage.getTitle()).to.eq('tgusurveyApp.userinfoLecturer.home.title');
    await browser.wait(ec.or(ec.visibilityOf(lecturerComponentsPage.entities), ec.visibilityOf(lecturerComponentsPage.noResult)), 1000);
  });

  it('should load create Lecturer page', async () => {
    await lecturerComponentsPage.clickOnCreateButton();
    lecturerUpdatePage = new LecturerUpdatePage();
    expect(await lecturerUpdatePage.getPageTitle()).to.eq('tgusurveyApp.userinfoLecturer.home.createOrEditLabel');
    await lecturerUpdatePage.cancel();
  });

  it('should create and save Lecturers', async () => {
    const nbButtonsBeforeCreate = await lecturerComponentsPage.countDeleteButtons();

    await lecturerComponentsPage.clickOnCreateButton();

    await promise.all([
      lecturerUpdatePage.setMsgvInput('msgv'),
      lecturerUpdatePage.setBirthDayInput('2000-12-31'),
      lecturerUpdatePage.setAddressInput('address'),
      lecturerUpdatePage.genderSelectLastOption(),
      lecturerUpdatePage.setCmndInput('cmnd'),
      lecturerUpdatePage.setPhoneNumberInput('phoneNumber'),
      lecturerUpdatePage.userSelectLastOption(),
      lecturerUpdatePage.positionSelectLastOption(),
      lecturerUpdatePage.unitSelectLastOption(),
    ]);

    expect(await lecturerUpdatePage.getMsgvInput()).to.eq('msgv', 'Expected Msgv value to be equals to msgv');
    expect(await lecturerUpdatePage.getBirthDayInput()).to.eq('2000-12-31', 'Expected birthDay value to be equals to 2000-12-31');
    expect(await lecturerUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await lecturerUpdatePage.getCmndInput()).to.eq('cmnd', 'Expected Cmnd value to be equals to cmnd');
    expect(await lecturerUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');

    await lecturerUpdatePage.save();
    expect(await lecturerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await lecturerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Lecturer', async () => {
    const nbButtonsBeforeDelete = await lecturerComponentsPage.countDeleteButtons();
    await lecturerComponentsPage.clickOnLastDeleteButton();

    lecturerDeleteDialog = new LecturerDeleteDialog();
    expect(await lecturerDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.userinfoLecturer.delete.question');
    await lecturerDeleteDialog.clickOnConfirmButton();

    expect(await lecturerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
