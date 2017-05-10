'use strict';

class Move {
	constructor (guess,message){
	   this.guess= guess;
	   this.message= message;
	}
};

class GameStatistics {
	constructor (){
		this.wins= 0;
		this.totalWinTime= 0;
		this.avgWinTime= 0;
	}
};

class GameViewModel {
	constructor() {
		this.tries = 0;
		this.secret= 0;
		this.history = [];
		this.counter=25;
		this.validationMessage= "";
		this.statistics= new GameStatistics();
	}
   init (){
	   this.history= [];
	   this.tries= 0;
	   this.secret= Math.floor(Math.random()*100)+1;
	   console.log(this.secret);
	   this.counter=25;
	   this.validationMessage= "";
   }
   play (guess){
	   this.validationMessage= "";
	   
	   if (isNaN(guess)){
		   this.validationMessage= "Enter a valid integer!";
		   return false;
	   }
	   guess = Number(guess);
	   if (guess<1 || guess >100){
		   this.validationMessage= "Enter an integer between 1 and 100!";
		   return false;		   
	   }
	   for (let i=0;i<this.history.length;++i){
		   let move= this.history[i];
		   if (guess==move.guess){
			   this.validationMessage= "You have already played "+guess+"!";
			   return false;
		   }
	   }
	   if (this.secret==guess){
		   this.statistics.wins++;
		   this.statistics.totalWinTime += 25 - this.counter;
		   this.statistics.avgWinTime = this.statistics.totalWinTime / this.statistics.wins ;
		   this.init();
		   this.history.push(new Move(guess,"You win!"));
		   return true;
	   } 
	   let evaluation = "Pick smaller!"; 
	   if (guess < this.secret){
		   evaluation = "Pick larger!";
	   }
	   this.history.push(new Move(guess,evaluation));		  
	   this.tries++;
	   if (this.tries>=7){
		   this.init();
		   this.history.push(new Move('You have 7 tries.',"Game over!"));
	   }
	   return true;
   }	
}