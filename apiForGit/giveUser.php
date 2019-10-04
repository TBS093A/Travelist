<?php

session_start();

  if(isset($_SESSION['login']) && !empty($_SESSION['login']) ){
    header('Access-Control-Allow-Origin: *');

    $login = $_SESSION['login'];
    $password = $_SESSION['password'];
    $userID = $_SESSION['userID'];
    $score = $_SESSION['score'];
    $priviliges = $_SESSION['priviliges'];
    $email = $_SESSION['email'];

    $user = array(
      'id' => $userID,
      'login' => $login,
      'password' => $password,
      'score' => $score,
      'priviliges' => $priviliges,
      'email' => $email,
    );

    $array = array(
      0 => $user,
    );

    echo json_encode($array);

    exit;
    $con->close();
  }

?>
