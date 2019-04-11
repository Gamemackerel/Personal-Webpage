<!-- This php service takes username and password POST parameters and uses them to attempt a log in,
	or the creation of a new account -->
<?php
include("common.php");
checkLoggedIn();
if(!(isset($_POST["name"]) && isset($_POST["password"]))) {
?>
	USERNAME AND PASSWORD REQUIRED
<?
	die();
}
$nameQ = $_POST["name"];
$passQ = $_POST["password"];
$users = getFileIfExists("users.txt");
foreach ($users as $user) {
	list($name, $pass) = explode(":", $user);
	if($nameQ == $name) {
		if($passQ == $pass) {
			//successful login, go to todolist
			login($nameQ);
		} else {
			//unsuccessful login, back to start
			redirect("start.php");
		}
	}
}
//if the above loop has finished without finding the queried username, we attempt to create
//an account with the given username and password.
newUser($nameQ, $passQ);

//This function takes in the username and password of a new potential account, checks to make sure
//the name and password are valid, and if so: creates an account. If the login info was not valid
//then redirect the user back to the login page.
function newUser($nameQ, $passQ) {
	if(preg_match("/^[a-z][a-z0-9]{2,7}$/", $nameQ) && preg_match("/^[0-9].{4,10}[^a-zA-Z0-9]$/", $passQ)) {
		$newUser = "\n$nameQ:$passQ";
		file_put_contents("users.txt", $newUser, FILE_APPEND);
		login($nameQ);
	} else {
		//unsuccessful account creation, back to start
		redirect("start.php");			
	}
}

//This function takes a given username and starts a log-in session with it, and then redirects the
//user to their todolist page.
function login($name) {
	$_SESSION["name"] = $name;
	setcookie("lastLogin", date("D y M d, g:i:s a"), time() + 86400 * 7);
	redirect("todolist.php");
}
?>