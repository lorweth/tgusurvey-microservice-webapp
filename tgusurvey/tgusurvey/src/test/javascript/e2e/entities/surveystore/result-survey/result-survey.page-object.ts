import { element, by, ElementFinder } from 'protractor';

export class ResultSurveyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-result-survey div table .btn-danger'));
  title = element.all(by.css('jhi-result-survey div h2#page-heading span')).first();
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

export class ResultSurveyUpdatePage {
  pageTitle = element(by.id('jhi-result-survey-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  surveyDateInput = element(by.id('field_surveyDate'));
  answerSelect = element(by.id('field_answer'));

  questionSelect = element(by.id('field_question'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSurveyDateInput(surveyDate: string): Promise<void> {
    await this.surveyDateInput.sendKeys(surveyDate);
  }

  async getSurveyDateInput(): Promise<string> {
    return await this.surveyDateInput.getAttribute('value');
  }

  async setAnswerSelect(answer: string): Promise<void> {
    await this.answerSelect.sendKeys(answer);
  }

  async getAnswerSelect(): Promise<string> {
    return await this.answerSelect.element(by.css('option:checked')).getText();
  }

  async answerSelectLastOption(): Promise<void> {
    await this.answerSelect.all(by.tagName('option')).last().click();
  }

  async questionSelectLastOption(): Promise<void> {
    await this.questionSelect.all(by.tagName('option')).last().click();
  }

  async questionSelectOption(option: string): Promise<void> {
    await this.questionSelect.sendKeys(option);
  }

  getQuestionSelect(): ElementFinder {
    return this.questionSelect;
  }

  async getQuestionSelectedOption(): Promise<string> {
    return await this.questionSelect.element(by.css('option:checked')).getText();
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

export class ResultSurveyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resultSurvey-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resultSurvey'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
