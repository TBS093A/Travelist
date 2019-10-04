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

    $sql = "select a.articleID, a.artTitle, u.Login, r.regName from articles as a
              inner join regions as r on a.regionID = r.regionID
              inner join users as u on a.userID = u.userID";

    $result = mysqli_query($con,$sql);
    $articles = array();

    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }

    while($r = mysqli_fetch_assoc($result))
      $articles[] = $r;

    echo json_encode($articles);

$con->close();
