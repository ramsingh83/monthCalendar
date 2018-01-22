describe('E2E Component: Calendar', () => {

  let calendar;

  function Page() {

    this.monthlabel = $('.month');
    this.currency = $('#currency');
    this.price = $('#amount');

  }
  describe('Calendar - Before date Selected', () => {

    beforeEach(() => {
      browser.get('/#');
      browser.waitForAngular();
      calendar = new Page();
    });

    it('should have a month name', function () {
      expect(calendar.monthlabel.isPresent()).toEqual(true);
    });

    it('should have a currency symbol', function () {
      expect(calendar.currency.isPresent()).toEqual(true);
    });

    it('should have a surcharge amount', function () {
      expect(calendar.price.isPresent()).toEqual(true);
    });

    /*it('should have a surcharge of 5 pound on monday', function () {
      var surcharge = element(by.css(".price"));
      expect(surcharge.isPresent()).toEqual(true);
    });*/

  });

});
