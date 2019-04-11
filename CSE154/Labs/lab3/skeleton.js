//Javascript skeleton for "modular anonymous funciton"


(function() {
	'use strict';

	window.onload = function() {
		//attach event handlers after all the elements have loaded
		document.getElementById('important-button').onclick = buttonPress;
	}

	function buttonPress() {
		//do stuff when the button is pressed
		
		//when in a function triggered by an event handler on an element "this" refers to the element 
		//that the event handler was attached to 
	}

})();

