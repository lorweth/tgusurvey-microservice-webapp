import { element, by, ElementFinder } from 'protractor';

export class EducationProgramComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-education-program div table .btn-danger'));
  title = element.all(by.css('jhi-education-program div h2#page-heading span')).first();
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

export class EducationProgramUpdatePage {
  pageTitle = element(by.id('jhi-education-program-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  msctInput = element(by.id('field_msct'));
  nameInput = element(by.id('field_name'));
  yearInput = element(by.id('field_year'));

  specializedSelect = element(by.id('field_specialized'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMsctInput(msct: string): Promise<void> {
    await this.msctInput.sendKeys(msct);
  }

  async getMsctInput(): Promise<string> {
    return await this.msctInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setYearInput(year: string): Promise<void> {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput(): Promise<string> {
    return await this.yearInput.getAttribute('value');
  }

  async specializedSelectLastOption(): Promise<void> {
    await this.specializedSelect.all(by.tagName('option')).last().click();
  }

  async specializedSelectOption(option: string): Promise<void> {
    await this.specializedSelect.sendKeys(option);
  }

  getSpecializedSelect(): ElementFinder {
    return this.specializedSelect;
  }

  async getSpecializedSelectedOption(): Promise<string> {
    return await this.specializedSelect.element(by.css('option:checked')).getText();
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

export class EducationProgramDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-educationProgram-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-educationProgram'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
