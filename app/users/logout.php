<?php
declare(strict_types=1);
require __DIR__.'/../autoload.php';
// In this file users are logged out.

// Remove the user session variable and redirect the user back to the homepage.
unset($_SESSION['avatar']);
unset($_SESSION['user']);
redirect('/');