<!-- This php file contains several common functions that are used to build up
	2 or more of the pages on the site. It contains a function to generate the common 
	head of the page, a function to generate some of the middle content of the page,
	and a function to generate the common footer of the page, as well as a function to 
	retrieve the ID of a given actor name. -->
<?php
	
	//This function outputs the head of the page that is common to all pages on the site
	// and returns a PDO object for the database used by both search pages on the site.
	function head () {
?>
		<!DOCTYPE html>
		<html>
			<head>
				<title>My Movie Database (MyMDb)</title>
				<meta charset="utf-8" />
				<link href="https://webster.cs.washington.edu/images/kevinbacon/favicon.png" type="image/png" rel="shortcut icon" />

				<!-- Link to your CSS file that you should edit -->
				<link href="bacon.css" type="text/css" rel="stylesheet" />
			</head>

			<body>
				<div id="frame">
					<div id="banner">
						<a href="mymdb.php"><img src="http://darkweb420.com/abe/mymdb.png" alt="banner logo" /></a>
						My Movie Database
					</div>

					<div id="main">
<?php
		$db = new PDO("mysql:dbname=imdb","abemill","MeG2CfzHa4" );
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $db;
	}

	//This function outputs a search results table using the rows
	//found from a query for the search pages, and the given table caption.
	function thorax($rows, $firstName, $lastName, $kev) {
		$caption = "Films with $firstName $lastName";
		if($kev) {
			$caption .= " and Kevin Bacon";
		}
?>
						<h1>Results for <?=$firstName . " " . $lastName?></h1>
						<table>
							<caption><?=$caption?> </caption>
							<tr><th>#</th><th>Title</th><th>Year</th></tr>
<?php
		$rowNum = 0;
		foreach ($rows as $row) {
			$rowNum++;
?>	
							<tr><td><?=$rowNum?></td> <td><?=$row["name"]?></td> <td><?=$row["year"]?></td></tr>
<?php	
		}
?>
						</table>
<?php						
	}

	//This function outputs the foot of the page that is common to all pages on the site.
	function abdomen () {
?>
						<!-- form to search for every movie by a given actor -->
						<form action="search-all.php" method="get">
							<fieldset>
								<legend>All movies</legend>
								<div>
									<input name="firstname" type="text" size="12" placeholder="first name" autofocus="autofocus" /> 
									<input name="lastname" type="text" size="12" placeholder="last name" /> 
									<input type="submit" value="go" />
								</div>
							</fieldset>
						</form>

						<!-- form to search for movies where a given actor was with Kevin Bacon -->
						<form action="search-kevin.php" method="get">
							<fieldset>
								<legend>Movies with Kevin Bacon</legend>
								<div>
									<input name="firstname" type="text" size="12" placeholder="first name" /> 
									<input name="lastname" type="text" size="12" placeholder="last name" /> 
									<input type="submit" value="go" />
								</div>
							</fieldset>
						</form>
					</div> <!-- end of #main div -->
				
					<div id="w3c">
						<a href="https://webster.cs.washington.edu/validate-html.php"><img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML5" /></a>
						<a href="https://webster.cs.washington.edu/validate-css.php"><img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
					</div>
				</div> <!-- end of #frame div -->
			</body>
		</html>
<?php
	}

	//This function is passed a database, a first name, and a last name. It queries the
	//given database for the ID corresponding to the given name and returns it.
	//If the name cannot be found in the database, then this will return false.
	function retrieveID ($db, $firstName, $lastName) {
		return $db->query("
				SELECT id 
				FROM actors
				WHERE last_name = '$lastName' 
				AND first_name LIKE '$firstName%'	
				ORDER BY film_count DESC, id ASC
				LIMIT 1 
			")->fetch()[0];
	}
?>