import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProgramItemComponentsPage, ProgramItemDeleteDialog, ProgramItemUpdatePage } from './program-item.page-object';

const expect = chai.expect;

describe('ProgramItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programItemComponentsPage: ProgramItemComponentsPage;
  let programItemUpdatePage: ProgramItemUpdatePage;
  let programItemDeleteDialog: ProgramItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProgramItems', async () => {
    await navBarPage.goToEntity('program-item');
    programItemComponentsPage = new ProgramItemComponentsPage();
    await browser.wait(ec.visibilityOf(programItemComponentsPage.title), 5000);
    expect(await programItemComponentsPage.getTitle()).to.eq('tgusurveyApp.surveystoreProgramItem.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(programItemComponentsPage.entities), ec.visibilityOf(programItemComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProgramItem page', async () => {
    await programItemComponentsPage.clickOnCreateButton();
    programItemUpdatePage = new ProgramItemUpdatePage();
    expect(await programItemUpdatePage.getPageTitle()).to.eq('tgusurveyApp.surveystoreProgramItem.home.createOrEditLabel');
    await programItemUpdatePage.cancel();
  });

  it('should create and save ProgramItems', async () => {
    const nbButtonsBeforeCreate = await programItemComponentsPage.countDeleteButtons();

    await programItemComponentsPage.clickOnCreateButton();

    await promise.all([
      programItemUpdatePage.categorySelectLastOption(),
      programItemUpdatePage.programSelectLastOption(),
      programItemUpdatePage.subjectSelectLastOption(),
    ]);

    await programItemUpdatePage.save();
    expect(await programItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await programItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProgramItem', async () => {
    const nbButtonsBeforeDelete = await programItemComponentsPage.countDeleteButtons();
    await programItemComponentsPage.clickOnLastDeleteButton();

    programItemDeleteDialog = new ProgramItemDeleteDialog();
    expect(await programItemDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.surveystoreProgramItem.delete.question');
    await programItemDeleteDialog.clickOnConfirmButton();

    expect(await programItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
