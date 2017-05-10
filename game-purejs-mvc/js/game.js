var Move = function (guess, message) {
    var self = this;
    self.guess = guess;
    self.message = message;
};

var GameViewModel = function () {
    var self = this;

    self.secret = createSecret();
    self.tries = ko.observable(0);
    self.guess = ko.observable(50);
    self.history = ko.observableArray([]);
    self.validationMessage= ko.observable("");
    self.counter= ko.observable(30);
    self.wins= ko.observable(0);
    self.loses= ko.observable(0);
    self.gameTime= ko.observable(0);
    self.totalTries= ko.observable(0);
    self.games = ko.computed(function(){
       return self.loses()+self.wins();
    });
    self.avgWinTime= ko.computed(function(){
        if (self.wins() == 0) return 0;
        return self.gameTime() / self.wins();
    });
    self.avgTries= ko.computed(function(){
        if (self.wins() == 0) return 0;
        return self.totalTries() / self.wins();
    });
    setInterval(function(){
        self.counter(self.counter()-1);
        if (self.counter()<=0){
            self.loses(self.loses()+1);
            initGame("Time is out!");
        }
    },1000);

    function createSecret() {
        return Math.floor(Math.random() * 100) + 1;
    };

    function initGame(message) {
        self.history([]);
        self.tries(0);
        self.history.push(new Move(self.secret, message));
        self.secret = createSecret();
        self.counter(30);
        return;
    }

    self.play = function() {
        self.validationMessage("");
        for (var i in self.history()){
            if (self.guess()==self.history()[i].guess){
                self.validationMessage("You have already entered "+self.guess());
                return;
            }
        }
        if (isNaN(self.guess())){
            self.validationMessage("Enter a valid integer!");
            return;
        }
        if (Number(self.guess())<0 || Number(self.guess())>100){
            self.validationMessage("Enter a integer between 1 and 100!");
            return;
        }
        var message;
        self.tries(self.tries()+1);
        if (self.guess() == self.secret) {
            self.wins(self.wins()+1);
            self.totalTries(self.totalTries()+self.tries());
            self.gameTime(self.gameTime()+30-self.counter());
            return initGame("You win!");
        } else if (self.tries() > 7) {
            self.loses(self.loses()+1);
            return initGame("You lose!");
        } else if (self.guess() < self.secret) {
            message = "Pick larger!";
        } else {
            message = "Pick smaller!";
        }
        self.history.push(new Move(self.guess(), message));
    };
};

var gameViewModel= new GameViewModel();

$("document").ready(function(){
    ko.applyBindings(gameViewModel);
});