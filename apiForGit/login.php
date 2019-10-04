<?php

    session_start();

    header('Access-Control-Allow-Origin: *');

    $host = "localhost";
    $user = "**";
    $password = "**";
    $dbname = "**";

  $con = mysqli_connect($host, $user, $password,$dbname);

  $login = $con->real_escape_string($_POST['login']);
  $password = $con->real_escape_string($_POST['password']);

  if(isset($login) && isset($password)){

    if (!$con) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "select * from users where login like '$login'";

    // run SQL statement
    $result = mysqli_query($con,$sql);
    $rows = array();

    // die if SQL statement failed
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }

    while($r = mysqli_fetch_assoc($result))
      $rows[] = $r;

    if(password_verify($password,$rows[0]['password'])){

      echo json_encode($rows);

      if(count($rows) == 1){
        $_SESSION['login'] = $login;
        $_SESSION['password'] = $password;
        $_SESSION['userID'] = $rows[0]['userID'];
        $_SESSION['score'] = $rows[0]['score'];
        $_SESSION['priviliges'] = $rows[0]['priviliges'];
        $_SESSION['email'] = $rows[0]['email'];

        session_write_close();
      }
    }

    exit;
  }
  $con->close();
