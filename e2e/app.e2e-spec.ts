import { AdfPage } from './app.po';

describe('adf App', function() {
  let page: AdfPage;

  beforeEach(() => {
    page = new AdfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
