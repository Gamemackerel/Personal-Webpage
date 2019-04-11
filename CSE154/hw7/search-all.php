<!-- This php file is called when all movies that an actor has been in are searched for.
	It generates the html for the page, including the results table, which it creates using
	results of the search to the imdb database. -->
<?php 
	include_once("common.php");
	$db = head();
	$firstName = $_GET["firstname"];
	$lastName = $_GET["lastname"];
	$actorID = retrieveID($db, $firstName, $lastName);
	if($actorID) {
		//This query uses an actor's ID and retrieves all the films that they have
		//been in according to the database
		$rows = $db->query("
					SELECT m.name, m.year 
					FROM movies m 
					JOIN roles r ON r.movie_id = m.id
					WHERE r.actor_id = '$actorID'
					ORDER BY m.year DESC, m.name ASC
				");	
		thorax($rows, $firstName, $lastName, false);
	} else {
?>
						<p>Actor <?=$firstName . " " . $lastName?> was not found in the database.</p>
<?php
	}
	abdomen();
?>