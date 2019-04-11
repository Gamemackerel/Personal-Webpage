(function() {
	'use strict';
	window.onload = function() {
		//attach event handlers after all the elements have loaded
		document.getElementById('lookup').onclick = buttonPress;
	}

	function buttonPress() {
		var query = document.getElementById('term').value;
		var xhr = new XMLHttpRequest();
		xhr.onload = handleResponse; 
		xhr.open('GET', '../../../cse154/labs/9/urban.php?term=' + query + '&all=true', true);
		xhr.send();
	}

	function handleResponse() {
		var result = document.getElementById('result') 
		result.innerHTML = '';
		var node = this.responseXML;
		var list = document.createElement('ol');
		var entries = node.querySelectorAll('entry');
		for (var i = 0; i < entries.length; i++) {
			var li = document.createElement('li');
			var p1 = document.createElement('p');
			var p2 = document.createElement('p');
			var p3 = document.createElement('p');
			p1.innerHTML = entries[i].querySelector('definition').textContent;
			p2.innerHTML = entries[i].querySelector('example').textContent;
			p3.innerHTML = '-' + entries[i].getAttribute('author');
			p3.onclick = loadRelated;
			li.appendChild(p1);
			li.appendChild(p2);
			li.appendChild(p3);
			list.appendChild(li);
			result.appendChild(list);
		}
	}

	function loadRelated

})();	