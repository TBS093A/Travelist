<?php

  header('Access-Control-Allow-Origin: *');
  // header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  $host = "localhost";
  $user = "**";
  $password = "**";
  $dbname = "**";


  $con = mysqli_connect($host,$user,$password,$dbname);

    if (!$con) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "select * from users";

    $result = mysqli_query($con,$sql);
    $users = array();

    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }

    while($r = mysqli_fetch_assoc($result))
      $users[] = $r;

    echo json_encode($users);

$con->close();
