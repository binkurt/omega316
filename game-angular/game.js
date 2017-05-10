var Profile = {
	TIME_LIMIT: 60,
	INIT_GUESS: 50,
	MAX_TRIES: 7
};

var Move = function(guess, message) {
	var self = this;
	self.guess = guess;
	self.message = message;
}

var game = angular.module("game", []).controller("gameController",
		 function($scope,$interval) {
			var self = this;
			self.guess = 0;
			self.counter = Profile.TIME_LIMIT;
			self.secret = Math.floor(Math.random() * 100) + 1;
			self.history = new Array();
			self.tries = 0;
			self.avgWinTime= 0.0;
			self.totalWinTime=0.0;
			self.wins= 0;
			console.log(self.secret);
			
			self.init = function() {
				self.tries = 0;
				self.counter = Profile.TIME_LIMIT;
				self.history = new Array();
				self.secret = Math.floor(Math.random() * 100) + 1;
				console.log(self.secret);
				self.pbTries= {'width': '0%'};
				self.pbCounter= {'width': '100%'};
				self.pbAvgWinTime= {'width': '0%'};
			}
			
			$interval(function(){
				self.pbCounter= { 'width' : ((self.counter * 100) / Profile.TIME_LIMIT) + '%' };
				if (self.counter == 0) {
					self.init();
				} else {
					self.counter--;
				}
			}, 1000);
			self.play = function() {
				self.tries++;
				self.pbTries=  { 'width' : ((self.tries * 100) / Profile.MAX_TRIES) + '%' };
				if (self.tries > 7) {
					self.init();
					self.history.push(new Move("You have 7 moves!", "Game is over!"));					
				} else if (self.secret == self.guess) {
					self.wins++;
					self.totalWinTime = self.totalWinTime + 60 - self.counter ;
					self.avgWinTime = self.totalWinTime / self.wins;
					var moves= self.tries;
					self.init();
					self.history.push(new Move("Congratulations!", "You win in "+moves+" moves!"));
					self.pbAvgWinTime= { 'width' : ((self.avgWinTime * 100) / Profile.TIME_LIMIT) + '%' };
				} else {
					message = "Pick larger";
					if (self.guess > self.secret)
						message = "Pick smaller";
					self.history.push(new Move(self.guess, message));
				}
			}
		} );