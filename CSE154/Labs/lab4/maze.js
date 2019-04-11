(function() {
	'uses strict';
	window.onload = function() {
		var boundaries = document.querySelectorAll('.boundary');
		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].onmouseover = turnRed;
		}

		document.getElementById('end').onmouseover = win;
		document.getElementById('start').onmouseover = restart;
		document.getElementById('pagewrap').onmouseover = didYouLose;
	}


	function didYouLose() {
			if(document.getElementById('maze').onmouseover) {
			} else {
				turnRed;
			}
	}


	function restart() {
		var boundaries = document.querySelectorAll('.boundary');
		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].classList.remove('youlose');
		}
		document.getElementById('status').innerHTML = 'lets go!';
	}

	function turnRed() {
		var boundaries = document.querySelectorAll('.boundary');
		for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].classList.add('youlose');
		}
		document.getElementById('status').innerHTML = 'you lost';
	}	

	function win() {
		var boundary = document.getElementById('boundary1');
		if(boundary.classList.contains('youlose')) {
			alert('you already lost');
		} else {
			document.getElementById('status').innerHTML = 'you won';
		}
	}

})();