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
	//drop down element for extra user control, then it builds the grid
	//Next it sets up the event handlers for the go button's onclick 
	//and the drop down's onchange.
	window.onload = function() {
		var sizeInput = document.createElement('select');
		for (var i = 10; i <= 35; i++) {
			if( i == 10 || i == 14 ||	i == 20 || i == 25 || i == 28 || i == 35) {
				var sizeOption = document.createElement('option');
				sizeOption.value = i;
				sizeOption.innerHTML = i + 'x' + i;
				if (i == 10) {
					sizeOption.selected = 'selected';
				}
				sizeInput.appendChild(sizeOption);
			}
		}
		document.querySelector('#controls').appendChild(sizeInput);	
		buildPuzzle();
		sizeInput.onchange = buildPuzzle;
		// document.querySelector('#goButton').onclick = shuffle;
		document.querySelector('#dance').onclick = dance;

	};


	//This function creates DOM elements for the tiles of the puzzle and places them in the
	//puzzle area before making event handlers for those tiles' onclick and
	//readying the adjacent tiles to the empty one to be clickable.
	function buildPuzzle() {
		var rootTiles = document.querySelector('select').value;
		tileSize = Math.floor(700 / rootTiles);
		var grid = document.querySelector('#grid');
		grid.innerHTML = '';
		for (var i = 0; i < rootTiles; i++) {
			for (var j = 0; j < rootTiles; j++) {
					var tile = document.createElement('div');
					tile.className = 'tile';
					tile.classList.add('unactivatedTile');
					var x = (j * tileSize) + 'px';
					var y = (i * tileSize) + 'px';
					tile.style.left = x;
					tile.style.top = y;
					tile.style.width = tileSize - 4 + 'px';
					tile.style.height = tileSize - 4 + 'px';
					tile.classList.add('x:' + x);
					tile.classList.add('y:' + y);
					var green = Math.floor(255 / rootTiles) * i;
					var blue = Math.floor(255 / rootTiles) * j;
					var red = 255 - Math.max(green, blue);
					tile.style.backgroundColor = 'rgb('+ red + ', ' + green + ',' + blue + ')';
					grid.appendChild(tile);
			}
		}
		var tiles = document.querySelectorAll('.tile');
		for (var i = 0; i < tiles.length; i++) {
			tiles[i].onmousedown = tileDown;
		}
		// checkClickable();
		document.querySelector('#output').style.display = 'none';	
	}



	function dance() {
		var rootTiles = document.querySelector('select').value;
		var timer;
		var button = document.querySelector('#dance');
		timer = setInterval(shuffle, 5);
		button.onclick = stopDance(timer);
		button.innerHTML = 'freeze';
	}

	function stopDance(timer) {
		return function() {
			var button = document.querySelector('#dance');
			clearInterval(timer);
			button.onclick = dance;
			button.innerHTML = 'homogenize';
		};
	}
	//This function is called when the onclick event listener of the shuffle
	//button is triggered. It shuffles the tiles into a random formation.
	function shuffle() {
			var tiles = document.querySelectorAll('.tile');
			var tile1 = tiles[Math.floor(Math.random() * tiles.length)];
			//select second tile only from adjacent ones to the first tile
			var tile2
			var thisY = parseInt((tile1.style.top).substring(0, tile1.style.top.length - 2), 10);
			var thisX = parseInt((tile1.style.left).substring(0, tile1.style.left.length - 2), 10);
			var adjacentTiles = [];
			for (var i = 0; i < tiles.length; i++) {
				var iY = parseInt((tiles[i].style.top).substring(0, tiles[i].style.top.length - 2), 10);
				var iX = parseInt((tiles[i].style.left).substring(0, tiles[i].style.left.length - 2), 10);
						if ((thisY - iY == tileSize && thisX == iX) 
									|| (iX - thisX == tileSize && thisY == iY)
									|| (iY - thisY == tileSize && thisX == iX) 
									|| (thisX - iX == tileSize && thisY == iY)) {
							adjacentTiles.push(tiles[i]);
						}
			}
			var tile2 = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
			exchange(tile1, tile2);
	}

	//This function takes in a list of tiles, and checks to see which tiles are 
	//adjacent to the empty tile, and enables those ones to be clickable so that 
	//only the tiles next to the empty tile can exchange places with it.
	// function checkClickable() {
	// 	var tiles = document.querySelectorAll('.tile');
	// 	for (var i = 0; i < tiles.length; i++) {
	// 			tiles[i].classList.add('clickable');
	// 	}
	// }

	//This function is called when the onclick event handler for any one of the puzzle
	//tiles is triggered. It checks to see if the clicked tile is adjacent to the empty
	//square, and then if it is, it moves the tiles accordingly. 
	function tileDown() {
		// alert("tile down!");
		var thisTile = this;
		var timer;

		ray(thisTile, 0, false);
		ray(thisTile, 2, false);
		ray(thisTile, 4, false);
		ray(thisTile, 6, false);

		document.querySelector('body').onmouseup = function () {
			ray(thisTile, 0, true);
			ray(thisTile, 2, true);
			ray(thisTile, 4, true);
			ray(thisTile, 6, true);


			ray(thisTile, 1, true);
			ray(thisTile, 3, true);
			ray(thisTile, 5, true);
			ray(thisTile, 7, true);
			document.querySelector('body').onmouseup = null;
		};
	}

	function ray(tile, dir, up) {

		if (tile.classList.contains('unactivatedTile')) {
			tile.classList.add('activatedTile');
			tile.classList.remove('unactivatedTile');

			tile.style.width = tileSize - 16 + 'px';
			tile.style.height = tileSize - 16 + 'px';

		} 

		if(true) {
			setTimeout(
				function () {
					if (tile.classList.contains('activatedTile')) {
						tile.classList.remove('activatedTile');
						tile.classList.add('unactivatedTile');

						tile.style.width = tileSize - 4 + 'px';
						tile.style.height = tileSize - 4 + 'px';
					}
				}
			, 300);
		}

		var tiles = document.querySelectorAll('.tile');
		var nextTile; //below we figure out the next tile in the ray

		var thisY = parseInt((tile.style.top).substring(0, tile.style.top.length - 2), 10);
		var thisX = parseInt((tile.style.left).substring(0, tile.style.left.length - 2), 10);
		for (var i = 0; i < tiles.length; i++) {
			var iY = parseInt((tiles[i].style.top).substring(0, tiles[i].style.top.length - 2), 10);
			var iX = parseInt((tiles[i].style.left).substring(0, tiles[i].style.left.length - 2), 10);
				

			switch (dir) {
				case 0: //up
					if(thisY - iY == tileSize && thisX == iX) {
						nextTile = tiles[i];
					}
					break;
				case 1: //up right
					if(thisY - iY == tileSize && iX - thisX == tileSize) {
						nextTile = tiles[i];
					}
					break;
				case 2: //right
					if(iX - thisX == tileSize && thisY == iY) {
						nextTile = tiles[i];
					}
					break;
				case 3: //down right
					if(iX - thisX == tileSize && iY - thisY == tileSize) {
						nextTile = tiles[i];
					}
					break;
				case 4: //down
					if(iY - thisY == tileSize && thisX == iX) {
						nextTile = tiles[i];
					}
					break;
				case 5: //down left
					if(iY - thisY == tileSize && thisX - iX == tileSize) {
						nextTile = tiles[i];
					}
					break;
				case 6: //left
					if(thisX - iX == tileSize && thisY == iY) {
						nextTile = tiles[i];
					}
					break;
				case 7: //up left
					if(thisX - iX == tileSize && thisY - iY == tileSize) {
						nextTile = tiles[i];
					}
					break;
			}
		}
		if(nextTile != null) {
			setTimeout(
				function () {
					ray(nextTile, dir, up);
				}
			, 100);
		}
	}


	//This function exchanges the places of any one tile on the puzzle area and the
	//empty tile.
	function exchange(tile1, tile2) {
		var oldX = tile1.style.left;
		var oldY = tile1.style.top;
		tile1.style.left = tile2.style.left;
		tile1.style.top = tile2.style.top;
		tile2.style.left = oldX;
		tile2.style.top = oldY;
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