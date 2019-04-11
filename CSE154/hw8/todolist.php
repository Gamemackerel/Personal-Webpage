<!-- This file outputs the html for the todolist page which displays a user's personal list
	provided that they are logged in to their account. -->
<?php
include("common.php");
permissionCheck();
$name = $_SESSION["name"];
$lastLogin = head();
$list = getFileIfExists("todo_$name.txt");
?>
			<h2><?=htmlspecialchars($name)?>'s To-Do List</h2>

			<ul id="todolist">
<?php
for ($i=0; $i < sizeof($list); $i++) {
?>				
				<li>
					<form action="submit.php" method="post">
						<input type="hidden" name="action" value="delete" />
						<input type="hidden" name="index" value="<?=$i?>" />
						<input type="submit" value="Delete" />
					</form>
					<?=htmlspecialchars($list[$i])?>
				</li>
<?php
}
?>
				<li>
					<form action="submit.php" method="post">
						<input type="hidden" name="action" value="add" />
						<input name="item" type="text" size="25" autofocus="autofocus" />
						<input type="submit" value="Add" />
					</form>
				</li>
			</ul>

			<div>
				<a href="logout.php"><strong>Log Out</strong></a>
				<em>(logged in since <?=$lastLogin?>)</em>
			</div>
<?php
foot();	
?>