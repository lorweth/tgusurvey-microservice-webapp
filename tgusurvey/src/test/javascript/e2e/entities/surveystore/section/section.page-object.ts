import { element, by, ElementFinder } from 'protractor';

export class SectionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-section div table .btn-danger'));
  title = element.all(by.css('jhi-section div h2#page-heading span')).first();
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

export class SectionUpdatePage {
  pageTitle = element(by.id('jhi-section-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sttInput = element(by.id('field_stt'));
  titleInput = element(by.id('field_title'));

  headerSelect = element(by.id('field_header'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSttInput(stt: string): Promise<void> {
    await this.sttInput.sendKeys(stt);
  }

  async getSttInput(): Promise<string> {
    return await this.sttInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async headerSelectLastOption(): Promise<void> {
    await this.headerSelect.all(by.tagName('option')).last().click();
  }

  async headerSelectOption(option: string): Promise<void> {
    await this.headerSelect.sendKeys(option);
  }

  getHeaderSelect(): ElementFinder {
    return this.headerSelect;
  }

  async getHeaderSelectedOption(): Promise<string> {
    return await this.headerSelect.element(by.css('option:checked')).getText();
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

export class SectionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-section-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-section'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
