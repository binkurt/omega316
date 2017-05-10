// EcmaScript 6 (ES 6)
// EcmaScript 5.1 (ES 5.1)
var Profile = {
	TIME_LIMIT: 60,
	INIT_GUESS: 50,
	MAX_TRIES: 7
};

var Move = function(guess,message) {
	var self= this;
	
	self.guess= guess;
	self.message= message;
};

var GameViewModel = function() {
	var self= this;
	
	self.tries = ko.observable(0);
	self.secret= ko.observable(0);
	self.guess= ko.observable(Profile.INIT_GUESS);
	self.history = ko.observableArray([]);
	self.counter= ko.observable(Profile.TIME_LIMIT);
	self.wins= ko.observable(0);
	self.totalWinTime= ko.observable(0);
	
	self.avgWinTime= ko.computed(function(){
		var ratio= self.totalWinTime()/self.wins();
		if (isNaN(ratio)) return 0;
		return ratio;
	});
	
	self.pbTries = ko.computed(function(){
		return 100*self.tries()/Profile.MAX_TRIES+'%';
	});
	
	self.pbCounter = ko.computed(function(){
		return (100*self.counter())/Profile.TIME_LIMIT + '%';
	});
	
	self.pbAvgWinTime = ko.computed(function(){
		return (100*self.avgWinTime())/Profile.TIME_LIMIT + '%';
	});
	
	setInterval(function(){
		self.counter(self.counter()-1);
	}, 1000);
	
    self.init = function(){
	   self.history([]); // model update
	   self.tries(0); // model update
	   self.secret(Math.floor(Math.random()*100)+1); // model update
	   self.counter(Profile.TIME_LIMIT); // model update
   }
    
   self.timeOut= ko.computed(function(){
	  console.log("timeOut is triggered!") 
	  if (self.counter()<=0){
		   self.init();
		   self.history.push(new Move("Time is out!","Game is over!"));		  
	  } 
   }) ;
   
   self.play = function(){
	   if (self.secret()==self.guess()){
		   self.wins(self.wins()+1);
		   self.totalWinTime(
			   Profile.TIME_LIMIT+self.totalWinTime()-self.counter()
		   );
		   self.init();
		   self.history.push(new Move(self.guess(),"You win!"));
		   return;
	   } else {
		   if (self.guess() < self.secret()){
			   move = new Move(self.guess(),"Pick larger!");
		   } else {
			   move = new Move(self.guess(),"Pick smaller!");
		   }
		   self.history.push(move);		  
	   }
	   self.tries(self.tries()+1);
	   if (self.tries()>=7){
		   self.init();
		   self.history.push(new Move('7 tries',"Game over!"));
		   return;		   
	   }
   }	
}