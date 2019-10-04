<?php

header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "**";
$password = "**";
$dbname = "**";


$con = mysqli_connect($host, $user, $password, $dbname);

$id = $con->real_escape_string($_POST["commentID"]);

if(isset($id)){
	$sql = "delete from comments where commentID = '$id'";

	$result = mysqli_query($con,$sql);

	exit;
	$con->close();
}
