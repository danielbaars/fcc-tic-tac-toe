document.addEventListener("DOMContentLoaded", function(event) {

	var xOrO = document.getElementById("jsXorO");
	var btnX = document.getElementById("jsX");
	var btnO = document.getElementById("jsO");

	var a1 = document.getElementById("jsA1");
	var a2 = document.getElementById("jsA2");
	var a3 = document.getElementById("jsA3");
	var b1 = document.getElementById("jsB1");
	var b2 = document.getElementById("jsB2");
	var b3 = document.getElementById("jsB3");
	var c1 = document.getElementById("jsC1");
	var c2 = document.getElementById("jsC2");
	var c3 = document.getElementById("jsC3");

	var startMessage = document.getElementById("jsStartMessage");	

	var humanTurn = document.getElementById("jsHumanTurn");
	var compuTurn = document.getElementById("jsCompuTurn");	
	var humanWin = document.getElementById("jsHumanWin");
	var compuWin = document.getElementById("jsCompuWin");
	var draw = document.getElementById("jsDraw");	

	var allCells = [a1, a2, a3, b1, b2, b3, c1, c2, c3]; 
	var emptyCells = allCells;

	var winners = [ [a1, a2, a3], [b1, b2, b3], [c1, c2, c3], [a1, b1, c1], [a2, b2, c2], [a3, b3, c3], [a1, b2, c3], [a3, b2, c1] ];

	var humanCells = [];
	var compuCells = [];

	var back = document.getElementById("jsBack");
	var reset = document.getElementById("jsReset");

	var player = 'X';	

	var human;
	var computer;

	btnX.addEventListener("click", humanPick);
	btnO.addEventListener("click", humanPick);	


	function humanPick(e) {

		if (document.getElementById(e.target.id) === btnX) {

			human = 'X';
			computer = 'O';

		} else if (document.getElementById(e.target.id) === btnO) {

			human = 'O';
			computer = 'X';

		};

		xOrO.style.display = 'none';
		startMessage.style.display = 'none';

		back.style.visibility = 'visible';
		reset.style.visibility = 'visible';

		startGame();

	}


	function startGame() {

		if (human === 'X') {

			compuTurn.style.visibility = 'visible';
			
			setTimeout(function(){ 

				compuMove();

			}, 500);

		} else {

			humanTurn.style.visibility = 'visible';

			addCellEventListeners();

		}

	}


	function toggleTurnMessage() {

		if (compuTurn.style.visibility === 'visible') {

			compuTurn.style.visibility = 'hidden';
			humanTurn.style.visibility = 'visible';

		} else {

			compuTurn.style.visibility = 'visible';
			humanTurn.style.visibility = 'hidden';

		}

	}



	function addCellEventListeners() {

		for (i=0; i<emptyCells.length; i++) {

			emptyCells[i].addEventListener("click", humanMove);

		}	

	}

	function removeCellEventListeners() {

		for (i=0; i<allCells.length; i++) {

			allCells[i].removeEventListener("click", humanMove);

		}

	}


	function resetGame() {

		allCells = [a1, a2, a3, b1, b2, b3, c1, c2, c3]; 

		for (i=0; i<allCells.length; i++) {

			allCells[i].innerHTML = '';

		}

		humanTurn.style.visibility = 'hidden';
		compuTurn.style.visibility = 'hidden';

		humanWin.style.display = 'none';
		compuWin.style.display = 'none';
		draw.style.display = 'none';

		humanCells = [];
		compuCells = [];
		emptyCells = allCells;

	}


	back.addEventListener("click", function(e) {

		back.style.visibility = 'hidden';
		reset.style.visibility = 'hidden';

		setTimeout(function(){

			xOrO.style.display = 'flex';
			startMessage.style.display = 'block';

		}, 300);	

		resetGame();		

	});	


	reset.addEventListener("click", function(e) {

		resetGame();

		startGame();

	});	





	function compuMove() {

		var pick = emptyCells[Math.floor(Math.random()*emptyCells.length)];

		setTimeout(function(){ 

			if (emptyCells.length > 0) {

				compuCells.push(pick);

				pick.innerHTML = computer;

				if ( checkWinner(compuCells) ) {

					compuWin.style.display = 'block';
					compuTurn.style.visibility = 'hidden';
					return;

				};

				var index = emptyCells.indexOf(pick);

				emptyCells.splice(index, 1);

			} 

			if (computer === 'O' && emptyCells.length > 1) {				

				setTimeout(function(){

					toggleTurnMessage();

				}, 120);

				addCellEventListeners();

			}

			if (computer === 'X' && emptyCells.length > 0) {				

				setTimeout(function(){

					toggleTurnMessage();

				}, 120);

				addCellEventListeners();

			}			

			if (emptyCells.length === 0) {

				draw.style.display = 'block';
				compuTurn.style.visibility = 'hidden';
				humanTurn.style.visibility = 'hidden';

			}			

		}, 500);

		
	}	



	function humanMove(e) {

		var cell = document.getElementById(e.target.id);

		humanCells.push(cell);

		cell.innerHTML = human;

		if ( checkWinner(humanCells) ) {

			humanWin.style.display = 'block';
			humanTurn.style.visibility = 'hidden';
			removeCellEventListeners();
			return;

		};

		var index = emptyCells.indexOf(cell);

		emptyCells.splice(index, 1);

		if (emptyCells.length > 0) {

			compuMove();

			toggleTurnMessage();

			addCellEventListeners();

		}	

		removeCellEventListeners();

		if (emptyCells.length === 0) {

			draw.style.display = 'block';
			compuTurn.style.visibility = 'hidden';
			humanTurn.style.visibility = 'hidden';

		}		

	}


	function checkWinnerEC5(array) {

		return winners.some( function(winner) {

			return winner.every( function(cell) {

				return array.indexOf(cell) > -1;

			});

		} );

	}


	function checkWinner(array) {

		return winners.some( winner => 

			winner.every( cell =>  

				array.indexOf(cell) > -1 

			) 

		);

	}	


});











