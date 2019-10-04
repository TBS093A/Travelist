<?php
  header('Access-Control-Allow-Origin: *');
  // header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  $host = "localhost";
  $user = "**";
  $password = "**";
  $dbname = "**";


  $con = mysqli_connect($host,$user,$password,$dbname);

  $name = $con->real_escape_string($_POST['regName']);

  if(isset($name))  {

    if (!$con) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "select regionID from regions where regName like '$name'";

    $result = mysqli_query($con,$sql);
    $regID = array();

    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }

    while($r = mysqli_fetch_assoc($result))
      $regID[] = $r;

    $resultID = $regID[0]['regionID'];

    $sql = "select a.articleID, a.userID, a.regionID, a.artTitle, a.artText, a.artImageName,
              u.login, u.priviliges, r.regName
            from articles as a
            inner join users as u on a.userID = u.userID
            inner join regions as r on a.regionID = r.regionID
            where a.regionID = '$resultID'";

    $result = mysqli_query($con,$sql);
    $articles = array();

    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }

    while($r = mysqli_fetch_assoc($result))
      $articles[] = $r;

    echo json_encode($articles);
  }
$con->close();
