<?php

header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "**";
$password = "**";
$dbname = "**";


$con = mysqli_connect($host, $user, $password, $dbname);

$id = $con->real_escape_string($_POST["articleID"]);

if(isset($id)){
	$sql = "delete from articles where articleID = '$id'";

	$result = mysqli_query($con,$sql);

	exit;
	$con->close();
}
