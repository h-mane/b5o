<?php

$ip = $_SERVER['REMOTE_ADDR'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_USERPWD, 'fin-token1039:356f3373');
if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $country = 'ru';
    $locale = 'ru_RU';
    $firstName = $_POST['firstName'];
    $name = $firstName;
    $lastName = $_POST['lastName'];
    $expire = time() + 60 * 60 * 24 * 30; //1 month expired.
    setcookie("email", $email, $expire, '/');
    $user_data = array(
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'confirmed' => '0',
        'sendConfirmationEmail' => 1,
        'password' => md5($password),
        'phone' => $phone,
        'country' => $country,
        'locale' => $locale,
        'landing' => json_encode(array('a_aid' => '1039', 'serial' => 'b5oru')),
        'lead' => 0
    );
    curl_setopt($ch, CURLOPT_URL, 'https://finmaxbo.com/api/registration.php');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $user_data);
    $result = curl_exec($ch);
    $res = json_decode($result, true);
    if (isset($res["error"])) {
        echo '<p>Такой аккаунт уже есть, используйте другой аккаунт</p><p class="cent"><span class="reload go">Еще раз</span></p>';
    } else {
        echo true;
    }

}
