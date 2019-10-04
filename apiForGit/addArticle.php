<?php

header('Access-Control-Allow-Origin: *');

$sessionACT = 0;

// $file = fopen("session.txt", "r");
// if (filesize('session.txt') == 0){
//     $sessionACT++;
// } else
//   session_id(fread($file,filesize("session.txt")));
session_start();

  if($sessionACT == 0){

    $host = "localhost";
    $user = "**";
    $password = "**";
    $dbname = "**";

    $id = '';
    $con = mysqli_connect($host, $user, $password,$dbname);

    $titleArt = $con->real_escape_string($_POST['titleArt']);
    $textArt = $con->real_escape_string($_POST['textArt']);
    $regionID = $con->real_escape_string($_POST['regionID']);
    $imageSrc = $con->real_escape_string($_POST['imageArt']);
    $userID = $con->real_escape_string($_SESSION['userID']);

    if(isset($titleArt) && isset($textArt) && isset($regionID) && isset($imageSrc)){

      if(!$con)
        die("Connection failed: ".mysqli_connect_error());

      $sql = "insert into articles values (null,'$regionID','$userID','$titleArt','$textArt','$imageSrc')";

      echo $sql;

      $query = mysqli_query($con,$sql);

      if (!$query) {
        http_response_code(404);
        die(mysqli_error($con));
      }

      $target = str_replace("/api","/images",getcwd()).str_replace(" ", "", "/ ")."extra".str_replace(" ", "", "/ ").$imageSrc;
      move_uploaded_file($_FILES['imageFL']['tmp_name'], $target);
    }

    exit;
    $con->close();
  }

?>
