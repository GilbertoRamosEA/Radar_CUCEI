<?php

//Recibe variables
$Id = $_GET['Id'];

//Credenciales
$server = "";
$user ="";
$password ="";
$db = ""; //conexión con el servidor de bd

//Connection

$conn = mysqli_connect($server, $user, $password, $db);

//Check

if(!$conn){
    echo "Connection failed: " . mysqli_connect_error();
}

//insercion de datos

$sql = "DELETE FROM Reportes WHERE Id =".$Id;

if(mysqli_query($conn,$sql))
{
    echo "1";
}
else{
    echo "0";
}

mysqli_close($conn);
?>
