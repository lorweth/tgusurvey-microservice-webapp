import { element, by, ElementFinder } from 'protractor';

export class SurveyFormComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-survey-form div table .btn-danger'));
  title = element.all(by.css('jhi-survey-form div h2#page-heading span')).first();
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

export class SurveyFormUpdatePage {
  pageTitle = element(by.id('jhi-survey-form-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  noteInput = element(by.id('field_note'));

  programSelect = element(by.id('field_program'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
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

export class SurveyFormDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-surveyForm-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-surveyForm'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
