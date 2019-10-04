<?php
session_start();

  header('Access-Control-Allow-Origin: *');
  // header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  $host = "localhost";
  $user = "**";
  $password = "**";
  $dbname = "**";

  $con = mysqli_connect($host, $user, $password,$dbname);

  $login = $con->real_escape_string($_POST['login']);
  $password = $con->real_escape_string($_POST['password']);
  $email = $con->real_escape_string($_POST['email']);

  if(isset($_SERVER['HTTP_USER_AGENT']) && preg_match('/bot|crawl|slurp|spider|mediapartners/i', $_SERVER['HTTP_USER_AGENT'])){
      echo "jesteś botem";
      exit;
      $con->close();
  }
  else if( isset($login) && isset($password) && isset($email) ){

    $hashPassword = password_hash($password,PASSWORD_BCRYPT);

    if (!$con) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "select * from users where login like '$login'";

    $result = mysqli_query($con,$sql);
    $accounts = array();

    while($r = mysqli_fetch_assoc($result))
      $accounts[] = $r;

    if(count($accounts) > 0){
      echo "konto już występuje w bazie";
      exit;
      $con->close();
    }
    else {
      $sql = "insert into users values
                (null,'$login','$hashPassword',0,'$email',2)";

      // run SQL statement
      $result = mysqli_query($con,$sql);

      echo "zarejestrowano: '$login'";
    }
    exit;
  }
  $con->close();
