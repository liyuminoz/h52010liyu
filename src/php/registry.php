<?php
header('content-type:text/html;');

if(isset($_POST['submit'])){
    $phone = $_POST['phone'];
    $yanzheng = sha1($_POST['yanzheng']);
    $mima = $_POST['mima'];
    $queren = $_POST['queren'];

    include "conn.php";

    $conn->query("insert form values(null,'$phone','$yanzheng','$mima','$queren',NOW())");
    echo "注册成功".$phone. $yanzheng.$mima. $queren;
}else{
    exit('非法操作');
}