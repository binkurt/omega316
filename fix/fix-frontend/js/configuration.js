var AppConfig = (function(){
        var self= this;
        self.SERVER_IP = 'localhost';
        self.SERVER_PORT = 7001;
        self.API_BASE_URL = 'http://'+ this.SERVER_IP+':'+this.SERVER_PORT+'/fix/api';
        self.WS_URL = 'http://'+ this.SERVER_IP+':'+this.SERVER_PORT+'/fix/api/changes';
        self.URL = function (url) {
            return this.API_BASE_URL.concat(url);
        }
        return self;
})();

ko.bindingHandlers.price = {
    update : function(element,valueAccessor){
        var amount= valueAccessor();
        if (ko.isObservable(amount))
            amount= amount();
        var formatted= amount != null ?
            Number(amount).toFixed(3)  : '' ;
        $(element).text(formatted);
    }
} ;

var currencySymbols= {
   "usd": "$",
   "try": "₺",
   "eur": "€",
   "gbp": "£",
   "aud": "$",
   "cad": "$",
   "nok": "kr",
   "dkk": "kr",
   "jpy": "¥",
   "sar": "﷼",
   "cny": "¥",
   "sek": "kr",
};

ko.bindingHandlers.currency = {
    update : function(element,valueAccessor){
        var currency= valueAccessor();
        if (ko.isObservable(currency))
            currency= currency();
        var symbol = "";
        if (currency != null && currencySymbols.hasOwnProperty(currency));
            symbol = currencySymbols[currency];
        var symbol= symbol == undefined ? '' : symbol ;
        $(element).text(currency.toUpperCase()+" ("+symbol+")");
    }
} ;