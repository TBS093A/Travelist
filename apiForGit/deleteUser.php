<?php

header('Access-Control-Allow-Origin: *');

$host = "localhost";
$user = "**";
$password = "**";
$dbname = "**";


$con = mysqli_connect($host, $user, $password, $dbname);

$id = $con->real_escape_string($_POST["userID"]);

if(isset($id) && $id != 1){
	$sql = "delete from users where userID = '$id'";

	$result = mysqli_query($con,$sql);

	exit;
	$con->close();
}
