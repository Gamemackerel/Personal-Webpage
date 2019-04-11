<!-- This php service destroys the user's logged in session and redirects them back to the 
	starting log in page-->
<?php
include("common.php");
permissionCheck();
session_destroy();
redirect("start.php");
?>