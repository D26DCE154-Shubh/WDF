
<?php
require 'db.php';
require 'auth.php';

start_secure_session();

revoke_remember_token($pdo);
destroy_session_completely();

header('Location: login.php?msg=loggedout');
exit;
