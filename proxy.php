<?php

// disable error reporting
error_reporting(0);

// define the base URL of the API
define('HOSTNAME', 'http://www.ist.rit.edu/api');

// construct the full URL of the API endpoint to fetch data from
$url = HOSTNAME . $_GET['path'];

// initialize a new curl session
$ch = curl_init();

// exclude the header information in the response
curl_setopt($ch, CURLOPT_HEADER, false);
// return the response as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// set the URL of the API endpoint to fetch data from
curl_setopt($ch, CURLOPT_URL, $url);

// execute the curl session and save the response to $result
$result = curl_exec($ch);

// close the cURL session
curl_close($ch);

// set the content type of the response to plain text
header("Content-Type: text/plain");

// output the response
echo $result;

?>