<?php


    $username = "lulu";

    session_start();

    if( isset($_SESSION["flag"]) && $_SESSION["flag"]){
        echo "请勿重新注册";
    } else {
        $_SESSION["flag"] = false;
        echo "请注册";
    }

    
    


    
?>