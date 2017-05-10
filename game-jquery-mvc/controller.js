var View = function(document){
	var self= this;
	
	self.document= document;
	
	self.guess= $("#guess"); 
	self.tries= $("#tries");
	self.pbTries= $("#pbTries"); 
	self.counter= $("#counter");
	self.pbCounter= $("#pbCounter");
	self.wins= $("#wins");
	self.avgWinTime= $("#avgWinTime");
	self.pbAvgWinTime= $("#pbAvgWinTime");
	self.validationMessageContainer= $("#validationMessageContainer");
	self.validationMessage= $("#validationMessage");
	self.playButton= $("#playButton");
	self.history= $('#history');
};

var Controller = function(model,view){
	var self= this;

	self.view= view;
	self.model= model;

	self.updateCounterView = function(){
		self.model.counter--;
		self.view.counter.text(self.model.counter);
		if (self.model.counter<=0){
			self.model.init();
			self.model.history.push(new Move('Time is out!','Game over!'));
			self.updateView();
		}
		self.view.pbCounter.attr('ariavalue',self.model.counter);
		self.view.pbCounter.attr('style',"width: "+self.model.counter*4+"%");
	};
	
	self.updateStatisticsView = function(){
		self.view.wins.text(self.model.statistics.wins);
		self.view.avgWinTime.text(self.model.statistics.avgWinTime);
		self.view.pbAvgWinTime.attr('ariavalue',self.model.statistics.avgWinTime);
		self.view.pbAvgWinTime.attr('style',"width: "+self.model.statistics.avgWinTime*4+"%");
	};
	
	self.updateHistoryTable = function() {
		self.view.history.empty();
		for (i in model.history){
			move= model.history[i];
			self.view.history.append("<tr><td>"+move.guess
					+"</td><td>"+move.message+"</td></tr>");
		}
	};

	self.updateTries = function(){
		if (self.model.tries>0){
			self.view.tries.text(self.model.tries);
		}
		else{
			self.view.tries.text('New game');	
		}
		self.view.pbTries.attr('ariavalue',self.model.tries)
		self.view.pbTries.attr('style',"width: "+((self.model.tries*100)/7)+"%")
	};

	self.updateValidationView = function(){
		self.view.validationMessage.text(self.model.validationMessage);
		if (self.model.validationMessage.length>0){
			self.view.validationMessageContainer.show();		
		} else {
			self.view.validationMessageContainer.hide();		
		}
	};

	self.updateView = function(){
		self.updateHistoryTable();
		self.updateTries();
		self.updateValidationView();
		self.updateStatisticsView();
	};	
	
	self.clickPlay = function(){
		self.model.play(self.view.guess.val());
		self.updateView();
	}
	
	self.init = function() {
		self.model.init();
		self.updateView();
		setInterval(self.updateCounterView, 1000);
		self.view.playButton.click(self.clickPlay);
	};
};

var Application = function() {
	var self= this;

	self.run = function(){
		self.view= new View(document);
		self.model= new GameViewModel();
		self.controller= new Controller(self.model,self.view);
		self.controller.init();
	};
};

var app= new Application();

$(document).ready(app.run);