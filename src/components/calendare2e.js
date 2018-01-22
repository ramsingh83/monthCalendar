describe('E2E Component: Calendar', () => {
  describe('Calendar - Before date Selected', () => {

    function Page() {
      this.pageTitle = $('#your-details-title');
      this.trackingNumber = $('#track-item');
      this.nextButton = $('#next-button');
    }

    beforeEach(() => {
      browser.get('/#');
      browser.waitForAngular();
      yourDetails = new Page();
    });

    it('should have a title', () => {
      expect(yourDetails.title.isDisplayed()).toEqual(true);
    });

  });

});
