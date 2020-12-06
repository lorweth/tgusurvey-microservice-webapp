import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { EnterpriseComponentsPage, EnterpriseDeleteDialog, EnterpriseUpdatePage } from './enterprise.page-object';

const expect = chai.expect;

describe('Enterprise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enterpriseComponentsPage: EnterpriseComponentsPage;
  let enterpriseUpdatePage: EnterpriseUpdatePage;
  let enterpriseDeleteDialog: EnterpriseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Enterprises', async () => {
    await navBarPage.goToEntity('enterprise');
    enterpriseComponentsPage = new EnterpriseComponentsPage();
    await browser.wait(ec.visibilityOf(enterpriseComponentsPage.title), 5000);
    expect(await enterpriseComponentsPage.getTitle()).to.eq('tgusurveyApp.userinfoEnterprise.home.title');
    await browser.wait(ec.or(ec.visibilityOf(enterpriseComponentsPage.entities), ec.visibilityOf(enterpriseComponentsPage.noResult)), 1000);
  });

  it('should load create Enterprise page', async () => {
    await enterpriseComponentsPage.clickOnCreateButton();
    enterpriseUpdatePage = new EnterpriseUpdatePage();
    expect(await enterpriseUpdatePage.getPageTitle()).to.eq('tgusurveyApp.userinfoEnterprise.home.createOrEditLabel');
    await enterpriseUpdatePage.cancel();
  });

  it('should create and save Enterprises', async () => {
    const nbButtonsBeforeCreate = await enterpriseComponentsPage.countDeleteButtons();

    await enterpriseComponentsPage.clickOnCreateButton();

    await promise.all([
      enterpriseUpdatePage.setNameInput('name'),
      enterpriseUpdatePage.setAddressInput('address'),
      enterpriseUpdatePage.setPhoneNumberInput('phoneNumber'),
      enterpriseUpdatePage.setRepresentativeInput('representative'),
      enterpriseUpdatePage.setLineOfBussinessInput('lineOfBussiness'),
      enterpriseUpdatePage.userSelectLastOption(),
    ]);

    expect(await enterpriseUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await enterpriseUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await enterpriseUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await enterpriseUpdatePage.getRepresentativeInput()).to.eq(
      'representative',
      'Expected Representative value to be equals to representative'
    );
    expect(await enterpriseUpdatePage.getLineOfBussinessInput()).to.eq(
      'lineOfBussiness',
      'Expected LineOfBussiness value to be equals to lineOfBussiness'
    );

    await enterpriseUpdatePage.save();
    expect(await enterpriseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await enterpriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Enterprise', async () => {
    const nbButtonsBeforeDelete = await enterpriseComponentsPage.countDeleteButtons();
    await enterpriseComponentsPage.clickOnLastDeleteButton();

    enterpriseDeleteDialog = new EnterpriseDeleteDialog();
    expect(await enterpriseDeleteDialog.getDialogTitle()).to.eq('tgusurveyApp.userinfoEnterprise.delete.question');
    await enterpriseDeleteDialog.clickOnConfirmButton();

    expect(await enterpriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
