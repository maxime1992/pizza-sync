import { PizzaSyncPage } from './app.po';

describe('pizza-sync App', () => {
  let page: PizzaSyncPage;

  beforeEach(() => {
    page = new PizzaSyncPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
