import { element, by, ElementFinder } from 'protractor';

export class EnterpriseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-enterprise div table .btn-danger'));
  title = element.all(by.css('jhi-enterprise div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EnterpriseUpdatePage {
  pageTitle = element(by.id('jhi-enterprise-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  addressInput = element(by.id('field_address'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  representativeInput = element(by.id('field_representative'));
  lineOfBussinessInput = element(by.id('field_lineOfBussiness'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setRepresentativeInput(representative: string): Promise<void> {
    await this.representativeInput.sendKeys(representative);
  }

  async getRepresentativeInput(): Promise<string> {
    return await this.representativeInput.getAttribute('value');
  }

  async setLineOfBussinessInput(lineOfBussiness: string): Promise<void> {
    await this.lineOfBussinessInput.sendKeys(lineOfBussiness);
  }

  async getLineOfBussinessInput(): Promise<string> {
    return await this.lineOfBussinessInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EnterpriseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-enterprise-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-enterprise'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
