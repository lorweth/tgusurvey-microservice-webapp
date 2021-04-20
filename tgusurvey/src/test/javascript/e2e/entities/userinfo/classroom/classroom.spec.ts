import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ClassroomComponentsPage, ClassroomDeleteDialog, ClassroomUpdatePage } from './classroom.page-object';

const expect = chai.expect;

describe('Classroom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let classroomComponentsPage: ClassroomComponentsPage;
  let classroomUpdatePage: ClassroomUpdatePage;
  let classroomDeleteDialog: ClassroomDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Classrooms', async () => {
    await navBarPage.goToEntity('classroom');
    classroomComponentsPage = new ClassroomComponentsPage();
    await browser.wait(ec.visibilityOf(classroomComponentsPage.title), 5000);
    expect(await classroomComponentsPage.getTitle()).to.eq('tgusurveyApp.userinfoClassroom.home.title');
    await browser.wait(ec.or(ec.visibilityOf(classroomComponentsPage.entities), ec.visibilityOf(classroomComponentsPage.noResult)), 1000);
  });

  it('should load create Classroom page', async () => {
    await classroomComponentsPage.clickOnCreateButton();
    classroomUpdatePage = new ClassroomUpdatePage();
    expect(await classroomUpdatePage.getPageTitle()).to.eq('tgusurveyApp.userinfoClassroom.home.createOrEditLabel');
    await classroomUpdatePage.cancel();
  });

  it('should create and save Classrooms', async () => {
    const nbButtonsBeforeCreate = await classroomComponentsPage.countDeleteButtons();

    await classroomComponentsPage.clickOnCreateButton();

    await promise.all([classroomUpdatePage.setMslhInput('mslh'), classroomUpdatePage.setNameInput('name')]);

    expect(await classroomUpdatePage.getMslhInput()).to.eq('mslh', 'Expected Mslh value to be equals to mslh');
    expect(await classroomUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await classroomUpdatePage.save();
    expect(await classroomUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await classroomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Classroom', async () => {
    const nbButtonsBeforeDelete = await classroomComponentsPage.countDeleteButtons();
    await classroomComponentsPage.clickOnLastDeleteButton();

    classroomDeleteDialog = new ClassroomDeleteDialog();
    expect(await classroomDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.userinfoClassroom.delete.question');
    await classroomDeleteDialog.clickOnConfirmButton();

    expect(await classroomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
