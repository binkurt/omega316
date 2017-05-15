/**
 * Model
 * @param data is the initializing model
 * @constructor
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
var CurrencyRate = function (model) {
    var self = this;

    self.base = ko.observable();
    self.target = ko.observable();
    self.rate = ko.observable();

    if (model != undefined) {
        self.base(model.base);
        self.target(model.target);
        self.rate(model.rate);
    }

    self.toJsonString = function () {
        var currencyRate = {
            base: self.base(),
            target: self.target(),
            rate: self.rate(),
        };
        return JSON.stringify(currencyRate);
    };

    self.update = function (model) {
        for (var attr in model) {
            if (self.hasOwnProperty(attr) && model[attr] != undefined) {
                if (ko.isComputed(self[attr])) continue;
                if ((ko.isObservable(self[attr]) && ko.isObservable(model[attr]))) {
                    self[attr](model[attr]());
                } else if ((ko.isObservable(self[attr]) && !ko.isObservable(model[attr]))) {
                    self[attr](model[attr]);
                }
            }
        }
    }

};

/**
 * View Model
 * @constructor
 */
var CurrencyRateViewModel = function () {
    var self = this;

    // Observable View Model Attributes
    self.currencyRate = new CurrencyRate();
    self.rates = ko.observableArray([]);

    /**
     *   Allows user to change the UI Language
     */
    self.changeLng = function (lang) {
        i18n.setLng(lang, function () {
            $(document).i18n();
        });
    }

    /**
     *   Activates the Language Selection
     */
    self.i18n = function () {
        $(document).i18n();
    };

    /**
     * Finds currency rate either by "base" or by "base and target"
     */
    self.find = function () {
      if (self.currencyRate.base() != undefined && self.currencyRate.base().length>0){
          if (self.currencyRate.target() != undefined && self.currencyRate.target().length>0){
              self.findByBaseAndTarget();
          } else {
              self.findByBase();
          }
      }
    };

    /**
     * Retrieves the rates by base
     */
    self.findByBase = function () {
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/rates/" + self.currencyRate.base()),
            cache: false,
            success: function (rates) {
                self.rates([]);
                for (var i in rates) {
                    var rate = rates[i];
                    self.rates.push(new CurrencyRate(rate));
                    self.i18n();
                }
            }
        });
    };

    /**
     * Retrieves the rates by base and target
     */
    self.findByBaseAndTarget = function () {
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/rates/" + self.currencyRate.base() + "/" + self.currencyRate.target()),
            cache: false,
            success: function (rate) {
                self.rates([]);
                self.currencyRate.update(rate);
                self.i18n();
            }
        });
    };

    /**
     * Retrieves all rates
     */
    self.findAll = function () {
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/rates"),
            cache: false,
            success: function (page) {
                self.rates([]);
                for (var i in page.content) {
                    var rate = page.content[i];
                    self.rates.push(new CurrencyRate(rate));
                }
                self.i18n();
            }
        })
    };

    /**
     * Adds new currency rate
     */
    self.addRate = function () {
        $.ajax({
            method: "POST",
            url: AppConfig.URL("/rates"),
            data: self.currencyRate.toJsonString(),
            contentType: "application/json",
            success: function (rate) {
                self.findAll();
            }
        })
    };

    /**
     * Updates an existing rate
     * @param rate is used to update the resource
     */
    self.updateRate = function (rate) {
        var jsonData = "";
        if (rate == self) {
            jsonData = self.currencyRate.toJsonString();
        } else {
            jsonData = rate.toJsonString();
        }
        $.ajax({
            method: "PUT",
            url: AppConfig.URL("/rates"),
            data: jsonData,
            contentType: "application/json",
            success: function (rate) {
                self.findAll();
            }
        })
    };

    /**
     * copies an employee to the view model
      * @param rate is the model used to update the view model
     */
    self.displayRate = function (rate) {
        self.currencyRate.update(rate);
    };

};

var Application= function () {
    i18n.init({
        lng: "en",
        resGetPath: "locale/__ns__-__lng__.json",
        fallbackLng: "en"
    }, function (t) {
        $(document).i18n();
    });
    ko.applyBindings(new CurrencyRateViewModel());
};

$(document).ready(Application);