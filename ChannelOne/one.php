<?php




	if (isset($_GET["url"])) {
		# code...
		$noMatch = "You must submit a valid video URL.";
		$success = "Your video submission has been added to the front of the queue.";
		$duplicate = "This video is already in the queue";

		$newURL = $_GET["url"];
		$regex = "/.*(youtube\.com\/watch\?v=)\S{11}.*/";

		if (!preg_match($regex, $newURL)) {
			print($noMatch);
			die();
		}

		$vId = substr(parse_url($newURL, PHP_URL_QUERY), 2, 11);
		$oldList = file("videoQueue.txt", FILE_IGNORE_NEW_LINES);

		if(in_array($vId, $oldList)) {
			print($duplicate);
			die();
		}

		$text = $vId."\n";
		for ($i=0; $i < sizeof($oldList) - 1; $i++) { 
			$text = $text.$oldList[$i]."\n";
		}
		file_put_contents("videoQueue.txt", $text);
		print($success);
		die();
	} else {
		header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
		header("Pragma: no-cache"); // HTTP 1.0.
		header("Expires: 0"); // Proxies.
		print(file_get_contents("videoQueue.txt"));
		die();
	}
?>