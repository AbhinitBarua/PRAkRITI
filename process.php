<?php
    $name = $_POST['name'];
    $email_id = $_POST['email'];
    $message = $_POST['description'];
    $file = $_POST['plant-image'];


    $email_from = 'abhinitinspace@gmail.com';

    $email_subject = "New Image Donation 🎉";

    $email_body = "Donator Name : $name.\n".
                      "Donator Email : $email_id. \n".
                          "Donator Additional description : $message. \n";

    $to = "abhinitinspace@gmail.com";

    $headers = "From : $email_from \r\n";

    $headers .= "Reply-To : $email_id \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location : donate.html");


?>