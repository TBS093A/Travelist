<?php

  session_start();

  header('Access-Control-Allow-Origin: *');

  if (isset($_SESSION['login']) && isset($_SESSION['userID']) && isset($_SESSION['score'])){

    $host = "localhost";
    $user = "**";
    $password = "**";
    $dbname = "**";

      $con = mysqli_connect($host,$user,$password,$dbname);

      $comSend = $con->real_escape_string($_POST['comSend']);
      $article = $con->real_escape_string($_POST['activeArt']);
      $userID = $con->real_escape_string($_SESSION['userID']);

      if(isset($comSend) && isset($article)){
        if(!empty($comSend)){
          if(!$con){
            die("Connection failed " . mysqli_connect_error());
          }

          $sql = "insert into comments values
                  (null,'$article','$userID','$comSend')";

          $query = mysqli_query($con,$sql);

          if (!$query) {
            http_response_code(404);
            die(mysqli_error($con));
          }

          echo 2;
        } else {
          echo 1;
          exit();
        }
      } else {
        echo 1;
        exit();
      }
  }
  else {
    echo 1;
    exit();
  }
