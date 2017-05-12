var AppConfig = (function(){
    var self= this;
    self.IMG_HEADER = 'data:image/png;base64,';
    self.SERVER_IP = 'localhost';
    self.SERVER_PORT = 7001;
    self.API_BASE_URL = 'http://'+ this.SERVER_IP+':'+this.SERVER_PORT+'/hr/api';
    self.WS_URL = 'http://'+ this.SERVER_IP+':'+this.SERVER_PORT+'/hr/api/market';
    self.URL = function (url) {
        return this.API_BASE_URL.concat(url);
    }
    return self;
})();