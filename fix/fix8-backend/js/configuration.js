var AppConfig = (function(){
    var self= this;
    self.SERVER_IP = '10.2.2.165';
    self.SERVER_PORT = 7001;
    self.API_BASE_URL = 'http://'+ this.SERVER_IP+':'+this.SERVER_PORT+'/fix/api';
    self.WS_URL = 'http://'+ this.SERVER_IP+':'+this.SERVER_PORT+'/fix/api/market';
    self.URL = function (url) {
        return this.API_BASE_URL.concat(url);
    }
    return self;
})();