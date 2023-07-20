<?php
//script de autentificacion

//crear las variables para la conexion 
$server = "";
$user ="";
$password ="";
$db = ""; //conexión con el servidor de bd

//recibir variables de la app
$Codigo = $_GET['Codigo'];
$Nombre = $_GET['Nombre'];
$Dia = $_GET['Dia'];
$Hora = $_GET['Hora'];
$Incidencia = $_GET['Incidencia'];
$Entrada = $_GET['Entrada'];

$conn = mysqli_connect($server,$user,$password,$db);
if(!$conn){
	die("Fallo la conexion a la base de datos");
}

$sql = "INSERT INTO `Reportes`(`Codigo`, `Nombre`, `Dia`, `Hora`, `Incidencia`, `Entrada`) VALUES ('$Codigo', '$Nombre', '$Dia', '$Hora', '$Incidencia', '$Entrada')";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>
