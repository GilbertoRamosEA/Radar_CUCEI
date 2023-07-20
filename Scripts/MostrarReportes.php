<?php
//credenciales
$server = "";
$user ="";
$password ="";
$db = ""; //conexión con el servidor de bd
$conn = mysqli_connect($server,$user,$password,$db);
if(!$conn){
    echo "error de conexion".mysqli_connect_error();
}
//sentencia a ejecutar
$sql="SELECT Id, Codigo, Nombre, Dia, Hora, Incidencia, Entrada from Reportes";
//ejecución de la sentencia
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)){
        //echo "Id:". $row["Id"].
        "Codigo:".$row["Codigo"].
        "Nombre:".$row["Nombre"].
        "Dia:".$row["Dia"].
        "Hora:".$row["Hora"].
        "Incidencia:".$row["Incidencia"].
        "Entrada:".$row["Entrada"];
        //echo "<br>";
        $data[] = $row;
    }
    print json_encode($data);
}else{
    echo "0";
}
mysqli_close($conn);
?>
