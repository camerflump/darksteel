<?php
    $name = $_POST['name'];
    $realm = $_POST['realm'];
    $message = $_POST['message'];
    $from = 'From: Website Message Form';
    $to = 'placeholder@placeholder.com';
    $subject = 'Website Message Form';

    $body = "Character: $name\n Realm: $realm\n Message:\n $message";

    if (mail ($to, $subject, $body, $from)) {
        echo '<p>Your message has been sent!</p>';
    } else {
        echo '<p>Something went wrong, go back and try again!</p>';
    }
?>