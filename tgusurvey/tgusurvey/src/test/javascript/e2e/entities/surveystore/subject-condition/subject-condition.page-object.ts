import { element, by, ElementFinder } from 'protractor';

export class SubjectConditionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-subject-condition div table .btn-danger'));
  title = element.all(by.css('jhi-subject-condition div h2#page-heading span')).first();
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

export class SubjectConditionUpdatePage {
  pageTitle = element(by.id('jhi-subject-condition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  constraintSelect = element(by.id('field_constraint'));

  subjectSelect = element(by.id('field_subject'));
  beforeSubjectSelect = element(by.id('field_beforeSubject'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setConstraintSelect(constraint: string): Promise<void> {
    await this.constraintSelect.sendKeys(constraint);
  }

  async getConstraintSelect(): Promise<string> {
    return await this.constraintSelect.element(by.css('option:checked')).getText();
  }

  async constraintSelectLastOption(): Promise<void> {
    await this.constraintSelect.all(by.tagName('option')).last().click();
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

  async beforeSubjectSelectLastOption(): Promise<void> {
    await this.beforeSubjectSelect.all(by.tagName('option')).last().click();
  }

  async beforeSubjectSelectOption(option: string): Promise<void> {
    await this.beforeSubjectSelect.sendKeys(option);
  }

  getBeforeSubjectSelect(): ElementFinder {
    return this.beforeSubjectSelect;
  }

  async getBeforeSubjectSelectedOption(): Promise<string> {
    return await this.beforeSubjectSelect.element(by.css('option:checked')).getText();
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

export class SubjectConditionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-subjectCondition-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-subjectCondition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
