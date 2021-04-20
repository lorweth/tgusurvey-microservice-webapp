import { element, by, ElementFinder } from 'protractor';

export class ProgramItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-program-item div table .btn-danger'));
  title = element.all(by.css('jhi-program-item div h2#page-heading span')).first();
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

export class ProgramItemUpdatePage {
  pageTitle = element(by.id('jhi-program-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  categorySelect = element(by.id('field_category'));

  programSelect = element(by.id('field_program'));
  subjectSelect = element(by.id('field_subject'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCategorySelect(category: string): Promise<void> {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect(): Promise<string> {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption(): Promise<void> {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }

  async programSelectLastOption(): Promise<void> {
    await this.programSelect.all(by.tagName('option')).last().click();
  }

  async programSelectOption(option: string): Promise<void> {
    await this.programSelect.sendKeys(option);
  }

  getProgramSelect(): ElementFinder {
    return this.programSelect;
  }

  async getProgramSelectedOption(): Promise<string> {
    return await this.programSelect.element(by.css('option:checked')).getText();
  }

  async subjectSelectLastOption(): Promise<void> {
    await this.subjectSelect.all(by.tagName('option')).last().click();
  }

  async subjectSelectOption(option: string): Promise<void> {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect(): ElementFinder {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption(): Promise<string> {
    return await this.subjectSelect.element(by.css('option:checked')).getText();
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

export class ProgramItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-programItem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-programItem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
