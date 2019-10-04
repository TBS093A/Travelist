<?php

header('Access-Control-Allow-Origin: *');

session_start();

if( isset($_SESSION['userID']) && !empty($_SESSION['userID']) ){

  $host = "localhost";
  $user = "**";
  $password = "**";
  $dbname = "**";

    $id = '';
    $con = mysqli_connect($host, $user, $password,$dbname);

    $activeArt = $con->real_escape_string($_POST['activeArt']);

    $userID = $_SESSION['userID'];

    if(isset($activeArt)){

      $sql = "select count(userID) as countR
                from ratings where
                      userID = '$userID' and
                      articleID = '$activeArt'"; //zwraca zero gdy nie ma

      $result = mysqli_query($con,$sql);
      $check = array();
      $rating = array();

      while($r = mysqli_fetch_assoc($result))
        $check[] = $r;

      $sql = "select avg(rating) as ratingSVG from ratings
                  where articleID = '$activeArt'"; //zwraca null gdy nie ma

      $result = mysqli_query($con,$sql);
      $SVG = array();

      while($r = mysqli_fetch_assoc($result))
        $SVG[] = $r;

      $AVG = false;
      if($userID != 0)
        $AVG = true;

      if(empty($SVG[0]['ratingSVG']))
        $SVG[0]['ratingSVG'] = 0;

      if($check[0]['countR'] > 0)
        $rating = array(
          'isRated' => true,
          'sessionActive' => $AVG,
          'rating' => round($SVG[0]['ratingSVG']),
          'ratingSVG' => round($SVG[0]['ratingSVG'], 2),
        );
      else
        $rating = array(
          'isRated' => false,
          'sessionActive' => $AVG,
          'rating' => round($SVG[0]['ratingSVG']),
          'ratingSVG' => round($SVG[0]['ratingSVG'], 2),
        );

      $array = array(
        0 => $rating,
      );

      echo json_encode($array);

      exit;
      $con->close();
    }
  } else {
    $host = "localhost";
    $user = "**";
    $password = "**";
    $dbname = "**";

    $id = '';
    $con = mysqli_connect($host, $user, $password,$dbname);

    $activeArt = $con->real_escape_string($_POST['activeArt']);

    if(isset($activeArt)){

      $sql = "select avg(rating) as ratingSVG from ratings
                  where articleID = '$activeArt'"; //zwraca null gdy nie ma

      $result = mysqli_query($con,$sql);
      $SVG = array();

      while($r = mysqli_fetch_assoc($result))
        $SVG[] = $r;

      $AVG = false;


      if(empty($SVG[0]['ratingSVG']))
        $SVG[0]['ratingSVG'] = 0;

        $rating = array(
          'isRated' => false,
          'sessionActive' => $AVG,
          'rating' => round($SVG[0]['ratingSVG']),
          'ratingSVG' => round($SVG[0]['ratingSVG'], 2),
        );

      $array = array(
        0 => $rating,
      );

      echo json_encode($array);

      exit;
      $con->close();
    }
  }
?>
