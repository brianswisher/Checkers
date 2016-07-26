angular.module('checkers').service('CheckerBoardService', function(){ 

	var board = new Array(8);

	for(var i = 0; i < board.length; i++){
		board[i] = new Array(8);
		for(var j = 0; j < board[i].length; j++){
			board[i][j] = "";
		}
	}

	function populateBoard(positions){
		Object.keys(positions).forEach(function(key, value){
			var coord = key.split("");
			var x = coord[0].charCodeAt(0) - 97;
			var y = parseInt(coord[1]) - 1;
		
			board[x][y] = positions[key];		
		});
	};

	function updateUIBoard(){

	}

	function validMove(piece, oldPos, newPos){
		var oldCoord = oldPos.split("");
		var newCoord = newPos.split("");
		
		var oldX = oldCoord[0].charCodeAt(0) - 97;
		var oldY = parseInt(oldCoord[1]) - 1;

		var newX = newCoord[0].charCodeAt(0) - 97;
		var newY = parseInt(newCoord[1]) - 1;

		if(piece == 'wP'){
			//move forward
			if((newY - oldY) != 1){
				return false;
			}
			//move diagonal
			if((newX - oldX) != 1 && (newX - oldX) != -1){
				return false;
			}
		} else if (piece == 'bP'){
			//move forward
			if((newY - oldY) != -1){
				return false;
			}
			//move diagonal
			if((newX - oldX) != 1 && (newX - oldX) != -1){
				return false;
			}
		}
		//update the board with the new coordinates
		return true;
	}

/* Kings can move forward and backward
*/
	//forward move for whitepiece
	function positiveMove(){

	}

	//forward move for blackpiece
	function negativeMove(){

	}

	return{
		populateBoard:populateBoard,
		validMove:validMove
	}
});