<?php
  header('Access-Control-Allow-Origin: *');
  // header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  $host = "localhost";
  $user = "**";
  $password = "**";
  $dbname = "**";


  $con = mysqli_connect($host,$user,$password,$dbname);

  $artID = $con->real_escape_string($_POST['artID']);

  if(isset($artID)){

    if(!$con) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "select c.commentID, c.comText, u.login, u.priviliges
            from comments as c
            inner join users as u on c.userID = u.userID
            where c.articleID = '$artID'
            order by c.commentID asc";

    $result = mysqli_query($con,$sql);
    $comments = array();

    if(!$result){
      http_response_code(404);
      die(mysqli_error($con));
    }

    while($r = mysqli_fetch_assoc($result))
      $comments[] = $r;

    echo json_encode($comments);

  }

$con->close();
