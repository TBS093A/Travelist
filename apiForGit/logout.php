<?php
session_start();
?>
<?php
  header('Access-Control-Allow-Origin: *');

  session_unset();      //remove all sessions
  session_destroy();
?>
