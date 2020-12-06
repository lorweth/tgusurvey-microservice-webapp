import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EducationProgramComponentsPage, EducationProgramDeleteDialog, EducationProgramUpdatePage } from './education-program.page-object';

const expect = chai.expect;

describe('EducationProgram e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let educationProgramComponentsPage: EducationProgramComponentsPage;
  let educationProgramUpdatePage: EducationProgramUpdatePage;
  let educationProgramDeleteDialog: EducationProgramDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EducationPrograms', async () => {
    await navBarPage.goToEntity('education-program');
    educationProgramComponentsPage = new EducationProgramComponentsPage();
    await browser.wait(ec.visibilityOf(educationProgramComponentsPage.title), 5000);
    expect(await educationProgramComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreEducationProgram.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(educationProgramComponentsPage.entities), ec.visibilityOf(educationProgramComponentsPage.noResult)),
      1000
    );
  });

  it('should load create EducationProgram page', async () => {
    await educationProgramComponentsPage.clickOnCreateButton();
    educationProgramUpdatePage = new EducationProgramUpdatePage();
    expect(await educationProgramUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreEducationProgram.home.createOrEditLabel');
    await educationProgramUpdatePage.cancel();
  });

  it('should create and save EducationPrograms', async () => {
    const nbButtonsBeforeCreate = await educationProgramComponentsPage.countDeleteButtons();

    await educationProgramComponentsPage.clickOnCreateButton();

    await promise.all([
      educationProgramUpdatePage.setMsctInput('msct'),
      educationProgramUpdatePage.setNameInput('name'),
      educationProgramUpdatePage.setYearInput('2000-12-31'),
      educationProgramUpdatePage.specializedSelectLastOption(),
    ]);

    expect(await educationProgramUpdatePage.getMsctInput()).to.eq('msct', 'Expected Msct value to be equals to msct');
    expect(await educationProgramUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await educationProgramUpdatePage.getYearInput()).to.eq('2000-12-31', 'Expected year value to be equals to 2000-12-31');

    await educationProgramUpdatePage.save();
    expect(await educationProgramUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await educationProgramComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EducationProgram', async () => {
    const nbButtonsBeforeDelete = await educationProgramComponentsPage.countDeleteButtons();
    await educationProgramComponentsPage.clickOnLastDeleteButton();

    educationProgramDeleteDialog = new EducationProgramDeleteDialog();
    expect(await educationProgramDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreEducationProgram.delete.question');
    await educationProgramDeleteDialog.clickOnConfirmButton();

    expect(await educationProgramComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
