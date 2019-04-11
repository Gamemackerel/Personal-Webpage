//Abraham Miller
//CSE154 AD
//This program fetches weather data from an php server and displays information
//about current weather, the precipitation chance, and the forecast for the week.
//The html and css files have not been modified.

(function() {
	'use strict';

	var URL = 'https://webster.cs.washington.edu/cse154/weather.php';
	var temps = [];

	//this anonymous function runs when the page loads. It starts the event handlers
	//for each of the inputs, and populates the dataList
	window.onload = function() {
		var citiesInput = document.querySelector('#citiesinput');
		document.querySelector('#loadingforecast').style.display = 'none';
		citiesInput.disabled = true;
		citiesInput.value = "";
		document.querySelector('#graph').style.display = 'none';
		fetchData('?mode=cities', populateDataList);
		document.querySelector('#search').onclick = citySearch;
		document.querySelector('#slider').onchange = tempToday;	
		document.querySelector('#temp').onclick = setModeTemp;
		document.querySelector('#precip').onclick = setModePrecip;
	};

	//triggered by the temperature button onclick handler. Changes the mode to 
	//temperature and activates the temperature slider.
	function setModeTemp () {
		document.querySelector('#graph').style.display = 'none';
		document.querySelector('#temps').style.display = 'block';
	}

	//triggered by the precipitation button onclick handler. changes the mode to precipitation,
	//and shows the precipitation graph.
	function setModePrecip () {
		document.querySelector('#graph').style.display = 'block';
		document.querySelector('#temps').style.display = 'none';
	}

	//This function is called when search button is clicked. First it clears all
	//the data from the page, then it unhides all the loading symbols besides the datalist one.
	//finally it fetches the new data for the page using the inputted city
	function citySearch() {
		document.querySelector('#resultsarea').style.display = 'block';
		document.querySelector('#nodata').style.display = 'none';
		document.querySelector('#graph').innerHTML = '';
		document.querySelector('#location').innerHTML = '';
		document.querySelector('#forecast').innerHTML = '';
		document.querySelector('#currentTemp').innerHTML = '';
		document.querySelector('#slider').style.display = 'none';
		document.querySelector('#buttons').style.display = 'none';
		var city = document.querySelector('#citiesinput').value;
		var loadingSymbols = document.querySelectorAll('.loading');
		for (var i = 0; i < loadingSymbols.length; i++) {
			if(loadingSymbols[i].id != 'loadingnames') {
				loadingSymbols[i].style.display = 'block';
			}
		}
		fetchData('?mode=oneday&city=' + city, populateResults);
		fetchData('?mode=week&city=' + city, populateForecastArea);
	}

	//This function is called when data is fetched from the mode=oneDay php datafile.
	//it populates the results area and the precipitation graph. 
	function populateResults() {
		if(this.status == 410) {
			document.querySelector('#nodata').style.display = 'block';
		} else {
			var node = this.responseXML;
			var locationEl = document.querySelector('#location');
			
			var times = node.querySelectorAll('time');
			var precips = [];
			for (var i = 0; i < times.length; i++) {
				temps[i] = times[i].querySelector('temperature').textContent;
				precips[i] = times[i].querySelector('clouds').getAttribute('chance');
			}
			var cityName = document.createElement('p');
			var date = document.createElement('p');
			var descEl = document.createElement('p');
			date.innerHTML = Date();
			cityName.innerHTML = node.querySelector('location name').textContent;
			cityName.classList.add('title');
			descEl.innerHTML = 
					node.querySelector('time').querySelector('symbol').getAttribute('description');
			locationEl.appendChild(cityName);
			locationEl.appendChild(date);
			locationEl.appendChild(descEl);
			tempToday();
			populateGraph(precips);
			document.querySelector('#slider').style.display = 'block';
			document.querySelector('#buttons').style.display = 'block';
		}
		document.querySelector('#loadinglocation').style.display = 'none';
		document.querySelector('#loadinggraph').style.display = 'none';
	}

	//This function is called when data is fetched from the mode=week, it takes
	//the forecast data for the week and uses it to populate the forecast table.
	function populateForecastArea() {
		if(this.status != 410) {
			var data = JSON.parse(this.responseText).weather;
			var iconRow = document.createElement('tr');
			var tempRow = document.createElement('tr');
			var table = document.querySelector('#forecast');
			for(var i = 0; i < data.length ; i++){
				var iconImg = document.createElement('img');
				var icon = document.createElement('td');
				iconImg.alt = 'weather Icon';
				iconImg.src = 'https://openweathermap.org/img/w/'+ data[i].icon + '.png';
				icon.appendChild(iconImg);
				iconRow.appendChild(icon);
				var temp = document.createElement('td');
				temp.innerHTML = Math.round(data[i].temperature)	 + '&#176';
				tempRow.appendChild(temp);
			}
			table.appendChild(iconRow);
			table.appendChild(tempRow);
		}
		document.querySelector('#loadingforecast').style.display = 'none';
	}

	//uses the precipitation data from the previously fetched onday data to populate
	//the graph area. 
	function populateGraph(precips) {
		var graphEl = document.querySelector('#graph');
		var trEl = document.createElement('tr');
		for(var i = 0; i < precips.length; i++){
			var chance = precips[i];
			var tdEl = document.createElement('td');
			var divEl = document.createElement('div');
			divEl.innerHTML = chance + '%';
			divEl.style.height = chance + 'px';
			tdEl.appendChild(divEl);
			trEl.appendChild(tdEl);
		}
		graphEl.appendChild(trEl);
	}

	//this function is triggered from the slider onchange event handler, as well as 
	//when a city is searched for initially. It changes the current temp to the corresponding
	//value.
	function tempToday() {
		var index = document.querySelector('#slider').value / 3;
		document.querySelector('#currentTemp').innerHTML = 
				Math.round(temps[index]) + '&#8457';
	}

	//this function is used to fetch data from a php file on the webserver. 
	//it takes in a params path which is used with the url to specify which
	//section of the php data file will be accessed, and a onload variable
	//which specifies which function will be called once the ajax request returns.
	function fetchData(params, onload) {
	    var xhr = new XMLHttpRequest();	
	    xhr.open('GET', URL + params, true);
	    xhr.onload = onload;
	    xhr.send();
	}

	//this function is called at the start of the program and is used to populate
	//the datalist using info requested from the php server.
	function populateDataList() {
		var cities = this.responseText.split('\r\n');
		for (var i = 0; i < cities.length; i++) {
			 var cityEl = document.createElement('option');
			 cityEl.value = cities[i];
			 document.querySelector('#cities').appendChild(cityEl);
		}
		document.querySelector('#citiesinput').disabled = false;
		document.querySelector('#loadingnames').style.display = 'none';
	}
})();