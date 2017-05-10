var emptyElement = function(element) {
	var node = element;
	while (element.hasChildNodes()) {
		if (node.hasChildNodes()) {
			node = node.lastChild;
		} else {
			node = node.parentNode;
			node.removeChild(node.lastChild);
		}
	}
} ;


var View = function(document){
	var self= this;
	
	self.document= document;
	
	self.guess= self.document.getElementById("guess"); 
	self.tries= self.document.getElementById("tries");
	self.pbTries= self.document.getElementById("pbTries"); 
	self.counter= self.document.getElementById("counter");
	self.pbCounter= self.document.getElementById("pbCounter");
	self.wins= self.document.getElementById("wins");
	self.avgWinTime= self.document.getElementById("avgWinTime");
	self.pbAvgWinTime= self.document.getElementById("pbAvgWinTime");
	self.validationMessageContainer= self.document.getElementById("validationMessageContainer");
	self.validationMessage= self.document.getElementById("validationMessage");
	self.playButton= self.document.getElementById("playButton");
	self.history= self.document.getElementById('history').getElementsByTagName('tbody')[0];
};

var Controller = function(model,view){
	var self= this;

	self.view= view;
	self.model= model;

	self.updateCounterView = function(){
		self.model.counter--;
		self.view.counter.innerHTML= self.model.counter;
		if (self.model.counter<=0){
			self.model.init();
			self.model.history.push(new Move('Time is out!','Game over!'));
			self.updateView();
		}
		self.view.pbCounter.setAttribute('ariavalue',self.model.counter);
		self.view.pbCounter.setAttribute('style',"width: "+self.model.counter*4+"%");
	};
	
	self.updateStatisticsView = function(){
		self.view.wins.innerHTML= self.model.statistics.wins;
		self.view.avgWinTime.innerHTML= self.model.statistics.avgWinTime;
		self.view.pbAvgWinTime.setAttribute('ariavalue',self.model.statistics.avgWinTime);
		self.view.pbAvgWinTime.setAttribute('style',"width: "+self.model.statistics.avgWinTime*4+"%");
	};
	
	self.updateHistoryTable = function() {
		emptyElement(self.view.history);
		for (i in self.model.history) {
			newRow = self.view.history.insertRow(self.view.history.rows.length);
			cellGuess = newRow.insertCell(0);
			cellMessage = newRow.insertCell(1);
			move = self.model.history[i];
			cellGuess.appendChild(document.createTextNode(move.guess));
			cellMessage.appendChild(document.createTextNode(move.message));
		}
	};

	self.updateTries = function(){
		if (self.model.tries>0){
			self.view.tries.innerHTML= self.model.tries;
		}
		else{
			self.view.tries.innerHTML= 'New game';	
		}
		self.view.pbTries.setAttribute('ariavalue',self.model.tries)
		self.view.pbTries.setAttribute('style',"width: "+((self.model.tries*100)/7)+"%")
	};

	self.updateValidationView = function(){
		self.view.validationMessage.innerHTML= self.model.validationMessage;
		if (self.model.validationMessage.length>0){
			self.view.validationMessageContainer.style.visibility = "visible";		
		} else {
			self.view.validationMessageContainer.style.visibility = "hidden";		
		}
	};

	self.updateView = function(){
		self.updateHistoryTable();
		self.updateTries();
		self.updateValidationView();
		self.updateStatisticsView();
	};	
	
	self.clickPlay = function(){
		self.model.play(self.view.guess.value);
		self.updateView();
	}
	
	self.init = function() {
		self.model.init();
		self.updateView();
		setInterval(self.updateCounterView, 1000);
		self.view.playButton.onclick = self.clickPlay;
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

window.onload= app.run;