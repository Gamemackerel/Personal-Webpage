/*
Abraham Miller
CSE154 AD
This file defines the Javascript which enables functionality in a speedreader
webpage for the 3rd homework assignment.
The javascript is used to flash text at user chosen speeds in the reading box to enable
the user to read as fast as they possibly can. It also allows for the user to choose
a reading text size that suites them.
*/
(function() {
	'use strict';

	var timer = null;
	var input;
	var count = 0;

	//This function runs when the page is loaded and sets up event handlers
	//for each of the control inputs on the page, linking them to JS
	//functions defined later in this file.
	window.onload = function() {
		changeFont();
		var radio = document.querySelectorAll('input[name="size"]');
		for (var i = 0; i < radio.length; i++) {
			radio[i].onchange = changeFont;
		}
		document.getElementById('start').onclick = start;
		document.getElementById('stop').onclick = stop;
		document.querySelector('select').onchange = changeSpeed;
	};

	//This function is called when a user attempts to change the speed
	//from the input dropbox. It takes in the dropbox element, and 
	//if a speedreading session is occuring, it changes the speed
	//to the user's choice live.
	function changeSpeed(event) {
		if(timer !== null) {
			clearInterval(timer);
			timer = setInterval(nextWord,this.value);
		}
	}

	//This function is called by the onclick event on the start button.
	//It reads in the user defined speedreading
	//options (input and speed), and begins a speedreading session, calling
	//nextWord() at the user-specified interval.  
	//It also disables the start button, and enables the stop button.
	function start() {
		input = document.querySelector('textarea').value.split(/[ \t\n]+/);
		var speed = parseInt(document.querySelector('select').value, 10);
		timer = setInterval(nextWord, speed);
		document.getElementById('start').disabled = true;
		document.getElementById('stop').disabled = false;
	}

	//This function is called by the onclick event on the stop button.
	//It clears the reader, ends the session, and reenables the start button,
	//while disabling the start button.
	function stop() {
		clearInterval(timer);
		timer = null;
		count = 0;
		document.getElementById('reader').innerHTML = '';
		document.getElementById('start').disabled = false;
		document.getElementById('stop').disabled = true;		
	}

	//This function is called during a speedreading session in a user defined
	//time interval, and displays successive words from the input every time
	//it is called. For words that end in punctuation, it displays
	//for twice as long. 
	function nextWord() {
		var reader = document.getElementById('reader');
		if(count < input.length) {
			if(input[count].charAt(input[count].length - 1) == ',' ||
					input[count].charAt(input[count].length - 1) == '?' ||
					input[count].charAt(input[count].length - 1) == '!' ||
					input[count].charAt(input[count].length - 1) == '.') {
				input[count] = input[count].substring(0, input[count].length - 1);
				reader.innerHTML = input[count];
			} else {
				reader.innerHTML = input[count];
				count++;
			}
		} else {
			stop();
		}
	}

	//This function is called when the onchange event on the radiogroup is triggered.
	//It adjusts the text size of the reader to whatever the user's new choice is.
	function changeFont() {
		var reader = document.getElementById('reader');
		if (document.getElementById('medium').checked) {
			reader.className = 'reader-medium';
		} else if (document.getElementById('big').checked) {
			reader.className = 'reader-big';
		} else {
			reader.className = 'reader-bigger';
		}
	}
})();
