<!-- This php service is used to modify a user's todolist, either adding or deleting items 
	on the list. -->
<?php
include("common.php");
permissionCheck();
if(!(isset($_POST["action"]) && (isset($_POST["index"]) || isset($_POST["item"])))) {
?>
	REQUIRED PARAMETERS NOT PASSED
<?php
	die();
}
$name = $_SESSION["name"];
if($_POST["action"] == "add") {
	$item = $_POST["item"];
	file_put_contents("todo_$name.txt", "$item\n", FILE_APPEND);
} elseif ($_POST["action"] == "delete") {
	$index = $_POST["index"];
	$list = getFileIfExists("todo_$name.txt");
	if($index >= sizeof($list) || $index < 0) {
?>
		INVALID PARAMETER
<?php
		die();
	}
	unset($list[$index]);
	$list = implode("", $list);
	file_put_contents("todo_$name.txt", $list);
}
redirect("todolist.php");
?>