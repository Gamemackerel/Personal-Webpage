<?php
/*
Abraham Miller
CSE154 AD
This php service takes and processes stored data on the webserver for sending to the javascript
program when requested.
*/
	$mode = $_GET["mode"];
	if ($mode == "books") {
		books();
	} else {
		$title = $_GET["title"];
		call_user_func($mode, $title);
	}

	//this function runs when the javascript requests content for the page that displays
	//all of the books in the library. It returns an XML doc containing all the books and their 
	//titles.
	function books() {
		$bookFolders = glob("books/*");
		$xmldoc = new SimpleXMLElement("<books/>");
		foreach ($bookFolders as $bookFolder) {
			$book_tag = $xmldoc->addChild("book");
			$book_tag->addChild("title", file($bookFolder . "/info.txt", FILE_IGNORE_NEW_LINES)[0]);
			$book_tag->addChild("folder", basename($bookFolder));
		}
		header("Content-type: text/xml");
		print($xmldoc->asXML());
	}

	//This function runs when the javascript requests content for a single book. It provides a JSON
	//response containing general info about the book
	function info($title) {
		list($title, $author, $stars) = file("books/" . $title . "/info.txt", FILE_IGNORE_NEW_LINES);
		$data = array(
			"title" => $title,
			"author" => $author,
			"stars" => $stars
			);
		header("Content-type: application/json");
		print(json_encode($data));
	}

	//This function runs when the javascript requests content for a single book. It provides a 
	//plaintext description of the book.
	function description($title) {
		header("Content-type: text/plain");
		print(file_get_contents("books/" . $title . "/description.txt"));
	}

	//This function runs when the javascript requests content for a single book. It provides an 
	//partial page HTML of organized reviews for the book.
	function reviews($title) {
		$reviews = glob("books/" . $title . "/review*.txt");
		$html = ""; 
		foreach ($reviews as $review) {
			list($author, $rating, $text) = file($review, FILE_IGNORE_NEW_LINES);
			$html .= "<h3>" . $author . " <span>" . $rating . "</span></h3><p>" . $text . "</p>";
		}
		header("Content-type: text/html");
		print($html);
	}
?>