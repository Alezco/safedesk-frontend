import { SafedeskPage } from './app.po';

describe('safedesk App', () => {
  let page: SafedeskPage;

  beforeEach(() => {
    page = new SafedeskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
