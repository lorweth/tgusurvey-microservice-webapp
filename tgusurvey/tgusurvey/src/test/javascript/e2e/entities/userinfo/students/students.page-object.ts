import { element, by, ElementFinder } from 'protractor';

export class StudentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-students div table .btn-danger'));
  title = element.all(by.css('jhi-students div h2#page-heading span')).first();
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

export class StudentsUpdatePage {
  pageTitle = element(by.id('jhi-students-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  mssvInput = element(by.id('field_mssv'));
  birthDayInput = element(by.id('field_birthDay'));
  genderSelect = element(by.id('field_gender'));
  cmndInput = element(by.id('field_cmnd'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  graduationStatusSelect = element(by.id('field_graduationStatus'));

  userSelect = element(by.id('field_user'));
  classroomSelect = element(by.id('field_classroom'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMssvInput(mssv: string): Promise<void> {
    await this.mssvInput.sendKeys(mssv);
  }

  async getMssvInput(): Promise<string> {
    return await this.mssvInput.getAttribute('value');
  }

  async setBirthDayInput(birthDay: string): Promise<void> {
    await this.birthDayInput.sendKeys(birthDay);
  }

  async getBirthDayInput(): Promise<string> {
    return await this.birthDayInput.getAttribute('value');
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

  async setGraduationStatusSelect(graduationStatus: string): Promise<void> {
    await this.graduationStatusSelect.sendKeys(graduationStatus);
  }

  async getGraduationStatusSelect(): Promise<string> {
    return await this.graduationStatusSelect.element(by.css('option:checked')).getText();
  }

  async graduationStatusSelectLastOption(): Promise<void> {
    await this.graduationStatusSelect.all(by.tagName('option')).last().click();
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

  async classroomSelectLastOption(): Promise<void> {
    await this.classroomSelect.all(by.tagName('option')).last().click();
  }

  async classroomSelectOption(option: string): Promise<void> {
    await this.classroomSelect.sendKeys(option);
  }

  getClassroomSelect(): ElementFinder {
    return this.classroomSelect;
  }

  async getClassroomSelectedOption(): Promise<string> {
    return await this.classroomSelect.element(by.css('option:checked')).getText();
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

export class StudentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-students-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-students'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
