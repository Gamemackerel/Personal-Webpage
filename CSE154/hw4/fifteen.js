/*
Abraham Miller
CSE154 AD
This javascript program interfaces with the HTML and CSS to facillitate
the functionality of a fifteen puzzle website for the fourth homework assignment.
A block contains fifteen tiles, although it has space for 16, and the tiles can be
moved around by exchanging places with the empty tile until a complete image is formed
and the puzzle is complete. 
I implemented extra feature #1: check to see if user won  
as well as extra feature #2: change the amount of tiles on the board. 
*/
(function() {
	'use strict';

	var tileSize;
	var emptyTile = {
		x: null,
		y: null
	};

	//This anonymous function runs when the window is loaded. It first creates a
	//drop down element for extra user control, then it builds the puzzle.
	//Next it sets up the event handlers for the shuffle button's onclick 
	//and the drop down's onchange.
	window.onload = function() {
		var sizeInput = document.createElement('select');
		for (var i = 3; i <= 6; i++) {
			var sizeOption = document.createElement('option');
			sizeOption.value = i;
			sizeOption.innerHTML = i + 'x' + i;
			if (i == 4) {
				sizeOption.selected = 'selected';
			}
			sizeInput.appendChild(sizeOption);
		}
		document.querySelector('#controls').appendChild(sizeInput);	
		buildPuzzle();
		sizeInput.onchange = buildPuzzle;
		document.querySelector('#shufflebutton').onclick = shuffle;
	};


	//This function creates DOM elements for the tiles of the puzzle and places them in the
	//puzzle area before making event handlers for those tiles' onclick and
	//readying the adjacent tiles to the empty one to be clickable.
	function buildPuzzle() {
		var rootTiles = document.querySelector('select').value;
		tileSize = Math.floor(400 / rootTiles);
		emptyTile.x = (rootTiles - 1) * tileSize + 'px';
		emptyTile.y = (rootTiles - 1) * tileSize + 'px';
		var puzzle = document.querySelector('#puzzlearea');
		puzzle.innerHTML = '';
		for (var i = 0; i < rootTiles; i++) {
			for (var j = 0; j < rootTiles; j++) {
				if (!(i == (rootTiles - 1) && j == (rootTiles - 1))) {
					var tile = document.createElement('div');
					tile.className = 'tile';
						var x = (j * tileSize) + 'px';
					var y = (i * tileSize) + 'px';
					tile.style.left = x;
					tile.style.top = y;
					tile.style.width = tileSize - 10 + 'px';
					tile.style.height = tileSize - 10 + 'px';
					tile.classList.add('x:' + x);
					tile.classList.add('y:' + y);
					tile.style.backgroundPosition = (j * - tileSize) + 'px ' +
							(i * - tileSize) + 'px';
					tile.innerHTML = 1 + (rootTiles * i) + j;
					puzzle.appendChild(tile);
				}
			}
		}
		var tiles = document.querySelectorAll('.tile');
		for (var i = 0; i < tiles.length; i++) {
			tiles[i].onclick = tileClick;
		}
		checkClickable();
		document.querySelector('#output').style.display = 'none';	
	}

	//This function is called when the onclick event listener of the shuffle
	//button is triggered. It shuffles the tiles into a random formation.
	function shuffle() {
		for (var i = 0; i < 999; i++) {
			var moveables = document.querySelectorAll('.clickable');
			var rndInt = Math.floor(Math.random() * moveables.length);
			moveToBlank(moveables[rndInt]);
		}
		checkWin();
	}

	//This function takes in a list of tiles, and checks to see which tiles are 
	//adjacent to the empty tile, and enables those ones to be clickable so that 
	//only the tiles next to the empty tile can exchange places with it.
	function checkClickable() {
		var tiles = document.querySelectorAll('.tile');
		for (var i = 0; i < tiles.length; i++) {
			tiles[i].classList.remove('clickable');
			var diffX = Math.abs(parseInt(tiles[i].style.left, 10) - parseInt(emptyTile.x, 10));
			var diffY = Math.abs(parseInt(tiles[i].style.top, 10) - parseInt(emptyTile.y, 10));
			if(diffX + diffY == tileSize) {
				tiles[i].classList.add('clickable');
			}
		}
	}

	//This function is called when the onclick event handler for any one of the puzzle
	//tiles is triggered. It checks to see if the clicked tile is adjacent to the empty
	//square, and then if it is, it moves the tiles accordingly. 
	function tileClick() {
		if(this.classList.contains('clickable')) {
			moveToBlank(this);
			checkWin();
		}
	}

	//This function exchanges the places of any one tile on the puzzle area and the
	//empty tile.
	function moveToBlank(tile) {
		var oldX = tile.style.left;
		var oldY = tile.style.top;
		tile.style.left	= emptyTile.x;
		tile.style.top = emptyTile.y;
		emptyTile.x = oldX;
		emptyTile.y = oldY;
		checkClickable();
	}

	//This function checks to see if the tiles are in the correct sorted positiions
	//and then, if they are, informs the user that they have won the puzzle.
	function checkWin() {
		var tiles = document.querySelectorAll('.tile');
		var rightTiles = 0;
		for (var i = 0; i < tiles.length; i++) {
			var initialX = tiles[i].classList[1].substring(2);
			var initialY = tiles[i].classList[2].substring(2);
			if(initialX == tiles[i].style.left && initialY == tiles[i].style.top) {
				rightTiles++;
			}
		}
		var output = document.querySelector('#output');
		if(rightTiles == tiles.length) {
			output.innerHTML = 'YOU WIN!!';
			output.style.display = 'inline-block';
		} else {
			output.style.display = 'none';
		}
	}
})();