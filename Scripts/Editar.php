<?php
//script de autentificacion

//crear las variables para la conexion 
$server = "";
$user ="";
$password ="";
$db = "id18511885_appradarcucei"; //conexión con el servidor de bd

//recibir variables de la app
$Id = $_GET['Id'];
$Dia = $_GET['Dia'];
$Hora = $_GET['Hora'];
$Incidencia = $_GET['Incidencia'];
$Entrada = $_GET['Entrada'];

$conn = mysqli_connect($server,$user,$password,$db);
if(!$conn){
	die("Fallo la conexion a la base de datos");
}

$sql = "UPDATE `Reportes` SET `Dia`='$Dia',`Hora`='$Hora',`Incidencia`='$Incidencia',`Entrada`='$Entrada' WHERE Id =".$Id;
//echo $sql;
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>
