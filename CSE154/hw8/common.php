<!-- This php service serves as a library for methods that are used by more than one page or 
	service on the site. It also starts/resumes the session automatically on any php file
	where it is included.  -->
<?php
session_start();

//This function outputs the html for the common head on the start page and the todolist page.
//It also returns the "last logged in date" used by both of these pages.
function head() {
?>
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8" />
			<title>Remember the Cow</title>
			<link href="https://webster.cs.washington.edu/css/cow-provided.css" type="text/css" rel="stylesheet" />
			<link href="cow.css" type="text/css" rel="stylesheet" />
			<link href="https://webster.cs.washington.edu/images/todolist/favicon.ico" type="image/ico" rel="shortcut icon" />
		</head>

		<body>
			<div class="headfoot">
				<h1>
					<img src="https://webster.cs.washington.edu/images/todolist/logo.gif" alt="logo" />
					Remember<br />the Cow
				</h1>
			</div>

			<div id="main">
<?php	
	if(isset($_COOKIE["lastLogin"])) {
		return $_COOKIE["lastLogin"];
	} else {
		return 0;		
	}
}

//This function outputs the html for the common foot on the start page and todolist page.
function foot() {
?>
			</div>

			<div class="headfoot">
				<p>
					&quot;Remember The Cow is nice, but it's a total copy of another site.&quot; - PCWorld<br />
					All pages and content &copy; Copyright CowPie Inc.
				</p>

				<div id="w3c">
					<a href="https://webster.cs.washington.edu/validate-html.php">
						<img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML" /></a>
					<a href="https://webster.cs.washington.edu/validate-css.php">
						<img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
				</div>
			</div>
		</body>
	</html>
<?php
}

//This function is called on pages that wouldn't be useful for a logged in user.
//It checks to see if the user is logged in and then redirects them to the main TodoList page.
function checkLoggedin() {
	if(isset($_SESSION["name"])) {
		redirect("todolist.php");	
		print("reached this point");
	}
}

//This function is called on pages that are only allowed to be accessed by a logged in user.
//It checks to see if a user is logged in or not. If not, it redirects the user back to the starting
//log in page.
function permissionCheck() {
	if (!isset($_SESSION["name"])) {
		redirect("start.php");
	}
}

//This function accepts a $url string, and redirects the user to the given page before 
//killing the service which called this function.
function redirect($url) {
	header("Location: " . $url);
	die();
}

//Fetches a file with the given name and returns it as an array if it exists. If it does not exist,
//returns an empty array. 
function getFileIfExists($url) {
	if (file_exists("$url")) {
		$list = file("$url", FILE_IGNORE_NEW_LINES);
	} else {
		$list = [];
	}
	return $list;
}
?>