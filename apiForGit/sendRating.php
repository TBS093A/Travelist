<?php

header('Access-Control-Allow-Origin: *');

session_start();

    $host = "localhost";
    $user = "**";
    $password = "**";
    $dbname = "**";

    $id = '';
    $con = mysqli_connect($host, $user, $password,$dbname);

    $activeArt = $con->real_escape_string($_POST['activeArt']);
    $ratingU = $con->real_escape_string($_POST['rating']);

    if(isset($activeArt)){

      $userID = $_SESSION['userID'];

      $sql = "insert into ratings values
                (null,'$userID','$activeArt','$ratingU')";

      $result = mysqli_query($con,$sql);

      $effect = array(
        'isRated' => true,
      );

      $array = array(
        0 => $effect,
      );

      echo json_encode($array);

      exit;
      $con->close();
    }

?>
