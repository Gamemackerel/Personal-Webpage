// CSE 154
// Creates and manipulates rectangles.

(function() {
	'use strict';

	window.onload = function() {
		// set up event listeners
		document.getElementById('move').onclick = moveIt;
		document.getElementById('color').onclick = colorIt;
		document.getElementById('count').onchange = createRectangles;

		createRectangles();
	}

	// creates the number of rectangles specified in the select.
	function createRectangles() {
		var area = document.getElementById('rectangle-area');
		area.innerHTML = '';
		var num = parseInt(document.getElementById('count').value);
		for (var i = 0; i < num; i++) {
			var newRect = document.createElement('div');
			newRect.className = 'rectangle';
			area.appendChild(newRect);
		}
	}

	// Randomly color all of the rectangles
	function colorIt() {
		var rects = document.querySelectorAll('.rectangle');
		for (var i = 0; i < rects.length; i++) {
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			rects[i].style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		}
	}

	// Randomly position all the rectangles
	function moveIt() {
		var rects = document.querySelectorAll('#rectangle-area .rectangle');
		for (var i = 0; i < rects.length; i++) {
			rects[i].classList.add('movable');
			var y = Math.floor(Math.random() * 400);
			var x = Math.floor(Math.random() * 400);
			rects[i].style.top = y + 'px';
			rects[i].style.left = x + 'px';
		}
	}

}());
