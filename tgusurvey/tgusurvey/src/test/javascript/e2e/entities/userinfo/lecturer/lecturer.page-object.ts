import { element, by, ElementFinder } from 'protractor';

export class LecturerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-lecturer div table .btn-danger'));
  title = element.all(by.css('jhi-lecturer div h2#page-heading span')).first();
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

export class LecturerUpdatePage {
  pageTitle = element(by.id('jhi-lecturer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  msgvInput = element(by.id('field_msgv'));
  birthDayInput = element(by.id('field_birthDay'));
  addressInput = element(by.id('field_address'));
  genderSelect = element(by.id('field_gender'));
  cmndInput = element(by.id('field_cmnd'));
  phoneNumberInput = element(by.id('field_phoneNumber'));

  userSelect = element(by.id('field_user'));
  positionSelect = element(by.id('field_position'));
  unitSelect = element(by.id('field_unit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMsgvInput(msgv: string): Promise<void> {
    await this.msgvInput.sendKeys(msgv);
  }

  async getMsgvInput(): Promise<string> {
    return await this.msgvInput.getAttribute('value');
  }

  async setBirthDayInput(birthDay: string): Promise<void> {
    await this.birthDayInput.sendKeys(birthDay);
  }

  async getBirthDayInput(): Promise<string> {
    return await this.birthDayInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setGenderSelect(gender: string): Promise<void> {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect(): Promise<string> {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(): Promise<void> {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }

  async setCmndInput(cmnd: string): Promise<void> {
    await this.cmndInput.sendKeys(cmnd);
  }

  async getCmndInput(): Promise<string> {
    return await this.cmndInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
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

  async positionSelectLastOption(): Promise<void> {
    await this.positionSelect.all(by.tagName('option')).last().click();
  }

  async positionSelectOption(option: string): Promise<void> {
    await this.positionSelect.sendKeys(option);
  }

  getPositionSelect(): ElementFinder {
    return this.positionSelect;
  }

  async getPositionSelectedOption(): Promise<string> {
    return await this.positionSelect.element(by.css('option:checked')).getText();
  }

  async unitSelectLastOption(): Promise<void> {
    await this.unitSelect.all(by.tagName('option')).last().click();
  }

  async unitSelectOption(option: string): Promise<void> {
    await this.unitSelect.sendKeys(option);
  }

  getUnitSelect(): ElementFinder {
    return this.unitSelect;
  }

  async getUnitSelectedOption(): Promise<string> {
    return await this.unitSelect.element(by.css('option:checked')).getText();
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

export class LecturerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-lecturer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-lecturer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
