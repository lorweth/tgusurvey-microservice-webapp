import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SpecializedComponentsPage, SpecializedDeleteDialog, SpecializedUpdatePage } from './specialized.page-object';

const expect = chai.expect;

describe('Specialized e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let specializedComponentsPage: SpecializedComponentsPage;
  let specializedUpdatePage: SpecializedUpdatePage;
  let specializedDeleteDialog: SpecializedDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Specializeds', async () => {
    await navBarPage.goToEntity('specialized');
    specializedComponentsPage = new SpecializedComponentsPage();
    await browser.wait(ec.visibilityOf(specializedComponentsPage.title), 5000);
    expect(await specializedComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreSpecialized.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(specializedComponentsPage.entities), ec.visibilityOf(specializedComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Specialized page', async () => {
    await specializedComponentsPage.clickOnCreateButton();
    specializedUpdatePage = new SpecializedUpdatePage();
    expect(await specializedUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreSpecialized.home.createOrEditLabel');
    await specializedUpdatePage.cancel();
  });

  it('should create and save Specializeds', async () => {
    const nbButtonsBeforeCreate = await specializedComponentsPage.countDeleteButtons();

    await specializedComponentsPage.clickOnCreateButton();

    await promise.all([specializedUpdatePage.setMscnInput('mscn'), specializedUpdatePage.setNameInput('name')]);

    expect(await specializedUpdatePage.getMscnInput()).to.eq('mscn', 'Expected Mscn value to be equals to mscn');
    expect(await specializedUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await specializedUpdatePage.save();
    expect(await specializedUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await specializedComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Specialized', async () => {
    const nbButtonsBeforeDelete = await specializedComponentsPage.countDeleteButtons();
    await specializedComponentsPage.clickOnLastDeleteButton();

    specializedDeleteDialog = new SpecializedDeleteDialog();
    expect(await specializedDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreSpecialized.delete.question');
    await specializedDeleteDialog.clickOnConfirmButton();

    expect(await specializedComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
