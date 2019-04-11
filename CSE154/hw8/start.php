<!-- This file outputs the html for the starting login page -->
<?php
include("common.php");
checkLoggedIn();
$lastLogin = head();
?>
			<p>
				The best way to manage your tasks. <br />
				Never forget the cow (or anything else) again!
			</p>

			<p>
				Log in now to manage your to-do list. <br />
				If you do not have an account, one will be created for you.
			</p>

			<form id="loginform" action="login.php" method="post">
				<div><input name="name" type="text" size="8" autofocus="autofocus" /> <strong>User Name</strong></div>
				<div><input name="password" type="password" size="8" /> <strong>Password</strong></div>
				<div><input type="submit" value="Log in" /></div>
			</form>

<?php
if($lastLogin) {
?>
			<p>
				<em>(last login from this computer was <?=$lastLogin?>)</em>
			</p>
<?php
}
foot();	
?>