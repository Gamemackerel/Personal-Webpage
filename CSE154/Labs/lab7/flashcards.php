<?php 

if(isset($_GET["mode"])) {
	$mode = $_GET["mode"];
} else {
	$mode = "";
}


if($mode === "categories") {
	$cats = glob("/www/html/cse154/services/flashcards/*");
	?> <ul> <?php
	foreach ($cats as $cat) {
	?> 
		<li><?=basename($cat)?></li>
	<?php
	}
	?> <ul/><?php
} else {

	$fileArray = glob("/www/html/cse154/services/flashcards/pokemon/*.txt");
	$randFile = array_rand($fileArray,1);
	print(file_get_contents($fileArray[$randFile]));
}
?>