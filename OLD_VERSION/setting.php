<?php
$time = $_POST['time'];
$soundannouncement = $_POST['soundannouncement'];
$animstart = $_POST['animstart'];
$animbreak = $_POST['animbreak'];
$timeanim = $_POST['timeanim'];
$token = $_POST['token'];

$file = fopen("./resource/cfg.json","w");
fwrite($file,"{ \n");
fwrite($file,"\"token\":\"$token\",\n");
fwrite($file,"\"time\":$time,\n");
fwrite($file,"\"soundannouncement\":\"$soundannouncement\",\n");
fwrite($file,"\"animstart\":\"$animstart\",\n");
fwrite($file,"\"animbreak\":\"$animbreak\",\n");
fwrite($file,"\"timeanim\":$timeanim \n");
fwrite($file,"}\n");
fclose($file);
header ('Location: index.html');
?>