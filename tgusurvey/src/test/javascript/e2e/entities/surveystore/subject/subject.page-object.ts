import { element, by, ElementFinder } from 'protractor';

export class SubjectComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-subject div table .btn-danger'));
  title = element.all(by.css('jhi-subject div h2#page-heading span')).first();
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

export class SubjectUpdatePage {
  pageTitle = element(by.id('jhi-subject-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  msmhInput = element(by.id('field_msmh'));
  nameInput = element(by.id('field_name'));
  numOfCreditInput = element(by.id('field_numOfCredit'));
  theoryLessonInput = element(by.id('field_theoryLesson'));
  practiceLessonInput = element(by.id('field_practiceLesson'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMsmhInput(msmh: string): Promise<void> {
    await this.msmhInput.sendKeys(msmh);
  }

  async getMsmhInput(): Promise<string> {
    return await this.msmhInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setNumOfCreditInput(numOfCredit: string): Promise<void> {
    await this.numOfCreditInput.sendKeys(numOfCredit);
  }

  async getNumOfCreditInput(): Promise<string> {
    return await this.numOfCreditInput.getAttribute('value');
  }

  async setTheoryLessonInput(theoryLesson: string): Promise<void> {
    await this.theoryLessonInput.sendKeys(theoryLesson);
  }

  async getTheoryLessonInput(): Promise<string> {
    return await this.theoryLessonInput.getAttribute('value');
  }

  async setPracticeLessonInput(practiceLesson: string): Promise<void> {
    await this.practiceLessonInput.sendKeys(practiceLesson);
  }

  async getPracticeLessonInput(): Promise<string> {
    return await this.practiceLessonInput.getAttribute('value');
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

export class SubjectDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-subject-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-subject'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
