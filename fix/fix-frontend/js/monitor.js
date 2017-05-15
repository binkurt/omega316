CurrencyRate = function (data) {
    var self = this;

    self.base = data.base;
    self.target = data.target;
    self.rate = ko.observable(data.rate);
};

var FixViewModel = function () {
    var self = this;

    self.base = ko.observable("");
    self.target = ko.observable("");
    self.rates = ko.observableArray([]);
    self.data = {
        label: [],
        datasets: []
    };

    // WebSocket Connection
    self.stompClient = null;
    self.connected = ko.observable(false);

    var socket= new SockJS(AppConfig.WS_URL);
    self.stompClient = Stomp.over(socket);
    self.stompClient.connect({},function(frame){
       self.connected(true);
       self.stompClient.subscribe("/topic/changes",function(message){
          evt= JSON.parse(message.body);
          for (var i in self.rates()){
              var o= self.rates()[i];
              if ( (o.base==evt.event.base)
                   && (o.target== evt.event.target)){
                  o.rate(evt.event.newRate);
                  break;
              }
          }
       });
    });

    // Allows user to change the UI Language
    self.changeLng = function (lang) {
        i18n.setLng(lang, function () {
            $(document).i18n();
        });
    }

    // Activates the Language Selection
    self.i18n = function () {
        $(document).i18n();
    };

    self.currencyRateExists = function(base,target){
        for (var i in self.rates()){
            var rate= self.rates()[i];
            if ( (base == rate.base) && (target == rate.target) ){
                return true;
            }
        }
        return false;
    };

    self.addToBasket = function () {
        if (self.currencyRateExists(self.base(),self.target())) return;
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/rates/" + self.base() + "/" + self.target()),
            cache: false,
            success: function (model) {
                self.rates.push(new CurrencyRate(model));
                self.data.datasets[0].data.splice(0);
                self.data.labels.splice(0);
                self.data.labels.push(model.base+"-"+model.target);
                self.i18n();
            }
        });
    };

    self.addAllToBasket = function () {
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/rates/"+ self.base()),
            cache: false,
            success: function (rates) {
                for (var i in rates) {
                    var rate= rates[i];
                    if (self.currencyRateExists(rate.base, rate.target)) continue;
                    self.rates.push(new CurrencyRate(rate));
                }
                self.i18n();
            }
        });
    };

    self.displayChart= function(row){
        self.data.datasets[0].data.push([1, 2, 3, 4, 5, 6, 7]);
    };

    self.removeFromBasket = function (row) {
        self.rates.remove(row);
    };

};

$(document).ready(function () {
    i18n.init({
        lng: "en",
        resGetPath: "locale/__ns__-__lng__.json",
        fallbackLng: "en"
    }, function (t) {
        $(document).i18n();
    });
    ko.applyBindings(new FixViewModel());
});