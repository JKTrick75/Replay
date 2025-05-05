<?php
include($_SERVER['DOCUMENT_ROOT'] . "/REPLAY/9_REPLAY V3 (LOGIN)/model/JWT.php");

function decode_token($token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/model/jwt.ini');
    $secret = $jwt['JWT_SECRET'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

function create_accesstoken($username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/model/jwt.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET'];
    $timer_token = $jwt['JWT_ACCESS_TOKEN_TIMER'];
    // error_log('----------------Timer----------------');
    // error_log($timer_token);
    $payload = '{"iat":"' . time() . '","exp":"' . time() + ($timer_token) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}

function create_refreshtoken($username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/model/jwt.ini');
    $header = $jwt['JWT_HEADER'];
    $secret = $jwt['JWT_SECRET'];
    $timer_token = $jwt['JWT_REFRESH_TOKEN_TIMER'];
    // error_log('----------------Timer----------------');
    // error_log($timer_token);
    $payload = '{"iat":"' . time() . '","exp":"' . time() + ($timer_token) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}