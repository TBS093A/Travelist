<?php

$sessionACT = 0;

// $file = fopen("session.txt", "r");
// if (filesize('session.txt') == 0){
//     $sessionACT++;
// } else
//   session_id(fread($file,filesize("session.txt")));
session_start();

  if($sessionACT == 0){

    header('Access-Control-Allow-Origin: *');

    $host = "localhost";
    $user = "**";
    $password = "**";
    $dbname = "**";

    $id = '';
    $con = mysqli_connect($host, $user, $password,$dbname);

    $password = $con->real_escape_string($_POST['password']);
    $userID = $_SESSION['userID'];

    if(isset($password) && !empty($password)){

      $hashPassword = password_hash($password,PASSWORD_BCRYPT);

      if(!$con)
        die("Connection failed: ".mysqli_connect_error());

      $sql = "Update users Set password = '$hashPassword' Where userID = '$userID'";

      $result = mysqli_query($con,$sql);

      echo "zmieniono hasło";
    }

    exit;
    $con->close();
  }

?>
