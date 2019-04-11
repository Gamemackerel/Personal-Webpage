<!-- This php file is called when movies that an actor has been in with Kevin Bacon are searched 
	for. It generates the html for the page, including the results table, which it creates using
	results of the search to the imdb database. -->
<?php 
	include_once("common.php");
	$db = head();
	$firstName = $_GET["firstname"];
	$lastName = $_GET["lastname"];
	$actorID = retrieveID($db, $firstName, $lastName);	
	if($actorID) {
		//This query uses an actor ID and retrieves all of the films that the 
		//given actor has been in that kevin bacon has also been in
		$rows = $db->query("
					SELECT m.name, m.year 
					FROM movies m 
					JOIN roles r1 ON r1.movie_id = m.id
					JOIN roles r2 ON r2.movie_id = m.id
					JOIN actors a2 ON a2.id = r2.actor_id
					WHERE r1.actor_id = '$actorID' AND a2.first_name = 'Kevin' 
					AND a2.last_name = 'Bacon'
					ORDER BY m.year DESC, m.name ASC
				");
		if($rows->rowCount()) {					
			thorax($rows, $firstName, $lastName, true);
		} else {
?>
						<p><?=$firstName . " " . $lastName?> was not in any films with Kevin Bacon</p>
<?php
		}
	} else {
?>
						<p><?=$firstName . " " . $lastName?> was not found in the database.</p>
<?php
	}
	abdomen();
?>